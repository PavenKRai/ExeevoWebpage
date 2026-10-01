"use client";

import { useMemo, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { getModule, type Module } from "@/content/modules";
import { Layer, Parallax } from "@/components/scene/Layer";
import { DeckStage } from "./DeckStage";
import { ModuleDetail } from "./ModuleDetail";
import { ModuleRail } from "./ModuleRail";
import { useModuleScene } from "./useModuleScene";

/**
 * Platform explorer, laid out as in the approved design: header, then rail | deck | detail with generous
 * spacing. It is a normal-flow section (no pinning): selection is by click / keyboard / ?module= deep link,
 * and the parts glide in by themselves on load.
 */
export function ModuleDeck({ modules, header }: { modules: Module[]; header: ReactNode }) {
  const fromUrl = useSearchParams().get("module");
  const slugs = useMemo(() => modules.map((m) => m.slug), [modules]);
  const initial = Math.max(0, slugs.indexOf(getModule(fromUrl).slug));
  const { ref, index, select } = useModuleScene(slugs, initial, fromUrl);

  return (
    <section id="platform-explorer" aria-label="Platform modules" ref={ref} className="relative overflow-hidden bg-mist pb-12 xl:pb-[70px]">
      <Parallax depth={28} aria-hidden="true" className="lab-grid pointer-events-none absolute -inset-y-24 inset-x-0" />
      <Layer from={{ o: 0, y: 28 }} intro={0} className="relative">
        {header}
      </Layer>
      <div className="frame relative">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 [--dh:592px] xl:grid-cols-[280px_minmax(0,1fr)_380px] xl:items-start xl:gap-20">
          <Layer from={{ o: 0, x: -48 }} intro={0.12}>
            <ModuleRail modules={modules} index={index} onSelect={select} />
          </Layer>
          <Layer from={{ o: 0, s: 0.92, y: 48, blur: 6 }} intro={0.22}>
            <DeckStage modules={modules} index={index} onSelect={select} />
          </Layer>
          <Layer from={{ o: 0, x: 48 }} intro={0.32}>
            <ModuleDetail module={modules[index]} all={modules} />
          </Layer>
        </div>
      </div>
    </section>
  );
}
