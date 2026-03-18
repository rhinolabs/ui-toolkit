import React from "react";
import { componentRegistry } from "../components/component-registry";
import type { ComponentCategory, ComponentRegistryEntry } from "../types";
import {
	categoryLabels,
	categoryOrder,
	playgroundRenderHints,
} from "./playground-registry";

export interface PlaygroundRendererProps {
	/** The full `@rhinolabs/ui` exports object (import * as Components) */
	components: Record<string, unknown>;
	/** Whether the app has a ThemeProvider ancestor (enables Toaster rendering) */
	hasThemeProvider: boolean;
	/** Function to trigger toast notifications (provided by consumer app) */
	triggerToast?: (type: string) => void;
}

/**
 * Resolve minimalProps, replacing sentinel values like "NOOP_FN" with real functions.
 */
function resolveProps(
	minimalProps: Record<string, unknown>,
): Record<string, unknown> {
	const resolved: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(minimalProps)) {
		if (value === "NOOP_FN") {
			resolved[key] = () => {};
		} else if (value === "ALERT_FN") {
			resolved[key] = () => alert(`${key} triggered!`);
		} else {
			resolved[key] = value;
		}
	}
	return resolved;
}

/**
 * Render a single overlay component with a trigger button pattern.
 */
function renderOverlay(
	entry: ComponentRegistryEntry,
	Comp: Record<string, any>,
): React.ReactElement {
	const name = entry.name;

	// Simple overlays: Tooltip, HoverCard, Popover — just Trigger + Content
	if (name === "Tooltip" || name === "HoverCard" || name === "Popover") {
		return React.createElement(
			Comp,
			null,
			React.createElement(
				Comp.Trigger,
				{ asChild: true },
				React.createElement("button", null, `Open ${name}`),
			),
			React.createElement(
				Comp.Content,
				null,
				React.createElement("p", null, `${name} preview content`),
			),
		);
	}

	// ContextMenu — uses right-click area as trigger
	if (name === "ContextMenu") {
		return React.createElement(
			Comp,
			null,
			React.createElement(
				Comp.Trigger,
				null,
				React.createElement(
					"div",
					{
						style: {
							border: "1px dashed #888",
							padding: "16px",
							textAlign: "center" as const,
						},
					},
					"Right-click here for ContextMenu",
				),
			),
			React.createElement(
				Comp.Content,
				null,
				React.createElement(Comp.Item, null, "Item 1"),
				React.createElement(Comp.Item, null, "Item 2"),
			),
		);
	}

	// DropdownMenu — Trigger + Content with Items
	if (name === "DropdownMenu") {
		return React.createElement(
			Comp,
			null,
			React.createElement(
				Comp.Trigger,
				{ asChild: true },
				React.createElement("button", null, `Open ${name}`),
			),
			React.createElement(
				Comp.Content,
				null,
				React.createElement(Comp.Label, null, "Actions"),
				React.createElement(Comp.Item, null, "Item 1"),
				React.createElement(Comp.Item, null, "Item 2"),
				React.createElement(Comp.Separator, null),
				React.createElement(Comp.Item, null, "Item 3"),
			),
		);
	}

	// Dialog, AlertDialog, Sheet, Drawer — full structure with Header/Title
	if (name === "AlertDialog") {
		return React.createElement(
			Comp,
			null,
			React.createElement(
				Comp.Trigger,
				{ asChild: true },
				React.createElement("button", null, `Open ${name}`),
			),
			React.createElement(
				Comp.Content,
				null,
				React.createElement(
					Comp.Header,
					null,
					React.createElement(Comp.Title, null, `${name} Preview`),
					React.createElement(
						Comp.Description,
						null,
						"Playground preview content",
					),
				),
				React.createElement(
					Comp.Footer,
					null,
					React.createElement(Comp.Cancel, null, "Cancel"),
					React.createElement(Comp.Action, null, "Continue"),
				),
			),
		);
	}

	// Dialog, Sheet, Drawer — similar structure
	return React.createElement(
		Comp,
		null,
		React.createElement(
			Comp.Trigger,
			{ asChild: true },
			React.createElement("button", null, `Open ${name}`),
		),
		React.createElement(
			Comp.Content,
			null,
			React.createElement(
				Comp.Header,
				null,
				React.createElement(Comp.Title, null, `${name} Preview`),
				React.createElement(
					Comp.Description,
					null,
					"Playground preview content",
				),
			),
			React.createElement("p", null, `${name} body content`),
		),
	);
}

