import { useState } from "react";
import { Button } from "@/components/ui/button";

const ButtonFixture = () => {
	const [clickCount, setClickCount] = useState(0);

	const handleClick = () => {
		setClickCount(clickCount + 1);
	};

	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<Button onClick={handleClick}>{`Click count: ${clickCount}`}</Button>
		</div>
	);
};

export default ButtonFixture;
