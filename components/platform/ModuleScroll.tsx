"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { modules } from "@/content/modules";

/** Keeps `/platform?module=<slug>` deep links working: scrolls to that module's section (no visual output). */
export function ModuleScroll() {
  const slug = useSearchParams().get("module");
  useEffect(() => {
    if (!slug || !modules.some((m) => m.slug === slug)) return;
    const t = window.setTimeout(() => document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
    return () => window.clearTimeout(t);
  }, [slug]);
  return null;
}
