"use client";

import { useMemo, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { getModule, type Module } from "@/content/modules";
import { Layer, Parallax, SceneProgress } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";
import { DeckStage } from "./DeckStage";
import { ModuleDetail } from "./ModuleDetail";
import { ModuleRail } from "./ModuleRail";
import { useModuleScene } from "./useModuleScene";
import "./platform-scene.css";


/** Scene A: header + rail | deck | detail pinned together; scroll scrubs the selected module. */
export function ModuleDeck({ modules, header }: { modules: Module[]; header: ReactNode }) {
  const fromUrl = useSearchParams().get("module");
  const slugs = useMemo(() => modules.map((m) => m.slug), [modules]);
  const initial = Math.max(0, slugs.indexOf(getModule(fromUrl).slug));
  const { ref, index, select } = useModuleScene(slugs, initial, fromUrl);

  return (
    <Scene
      id="platform-explorer"
      aria-label="Platform modules"
      trackRef={ref}
      pin={50}
      className="scene--plat"
      stageClassName="bg-mist pb-16 xl:pb-[88px] pinned:xl:flex pinned:xl:flex-col pinned:xl:pb-0"
    >
      <Parallax depth={28} aria-hidden="true" className="lab-grid pointer-events-none absolute -inset-y-24 inset-x-0" />
      <Layer from={{ o: 0, y: 28 }} intro={0} className="relative">
        {header}
      </Layer>
      <div className="frame relative pinned:xl:min-h-0 pinned:xl:flex-1 pinned:xl:pb-5">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 [--dh:640px] xl:grid-cols-[280px_minmax(0,1fr)_380px] xl:items-start xl:gap-10 pinned:xl:[--dh:clamp(430px,calc(100svh-340px),700px)] pinned:xl:grid-cols-[clamp(232px,18vw,260px)_minmax(0,1fr)_clamp(400px,31vw,420px)] pinned:xl:gap-8">
          <Layer from={{ o: 0, x: -48 }} intro={0.12}>
            <ModuleRail modules={modules} index={index} onSelect={select} />
          </Layer>
          <Layer from={{ o: 0, s: 0.92, y: 48, blur: 6 }} intro={0.22}>
            <DeckStage modules={modules} index={index} onSelect={select} />
          </Layer>
          <Layer from={{ o: 0, x: 48 }} intro={0.32}>
            <ModuleDetail module={modules[index]} />
          </Layer>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 hidden pinned:xl:block">
        <SceneProgress />
      </div>
    </Scene>
  );
}
