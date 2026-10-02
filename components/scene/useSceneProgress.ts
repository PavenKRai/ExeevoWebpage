"use client";
import { useMotionValue, type MotionValue } from "motion/react";
import { useMemo, useRef, type RefObject } from "react";

const never = () => false;
const noop = () => {};

/**
 * Scenes no longer pin or follow scroll, so there is no scroll progress to track. This keeps the old API (so callers
 * such as the module and role selectors still compile) but attaches no scroll listeners and does no work per frame.
 * The returned object and its functions are referentially stable: callers list them in effect dependencies.
 */
export function useSceneProgress(): {
  ref: RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
  scrollToProgress: (p: number) => void;
  isPinned: () => boolean;
} {
  const ref = useRef<HTMLElement | null>(null);
  const progress = useMotionValue(0);
  return useMemo(() => ({ ref, progress, scrollToProgress: noop, isPinned: never }), [progress]);
}
