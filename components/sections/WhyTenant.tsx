import { Cloud } from "lucide-react";
import { Layer, Parallax } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";

type Tenant = {
  title: string;
  lead: string;
  body: string;
  cardTitle: string;
  cardBody: string;
  rings: { outer: string; inner: string; core: string };
};

const abs = "absolute rounded-full";
const pill =
  "glass-dark absolute flex h-10 items-center whitespace-nowrap !rounded-[20px] !px-4 text-[13px] text-white";
const box = (l: string, t: string, w: string, h: string) => ({
  left: l,
  top: t,
  width: w,
  height: h,
});

export function WhyTenant({ tenant }: { tenant: Tenant }) {
  return (
    <Scene id="why-tenant" pin={60} stageClassName="on-dark bg-ink text-[#EEF2F4]">
      <Parallax
        depth={40}
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[20%] size-[420px] rounded-full bg-brand-blue/10 blur-3xl"
      />
      <div className="py-16 lg:h-[700px] lg:pb-0 lg:pt-[130px] pinned:flex pinned:h-full pinned:items-center pinned:py-0 pinned:pt-[72px]">
        <div className="frame grid gap-12 lg:grid-cols-[620px_560px] lg:justify-between lg:gap-0 pinned:w-full">
          <Layer from={{ o: 0, x: -120 }} range={[0.05, 0.5]} className="flex flex-col gap-[22px]">
            <h2 className="[text-wrap:wrap] text-[clamp(32px,4vw,46px)] leading-[1.08] tracking-[-0.03em]">
              {tenant.title}
            </h2>
            <Layer from={{ o: 0, x: -60 }} range={[0.15, 0.55]}>
              <p className="text-[26px] font-[450] leading-[1.3] text-link-on-dark">
                {tenant.lead}
              </p>
            </Layer>
            <Layer from={{ o: 0, x: -40 }} range={[0.25, 0.65]}>
              <p className="text-[17px] font-[350] leading-[1.6] text-on-dark">{tenant.body}</p>
            </Layer>
            <Layer
              from={{ o: 0, y: 90 }}
              range={[0.72, 0.98]}
              className="glass-dark mt-3 flex gap-[18px] !rounded-[24px] !px-7 !py-[26px]"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white text-ink"
                aria-hidden="true"
              >
                <Cloud size={22} strokeWidth={1.8} />
              </span>
              <div className="flex flex-col gap-1.5">
                <p className="text-[17px] font-semibold text-white">{tenant.cardTitle}</p>
                <p className="text-[15px] leading-[1.55] text-on-dark">{tenant.cardBody}</p>
              </div>
            </Layer>
          </Layer>

          <div
            className="relative mx-auto aspect-[560/520] w-full max-w-[560px] lg:-mt-10 pinned:h-[min(520px,calc(100svh-150px))] pinned:w-auto"
            role="group"
            aria-label={`${tenant.rings.outer}, ${tenant.rings.inner}, ${tenant.rings.core}`}
          >
            <Layer
              aria-hidden="true"
              from={{ o: 0, s: 0.3 }}
              range={[0.46, 0.8]}
              className={`${abs} border border-dashed border-white/30`}
              style={box("3.57%", "3.85%", "85.71%", "92.31%")}
            />
            <Layer
              aria-hidden="true"
              from={{ o: 0, s: 0.4 }}
              range={[0.24, 0.6]}
              className={`${abs} border border-white/15`}
              style={box("14.29%", "15.38%", "64.29%", "69.23%")}
            />
            <Layer
              aria-hidden="true"
              from={{ o: 0, s: 0 }}
              range={[0, 0.3]}
              className={abs}
              style={box("28.57%", "30.77%", "35.71%", "38.46%")}
            >
              <div
                className="h-full w-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, rgba(255,255,255,.6), rgba(255,255,255,0) 24%), var(--ex-orb)",
                  animation: "spin 40s linear infinite",
                }}
              />
            </Layer>
            <Layer
              aria-hidden="true"
              from={{ o: 0, s: 0.5 }}
              range={[0.1, 0.36]}
              className={`${abs} glass-dark`}
              style={box("33.93%", "40.38%", "32.14%", "34.62%")}
            />
            <Layer
              from={{ o: 0 }}
              range={[0.2, 0.36]}
              className="absolute text-center text-[14px] font-semibold text-white"
              style={{ left: "38.39%", top: "55%", width: "23.21%" }}
            >
              {tenant.rings.core}
            </Layer>
            <Layer
              from={{ o: 0, y: 12 }}
              range={[0.52, 0.66]}
              className={pill}
              style={{ left: "0", top: "57.69%" }}
            >
              {tenant.rings.inner}
            </Layer>
            <Layer
              from={{ o: 0, y: 12 }}
              range={[0.7, 0.84]}
              className={pill}
              style={{ left: "58.93%", top: "7.69%" }}
            >
              {tenant.rings.outer}
            </Layer>
          </div>
        </div>
      </div>
    </Scene>
  );
}
