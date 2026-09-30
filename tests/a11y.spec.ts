import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/platform", "/why-exeevo", "/industries", "/solutions-by-role", "/getting-started"];

for (const route of routes) {
  test(`axe: ${route} has no serious or critical violations`, async ({ page }) => {
    await page.goto(route);
    await page.locator("h1").waitFor();
    await page.waitForTimeout(1200);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const bad = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(bad.map((v) => `${v.id}: ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
  });
}
