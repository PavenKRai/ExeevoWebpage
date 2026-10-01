import { ShieldCheck } from "lucide-react";
import { Layer, Parallax } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";

type Item = { name: string; region: string; body: string };

const orbBg =
  "radial-gradient(circle at 32% 28%, rgba(255,255,255,.6), rgba(255,255,255,0) 24%), var(--ex-orb)";

export function WhyHero({
  label,
  h1,
  intro,
  complianceTitle,
  compliance,
}: {
  label: string;
  h1: string;
  intro: string;
  complianceTitle: string;
  compliance: readonly Item[];
}) {
  const i = (n: number) => ({ "--i": n }) as React.CSSProperties;
  return (
    <Scene id="why-hero" pin={70} stageClassName="on-dark bg-ink text-[#EEF2F4]">
      <Layer
        aria-hidden="true"
        intro={0}
        from={{ o: 0, s: 0.9 }}
        className="pointer-events-none absolute -right-24 -top-28 h-[320px] w-[320px] lg:right-5 lg:-top-[120px] lg:h-[520px] lg:w-[520px]"
      >
        <Layer to={{ y: "-6vh", x: "2vw" }} className="h-full w-full">
          <div
            className="h-full w-full rounded-full opacity-90 blur-[8px]"
            style={{ background: orbBg, animation: "spin 40s linear infinite" }}
          />
        </Layer>
      </Layer>
      <Layer
        aria-hidden="true"
        intro={0.15}
        from={{ o: 0, s: 0.9 }}
        className="pointer-events-none absolute -right-8 -top-16 h-[260px] w-[260px] lg:right-[60px] lg:-top-10 lg:h-[420px] lg:w-[420px]"
      >
        <Layer to={{ y: "-12vh", x: "-1vw" }} className="h-full w-full">
          <div
            className="glass-dark h-full w-full rounded-full"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,.2), rgba(255,255,255,.03))",
            }}
          />
        </Layer>
      </Layer>
      <Parallax
        depth={30}
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-[55%] size-[360px] rounded-full bg-brand-blue/10 blur-3xl"
      />

      <div className="pb-16 pt-[130px] lg:min-h-[900px] lg:pb-0 lg:pt-[180px] pinned:flex pinned:h-full pinned:min-h-0 pinned:flex-col pinned:justify-center pinned:pb-4 pinned:pt-[clamp(112px,14svh,140px)]">
        <div className="frame">
          <Layer
            to={{ y: -24, o: 0.75 }}
            range={[0.3, 1]}
            className="flex max-w-[760px] flex-col gap-6 pinned:gap-[clamp(12px,2.2svh,24px)]"
          >
            <span className="rise text-[15px] text-on-dark-muted" style={i(0)}>
              {label}
            </span>
            <h1 className="rise [text-wrap:wrap]" style={i(1)}>
              {h1}
            </h1>
            <p
              className="rise max-w-[640px] text-[18px] font-[350] leading-[1.6] text-on-dark"
              style={i(2)}
            >
              {intro}
            </p>
          </Layer>
          <div className="mt-16 flex flex-col gap-[18px] lg:mt-[68px] pinned:mt-[clamp(24px,5svh,68px)]">
            <Layer intro={0.3} from={{ o: 0, y: 16 }}>
              <h2
                className="text-[15px] font-medium tracking-normal text-[#DCE3E7]"
                style={{ fontFamily: "var(--ex-font-text)", lineHeight: 1.6, letterSpacing: 0 }}
              >
                {complianceTitle}
              </h2>
            </Layer>
            <Layer as="ul" to={{ y: -20, o: 0.8 }} range={[0.4, 1]} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 pinned:[perspective:1400px]">
              {compliance.map((c, n) => (
                <Layer
                  as="li"
                  key={c.name}
                  intro={0.4 + n * 0.1}
                  from={{ o: 0, y: 60, s: 0.94, rot: "x 14deg" }}
                  className="glass-dark lift flex min-h-[270px] flex-col justify-between !rounded-[28px] !p-7 pinned:min-h-[clamp(200px,28svh,270px)] pinned:gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] bg-white/10 text-white"
                      aria-hidden="true"
                    >
                      <ShieldCheck size={20} strokeWidth={1.8} />
                    </span>
                    <Layer
                      as="span"
                      intro={0.7 + n * 0.1}
                      from={{ o: 0, x: 10 }}
                      className="text-[13px] text-on-dark-muted"
                    >
                      {c.region}
                    </Layer>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="[text-wrap:wrap] text-[26px] leading-[1.1] tracking-[-0.02em]">
                      {c.name}
                    </h3>
                    <p className="text-[14px] leading-[1.5] text-on-dark">{c.body}</p>
                  </div>
                </Layer>
              ))}
            </Layer>
          </div>
        </div>
      </div>
    </Scene>
  );
}
