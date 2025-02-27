/* eslint-env node */
import { Layout, Navbar } from "nextra-theme-docs";
import { CustomFooter } from "../components/custom-footer.tsx";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./global.css";

export const metadata = {
	metadataBase: new URL("https://ui-toolkit.rhinolabs.agency"),
	title: {
		template: "%s - Rhinolabs UI Toolkit",
	},
};

export default async function RootLayout({ children }) {
	const navbar = (
		<Navbar
			logo={
				<div className="flex">
					<img src="/logo.png" alt="Rhinolabs logo" className="h-[40px]" />
					<b className="self-center">UI Toolkit</b>{" "}
				</div>
			}
		/>
	);
	return (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<Head faviconGlyph="✦" />
			<body>
				<Layout
					navbar={navbar}
					footer={<CustomFooter />}
					editLink="Edit this page on GitHub"
					docsRepositoryBase="https://github.com/rhinolabs/ui-toolkit/blob/main/packages/docs"
					sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: false }}
					pageMap={await getPageMap()}
					darkMode={false}
					nextThemes={{
						defaultTheme: "dark",
					}}
				>
					{children}
				</Layout>
			</body>
		</html>
	);
}
