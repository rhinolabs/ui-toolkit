import { renderHook } from "@testing-library/react";
import * as Hooks from "@rhinolabs/react-hooks";
import { hookRegistry } from "@test-utils/hooks/hook-registry";

describe("Hook smoke tests", () => {
  // Tier 1: Export exists and can be invoked
  describe("Tier 1: Invocation without errors", () => {
    for (const entry of hookRegistry) {
      it(`${entry.name} is exported and can be invoked`, () => {
        const hookFn = (Hooks as Record<string, unknown>)[entry.name];

        // Verify the export exists and is a function
        expect(hookFn).toBeDefined();
        expect(typeof hookFn).toBe("function");

        // Invoke the hook via renderHook — do NOT catch errors.
        // If the hook throws, the test fails. That is intentional.
        const { result } = renderHook(() =>
          (hookFn as (...args: unknown[]) => unknown)(...entry.args),
        );

        // Hooks that return void/undefined are valid — only assert defined for non-void hooks
        if (!entry.returnsVoid) {
          expect(result.current).toBeDefined();
        }
      });
    }
  });

  // Tier 2: Return shape validation (for hooks with expectedKeys)
  describe("Tier 2: Return shape", () => {
    const entriesWithKeys = hookRegistry.filter(
      (e) => e.expectedKeys !== null && e.expectedKeys.length > 0,
    );

    for (const entry of entriesWithKeys) {
      it(`${entry.name} returns expected keys`, () => {
        const hookFn = (Hooks as Record<string, unknown>)[entry.name] as (
          ...args: unknown[]
        ) => unknown;

        // Invoke the hook — do NOT catch errors.
        const { result } = renderHook(() => hookFn(...entry.args));

        // Verify each expected key exists on the return value
        for (const key of entry.expectedKeys!) {
          expect(result.current).toHaveProperty(key);
        }
      });
    }
  });
});
