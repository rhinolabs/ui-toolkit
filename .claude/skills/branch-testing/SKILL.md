---
name: branch-testing
description: >
  Use when validating that a branch, PR, or tag does not break consumers of a library.
  Trigger: "validate branch", "test branch", "probar branch", "consumer tests",
  "test PR", "probar PR", "validar cambios".
  Does NOT cover writing new tests (see testing-strategies) or quality standards (see rhinolabs-standards).
---

# Branch Testing

Validate any git ref (branch, tag, commit) against consumer integration tests using isolated git worktrees. Each worktree gets its own `node_modules`, preventing dependency contamination between versions.

## Precedence

This skill defers to:
- **rhinolabs-standards** — For testing requirements and quality standards
- **testing-strategies** — For general testing approaches and TDD

When guidance conflicts, always follow the skill with higher precedence.

## Procedure

### 0. Ensure .gitignore

Before creating any worktree, verify `.worktrees/` is in `.gitignore`. If not, add it:

```bash
if ! grep -q '^\.worktrees/' .gitignore 2>/dev/null; then
  echo '.worktrees/' >> .gitignore
fi
```

### 1. Setup worktree

Create an isolated worktree for the target ref:

```bash
REF="$1"
WORKTREE_DIR=".worktrees/$(echo "$REF" | sed 's/[\/:]/-/g')"

# Create worktree if it doesn't exist
if [ ! -d "$WORKTREE_DIR" ]; then
  git worktree add "$WORKTREE_DIR" "$REF"
fi
```

### 2. Copy test infrastructure (if missing)

The target ref may predate the test harness. If `test-consumers/` does not exist in the worktree, copy it from the main tree and inject the `test:consumers` scripts into `package.json`:

```bash
if [ ! -d "$WORKTREE_DIR/test-consumers" ]; then
  cp -r "$PROJECT_ROOT/test-consumers" "$WORKTREE_DIR/test-consumers"
  rm -rf "$WORKTREE_DIR/test-consumers"/.tarballs
  rm -rf "$WORKTREE_DIR/test-consumers"/*/node_modules
  rm -rf "$WORKTREE_DIR/test-consumers"/*/pnpm-lock.yaml
fi

# Inject scripts if missing
if ! grep -q '"test:consumers"' "$WORKTREE_DIR/package.json"; then
  # Use node to merge test:consumers scripts into package.json
fi
```

### 3. Isolate consumer apps from root workspace

Each consumer app MUST have its own `pnpm-workspace.yaml` (empty file). Without it, `pnpm install` resolves to the monorepo root workspace and skips the consumer app's own dependencies.

```bash
for app_dir in vite-r18 vite-r19 next-r18 next-r19; do
  echo "" > "$WORKTREE_DIR/test-consumers/$app_dir/pnpm-workspace.yaml"
done
```

### 4. Install dependencies (conditional)

Only run `pnpm install` when the lockfile has changed:

```bash
LOCK_HASH_FILE="$WORKTREE_DIR/.lockfile-hash"
CURRENT_HASH=$(md5sum "$WORKTREE_DIR/pnpm-lock.yaml" | cut -d' ' -f1)

if [ ! -f "$LOCK_HASH_FILE" ] || [ "$(cat "$LOCK_HASH_FILE")" != "$CURRENT_HASH" ]; then
  cd "$WORKTREE_DIR" && pnpm install
  echo "$CURRENT_HASH" > "$LOCK_HASH_FILE"
fi
```

### 5. Build, pack, and test

Run the full consumer test pipeline inside the worktree:

```bash
cd "$WORKTREE_DIR"
pnpm test:consumers
```

This builds the library, packs tarballs, installs them in consumer apps, and runs all test suites.

### 6. Report results

Use this format for reporting:

```markdown
## Branch Testing Results

**Ref**: `<branch/tag/commit>`
**Date**: YYYY-MM-DD
**Commit**: `<short-hash>`

| App | Passed | Skipped | Failed |
|-----|--------|---------|--------|
| vite-r18 | — | — | — |
| vite-r19 | — | — | — |
| next-r18 | — | — | — |
| next-r19 | — | — | — |

**Conclusion**: <summary of findings>
```

## Bundled script

Run `scripts/test-branch.sh` from the skill directory for automated execution:

```bash
# Test a branch
./scripts/test-branch.sh update-deps-react-18-19

# Only prepare worktree without running tests
./scripts/test-branch.sh update-deps-react-18-19 --install-only

# Clean and recreate worktree from scratch
./scripts/test-branch.sh update-deps-react-18-19 --clean
```

Read `scripts/test-branch.sh` from this skill's directory when the user asks to run branch tests.

## Gotchas

- **node_modules contamination**: Switching branches with `git checkout` does NOT reinstall dependencies. The worktree approach exists specifically to avoid this. NEVER suggest `git checkout` + `pnpm install` as an alternative — it modifies the working directory's `node_modules`.
- **pnpm workspace resolution**: Consumer apps inside a monorepo will resolve `pnpm install` to the root workspace unless each app has its own `pnpm-workspace.yaml` (even an empty one). Without this, `node_modules` is never created in the consumer app. This caused `vitest: not found` errors in practice.
- **Testing older commits**: Refs that predate the test harness won't have `test-consumers/` or `test:consumers` scripts. The bundled script handles this automatically by copying infrastructure and injecting scripts.
- **Lockfile divergence**: Two branches can have completely different `pnpm-lock.yaml` files. Each worktree resolves its own dependencies independently — this is the correct behavior.
- **Tarball isolation**: Consumer test tarballs (`.tarballs/`) are generated INSIDE each worktree. They never cross-contaminate the main directory or other worktrees.
- **Worktree cleanup**: Git worktrees persist until explicitly removed. Use `--clean` to recreate, or `git worktree remove <path>` to delete manually. Add `.worktrees/` to `.gitignore`.
- **Branch updates**: If the remote branch gets new commits, the worktree does NOT auto-update. Run `cd .worktrees/<ref> && git pull` to update.

## CRITICAL: Test integrity

A green suite that hides real failures is **worse than no tests at all**.

- A failing test is a **successful detection**, not a problem to hide
- NEVER weaken assertions, swallow errors, or skip tests to achieve a green suite
- If a branch introduces a breaking change, the test **MUST fail** and surface the error clearly
- Report failures AS-IS — they are the whole point of this validation

## When NOT to use

- Single file edits or quick fixes — overkill
- Changes that don't affect the library's public API or dependencies
- Writing new tests (use **testing-strategies** instead)

---

**Last Updated**: 2026-03-17
