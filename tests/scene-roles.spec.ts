import { expect, test } from "@playwright/test";
import { scrollToSceneProgress, sceneGeometry, stageTop } from "./helpers/scene";

const open = (slug: string) => `#role-button-${slug}`;

test.describe("roles scene", () => {
  test.beforeEach(async ({ page }, info) => {
    test.skip(info.project.name === "reduced-motion", "covered by the reduced-motion test");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/solutions-by-role");
  });

  test("scene is a short beat: scrolling never changes the open role", async ({ page }) => {
    const g = await sceneGeometry(page);
    expect(g.pinned).toBe(true);
    expect(g.height).toBeLessThan(g.viewport * 2); // never a long hold
    await scrollToSceneProgress(page, 0, 0.6);
    expect(await stageTop(page, 0)).toBe(0);
    await expect(page.locator(open("field-rep"))).toHaveAttribute("aria-expanded", "true");
  });

  test("clicking a role opens it without moving the page", async ({ page }) => {
    const before = await page.evaluate(() => window.scrollY);
    await page.locator(open("msl")).click({ force: true });
    await expect(page.locator(open("msl"))).toHaveAttribute("aria-expanded", "true");
    await page.waitForTimeout(500);
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThan(60);
  });
});

test("reduced motion: scene is not pinned and the first role is open", async ({ page }, info) => {
  test.skip(info.project.name !== "reduced-motion", "reduced-motion project only");
  await page.goto("/solutions-by-role");
  const g = await sceneGeometry(page);
  expect(g.pinned).toBe(false);
  expect(g.height).toBeLessThan(g.viewport * 2);
  await expect(page.locator(open("field-rep"))).toHaveAttribute("aria-expanded", "true");
});
