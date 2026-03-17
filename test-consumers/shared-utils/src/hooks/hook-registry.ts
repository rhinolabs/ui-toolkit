import type { HookRegistryEntry } from "../types";

/**
 * Complete registry of all 37 hook exports from @rhinolabs/react-hooks.
 *
 * This is DATA ONLY — no React imports. Each consumer app reads this
 * registry and invokes hooks in its own test files using renderHook
 * from its own @testing-library/react.
 *
 * IMPORTANT: args, expectedKeys, and requiresBrowserAPI are verified
 * against the actual hook source code, not the design doc.
 */
export const hookRegistry: HookRegistryEntry[] = [
  // ─── Data ──────────────────────────────────────────────────────────────────

  {
    name: "useArray",
    args: [[1, 2, 3]],
    expectedKeys: ["array", "set", "push", "filter", "update", "remove", "clear"],
    requiresBrowserAPI: null,
  },

  // ─── Async ─────────────────────────────────────────────────────────────────

  {
    name: "useAsync",
    args: [],
    expectedKeys: ["execute", "data", "isLoading", "error", "isSuccess"],
    requiresBrowserAPI: null,
  },
  {
    name: "useFetch",
    args: ["https://example.com/api"],
    expectedKeys: ["data", "error", "isLoading", "isSuccess"],
    requiresBrowserAPI: "fetch",
  },

  // ─── Timer ─────────────────────────────────────────────────────────────────

  {
    name: "useCountdown",
    args: [0, 10],
    expectedKeys: [
      "current",
      "isPaused",
      "isOver",
      "pause",
      "play",
      "reset",
      "togglePause",
    ],
    requiresBrowserAPI: null,
  },
  {
    name: "useCountup",
    args: [0, 10],
    expectedKeys: [
      "current",
      "isPaused",
      "isOver",
      "pause",
      "play",
      "reset",
      "togglePause",
    ],
    requiresBrowserAPI: null,
  },
  {
    name: "useStopwatch",
    args: [],
    expectedKeys: [
      "current",
      "isPaused",
      "isOver",
      "currentDays",
      "currentHours",
      "currentMinutes",
      "currentSeconds",
      "elapsedSeconds",
      "pause",
      "play",
      "reset",
      "togglePause",
    ],
    requiresBrowserAPI: null,
  },
  {
    name: "useTimer",
    args: ["00:00:01:00"],
    expectedKeys: [
      "current",
      "isPaused",
      "isOver",
      "currentDays",
      "currentHours",
      "currentMinutes",
      "currentSeconds",
      "elapsedSeconds",
      "remainingSeconds",
      "pause",
      "play",
      "reset",
      "togglePause",
    ],
    requiresBrowserAPI: null,
  },

  // ─── Utility ───────────────────────────────────────────────────────────────

  {
    name: "useDebounce",
    args: ["test", 300],
    expectedKeys: null,
    requiresBrowserAPI: null,
  },
  {
    name: "useToggle",
    args: [false],
    expectedKeys: ["current", "handleToggle"],
    requiresBrowserAPI: null,
  },
  {
    name: "useRandomColor",
    args: [],
    expectedKeys: ["color", "generateColor"],
    requiresBrowserAPI: null,
  },

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  {
    name: "useFirstRender",
    args: [],
    expectedKeys: null,
    requiresBrowserAPI: null,
  },
  {
    name: "usePrevious",
    args: ["test"],
    expectedKeys: null,
    requiresBrowserAPI: null,
    returnsVoid: true,
  },

  // ─── Form ──────────────────────────────────────────────────────────────────

  {
    name: "useInput",
    args: [""],
    expectedKeys: ["inputValue", "onInputChange"],
    requiresBrowserAPI: null,
  },

  // ─── DOM (event-based, work with happy-dom) ────────────────────────────────

  {
    name: "useEventListener",
    args: ["click", function noop() {}],
    expectedKeys: null,
    requiresBrowserAPI: null,
    returnsVoid: true,
  },
  {
    name: "useHover",
    args: [{ current: null }],
    expectedKeys: null,
    requiresBrowserAPI: null,
  },
  {
    name: "useKeyPress",
    args: [{ key: "Enter" }],
    expectedKeys: null,
    requiresBrowserAPI: null,
  },
  {
    name: "useOnScreen",
    args: [{ current: null }],
    expectedKeys: null,
    requiresBrowserAPI: "IntersectionObserver",
  },
  {
    name: "useOutsideClick",
    args: [{ current: null }, function noop() {}],
    expectedKeys: null,
    requiresBrowserAPI: null,
    returnsVoid: true,
  },
  {
    name: "useScroll",
    args: [],
    expectedKeys: ["position", "scrollTo"],
    requiresBrowserAPI: null,
  },
  {
    name: "useWindowSize",
    args: [],
    expectedKeys: [
      "width",
      "height",
      "isMobile",
      "isTablet",
      "isDesktop",
    ],
    requiresBrowserAPI: null,
  },

  // ─── DOM (manipulation) ────────────────────────────────────────────────────

  {
    name: "useFavicon",
    args: [],
    expectedKeys: ["faviconUrl", "changeFavicon"],
    requiresBrowserAPI: null,
  },
  {
    name: "usePortal",
    args: ["test-portal"],
    expectedKeys: ["Portal", "isRendered"],
    requiresBrowserAPI: null,
  },
  {
    name: "useScript",
    args: ["https://example.com/script.js"],
    expectedKeys: ["loading", "error"],
    requiresBrowserAPI: null,
  },
  {
    name: "useTitle",
    args: [],
    expectedKeys: ["title", "changeTitle"],
    requiresBrowserAPI: null,
  },
  {
    name: "useSearchParams",
    args: [],
    expectedKeys: null,
    requiresBrowserAPI: null,
  },

  // ─── Media ─────────────────────────────────────────────────────────────────

  {
    name: "useAudio",
    args: [{ current: null }],
    expectedKeys: [
      "isPaused",
      "isMuted",
      "currentVolume",
      "currentTime",
      "play",
      "pause",
      "togglePause",
      "increaseVolume",
      "decreaseVolume",
      "mute",
      "unmute",
      "toggleMute",
      "forward",
      "back",
    ],
    requiresBrowserAPI: "HTMLAudioElement",
  },
  {
    name: "useVideo",
    args: [{ current: null }],
    expectedKeys: [
      "isPaused",
      "isMuted",
      "currentVolume",
      "currentTime",
      "play",
      "pause",
      "togglePause",
      "increaseVolume",
      "decreaseVolume",
      "mute",
      "unmute",
      "toggleMute",
      "forward",
      "back",
    ],
    requiresBrowserAPI: "HTMLVideoElement",
  },

  // ─── Browser API dependent ─────────────────────────────────────────────────

  {
    name: "useBattery",
    args: [],
    expectedKeys: [
      "supported",
      "loading",
      "level",
      "charging",
      "chargingTime",
      "dischargingTime",
    ],
    requiresBrowserAPI: "navigator.getBattery",
  },
  {
    name: "useClipboard",
    args: [],
    expectedKeys: ["copiedText", "copyToClipboard"],
    requiresBrowserAPI: "navigator.clipboard",
  },
  {
    name: "useDownload",
    args: [],
    expectedKeys: ["error", "isDownloading", "progress", "downloadFile"],
    requiresBrowserAPI: "URL.createObjectURL",
  },
  {
    name: "useFirstVisit",
    args: [],
    expectedKeys: null,
    requiresBrowserAPI: "localStorage",
  },
  {
    name: "useGeolocation",
    args: [],
    expectedKeys: ["isLoading", "position", "error", "getPosition"],
    requiresBrowserAPI: "navigator.geolocation",
  },
  {
    name: "useIsTouchDevice",
    args: [],
    expectedKeys: null,
    requiresBrowserAPI: null,
  },
  {
    name: "useLang",
    args: [],
    expectedKeys: null,
    requiresBrowserAPI: "navigator.language",
  },
  {
    name: "useLocalStorage",
    args: ["test-key", "default"],
    expectedKeys: ["current", "setItemValue", "removeItem"],
    requiresBrowserAPI: "localStorage",
  },
  {
    name: "useNavigatorShare",
    args: [],
    expectedKeys: ["shareInNavigator"],
    requiresBrowserAPI: "navigator.share",
  },
  {
    name: "useOffline",
    args: [],
    expectedKeys: null,
    requiresBrowserAPI: "navigator.onLine",
  },
];
