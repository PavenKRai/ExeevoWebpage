"use client";
import "./roles-scene.css";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMotionValueEvent } from "motion/react";
import { Scene } from "@/components/scene/Scene";
import { Layer, Parallax, SceneProgress } from "@/components/scene/Layer";
import { useSceneProgress } from "@/components/scene/useSceneProgress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { RolePanels } from "./RolePanels";
import type { RoleItem } from "./RolePanel";

type Page = { label: string; h1: string; intro: string; closing: { line: string; cta: string } };
const dot = { blue: "var(--ex-blue)", magenta: "var(--ex-magenta)", purple: "var(--ex-purple)", green: "var(--ex-green)" } as const;

/** Scroll never changes the open role: people should be able to scroll past freely. */
const SCROLL_STEPS = false;

export function RolesScene({ roles, page, roleParam = null }: { roles: readonly RoleItem[]; page: Page; roleParam?: string | null }) {
  const { ref, progress, scrollToProgress, isPinned } = useSceneProgress();
  const fromUrl = Math.max(0, roles.findIndex((r) => r.slug === roleParam));
  const [active, setActive] = useState(fromUrl);
  // Follow ?role= when it changes after mount (e.g. the nav's Solutions by role menu while already on this page).
  const [seenParam, setSeenParam] = useState(roleParam);
  if (seenParam !== roleParam) {
    setSeenParam(roleParam);
    if (roleParam) setActive(fromUrl);
  }
  const n = roles.length;
  const lock = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const release = useRef<() => void>(() => {});
  useEffect(() => {
    const fn = () => {
      lock.current = false;
      clearTimeout(timer.current);
      window.removeEventListener("scrollend", fn);
      window.removeEventListener("wheel", fn);
      window.removeEventListener("touchstart", fn);
    };
    release.current = fn;
    return fn;
  }, []);

  useMotionValueEvent(progress, "change", (p) => {
    if (!SCROLL_STEPS || lock.current || !isPinned()) return;
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const select = (i: number) => {
    setActive(i);
    if (!SCROLL_STEPS || !isPinned()) return;
    const target = (i + 0.5) / n;
    if (Math.abs(progress.get() - target) < 0.01) return;
    const done = release.current;
    done();
    lock.current = true;
    window.addEventListener("scrollend", done, { once: true });
    window.addEventListener("wheel", done, { once: true, passive: true });
    window.addEventListener("touchstart", done, { once: true, passive: true });
    timer.current = setTimeout(done, 2500);
    scrollToProgress(target);
  };

  return (
    <Scene id="roles-scene" pin={45} trackRef={ref} stageClassName="overflow-hidden bg-ink on-dark text-white">
      <Parallax depth={90} aria-hidden="true" className="pointer-events-none absolute -inset-y-24 inset-x-0">
        <Layer from={{ s: 0.92 }} to={{ s: 1.12 }} aria-hidden="true" className="rings-bg size-full" style={{ "--rx": "87%", "--ry": "20%" } as CSSProperties} />
      </Parallax>
      <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-[130px] md:px-10 lg:px-20 lg:pb-[76px] lg:pt-[180px] pinned:flex pinned:h-full pinned:flex-col pinned:justify-between pinned:pb-6! pinned:pt-[116px]!">
        <Layer to={{ y: -8, o: 0.85 }} range={[0.1, 1]}>
          <header className="flex flex-col gap-6 pinned:gap-4 pinned:lg:flex-row pinned:lg:items-end pinned:lg:justify-between">
            <div className="flex flex-col gap-[18px] pinned:gap-3">
              <p className="rise text-[15px] leading-[1.3] text-on-dark-muted" style={{ "--i": 0 } as CSSProperties}>{page.label}</p>
              <h1 className="rise max-w-[760px] text-wrap text-[clamp(40px,5vw,64px)] leading-[1.04] tracking-[-0.035em] pinned:max-w-none pinned:whitespace-nowrap pinned:text-[clamp(34px,3.6vw,48px)]!" style={{ "--i": 1 } as CSSProperties}>{page.h1}</h1>
            </div>
            <p className="rise max-w-[380px] text-[18px] font-[350] leading-[1.55] text-on-dark pinned:max-w-[520px] pinned:lg:max-w-[340px] pinned:text-[16px]" style={{ "--i": 2 } as CSSProperties}>{page.intro}</p>
          </header>
        </Layer>
        <div className="mt-10 lg:mt-20 pinned:mt-0! pinned:[--panel-h:clamp(380px,calc(100svh-330px),560px)]">
          <RolePanels roles={roles} active={active} onSelect={select} />
        </div>
        <div className="mt-10 flex flex-col items-start gap-6 lg:mt-[60px] lg:flex-row lg:items-center lg:justify-between pinned:mt-0!">
          <p className="max-w-none text-[18px] text-[#DCE3E7]">{page.closing.line}</p>
          <Button href="/getting-started#demo" size="hero" className="min-h-[54px]! px-[26px]!">{page.closing.cta}</Button>
        </div>
      </div>
      <div aria-hidden="true" className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 flex-col pinned:flex">
        {roles.map((r, i) => (
          <button key={r.slug} type="button" tabIndex={-1} onClick={() => select(i)} className="flex size-11 cursor-pointer items-center justify-center border-0 bg-transparent p-0">
            <span className={cn("block rounded-full transition-[transform,opacity] duration-500", active === i ? "size-3 scale-125 opacity-100" : "size-2.5 opacity-40")} style={{ background: dot[r.glow] }} />
          </button>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0"><SceneProgress /></div>
    </Scene>
  );
}
