import { Scene } from "../scene/Scene";
import { Layer, Parallax } from "../scene/Layer";
import { Button } from "../ui/Button";
import { home, site } from "@/content/site";
import { gettingStarted } from "@/content/paths";
import "../../app/styles/home.css";
import "../../app/styles/home-scenes-2.css";

export function GoLiveBand() {
  const g = home.goLive;
  return (
    <Scene
      id="scene-golive"
      pin={50}
      aria-label={g.title}
      stageClassName="hm on-dark bg-ink px-5 py-16 text-[color:var(--hm-fg)] sm:px-8 lg:pb-[106px] lg:pt-[110px] min-[1440px]:px-20 pinned:flex pinned:items-center pinned:py-0 pinned:pt-[96px]"
    >
      <span aria-hidden="true" className="absolute left-1/2 top-[230px] h-[260px] w-80 -translate-x-1/2 max-md:hidden">
        <Parallax depth={50} className="size-full">
          <Layer from={{ o: 0.2, s: 0.4 }} range={[0.2, 0.9]} className="size-full">
            <span
              className="hm-blob inset-0 block opacity-[.55] blur-[80px]"
              style={{ background: "conic-gradient(from 0deg, var(--ex-magenta), var(--ex-blue), var(--ex-green), var(--ex-magenta))" }}
            />
          </Layer>
        </Parallax>
      </span>
      <div className="relative mx-auto w-full max-w-[1280px]">
        <Layer from={{ o: 0, y: 50 }} range={[0, 0.25]} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-[760px] flex-col gap-3.5">
            <h2 className="text-[clamp(32px,3.2vw+8px,46px)] leading-[1.08] [text-wrap:wrap]">{g.title}</h2>
            <p className="max-w-none text-[17px] leading-[1.55] text-on-dark">{g.body}</p>
          </div>
          <Button variant="primary" size="hero" href={site.demoHref} className="max-sm:self-start !min-h-14 !rounded-[17px] !px-7">
            {g.cta}
          </Button>
        </Layer>

        <div className="mt-14 grid md:mt-[50px] md:grid-cols-[1fr_clamp(120px,14vw,200px)_1fr]">
          {gettingStarted.paths.map((p, i) => (
            <Layer
              key={p.slug}
              from={{ o: 0, x: i === 0 ? "-32vw" : "32vw" }}
              range={[0.2, 0.62]}
              className={`glass-dark flex min-h-[220px] flex-col gap-3.5 rounded-[28px] p-[34px] md:row-start-1 ${i === 0 ? "max-md:order-1 md:col-start-1" : "max-md:order-3 md:col-start-3"}`}
            >
              <span className="text-[13px] font-[550] text-[color:var(--hm-fg-3)]">{p.tag}</span>
              <h3 className="font-sans text-[26px] leading-[1.2] tracking-[-0.02em] text-white">{p.title}</h3>
              <p className="text-[16px] leading-[1.55] text-on-dark">{p.body}</p>
            </Layer>
          ))}
          <div className="relative flex max-md:order-2 h-24 items-center justify-center md:col-start-2 md:row-start-1 md:h-auto">
            <Layer
              as="span"
              aria-hidden="true"
              from={{ o: 0, s: 0.05 }}
              range={[0.55, 0.82]}
              className="block h-0.5 w-full max-md:hidden"
              style={{ background: "linear-gradient(90deg, rgba(255,255,255,.1), #fff, rgba(255,255,255,.1))" }}
            />
            <span
              aria-hidden="true"
              className="h-full w-0.5 md:hidden"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,.1), #fff, rgba(255,255,255,.1))" }}
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[35px] md:translate-x-0">
              <Layer as="span" from={{ o: 0, s: 0.8 }} range={[0.8, 0.95]} className="glass-dark flex h-9 items-center whitespace-nowrap rounded-[18px] bg-ink/80 px-3.5 text-[13px] text-white">
                {g.connector}
              </Layer>
            </span>
          </div>
        </div>
      </div>
    </Scene>
  );
}
