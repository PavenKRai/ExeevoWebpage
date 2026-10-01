import { expect, test } from "@playwright/test";
import { layerState, scrollToSceneProgress, stageTop } from "./helpers/scene";

// Index of a scene by its id among all `.scene` elements.
async function sceneIndex(page: import("@playwright/test").Page, id: string) {
  await page.locator(`#${id}`).waitFor({ state: "attached" }); // client-rendered (Suspense) scenes mount after load
  return page.evaluate((i) => [...document.querySelectorAll(".scene")].findIndex((s) => s.id === i), id);
}

test.describe("industries + getting started scenes", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("industries hero pins and its layers scrub", async ({ page }, info) => {
    await page.goto("/industries");
    const i = await sceneIndex(page, "industries-hero");
    expect(i).toBeGreaterThanOrEqual(0);
    await scrollToSceneProgress(page, i, 0.5);
    if (info.project.name === "reduced-motion") {
      const pinned = await page.evaluate((n) => getComputedStyle(document.querySelectorAll(".scene")[n]).viewTimelineName !== "none", i);
      expect(pinned).toBe(false);
      return;
    }
    expect(Math.abs(await stageTop(page, i))).toBeLessThanOrEqual(2);
    // Load entrance is time-based, so the cards are in place at scroll 0; the object layer still scrubs on top.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);
    const card = await layerState(page, i, "ul > li");
    expect(card.opacity).toBe(1);
    const objT = () =>
      page.evaluate((n) => getComputedStyle(document.querySelectorAll(".scene")[n].querySelector(".ind-obj")!.parentElement!).translate, i);
    await scrollToSceneProgress(page, i, 0.1);
    const a = await objT();
    await scrollToSceneProgress(page, i, 0.95);
    expect(a).not.toEqual(await objT());
  });

  test("industries close scene pins", async ({ page }, info) => {
    test.skip(info.project.name === "reduced-motion");
    await page.goto("/industries");
    const i = await sceneIndex(page, "industries-close");
    await scrollToSceneProgress(page, i, 0.5);
    expect(Math.abs(await stageTop(page, i))).toBeLessThanOrEqual(2);
  });

  test("start paths scene pins and scrubs", async ({ page }, info) => {
    test.skip(info.project.name === "reduced-motion");
    await page.goto("/getting-started");
    const i = await sceneIndex(page, "start-paths");
    await scrollToSceneProgress(page, i, 0.5);
    expect(Math.abs(await stageTop(page, i))).toBeLessThanOrEqual(2);
    await scrollToSceneProgress(page, i, 0.05);
    const a = await layerState(page, i, "h2");
    const c = await page.evaluate((n) => getComputedStyle(document.querySelectorAll(".scene")[n].querySelector(".sc-par") as HTMLElement).translate, i);
    await scrollToSceneProgress(page, i, 0.95);
    const c2 = await page.evaluate((n) => getComputedStyle(document.querySelectorAll(".scene")[n].querySelector(".sc-par") as HTMLElement).translate, i);
    expect(a.opacity).toBeGreaterThan(0);
    expect(c).not.toEqual(c2);
  });

  test("demo scene pins and #demo lands on a usable form", async ({ page }, info) => {
    await page.goto("/getting-started#demo");
    await page.waitForTimeout(800);
    const form = page.getByRole("form", { name: "Request a demo" });
    await expect(form).toBeInViewport({ ratio: 0.95 });
    await form.locator("#demo-name").fill("Test Person");
    await expect(form.locator("#demo-name")).toHaveValue("Test Person");
    const opacity = await form.evaluate((el) => {
      let o = 1;
      for (let n: Element | null = el; n; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity);
      return o;
    });
    expect(opacity).toBeGreaterThan(0.95);
    if (info.project.name !== "reduced-motion") {
      const i = await sceneIndex(page, "start-demo");
      expect(Math.abs(await stageTop(page, i))).toBeLessThanOrEqual(2);
    }
  });
});
