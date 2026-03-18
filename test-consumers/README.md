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

## Visual Playground

Each consumer app includes a visual playground that renders all 55 components grouped by category on a single page. This provides a quick way to visually smoke-test components across all framework and React version combinations.

### Prerequisites

Before launching a playground, the libraries must be built and installed as tarballs in the consumer apps. If you have already run `pnpm test:consumers`, this is already done. Otherwise:

```bash
pnpm run build:hooks && pnpm run build:ui
pnpm test:consumers:pack
pnpm test:consumers:install
```

### Launch a Playground

From the project root, use the convenience scripts:

```bash
pnpm playground:vite-r18    # http://localhost:5180
pnpm playground:vite-r19    # http://localhost:5190
pnpm playground:next-r18    # http://localhost:3018
pnpm playground:next-r19    # http://localhost:3019
```

### Port Assignments

| App        | Port | Mnemonic               |
| ---------- | ---- | ---------------------- |
| `vite-r18` | 5180 | 51 + **80** (React 18) |
| `vite-r19` | 5190 | 51 + **90** (React 19) |
| `next-r18` | 3018 | 30 + **18** (React 18) |
| `next-r19` | 3019 | 30 + **19** (React 19) |

### Side-by-Side Comparison

Run two playgrounds simultaneously to compare rendering across frameworks or React versions:

```bash
# Terminal 1
pnpm playground:vite-r18

# Terminal 2
pnpm playground:vite-r19
```

Then open both URLs in browser tabs and compare side by side.

For comparing the same app across git worktrees, each worktree runs its own dev server process. If both worktrees target the same app (and thus the same port), override the port in one of them:

```bash
# In worktree B
cd test-consumers/vite-r18 && pnpm vite --port 5181
```

## What Gets Tested

### Automated Tests (per app)

| File                  | Tests | What it validates                                                 |
| --------------------- | ----- | ----------------------------------------------------------------- |
| `components.test.tsx` | ~326  | Exports exist, render without crashing, sub-components accessible |
| `hooks.test.tsx`      | 61    | All hooks invocable, return expected types                        |
| `behavior.test.tsx`   | 18-19 | Interactive behavior: clicks, typing, toggling, dialog open/close |
| `findings.test.tsx`   | ~4    | Known issues documented as executable tests                       |
| `visual/components.spec.ts` | ~54 | Per-component screenshots in Chromium (Playwright)           |

**Skipped** (by design): Form (needs react-hook-form), Sidebar (needs SidebarProvider), Typography (namespace only).

### Visual Regression Tests (Playwright)

Per-component screenshots in a real Chromium browser across all 4 apps (~214 tests). Detects CSS/layout regressions that happy-dom cannot catch.

```bash
# Run all visual tests (generates baselines on first run)
pnpm test:visual

# Run per app
pnpm test:visual:vite-r18
pnpm test:visual:next-r19

# Update baselines after intentional visual changes
pnpm test:visual:update
```

Baselines are committed to git in `__screenshots__/` directories. Each worktree carries its own baselines.

### Visual Playground (manual)

All 55 components rendered in a real browser with interactive props — buttons fire alerts, selects have options, toggles change state.

## Findings

Known issues discovered during testing are documented in `findings/`:

```
findings/
└── sidebar-ssr-crash.md          # Sidebar crashes Next.js (useWindowSize accesses window)
```

Each finding has a corresponding automated test in `*/src/findings.test.tsx`.

## Project Structure

```
test-consumers/
├── .tarballs/              # Build artifacts (gitignored)
├── findings/               # Documented issues found during testing
├── shared-utils/           # Shared test logic
│   └── src/
│       ├── components/
│       │   └── component-registry.ts   # 55 component entries with categories
│       ├── hooks/
│       │   └── hook-registry.ts        # 37 hook entries
│       ├── helpers/
│       │   └── browser-mocks.ts        # IntersectionObserver, ResizeObserver, etc.
│       ├── playground/
│       │   ├── PlaygroundRenderer.tsx   # Visual playground component
│       │   └── playground-registry.ts  # Render hints per component
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
- `src/components.test.tsx` — Component smoke tests
- `src/hooks.test.tsx` — Hook invocation tests
- `src/behavior.test.tsx` — Interactive behavior tests
- `src/findings.test.tsx` — Known issues as executable tests
- `src/setup.ts` — Browser API mocks
- `src/styles.css` — Imports `@rhinolabs/ui/styles.css`

Vite apps also have: `index.html`, `src/main.tsx`, `src/App.tsx`, `vite.config.ts` (playground entry points).

Next.js apps also have: `next.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/playground-client.tsx` (playground entry points with SSR workaround).

## Philosophy

- A failing test is a **successful detection**, not a problem to hide
- NEVER adjust tests to force a green suite
- If a change breaks a consumer, the test MUST fail and surface the error clearly

## Findings

All findings are documented in `findings/` with full root cause analysis and evidence. Each finding also has corresponding automated tests in `*/src/findings.test.tsx`.
