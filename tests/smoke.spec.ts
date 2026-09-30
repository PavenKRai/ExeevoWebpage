import { expect, test } from "@playwright/test";

const routes = ["/", "/platform", "/why-exeevo", "/industries", "/solutions-by-role", "/getting-started"];

for (const route of routes) {
  test(`route ${route} returns 200 and renders one h1`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
  });
}

test("nav and footer internal links resolve", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.$$eval("header a[href], footer a[href]", (as) =>
    Array.from(new Set(as.map((a) => a.getAttribute("href")!).filter((h) => h.startsWith("/")))),
  );
  expect(hrefs.length).toBeGreaterThan(5);
  for (const h of hrefs) {
    const res = await request.get(h);
    expect(res.status(), h).toBe(200);
  }
});

test("mega menu keyboard behaviour", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Platform modules" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Platform modules" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Platform modules" })).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("module deck: click, arrow keys and deep link", async ({ page }) => {
  await page.goto("/platform?module=event-management");
  await expect(page.getByRole("tab", { name: /Event Management/ })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tab", { name: /Medical CRM/ }).click();
  await expect(page.getByRole("tab", { name: /Medical CRM/ })).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab", { name: /Marketing Automation/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Orchestrate omnichannel HCP journeys");
});

test("role panels expand and collapse", async ({ page }) => {
  await page.goto("/solutions-by-role");
  const field = page.locator("#role-button-field-rep");
  const msl = page.locator("#role-button-msl");
  await expect(field).toHaveAttribute("aria-expanded", "true");
  await msl.click();
  await expect(msl).toHaveAttribute("aria-expanded", "true");
  await expect(field).toHaveAttribute("aria-expanded", "false");
});

test("industry toggle and deep link", async ({ page }) => {
  await page.goto("/industries?industry=medtech");
  await expect(page.locator("h1")).toHaveText("Commercial complexity beyond the pill");
  await page.getByRole("button", { name: "Pharma" }).click();
  await expect(page.locator("h1")).toHaveText("Built for pharma's complexity");
  await expect(page).toHaveURL(/industry=pharma/);
});

test("demo form validation and success", async ({ page }) => {
  await page.route("**/api/demo", (route) => route.fulfill({ status: 200, json: { ok: true } }));
  await page.goto("/getting-started");
  const form = page.getByRole("form", { name: "Request a demo" });
  await form.getByRole("button", { name: "Request a demo" }).click();
  await expect(page.locator("#demo-name-error")).toBeVisible();
  await expect(page.locator("#demo-email-error")).toBeVisible();
  await form.locator("#demo-name").fill("Test Person");
  await form.locator("#demo-email").fill("test@example.com");
  await form.locator("#demo-company").fill("Example Co");
  await form.locator("#demo-country").fill("United States");
  await form.locator("#demo-teams").selectOption({ index: 1 });
  await form.locator("#demo-consent").check();
  await form.getByRole("button", { name: "Request a demo" }).click();
  await expect(page.getByRole("status")).toContainText("Request received.");
});
