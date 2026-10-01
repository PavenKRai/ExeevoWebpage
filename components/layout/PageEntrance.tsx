"use client";
import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

const SELECTOR = ".sr, .srg, .srl, .srr, .srs, .srf, .stagger > *";
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Scroll-driven reveals start "already finished" for anything on screen when a page opens,
 * so nothing would animate. This plays a one-off, staggered entrance for those components
 * on every page load / route change. It is a Web Animation with no end fill, so the CSS
 * scroll timeline takes over again as soon as it finishes.
 */
export function PageEntrance() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const seen = new WeakSet<Element>();
    let order = 0;

    const play = (root: ParentNode) => {
      const vh = window.innerHeight;
      const items = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR))
        .filter((el) => !seen.has(el) && !el.closest(".rise, .tilt-in"))
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.bottom > 0 && r.top < vh * 0.98)
        .sort((a, b) => a.r.top - b.r.top || a.r.left - b.r.left);

      for (const { el } of items) {
        seen.add(el);
        const x = el.classList.contains("srl") ? -60 : el.classList.contains("srr") ? 60 : 0;
        const y = x === 0 ? 56 : 0;
        el.animate(
          [
            { opacity: 0, translate: `${x}px ${y}px`, scale: el.classList.contains("srs") ? 0.85 : 0.97 },
            { opacity: 1, translate: "0px 0px", scale: 1 },
          ],
          { duration: 1000, delay: 120 + Math.min(order++, 14) * 80, easing: EASE, fill: "backwards" },
        );
      }
    };

    const first = window.setTimeout(() => play(document.body), 50);
    // Content that mounts a moment later (Suspense, client-only sections) gets the same entrance.
    const mo = new MutationObserver(() => play(document.body));
    mo.observe(document.body, { childList: true, subtree: true });
    const stop = window.setTimeout(() => mo.disconnect(), 1200);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(stop);
      mo.disconnect();
    };
  }, [reduce]);

  return null;
}
