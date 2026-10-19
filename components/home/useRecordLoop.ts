"use client";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/**
 * The HCP record demo's 14s loop, copied from the design's CSS keyframes but run with the Web Animations API.
 * Animations created from script are not switched off by a global `animation: none` rule (reduced-motion handling,
 * stale or overridden CSS), so the hero demo plays everywhere. Each block is `offsets{property:value;...}` as in CSS.
 */
const DURATION = 14000;
const SOFT = "cubic-bezier(.16,1,.3,1)";
const CURSOR = "cubic-bezier(.45,.05,.25,1)";
const LOOPS: { selector: string; easing: string; frames: string }[] = [
  {
    selector: ".d-cur",
    easing: CURSOR,
    frames:
      "0%,3%{left:560px;top:470px;opacity:0}6%{opacity:1}12%{left:205px;top:52px}30%{left:205px;top:52px}36%{left:500px;top:224px}54%{left:500px;top:224px}60%{left:526px;top:54px}74%{left:526px;top:54px}80%{left:96px;top:464px}92%{left:96px;top:464px;opacity:1}97%,100%{left:560px;top:470px;opacity:0}",
  },
  {
    selector: ".d-t1",
    easing: SOFT,
    frames: "0%,13%{opacity:0;translate:0 6px}16%,29%{opacity:1;translate:0 0}32%,100%{opacity:0}",
  },
  {
    selector: ".d-t2",
    easing: SOFT,
    frames: "0%,37%{opacity:0;translate:0 6px}40%,53%{opacity:1;translate:0 0}56%,100%{opacity:0}",
  },
  {
    selector: ".d-t3",
    easing: SOFT,
    frames: "0%,61%{opacity:0;translate:0 6px}64%,73%{opacity:1;translate:0 0}76%,100%{opacity:0}",
  },
  {
    selector: ".d-t4",
    easing: SOFT,
    frames: "0%,81%{opacity:0;translate:0 6px}84%,92%{opacity:1;translate:0 0}95%,100%{opacity:0}",
  },
  {
    selector: ".d-h1",
    easing: "linear",
    frames:
      "0%,13%{box-shadow:none;background:transparent}15%,30%{box-shadow:0 0 0 1.5px #0762C8;background:#F4F8FD}33%,100%{box-shadow:none;background:transparent}",
  },
  {
    selector: ".d-h2",
    easing: "linear",
    frames:
      "0%,37%{box-shadow:0 0 0 1px #E8EDF0;background:#FFFFFF}39%,54%{box-shadow:0 0 0 1.5px #7A3FC0;background:#F7F3FC}57%,100%{box-shadow:0 0 0 1px #E8EDF0;background:#FFFFFF}",
  },
  {
    selector: ".d-h3",
    easing: "linear",
    frames:
      "0%,61%{box-shadow:0 0 0 1px #E1E6EA}63%,74%{box-shadow:0 0 0 1.5px #DF1995,0 10px 20px -12px rgba(223,25,149,.5)}77%,100%{box-shadow:0 0 0 1px #E1E6EA}",
  },
  {
    selector: ".d-h4",
    easing: "linear",
    frames:
      "0%,81%{box-shadow:0 0 0 1px #E1E6EA}83%,92%{box-shadow:0 0 0 1.5px #00A4EF}95%,100%{box-shadow:0 0 0 1px #E1E6EA}",
  },
];

const camel = (p: string) => p.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

function parse(frames: string, easing: string): Keyframe[] {
  const out: Keyframe[] = [];
  for (const m of frames.matchAll(/([\d.%,]+)\{([^}]*)\}/g)) {
    const props: Record<string, string> = {};
    m[2].split(";").forEach((d) => {
      const i = d.indexOf(":");
      if (i > 0) props[camel(d.slice(0, i).trim())] = d.slice(i + 1).trim();
    });
    m[1].split(",").forEach((o) => out.push({ ...props, offset: parseFloat(o) / 100, easing }));
  }
  return out.sort((a, b) => (a.offset as number) - (b.offset as number));
}

/** Starts the loop on the demo root; pauses it off-screen and on request. Returns the user-facing pause state. */
export function useRecordLoop(ref: RefObject<HTMLElement | null>) {
  const anims = useRef<Animation[]>([]);
  const userPaused = useRef(false);
  const visible = useRef(true);
  const [paused, setPaused] = useState(false);

  const sync = useCallback(() => {
    const run = visible.current && !userPaused.current;
    anims.current.forEach((a) => (run ? a.play() : a.pause()));
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof root.animate !== "function") return;
    anims.current = LOOPS.flatMap((l) =>
      Array.from(root.querySelectorAll<HTMLElement>(l.selector)).map((el) =>
        el.animate(parse(l.frames, l.easing), {
          duration: DURATION,
          iterations: Infinity,
          fill: "both",
        }),
      ),
    );
    root.dataset.loop = "js";
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
      sync();
    });
    io.observe(root);
    return () => {
      io.disconnect();
      anims.current.forEach((a) => a.cancel());
      anims.current = [];
      delete root.dataset.loop;
    };
  }, [ref, sync]);

  const toggle = useCallback(() => {
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
    sync();
  }, [sync]);

  return { paused, toggle };
}
