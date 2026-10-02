import { expect, test } from "@playwright/test";

const routes = ["/", "/platform", "/why-exeevo", "/industries", "/solutions-by-role", "/getting-started"];
test.use({ viewport: { width: 1440, height: 900 } });

const state = (page: import("@playwright/test").Page) =>
  page.evaluate(() => {
    const vh = innerHeight;
    const hidden = document.querySelectorAll(".rv-hide").length;
    const inView = [...document.querySelectorAll(".rv, .sr, .srl, .srr, .srg, .srt, .srs, .srf, .stagger > *")].filter((e) => {
      const r = e.getBoundingClientRect();
      return r.height > 0 && r.top >= 0 && r.top + r.height < vh * 0.9; // clear of the bottom reveal margin
    });
    return { hidden, dim: inView.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length };
  });

test("nothing is pinned or tied to scroll position", async ({ page }) => {
  for (const r of routes) {
    await page.goto(r);
    await page.waitForTimeout(800);
    const m = await page.evaluate(() => ({
      sticky: [...document.querySelectorAll(".scene-stage")].filter((e) => getComputedStyle(e).position === "sticky").length,
      timelines: [...document.querySelectorAll(".scene")].filter((e) => { const n = (getComputedStyle(e) as CSSStyleDeclaration & { viewTimelineName?: string }).viewTimelineName; return n !== undefined && n !== "none"; }).length, // Firefox has no view timelines at all
      scrubbed: document.getAnimations().filter((a) => a.timeline && a.timeline.constructor.name !== "DocumentTimeline").length,
    }));
    expect(m.sticky, `${r} sticky stages`).toBe(0);
    expect(m.timelines, `${r} view timelines`).toBe(0);
    // only the top progress bar and glow parallax may follow scroll
    expect(m.scrubbed, `${r} scroll-linked animations`).toBeLessThan(8);
  }
});

test("stopping the scroll anywhere never leaves a half-finished reveal", async ({ page }) => {
  test.setTimeout(90_000);
  for (const r of ["/", "/why-exeevo", "/getting-started"]) {
    await page.goto(r);
    await page.waitForTimeout(1500);
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (const frac of [0.23, 0.41, 0.58, 0.77]) {
      await page.evaluate((y) => window.scrollTo(0, y), Math.round(H * frac));
      await page.waitForTimeout(2600); // stop, wait for staggered transitions (up to ~1.6 s) under load
      const s = await state(page);
      expect(s.dim, `${r} @${frac}: items in view that are not fully visible`).toBe(0);
    }
  }
});

test("reveals play once: scrolling back up does not hide anything again", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1500);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 400) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(2200);
  const after = (await state(page)).hidden;
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.evaluate((v) => window.scrollTo(0, v), Math.round(H * 0.45));
  await page.waitForTimeout(800);
  const s = await state(page);
  expect(after).toBe(0);
  expect(s.hidden).toBe(0);
  expect(s.dim).toBe(0);
});

test("below-the-fold items start hidden, then reveal when scrolled into view", async ({ page }, info) => {
  test.skip(info.project.name === "reduced-motion", "reduced motion shows everything immediately");
  await page.goto("/");
  await page.waitForTimeout(1500);
  const before = await page.evaluate(() => document.querySelectorAll(".rv-hide").length);
  expect(before).toBeGreaterThan(5);
  const el = page.locator(".hp-grid, [class*='hp-']").first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  expect(await page.evaluate(() => document.querySelectorAll(".rv-hide").length)).toBeLessThan(before);
});

test("server HTML shows everything: no hidden classes, content present without JS", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  for (const r of routes) {
    await page.goto(r);
    expect(await page.locator(".rv-hide").count(), `${r} hidden`).toBe(0);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  }
  await page.goto("/getting-started");
  await expect(page.getByText("Talk to our team")).toBeVisible();
  await ctx.close();
});

test("reduced motion: everything visible immediately", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("/why-exeevo");
  await page.waitForTimeout(600);
  expect(await page.locator(".rv-hide").count()).toBe(0);
  await ctx.close();
});

test("/getting-started#demo lands with the form visible", async ({ page }) => {
  await page.goto("/getting-started#demo");
  await page.waitForTimeout(1500);
  await expect(page.getByRole("form", { name: "Request a demo" })).toBeInViewport();
  await page.locator("#demo-name").fill("Test");
  await expect(page.locator("#demo-name")).toHaveValue("Test");
});

test("jumping straight to the bottom never leaves blank areas when scrolling back up", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); // skip everything in between
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, Math.round(document.documentElement.scrollHeight * 0.4)));
  await page.waitForTimeout(2400);
  const s = await state(page);
  expect(s.hidden).toBe(0);
  expect(s.dim).toBe(0);
});
