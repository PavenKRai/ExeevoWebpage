import { test, expect } from "@playwright/test";
import { scrollToSceneProgress, stageTop } from "./helpers/scene";

const selected = (page: import("@playwright/test").Page) => page.locator('[role="tab"][aria-selected="true"]');

test.describe("platform page (relaxed layout, no pinning)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test("loads complete: rail, deck and detail all visible with room between them", async ({ page }) => {
    await page.goto("/platform");
    await page.waitForTimeout(1800); // load-in animation
    const h1 = await page.getByRole("heading", { level: 1 }).boundingBox();
    const rail = await page.getByRole("tablist").boundingBox();
    expect(rail!.y - (h1!.y + h1!.height)).toBeGreaterThan(60); // columns clear of the title
    await expect(page.getByRole("tabpanel")).toBeVisible();
    await expect(page.locator("#platform-explorer.scene")).toHaveCount(0); // explorer is a normal section
  });

  test("clicking a tab selects it without moving the page", async ({ page }) => {
    await page.goto("/platform");
    await page.waitForTimeout(1800);
    const before = await page.evaluate(() => window.scrollY);
    await page.getByRole("tab", { name: /Customer Insights/ }).click();
    await expect(selected(page)).toContainText("Customer Insights");
    await page.waitForTimeout(400);
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThan(60);
  });

  test("dark roles band pins full-bleed under the explorer", async ({ page }, info) => {
    test.skip(info.project.name === "reduced-motion", "pinned mode only");
    await page.goto("/platform");
    await page.locator("#platform-roles-band").waitFor();
    await scrollToSceneProgress(page, 0, 0.5);
    expect(await stageTop(page, 0)).toBe(0);
    const box = await page.locator("#platform-roles-band .scene-stage").boundingBox();
    expect(box!.width).toBeGreaterThan(1400); // full-bleed, not a small card
  });

  test("roles band links to Solutions by Role", async ({ page }) => {
    await page.goto("/platform");
    await expect(page.getByRole("link", { name: "Solutions by Role" }).last()).toHaveAttribute("href", "/solutions-by-role");
  });
});
