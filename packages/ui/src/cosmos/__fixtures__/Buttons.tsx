import { useState, type FC } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, ChevronRight, Loader2, Mouse } from "lucide-react";
import { useFixtureSelect, useFixtureInput } from "react-cosmos/client";

const useClickCount = (): { clickCount: number; handleClick: () => void } => {
	const [clickCount, setClickCount] = useState<number>(0);
	const handleClick = (): void => setClickCount(clickCount + 1);
	return { clickCount, handleClick };
};

// Common button
const DefaultButton: FC = () => {
	const [done, setDone] = useFixtureInput("Icon", false);
	const { clickCount, handleClick } = useClickCount();

	const [buttonType] = useFixtureSelect("Button Types", {
		options: [
			"default",
			"secondary",
			"outline",
			"destructive",
			"ghost",
			"link",
		],
		defaultValue: "default",
	});

	const [selectedIcon] = useFixtureSelect("Icons", {
		options: ["ChevronRight", "Mouse", "Calculator"],
		defaultValue: "Mouse",
	});

	const iconMap: Record<string, React.ElementType> = {
		Calculator,
		ChevronRight,
		Mouse,
	};

	const IconComponent = iconMap[selectedIcon];

	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<Button variant={buttonType} onClick={handleClick}>
				{done && IconComponent ? <IconComponent /> : null}
				{`Click count: ${clickCount}`}
			</Button>
		</div>
	);
};

// Loading button
const LoadingButton: FC = () => {
	const { clickCount, handleClick } = useClickCount();
	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<Button disabled>
				<Loader2 className="animate-spin" />
				Please wait
			</Button>
		</div>
	);
};

export default {
	examples: DefaultButton,
	loading: LoadingButton,
};
