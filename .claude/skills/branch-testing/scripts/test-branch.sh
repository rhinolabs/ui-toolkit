#!/usr/bin/env bash
set -euo pipefail

# ─── Branch Testing via Git Worktrees ────────────────────────────────────────
# Validates any git ref against consumer integration tests in isolation.
# Each ref gets its own worktree with independent node_modules.
#
# Usage:
#   ./test-branch.sh <ref> [--install-only] [--clean]
#
# Arguments:
#   <ref>            Git ref to test (branch, tag, or commit hash)
#   --install-only   Prepare worktree without running tests
#   --clean          Remove existing worktree and recreate from scratch
#
# Examples:
#   ./test-branch.sh main
#   ./test-branch.sh update-deps-react-18-19
#   ./test-branch.sh v1.3.0 --install-only
#   ./test-branch.sh fix/calendar --clean
# ──────────────────────────────────────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

log()   { echo -e "${BLUE}[branch-test]${NC} $*"; }
ok()    { echo -e "${GREEN}[✓]${NC} $*"; }
warn()  { echo -e "${YELLOW}[!]${NC} $*"; }
fail()  { echo -e "${RED}[✗]${NC} $*"; }

# ─── Parse arguments ─────────────────────────────────────────────────────────

REF=""
INSTALL_ONLY=false
CLEAN=false

for arg in "$@"; do
  case "$arg" in
    --install-only) INSTALL_ONLY=true ;;
    --clean)        CLEAN=true ;;
    -*)             fail "Unknown flag: $arg"; exit 1 ;;
    *)              REF="$arg" ;;
  esac
done

if [ -z "$REF" ]; then
  fail "Usage: $0 <ref> [--install-only] [--clean]"
  exit 1
fi

# ─── Resolve project root (find .git directory) ──────────────────────────────

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -z "$PROJECT_ROOT" ]; then
  fail "Not inside a git repository"
  exit 1
fi

cd "$PROJECT_ROOT"

# ─── Ensure .worktrees/ is in .gitignore ─────────────────────────────────────

if ! grep -q '^\.worktrees/' .gitignore 2>/dev/null; then
  echo '.worktrees/' >> .gitignore
  ok "Added .worktrees/ to .gitignore"
fi

# ─── Verify ref exists ───────────────────────────────────────────────────────

if ! git rev-parse --verify "$REF" >/dev/null 2>&1; then
  fail "Git ref '$REF' does not exist"
  echo "  Hint: try 'git fetch origin' first"
  exit 1
fi

# ─── Sanitize ref for directory name ─────────────────────────────────────────

WORKTREE_NAME=$(echo "$REF" | sed 's/[\/:]/-/g')
WORKTREE_DIR="$PROJECT_ROOT/.worktrees/$WORKTREE_NAME"

# ─── Handle --clean ──────────────────────────────────────────────────────────

if [ "$CLEAN" = true ] && [ -d "$WORKTREE_DIR" ]; then
  log "Removing existing worktree: $WORKTREE_DIR"
  git worktree remove "$WORKTREE_DIR" --force 2>/dev/null || rm -rf "$WORKTREE_DIR"
  git worktree prune
  ok "Worktree removed"
fi

# ─── Create worktree if needed ───────────────────────────────────────────────

if [ ! -d "$WORKTREE_DIR" ]; then
  log "Creating worktree for ${BOLD}$REF${NC} at $WORKTREE_DIR"
  git worktree add "$WORKTREE_DIR" "$REF"
  ok "Worktree created"
else
  log "Worktree already exists at $WORKTREE_DIR"
  cd "$WORKTREE_DIR"
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "detached")
  if [ "$CURRENT_BRANCH" != "HEAD" ] && [ "$CURRENT_BRANCH" != "detached" ]; then
    log "Updating worktree..."
    git pull --ff-only 2>/dev/null || warn "Could not fast-forward (may have local changes)"
  fi
fi

cd "$WORKTREE_DIR"

# ─── Copy test infrastructure if missing ─────────────────────────────────────
# The worktree may be from a commit before the test harness was added.
# Copy test-consumers/ and inject scripts into package.json from the main tree.

if [ ! -d "$WORKTREE_DIR/test-consumers" ]; then
  log "Test harness not found in this ref — copying from main tree..."
  cp -r "$PROJECT_ROOT/test-consumers" "$WORKTREE_DIR/test-consumers"
  # Remove node_modules and tarballs from copied dirs (will be rebuilt)
  rm -rf "$WORKTREE_DIR/test-consumers"/.tarballs
  rm -rf "$WORKTREE_DIR/test-consumers"/*/node_modules
  rm -rf "$WORKTREE_DIR/test-consumers"/*/pnpm-lock.yaml
  ok "Test harness copied"
