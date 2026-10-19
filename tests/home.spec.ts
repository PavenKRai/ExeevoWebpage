import { expect, test } from "@playwright/test";

test("home: one h1 with the light and bold phrases, demo described for assistive tech, section order", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toContainText("Life sciences CRM,");
  await expect(h1.locator("b")).toHaveText("on the Microsoft cloud you already trust.");
  await expect(page.getByRole("img", { name: /Animated demo/ })).toBeVisible();
  for (const name of [/Microsoft underneath/, "What changes for your teams", /Everything in one view/, /Your data stays where you put it/, "Two paths to go live", /Pharma-ready CRM/]) await expect(page.getByRole("heading", { name })).toBeVisible();
});

test("home: all eight modules link into the platform and the CTAs go to the form", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const grid = page.locator("#platform-title").locator("xpath=ancestor::section");
  await expect(grid.locator("a[href^='/platform?module='], a[href='/ask-nova']")).toHaveCount(8);
  await expect(page.getByRole("main").getByRole("link", { name: "Get a demo" }).first()).toHaveAttribute("href", "/services#demo");
  await expect(page.getByRole("main").getByRole("link", { name: "Talk to our team" })).toHaveAttribute("href", "/services#demo");
});

test("home: Microsoft links, technology strip and client logos", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const main = page.getByRole("main");
  for (const name of ["Why Microsoft matters", "See the full Microsoft stack", "Built on Microsoft"]) await expect(main.getByRole("link", { name }).first()).toHaveAttribute("href", "/microsoft");
  const strip = page.getByRole("region", { name: "Microsoft technologies Exeevo is built on" });
  await expect(strip.locator("li:not([aria-hidden])").filter({ hasText: /^(Power Platform|Dataverse|Teams)$/ })).toHaveCount(3);
  await expect(strip.locator("li[aria-hidden='true']")).toHaveCount(13);
  for (const n of ["Daiichi-Sankyo", "Johnson & Johnson MedTech", "Sanofi"]) await expect(strip.getByRole("img", { name: n })).toBeVisible();
});

test("home: every module card says which Microsoft product it runs on", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const grid = page.locator("#platform-title").locator("xpath=ancestor::section");
  await expect(grid.getByText(/^On (Power Platform|Dynamics 365|Customer Insights|Dataverse|Microsoft Foundry)$/)).toHaveCount(8);
});
