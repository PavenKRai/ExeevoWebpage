import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 } });

test("solutions by role: header, panels and closing row fit one screen", async ({ page }) => {
  await page.goto("/solutions-by-role");
  await page.waitForTimeout(1800);
  const panels = await page.locator("#roles-scene article").evaluateAll((els) => els.map((e) => e.getBoundingClientRect().bottom));
  expect(panels.length).toBe(4);
  for (const b of panels) expect(b).toBeLessThan(900);
  const cta = await page.locator("#roles-scene").getByRole("link", { name: "Get a demo" }).boundingBox();
  expect(cta!.y + cta!.height).toBeLessThanOrEqual(900);
});

test("home, why exeevo and services keep their normal-flow layout (no forced one-screen stages)", async ({ page }) => {
  for (const r of ["/", "/why-exeevo", "/services"]) {
    await page.goto(r);
    const fixed = await page.evaluate(() => document.querySelectorAll(".pin-layout").length);
    expect(fixed, `${r} fit scenes`).toBe(0);
  }
});
