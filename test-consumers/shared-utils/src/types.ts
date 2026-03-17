/**
 * Registry entry for a UI component export from @rhinolabs/ui.
 * Data-only — no React imports. Each consumer app provides its own React.
 */
export interface ComponentRegistryEntry {
  /** Export name from @rhinolabs/ui (e.g., "Button", "Dialog") */
  name: string;
  /** Whether this component has sub-components (e.g., Dialog.Content) */
  hasSubComponents: boolean;
  /** Sub-component names accessible via dot notation (e.g., ["Content", "Trigger"]) */
  subComponentNames: string[];
  /** Whether this component requires a context provider to render (e.g., Form needs react-hook-form) */
  requiresProvider: boolean;
  /** Whether this component requires next-themes ThemeProvider (e.g., Toaster) */
  requiresThemeProvider: boolean;
  /** Minimal props to render the component without crashing */
  minimalProps: Record<string, unknown>;
}

/**
 * Registry entry for a hook export from @rhinolabs/react-hooks.
 * Data-only — no React imports. Each consumer app provides its own React.
 */
export interface HookRegistryEntry {
  /** Hook name (e.g., "useToggle") */
  name: string;
  /** Minimal arguments to invoke the hook without crashing */
  args: unknown[];
  /** Expected top-level keys on the return value (null if return is a primitive) */
  expectedKeys: string[] | null;
  /** Browser API this hook requires, or null if none (e.g., "IntersectionObserver") */
  requiresBrowserAPI: string | null;
  /** Whether this hook returns void/undefined (e.g., useEventListener, useOutsideClick) */
  returnsVoid?: boolean;
}
