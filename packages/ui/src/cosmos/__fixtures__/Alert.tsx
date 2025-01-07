import { useState, type FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CircleX } from "lucide-react";
import { useFixtureSelect, useFixtureInput } from "react-cosmos/client";

const Alerts: FC = () => {
	const [alertType] = useFixtureSelect("Alert Type", {
		options: ["destructive", "default"],
		defaultValue: "default",
	});

	const [showIcon, setShowIcon] = useFixtureInput("Show Icon", true);

	const iconMap: Record<string, React.ElementType> = {
		Terminal,
		CircleX,
	};

	const [selectedIcon] = useFixtureSelect("Icons", {
		options: ["Terminal", "CircleX"],
		defaultValue: "Terminal",
	});

	const IconComponent = iconMap[selectedIcon];

	return (
		<div className="h-screen flex items-center justify-center px-5 bg-gray-100">
			<Alert variant={alertType}>
				{showIcon && IconComponent ? (
					<IconComponent className="h-4 w-4" />
				) : null}
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>
					You can add components and dependencies to your app using the cli.
				</AlertDescription>
			</Alert>
		</div>
	);
};

export default {
	example: Alerts,
};
