import { Checkbox } from "@/components/ui/checkbox";
import { useFixtureInput } from "react-cosmos/client";

function CheckboxExamples() {
	const [label] = useFixtureInput("Label", "Accept terms and conditions");
	const [done, setDone] = useFixtureInput("Accept", false);
	const [disable] = useFixtureInput("Disable", false);

	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<div className="flex items-center space-x-2">
				<Checkbox
					id="terms"
					checked={done}
					onChange={() => setDone((prev) => !prev)}
					disabled={disable}
				/>
				<label
					htmlFor="terms"
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{label}
				</label>
			</div>
		</div>
	);
}

export default {
	examples: CheckboxExamples,
};
