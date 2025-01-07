import { type FC } from "react";
import { Badge } from "@/components/ui/badge";
import { useFixtureSelect } from "react-cosmos/client";

const DefaultBadge: FC = () => {
	const [badgeType] = useFixtureSelect("Badge Types", {
		options: ["default", "secondary", "outline", "destructive"],
		defaultValue: "default",
	});

	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<Badge variant={badgeType}>Badge</Badge>
		</div>
	);
};

export default {
	examples: DefaultBadge,
};
