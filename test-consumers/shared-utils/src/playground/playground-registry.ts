import type { ComponentCategory } from "../types";

/**
 * Render hint metadata for the playground.
 * Controls how each component is rendered in the visual playground.
 */
export interface PlaygroundRenderHint {
	/** Component name (matches ComponentRegistryEntry.name) */
	name: string;
	/** If true, render a trigger button instead of the component directly */
	triggerMode: boolean;
	/** If true, skip rendering this component entirely */
	skipRender: boolean;
	/** If set, render these sub-components instead of the parent */
	renderSubComponents?: string[];
	/**
	 * A wrapper factory: receives the component namespace object and children,
	 * returns JSX that wraps children in the required provider.
	 */
	wrapper?: (
		components: Record<string, any>,
		children: React.ReactNode,
	) => React.ReactElement;
}

/** Render order for category sections in the playground */
export const categoryOrder: ComponentCategory[] = [
	"display",
	"layout",
	"form",
	"interactive",
	"overlay",
	"navigation",
	"feedback",
];

/** Human-readable labels for each category */
export const categoryLabels: Record<ComponentCategory, string> = {
	display: "Display",
	layout: "Layout",
	form: "Form",
	interactive: "Interactive",
	overlay: "Overlay",
	navigation: "Navigation",
	feedback: "Feedback",
};

/**
 * Render hints for all 55 components.
 * Keyed by component name for O(1) lookup.
 */
export const playgroundRenderHints: Record<string, PlaygroundRenderHint> = {
	// ─── Display ──────────────────────────────────────────────────────────────
	Alert: { name: "Alert", triggerMode: false, skipRender: false },
	Badge: { name: "Badge", triggerMode: false, skipRender: false },
	Card: { name: "Card", triggerMode: false, skipRender: false },
	Empty: { name: "Empty", triggerMode: false, skipRender: false },
	Item: { name: "Item", triggerMode: false, skipRender: false },
	Kbd: { name: "Kbd", triggerMode: false, skipRender: false },
	Skeleton: { name: "Skeleton", triggerMode: false, skipRender: false },
	Spinner: { name: "Spinner", triggerMode: false, skipRender: false },
	Typography: {
		name: "Typography",
		triggerMode: false,
		skipRender: false,
		renderSubComponents: [
			"H1",
			"H2",
			"H3",
			"H4",
			"H5",
			"H6",
			"P",
			"Blockquote",
			"Lead",
			"Large",
			"Small",
			"Muted",
			"InlineCode",
		],
	},
	Avatar: { name: "Avatar", triggerMode: false, skipRender: false },
	Progress: { name: "Progress", triggerMode: false, skipRender: false },
	Table: { name: "Table", triggerMode: false, skipRender: false },

	// ─── Layout ───────────────────────────────────────────────────────────────
	AspectRatio: { name: "AspectRatio", triggerMode: false, skipRender: false },
	ButtonGroup: { name: "ButtonGroup", triggerMode: false, skipRender: false },
	ScrollArea: { name: "ScrollArea", triggerMode: false, skipRender: false },
	Separator: { name: "Separator", triggerMode: false, skipRender: false },

	// ─── Form ─────────────────────────────────────────────────────────────────
	Input: { name: "Input", triggerMode: false, skipRender: false },
	Textarea: { name: "Textarea", triggerMode: false, skipRender: false },
	Label: { name: "Label", triggerMode: false, skipRender: false },
	NativeSelect: { name: "NativeSelect", triggerMode: false, skipRender: false },
	InputGroup: { name: "InputGroup", triggerMode: false, skipRender: false },
	Field: { name: "Field", triggerMode: false, skipRender: false },
	Checkbox: { name: "Checkbox", triggerMode: false, skipRender: false },
	Switch: { name: "Switch", triggerMode: false, skipRender: false },
	Slider: { name: "Slider", triggerMode: false, skipRender: false },
	RadioGroup: { name: "RadioGroup", triggerMode: false, skipRender: false },
	Select: { name: "Select", triggerMode: false, skipRender: false },
	MultipleSelect: {
		name: "MultipleSelect",
		triggerMode: false,
		skipRender: false,
	},
	InputOTP: { name: "InputOTP", triggerMode: false, skipRender: false },
	Calendar: { name: "Calendar", triggerMode: false, skipRender: false },
	Form: {
		name: "Form",
		triggerMode: false,
		skipRender: true,
	},

	// ─── Interactive ──────────────────────────────────────────────────────────
	Button: { name: "Button", triggerMode: false, skipRender: false },
	Toggle: { name: "Toggle", triggerMode: false, skipRender: false },
	ToggleGroup: { name: "ToggleGroup", triggerMode: false, skipRender: false },
	Accordion: { name: "Accordion", triggerMode: false, skipRender: false },
	Collapsible: { name: "Collapsible", triggerMode: false, skipRender: false },
	Tabs: { name: "Tabs", triggerMode: false, skipRender: false },
	Carousel: { name: "Carousel", triggerMode: false, skipRender: false },
	ResizablePanelGroup: {
		name: "ResizablePanelGroup",
		triggerMode: false,
		skipRender: false,
	},

	// ─── Overlay ──────────────────────────────────────────────────────────────
	Dialog: { name: "Dialog", triggerMode: true, skipRender: false },
	AlertDialog: { name: "AlertDialog", triggerMode: true, skipRender: false },
	Sheet: { name: "Sheet", triggerMode: true, skipRender: false },
	Drawer: { name: "Drawer", triggerMode: true, skipRender: false },
	Popover: { name: "Popover", triggerMode: true, skipRender: false },
	HoverCard: { name: "HoverCard", triggerMode: true, skipRender: false },
	Tooltip: { name: "Tooltip", triggerMode: true, skipRender: false },
	DropdownMenu: { name: "DropdownMenu", triggerMode: true, skipRender: false },
	ContextMenu: { name: "ContextMenu", triggerMode: true, skipRender: false },

	// ─── Navigation ───────────────────────────────────────────────────────────
	Breadcrumb: { name: "Breadcrumb", triggerMode: false, skipRender: false },
	Pagination: { name: "Pagination", triggerMode: false, skipRender: false },
	Menubar: { name: "Menubar", triggerMode: false, skipRender: false },
	NavigationMenu: {
		name: "NavigationMenu",
		triggerMode: false,
		skipRender: false,
	},
	Command: { name: "Command", triggerMode: false, skipRender: false },
	Sidebar: {
		name: "Sidebar",
		triggerMode: false,
		skipRender: false,
	},

	// ─── Feedback ─────────────────────────────────────────────────────────────
	Toaster: { name: "Toaster", triggerMode: false, skipRender: false },
};
