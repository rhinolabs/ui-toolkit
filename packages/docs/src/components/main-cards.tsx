"use client";

import { Card } from "@rhinolabs/ui";
import { ArrowRight, Layers, Anchor } from "lucide-react";

export function MainCards() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
			{/* UI Components Card */}
			<Card className="p-8 hover:shadow-lg transition-shadow border-2 group">
				<div className="flex flex-col h-full">
					<div className="p-3 rounded-full bg-primary/10 text-primary w-fit mb-6">
						<Layers size={24} />
					</div>

					<h2 className="text-2xl font-bold mb-3">UI Components</h2>

					<p className="text-muted-foreground mb-6 flex-grow">
						A comprehensive set of 30+ UI components built with React and
						Tailwind CSS. From buttons to complex data tables, our UI library
						has everything you need to build modern interfaces.
					</p>

					<ul className="space-y-2 mb-8">
						<li className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
							<span>Fully customizable with Tailwind CSS</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
							<span>Accessible by default (WAI-ARIA compliant)</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
							<span>Responsive and mobile-friendly</span>
						</li>
					</ul>

					<a
						href="/docs/ui"
						className="flex items-center text-primary font-medium group-hover:underline"
					>
						Explore UI Components
						<ArrowRight
							size={16}
							className="ml-1 transition-transform group-hover:translate-x-1"
						/>
					</a>
				</div>
			</Card>

			{/* React Hooks Card */}
			<Card className="p-8 hover:shadow-lg transition-shadow border-2 group">
				<div className="flex flex-col h-full">
					<div className="p-3 rounded-full bg-primary/10 text-primary w-fit mb-6">
						<Anchor size={24} />
					</div>

					<h2 className="text-2xl font-bold mb-3">React Hooks</h2>

					<p className="text-muted-foreground mb-6 flex-grow">
						A collection of 30+ production-ready React hooks that solve common
						web development challenges. These hooks help you manage state,
						handle side effects, and implement complex functionality with ease.
					</p>

					<ul className="space-y-2 mb-8">
						<li className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
							<span>TypeScript ready with comprehensive types</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
							<span>Zero dependencies and tree-shakeable</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
							<span>Performance optimized for production</span>
						</li>
					</ul>

					<a
						href="/docs/hooks"
						className="flex items-center text-primary font-medium group-hover:underline"
					>
						Explore React Hooks
						<ArrowRight
							size={16}
							className="ml-1 transition-transform group-hover:translate-x-1"
						/>
					</a>
				</div>
			</Card>
		</div>
	);
}
