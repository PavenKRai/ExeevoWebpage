import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 } });

test("industries: one-screen composition, four cards in a single row", async ({ page }) => {
  await page.goto("/industries");
  await page.waitForTimeout(1800);
  const cards = await page.locator("#industries-hero li").evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));
  expect(cards.length).toBe(4);
  expect(new Set(cards).size, "cards share one row").toBe(1);
  const stage = await page.locator("#industries-hero .scene-stage").boundingBox();
  expect(Math.round(stage!.height)).toBe(900);
});

test("solutions by role: header, panels and closing row fit one screen", async ({ page }) => {
  await page.goto("/solutions-by-role");
  await page.waitForTimeout(1800);
  const panels = await page.locator("#roles-scene article").evaluateAll((els) => els.map((e) => e.getBoundingClientRect().bottom));
  expect(panels.length).toBe(4);
  for (const b of panels) expect(b).toBeLessThan(900);
  const cta = await page.locator("#roles-scene").getByRole("link", { name: "Get a demo" }).boundingBox();
  expect(cta!.y + cta!.height).toBeLessThanOrEqual(900);
});

test("platform: roomy on load, fits one screen after the first scroll, and stays that way", async ({ page }, info) => {
  test.skip(info.project.name === "reduced-motion", "reduced motion keeps the roomy layout");
  await page.goto("/platform");
  await page.waitForTimeout(2200);
  const railTop = () => page.getByRole("tablist").locator("xpath=..").evaluate((e) => Math.round(e.getBoundingClientRect().top + scrollY));
  const before = await railTop();
  await page.mouse.wheel(0, 40);
  await page.waitForTimeout(1800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  const after = await railTop();
  expect(after, "columns moved up into the compact layout").toBeLessThan(before - 100);
  // the whole explorer (columns) fits inside the first screen now
  const bottom = await page.getByRole("tabpanel").evaluate((e) => e.getBoundingClientRect().bottom);
  expect(bottom).toBeLessThanOrEqual(900);
  // scrolling there and back does not undo it
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  expect(await railTop()).toBe(after);
});

test("platform: the dark roles band is a full-screen section", async ({ page }) => {
  await page.goto("/platform");
  const box = await page.locator("#platform-roles-band .scene-stage").boundingBox();
  expect(Math.round(box!.height)).toBe(900);
  expect(Math.round(box!.width)).toBe(1440);
});

test("home, why exeevo and getting started keep their normal-flow layout (no forced one-screen stages)", async ({ page }) => {
  for (const r of ["/", "/why-exeevo", "/getting-started"]) {
    await page.goto(r);
    const fixed = await page.evaluate(() => document.querySelectorAll(".pin-layout").length);
    expect(fixed, `${r} fit scenes`).toBe(0);
  }
});
