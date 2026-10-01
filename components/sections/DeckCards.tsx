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
      className="absolute inset-x-0 top-0 h-[calc(var(--dh)-80px)] touch-pan-y [perspective:1600px]"
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
                "absolute inset-x-3 top-10 h-[calc(var(--dh)-160px)] rounded-[32px] border border-white/90 p-6 shadow-[inset_0_1px_0_#fff,0_28px_56px_-28px_rgba(24,32,38,0.32)] sm:inset-x-10 sm:p-9 pinned:xl:[@media(max-height:820px)]:p-6 pinned:xl:[@media(max-height:820px)]:sm:p-6",
              )}
              style={{
                zIndex: 20 - a,
                pointerEvents: hidden ? "none" : "auto",
                backdropFilter: "blur(26px) saturate(180%)",
                WebkitBackdropFilter: "blur(26px) saturate(180%)",
                background: "linear-gradient(145deg, rgba(255,255,255,.78), rgba(255,255,255,.42))",
              }}
              initial={false}
              animate={{
                x: k * 38,
                y: -a * 16,
                z: -a * 150,
                rotateY: k * -10,
                opacity: hidden ? 0 : 1 - a * 0.2,
                filter: `blur(${a * 1.2}px)`,
              }}
              transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                aria-hidden={front ? undefined : true}
                className="flex h-full flex-col justify-between"
                animate={{ opacity: front ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : front ? 0.6 : 0.25, delay: reduce || !front ? 0 : 0.2 }}
              >
                <div className="flex items-center justify-between gap-4 text-[14px] text-muted">
                  <span className="flex items-center gap-2.5 font-medium">
                    <CategoryDot category={m.category} />
                    {m.categoryLabel}
                  </span>
                  <span aria-label={`Module ${i + 1} of ${n}`}>
                    {pad(i + 1)} / {pad(n)}
                  </span>
                </div>
                <div className="flex flex-col gap-4 pinned:xl:[@media(max-height:820px)]:gap-2.5">
                  <h2 className="text-[clamp(30px,3vw,38px)] pinned:xl:[@media(max-height:820px)]:text-[30px] font-semibold leading-[1.05] tracking-[-0.03em] text-heading">{m.name}</h2>
                  <p className="text-[21px] pinned:xl:[@media(max-height:820px)]:text-[18px] font-medium leading-[1.25] tracking-[-0.01em] text-slate">{m.headline}</p>
                  <p className="text-[15px] leading-[1.55] text-muted pinned:xl:[@media(max-height:820px)]:text-[14px] pinned:xl:[@media(max-height:820px)]:leading-[1.45]">{m.summary}</p>
                </div>
              </motion.div>
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
