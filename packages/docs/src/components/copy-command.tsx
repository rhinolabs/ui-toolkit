"use client";

import { Button, Tooltip } from "@rhinolabs/ui";
import { Terminal } from "lucide-react";
import { useClipboard } from "@rhinolabs/react-hooks";

export default function CopyCommand() {
	const command = "pnpm add @rhinolabs/ui-toolkit";
	const { copiedText, copyToClipboard } = useClipboard();

	const handleCopy = async () => {
		try {
			await copyToClipboard(command);
		} catch (error) {
			console.error("Failed to copy text:", error);
		}
	};

	return (
		<Tooltip.Provider>
			<Tooltip open={copiedText === command}>
				<Tooltip.Trigger asChild>
					<Button
						onClick={handleCopy}
						variant="secondary"
						size="lg"
						className="cursor-pointer"
					>
						<Terminal size={16} />
						{command}
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content side="top" align="center">
					<p>Copied!</p>
				</Tooltip.Content>
			</Tooltip>
		</Tooltip.Provider>
	);
}
