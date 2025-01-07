import type { Configuration } from "@rspack/cli";
import { rspack } from "@rspack/core";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";
import path from "node:path";

const isDev = process.env.MODE === "cosmos";

const config: Configuration = {
	mode: isDev ? "development" : "production",
	entry: {
		main: isDev ? "./src/cosmos/cosmos-entry.tsx" : "./src/main.tsx",
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			title: "main",
			template: "./index.html",
		}),
		isDev ? new ReactRefreshPlugin() : null,
		new rspack.ProgressPlugin({}),
	],
	experiments: {
		css: true,
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: {
									tailwindcss: {},
									autoprefixer: {},
								},
							},
						},
					},
				],
				type: "css",
			},
			{
				test: /\.svg$/,
				type: "asset",
			},
			{
				test: /\.(jsx?|tsx?)$/,
				exclude: /[\\/]node_modules[\\/]/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							sourceMap: true,
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true,
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev,
									},
								},
							},
							env: {
								targets: [
									"chrome >= 87",
									"edge >= 88",
									"firefox >= 78",
									"safari >= 14",
								],
							},
						},
					},
				],
			},
		],
	},
	devServer: {
		port: 3000,
		hot: true,
		open: true,
	},
};

export default config;
