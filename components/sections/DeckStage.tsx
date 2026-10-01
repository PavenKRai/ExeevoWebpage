"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Module } from "@/content/modules";
import { IconButton } from "@/components/ui/IconButton";
import { Parallax } from "@/components/scene/Layer";
import { cn } from "@/components/ui/cn";
import { DeckCards } from "./DeckCards";
import { useIsDesktop } from "./ModuleRail";

/** The 3D card deck with its spinning glow, arrows and step pips. Height follows --dh. */
export function DeckStage({ modules, index, onSelect }: { modules: Module[]; index: number; onSelect: (i: number) => void }) {
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  return (
    <div className="relative mx-auto h-[var(--dh)] w-full max-w-[640px] xl:max-w-none">
      <Parallax depth={70} aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-[calc(var(--dh)*0.1875)] -ml-[180px] size-[360px] rounded-full opacity-75 blur-[46px]"
          style={{
            background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,.6), rgba(255,255,255,0) 24%), var(--ex-orb)",
          }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        />
      </Parallax>
      <DeckCards modules={modules} index={index} onSelect={onSelect} swipe={!desktop} />
      <div className="absolute inset-x-3 top-[calc(var(--dh)-80px)] flex items-center justify-between sm:inset-x-10">
        <IconButton label="Previous module" disabled={index === 0} onClick={() => onSelect(index - 1)}>
          <ChevronLeft size={20} strokeWidth={2} />
        </IconButton>
        <div className="flex items-center">
          {modules.map((m, i) => (
            <button
              key={m.slug}
              type="button"
              aria-label={`Go to ${m.name}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => onSelect(i)}
              className="flex h-11 min-w-7 items-center justify-center px-[3px]"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block h-1.5 rounded-[3px] transition-[width,background-color] duration-500",
                  i === index ? "w-[26px] bg-ink" : "w-1.5 bg-slate/25",
                )}
              />
            </button>
          ))}
        </div>
        <IconButton label="Next module" disabled={index === modules.length - 1} onClick={() => onSelect(index + 1)}>
          <ChevronRight size={20} strokeWidth={2} />
        </IconButton>
      </div>
    </div>
  );
}
