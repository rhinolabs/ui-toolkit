import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import * as Components from "@rhinolabs/ui";
import { componentRegistry } from "@test-utils/components/component-registry";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}

describe("Component smoke tests", () => {
  // Tier 1: Export existence and type
  describe("Tier 1: Exports exist", () => {
    for (const entry of componentRegistry) {
      it(`${entry.name} is exported and is a function or object`, () => {
        const Component = (Components as Record<string, unknown>)[entry.name];
        expect(Component).toBeDefined();
        expect(typeof Component === "function" || typeof Component === "object").toBe(
          true,
        );
      });
    }
  });

  // Tier 2: Render smoke test
  describe("Tier 2: Renders without errors", () => {
    for (const entry of componentRegistry) {
      // Skip components that require a context provider (e.g., Form needs react-hook-form)
      if (entry.requiresProvider) {
        it.skip(`${entry.name} — requires provider context (skipped)`, () => {});
        continue;
      }

      it(`${entry.name} renders without crashing`, () => {
        const Component = (Components as Record<string, unknown>)[entry.name] as React.ComponentType<Record<string, unknown>>;
        const { children, ...restProps } = entry.minimalProps;

        // Components that need ThemeProvider get wrapped automatically
        const wrapper = entry.requiresThemeProvider ? ThemeWrapper : undefined;

        // Render the component with minimal props — do NOT catch errors.
        // If this throws, the test fails. That is intentional.
        const { container } = render(
          React.createElement(Component, restProps, children as React.ReactNode),
          { wrapper },
        );

        expect(container).toBeTruthy();
      });
    }
  });

  // Tier 3: Sub-component access
  describe("Tier 3: Sub-component access", () => {
    const compoundEntries = componentRegistry.filter(
      (e) => e.hasSubComponents && e.subComponentNames.length > 0,
    );

    for (const entry of compoundEntries) {
      describe(`${entry.name} sub-components`, () => {
        for (const sub of entry.subComponentNames) {
          it(`${entry.name}.${sub} is accessible`, () => {
            const Component = (Components as Record<string, unknown>)[entry.name] as Record<string, unknown>;
            expect(Component[sub]).toBeDefined();
          });
        }
      });
    }
  });
});
