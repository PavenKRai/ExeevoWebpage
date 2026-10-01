import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Layer, Parallax } from "../scene/Layer";
import { Scene } from "../scene/Scene";
import { home } from "@/content/site";
import "../../app/styles/home.css";
import "../../app/styles/home-scenes.css";

const delays = ["d1", "d2", "d3"];
// Card entrance slices of the pinned interval, staggered, and glow parallax depths (px).
const slices = [[0.04, 0.3], [0.26, 0.52], [0.48, 0.74]] as const;
const depths = [70, 150, 100] as const;
const orbFrom = ["200deg", "320deg", "80deg"];
// Design-space blur glows behind the cards: left %, colour, opacity.
const glows = [
  { left: "8.3%", top: 300, w: 380, h: 300, color: "var(--ex-magenta)", o: 0.28 },
  { left: "38.9%", top: 260, w: 380, h: 320, color: "var(--ex-blue)", o: 0.26 },
  { left: "68%", top: 300, w: 380, h: 300, color: "var(--ex-green)", o: 0.3 },
] as const;

export function Pathways() {
  const p = home.pathways;
  return (
    <Scene pin={70} className="hp-track" stageClassName="hm bg-mist overflow-hidden">
      {glows.map((g, i) => (
        <Parallax
          key={i}
          aria-hidden="true"
          depth={depths[i]}
          className="hm-blob max-lg:hidden"
          style={{ left: g.left, top: g.top, width: g.w, height: g.h, background: g.color, opacity: g.o, filter: "blur(90px)" }}
        />
      ))}
      <div className="hp-inner relative px-5 pb-16 pt-16 sm:px-8 lg:pb-[84px] lg:pt-[120px] min-[1440px]:px-0">
        <div className="relative mx-auto max-w-[1280px]">
          <div className="sr pinned:animate-none flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-[clamp(32px,3.6vw+8px,46px)] text-heading [text-wrap:wrap]">{p.title}</h2>
            <p className="max-w-[340px] text-[17px] leading-[1.5] text-muted">{p.subtitle}</p>
          </div>
          <div className="hp-grid mt-10 grid gap-8 md:grid-cols-3 lg:mt-[66px]">
            {p.items.map((item, i) => (
              <Layer key={item.persona} from={{ o: 0, y: 160, s: 0.85, blur: 10 }} range={[...slices[i]]} className="h-full">
                <Link
                  href={item.href}
                  className={`glass-light lift srg pinned:animate-none ${delays[i]} flex h-full min-h-[340px] flex-col justify-between rounded-[30px] p-[34px]`}
                >
                  <div className="flex flex-col gap-[18px]">
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className="hm-orb size-[34px]" style={{ "--from": orbFrom[i] } as CSSProperties} />
                      <span className="text-[14px] font-medium text-muted">{item.persona}</span>
                    </div>
                    <h3 className="font-sans text-[27px] [text-wrap:wrap] leading-[1.15] tracking-[-0.02em]">{item.question}</h3>
                    <p className="text-[16px] leading-[1.55] text-muted">{item.body}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between md:mt-0 text-[15px] font-[550] text-brand-blue">
                    <span>{item.cta}</span>
                    <span aria-hidden="true" className="grid size-11 place-items-center rounded-[14px] bg-ink text-white">
                      <ArrowRight size={18} strokeWidth={1.8} />
                    </span>
                  </div>
                </Link>
              </Layer>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}
