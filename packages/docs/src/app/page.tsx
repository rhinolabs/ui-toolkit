import { Alert, Button, Separator } from "@rhinolabs/ui";
import { GitHubIcon } from "nextra/icons";
import CopyCommand from "../components/copy-command.tsx";
import { CollapsibleDemo } from "../demos/collapsible-demo.tsx";
import { AlertDemo } from "../demos/alert-demo.tsx";
import { DialogDemo } from "../demos/dialog-demo.tsx";
import { ResizableDemo } from "../demos/resizable-demo.tsx";
import { FeatureCard } from "../components/feature-card.tsx";
import { TableDemo } from "../demos/table-demo.tsx";
import { ContextMenuDemo } from "../demos/context-menu-demo.tsx";

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

			<Separator />

			<section className="py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center">
						<h2 className="text-sm font-bold tracking-wide uppercase text-primary">
							Features
						</h2>
						<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
							A Better Way to Build
						</p>
						<p className="mt-4 max-w-2xl text-xl lg:mx-auto">
							A quick overview of some of the features we offer.
						</p>
					</div>

					<div className="lg:text-center mt-8">
						<h3 className="text-base italic font-bold tracking-wide uppercase text-primary text-center">
							&lt; UI Components /&gt;
						</h3>
					</div>

					<div className="mt-10 grid gap-8 md:grid-cols-3">
						<FeatureCard title="Collapsibles" link="/docs/ui/collapsible">
							<CollapsibleDemo />
						</FeatureCard>
						<FeatureCard title="Alerts" link="/docs/ui/alerts">
							<AlertDemo />
						</FeatureCard>
						<FeatureCard title="Dialogs" link="/docs/ui/dialogs">
							<DialogDemo />
						</FeatureCard>
						<FeatureCard title="Resizables" link="/docs/ui/resizables">
							<ResizableDemo />
						</FeatureCard>
						<FeatureCard title="Tables" link="/docs/ui/table">
							<TableDemo />
						</FeatureCard>
						<FeatureCard title="Context Menu" link="/docs/ui/context-menu">
							<ContextMenuDemo />
						</FeatureCard>
					</div>

					<div className="lg:text-center mt-8">
						<h3 className="text-base italic font-bold tracking-wide uppercase text-primary text-center">
							Hooks ()
						</h3>
					</div>

					<div className="mt-10 grid gap-8 md:grid-cols-3">
						<FeatureCard
							title="useBattery"
							link="/docs/hooks/use-battery"
							type="hook"
						>
							<p>
								A hook that provides access to the device’s battery information
								through the Battery Status API. Perfect for implementing
								power-aware features and battery status indicators.
							</p>
						</FeatureCard>
						<FeatureCard
							title="useCountdown"
							link="/docs/hooks/use-countdown"
							type="hook"
						>
							<p>
								A hook that provides a numeric countdown with pause, play, and
								reset controls. Perfect for implementing countdowns between
								specific numbers, like game countdowns or timed interactions.
							</p>
						</FeatureCard>
						<FeatureCard
							title="useFetch"
							link="/docs/hooks/use-fetch"
							type="hook"
						>
							<p>
								A hook for making HTTP requests and managing the associated
								states. It provides loading, error, and success states along
								with the fetched data.
							</p>
						</FeatureCard>
						<FeatureCard
							title="useLocalStorage"
							link="/docs/hooks/use-local-storage"
							type="hook"
						>
							<p>
								A hook that provides persistent storage with localStorage,
								including cross-tab synchronization. Perfect for implementing
								persistent state, user preferences, or any data that needs to
								survive page reloads.
							</p>
						</FeatureCard>
						<FeatureCard
							title="useSearchParams"
							link="/docs/hooks/use-search-params"
							type="hook"
						>
							<p>
								A hook that parses URL search parameters into a typed object.
								Perfect for handling query parameters, filtering, and URL-based
								state management.
							</p>
						</FeatureCard>
						<FeatureCard
							title="useWindowSize"
							link="/docs/hooks/use-window-size"
							type="hook"
						>
							<p>
								A hook that tracks window dimensions and provides responsive
								breakpoint information. Perfect for implementing responsive
								layouts, conditional rendering based on screen size, and dynamic
								UI adjustments.
							</p>
						</FeatureCard>
					</div>
				</div>
			</section>
		</>
	);
}
