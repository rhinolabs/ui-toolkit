"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

const SheetTrigger = React.forwardRef<
	React.ComponentRef<typeof SheetPrimitive.Trigger>,
	React.ComponentProps<typeof SheetPrimitive.Trigger>
>(({ ...props }, ref) => (
	<SheetPrimitive.Trigger ref={ref} data-slot="sheet-trigger" {...props} />
));
SheetTrigger.displayName = "SheetTrigger";

const SheetClose = React.forwardRef<
	React.ComponentRef<typeof SheetPrimitive.Close>,
	React.ComponentProps<typeof SheetPrimitive.Close>
>(({ ...props }, ref) => (
	<SheetPrimitive.Close ref={ref} data-slot="sheet-close" {...props} />
));
SheetClose.displayName = "SheetClose";

function SheetPortal({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

const SheetOverlay = React.forwardRef<
	React.ComponentRef<typeof SheetPrimitive.Overlay>,
	React.ComponentProps<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Overlay
		ref={ref}
		data-slot="sheet-overlay"
		className={cn(
			"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
			className,
		)}
		{...props}
	/>
));
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = React.forwardRef<
	React.ComponentRef<typeof SheetPrimitive.Content>,
	React.ComponentProps<typeof SheetPrimitive.Content> & {
		side?: "top" | "right" | "bottom" | "left";
	}
>(({ className, children, side = "right", ...props }, ref) => (
	<SheetPortal>
		<SheetOverlay />
		<SheetPrimitive.Content
			ref={ref}
			data-slot="sheet-content"
			className={cn(
				"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
				side === "right" &&
					"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
				side === "left" &&
					"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
				side === "top" &&
					"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
				side === "bottom" &&
					"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
				className,
			)}
			{...props}
		>
			{children}
			<SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
				<XIcon className="size-4" />
				<span className="sr-only">Close</span>
			</SheetPrimitive.Close>
		</SheetPrimitive.Content>
	</SheetPortal>
));
SheetContent.displayName = "SheetContent";

const SheetHeader = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-slot="sheet-header"
		className={cn("flex flex-col gap-1.5 p-4", className)}
		{...props}
	/>
));
SheetHeader.displayName = "SheetHeader";

const SheetFooter = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-slot="sheet-footer"
		className={cn("mt-auto flex flex-col gap-2 p-4", className)}
		{...props}
	/>
));
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
	React.ComponentRef<typeof SheetPrimitive.Title>,
	React.ComponentProps<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Title
		ref={ref}
		data-slot="sheet-title"
		className={cn("text-foreground font-semibold tracking-tight", className)}
		{...props}
	/>
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
	React.ComponentRef<typeof SheetPrimitive.Description>,
	React.ComponentProps<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Description
		ref={ref}
		data-slot="sheet-description"
		className={cn("text-muted-foreground text-sm", className)}
		{...props}
	/>
));
SheetDescription.displayName = "SheetDescription";

// Attach subcomponents to Sheet
Sheet.Trigger = SheetTrigger;
Sheet.Close = SheetClose;
Sheet.Content = SheetContent;
Sheet.Header = SheetHeader;
Sheet.Footer = SheetFooter;
Sheet.Title = SheetTitle;
Sheet.Description = SheetDescription;

export { Sheet };
