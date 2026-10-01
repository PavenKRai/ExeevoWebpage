"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent } from "motion/react";
import { useSceneProgress } from "@/components/scene/useSceneProgress";

/** Scroll never changes the selected module: people should be able to scroll past freely. */
const SCROLL_STEPS = false;

const clamp = (n: number, max: number) => Math.min(max, Math.max(0, n));

/**
 * Selected module <-> scroll position. While the explorer scene is pinned, scroll progress picks the
 * module (8 equal steps) and selecting a module smooth-scrolls to its step. Outside a pinned scene it is
 * plain state. `slugs` are the URL slugs; `initial` the deep-linked index.
 */
export function useModuleScene(slugs: string[], initial: number, fromUrl: string | null) {
  const n = slugs.length;
  const { ref, progress, scrollToProgress, isPinned } = useSceneProgress();
  const [index, setIndex] = useState(initial);
  const latest = useRef(initial);
  const locked = useRef(false);
  const quiet = useRef<number | undefined>(undefined);
  const urlTimer = useRef<number | undefined>(undefined);
  const written = useRef<string | null>(fromUrl);

  const apply = useCallback((i: number) => {
    latest.current = i;
    setIndex((prev) => (prev === i ? prev : i));
  }, []);

  /** Ignore scroll-driven updates until the programmatic scroll has settled. */
  const lockUntilSettled = useCallback(() => {
    locked.current = true;
    const release = () => {
      window.clearTimeout(quiet.current);
      window.removeEventListener("scroll", bump);
      window.removeEventListener("scrollend", release);
      locked.current = false;
      if (isPinned()) apply(clamp(Math.floor(progress.get() * n), n - 1));
    };
    const bump = () => {
      window.clearTimeout(quiet.current);
      quiet.current = window.setTimeout(release, 220);
    };
    window.addEventListener("scroll", bump, { passive: true });
    window.addEventListener("scrollend", release, { once: true });
    // the smooth scroll may take a moment to start: wait longer for the first scroll event
    window.clearTimeout(quiet.current);
    quiet.current = window.setTimeout(release, 450);
  }, [apply, isPinned, n, progress]);

  const writeUrl = useCallback(
    (i: number) => {
      window.clearTimeout(urlTimer.current);
      urlTimer.current = window.setTimeout(() => {
        written.current = slugs[i];
        const url = new URL(window.location.href);
        url.searchParams.set("module", slugs[i]);
        window.history.replaceState(window.history.state, "", url);
      }, 150);
    },
    [slugs],
  );

  const select = useCallback(
    (i: number) => {
      const next = clamp(i, n - 1);
      apply(next);
      if (SCROLL_STEPS && isPinned()) {
        lockUntilSettled();
        scrollToProgress((next + 0.5) / n);
      }
      writeUrl(next);
    },
    [apply, isPinned, lockUntilSettled, n, scrollToProgress, writeUrl],
  );

  useMotionValueEvent(progress, "change", (p) => {
    if (!SCROLL_STEPS || locked.current || !isPinned()) return;
    const i = clamp(Math.floor(p * n), n - 1);
    if (i === latest.current) return;
    apply(i);
    writeUrl(i);
  });

  const jump = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!SCROLL_STEPS || !el || !isPinned()) return;
      lockUntilSettled();
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * ((i + 0.5) / n), behavior: "instant" });
    },
    [isPinned, lockUntilSettled, n, ref],
  );

  // Deep link on load and external navigation (e.g. the mega menu) to ?module=
  useEffect(() => {
    if (fromUrl === null || fromUrl === written.current) return;
    written.current = fromUrl;
    const i = Math.max(0, slugs.indexOf(fromUrl));
    apply(i);
    jump(i);
  }, [fromUrl, slugs, apply, jump]);

  useEffect(() => {
    if (fromUrl !== null) jump(initial);
    else if (SCROLL_STEPS) requestAnimationFrame(() => isPinned() && apply(clamp(Math.floor(progress.get() * n), n - 1)));
    return () => {
      window.clearTimeout(urlTimer.current);
      window.clearTimeout(quiet.current);
    };
    // mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, index, select, progress };
}
