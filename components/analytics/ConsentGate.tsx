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
      className="glass fixed inset-x-0 bottom-0 z-[45] flex min-h-[min(450px,75vh)] flex-col justify-center rounded-t-[28px] bg-white/90 py-8 pb-[max(2rem,env(safe-area-inset-bottom))]"
    >
      <div className="frame flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
        <p className="body-text !max-w-none !text-[15px] lg:flex-1">
          {consent.body}{" "}
          <Link href="/cookies" className="text-brand-blue underline underline-offset-[3px]">{consent.policy}</Link>
        </p>
        <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
          <button type="button" onClick={() => choose("denied")} className="btn btn-glass min-h-12">{consent.reject}</button>
          <button type="button" onClick={() => choose("granted")} className="btn btn-ink min-h-12">{consent.accept}</button>
        </div>
      </div>
    </div>
  );
}

/** Used by the footer "Cookie settings" button: forget the choice and show the banner again. */
export function reopenConsent() {
  forgetConsent();
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
