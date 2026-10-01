"use client";
import { useScroll, type MotionValue } from "motion/react";
import { useCallback, useRef, type RefObject } from "react";

/**
 * Progress 0→1 across a scene's PINNED interval (track top at viewport top → track bottom at viewport bottom).
 * Use it only where React state must follow scroll (e.g. which module/role is selected).
 * Everything purely visual should use <Layer> (CSS scroll timeline) instead.
 */
export function useSceneProgress(): {
  ref: RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
  /** Smoothly scroll so the scene sits at progress p (0..1). No-op when the scene is not pinned. */
  scrollToProgress: (p: number) => void;
  /** True when the track is taller than the viewport (i.e. pinning is active). */
  isPinned: () => boolean;
} {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const isPinned = useCallback(() => {
    const el = ref.current;
    return !!el && el.offsetHeight > window.innerHeight * 1.05 && getComputedStyle(el).viewTimelineName !== "none";
  }, []);

  const scrollToProgress = useCallback(
    (p: number) => {
      const el = ref.current;
      if (!el || !isPinned()) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const span = el.offsetHeight - window.innerHeight;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: top + span * Math.min(Math.max(p, 0), 1), behavior: reduce ? "auto" : "smooth" });
    },
    [isPinned],
  );

  return { ref, progress: scrollYProgress, scrollToProgress, isPinned };
}
