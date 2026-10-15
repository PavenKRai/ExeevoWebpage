import { expect, test } from "@playwright/test";
import { about } from "../content/about";

test("about: one h1, story, why, values and every office address are in the HTML", async ({ request, page }) => {
  const html = await (await request.get("/about")).text();
  const esc = (t: string) => t.replace(/'/g, "&#x27;").replace(/&/g, "&amp;");
  for (const t of [about.story.items[0].body.slice(0, 40), about.why.items[3].title, about.values.items[2].title, ...about.offices.list.flatMap((o) => o.addr)]) expect(html, t).toContain(esc(t));
  await page.goto("/about", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(about.h1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});

test("about: choosing an office shows its address", async ({ page }) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  const [first, second] = about.offices.list;
  const btn = (city: string) => page.getByRole("button", { name: new RegExp(city) });
  await expect(btn(first.city)).toHaveAttribute("aria-pressed", "true");
  const addr = page.getByText(second.addr[0], { exact: true });
  const width = () => addr.evaluate((e) => e.parentElement!.getBoundingClientRect().width);
  expect(await width(), "unselected addresses stay in the HTML but are visually hidden").toBeLessThanOrEqual(1);
  await btn(second.city).click();
  await expect(btn(second.city)).toHaveAttribute("aria-pressed", "true");
  await expect(btn(first.city)).toHaveAttribute("aria-pressed", "false");
  await expect.poll(width).toBeGreaterThan(50);
});

test("about: closing cards lead to Partners and the demo form; JSON-LD describes the organisation", async ({ page, request }) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  await expect(page.getByRole("link", { name: new RegExp(about.closing.partners.cta) })).toHaveAttribute("href", "/partners");
  await expect(page.getByRole("link", { name: new RegExp(about.closing.contact.cta) })).toHaveAttribute("href", "/services#demo");
  const html = await (await request.get("/about")).text();
  expect(html).toContain("application/ld+json");
  expect(html).toContain("AboutPage");
});

test("about: no horizontal overflow and the hero ends fully visible", async ({ page }) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about", { waitUntil: "networkidle" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `width ${width}`).toBeLessThanOrEqual(width);
  }
  await page.waitForTimeout(1500);
  expect(Number(await page.getByRole("heading", { level: 1 }).evaluate((e) => getComputedStyle(e).opacity))).toBe(1);
});
