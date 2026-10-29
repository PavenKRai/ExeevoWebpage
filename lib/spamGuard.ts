import { NextResponse } from "next/server";

/** Light, dependency-free bot protection shared by the form routes. Flagged bots get a silent success so they learn nothing. */
const MIN_FILL_MS = 3_000;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>(); // per server instance only: best-effort on serverless

const hostOf = (v: string | null) => {
  try {
    return v ? new URL(v).host : null;
  } catch {
    return null;
  }
};

/** The request must come from a page on this site (the request's own host or `NEXT_PUBLIC_SITE_URL`). */
function sameSite(request: Request) {
  const from = hostOf(request.headers.get("origin")) ?? hostOf(request.headers.get("referer"));
  if (!from) return false;
  const own = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  return from === own || from === hostOf(process.env.NEXT_PUBLIC_SITE_URL ?? null);
}

function limited(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > WINDOW_MS) hits.delete(k);
  return recent.length > LIMIT;
}

/** True when the body looks automated: filled honeypot, impossible fill time, or link spam in the free text. */
export function looksLikeBot(body: unknown) {
  if (typeof body !== "object" || body === null) return true;
  const b = body as Record<string, unknown>;
  if (typeof b.website === "string" && b.website.trim() !== "") return true;
  const age = Date.now() - Number(b.startedAt);
  if (!Number.isFinite(age) || age < MIN_FILL_MS || age > MAX_AGE_MS) return true;
  const links = typeof b.message === "string" ? (b.message.match(/https?:\/\/|www\./gi) ?? []).length : 0;
  return links > 2;
}

/** Origin and rate checks. Returns a response to send straight back, or null to continue. */
export function rejectRequest(request: Request) {
  if (!sameSite(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  if (limited(request)) return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  return null;
}

/** Strips control characters (and line breaks from single-line fields) so values cannot inject mail headers. */
export function clean<T extends Record<string, unknown>>(data: T, multiline: readonly string[] = []): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    out[k] =
      typeof v === "string"
        ? v.replace(multiline.includes(k) ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ").trim()
        : v;
  }
  return out as T;
}
