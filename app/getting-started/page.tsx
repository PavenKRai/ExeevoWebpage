import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { gettingStarted } from "@/content/paths";
import { Glow } from "@/components/glass/Glow";
import { GoLivePaths } from "@/components/sections/GoLivePaths";
import { DemoSection } from "@/components/sections/DemoSection";

export const metadata: Metadata = {
  title: gettingStarted.h1,
  description: gettingStarted.intro,
};

export default function GettingStartedPage() {
  return (
    <div className="relative overflow-hidden bg-mist">
      <div className="frame section pt-[140px]">
        <Glow className="left-1/2 top-[260px] h-[420px] w-[70%] -translate-x-1/2" />
        <header className="relative max-w-[760px]">
          <p className="rise text-[15px] font-semibold text-muted" style={{ "--i": 0 } as CSSProperties}>
            {gettingStarted.label}
          </p>
          <h1 className="rise mt-4 font-display text-[clamp(40px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.035em] text-heading" style={{ "--i": 1 } as CSSProperties}>
            {gettingStarted.h1}
          </h1>
          <p className="rise lead mt-6 text-body" style={{ "--i": 2 } as CSSProperties}>
            {gettingStarted.intro}
          </p>
        </header>
        <div className="relative mt-14">
          <GoLivePaths paths={gettingStarted.paths} connector={gettingStarted.connector} />
        </div>
        <div className="mt-[var(--ex-section-y)]">
          <DemoSection demo={gettingStarted.demo} />
        </div>
      </div>
    </div>
  );
}
