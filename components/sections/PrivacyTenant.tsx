import Link from "next/link";
import { TenantDiagram } from "./TenantDiagram";
import { Scene } from "../scene/Scene";
import { Layer } from "../scene/Layer";
import { home } from "@/content/site";
import "../../app/styles/home.css";
import "../../app/styles/home-scenes-2.css";

export function PrivacyTenant() {
  const p = home.privacy;
  return (
    <Scene
      id="scene-privacy"
      pin={60}
      aria-label={p.title}
      stageClassName="hm bg-mist px-5 py-16 sm:px-8 lg:pb-[100px] lg:pt-[100px] min-[1440px]:px-20 pinned:flex pinned:items-center pinned:py-0 pinned:pt-[96px]"
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 min-[1280px]:grid-cols-[minmax(0,580px)_auto] min-[1280px]:justify-between">
        <Layer from={{ o: 0 }} range={[0, 0.2]}>
          <Layer from={{ y: 40 }} to={{ y: -24 }} range={[0, 1]} className="flex flex-col gap-[22px] min-[1280px]:pt-10">
            <h2 className="text-[clamp(32px,3.2vw+8px,46px)] leading-[1.08] [text-wrap:wrap]">{p.title}</h2>
            <p className="lead font-[450] text-brand-blue">{p.lead}</p>
            <p className="text-[18px] font-[350] leading-[1.6] text-muted">{p.body}</p>
            <Link href="/why-exeevo" className="flex min-h-11 items-start pt-1.5 text-[16px] font-semibold text-heading">
              <span className="border-b-2 border-brand-blue pb-[3px]">{p.link}</span>
            </Link>
          </Layer>
        </Layer>
        <Layer from={{ y: 70 }} to={{ y: -20 }} range={[0, 1]} className="mx-auto w-full max-w-[600px] min-[1280px]:mx-0">
          <TenantDiagram diagram={p.diagram} />
        </Layer>
      </div>
    </Scene>
  );
}
