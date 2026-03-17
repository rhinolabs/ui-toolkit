# Consumer Integration Tests

Validates that `@rhinolabs/ui` and `@rhinolabs/react-hooks` work correctly from a real consumer's perspective across 4 framework + React version combinations.

## Test Apps

| App        | Framework              | React | What it validates                   |
| ---------- | ---------------------- | ----- | ----------------------------------- |
| `vite-r18` | Vite (CSR)             | 18    | Client-side rendering with React 18 |
| `vite-r19` | Vite (CSR)             | 19    | Client-side rendering with React 19 |
| `next-r18` | Next.js 14 (SSR)       | 18    | Server-side rendering with React 18 |
| `next-r19` | Next.js 15 (SSR + RSC) | 19    | Server-side rendering with React 19 |

## Quick Start (all 4 suites)

From the project root:

```bash
pnpm test:consumers
```

This single command runs the full pipeline:

1. Builds `@rhinolabs/react-hooks`
2. Builds `@rhinolabs/ui`
3. Packs both as tarballs (`.tgz`)
4. Installs tarballs in each consumer app
5. Runs tests in all 4 apps

## Step by Step (manual)

### 1. Build the libraries

```bash
pnpm run build:hooks
pnpm run build:ui
```

### 2. Pack tarballs

```bash
mkdir -p test-consumers/.tarballs
cd packages/hooks && pnpm pack --pack-destination ../../test-consumers/.tarballs
cd ../ui && pnpm pack --pack-destination ../../test-consumers/.tarballs
cd ../..
```

This creates:

- `test-consumers/.tarballs/rhinolabs-react-hooks-X.X.X.tgz`
- `test-consumers/.tarballs/rhinolabs-ui-X.X.X.tgz`

### 3. Install in consumer apps

```bash
cd test-consumers/vite-r18 && pnpm install
cd ../vite-r19 && pnpm install
cd ../next-r18 && pnpm install
cd ../next-r19 && pnpm install
cd ../..
```

### 4. Run tests

All at once:

```bash
pnpm test:consumers:run
```

Or individually:

```bash
pnpm test:consumer:vite-r18
pnpm test:consumer:vite-r19
pnpm test:consumer:next-r18
pnpm test:consumer:next-r19
```

## Testing a Different Branch

Use the `test-branch.sh` script to test any branch in isolation via git worktrees:

```bash
# Test a branch (creates isolated worktree with its own node_modules)
.claude/skills/branch-testing/scripts/test-branch.sh feature/my-branch

# Only prepare worktree, don't run tests yet
.claude/skills/branch-testing/scripts/test-branch.sh feature/my-branch --install-only

# Clean and recreate from scratch
.claude/skills/branch-testing/scripts/test-branch.sh feature/my-branch --clean
```

Worktrees are created in `.worktrees/` (gitignored). Each one has its own `node_modules`, so switching between branches never contaminates dependencies.

## What Gets Tested

- **55 components** — Render smoke tests with minimal props, sub-component verification
- **37 hooks** — Invocation tests, return type validation
- **Skipped** (by design): Form (needs react-hook-form), Sidebar (needs SidebarProvider), Typography (namespace only), Toaster (Vite apps only — needs ThemeProvider)

## Project Structure

```
test-consumers/
├── .tarballs/              # Build artifacts (gitignored)
├── shared-utils/           # Shared test logic (registries, mocks, types)
│   └── src/
│       ├── components/
│       │   └── component-registry.ts   # 55 component entries
│       ├── hooks/
│       │   └── hook-registry.ts        # 37 hook entries
│       ├── helpers/
│       │   └── browser-mocks.ts        # IntersectionObserver, ResizeObserver, etc.
│       ├── types.ts
│       └── index.ts
├── vite-r18/               # Vite + React 18
├── vite-r19/               # Vite + React 19
├── next-r18/               # Next.js 14 + React 18
└── next-r19/               # Next.js 15 + React 19
```

Each app has:

- `package.json` — Dependencies with tarball references
- `vitest.config.ts` — Vitest + happy-dom + PostCSS config
- `src/components.test.tsx` — Component render tests
- `src/hooks.test.tsx` — Hook invocation tests
- `src/setup.ts` — Browser API mocks
- `src/styles.css` — Imports `@rhinolabs/ui/styles.css`

## Philosophy

- A failing test is a **successful detection**, not a problem to hide
- NEVER adjust tests to force a green suite
- If a change breaks a consumer, the test MUST fail and surface the error clearly
