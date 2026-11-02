"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { consent } from "@/content/consent";
import { analyticsEnabled, CONSENT_OPEN_EVENT, forgetConsent, getConsent, setConsent } from "@/lib/analytics";

/** Cookie banner at the bottom of the page: the site stays visible and usable; analytics stays off until the visitor accepts. */
export function ConsentGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only storage once on mount
    setOpen(getConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!analyticsEnabled || !open) return null;

  const choose = (value: "granted" | "denied") => {
    setOpen(false);
    setConsent(value);
  };

  return (
    <div
      role="region"
      aria-label={consent.label}
      data-consent-banner
      className="glass fixed inset-x-3 bottom-3 z-[45] flex flex-col gap-4 rounded-[28px] bg-white/90 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:left-1/2 sm:w-[min(920px,calc(100vw-48px))] sm:-translate-x-1/2 sm:flex-row sm:items-center sm:gap-6 sm:p-5"
    >
      <p className="body-text !text-[14px] sm:flex-1">
        {consent.body}{" "}
        <Link href="/cookies" className="text-brand-blue underline underline-offset-[3px]">{consent.policy}</Link>
      </p>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <button type="button" onClick={() => choose("denied")} className="btn btn-glass min-h-11">{consent.reject}</button>
        <button type="button" onClick={() => choose("granted")} className="btn btn-ink min-h-11">{consent.accept}</button>
      </div>
    </div>
  );
}

/** Used by the footer "Cookie settings" button: forget the choice and show the banner again. */
export function reopenConsent() {
  forgetConsent();
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
