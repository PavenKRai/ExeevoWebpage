import type { Page } from "@playwright/test";

/** Geometry of the nth `.scene` on the page (document coordinates). */
export async function sceneGeometry(page: Page, index = 0) {
  return page.evaluate((i) => {
    const s = document.querySelectorAll<HTMLElement>(".scene")[i];
    const top = s.getBoundingClientRect().top + window.scrollY;
    return { top, height: s.offsetHeight, viewport: window.innerHeight, pinned: getComputedStyle(s).viewTimelineName !== "none" };
  }, index);
}

/** Scroll so the nth scene sits at pinned-progress p (0..1) and wait a frame. */
export async function scrollToSceneProgress(page: Page, index: number, p: number) {
  await page.waitForLoadState("networkidle"); // fonts/layout settled before measuring geometry
  const g = await sceneGeometry(page, index);
  await page.evaluate(([top, span, pr]) => window.scrollTo(0, top + span * pr), [g.top, g.height - g.viewport, p] as const);
  await page.waitForTimeout(250);
  return g;
}

/** Computed opacity / translate / scale of the first element matching `selector` inside the nth scene. */
export async function layerState(page: Page, index: number, selector: string) {
  return page.evaluate(
    ([i, sel]) => {
      const el = document.querySelectorAll(".scene")[i].querySelector(sel as string) as HTMLElement;
      const c = getComputedStyle(el);
      return { opacity: parseFloat(c.opacity), translate: c.translate, scale: c.scale, rotate: c.rotate };
    },
    [index, selector] as const,
  );
}

/** Top of the nth scene's stage relative to the viewport (≈0 while pinned). */
export async function stageTop(page: Page, index: number) {
  return page.evaluate((i) => Math.round(document.querySelectorAll(".scene")[i].querySelector(".scene-stage")!.getBoundingClientRect().top), index);
}
