import { expect, test } from "@playwright/test";
import { industries } from "../content/industries";

test("industries: pharma by default with four team cards and the medtech copy kept in the HTML", async ({ page, request }) => {
  const html = await (await request.get("/industries")).text();
  expect(html).toContain("Capital equipment sales");
  await page.goto("/industries", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Built for pharma's complexity");
  for (const c of industries.items.pharma.cards) await expect(page.getByRole("heading", { name: c.title, level: 2 })).toBeVisible();
});

test("industries: switch and deep link", async ({ page }) => {
  await page.goto("/industries?industry=medtech", { waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: "MedTech" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Commercial complexity beyond the pill");
  await page.getByRole("button", { name: "Pharma" }).click();
  await expect(page).toHaveURL(/industry=pharma/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Built for pharma's complexity");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
});