/**
 * Render compound components with representative sub-component content.
 */
function renderCompound(
	entry: ComponentRegistryEntry,
	Comp: Record<string, any>,
	resolvedProps: Record<string, unknown>,
): React.ReactElement {
	const name = entry.name;

	if (name === "Card") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.Header,
				null,
				React.createElement(Comp.Title, null, "Card Title"),
				React.createElement(Comp.Description, null, "Card description"),
			),
			React.createElement(Comp.Content, null, "Card body content"),
			React.createElement(Comp.Footer, null, "Card footer"),
		);
	}

	if (name === "Table") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.Header,
				null,
				React.createElement(
					Comp.Row,
					null,
					React.createElement(Comp.Head, null, "Name"),
					React.createElement(Comp.Head, null, "Value"),
				),
			),
			React.createElement(
				Comp.Body,
				null,
				React.createElement(
					Comp.Row,
					null,
					React.createElement(Comp.Cell, null, "Row 1"),
					React.createElement(Comp.Cell, null, "Value 1"),
				),
			),
		);
	}

	if (name === "Accordion") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.Item,
				{ value: "item-1" },
				React.createElement(Comp.Trigger, null, "Accordion Item 1"),
				React.createElement(
					Comp.Content,
					null,
					"Accordion content for item 1",
				),
			),
		);
	}

	if (name === "Tabs") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.List,
				null,
				React.createElement(Comp.Trigger, { value: "a" }, "Tab A"),
				React.createElement(Comp.Trigger, { value: "b" }, "Tab B"),
			),
			React.createElement(Comp.Content, { value: "a" }, "Content A"),
			React.createElement(Comp.Content, { value: "b" }, "Content B"),
		);
	}

	if (name === "Collapsible") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(Comp.Trigger, null, "Toggle Collapsible"),
			React.createElement(Comp.Content, null, "Collapsible content"),
		);
	}

	if (name === "Carousel") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.Content,
				null,
				React.createElement(
					Comp.Item,
					null,
					React.createElement("div", null, "Slide 1"),
				),
				React.createElement(
					Comp.Item,
					null,
					React.createElement("div", null, "Slide 2"),
				),
			),
			React.createElement(Comp.Previous, null),
			React.createElement(Comp.Next, null),
		);
	}

	if (name === "ResizablePanelGroup") {
		return React.createElement(
			Comp,
			{ ...resolvedProps, style: { height: 100 } },
			React.createElement(
				Comp.Panel,
				{ defaultSize: 50 },
				"Panel 1",
			),
			React.createElement(Comp.Handle, null),
			React.createElement(
				Comp.Panel,
				{ defaultSize: 50 },
				"Panel 2",
			),
		);
	}

	if (name === "Breadcrumb") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.List,
				null,
				React.createElement(
					Comp.Item,
					null,
					React.createElement(Comp.Link, { href: "#" }, "Home"),
				),
				React.createElement(Comp.Separator, null),
				React.createElement(
					Comp.Item,
					null,
					React.createElement(Comp.Page, null, "Current"),
				),
			),
		);
	}

	if (name === "Pagination") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.Content,
				null,
				React.createElement(Comp.Previous, null),
				React.createElement(
					Comp.Item,
					null,
					React.createElement(Comp.Link, { href: "#" }, "1"),
				),
				React.createElement(Comp.Ellipsis, null),
				React.createElement(Comp.Next, null),
			),
		);
	}

	if (name === "Menubar") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.Menu,
				null,
				React.createElement(Comp.Trigger, null, "File"),
				React.createElement(
					Comp.Content,
					null,
					React.createElement(Comp.Item, null, "New"),
					React.createElement(Comp.Item, null, "Open"),
				),
			),
		);
	}

	if (name === "NavigationMenu") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.List,
				null,
				React.createElement(
					Comp.Item,
					null,
					React.createElement(Comp.Link, { href: "#" }, "Link 1"),
				),
				React.createElement(
					Comp.Item,
					null,
					React.createElement(Comp.Link, { href: "#" }, "Link 2"),
				),
			),
		);
	}

	if (name === "Command") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(Comp.Input, { placeholder: "Search..." }),
			React.createElement(
				Comp.List,
				null,
				React.createElement(Comp.Empty, null, "No results"),
				React.createElement(
					Comp.Group,
					{ heading: "Items" },
					React.createElement(Comp.Item, null, "Item 1"),
					React.createElement(Comp.Item, null, "Item 2"),
				),
			),
		);
	}

	if (name === "Sidebar") {
		return React.createElement(
			Comp.Provider,
			null,
			React.createElement(
				Comp,
				resolvedProps,
				React.createElement(
					Comp.Content,
					null,
					React.createElement(
						Comp.Group,
						null,
						React.createElement(Comp.GroupLabel, null, "Menu"),
					),
				),
			),
		);
	}

	if (name === "Avatar") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(Comp.Fallback, null, "AB"),
		);
	}

	if (name === "InputGroup") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(Comp.Text, null, "$"),
			React.createElement(Comp.Input, { placeholder: "Amount" }),
		);
	}

	if (name === "Field") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(Comp.Label, null, "Email Address"),
			React.createElement("input", {
				type: "email",
				placeholder: "you@example.com",
				style: {
					border: "1px solid #ccc",
					borderRadius: "4px",
					padding: "6px 8px",
					width: "100%",
					marginTop: "4px",
				},
			}),
			React.createElement(Comp.Description, null, "We'll never share your email."),
		);
	}

	if (name === "RadioGroup") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				"div",
				{ style: { display: "flex", alignItems: "center", gap: "8px" } },
				React.createElement(Comp.Item, { value: "a", id: "radio-a" }),
				React.createElement("label", { htmlFor: "radio-a" }, "Option A"),
			),
			React.createElement(
				"div",
				{ style: { display: "flex", alignItems: "center", gap: "8px" } },
				React.createElement(Comp.Item, { value: "b", id: "radio-b" }),
				React.createElement("label", { htmlFor: "radio-b" }, "Option B"),
			),
			React.createElement(
				"div",
				{ style: { display: "flex", alignItems: "center", gap: "8px" } },
				React.createElement(Comp.Item, { value: "c", id: "radio-c" }),
				React.createElement("label", { htmlFor: "radio-c" }, "Option C"),
			),
		);
	}

	if (name === "Select") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.Trigger,
				null,
				React.createElement(Comp.Value, { placeholder: "Select..." }),
			),
			React.createElement(
				Comp.Content,
				null,
				React.createElement(Comp.Item, { value: "a" }, "Option A"),
				React.createElement(Comp.Item, { value: "b" }, "Option B"),
			),
		);
	}

	if (name === "InputOTP") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(
				Comp.Group,
				null,
				React.createElement(Comp.Slot, { index: 0 }),
				React.createElement(Comp.Slot, { index: 1 }),
				React.createElement(Comp.Slot, { index: 2 }),
				React.createElement(Comp.Slot, { index: 3 }),
			),
		);
	}

	if (name === "Item") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(Comp.Content, null, "Item content"),
		);
	}

	if (name === "NativeSelect") {
		return React.createElement(
			Comp,
			resolvedProps,
			React.createElement(Comp.Option, { value: "", disabled: true }, "Select a fruit..."),
			React.createElement(Comp.Option, { value: "apple" }, "Apple"),
			React.createElement(Comp.Option, { value: "banana" }, "Banana"),
			React.createElement(Comp.Option, { value: "cherry" }, "Cherry"),
		);
	}

	if (name === "ScrollArea") {
		return React.createElement(
			Comp,
			{ ...resolvedProps, style: { height: 150, width: 300 } },
			React.createElement(
				"div",
				{ style: { padding: "16px" } },
				...Array.from({ length: 20 }, (_, i) =>
					React.createElement("p", { key: i, style: { marginBottom: "8px" } }, `Scrollable item ${i + 1}`),
				),
			),
		);
	}

	// Fallback: render with children from minimalProps
	return React.createElement(Comp, resolvedProps);
}

