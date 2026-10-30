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
  await expect(page.locator("#demo-company-error")).toBeVisible(); // name, email and company are required; the rest is optional
  await expect(page.locator("#demo-country-error")).toHaveCount(0);
  await expect(page.locator("#demo-job-error")).toHaveCount(0);
  await expect(page.locator("#demo-message-error")).toHaveCount(0);
  await expect(page.locator("#demo-consent-error")).toHaveCount(0); // the marketing checkbox is optional
  await form.locator("#demo-name").fill("Test Person");
  await form.locator("#demo-email").fill("test@example.com");
  await form.locator("#demo-job").fill("Head of Sales");
  await form.locator("#demo-company").fill("Example Co");
  await form.locator("#demo-country").fill("United States");
  await form.locator("#demo-service").selectOption({ index: 1 });
  await form.locator("#demo-message").fill("We would like a walkthrough.");
  await form.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toContainText("Request sent");
  await expect(form).toBeVisible({ timeout: 8000 }); // the form comes back, empty, after the confirmation
  await expect(page.locator("#demo-name")).toHaveValue("");
  expect(body).toMatchObject({ consent: false, jobTitle: "Head of Sales", message: "We would like a walkthrough.", website: "" });
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

test("footer has a Contact us link to the Home form; the site map page lists it; sitemap.xml has the current pages only", async ({ page, request }) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Contact us" })).toHaveAttribute("href", "/#demo");
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const p of ["/platform", "/services", "/about", "/partners", "/microsoft", "/why-exeevo", "/ask-nova", "/resources", "/site-map"]) expect(xml, p).toContain(`${p}</loc>`);
  for (const gone of ["/industries", "/solutions-by-role", "/glossary", "/getting-started"]) expect(xml, gone).not.toContain(`${gone}</loc>`);
  await page.goto("/site-map", { waitUntil: "networkidle" });
  await expect(page.getByRole("main").getByRole("link", { name: "Contact us" })).toHaveAttribute("href", "/#demo");
});

test("demo form: when the request is blocked, rate limited, or the CRM flow is down or unreachable, the error offers sales@exeevo.com", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const form = page.getByRole("form", { name: "Talk to our team" });
  await form.locator("#demo-name").fill("Test Person");
  await form.locator("#demo-email").fill("test@example.com");
  await form.locator("#demo-company").fill("Example Co");
  const cases: [string, number | "abort", RegExp][] = [
    ["blocked", 403, /could not verify/],
    ["rate limited", 429, /Too many requests/],
    ["flow not configured", 503, /could not send your request/],
    ["flow rejected or down", 502, /could not send your request/],
    ["offline", "abort", /could not reach the server/],
  ];
  for (const [name, code, text] of cases) {
    await page.route("**/api/demo", (route) => (code === "abort" ? route.abort() : route.fulfill({ status: code, json: { error: "x" } })));
    await form.getByRole("button", { name: "Send request" }).click();
    const alert = form.getByRole("alert");
    await expect(alert, name).toContainText(text);
    await expect(alert.getByRole("link", { name: "sales@exeevo.com" }), name).toHaveAttribute("href", "mailto:sales@exeevo.com");
    await page.unroute("**/api/demo");
  }
  await expect(form.locator("#demo-name")).toHaveValue("Test Person"); // nothing the visitor typed is lost
});
