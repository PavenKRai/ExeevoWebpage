import { expect, test } from "@playwright/test";

/** The route is called directly; the CRM endpoint is a local stub so forwarding can be counted. */
const ok = {
  fullName: "Test Person",
  email: "test@example.com",
  jobTitle: "",
  company: "Example Co",
  country: "United States",
  service: "Not sure yet: help me choose",
  message: "Hello",
  consent: true,
  website: "",
};
const ip = (n: number) => `10.${Math.floor(Math.random() * 250)}.${n}.${Math.floor(Math.random() * 250)}`;
const old = () => ({ startedAt: Date.now() - 10_000 });
const headers = (origin: string) => ({ "Content-Type": "application/json", Origin: origin });

test.describe.configure({ mode: "serial" });

test("spam guard: bots get a silent success, foreign origins are refused, a normal request is validated", async ({ request, baseURL }) => {
  const send = (data: object, ip: string, origin = baseURL!) =>
    request.post("/api/demo", { data, headers: { ...headers(origin), "x-forwarded-for": ip } });

  const honey = await send({ ...ok, ...old(), website: "http://spam.example" }, ip(1));
  expect(await honey.json()).toEqual({ ok: true });

  const fast = await send({ ...ok, startedAt: Date.now() }, ip(2));
  expect(await fast.json()).toEqual({ ok: true });

  const links = await send({ ...ok, ...old(), message: "http://a.example http://b.example http://c.example" }, ip(3));
  expect(await links.json()).toEqual({ ok: true });

  const foreign = await send({ ...ok, ...old() }, ip(4), "https://evil.example");
  expect(foreign.status()).toBe(403);

  const invalid = await send({ ...ok, ...old(), email: "nope" }, ip(5));
  expect(invalid.status()).toBe(400);
});

test("spam guard: the sixth request from one address in ten minutes is rate limited", async ({ request, baseURL }) => {
  const addr = ip(9); // the server remembers addresses between projects
  const codes: number[] = [];
  for (let i = 0; i < 6; i++) {
    const res = await request.post("/api/demo", { data: { ...ok, ...old(), email: "nope" }, headers: { ...headers(baseURL!), "x-forwarded-for": addr } });
    codes.push(res.status());
  }
  expect(codes.slice(0, 5)).toEqual([400, 400, 400, 400, 400]);
  expect(codes[5]).toBe(429);
});