/**
 * Stateful wrapper for MultipleSelect (controlled component).
 */
function MultipleSelectWrapper({ Comp }: { Comp: any }): React.ReactElement {
	const [selected, setSelected] = React.useState<string[]>([]);
	return React.createElement(Comp, {
		options: [
			{ label: "Apple", value: "apple" },
			{ label: "Banana", value: "banana" },
			{ label: "Cherry", value: "cherry" },
			{ label: "Date", value: "date" },
			{ label: "Elderberry", value: "elderberry" },
		],
		value: selected,
		onChange: setSelected,
		placeholder: "Select fruits...",
	});
}

/**
 * Stateful wrapper for Toaster — renders the component and buttons to trigger toasts.
 * Receives a triggerToast function from the consumer app (avoids importing sonner in shared-utils).
 */
function ToasterDemo({ Comp, triggerToast }: { Comp: any; triggerToast?: (type: string) => void }): React.ReactElement {
	const btn = (label: string, type: string) =>
		React.createElement(
			"button",
			{
				style: {
					padding: "8px 16px",
					border: "1px solid #ccc",
					borderRadius: "6px",
					cursor: "pointer",
					backgroundColor: "#fff",
				},
				onClick: () => triggerToast?.(type),
			},
			label,
		);

	return React.createElement(
		"div",
		null,
		React.createElement(Comp),
		triggerToast
			? React.createElement(
					"div",
					{ style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
					btn("Show Toast", "default"),
					btn("Success Toast", "success"),
					btn("Error Toast", "error"),
				)
			: React.createElement("p", { style: { fontSize: "12px", color: "#999" } }, "Toast triggers not available in this app"),
	);
}

/**
 * Render non-compound components that need more than just minimalProps to be useful.
 */
function renderSimple(
	entry: ComponentRegistryEntry,
	Comp: any,
	resolvedProps: Record<string, unknown>,
	components: Record<string, unknown>,
): React.ReactElement {
	const name = entry.name;

	// ButtonGroup — needs actual buttons inside to demonstrate grouping
	if (name === "ButtonGroup") {
		const Button = components.Button as any;
		if (Button) {
			return React.createElement(
				Comp,
				resolvedProps,
				React.createElement(Button, { variant: "outline", onClick: () => alert("Button 1 clicked!") }, "Action 1"),
				React.createElement(Button, { variant: "outline", onClick: () => alert("Button 2 clicked!") }, "Action 2"),
				React.createElement(Button, { variant: "outline", onClick: () => alert("Button 3 clicked!") }, "Action 3"),
			);
		}
	}

	// ToggleGroup — needs toggle items to demonstrate group behavior
	if (name === "ToggleGroup") {
		return React.createElement(
			Comp,
			{ ...resolvedProps, type: "single", defaultValue: "center" },
			React.createElement("button", { value: "left", style: { padding: "4px 12px" } }, "Left"),
			React.createElement("button", { value: "center", style: { padding: "4px 12px" } }, "Center"),
			React.createElement("button", { value: "right", style: { padding: "4px 12px" } }, "Right"),
		);
	}

	// MultipleSelect — controlled component, needs state wrapper
	if (name === "MultipleSelect") {
		return React.createElement(MultipleSelectWrapper, { Comp });
	}

	// Slider — show current value
	if (name === "Slider") {
		return React.createElement(
			"div",
			null,
			React.createElement(Comp, {
				...resolvedProps,
				defaultValue: [50],
				max: 100,
				step: 1,
			}),
			React.createElement("p", { style: { fontSize: "12px", color: "#666", marginTop: "4px" } }, "Drag the slider"),
		);
	}

	// Checkbox — with label
	if (name === "Checkbox") {
		const Label = components.Label as any;
		return React.createElement(
			"div",
			{ style: { display: "flex", alignItems: "center", gap: "8px" } },
			React.createElement(Comp, { ...resolvedProps, id: "checkbox-demo" }),
			Label
				? React.createElement(Label, { htmlFor: "checkbox-demo" }, "Accept terms and conditions")
				: React.createElement("label", { htmlFor: "checkbox-demo" }, "Accept terms and conditions"),
		);
	}

	// Switch — with label
	if (name === "Switch") {
		const Label = components.Label as any;
		return React.createElement(
			"div",
			{ style: { display: "flex", alignItems: "center", gap: "8px" } },
			React.createElement(Comp, { ...resolvedProps, id: "switch-demo" }),
			Label
				? React.createElement(Label, { htmlFor: "switch-demo" }, "Enable notifications")
				: React.createElement("label", { htmlFor: "switch-demo" }, "Enable notifications"),
		);
	}

	// Input — with placeholder and type
	if (name === "Input") {
		return React.createElement(Comp, {
			...resolvedProps,
			placeholder: "Type something here...",
			style: { maxWidth: "300px" },
		});
	}

	// Textarea — with placeholder
	if (name === "Textarea") {
		return React.createElement(Comp, {
			...resolvedProps,
			placeholder: "Write your message here...",
			rows: 3,
			style: { maxWidth: "400px" },
		});
	}

	// AspectRatio — needs visible content inside
	if (name === "AspectRatio") {
		return React.createElement(
			"div",
			{ style: { maxWidth: "300px" } },
			React.createElement(
				Comp,
				resolvedProps,
				React.createElement("div", {
					style: {
						width: "100%",
						height: "100%",
						backgroundColor: "#f0f0f0",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "8px",
					},
				}, "16:9 Aspect Ratio"),
			),
		);
	}

	// Skeleton — show multiple to demonstrate loading pattern
	if (name === "Skeleton") {
		return React.createElement(
			"div",
			{ style: { display: "flex", flexDirection: "column", gap: "8px", maxWidth: "300px" } },
			React.createElement(Comp, { style: { height: "20px", width: "80%" } }),
			React.createElement(Comp, { style: { height: "20px", width: "60%" } }),
			React.createElement(Comp, { style: { height: "20px", width: "40%" } }),
		);
	}

	// Progress — show a filled bar
	if (name === "Progress") {
		return React.createElement(
			"div",
			{ style: { maxWidth: "300px" } },
			React.createElement(Comp, { ...resolvedProps, value: 65 }),
			React.createElement("p", { style: { fontSize: "12px", color: "#666", marginTop: "4px" } }, "65% complete"),
		);
	}

	// Default fallback
	return React.createElement(Comp, resolvedProps);
}

/**
 * Shared playground renderer.
 * Groups all 55 components by category and renders them with appropriate
 * wrappers, trigger patterns, and sub-component structures.
 */
export function PlaygroundRenderer({
	components,
	hasThemeProvider,
	triggerToast,
}: PlaygroundRendererProps): React.ReactElement {
	// Group registry entries by category
	const grouped = new Map<ComponentCategory, ComponentRegistryEntry[]>();
	for (const cat of categoryOrder) {
		grouped.set(cat, []);
	}
	for (const entry of componentRegistry) {
		const cat = entry.category;
		if (cat) {
			const list = grouped.get(cat);
			if (list) {
				list.push(entry);
			}
		}
	}

	return React.createElement(
		"div",
		{ style: { padding: "24px", maxWidth: "960px", margin: "0 auto" } },
		React.createElement(
			"h1",
			{ style: { marginBottom: "32px" } },
			"UI Toolkit Playground",
		),
		...categoryOrder.map((cat) => {
			const entries = grouped.get(cat) || [];
			return React.createElement(
				"section",
				{ key: cat, id: cat, style: { marginBottom: "48px" } },
				React.createElement(
					"h2",
					{
						style: {
							borderBottom: "2px solid #e5e7eb",
							paddingBottom: "8px",
							marginBottom: "24px",
						},
					},
					categoryLabels[cat],
				),
				...entries.map((entry) => {
					const hint = playgroundRenderHints[entry.name];

					// Skip if render hint says so
					if (hint?.skipRender) {
						return React.createElement(
							"div",
							{
								key: entry.name,
								style: {
									marginBottom: "16px",
									padding: "8px",
									opacity: 0.5,
								},
							},
							React.createElement(
								"h3",
								{ style: { fontSize: "14px", color: "#999" } },
								`${entry.name} (skipped — requires external dependency)`,
							),
						);
					}

					// Skip Toaster if no ThemeProvider
					if (entry.requiresThemeProvider && !hasThemeProvider) {
						return React.createElement(
							"div",
							{
								key: entry.name,
								style: {
									marginBottom: "16px",
									padding: "8px",
									opacity: 0.5,
								},
							},
							React.createElement(
								"h3",
								{ style: { fontSize: "14px", color: "#999" } },
								`${entry.name} (skipped — requires ThemeProvider)`,
							),
						);
					}

					const Comp = components[entry.name] as any;
					if (!Comp) {
						return React.createElement(
							"div",
							{
								key: entry.name,
								style: { marginBottom: "16px", color: "red" },
							},
							`Component "${entry.name}" not found in provided components`,
						);
					}

					const resolvedProps = resolveProps(entry.minimalProps);

					// Typography — render sub-components directly
					if (hint?.renderSubComponents) {
						return React.createElement(
							"div",
							{ key: entry.name, style: { marginBottom: "24px" } },
							React.createElement(
								"h3",
								{
									style: {
										fontSize: "14px",
										fontWeight: 600,
										marginBottom: "8px",
										color: "#666",
									},
								},
								entry.name,
							),
							React.createElement(
								"div",
								{
									style: {
										border: "1px solid #e5e7eb",
										borderRadius: "8px",
										padding: "16px",
									},
								},
								...hint.renderSubComponents.map((subName) => {
									const SubComp = (Comp as Record<string, any>)[subName];
									if (!SubComp) return null;
									const content =
										subName === "InlineCode"
											? "code snippet"
											: `${subName} text`;
									return React.createElement(
										SubComp,
										{ key: subName },
										content,
									);
								}),
							),
						);
					}

					// Overlay — trigger mode
					if (hint?.triggerMode) {
						return React.createElement(
							"div",
							{ key: entry.name, style: { marginBottom: "24px" } },
							React.createElement(
								"h3",
								{
									style: {
										fontSize: "14px",
										fontWeight: 600,
										marginBottom: "8px",
										color: "#666",
									},
								},
								entry.name,
							),
							React.createElement(
								"div",
								{
									style: {
										border: "1px solid #e5e7eb",
										borderRadius: "8px",
										padding: "16px",
									},
								},
								renderOverlay(entry, Comp),
							),
						);
					}

					// Components with wrapper (e.g., Sidebar)
					let content: React.ReactElement;
					if (entry.hasSubComponents && entry.subComponentNames.length > 0) {
						content = renderCompound(entry, Comp, resolvedProps);
					} else if (entry.requiresThemeProvider) {
						// Toaster — render with demo buttons to trigger toasts
						content = React.createElement(ToasterDemo, { Comp, triggerToast });
					} else {
						// Non-compound components with special rendering needs
						content = renderSimple(entry, Comp, resolvedProps, components);
					}

					// Apply wrapper if present
					if (hint?.wrapper) {
						content = hint.wrapper(components, content);
					}

					return React.createElement(
						"div",
						{ key: entry.name, style: { marginBottom: "24px" } },
						React.createElement(
							"h3",
							{
								style: {
									fontSize: "14px",
									fontWeight: 600,
									marginBottom: "8px",
									color: "#666",
								},
							},
							entry.name,
						),
						React.createElement(
							"div",
							{
								style: {
									border: "1px solid #e5e7eb",
									borderRadius: "8px",
									padding: "16px",
								},
							},
							content,
						),
					);
				}),
			);
		}),
	);
}
