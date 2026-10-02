"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { Layer } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";
import { Button } from "@/components/ui/Button";
import { industries, type IndustrySlug } from "@/content/industries";
import { IndustryCards } from "./IndustryCards";
import { MedtechDevice } from "./MedtechDevice";
import { PharmaCapsule } from "./PharmaCapsule";

export function IndustrySwitcher({ industryParam = null }: { industryParam?: string | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const active: IndustrySlug = industryParam === "medtech" ? "medtech" : "pharma";
  const item = industries.items[active];
  const slugs = Object.keys(industries.items) as IndustrySlug[];
  const dur = reduce ? 0 : 0.6;
  const shift = reduce ? 0 : 18;

  return (
    <>
      <Scene id="industries-hero" fit pin={70} stageClassName="ind-ground overflow-hidden">
        <div className="relative mx-auto flex max-w-[1440px] flex-col pb-16 pt-[140px] pinned:h-full pinned:pb-8 pinned:pt-[116px] xl:pt-[171px] pinned:xl:pt-[116px]">
          <div className="px-5 xl:px-20">
            <div role="group" aria-label="Industry" className="glass-light flex w-fit gap-1 rounded-[18px] p-[5px]">
              {slugs.map((k) => {
                const on = k === active;
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={on}
                    onClick={() => router.replace(`${pathname}?industry=${k}`, { scroll: false })}
                    className={`h-[46px] min-w-11 rounded-[14px] px-6 text-[15px] font-semibold transition-colors duration-[350ms] ${on ? "bg-ink text-white" : "bg-transparent text-body"}`}
                  >
                    {industries.items[k].label}
                  </button>
                );
              })}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="relative mt-[26px] pinned:flex pinned:flex-1 pinned:flex-col"
              initial={{ opacity: 0, x: shift }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -shift }}
              transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-[22px] px-5 pinned:mb-6 xl:h-[446px] xl:px-20 pinned:xl:h-auto">
                <h1 className="max-w-[760px] text-[clamp(40px,5vw+8px,64px)] leading-[1.04] tracking-[-0.035em] pinned:max-w-[56%] pinned:text-[clamp(36px,min(4.6vw,7.4svh),60px)] pinned:xl:max-w-[720px]">{item.h1}</h1>
                <p className="body-lg max-w-[620px] text-muted pinned:max-w-[52%] pinned:xl:max-w-[620px]">{item.intro}</p>
              </div>
              <div className="pointer-events-none flex justify-center overflow-hidden max-md:h-[320px] xl:absolute xl:left-[880px] xl:top-[-124px] xl:block xl:overflow-visible pinned:absolute pinned:inset-auto pinned:right-0 pinned:top-[-120px] pinned:block pinned:h-auto pinned:overflow-visible pinned:xl:left-auto pinned:xl:right-[20px]">
                <Layer intro={0.15} from={{ o: 0, y: 40, s: 0.94 }} className="pinned:origin-top-right">
                  <Layer to={{ y: -36 }} className="pinned:origin-top-right">
                    <div className="ind-obj mx-auto shrink-0 origin-top scale-[.6] md:scale-100 pinned:origin-top-right pinned:md:scale-[.56] pinned:lg:scale-[.72] pinned:xl:scale-[.85]">
                      {active === "pharma" ? <PharmaCapsule /> : <MedtechDevice />}
                    </div>
                  </Layer>
                </Layer>
              </div>
              <IndustryCards cards={item.cards} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Scene>
      <Scene id="industries-close" fit pin={35} stageClassName="bg-mist">
        <div className="pb-16 pt-8 pinned:flex pinned:h-full pinned:items-center pinned:py-0">
          <Layer from={{ o: 0, y: 70 }} range={[0, 0.5]} className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-6 border-t border-hairline px-5 py-8 sm:flex-row sm:items-center sm:justify-between xl:px-0">
            <p className="text-[20px] font-medium text-heading">{industries.closing.line}</p>
            <Button href={industries.closing.href} size="hero" className="min-h-[52px] !rounded-2xl !px-6">
              {industries.closing.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </Button>
          </Layer>
        </div>
      </Scene>
    </>
  );
}
