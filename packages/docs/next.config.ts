import nextra from "nextra";

const withNextra = nextra({
	latex: true,
	search: {
		codeblocks: false,
	},
	contentDirBasePath: "/docs",
});

export default withNextra({
	reactStrictMode: true,
	basePath: "/ui-toolkit",
	images: {
		unoptimized: true,
	},
	output: "export",
});
