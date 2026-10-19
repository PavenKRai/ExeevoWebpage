"use client";
import { useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

const fade = "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)";

/** Scrolling strip with a pause control (WCAG 2.2.2). It keeps drifting slowly under reduced motion, as the product strip is meant to move; the button stops it. */
export function Marquee({ children, pause, play }: { children: ReactNode; pause: string; play: string }) {
  const [stopped, setStopped] = useState(false);
  return (
    <div className="mq-wrap relative" data-stopped={stopped}>
      <div style={{ WebkitMaskImage: fade, maskImage: fade }}>{children}</div>
      <button
        type="button"
        aria-pressed={stopped}
        aria-label={stopped ? play : pause}
        onClick={() => setStopped((v) => !v)}
        className="absolute right-3 top-1/2 z-[2] hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-heading opacity-0 shadow-[0_0_0_1px_var(--ex-hairline)] transition-opacity focus-visible:opacity-100 group-hover:opacity-100 [.mq-wrap:hover_&]:opacity-100 sm:flex"
      >
        {stopped ? <Play size={16} strokeWidth={1.8} aria-hidden="true" /> : <Pause size={16} strokeWidth={1.8} aria-hidden="true" />}
      </button>
    </div>
  );
}
