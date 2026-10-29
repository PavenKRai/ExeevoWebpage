import { expect, test } from "@playwright/test";
import { capabilityOptions } from "../content/demo";
import { capabilities } from "../content/platform";

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

test("talk to our team form (Home): validation, optional fields, request body and success", async ({ page }) => {
  let body: Record<string, unknown> = {};
  await page.route("**/api/demo", (route) => {
    body = route.request().postDataJSON();
    return route.fulfill({ status: 200, json: { ok: true } });
  });
  await page.goto("/", { waitUntil: "networkidle" });
  const form = page.getByRole("form", { name: "Talk to our team" });
  await form.getByRole("button", { name: "Send request" }).click();
  await expect(page.locator("#demo-name-error")).toBeVisible();
  await expect(page.locator("#demo-email-error")).toBeVisible();
  await expect(page.locator("#demo-job-error")).toHaveCount(0); // job title and message are optional
  await expect(page.locator("#demo-message-error")).toHaveCount(0);
  await form.locator("#demo-name").fill("Test Person");
  await form.locator("#demo-email").fill("test@example.com");
  await form.locator("#demo-job").fill("Head of Sales");
  await form.locator("#demo-company").fill("Example Co");
  await form.locator("#demo-country").fill("United States");
  await form.locator("#demo-service").selectOption({ index: 1 });
  await form.locator("#demo-message").fill("We would like a walkthrough.");
  await form.locator("#demo-consent").check();
  await form.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toContainText("Request received.");
  expect(body).toMatchObject({ jobTitle: "Head of Sales", message: "We would like a walkthrough.", website: "" });
  expect(Number(body.startedAt)).toBeGreaterThan(0);
});

test("the form lists 'not sure' plus every Platform capability; only Home has a form with #demo", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const options = await page.locator("#demo-service option").allTextContents();
  expect(options).toEqual([...capabilityOptions]);
  expect(options).toHaveLength(capabilities.length + 1);
  await expect(page.locator("#demo")).toHaveCount(1);
  await page.goto("/services", { waitUntil: "networkidle" });
  await expect(page.locator("#demo")).toHaveCount(0);
});
