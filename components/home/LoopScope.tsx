"use client";
import { useRef, type ReactNode } from "react";
import { useLoops, type Loop } from "./useLoops";

/** Runs a set of script-driven loops on everything inside it. Use around server-rendered visuals. */
export function LoopScope({
  loops,
  className,
  children,
}: {
  loops: Loop[];
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLoops(ref, loops);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
