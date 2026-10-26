import { expect, test } from "@playwright/test";
import { capabilities } from "../content/platform";

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/'/g, "&#x27;");

test("platform: one h1, all eleven capabilities and a feature from each are in the HTML", async ({ request, page }) => {
  const html = await (await request.get("/platform")).text();
  for (const c of capabilities) {
    expect(html, c.name).toContain(`id="cap-${c.id}"`);
    expect(html).toContain(esc(c.features[0].title));
  }
  expect(html).toContain("Actionable rep metrics");
  for (const gone of ["Territory performance map", "Product adoption journey", "Approved email at scale"]) expect(html, gone).not.toContain(gone);
  expect(html).not.toMatch(/>Tenders</);
  expect((html.match(/"@type":"ListItem"/g) ?? []).length).toBeGreaterThanOrEqual(11);
  await page.goto("/platform", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Jump to a capability" }).getByRole("link")).toHaveCount(11);
});

test("platform: industry filter hides other industries' capabilities and tagged features", async ({ page }) => {
  await page.goto("/platform", { waitUntil: "networkidle" });
  const jump = page.getByRole("navigation", { name: "Jump to a capability" }).getByRole("link");
  await page.getByRole("button", { name: "MedTech", exact: true }).click();
  await expect(page.locator("#cap-cases")).toBeVisible();
  await expect(page.locator("#cap-retail")).toHaveCount(0);
  await expect(page.locator("#cap-field-sales").getByRole("heading", { name: /^Samples/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Consumer Health", exact: true }).click();
  await expect(page.locator("#cap-retail")).toBeVisible();
  await expect(page.locator("#cap-cases")).toHaveCount(0);
  await page.getByRole("button", { name: "All industries" }).click();
  await expect(jump).toHaveCount(11);
  await expect(page.locator("#cap-field-sales").getByRole("heading", { name: /^Samples/ })).toBeVisible();
});

test("platform: 'Used by' filter narrows to matching capabilities (plus those open to every user)", async ({ page }) => {
  await page.goto("/platform", { waitUntil: "networkidle" });
  await page.getByLabel("Filter by who uses it").selectOption("MSLs");
  await expect(page.locator("section[id^='cap-']")).toHaveCount(2);
  await expect(page.locator("#cap-medical")).toBeVisible();
  await expect(page.locator("#cap-ask-nova")).toBeVisible();
  await page.getByRole("button", { name: "Consumer Health", exact: true }).click();
  await expect(page.locator("#cap-medical")).toHaveCount(0);
  await expect(page.locator("#cap-ask-nova")).toBeVisible();
  await page.getByRole("button", { name: "All industries" }).click();
  await page.getByLabel("Filter by who uses it").selectOption("All");
  await expect(page.locator("section[id^='cap-']")).toHaveCount(11);
});

test("platform: jump links and old ?module= deep links scroll to the right section", async ({ page }) => {
  await page.goto("/platform?module=event-management", { waitUntil: "networkidle" });
  await expect(page.locator("#cap-events")).toBeInViewport({ timeout: 8000 });
  await page.goto("/platform?module=mobile-app", { waitUntil: "networkidle" });
  await expect(page.locator("#cap-field-sales")).toBeInViewport({ timeout: 8000 });
  await page.goto("/platform", { waitUntil: "networkidle" });
  await page.getByRole("navigation", { name: "Jump to a capability" }).getByRole("link", { name: "Events" }).click();
  await expect(page.locator("#cap-events")).toBeInViewport({ timeout: 8000 });
});

test("platform: every capability shows the screenshot placeholder, device availability and the Ask-Nova note", async ({ page }) => {
  await page.goto("/platform", { waitUntil: "networkidle" });
  await expect(page.getByText("1600 × 1000 px recommended")).toHaveCount(11);
  await expect(page.getByText("Available on")).toHaveCount(11);
  await expect(page.getByText("Ask-Nova AI", { exact: true })).toHaveCount(11);
  await expect(page.getByRole("link", { name: "Get a demo" }).last()).toHaveAttribute("href", "/services#demo");
});

test("platform: no sideways scroll at phone and tablet width", async ({ page }) => {
  for (const w of [390, 768]) {
    await page.setViewportSize({ width: w, height: 844 });
    await page.goto("/platform", { waitUntil: "networkidle" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${w}px`).toBe(0);
  }
});

test("platform: 'Contract teams' role filter shows Account Management", async ({ page }) => {
  await page.goto("/platform", { waitUntil: "networkidle" });
  await page.getByLabel("Filter by who uses it").selectOption("Contract teams");
  await expect(page.locator("#cap-accounts")).toBeVisible();
  await expect(page.getByRole("option", { name: "Tender and contract teams" })).toHaveCount(0);
});
