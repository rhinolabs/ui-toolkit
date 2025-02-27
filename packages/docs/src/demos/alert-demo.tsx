import { Terminal } from "lucide-react";

import { Alert } from "@rhinolabs/ui";

export function AlertDemo() {
	return (
		<Alert>
			<Terminal className="h-4 w-4" />
			<Alert.Title>Heads up!</Alert.Title>
			<Alert.Description>You can use all of our components.</Alert.Description>
		</Alert>
	);
}
