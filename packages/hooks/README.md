# @rhinolabs/react-hooks

Collection of React hooks for state management and side effects.

## Installation

> **Note**: Requires React 18 or later

```bash
# Using pnpm (recommended)
pnpm add @rhinolabs/react-hooks

# Using npm
npm install @rhinolabs/react-hooks

# Using yarn
yarn add @rhinolabs/react-hooks
```

## Available Hooks

### State & Storage
- `useArray` - Array manipulation with built-in CRUD operations
- `useLocalStorage` - Persistent state in localStorage
- `useToggle` - Boolean state management
- `usePrevious` - Access previous state values
- `useInput` - Form input state handling

### Performance & Optimization
- `useDebounce` - Delay state updates for performance
- `useFirstRender` - First render detection
- `useScript` - Dynamic script loading
- `useEventListener` - Optimized event handling

### Browser & DOM
- `useTitle` - Document title management
- `useFavicon` - Dynamic favicon updates
- `useWindowSize` - Window dimensions tracking
- `useScroll` - Scroll position monitoring
- `useOnScreen` - Intersection observation
- `useOutsideClick` - Click outside detection
- `useKeyPress` - Keyboard event handling

### Media & Files
- `useAudio` - Audio playback control
- `useVideo` - Video playback control
- `useDownload` - File download handling
- `useClipboard` - Copy/paste operations

### Network & Data
- `useFetch` - Data fetching with states
- `useAsync` - Async operation handling
- `useSearchParams` - URL parameter management
- `useOffline` - Network status detection
- `useNavigatorShare` - Web Share API

### Device & Sensors
- `useGeolocation` - Location tracking
- `useIsTouchDevice` - Touch capability detection
- `useBattery` - Battery status monitoring
- `useLang` - Language detection
- `useFirstVisit` - First visit detection

### Time & Timers
- `useCountdown` - Countdown timer
- `useCountup` - Count-up timer
- `useStopwatch` - Stopwatch functionality
- `useTimer` - General purpose timer

### Utilities
- `useRandomColor` - Random color generation

## Usage Examples

### useArray

```tsx
import { useArray } from "@rhinolabs/react-hooks"

function Example() {
  const { array, push, remove, update } = useArray([1, 2, 3])

  return (
    <div>
      <button onClick={() => push(4)}>Add 4</button>
      <button onClick={() => remove(1)}>Remove second item</button>
      <button onClick={() => update(0, 10)}>Update first to 10</button>
      <p>Current array: {array.join(", ")}</p>
    </div>
  )
}
```

### useLocalStorage

```tsx
import { useLocalStorage } from "@rhinolabs/react-hooks"

function Example() {
  const [value, setValue] = useLocalStorage("key", "default value")

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

### useWindowSize

```tsx
import { useWindowSize } from "@rhinolabs/react-hooks"

function Example() {
  const { width, height } = useWindowSize()

  return (
    <div>
      Window size: {width} x {height}
    </div>
  )
}
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/rhinolabs/ui-toolkit.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the package:
```bash
pnpm run build
```

## Contributing

Please read our [Contributing Guidelines](../../CONTRIBUTING.md) before submitting a pull request.

## License

MIT © [Rhinolabs Agency](https://rhinolabs.agency)
