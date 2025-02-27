import { Alert, Button } from "@rhinolabs/ui";
import { GitHubIcon } from "nextra/icons";

export const metadata = {
	title: "Rhinolabs UI Toolkit",
	description:
		"A modern, accessible, and customizable UI toolkit for building React applications",
	keywords: [
		"react",
		"components",
		"ui",
		"toolkit",
		"rhinolabs",
		"design-system",
		"typescript",
	],
	authors: [{ name: "Rhinolabs Agency" }],
};

export default function IndexPage() {
	return (
		<>
			<section className="x:mx-auto x:max-w-(--nextra-content-width) x:pl-[max(env(safe-area-inset-left),1.5rem)] x:pr-[max(env(safe-area-inset-right),1.5rem)] py-12 sm:py-32 flex flex-col space-y-6">
				<a
					href="https://github.com/rhinolabs/ui-toolkit"
					target="_blank"
					rel="noreferrer"
				>
					<Alert className="text-primary shadow-none cursor-pointer border-primary w-fit p-2">
						<GitHubIcon />
						<Alert.Title>
							Open Source & Community Driven – Explore & Contribute on GitHub
						</Alert.Title>
					</Alert>
				</a>
				<h1 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl font-semibold">
					Rhinolabs UI Toolkit: Fast, Customizable React & Next.js Components &
					Hooks
				</h1>
				<p className="mt-4 max-w-2xl text-xl sm:text-lg md:mt-5 md:text-2xl">
					Zero-configuration, fully customizable, and open source—build sleek
					UIs and robust logic faster with our React components and advanced
					hooks, seamlessly integrated with Next.js.
				</p>
				<div className="mt-4 sm:mt-8 flex sm:flex-row flex-col">
					<a href="/docs/get-started" className="sm:mr-4 my-4 sm:my-0">
						<Button className="cursor-pointer w-full" size="lg">
							Get Started
						</Button>
					</a>
					<CopyCommand />
				</div>
			</section>
		</>
	);
}
