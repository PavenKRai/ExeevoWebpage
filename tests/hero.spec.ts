import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 } });

const boxes = ["Compliance by design", "AI at its core", "Your data privacy, guaranteed"];

test("home hero: the three boxes are visible on load, after scrolling, and after scrolling back up", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(2200);
  for (const b of boxes) await expect(page.getByRole("heading", { name: b })).toBeInViewport();

  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  for (const b of boxes) {
    const h = page.getByRole("heading", { name: b });
    await expect(h).toBeInViewport();
    const opacity = await h.evaluate((e) => {
      let o = 1;
      for (let n: Element | null = e; n; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity);
      return o;
    });
    expect(opacity, `${b} opacity`).toBeGreaterThan(0.99);
  }
});

test("home hero: nothing in the hero fades away as you scroll", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(2200);
  await page.evaluate(() => window.scrollTo(0, 250));
  await page.waitForTimeout(800);
  const h1 = await page.getByRole("heading", { level: 1 }).evaluate((e) => parseFloat(getComputedStyle(e).opacity));
  expect(h1).toBe(1);
  await expect(page.getByRole("heading", { name: boxes[0] })).toHaveCSS("opacity", "1");
});
