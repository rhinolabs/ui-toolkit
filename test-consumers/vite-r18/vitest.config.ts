import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    css: true,
    globals: true,
    setupFiles: ["./src/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    server: {
      deps: {
        inline: [/@rhinolabs/],
      },
    },
  },
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@test-utils": path.resolve(__dirname, "../shared-utils/src"),
    },
  },
});
