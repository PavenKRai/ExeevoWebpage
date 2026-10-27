import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 } });

test("home, why exeevo and services keep their normal-flow layout (no forced one-screen stages)", async ({ page }) => {
  for (const r of ["/", "/why-exeevo", "/services"]) {
    await page.goto(r);
    const fixed = await page.evaluate(() => document.querySelectorAll(".pin-layout").length);
    expect(fixed, `${r} fit scenes`).toBe(0);
  }
});
