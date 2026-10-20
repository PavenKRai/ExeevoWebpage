"use client";
import { useEffect, useRef, type ReactNode } from "react";

const fade = "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)";

/** Scrolling strip. It is driven by the Web Animations API, which a global `animation: none` rule (reduced-motion handling) cannot stop; under reduced motion it drifts more slowly. */
export function Marquee({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = box.current?.querySelector<HTMLElement>(".mq");
    if (!list || typeof list.animate !== "function") return;
    const slow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anim = list.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], { duration: slow ? 90000 : 40000, iterations: Infinity, easing: "linear" });
    return () => anim.cancel();
  }, []);
  return (
    <div ref={box} className="mq-wrap relative">
      <div style={{ WebkitMaskImage: fade, maskImage: fade }}>{children}</div>
    </div>
  );
}
