import { expect, test } from "@playwright/test";
import { about } from "../content/about";
import { partners } from "../content/partners";

test("about: one h1, story, offices and values are in the HTML", async ({ request, page }) => {
  const html = await (await request.get("/about")).text();
  for (const t of [about.story.items[0].body.slice(0, 40), about.offices.list[1].addr[0], about.values.items[2].title, about.why.items[3].title]) expect(html).toContain(t.replace(/'/g, "&#x27;"));
  await page.goto("/about", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(about.h1);
});

test("about: choosing an office shows its address", async ({ page }) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  const blr = page.getByRole("button", { name: /Bangalore, India/ });
  await expect(blr).toHaveAttribute("aria-pressed", "false");
  await blr.click();
  await expect(blr).toHaveAttribute("aria-pressed", "true");
  await expect(blr).toContainText("Karnataka 560048, India");
  await expect(page.getByRole("button", { name: /Clearwater/ })).toHaveAttribute("aria-pressed", "false");
});

test("partners: every partner is listed and the filter narrows the directory", async ({ request, page }) => {
  const html = await (await request.get("/partners")).text();
  for (const p of partners) expect(html, p.name).toContain(p.name.replace(/&/g, "&amp;"));
  await page.goto("/partners", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await page.getByRole("button", { name: /^Data/ }).click();
  await expect(page.getByRole("button", { name: /^Data/ })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "Data Vendors & Connectors" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "System Integrators" })).toBeHidden();
  await page.getByRole("button", { name: /^All partners/ }).click();
  await expect(page.getByRole("heading", { name: "System Integrators" })).toBeVisible();
});

test("partners: the plus button expands a partner in place; all text stays in the HTML", async ({ request, page }) => {
  const html = await (await request.get("/partners")).text();
  expect(html).toContain("Together, Exeevo and NNIT");
  await page.goto("/partners", { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: /Read more about NNIT/ });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByText("Together, Exeevo and NNIT")).toBeHidden();
  await toggle.click();
  await expect(page.getByRole("button", { name: /Show less about NNIT/ })).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Together, Exeevo and NNIT")).toBeVisible();
});

test("partners: Medical Affairs Solutions sits between System Integrators and Data Vendors, with Anju", async ({ page, request }) => {
  const html = await (await request.get("/partners")).text();
  expect(html).toContain("Anju Software");
  expect(html).toContain("IRMS MAX");
  await page.goto("/partners#sol", { waitUntil: "networkidle" });
  const ys: number[] = [];
  for (const name of ["System Integrators", "Medical Affairs Solutions", "Data Vendors & Connectors"]) {
    const h = page.getByRole("heading", { level: 2, name });
    await expect(h).toHaveCount(1);
    ys.push((await h.boundingBox())!.y + (await page.evaluate(() => scrollY)));
  }
  expect(ys[0]).toBeLessThan(ys[1]);
  expect(ys[1]).toBeLessThan(ys[2]);
  await expect(page.locator("#sol").getByRole("img", { name: "Anju Software logo" })).toBeVisible();
  await expect(page.getByRole("group", { name: "Filter partners by type" }).getByRole("button", { name: /^Solutions/ })).toBeVisible();
});
