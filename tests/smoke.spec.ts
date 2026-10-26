import { expect, test } from "@playwright/test";

const routes = ["/", "/platform", "/ask-nova", "/about", "/partners", "/microsoft", "/why-exeevo", "/services"];

for (const route of routes) {
  test(`route ${route} returns 200 and renders one h1`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
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

test("platform deep link scrolls to the capability section", async ({ page }) => {
  await page.goto("/platform?module=event-management");
  await page.waitForTimeout(1500);
  await expect(page.locator("#cap-events")).toBeInViewport();
  await page.goto("/platform");
  await expect(page.locator("section[id^='cap-']")).toHaveCount(11);
});

test("talk to our team form: validation and success", async ({ page }) => {
  await page.route("**/api/demo", (route) => route.fulfill({ status: 200, json: { ok: true } }));
  await page.goto("/services", { waitUntil: "networkidle" });
  const form = page.getByRole("form", { name: "Talk to our team" });
  await form.getByRole("button", { name: "Send request" }).click();
  await expect(page.locator("#demo-name-error")).toBeVisible();
  await expect(page.locator("#demo-email-error")).toBeVisible();
  await form.locator("#demo-name").fill("Test Person");
  await form.locator("#demo-email").fill("test@example.com");
  await form.locator("#demo-company").fill("Example Co");
  await form.locator("#demo-country").fill("United States");
  await form.locator("#demo-service").selectOption({ index: 1 });
  await form.locator("#demo-consent").check();
  await form.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toContainText("Request received.");
});
