"use client";
import { useEffect } from "react";
import { isHydrated } from "@/lib/hydrated";

/** Everything that reveals once: <Layer from> output (.rv) plus the legacy scroll-reveal classes. */
const TARGETS = ".rv, .sr, .srl, .srr, .srg, .srt, .srs, .srf, .stagger > *, .ln, .ln-y, .hs-board, .hs-tile";
const BATCH_STEP = 70; // ms between items that scroll into view together and have no explicit delay
const DELAY_CLASS: Record<string, number> = { d1: 80, d2: 150, d3: 220 };

/**
 * One shared IntersectionObserver. Below-the-fold targets are hidden (`.rv-hide`, JS only, so SSR/no-JS/crawlers always
 * see everything) and the first time one scrolls into view it transitions to its natural layout (`.rv-in`) and is
 * unobserved: it plays once, stays, and never reverses. Nothing depends on where scrolling stops.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        entering.forEach((e, i) => {
          const el = e.target as HTMLElement;
          io.unobserve(el);
          const explicit = el.dataset.rvDelay !== undefined;
          const base = explicit ? Number(el.dataset.rvDelay) : 0;
          const delay = base + (explicit ? 0 : Math.min(i, 6) * BATCH_STEP);
          if (delay) el.style.setProperty("--rv-delay", `${delay}ms`);
          el.classList.add("rv-in");
          el.classList.remove("rv-hide");
          window.setTimeout(() => {
            el.classList.remove("rv-in");
            el.style.removeProperty("--rv-delay");
          }, delay + 1300);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    let retry = 0;
    const scan = () => {
      const vh = window.innerHeight;
      let waiting = false;
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (seen.has(el)) return;
        // Don't decorate server HTML that React hasn't hydrated yet (it would cause hydration mismatch warnings).
        if (!isHydrated(el)) {
          waiting = true;
          return;
        }
        seen.add(el);
        if (el.getBoundingClientRect().top < vh * 0.98) return; // already on screen (or above): leave it alone
        // explicit stagger: <Layer> sets --rv-delay inline; d1-d3 classes; children of .stagger by index
        const inline = el.style.getPropertyValue("--rv-delay");
        let delay: number | undefined = inline ? parseFloat(inline) * (inline.endsWith("ms") ? 1 : 1000) : undefined;
        if (delay === undefined && el.classList.contains("hs-tile")) {
          // board tiles land in category order: each tile's old timeline slot (--a, 0..1) becomes its delay
          delay = Math.round(parseFloat(el.style.getPropertyValue("--a") || "0") * 900);
        }
        if (delay === undefined) {
          const cls = [...el.classList].find((c) => c in DELAY_CLASS);
          if (cls) delay = DELAY_CLASS[cls];
          else if (el.parentElement?.classList.contains("stagger")) delay = Array.prototype.indexOf.call(el.parentElement.children, el) * 90;
        }
        if (delay !== undefined) {
          el.dataset.rvDelay = String(delay);
          el.style.removeProperty("--rv-delay");
        }
        el.classList.add("rv-hide");
        io.observe(el);
      });
      window.clearTimeout(retry);
      if (waiting) retry = window.setTimeout(scan, 250);
    };

    // IntersectionObserver only reports threshold crossings, so content the user jumps past (End key, anchor link, a fast
    // fling) never "enters" and would stay hidden, leaving blank areas when they scroll back up. Once scrolling pauses,
    // anything that is already above the viewport is simply shown (no animation: it is not on screen).
    let sweepTimer = 0;
    const sweep = () => {
      document.querySelectorAll<HTMLElement>(".rv-hide").forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) {
          io.unobserve(el);
          el.classList.remove("rv-hide");
        }
      });
    };
    const onScroll = () => {
      window.clearTimeout(sweepTimer);
      sweepTimer = window.setTimeout(sweep, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    scan();
    // Sections that mount after load (Suspense, client islands, route changes) get the same treatment.
    let timer = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(sweepTimer);
      window.clearTimeout(timer);
      window.clearTimeout(retry);
      mo.disconnect();
      io.disconnect();
      document.querySelectorAll(".rv-hide").forEach((el) => el.classList.remove("rv-hide"));
    };
  }, []);

  return null;
}
