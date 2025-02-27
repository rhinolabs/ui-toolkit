"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Collapsible, Button } from "@rhinolabs/ui";

export function CollapsibleDemo() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
			<div className="flex items-center justify-between space-x-4 px-2">
				<h4 className="text-sm font-semibold">
					@rhinolabs starred 3 repositories
				</h4>
				<Collapsible.Trigger asChild>
					<Button variant="ghost" size="sm" className="w-9 p-0">
						<ChevronsUpDown className="h-4 w-4" />
						<span className="sr-only">Toggle</span>
					</Button>
				</Collapsible.Trigger>
			</div>
			<div className="rounded-md border px-4 py-3 font-mono text-sm">
				@radix-ui/primitives
			</div>
			<Collapsible.Content className="space-y-2">
				<div className="rounded-md border px-4 py-3 font-mono text-sm">
					@radix-ui/colors
				</div>
				<div className="rounded-md border px-4 py-3 font-mono text-sm">
					@stitches/react
				</div>
			</Collapsible.Content>
		</Collapsible>
	);
}
