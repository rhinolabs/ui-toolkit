import { defineConfig, devices } from "@playwright/test";

const apps = [
	{
		name: "vite-r18",
		port: 5180,
		command: "cd vite-r18 && pnpm dev",
	},
	{
		name: "vite-r19",
		port: 5190,
		command: "cd vite-r19 && pnpm dev",
	},
	{
		name: "next-r18",
		port: 3018,
		command: "cd next-r18 && pnpm dev",
	},
	{
		name: "next-r19",
		port: 3019,
		command: "cd next-r19 && pnpm dev",
	},
] as const;

export default defineConfig({
	testDir: "./visual",
	fullyParallel: false,
	retries: 1,
	use: {
		...devices["Desktop Chrome"],
		viewport: { width: 1280, height: 720 },
	},
	expect: {
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.01,
			animations: "disabled",
		},
	},
	projects: apps.map((app) => ({
		name: app.name,
		use: {
			baseURL: `http://localhost:${app.port}`,
		},
		snapshotPathTemplate: `{projectName}/__screenshots__/{arg}{ext}`,
	})),
	webServer: apps.map((app) => ({
		command: app.command,
		port: app.port,
		reuseExistingServer: true,
		timeout: 120_000,
	})),
});
