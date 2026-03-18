import { test, expect } from "@playwright/test";
import { componentRegistry } from "../shared-utils/src/components/component-registry";
import { playgroundRenderHints } from "../shared-utils/src/playground/playground-registry";

// Components that render in portals and need trigger-click flow
const overlayComponents = Object.entries(playgroundRenderHints)
	.filter(([_, hint]) => hint.triggerMode)
	.map(([name]) => name);

// Components to skip entirely (e.g., Form requires react-hook-form context)
const skippedComponents = Object.entries(playgroundRenderHints)
	.filter(([_, hint]) => hint.skipRender)
	.map(([name]) => name);

test.describe("Visual regression", () => {
	test.beforeEach(async ({ page }) => {
		// Freeze time for Calendar determinism
		await page.clock.setFixedTime(new Date("2025-01-15T12:00:00Z"));

		// Disable animations via prefers-reduced-motion
		await page.emulateMedia({ reducedMotion: "reduce" });

		// Navigate to playground (all apps serve it at root)
		await page.goto("/");
		await page.waitForLoadState("networkidle");
	});

	for (const entry of componentRegistry) {
		// Skip components marked as skipped in playground hints
		if (skippedComponents.includes(entry.name)) continue;

		if (overlayComponents.includes(entry.name)) {
			test(`overlay: ${entry.name}`, async ({ page }) => {
				const container = page.locator(
					`[data-testid="${entry.name}"]`,
				);
				await container.scrollIntoViewIfNeeded();

				if (entry.name === "ContextMenu") {
					// Right-click the specific trigger text area
					await container
						.getByText("Right-click here for ContextMenu")
						.click({ button: "right" });
				} else if (entry.name === "HoverCard" || entry.name === "Tooltip") {
					// Hover over the trigger button by its text
					// Use force:true because the Sidebar may intercept pointer events
					await container
						.getByRole("button", { name: `Open ${entry.name}` })
						.hover({ force: true });
					// Wait for hover content to appear
					await page.waitForTimeout(500);
				} else {
					// Click the trigger button by its text (Dialog, AlertDialog, Sheet, Drawer, Popover, DropdownMenu)
					// Use force:true because the Sidebar component may intercept pointer events
					await container
						.getByRole("button", { name: `Open ${entry.name}` })
						.click({ force: true });
				}

				// Wait for overlay/portal content to render
				await page.waitForTimeout(300);

				await expect(page).toHaveScreenshot(
					`${entry.name}-open.png`,
					{
						animations: "disabled",
						caret: "hide",
					},
				);

				// Close overlay to not interfere with next test
				await page.keyboard.press("Escape");
				await page.waitForTimeout(200);
			});
		} else {
			test(`component: ${entry.name}`, async ({ page }, testInfo) => {
				// Toaster: skip on vite apps (no ThemeProvider)
				if (entry.name === "Toaster") {
					const projectName = testInfo.project.name;
					if (projectName.startsWith("vite")) {
						test.skip();
						return;
					}
				}

				const container = page.locator(
					`[data-testid="${entry.name}"]`,
				);
				await container.scrollIntoViewIfNeeded();

				await expect(container).toHaveScreenshot(
					`${entry.name}.png`,
					{
						animations: "disabled",
						caret: "hide",
					},
				);
			});
		}
	}
});
