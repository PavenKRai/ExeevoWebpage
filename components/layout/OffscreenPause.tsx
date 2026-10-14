"use client";
import { useEffect } from "react";
import { isHydrated } from "@/lib/hydrated";

/**
 * Pauses every specimen/orb animation while it is off-screen. Elements inside a Suspense boundary that React has not
 * hydrated yet are skipped (and retried shortly after): setting an attribute on server HTML before hydration causes a
 * "server rendered HTML didn't match the client" warning.
 */
export function OffscreenPause() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    let retry = 0;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.target as HTMLElement).dataset.paused = String(!e.isIntersecting);
    });
    const observe = () => {
      let waiting = false;
      document.querySelectorAll<HTMLElement>("[data-specimen],[data-orb]").forEach((el) => {
        if (seen.has(el)) return;
        if (!isHydrated(el)) {
          waiting = true;
          return;
        }
        seen.add(el);
        io.observe(el);
      });
      window.clearTimeout(retry);
      if (waiting) retry = window.setTimeout(observe, 250);
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(retry);
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
