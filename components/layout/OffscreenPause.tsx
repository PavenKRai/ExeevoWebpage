"use client";
import { useEffect } from "react";

/** Pauses every specimen/orb animation while it is off-screen. */
export function OffscreenPause() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.target as HTMLElement).dataset.paused = String(!e.isIntersecting);
    });
    const observe = () => document.querySelectorAll<HTMLElement>("[data-specimen],[data-orb]").forEach((el) => io.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}
