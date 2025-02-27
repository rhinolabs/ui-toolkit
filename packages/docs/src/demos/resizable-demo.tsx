"use client";
import { ResizablePanelGroup } from "@rhinolabs/ui";

export function ResizableDemo() {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="max-w-md rounded-lg border md:min-w-[90px]"
		>
			<ResizablePanelGroup.Panel defaultSize={10}>
				<div className="flex h-[200px] items-center justify-center p-6">
					<span className="font-semibold">One</span>
				</div>
			</ResizablePanelGroup.Panel>
			<ResizablePanelGroup.Handle />
			<ResizablePanelGroup.Panel defaultSize={10}>
				<ResizablePanelGroup direction="vertical">
					<ResizablePanelGroup.Panel defaultSize={5}>
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Two</span>
						</div>
					</ResizablePanelGroup.Panel>
					<ResizablePanelGroup.Handle />
					<ResizablePanelGroup.Panel defaultSize={15}>
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Three</span>
						</div>
					</ResizablePanelGroup.Panel>
				</ResizablePanelGroup>
			</ResizablePanelGroup.Panel>
		</ResizablePanelGroup>
	);
}
