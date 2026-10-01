import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "../ui/Button";
import { Scene } from "../scene/Scene";
import { Layer } from "../scene/Layer";
import { home } from "@/content/site";
import { modules } from "@/content/modules";
import "../../app/styles/home.css";
import "../../app/styles/home-scenes-2.css";

const tileBase =
  "hm-tile glass-dark flex h-[150px] w-full flex-col justify-between rounded-[20px] p-[18px] text-white";
// The Ask-Nova tile: ink glass with the gradient ring.
const aiTile = `${tileBase} btn-primary !border-2`;

// Slice of the pinned interval in which each category's tiles land (and its legend line brightens).
const slice: Record<string, [number, number]> = {
  commercial: [0.08, 0.32],
  medical: [0.36, 0.5],
  platform: [0.5, 0.66],
  ai: [0.68, 0.85],
};

export function PlatformBoard() {
  const t = home.platformTeaser;
  const seen: Record<string, number> = {};
  return (
    <Scene
      id="scene-board"
      pin={80}
      aria-label={t.title}
      stageClassName="hm on-dark bg-ink px-5 py-16 text-[color:var(--hm-fg)] sm:px-8 md:py-[60px] min-[1440px]:px-20 pinned:flex pinned:items-center pinned:py-0 pinned:pt-[96px]"
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 min-[1280px]:grid-cols-[470px_1fr] min-[1280px]:items-start min-[1280px]:gap-x-0 pinned:items-center">
        <Layer from={{ o: 0, x: -70 }} range={[0, 0.2]} className="flex max-w-[470px] flex-col gap-6 min-[1280px]:pt-[90px] pinned:pt-0">
          <h2 className="text-[clamp(34px,3.6vw+8px,48px)] leading-[1.06] [text-wrap:wrap]">{t.title}</h2>
          <p className="text-[18px] font-[350] leading-[1.6] text-on-dark">{t.body}</p>
          <ul className="flex flex-col gap-3 pb-3 pt-2">
            {t.legend.map((l) => (
              <Layer
                as="li"
                key={l.category}
                from={{ o: 0.3, x: -10 }}
                range={[slice[l.category][0], slice[l.category][0] + 0.14]}
                className="flex items-center gap-3 text-[15px] leading-[normal] text-[color:var(--hm-fg-2)]"
              >
                <span className="hm-dot" data-c={l.category} aria-hidden="true" />
                <span>{l.label}: {l.text}</span>
              </Layer>
            ))}
          </ul>
          <Button variant="primary" size="content" href="/platform" className="self-start !gap-2.5 !min-h-[54px] !px-6 !text-[16px]">
            {t.cta}
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
          </Button>
        </Layer>

        <div className="hm-stage hm-board-stage hm-flat-sm mx-auto min-[1280px]:ml-[calc(90px*var(--bs))] min-[1280px]:mr-0">
          <div className="hm-canvas md:[perspective:1800px]">
            <Layer
              aria-hidden="true"
              from={{ o: 0.15, s: 0.35 }}
              range={[0, 0.85]}
              className="absolute left-[170px] top-[190px] hidden h-[340px] w-[420px] md:block"
            >
              <span
                className="hm-blob inset-0 block opacity-[.55] blur-[80px]"
                style={{ background: "conic-gradient(from 90deg, var(--ex-magenta), var(--ex-blue), var(--ex-green), var(--ex-magenta))" }}
              />
            </Layer>
            <ul className="hs-board grid grid-cols-2 gap-[18px] md:absolute md:left-[60px] md:top-[170px] md:w-[640px] md:grid-cols-4 md:[transform-style:preserve-3d] md:[transform:rotateX(46deg)_rotateZ(-22deg)]">
              {modules.map((m, i) => {
                const [s] = slice[m.category];
                const k = (seen[m.category] = (seen[m.category] ?? -1) + 1);
                const a = s + k * 0.04;
                const style = {
                  "--a": a,
                  "--b": a + 0.2,
                  "--dx": `${((i % 4) - 1.5) * 80}px`,
                  "--dy": `${(Math.floor(i / 4) - 0.5) * 80}px`,
                } as CSSProperties;
                return (
                  <li key={m.slug} style={style} className="hs-tile md:[transform-style:preserve-3d]">
                    <Link
                      href={`/platform?module=${m.slug}`}
                      className={m.category === "ai" ? aiTile : tileBase}
                      style={m.category === "ai" ? { background: "linear-gradient(rgba(34,44,51,.92), rgba(34,44,51,.92)) padding-box, var(--ex-gradient) border-box" } : undefined}
                    >
                      <span className="hm-dot" data-c={m.category} aria-hidden="true" />
                      <span className="text-[16px] font-semibold leading-[1.2]">{m.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Scene>
  );
}
