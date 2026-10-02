import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("desktop navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("Industries menu: keyboard open, blurbs, links, Escape restores focus", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Industries menu" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    const menu = page.getByRole("dialog", { name: "Industries" });
    await expect(menu).toBeVisible();
    await expect(menu).toContainText("Commercial, Medical, Marketing, IT");
    await expect(menu).toContainText("Device & diagnostics commercial teams");
    await expect(menu.getByRole("link", { name: /MedTech/ })).toHaveAttribute("href", "/industries?industry=medtech");
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("Solutions by role menu shows the blurb and deep-links to a role", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Solutions by role menu" }).click();
    const menu = page.getByRole("dialog", { name: "Solutions by role" });
    await expect(menu).toContainText("Field Rep, MSL, KAM, Account Mgr");
    await menu.getByRole("link", { name: "Key Account Manager" }).click();
    await expect(page).toHaveURL(/solutions-by-role\?role=kam/);
    await expect(page.locator("#role-button-kam")).toHaveAttribute("aria-expanded", "true");
  });

  test("role menu works while already on the roles page", async ({ page }) => {
    await page.goto("/solutions-by-role");
    await page.waitForTimeout(1500);
    await page.getByRole("button", { name: "Solutions by role menu" }).click();
    await page.getByRole("dialog", { name: "Solutions by role" }).getByRole("link", { name: "Medical Science Liaison" }).click();
    await expect(page.locator("#role-button-msl")).toHaveAttribute("aria-expanded", "true");
  });

  test("Compliance link lands on the compliance tiles", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Compliance" }).click();
    await expect(page).toHaveURL(/why-exeevo#compliance/);
    await page.waitForTimeout(2200);
    await expect(page.getByText("Regulatory & compliance built in")).toBeInViewport();
    await expect(page.getByText("21 CFR Part 11")).toBeInViewport();
  });

  test("axe is clean with a menu open", async ({ page }) => {
    await page.goto("/why-exeevo");
    await page.getByRole("button", { name: "Industries menu" }).click();
    await page.waitForTimeout(2600);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(violations.filter((v) => v.impact === "serious" || v.impact === "critical").map((v) => v.id)).toEqual([]);
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("groups: Platform, Industries, Solutions by role, More", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu.getByRole("button", { name: "Platform" })).toBeVisible();
    await menu.getByRole("button", { name: "Industries" }).click();
    await expect(menu.getByRole("link", { name: /Pharma/ })).toBeVisible();
    await expect(menu.getByRole("link", { name: /MedTech/ })).toBeVisible();
    await expect(menu.getByRole("link", { name: /Solutions by role/ })).toBeVisible();
    for (const n of ["Why Exeevo", "Compliance", "Getting started"]) await expect(menu.getByRole("link", { name: n })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });
});

test("industry cards and role panels link to modules", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/industries");
  await expect(page.getByRole("link", { name: "CRM (Sales)" })).toHaveAttribute("href", "/platform?module=crm-sales");
  await page.goto("/solutions-by-role");
  await expect(page.getByRole("link", { name: "Mobile App" }).first()).toHaveAttribute("href", "/platform?module=mobile-app");
});
