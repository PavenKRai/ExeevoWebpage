"use client";
import { useEffect, useRef } from "react";
import { tenantSvg } from "./tenantSvg";

/** The concentric "your data stays in your tenant" diagram. The data-flow loop is SMIL (CSS cannot stop it), so under reduced motion the animation elements are removed after hydration. */
export function TenantDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ref.current?.querySelectorAll("animate, animateTransform, animateMotion").forEach((n) => n.remove());
  }, []);
  return <div ref={ref} aria-hidden="true" dangerouslySetInnerHTML={{ __html: tenantSvg }} />;
}
