# Finding: Sidebar crashes Next.js (SSR)

**Date**: 2026-03-18
**Severity**: HIGH
**Caused by**: Pre-existing bug (NOT caused by PR #84)
**Affects**: Any Next.js consumer that imports `@rhinolabs/ui`

## Description

Both Next.js playground apps (next-r18 and next-r19) return HTTP 500 on page load.

```
ReferenceError: window is not defined
    at useWindowSize (node_modules/@rhinolabs/react-hooks/dist/hooks/useWindowSize.js:11:16)
    at sidebar.js:46:95
```

## Root Cause

The `Sidebar` component uses `useWindowSize` from `@rhinolabs/react-hooks`, which accesses `window` directly at module level without checking if it exists. When a Next.js app imports `@rhinolabs/ui` (which re-exports all components including Sidebar), Next.js attempts server-side rendering where `window` does not exist → crash.

The `"use client"` directive on page.tsx only prevents the component from rendering on the server — it does NOT prevent import-level side effects from executing during SSR module resolution.

## Workaround Applied

In the playground, we used `next/dynamic` with `ssr: false` to load components only on the client:

```tsx
const PlaygroundClient = dynamic(() => import("./playground-client"), {
  ssr: false,
});
```

## Possible Fixes

1. Fix `useWindowSize` to guard: `typeof window !== "undefined"` before accessing `window`
2. Lazy-initialize the hook — don't read `window` at module load time
3. Consumer workaround: use `next/dynamic` with `ssr: false` for pages using Sidebar
