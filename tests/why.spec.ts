import { expect, test } from "@playwright/test";
import { compliance } from "../content/compliance";
import { comparison } from "../content/comparison";

test("why: one h1, compliance tiles under #compliance, comparison is a real table", async ({ page }) => {
  await page.goto("/why-exeevo#compliance", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator("#compliance")).toBeVisible();
  for (const c of compliance) await expect(page.getByRole("heading", { name: c.name, level: 3 })).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 800 });
  const table = page.getByRole("table");
  await expect(table.getByRole("row")).toHaveCount(comparison.rows.length + 1);
  await expect(table.getByRole("columnheader")).toHaveCount(4);
});

test("why: comparison becomes stacked cards on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/why-exeevo", { waitUntil: "networkidle" });
  await expect(page.getByRole("table")).toBeHidden();
  await expect(page.getByRole("heading", { name: comparison.rows[0].capability })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
});