fi

# Ensure each consumer app has its own pnpm-workspace.yaml to isolate from root workspace
for app_dir in "$WORKTREE_DIR/test-consumers"/vite-r18 "$WORKTREE_DIR/test-consumers"/vite-r19 "$WORKTREE_DIR/test-consumers"/next-r18 "$WORKTREE_DIR/test-consumers"/next-r19; do
  if [ -d "$app_dir" ] && [ ! -f "$app_dir/pnpm-workspace.yaml" ]; then
    echo "" > "$app_dir/pnpm-workspace.yaml"
  fi
done

# Inject test:consumers scripts into package.json if missing
if ! grep -q '"test:consumers"' "$WORKTREE_DIR/package.json" 2>/dev/null; then
  log "Injecting test:consumers scripts into package.json..."
  # Use node to safely merge scripts into package.json
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('$WORKTREE_DIR/package.json', 'utf8'));
    const scripts = {
      'test:consumers': 'pnpm run build:hooks && pnpm run build:ui && pnpm run test:consumers:pack && pnpm run test:consumers:install && pnpm run test:consumers:run',
      'test:consumers:pack': 'mkdir -p test-consumers/.tarballs && cd packages/hooks && pnpm pack --pack-destination ../../test-consumers/.tarballs && cd ../ui && pnpm pack --pack-destination ../../test-consumers/.tarballs',
      'test:consumers:install': 'cd test-consumers/vite-r18 && pnpm install && cd ../vite-r19 && pnpm install && cd ../next-r18 && pnpm install && cd ../next-r19 && pnpm install',
      'test:consumers:run': 'cd test-consumers/vite-r18 && pnpm test; cd ../vite-r19 && pnpm test; cd ../next-r18 && pnpm test; cd ../next-r19 && pnpm test',
    };
    pkg.scripts = { ...pkg.scripts, ...scripts };
    fs.writeFileSync('$WORKTREE_DIR/package.json', JSON.stringify(pkg, null, '\t') + '\n');
  "
  ok "Scripts injected"
fi

# ─── Conditional pnpm install ────────────────────────────────────────────────

LOCK_HASH_FILE="$WORKTREE_DIR/.lockfile-hash"
CURRENT_HASH=""

if [ -f "$WORKTREE_DIR/pnpm-lock.yaml" ]; then
  CURRENT_HASH=$(md5sum "$WORKTREE_DIR/pnpm-lock.yaml" | cut -d' ' -f1)
fi

NEEDS_INSTALL=false

if [ ! -d "$WORKTREE_DIR/node_modules" ]; then
  NEEDS_INSTALL=true
elif [ ! -f "$LOCK_HASH_FILE" ]; then
  NEEDS_INSTALL=true
elif [ "$(cat "$LOCK_HASH_FILE")" != "$CURRENT_HASH" ]; then
  NEEDS_INSTALL=true
fi

if [ "$NEEDS_INSTALL" = true ]; then
  log "Installing dependencies..."
  pnpm install
  echo "$CURRENT_HASH" > "$LOCK_HASH_FILE"
  ok "Dependencies installed"
else
  ok "Dependencies up to date (lockfile unchanged)"
fi

# ─── Stop here if --install-only ─────────────────────────────────────────────

if [ "$INSTALL_ONLY" = true ]; then
  ok "Worktree ready at: $WORKTREE_DIR"
  exit 0
fi

# ─── Run consumer tests ─────────────────────────────────────────────────────

COMMIT_SHORT=$(git rev-parse --short HEAD)
COMMIT_DATE=$(git log -1 --format="%cs")

echo ""
echo -e "${BOLD}════════════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}  Branch Testing: ${BLUE}$REF${NC} ${BOLD}($COMMIT_SHORT)${NC}"
echo -e "${BOLD}  Date: $COMMIT_DATE${NC}"
echo -e "${BOLD}════════════════════════════════════════════════════════════${NC}"
echo ""

log "Running consumer tests..."

if pnpm test:consumers; then
  echo ""
  ok "${GREEN}${BOLD}All consumer tests passed${NC}"
else
  EXIT_CODE=$?
  echo ""
  fail "${RED}${BOLD}Consumer tests failed (exit code: $EXIT_CODE)${NC}"
  warn "Review failures above — they indicate real incompatibilities"
  exit $EXIT_CODE
fi
