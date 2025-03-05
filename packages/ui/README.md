# @rhinolabs/ui

Modern and accessible React components built on shadcn/ui.

## Installation

> **Note**: Requires React 18 or later

```bash
# Using bun
bun add @rhinolabs/ui

# Using npm
npm install @rhinolabs/ui

# Using yarn
yarn add @rhinolabs/ui

# Using pnpm
pnpm add @rhinolabs/ui
```

## Components

@rhinolabs/ui provides a comprehensive set of React components built on top of [shadcn/ui](https://ui.shadcn.com/). These components are designed to be:

- 🎨 **Customizable**: Built with Tailwind CSS
- ♿️ **Accessible**: Following WCAG guidelines
- 📱 **Responsive**: Mobile-first design
- 🚀 **Modern**: Built with React and TypeScript

### Available Components

### User Input
- Button - Interactive buttons for triggering actions
- Input - Text input fields for data entry
- Textarea - Multi-line text input areas
- Select - Dropdown selection menus
- Checkbox - Single or multiple option selectors
- Radio Group - Exclusive option selectors
- Switch - Toggle switches for binary choices
- Toggle - Two-state buttons for toggling options
- Toggle Group - Groups of toggle buttons

### Layout & Structure
- Card - Contained content blocks
- Separator - Visual dividers between content
- Sheet - Slide-out panels and drawers
- Collapsible - Expandable/collapsible sections
- Resizable - Adjustable-size containers
- Scroll Area - Custom scrollable containers

### Navigation & Wayfinding
- Breadcrumb - Hierarchical navigation paths
- Pagination - Page navigation controls
- Tabs - Content section organizers
- Sidebar - Side navigation panels

### Data Presentation
- Table - Structured data displays
- Calendar - Date and time displays
- Avatar - User or entity representations
- Badge - Status and notification indicators

### Interactive Overlays
- Dialog - Modal windows for focused tasks
- Popover - Contextual floating content
- Tooltip - Helpful hover information
- Dropdown Menu - Contextual action menus
- Context Menu - Right-click action menus
- Command - Command palettes and search interfaces

### User Feedback
- Alert - Important message displays
- Toast - Temporary notifications
- Skeleton - Loading state placeholders

## Usage

```tsx
import { Button } from "@rhinolabs/ui"

export default function Example() {
  return (
    <Button variant="default">
      Click me
    </Button>
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
bun install
```

3. Build the package:
```bash
bun run build
```

## Contributing

Please read our [Contributing Guidelines](../../CONTRIBUTING.md) before submitting a pull request.

## License

MIT © [Rhinolabs Agency](https://rhinolabs.agency)
