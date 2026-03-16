"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

function Collapsible({
	...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

const CollapsibleTrigger = React.forwardRef<
	React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
	React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ ...props }, ref) => (
	<CollapsiblePrimitive.CollapsibleTrigger
		ref={ref}
		data-slot="collapsible-trigger"
		{...props}
	/>
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<
	React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleContent>,
	React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ ...props }, ref) => (
	<CollapsiblePrimitive.CollapsibleContent
		ref={ref}
		data-slot="collapsible-content"
		{...props}
	/>
));
CollapsibleContent.displayName = "CollapsibleContent";

// Attach subcomponents to Collapsible
Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export { Collapsible };
