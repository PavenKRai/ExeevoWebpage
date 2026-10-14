import { expect, test } from "@playwright/test";
import { modules } from "../content/modules";

test("platform: one h1, all eight modules stacked with their capabilities in the HTML", async ({ request, page }) => {
  const html = await (await request.get("/platform")).text();
  for (const m of modules) {
    expect(html, m.name).toContain(`id="${m.slug}"`);
    expect(html).toContain(m.features[0].title.replace(/&/g, "&amp;"));
  }
  await page.goto("/platform", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Modules" }).getByRole("link")).toHaveCount(8);
});

test("platform: the module list and ?module= deep links scroll to the section", async ({ page }) => {
  await page.goto("/platform?module=event-management", { waitUntil: "networkidle" });
  await expect(page.locator("#event-management")).toBeInViewport({ timeout: 8000 });
  await page.goto("/platform", { waitUntil: "networkidle" });
  await page.getByRole("navigation", { name: "Modules" }).getByRole("link", { name: /Mobile App/ }).click();
  await expect(page.locator("#mobile-app")).toBeInViewport({ timeout: 8000 });
});

test("platform: no sideways scroll at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/platform", { waitUntil: "networkidle" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
});
