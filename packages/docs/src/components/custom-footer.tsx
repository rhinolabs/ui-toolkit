"use client";

import { Github } from "lucide-react";
import { Footer } from "nextra-theme-docs";

export function CustomFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<Footer className="flex flex-col items-center justify-center space-y-2 py-8 text-center">
			<div className="flex items-center justify-center">
				<span>Made with </span>
				<span className="mx-1 text-red-500">❤️</span>
				<span>by Rhinolabs team</span>
			</div>
			<div className="text-sm text-gray-500">
				<span>© {currentYear} Rhinolabs Agency. </span>
				<a
					href="https://github.com/rhinolabs/ui-toolkit/blob/main/LICENSE"
					target="_blank"
					rel="noreferrer"
					className="hover:text-gray-300"
				>
					Licensed under MIT
				</a>
			</div>
		</Footer>
	);
}
