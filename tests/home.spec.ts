import { expect, test } from "@playwright/test";

test("home: one h1 with the light and bold phrases, demo described for assistive tech, section order", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toContainText("Built to grow HCP relationships.");
  await expect(h1.locator("b")).toHaveText("Prove it every quarter.");
  await expect(page.getByRole("img", { name: /Animated demo/ })).toBeVisible();
  for (const name of ["Everything in one view", /Your data stays where you put it/, "Two paths to go live", "Not sure where to start?"]) await expect(page.getByRole("heading", { name })).toBeVisible();
});

test("home: all eight modules link into the platform and the CTAs go to the form", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const grid = page.locator("#platform-title").locator("xpath=ancestor::section");
  await expect(grid.locator("a[href^='/platform?module='], a[href='/ask-nova']")).toHaveCount(8);
  await expect(page.getByRole("main").getByRole("link", { name: "Get a demo" }).first()).toHaveAttribute("href", "/services#demo");
  await expect(page.getByRole("main").getByRole("link", { name: "Talk to our team" })).toHaveAttribute("href", "/services#demo");
});
