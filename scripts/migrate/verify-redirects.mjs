// Requests every old URL against a running site and checks it ends on a 200 within 2 hops. Run: node scripts/migrate/verify-redirects.mjs [http://localhost:3000]
import { readFile } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3000";
const urls = (await readFile(new URL("./old-urls.txt", import.meta.url), "utf8")).trim().split("\n");
const bad = [];
let hops2 = 0;
async function check(u) {
  const { pathname, search } = new URL(u);
  let url = base + pathname + search, hops = 0;
  for (; hops < 6; hops++) {
    const r = await fetch(url, { redirect: "manual" });
    if (r.status >= 300 && r.status < 400) {
      if (r.status !== 308 && r.status !== 301) bad.push(`${u} non-permanent ${r.status}`);
      url = new URL(r.headers.get("location"), url).href;
      continue;
    }
    if (r.status !== 200) bad.push(`${u} -> ${url} ${r.status}`);
    if (hops > 2) bad.push(`${u} took ${hops} hops`);
    if (hops === 2) hops2++;
    return;
  }
  bad.push(`${u} redirect loop`);
}
const queue = [...urls];
await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await check(queue.shift()); }));
console.log(`${urls.length} old URLs checked, ${hops2} need two hops (trailing-slash strip, then redirect), ${bad.length} problems`);
for (const b of bad) console.log(b);
process.exit(bad.length ? 1 : 0);
