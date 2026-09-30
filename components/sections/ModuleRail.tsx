"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import type { Module } from "@/content/modules";
import { CategoryDot } from "@/components/ui/CategoryDot";
import { cn } from "@/components/ui/cn";

export function useIsDesktop() {
  const [d, setD] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const on = () => setD(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
}

export const tabId = (slug: string) => `module-tab-${slug}`;
export const PANEL_ID = "module-panel";

export function ModuleRail({ modules, index, onSelect }: { modules: Module[]; index: number; onSelect: (i: number) => void }) {
  const desktop = useIsDesktop();

  const onKey = (e: KeyboardEvent) => {
    const n = modules.length;
    const fwd = desktop ? "ArrowDown" : "ArrowRight";
    const back = desktop ? "ArrowUp" : "ArrowLeft";
    let next = -1;
    if (e.key === fwd) next = (index + 1) % n;
    else if (e.key === back) next = (index - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else if (e.key === "ArrowDown") next = (index + 1) % n;
    else if (e.key === "ArrowUp") next = (index - 1 + n) % n;
    if (next < 0) return;
    e.preventDefault();
    onSelect(next);
    requestAnimationFrame(() => document.getElementById(tabId(modules[next].slug))?.focus());
  };

  return (
    <div className="glass-light rounded-card p-2 xl:p-3">
      <div
        role="tablist"
        aria-label="Platform modules"
        aria-orientation={desktop ? "vertical" : "horizontal"}
        onKeyDown={onKey}
        className="flex gap-2 overflow-x-auto p-1 xl:flex-col xl:overflow-visible"
      >
        {modules.map((m, i) => {
          const sel = i === index;
          return (
            <button
              key={m.slug}
              id={tabId(m.slug)}
              role="tab"
              type="button"
              aria-selected={sel}
              aria-controls={PANEL_ID}
              tabIndex={sel ? 0 : -1}
              onClick={() => onSelect(i)}
              className={cn(
                "flex min-h-12 shrink-0 items-center gap-3 whitespace-nowrap rounded-chip px-4 text-left font-semibold transition-colors duration-300 xl:w-full",
                sel ? "bg-ink text-white" : "text-heading hover:bg-white/70",
              )}
            >
              <CategoryDot category={m.category} />
              {m.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
