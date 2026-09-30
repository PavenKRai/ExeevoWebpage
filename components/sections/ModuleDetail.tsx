"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Module } from "@/content/modules";
import { Checklist } from "@/components/ui/Checklist";
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
      className="glass-light overflow-hidden rounded-card p-7 sm:p-8"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={m.slug}
          initial={{ opacity: 0, x: reduce ? 0 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reduce ? 0 : -24 }}
          transition={{ duration: d, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-muted">
            <CategoryDot category={m.category} />
            <span>Platform</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-semibold text-heading">
              {m.name}
            </span>
          </nav>
          <p className="mt-6 text-heading">{m.lead}</p>
          <Checklist className="mt-8" items={m.features} />
          <h3 className="mt-10 text-[20px] leading-tight text-heading">{m.fitTitle}</h3>
          <ul className="mt-4 grid gap-2 text-muted">
            {m.fit.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ink" />
                {f}
              </li>
            ))}
          </ul>
          {m.link && (
            <div className="mt-6">
              <TextLink href={m.link.href}>{m.link.label}</TextLink>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
