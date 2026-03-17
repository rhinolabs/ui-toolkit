/**
 * Sets up browser API mocks required by @rhinolabs/ui components and
 * @rhinolabs/react-hooks in a happy-dom / jsdom test environment.
 *
 * Call this in your Vitest setupFiles before any tests run.
 */
export function setupBrowserMocks(): void {
  // --- IntersectionObserver ---
  if (typeof globalThis.IntersectionObserver === "undefined") {
    globalThis.IntersectionObserver = class IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = "0px";
      readonly thresholds: ReadonlyArray<number> = [0];
      private callback: IntersectionObserverCallback;

      constructor(
        callback: IntersectionObserverCallback,
        _options?: IntersectionObserverInit,
      ) {
        this.callback = callback;
      }

      observe(_target: Element): void {
        // Immediately report as intersecting so useOnScreen and similar hooks work
        this.callback(
          [
            {
              isIntersecting: true,
              intersectionRatio: 1,
              boundingClientRect: {} as DOMRectReadOnly,
              intersectionRect: {} as DOMRectReadOnly,
              rootBounds: null,
              target: _target,
              time: Date.now(),
            },
          ],
          this as unknown as IntersectionObserver,
        );
      }

      unobserve(_target: Element): void {}
      disconnect(): void {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    } as unknown as typeof IntersectionObserver;
  }

  // --- ResizeObserver ---
  if (typeof globalThis.ResizeObserver === "undefined") {
    globalThis.ResizeObserver = class ResizeObserver {
      private callback: ResizeObserverCallback;

      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
      }

      observe(_target: Element, _options?: ResizeObserverOptions): void {}
      unobserve(_target: Element): void {}
      disconnect(): void {}
    } as unknown as typeof ResizeObserver;
  }

  // --- matchMedia ---
  if (typeof globalThis.matchMedia === "undefined") {
    globalThis.matchMedia = (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList;
  }

  // --- navigator.clipboard ---
  if (
    typeof globalThis.navigator !== "undefined" &&
    !globalThis.navigator.clipboard
  ) {
    Object.defineProperty(globalThis.navigator, "clipboard", {
      value: {
        writeText: async (_text: string) => {},
        readText: async () => "",
      },
      writable: true,
      configurable: true,
    });
  }

  // --- navigator.share / navigator.canShare ---
  if (typeof globalThis.navigator !== "undefined") {
    if (!("share" in globalThis.navigator)) {
      Object.defineProperty(globalThis.navigator, "share", {
        value: async (_data?: ShareData) => {},
        writable: true,
        configurable: true,
      });
    }
    if (!("canShare" in globalThis.navigator)) {
      Object.defineProperty(globalThis.navigator, "canShare", {
        value: (_data?: ShareData) => true,
        writable: true,
        configurable: true,
      });
    }
  }

  // --- navigator.getBattery ---
  if (typeof globalThis.navigator !== "undefined") {
    if (!("getBattery" in globalThis.navigator)) {
      Object.defineProperty(globalThis.navigator, "getBattery", {
        value: async () => ({
          level: 1,
          charging: true,
          chargingTime: 0,
          dischargingTime: Infinity,
          addEventListener: () => {},
          removeEventListener: () => {},
        }),
        writable: true,
        configurable: true,
      });
    }
  }

  // --- navigator.geolocation ---
  if (typeof globalThis.navigator !== "undefined") {
    if (!globalThis.navigator.geolocation) {
      Object.defineProperty(globalThis.navigator, "geolocation", {
        value: {
          getCurrentPosition: (
            success: PositionCallback,
            _error?: PositionErrorCallback,
          ) => {
            success({
              coords: {
                latitude: 0,
                longitude: 0,
                altitude: null,
                accuracy: 1,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
              },
              timestamp: Date.now(),
            } as GeolocationPosition);
          },
          watchPosition: () => 0,
          clearWatch: () => {},
        },
        writable: true,
        configurable: true,
      });
    }
  }

  // --- URL.createObjectURL / URL.revokeObjectURL ---
  if (typeof globalThis.URL !== "undefined") {
    if (!globalThis.URL.createObjectURL) {
      globalThis.URL.createObjectURL = (_blob: Blob) =>
        "blob:mock-object-url";
    }
    if (!globalThis.URL.revokeObjectURL) {
      globalThis.URL.revokeObjectURL = (_url: string) => {};
    }
  }

  // --- window.scrollTo ---
  if (typeof globalThis.scrollTo === "undefined") {
    globalThis.scrollTo = (
      _xOrOptions?: number | ScrollToOptions,
      _y?: number,
    ) => {};
  }

  // --- Element.prototype.scrollIntoView (used by Radix components) ---
  if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function (_arg?: boolean | ScrollIntoViewOptions) {};
  }
}
