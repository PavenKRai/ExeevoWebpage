"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getModule, type Module } from "@/content/modules";
import { Glow } from "@/components/glass/Glow";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/components/ui/cn";
import { DeckCards } from "./DeckCards";
import { ModuleDetail } from "./ModuleDetail";
import { ModuleRail, useIsDesktop } from "./ModuleRail";

export function ModuleDeck({ modules }: { modules: Module[] }) {
  const params = useSearchParams();
  const fromUrl = params.get("module");
  const indexOf = (slug: string | null) => Math.max(0, modules.findIndex((m) => m.slug === getModule(slug).slug));
  const [index, setIndex] = useState(() => indexOf(fromUrl));
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();

  const [seen, setSeen] = useState(fromUrl);
  if (seen !== fromUrl) {
    setSeen(fromUrl);
    setIndex(indexOf(fromUrl));
  }

  const select = useCallback(
    (i: number) => {
      const next = Math.min(modules.length - 1, Math.max(0, i));
      setIndex(next);
      const url = new URL(window.location.href);
      url.searchParams.set("module", modules[next].slug);
      window.history.replaceState(window.history.state, "", url);
    },
    [modules],
  );

  const current = modules[index];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 xl:items-start xl:grid-cols-[260px_minmax(0,1fr)_420px]">
      <ModuleRail modules={modules} index={index} onSelect={select} />

      <div className="relative mx-auto w-full max-w-[640px] xl:max-w-none">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          <Glow color="gradient" className="inset-0 size-full" />
        </motion.div>
        <DeckCards modules={modules} index={index} onSelect={select} swipe={!desktop} />
        <div className="relative mt-6 flex items-center justify-center gap-3">
          <IconButton label="Previous module" disabled={index === 0} onClick={() => select(index - 1)}>
            <ChevronLeft size={22} strokeWidth={1.8} />
          </IconButton>
          <div className="flex items-center">
            {modules.map((m, i) => (
              <button
                key={m.slug}
                type="button"
                aria-label={`Go to ${m.name}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => select(i)}
                className="flex size-11 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={cn("block h-2 rounded-full transition-all duration-500", i === index ? "w-6 bg-ink" : "w-2 bg-slate/40")}
                />
              </button>
            ))}
          </div>
          <IconButton label="Next module" disabled={index === modules.length - 1} onClick={() => select(index + 1)}>
            <ChevronRight size={22} strokeWidth={1.8} />
          </IconButton>
        </div>
      </div>

      <ModuleDetail module={current} />
    </div>
  );
}
