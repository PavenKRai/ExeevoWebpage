import { Play, ShieldCheck, Sparkles, Lock, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";
import { CategoryDot } from "../ui/CategoryDot";
import { GlassPanel } from "../glass/GlassPanel";
import { HeroOrb } from "../glass/HeroOrb";
import { Orb } from "../glass/Orb";
import { Specimen } from "../glass/Specimen";
import { home, site } from "@/content/site";

const icons: Record<string, LucideIcon> = { shield: ShieldCheck, sparkles: Sparkles, lock: Lock };

const cardPos = [
  "left-0 top-[6%] [transform:rotateY(14deg)_rotateX(4deg)]",
  "right-0 top-[34%] [transform:rotateY(-14deg)_rotateX(4deg)]",
  "left-[6%] bottom-[2%] hidden md:block [transform:rotateY(10deg)_rotateX(-3deg)]",
];
const floats = ["float", "float-2", "float-3"];

export function HomeHero() {
  return (
    <section className="on-dark section relative overflow-hidden bg-ink pb-16 pt-[140px] md:pb-24">
      <div aria-hidden="true" className="rings-bg absolute inset-0" />
      <div className="frame">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="rise" style={{ "--i": 0 } as CSSProperties}>
              <Chip variant="hero">{home.chip}</Chip>
            </div>
            <h1 className="rise mt-7" style={{ "--i": 1 } as CSSProperties}>
              {home.h1}
            </h1>
            <p className="body-lg rise mt-6 text-on-dark" style={{ "--i": 2 } as CSSProperties}>
              {home.paragraph}
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-4" style={{ "--i": 3 } as CSSProperties}>
              <Button variant="primary" size="hero" href={site.demoHref}>
                {home.primaryCta}
              </Button>
              <Button variant="secondary" href={site.videoUrl}>
                <span className="relative grid size-[38px] place-items-center">
                  <Orb size={38} className="absolute inset-0" />
                  <Play aria-hidden="true" size={16} strokeWidth={1.8} className="relative fill-white text-white" />
                </span>
                {home.videoCta}
              </Button>
            </div>
          </div>

          <HeroOrb className="relative mx-auto w-[70%] min-w-[240px] max-w-[460px] lg:w-full">
            <Specimen size="100%" />
            <div className="absolute inset-[-12%] [perspective:1100px] md:inset-[-16%]">
              {home.heroCards.map((c, i) => (
                <div key={c.title} className={`tilt-in absolute w-[68%] max-w-[250px] md:w-[58%] ${cardPos[i]}`} style={{ "--i": i } as CSSProperties}>
                  <div className={floats[i]}>
                    <GlassPanel tone="dark" className="rounded-card-s p-4">
                      <div className="flex items-center gap-2 text-[13px] text-on-dark">
                        <CategoryDot category={c.category} />
                        {c.tag}
                      </div>
                      <p className="mt-2 font-display text-[16px] font-semibold text-white">{c.title}</p>
                      <p className="mt-1 text-[13px] leading-snug text-on-dark">{c.body}</p>
                    </GlassPanel>
                  </div>
                </div>
              ))}
            </div>
          </HeroOrb>
        </div>

        <GlassPanel tone="dark" className="mt-16 grid gap-6 rounded-panel p-6 md:mt-20 md:grid-cols-3 md:gap-0 md:p-0">
          {home.trust.map((t, i) => {
            const Icon = icons[t.icon] ?? ShieldCheck;
            return (
              <div key={t.title} className={`flex gap-4 md:p-8 ${i > 0 ? "md:border-l md:border-white/15" : ""}`}>
                <Icon aria-hidden="true" size={28} strokeWidth={1.8} className="mt-0.5 shrink-0 text-link-on-dark" />
                <div>
                  <h2 className="!font-display !text-[20px] !leading-tight !tracking-normal">{t.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-on-dark">{t.body}</p>
                </div>
              </div>
            );
          })}
        </GlassPanel>
      </div>
    </section>
  );
}
