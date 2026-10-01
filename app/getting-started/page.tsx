import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Parallax } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";
import { gettingStarted } from "@/content/paths";
import { GoLivePaths } from "@/components/sections/GoLivePaths";
import { DemoSection } from "@/components/sections/DemoSection";

export const metadata: Metadata = {
  title: gettingStarted.h1,
  description: gettingStarted.intro,
};

export default function GettingStartedPage() {
  return (
    <>
      <Scene id="start-paths" pin={70} stageClassName="gs-ground overflow-hidden">
        <Parallax
          depth={110}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[300px] -ml-[160px] h-[300px] w-[340px] rounded-full opacity-40 blur-[90px]"
          style={{ background: "conic-gradient(var(--ex-magenta), var(--ex-blue), var(--ex-green), var(--ex-magenta))" }}
        />
        <div className="relative mx-auto flex max-w-[1440px] flex-col px-5 pb-16 pt-[130px] md:px-10 lg:px-20 lg:pb-[90px] lg:pt-[170px] pinned:h-full pinned:justify-center pinned:pb-6 pinned:pt-[96px] pinned:lg:pb-6 pinned:lg:pt-[96px]">
          <header className="flex flex-col gap-[22px] pinned:gap-4">
            <p className="rise text-[15px] leading-[1.3] text-muted" style={{ "--i": 0 } as CSSProperties}>
              {gettingStarted.label}
            </p>
            <h1 className="rise text-[clamp(40px,5vw,64px)] leading-[1.04] tracking-[-0.035em]" style={{ "--i": 1 } as CSSProperties}>
              {gettingStarted.h1}
            </h1>
            <p className="rise max-w-[760px] text-[18px] font-[350] leading-[1.6] text-muted" style={{ "--i": 2 } as CSSProperties}>
              {gettingStarted.intro}
            </p>
          </header>
          <div className="relative mt-12 lg:mt-[94px] pinned:mt-8 pinned:lg:mt-10">
            <GoLivePaths paths={gettingStarted.paths} connector={gettingStarted.connector} />
          </div>
        </div>
      </Scene>
      <DemoSection demo={gettingStarted.demo} />
    </>
  );
}
