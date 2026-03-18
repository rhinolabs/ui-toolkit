import React from "react";
import { render } from "@testing-library/react";
import * as Components from "@rhinolabs/ui";

/**
 * Findings tests — document known issues as executable tests.
 *
 * These tests encode verified behavior. If a test fails after a code change,
 * it means the behavior changed — investigate whether it's a fix or a regression.
 */
describe("Findings validation", () => {
  // ─── Calendar visual layout ─────────────────────────────────────────────
  //
  // The Calendar renders visually broken in ALL 4 playground apps
  // (day numbers jammed together, no grid). The DOM has correct classNames
  // (flex, w-full, etc.) but the visual layout is broken.
  // This is a CSS issue introduced by PR #84.
  // See: test-consumers/findings/calendar-visually-broken.md
  describe("Calendar", () => {
    it("renders with classNames applied to week rows", () => {
      const { container } = render(<Components.Calendar />);

      const rows = container.querySelectorAll("tr, [role='row']");
      const weekRows = Array.from(rows).filter(
        (row) => row.querySelector("td, [role='gridcell']") !== null,
      );

      expect(weekRows.length).toBeGreaterThan(0);

      const hasFlexClass = weekRows.some((row) =>
        row.classList.contains("flex"),
      );
      expect(hasFlexClass).toBe(true);
    });

    it("renders grid structure", () => {
      const { container } = render(<Components.Calendar />);
      expect(container.querySelector("table, [role='grid']")).toBeTruthy();
    });
  });

  // ─── Toaster ──────────────────────────────────────────────────────────────
  describe("Toaster", () => {
    it("is exported from @rhinolabs/ui", () => {
      expect(Components.Toaster).toBeDefined();
      expect(typeof Components.Toaster).toBe("function");
    });

    it("renders without ThemeProvider (uses default theme)", () => {
      const { container } = render(<Components.Toaster />);
      expect(container).toBeTruthy();
    });
  });
});
