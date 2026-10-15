import { expect, test } from "@playwright/test";
import { allServices, contact, phases } from "../content/services";

test("services page: one h1, three phases and every service's copy is in the HTML", async ({ request, page }) => {
  const html = await (await request.get("/services")).text();
  for (const s of allServices) {
    expect(html, s.title).toContain(s.title.replace(/&/g, "&amp;"));
    expect(html, `${s.title} description`).toContain(s.desc.slice(0, 40).replace(/'/g, "&#x27;"));
  }
  await page.goto("/services", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("With you from first workshop to every release after go-live");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  for (const p of phases) await expect(page.locator(`#${p.slug}`)).toHaveCount(1);
  await expect(page.getByRole("tablist")).toHaveCount(3);
});

test("service rail: click, arrow keys, previous/next wrap, one panel visible at a time", async ({ page }) => {
  await page.goto("/services", { waitUntil: "networkidle" });
  const implement = page.locator("#implement");
  const tabs = implement.getByRole("tab");
  await expect(tabs).toHaveCount(4);
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  await tabs.nth(2).click();
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
  await expect(implement.getByRole("tabpanel")).toHaveCount(1);
  await tabs.nth(2).focus();
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(3)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowDown"); // wraps to the first
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  await implement.getByRole("button", { name: "Previous service" }).first().click();
  await expect(tabs.nth(3)).toHaveAttribute("aria-selected", "true");
  await expect(implement.getByRole("tabpanel")).toContainText("Make sure the system gets used");
});

test("?service= deep link selects that service", async ({ page }) => {
  await page.goto("/services?service=managed-services", { waitUntil: "networkidle" });
  const operate = page.locator("#operate");
  await expect(operate.getByRole("tab", { name: /Managed Services/ })).toHaveAttribute("aria-selected", "true");
  await page.goto("/services?service=ai-readiness-advisory#demo", { waitUntil: "networkidle" });
  await expect(page.locator("#consult").getByRole("tab", { name: /AI Readiness/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#demo-service")).toHaveValue("AI Readiness & Advisory");
});

test("form offers every service plus 'not sure' and 'end-to-end'", async ({ page }) => {
  await page.goto("/services", { waitUntil: "networkidle" });
  const options = await page.locator("#demo-service option").allTextContents();
  expect(options).toEqual([...contact.serviceOptions]);
  expect(options.length).toBe(12);
});

test("JSON-LD lists the 10 services", async ({ request }) => {
  const html = await (await request.get("/services")).text();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const svc = blocks.flatMap((b) => b["@graph"] ?? []).find((n: { "@type": string }) => n["@type"] === "ProfessionalService");
  expect(svc.hasOfferCatalog.itemListElement).toHaveLength(10);
});

test("old Getting started and WordPress services URLs land on /services", async ({ request }) => {
  for (const from of ["/getting-started", "/nos-services"]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers()["location"], from).toMatch(/\/services$/);
  }
});
