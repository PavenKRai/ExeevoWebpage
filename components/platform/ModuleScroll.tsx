"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { capabilities, moduleToCapability } from "@/content/platform";

/** Keeps `/platform?module=<slug>` deep links working (old module slugs map to the capability that now covers them) and scrolls to `#cap-<id>` on load. No visual output. */
export function ModuleScroll() {
  const slug = useSearchParams().get("module");
  useEffect(() => {
    const id = slug ? (moduleToCapability[slug] ?? (capabilities.some((c) => c.id === slug) ? slug : null)) : null;
    const target = id ? `cap-${id}` : window.location.hash.startsWith("#cap-") ? window.location.hash.slice(1) : null;
    if (!target) return;
    const t = window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    return () => window.clearTimeout(t);
  }, [slug]);
  return null;
}
