import { expect, test } from "@playwright/test";
import { layerState, sceneGeometry, scrollToSceneProgress, stageTop } from "./helpers/scene";

// Scenes 0..1 on the home page: hero, pathways (outcomes is now a plain section).
const scenes = [
  { name: "hero", layer: ".hs-text" },
  { name: "pathways", layer: ".hp-grid .sc" },
];

test.describe("home scenes (first half)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(800);
  });

  scenes.forEach((s, i) => {
    test(`${s.name} scene pins and scrubs`, async ({ page }, info) => {
      const g = await sceneGeometry(page, i);
      if (info.project.use.reducedMotion === "reduce") {
        expect(g.pinned).toBe(false);
        expect(g.height).toBeLessThan(g.viewport * 1.5 + 400);
        return;
      }
      test.skip(!g.pinned, "browser without scroll-driven animations");
      await scrollToSceneProgress(page, i, 0.5);
      expect(Math.abs(await stageTop(page, i))).toBeLessThanOrEqual(2);
      await scrollToSceneProgress(page, i, 0.1);
      const a = await layerState(page, i, s.layer);
      await scrollToSceneProgress(page, i, 0.9);
      const b = await layerState(page, i, s.layer);
      expect(a.opacity !== b.opacity || a.translate !== b.translate).toBe(true);
    });
  });
});
