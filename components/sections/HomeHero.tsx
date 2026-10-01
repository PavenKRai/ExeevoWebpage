import { Play } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Button } from "../ui/Button";
import { Layer } from "../scene/Layer";
import { Scene } from "../scene/Scene";
import { HeroCluster } from "./HeroCluster";
import { HeroTrust } from "./HeroTrust";
import { home, site } from "@/content/site";
import "../../app/styles/home.css";
import "../../app/styles/home-scenes.css";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

function VideoCta() {
  const cls =
    "glass-dark inline-flex h-14 items-center gap-3 rounded-[17px] py-0 pl-2.5 pr-[22px] text-[16px] font-[450] text-white transition-colors hover:bg-white/10";
  const inner = (
    <>
      <span aria-hidden="true" className="hm-orb grid size-[38px] place-items-center text-white">
        <Play size={16} strokeWidth={2} />
      </span>
      {home.videoCta}
    </>
  );
  return site.videoUrl.startsWith("[") ? (
    <span className={cls} title="Placeholder link">{inner}</span>
  ) : (
    <Link href={site.videoUrl} className={cls}>{inner}</Link>
  );
}

export function HomeHero() {
  return (
    <Scene
      pin={70}
      className="hs-track"
      stageClassName="hm hm-hero-bg on-dark hs-stage overflow-hidden text-[color:var(--hm-fg)]"
    >
      <div className="hs-outer mx-auto max-w-[1440px] px-5 pb-10 pt-[120px] sm:px-8 lg:px-10 lg:pb-0 lg:pt-0">
        <div className="hs-frame relative mx-auto max-w-[1280px] lg:min-h-[1000px] lg:pt-[176px]">
          <Layer
            to={{ y: -150, o: 0, blur: 6 }}
            range={[0.08, 0.5]}
            className="hs-text flex flex-col gap-7 lg:w-[calc(100%-var(--hs)*600px-30px)] lg:max-w-[700px]"
          >
            <div className="glass-dark rise inline-flex h-[38px] items-center gap-2.5 self-start rounded-[19px] pl-2 pr-4 text-[14px] text-[color:var(--hm-fg-2)]" style={delay(0)}>
              <span aria-hidden="true" className="hm-orb size-[22px]" />
              {home.chip}
            </div>
            <h1 className="rise text-[clamp(40px,5.2vw,64px)] leading-[1.04] text-white" style={delay(1)}>
              {home.h1}
            </h1>
            <p className="hs-lede rise max-w-[580px] text-[19px] font-[350] leading-[1.55] text-on-dark" style={delay(2)}>
              {home.paragraph}
            </p>
            <Layer to={{ y: -60, o: 0 }} range={[0.04, 0.3]}>
              <div className="rise flex flex-wrap items-center gap-3" style={delay(3)}>
                <Button variant="primary" size="hero" href={site.demoHref} className="!min-h-14 !rounded-[17px] !px-7">
                  {home.primaryCta}
                </Button>
                <VideoCta />
              </div>
            </Layer>
          </Layer>

          <Layer
            to={{ s: 1.4, x: "-25vw", y: 40 }}
            range={[0.1, 0.8]}
            className="hm-hero-cluster hs-cluster mx-auto mt-10 lg:absolute lg:top-[130px] lg:mt-0"
            style={{ width: "calc(var(--hs) * 600px)" }}
          >
            <Layer to={{ o: 0.15, blur: 10 }} range={[0.7, 1]}>
              <HeroCluster />
            </Layer>
          </Layer>

          <div className="hs-trust-wrap mt-10 lg:absolute lg:inset-x-0 lg:bottom-[50px] lg:mt-0">
            <HeroTrust />
          </div>
        </div>
      </div>
    </Scene>
  );
}
