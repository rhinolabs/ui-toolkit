# Finding: Calendar visually broken

**Date**: 2026-03-18
**Severity**: HIGH
**Caused by**: PR #84 (commit `d9ffeb1`)
**Affects**: All consumers (React 18 and React 19, Vite and Next.js)

## Description

The Calendar component renders with day numbers jammed together, no grid layout. Confirmed visually in all 4 playground apps (vite-r18, vite-r19, next-r18, next-r19).

## What we know

- The DOM has the correct Tailwind classNames applied (`flex`, `w-full`, `mt-2` on week rows)
- The component mounts without errors
- The visual layout is broken despite correct classNames
- The issue is CSS-related — classNames are present but the styles don't produce the expected grid layout
- `react-day-picker@9.14.0` is installed in all 4 consumer apps

## What we don't know

- Why the Tailwind classes don't produce the correct layout
- Whether this is a Tailwind CSS `@layer` ordering issue, a specificity conflict, or a structural change in react-day-picker v9's HTML

## Next steps

- Inspect Calendar in browser DevTools to see if CSS rules are applying or being overridden
- Check if Calendar renders correctly on the docs site
