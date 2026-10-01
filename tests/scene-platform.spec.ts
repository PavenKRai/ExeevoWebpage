import { test, expect } from "@playwright/test";
import { sceneGeometry, scrollToSceneProgress, stageTop } from "./helpers/scene";

const selected = (page: import("@playwright/test").Page) => page.locator('[role="tab"][aria-selected="true"]');

test.describe("platform scenes", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test("explorer is a short beat: scrolling never changes the selected module", async ({ page, browserName }, info) => {
    test.skip(browserName !== "chromium" || info.project.name === "reduced-motion", "pinned mode only");
    await page.goto("/platform");
    await page.waitForLoadState("networkidle");
    const g = await sceneGeometry(page, 0);
    expect(g.pinned).toBe(true);
    expect(g.height).toBeLessThan(g.viewport * 2); // never a long hold
    await scrollToSceneProgress(page, 0, 0.5);
    expect(await stageTop(page, 0)).toBe(0);
    await expect(selected(page)).toContainText("CRM (Sales)");
  });

  test("clicking a tab selects it without moving the page", async ({ page }, info) => {
    test.skip(info.project.name === "reduced-motion", "pinned mode only");
    await page.goto("/platform");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500); // let the load-in animation settle so the tab is stationary
    const before = await page.evaluate(() => window.scrollY);
    await page.getByRole("tab", { name: /Customer Insights/ }).click();
    await expect(selected(page)).toContainText("Customer Insights");
    await page.waitForTimeout(500);
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThan(60);
  });

  test("reduced motion: scenes are not pinned", async ({ page }, info) => {
    test.skip(info.project.name !== "reduced-motion", "reduced-motion project only");
    await page.goto("/platform");
    for (const i of [0, 1]) {
      const g = await sceneGeometry(page, i);
      expect(g.pinned).toBe(false);
    }
    await page.getByRole("tab", { name: /Customer Insights/ }).click();
    await expect(selected(page)).toContainText("Customer Insights");
  });

  test("roles band scene follows the explorer", async ({ page }, info) => {
    test.skip(info.project.name === "reduced-motion", "pinned mode only");
    await page.goto("/platform");
    await page.locator("#platform-explorer").waitFor();
    await scrollToSceneProgress(page, 1, 0.5);
    expect(await stageTop(page, 1)).toBe(0);
    await expect(page.getByRole("link", { name: "Solutions by Role" }).first()).toBeVisible();
  });
});
