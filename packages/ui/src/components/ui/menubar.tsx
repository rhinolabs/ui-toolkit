"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Menubar({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
	return (
		<MenubarPrimitive.Root
			data-slot="menubar"
			className={cn(
				"bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarMenu({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
	return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

const MenubarGroup = React.forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Group>,
	React.ComponentProps<typeof MenubarPrimitive.Group>
>(({ ...props }, ref) => (
	<MenubarPrimitive.Group ref={ref} data-slot="menubar-group" {...props} />
));
MenubarGroup.displayName = "MenubarGroup";

function MenubarPortal({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
	return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
	return (
		<MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
	);
}

const MenubarTrigger = React.forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Trigger>,
	React.ComponentProps<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.Trigger
		ref={ref}
		data-slot="menubar-trigger"
		className={cn(
			"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
			className,
		)}
		{...props}
	/>
));
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarContent = React.forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Content>,
	React.ComponentProps<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
	<MenubarPortal>
		<MenubarPrimitive.Content
			ref={ref}
			data-slot="menubar-content"
			align={align}
			alignOffset={alignOffset}
			sideOffset={sideOffset}
			className={cn(
				"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-48 origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
				className,
			)}
			{...props}
		/>
	</MenubarPortal>
));
MenubarContent.displayName = "MenubarContent";

const MenubarItem = React.forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Item>,
	React.ComponentProps<typeof MenubarPrimitive.Item> & {
		inset?: boolean;
		variant?: "default" | "destructive";
	}
>(({ className, inset, variant = "default", ...props }, ref) => (
	<MenubarPrimitive.Item
		ref={ref}
		data-slot="menubar-item"
		data-inset={inset}
		data-variant={variant}
		className={cn(
			"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			className,
		)}
		{...props}
	/>
));
MenubarItem.displayName = "MenubarItem";

const MenubarCheckboxItem = React.forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>,
	React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<MenubarPrimitive.CheckboxItem
		ref={ref}
		data-slot="menubar-checkbox-item"
		className={cn(
			"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
			<MenubarPrimitive.ItemIndicator>
				<CheckIcon className="size-4" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

const MenubarRadioItem = React.forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.RadioItem>,
	React.ComponentProps<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
	<MenubarPrimitive.RadioItem
		ref={ref}
		data-slot="menubar-radio-item"
		className={cn(
			"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			className,
		)}
		{...props}
	>
		<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
			<MenubarPrimitive.ItemIndicator>
				<CircleIcon className="size-2 fill-current" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = "MenubarRadioItem";

const MenubarLabel = React.forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Label>,
	React.ComponentProps<typeof MenubarPrimitive.Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<MenubarPrimitive.Label
		ref={ref}
		data-slot="menubar-label"
		data-inset={inset}
		className={cn(
			"px-2 py-1.5 text-sm font-medium data-inset:pl-8",
			className,
		)}
		{...props}
	/>
));
MenubarLabel.displayName = "MenubarLabel";

const MenubarSeparator = React.forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.Separator>,
	React.ComponentProps<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.Separator
		ref={ref}
		data-slot="menubar-separator"
		className={cn("bg-border -mx-1 my-1 h-px", className)}
		{...props}
	/>
));
MenubarSeparator.displayName = "MenubarSeparator";

const MenubarShortcut = React.forwardRef<
	HTMLSpanElement,
	React.ComponentProps<"span">
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		data-slot="menubar-shortcut"
		className={cn(
			"text-muted-foreground ml-auto text-xs tracking-widest",
			className,
		)}
		{...props}
	/>
));
MenubarShortcut.displayName = "MenubarShortcut";

function MenubarSub({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
	return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

const MenubarSubTrigger = React.forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.SubTrigger>,
	React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<MenubarPrimitive.SubTrigger
		ref={ref}
		data-slot="menubar-sub-trigger"
		data-inset={inset}
		className={cn(
			"focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-inset:pl-8",
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRightIcon className="ml-auto h-4 w-4" />
	</MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = "MenubarSubTrigger";

const MenubarSubContent = React.forwardRef<
	React.ComponentRef<typeof MenubarPrimitive.SubContent>,
	React.ComponentProps<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.SubContent
		ref={ref}
		data-slot="menubar-sub-content"
		className={cn(
			"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
			className,
		)}
		{...props}
	/>
));
MenubarSubContent.displayName = "MenubarSubContent";

Menubar.Portal = MenubarPortal;
Menubar.Menu = MenubarMenu;
Menubar.Trigger = MenubarTrigger;
Menubar.Content = MenubarContent;
Menubar.Group = MenubarGroup;
Menubar.Separator = MenubarSeparator;
Menubar.Label = MenubarLabel;
Menubar.Item = MenubarItem;
Menubar.Shortcut = MenubarShortcut;
Menubar.CheckboxItem = MenubarCheckboxItem;
Menubar.RadioGroup = MenubarRadioGroup;
Menubar.RadioItem = MenubarRadioItem;
Menubar.Sub = MenubarSub;
Menubar.SubTrigger = MenubarSubTrigger;
Menubar.SubContent = MenubarSubContent;

export { Menubar };
