"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import type { Module } from "@/content/modules";
import { TextLink } from "@/components/ui/TextLink";
import { CategoryDot } from "@/components/ui/CategoryDot";
import { PANEL_ID, tabId } from "./ModuleRail";

function DetailBody({ m }: { m: Module }) {
  return (
    <>
          <div className="flex flex-col gap-2.5">
        <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
          <span>Platform</span>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{m.name}</span>
        </nav>
        <p className="text-[15px] leading-[1.5] text-slate">{m.lead}</p>
      </div>
      <ul className="flex flex-col gap-[14px]">
        {m.features.map((f) => (
          <li key={f.title} className="flex gap-3.5">
            <span aria-hidden="true" className="flex size-[26px] shrink-0 items-center justify-center rounded-[9px] bg-ink text-white">
              <Check size={14} strokeWidth={2.4} />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-[15px] font-semibold text-heading">{f.title}</span>
              {f.body && <span className="text-[13.5px] leading-[1.45] text-muted">{f.body}</span>}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2.5 border-t border-slate/15 pt-5">
        <h3 className="font-[family-name:var(--font-figtree)] text-[14px] font-semibold leading-normal tracking-normal text-heading">
          {m.fitTitle}
        </h3>
        {m.fit.map((f) => (
          <p key={f} className="relative pl-4 text-[13.5px] leading-[1.45] text-muted">
            <CategoryDot category={m.category} className="absolute left-0 top-[7px] size-1.5" />
            {f}
          </p>
        ))}
      </div>
      {m.link && <TextLink href={m.link.href}>{m.link.label}</TextLink>}
    </>
  );
}

export function ModuleDetail({ module: m, all }: { module: Module; all: readonly Module[] }) {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 0.45;
  return (
    <div
      id={PANEL_ID}
      role="tabpanel"
      aria-labelledby={tabId(m.slug)}
      tabIndex={0}
      className="glass-light grid min-h-[calc(var(--dh)-40px)] overflow-hidden rounded-[30px] p-6 sm:p-8 xl:h-full xl:min-h-0 xl:px-[30px] xl:py-[28px]"
    >
      {/* Invisible copies of every module's detail stack in the same grid cell, so the panel is always as tall
          as the tallest module and never jumps or clips when you switch. */}
      {all.map((o) => (
        <div key={o.slug} aria-hidden="true" inert className="invisible pointer-events-none flex flex-col gap-7 [grid-area:1/1]">
          <DetailBody m={o} />
        </div>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={m.slug}
          className="flex flex-col gap-7 [grid-area:1/1]"
          initial={{ opacity: 0, x: reduce ? 0 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reduce ? 0 : -24 }}
          transition={{ duration: d, ease: [0.16, 1, 0.3, 1] }}
        >
          <DetailBody m={m} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
