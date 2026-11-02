"use client";
import { consent } from "@/content/consent";
import { analyticsEnabled } from "@/lib/analytics";
import { reopenConsent } from "./ConsentGate";

/** Footer button that lets visitors change their cookie choice later. Rendered only when analytics is on. */
export function CookieSettingsButton({ className }: { className: string }) {
  if (!analyticsEnabled) return null;
  return (
    <button type="button" onClick={reopenConsent} className={className}>
      {consent.settings}
    </button>
  );
}
