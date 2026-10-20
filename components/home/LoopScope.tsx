"use client";
import { useRef, type ReactNode } from "react";
import { LoopToggle } from "./LoopToggle";
import { useLoops, type Loop } from "./useLoops";

/** Runs a set of script-driven loops on everything inside it and adds the pause control. Use around server-rendered visuals. */
export function LoopScope({ loops, pause, play, className, children }: { loops: Loop[]; pause: string; play: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const loop = useLoops(ref, loops);
  return (
    <div ref={ref} className={`group relative ${className ?? ""}`}>
      {children}
      <LoopToggle paused={loop.paused} onToggle={loop.toggle} pause={pause} play={play} />
    </div>
  );
}
