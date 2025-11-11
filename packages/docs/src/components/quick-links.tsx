"use client";

import { Button } from "@rhinolabs/ui";
import { BookOpen, Github, ChevronRight } from "lucide-react";

type QuickLinkProps = {
	href: string;
	icon: React.ReactNode;
	title: string;
	description: string;
	external?: boolean;
};

function QuickLink({
	href,
	icon,
	title,
	description,
	external = false,
}: QuickLinkProps) {
	return (
		<a
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noreferrer" : undefined}
		>
			<Button
				variant="outline"
				className="w-full justify-start h-auto p-4 gap-4 group"
			>
				<div className="p-2 rounded-full bg-primary/10 text-primary">
					{icon}
				</div>
				<div className="text-left flex-1">
					<h3 className="font-medium flex items-center">
						{title}
						<ChevronRight
							size={16}
							className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
						/>
					</h3>
					<p className="text-muted-foreground text-sm">{description}</p>
				</div>
			</Button>
		</a>
	);
}

export function QuickLinks() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
			<QuickLink
				href="/docs/get-started"
				icon={<BookOpen size={20} />}
				title="Documentation"
				description="Read the full documentation and API references"
			/>
			<QuickLink
				href="https://github.com/rhinolabs/ui-toolkit"
				icon={<Github size={20} />}
				title="GitHub Repository"
				description="Star us on GitHub and contribute to the project"
				external
			/>
		</div>
	);
}
