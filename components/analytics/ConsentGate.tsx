"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { consent } from "@/content/consent";
import { analyticsEnabled, BOT_PATTERN, CONSENT_OPEN_EVENT, forgetConsent, getConsent, POLICY_PATHS, setConsent } from "@/lib/analytics";
import { useFocusTrap } from "../layout/useFocusTrap";

const noop = () => {}; // Escape must not dismiss the gate

/** Full-screen consent gate: until the visitor accepts or rejects non-essential cookies, nothing behind it can be seen or used. */
export function ConsentGate() {
  const pathname = usePathname();
  const [pending, setPending] = useState(false); // no choice stored yet
  const [forced, setForced] = useState(false); // reopened from "Cookie settings"
  const ref = useRef<HTMLDivElement>(null);
  const open = (pending && !POLICY_PATHS.includes(pathname)) || forced;

  useEffect(() => {
    if (!analyticsEnabled) return;
    const isBot = new RegExp(BOT_PATTERN, "i").test(navigator.userAgent);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only storage once on mount
    setPending(getConsent() === null && !isBot);
    document.documentElement.removeAttribute("data-consent-pending"); // the gate (or the page) takes over from the pre-paint hide
    const reopen = () => setForced(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  useFocusTrap(ref, open, noop);

  useEffect(() => {
    if (!open) return;
    const others = Array.from(document.body.children).filter((el) => el !== ref.current && !(el instanceof HTMLScriptElement) && !el.tagName.includes("-")) as HTMLElement[];
    others.forEach((el) => (el.inert = true));
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      others.forEach((el) => (el.inert = false));
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (!analyticsEnabled || !open) return null;

  const choose = (value: "granted" | "denied") => {
    setPending(false);
    setForced(false);
    setConsent(value);
  };

  return (
    <div ref={ref} data-consent-gate role="dialog" aria-modal="true" aria-labelledby="consent-title" className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-porcelain p-5">
      <span aria-hidden="true" className="aura -left-24 top-10 size-[480px] bg-brand-blue opacity-[.14] max-md:hidden" />
      <span aria-hidden="true" className="aura -bottom-24 right-10 size-[420px] bg-brand-green opacity-[.12] max-md:hidden" />
      <div className="glass relative my-auto flex w-full max-w-[540px] flex-col gap-6 rounded-[28px] p-7 sm:p-10">
        <div className="flex items-center gap-2.5">
          <Image src="/brand/exeevo-icon.png" alt="" width={64} height={64} style={{ width: 28, height: 28 }} />
          <Image src="/brand/exeevo-wordmark-slate.png" alt="Exeevo" width={95} height={16} style={{ width: 95, height: 16 }} />
        </div>
        <h2 id="consent-title" className="h2 !text-[clamp(28px,4vw,38px)]">
          {consent.title.light} <b>{consent.title.bold}</b>
        </h2>
        <p className="body-text !text-[15.5px]">{consent.body}</p>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button type="button" onClick={() => choose("granted")} className="btn btn-ink min-h-12 flex-1">{consent.accept}</button>
          <button type="button" onClick={() => choose("denied")} className="btn btn-glass min-h-12 flex-1">{consent.reject}</button>
        </div>
        <Link href="/cookies" className="tlink self-start text-[14px]">{consent.policy}</Link>
      </div>
    </div>
  );
}

/** Used by the footer "Cookie settings" button: forget the choice and show the gate again. */
export function reopenConsent() {
  forgetConsent();
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
