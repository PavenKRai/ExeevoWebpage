"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import type { Module } from "@/content/modules";
import { TextLink } from "@/components/ui/TextLink";
import { CategoryDot } from "@/components/ui/CategoryDot";
import { PANEL_ID, tabId } from "./ModuleRail";

export function ModuleDetail({ module: m }: { module: Module }) {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 0.45;
  return (
    <div
      id={PANEL_ID}
      role="tabpanel"
      aria-labelledby={tabId(m.slug)}
      tabIndex={0}
      className="glass-light min-h-[calc(var(--dh)-40px)] overflow-hidden rounded-[30px] p-6 sm:p-8 xl:mt-5 pinned:xl:mt-0 pinned:xl:h-[calc(var(--dh)+12px)] pinned:xl:p-6 pinned:xl:[@media(max-height:820px)]:p-4"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={m.slug}
          className="flex flex-col gap-[26px] pinned:xl:gap-4 pinned:xl:[@media(max-height:820px)]:gap-2.5"
          initial={{ opacity: 0, x: reduce ? 0 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reduce ? 0 : -24 }}
          transition={{ duration: d, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-2.5 pinned:xl:[@media(max-height:820px)]:gap-1.5">
            <nav aria-label="Breadcrumb" className="text-[13px] text-muted pinned:xl:[@media(max-height:820px)]:sr-only">
              <span>Platform</span>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">{m.name}</span>
            </nav>
            <p className="text-base leading-[1.55] text-slate pinned:xl:text-[15px] pinned:xl:leading-[1.45] pinned:xl:[@media(max-height:820px)]:text-[14px] pinned:xl:[@media(max-height:820px)]:leading-[1.4]">{m.lead}</p>
          </div>
          <ul className="flex flex-col gap-[18px] pinned:xl:gap-3 pinned:xl:[@media(max-height:820px)]:gap-2">
            {m.features.map((f) => (
              <li key={f.title} className="flex gap-3.5">
                <span aria-hidden="true" className="flex size-[26px] shrink-0 items-center justify-center rounded-[9px] bg-ink text-white">
                  <Check size={14} strokeWidth={2.4} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] font-semibold text-heading">{f.title}</span>
                  {f.body && <span className="text-[14px] leading-[1.5] text-muted pinned:xl:leading-[1.4] pinned:xl:[@media(max-height:820px)]:text-[13px] pinned:xl:[@media(max-height:820px)]:leading-[1.35]">{f.body}</span>}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5 border-t border-slate/15 pt-5 pinned:xl:gap-1.5 pinned:xl:pt-3.5 pinned:xl:[@media(max-height:820px)]:pt-3">
            <h3 className="font-[family-name:var(--font-figtree)] text-[14px] font-semibold leading-normal tracking-normal text-heading">
              {m.fitTitle}
            </h3>
            {m.fit.map((f) => (
              <p key={f} className="relative pl-4 text-[14px] leading-[1.45] text-muted pinned:xl:[@media(max-height:820px)]:text-[13px] pinned:xl:[@media(max-height:820px)]:leading-[1.35]">
                <CategoryDot category={m.category} className="absolute left-0 top-[7px] size-1.5" />
                {f}
              </p>
            ))}
          </div>
          {m.link && <TextLink href={m.link.href}>{m.link.label}</TextLink>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
