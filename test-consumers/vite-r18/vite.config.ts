import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		dedupe: ["react", "react-dom"],
		alias: {
			"@test-utils": path.resolve(__dirname, "../shared-utils/src"),
		},
	},
});
