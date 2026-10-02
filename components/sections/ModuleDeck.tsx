"use client";

import { useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { getModule, type Module } from "@/content/modules";
import { Layer, Parallax } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";
import { DeckStage } from "./DeckStage";
import { ModuleDetail } from "./ModuleDetail";
import { ModuleRail } from "./ModuleRail";
import { useModuleScene } from "./useModuleScene";
import "./platform-scene.css";

/** Where the columns start (px from stage top, below the full header) and end up (below the shrunken header). */
const START_TOP = 360;
const END_TOP = 214;
const SHIFT = START_TOP - END_TOP;
const BOTTOM_GAP = 24;

/**
 * Platform explorer. At rest it is the roomy design layout. As you scroll through a short pinned beat the
 * title and intro shrink up to the top and the three columns glide up and scale just enough to sit in a single
 * screen — keeping the page's left/right margins (rail pins to the left edge, detail to the right edge, the deck
 * stays centred) and equal-height rail and detail panels. Selecting a module is by click / keyboard / ?module=.
 */
export function ModuleDeck({ modules, header }: { modules: Module[]; header: ReactNode }) {
  const fromUrl = useSearchParams().get("module");
  const slugs = useMemo(() => modules.map((m) => m.slug), [modules]);
  const initial = Math.max(0, slugs.indexOf(getModule(fromUrl).slug));
  const { ref, index, select } = useModuleScene(slugs, initial, fromUrl);

  // Scale that makes the columns' natural height fit between END_TOP and the bottom of the viewport.
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const grid = gridRef.current;
    const scene = grid?.closest<HTMLElement>(".scene");
    if (!grid || !scene) return;
    const measure = () => {
      const natural = grid.offsetHeight; // unaffected by transforms
      const fit = Math.min(1, Math.max(0.6, (window.innerHeight - END_TOP - BOTTOM_GAP) / natural));
      scene.style.setProperty("--plat-fit", String(fit));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const fit = { "--s1": "var(--plat-fit, 1)" } as CSSProperties;

  return (
    <Scene
      id="platform-explorer"
      aria-label="Platform modules"
      trackRef={ref}
      pin={55}
      className="scene--plat"
      stageClassName="bg-mist pb-12 xl:pb-[70px]"
    >
      <Parallax depth={28} aria-hidden="true" className="lab-grid pointer-events-none absolute -inset-y-24 inset-x-0" />
      <div className="relative">{header}</div>
      <div className="frame relative">
        <div ref={gridRef} className="grid grid-cols-[minmax(0,1fr)] gap-8 [--dh:592px] xl:grid-cols-[280px_minmax(0,1fr)_380px] xl:items-stretch xl:gap-20">
          <Layer to={{ y: -SHIFT }} range={[0.05, 0.75]} className="origin-top-left xl:h-full" style={fit}>
            <Layer from={{ o: 0, x: -48 }} intro={0.12} className="xl:h-full">
              <ModuleRail modules={modules} index={index} onSelect={select} />
            </Layer>
          </Layer>
          <Layer to={{ y: -SHIFT }} range={[0.05, 0.75]} className="origin-top xl:self-center" style={fit}>
            <Layer from={{ o: 0, s: 0.92, y: 48, blur: 6 }} intro={0.22}>
              <DeckStage modules={modules} index={index} onSelect={select} />
            </Layer>
          </Layer>
          <Layer to={{ y: -SHIFT }} range={[0.05, 0.75]} className="origin-top-right xl:h-full" style={fit}>
            <Layer from={{ o: 0, x: 48 }} intro={0.32} className="xl:h-full">
              <ModuleDetail module={modules[index]} all={modules} />
            </Layer>
          </Layer>
        </div>
      </div>
    </Scene>
  );
}
