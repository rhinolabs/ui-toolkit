import { Card } from "@rhinolabs/ui";
import { ArrowBigRightDash } from "lucide-react";
import type { ReactNode } from "react";

interface FeatureCardProps {
	title: string;
	children: ReactNode;
	link?: string;
	type?: "component" | "hook";
}

export function FeatureCard({
	title,
	children,
	link,
	type = "component",
}: FeatureCardProps) {
	return (
		<Card className="p-4 w-auto h-full transition-all hover:shadow-md">
			<Card.Title className="text-center py-4">
				<p className="text-xl">{title}</p>
				{type === "hook" && (
					<span className="text-xs text-primary font-mono mt-1 inline-block">
						React Hook
					</span>
				)}
			</Card.Title>
			<Card.Content className="min-h-[180px] flex items-center justify-center">
				{children}
			</Card.Content>
			<Card.Footer className="justify-end px-0">
				{link && (
					<a
						href={link}
						className="group flex items-center gap-2 text-primary hover:underline"
						rel="noopener noreferrer"
					>
						<ArrowBigRightDash
							size={24}
							className="text-primary group-hover:translate-x-1 transition-transform"
						/>
					</a>
				)}
			</Card.Footer>
		</Card>
	);
}
