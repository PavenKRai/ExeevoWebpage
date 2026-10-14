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

test("partners: Read more opens the full profile; previous/next and Escape work", async ({ page }) => {
  await page.goto("/partners", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Read more.*NNIT/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "NNIT" })).toBeVisible();
  await expect(dialog).toContainText("Together, Exeevo and NNIT");
  await dialog.getByRole("button", { name: "Next partner" }).click();
  await expect(dialog.getByRole("heading", { name: "msg industry advisors" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});
