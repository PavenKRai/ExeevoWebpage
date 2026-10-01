import { expect, test } from "@playwright/test";
import { layerState, scrollToSceneProgress, sceneGeometry, stageTop } from "./helpers/scene";

// Scenes in the second half of the home page, located by id -> index among all `.scene` tracks.
const scenes = [
  { id: "scene-board", layer: ".hs-tile:last-child" },
  { id: "scene-privacy", layer: ".glass-light" },
  { id: "scene-golive", layer: ".glass-dark.sc" },
] as const;

const indexOf = (page: import("@playwright/test").Page, id: string) =>
  page.evaluate((i) => Array.from(document.querySelectorAll(".scene")).indexOf(document.getElementById(i)!), id);

for (const s of scenes) {
  test(`home ${s.id} pins and scrubs (or stays static under reduced motion)`, async ({ page }, info) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const idx = await indexOf(page, s.id);
    expect(idx).toBeGreaterThanOrEqual(0);
    const reduced = info.project.name === "reduced-motion";
    const g = await sceneGeometry(page, idx);
    if (reduced) {
      expect(g.pinned).toBe(false);
      expect(g.height).toBeLessThan(g.viewport * 1.5);
      return;
    }
    expect(g.pinned).toBe(true);
    await scrollToSceneProgress(page, idx, 0.5);
    expect(Math.abs(await stageTop(page, idx))).toBeLessThanOrEqual(2);
    await scrollToSceneProgress(page, idx, 0.1);
    const early = await layerState(page, idx, s.layer);
    await scrollToSceneProgress(page, idx, 0.9);
    const late = await layerState(page, idx, s.layer);
    expect(`${early.opacity}|${early.translate}|${early.scale}`).not.toBe(`${late.opacity}|${late.translate}|${late.scale}`);
  });
}
