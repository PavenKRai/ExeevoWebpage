"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Module } from "@/content/modules";
import { CategoryDot } from "@/components/ui/CategoryDot";
import { cn } from "@/components/ui/cn";

const pad = (n: number) => String(n).padStart(2, "0");

export function DeckCards({
  modules,
  index,
  onSelect,
  swipe,
}: {
  modules: Module[];
  index: number;
  onSelect: (i: number) => void;
  swipe: boolean;
}) {
  const reduce = useReducedMotion();
  const n = modules.length;

  return (
    <motion.div
      className="relative h-[440px] touch-pan-y [perspective:1400px] sm:h-[460px]"
      drag={swipe && !reduce ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.x < -60 && index < n - 1) onSelect(index + 1);
        else if (info.offset.x > 60 && index > 0) onSelect(index - 1);
      }}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {modules.map((m, i) => {
          const k = i - index;
          const a = Math.abs(k);
          const hidden = a > 3;
          const front = k === 0;
          return (
            <motion.div
              key={m.slug}
              className={cn(
                "absolute inset-y-4 left-0 w-[82%] rounded-panel p-7 sm:p-9",
                a <= 2 ? "glass-light" : "border border-white bg-white shadow-[0_28px_56px_-28px_rgba(24,32,38,0.32)]",
              )}
              style={{ zIndex: 10 - a, pointerEvents: hidden ? "none" : "auto" }}
              initial={false}
              animate={{
                x: k * 38,
                y: -a * 16,
                z: -a * 150,
                rotateY: k * -10,
                opacity: hidden ? 0 : 1 - a * 0.2,
                filter: `blur(${a * 1.2}px)`,
                visibility: hidden ? "hidden" : "visible",
              }}
              transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div aria-hidden={front ? undefined : true}>
              <div className="flex items-center justify-between gap-4 text-muted">
                <span className="flex items-center gap-2 font-semibold">
                  <CategoryDot category={m.category} />
                  {m.categoryLabel}
                </span>
                <span aria-label={`Module ${i + 1} of ${n}`}>
                  {pad(i + 1)} / {pad(n)}
                </span>
              </div>
              <h2 className="mt-8 text-[clamp(28px,3.4vw,38px)] leading-[1.1] tracking-[-0.02em] text-heading">{m.name}</h2>
              <p className="lead mt-4 text-heading">{m.headline}</p>
              <p className="mt-4 text-muted">{m.summary}</p>
              </div>
              {!front && !hidden && (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => onSelect(i)}
                  className="absolute inset-0 rounded-panel"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
