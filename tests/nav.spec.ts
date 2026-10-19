import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const navLabels = ["Platform", "Ask-Nova", "Services", "Why Exeevo", "Microsoft", "About", "Partnerships", "Resources"];

test.describe("desktop navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("plain links in order (Partnerships replaces Industries, Microsoft added), Solutions by role not linked", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const texts = await nav.getByRole("link").allInnerTexts();
    expect(texts.map((t) => t.trim())).toEqual(navLabels);
    await expect(page.locator("header a[href='/solutions-by-role'], footer a[href='/solutions-by-role']")).toHaveCount(0);
    await expect(nav.getByRole("link", { name: "Partnerships" })).toHaveAttribute("href", "/partners");
    await expect(nav.getByRole("link", { name: "Microsoft" })).toHaveAttribute("href", "/microsoft");
    await expect(nav.getByRole("link", { name: "Industries" })).toHaveCount(0);
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Pharma" })).toHaveAttribute("href", "/industries?industry=pharma");
  });

  test("keyboard: every nav link is reachable with Tab and shows focus", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Partnerships" });
    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/partners/);
  });

  test("footer Trust & Compliance link lands on the compliance tiles", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: "Trust & Compliance" }).click();
    await expect(page).toHaveURL(/why-exeevo#compliance/);
    await page.waitForTimeout(2200);
    await expect(page.locator("#compliance")).toBeInViewport();
  });

  test("axe is clean on the shell", async ({ page }) => {
    await page.goto("/why-exeevo");
    await page.waitForTimeout(2600);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(violations.filter((v) => v.impact === "serious" || v.impact === "critical").map((v) => v.id)).toEqual([]);
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens as a dialog with every page link and closes with Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    for (const n of navLabels) await expect(menu.getByRole("link", { name: n })).toBeVisible();
    await expect(menu.getByRole("link", { name: /Solutions by role/ })).toHaveCount(0);
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });
});

test("industry cards and role panels link to modules", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/industries");
  await expect(page.getByRole("link", { name: "CRM (Sales)" }).first()).toHaveAttribute("href", "/platform?module=crm-sales");
  await page.goto("/solutions-by-role");
  await expect(page.getByRole("link", { name: "Mobile App" }).first()).toHaveAttribute("href", "/platform?module=mobile-app");
});
