import { isStaging } from "@/lib/siteUrl";

/** Google Analytics 4 measurement ID. Analytics and the consent gate exist only when it is set and the site is not a staging host. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const analyticsEnabled = !!GA_ID && !isStaging;

export type Consent = "granted" | "denied";
export const CONSENT_KEY = "exeevo-consent";
export const CONSENT_EVENT = "exeevo:consent";
export const CONSENT_OPEN_EVENT = "exeevo:consent-open";
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage blocked: the choice lasts for this page view only */
  }
  if (value === "denied") stopAnalytics();
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function forgetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  stopAnalytics();
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

/** Switches Google Analytics off for this page and removes its cookies (_ga, _ga_<ID>). */
function stopAnalytics() {
  if (GA_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = location.hostname;
  const parts = host.split(".");
  const domains = new Set([host, `.${host}`, parts.length > 2 ? `.${parts.slice(-2).join(".")}` : `.${host}`]);
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

/** Sends a Google Analytics event. Does nothing unless the visitor accepted analytics. Never pass personal data. */
export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  if (!analyticsEnabled || getConsent() !== "granted") return;
  window.gtag?.("event", event, params);
}
