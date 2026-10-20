"use client";
import { Pause, Play } from "lucide-react";

/** Pause / resume control for a script-driven animation (WCAG 2.2.2). Appears on hover or keyboard focus, centred just below its visual. */
export function LoopToggle({
  paused,
  onToggle,
  pause,
  play,
}: {
  paused: boolean;
  onToggle: () => void;
  pause: string;
  play: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-label={paused ? play : pause}
      onClick={onToggle}
      className="absolute left-1/2 top-full z-10 flex size-11 -translate-x-1/2 translate-y-1 items-center justify-center rounded-full bg-white/90 text-heading opacity-0 shadow-[0_0_0_1px_var(--ex-hairline)] transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
    >
      {paused ? (
        <Play size={16} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <Pause size={16} strokeWidth={1.8} aria-hidden="true" />
      )}
    </button>
  );
}
