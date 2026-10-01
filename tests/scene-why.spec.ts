import { expect, test } from "@playwright/test";
import { layerState, scrollToSceneProgress, sceneGeometry, stageTop } from "./helpers/scene";

test.use({ viewport: { width: 1440, height: 900 } });

const scenes = [
  { index: 0, id: "why-hero", layer: "ul" },
  { index: 1, id: "why-compare", layer: "tbody tr:nth-child(2)" },
  { index: 2, id: "why-tenant", layer: "[role=group] > div:nth-child(3)" },
];

test.describe("why-exeevo pinned scenes", () => {
  test.beforeEach(async ({ page }, info) => {
    await page.goto("/why-exeevo");
    await page.waitForLoadState("networkidle");
    test.skip(info.project.name === "reduced-motion", "covered by the reduced-motion test");
  });

  for (const s of scenes) {
    test(`${s.id} pins and scrubs`, async ({ page }) => {
      expect((await sceneGeometry(page, s.index)).pinned).toBe(true);
      await scrollToSceneProgress(page, s.index, 0.5);
      expect(Math.abs(await stageTop(page, s.index))).toBeLessThanOrEqual(1);
      await scrollToSceneProgress(page, s.index, 0.1);
      const early = await layerState(page, s.index, s.layer);
      await scrollToSceneProgress(page, s.index, 0.9);
      const late = await layerState(page, s.index, s.layer);
      expect(
        early.opacity !== late.opacity ||
          early.translate !== late.translate ||
          early.scale !== late.scale,
      ).toBe(true);
    });
  }
});

test("scenes are not pinned under reduced motion", async ({ browser }) => {
  const ctx = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto("/why-exeevo");
  for (let i = 0; i < 3; i++) expect((await sceneGeometry(page, i)).pinned).toBe(false);
  await expect(page.locator("table tbody tr")).toHaveCount(5);
  await ctx.close();
});
