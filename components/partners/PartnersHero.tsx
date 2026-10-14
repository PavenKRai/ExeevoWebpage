import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Glow } from "@/components/glass/Glow";
import { partnersPage } from "@/content/partners";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

// Orbit rings in the design's 600x600 space: radius, ring colour token and the dots on it (angles in degrees).
const rings = [
  { r: 250, color: "var(--ex-on-dark-muted)", dots: [-35] },
  { r: 195, color: "var(--ex-green)", dots: [-27, 150] },
  { r: 140, color: "var(--ex-magenta)", dots: [-70, -17, 40, 87, 135, 200, 250].map((d) => d) },
  { r: 85, color: "var(--ex-link-on-dark)", dots: [118] },
] as const;
const dot = (r: number, deg: number) => [300 + r * Math.cos((deg * Math.PI) / 180), 300 + r * Math.sin((deg * Math.PI) / 180)] as const;
const pillColors = ["var(--ex-on-dark-muted)", "var(--ex-green)", "var(--ex-magenta)", "var(--ex-link-on-dark)"] as const;

/** Dark hero with the orbit diagram (Compliance, Data, Implementation and Technology rings around the Exeevo mark). */
export function PartnersHero() {
  const p = partnersPage;
  return (
    <section className="on-dark relative overflow-hidden bg-ink pb-24 text-[#EEF2F4] lg:pb-32">
      <div aria-hidden="true" className="co-grid-bg pointer-events-none absolute inset-0" />
      <div className="frame relative grid items-center gap-12 pt-[128px] lg:grid-cols-[minmax(0,660px)_1fr] lg:gap-6 lg:pt-[150px]">
        <div className="flex min-w-0 flex-col gap-6">
          <p className="rise text-[15px] text-on-dark-muted" style={i(0)}>{p.label}</p>
          <h1 className="rise text-[clamp(38px,4.2vw,60px)] leading-[1.05] tracking-[-0.035em]" style={i(1)}>{p.h1}</h1>
          <p className="rise text-[18px] font-[350] leading-[1.65] text-on-dark" style={i(2)}>{p.intro}</p>
          <p className="rise text-[16px] leading-[1.65] text-on-dark-muted" style={i(3)}>{p.body}</p>
          <div className="rise flex flex-wrap gap-3 pt-1.5" style={i(4)}>
            <Button href="#directory" size="hero">{p.browse}</Button>
            <a href="#become" className="glass-dark nav-link nav-link-dark inline-flex h-14 items-center rounded-[17px] px-6 text-[16px] font-medium leading-[normal] text-white">{p.becomeLabel}</a>
          </div>
        </div>
        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-[600px]">
          <Glow parallax color="gradient" className="left-[20%] top-[20%] h-[60%] w-[60%] blur-[110px]" style={{ opacity: 0.45 }} />
          <svg viewBox="0 0 600 600" className="absolute inset-0 size-full overflow-visible">
            {Array.from({ length: 60 }, (_, k) => {
              const a = (k * 6 * Math.PI) / 180;
              const long = k % 6 === 0;
              const [x1, y1] = [300 + 290 * Math.cos(a), 300 + 290 * Math.sin(a)];
              const [x2, y2] = [300 + (long ? 278 : 284) * Math.cos(a), 300 + (long ? 278 : 284) * Math.sin(a)];
              return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeOpacity={long ? 0.4 : 0.18} />;
            })}
            {rings.map((ring) => (
              <g key={ring.r}>
                <circle cx="300" cy="300" r={ring.r} fill="none" stroke={ring.color} strokeOpacity=".55" strokeWidth="1.5" />
                {ring.dots.map((d) => {
                  const [cx, cy] = dot(ring.r, d);
                  return <circle key={d} cx={cx} cy={cy} r="7" fill={ring.color} stroke="var(--ex-ink)" strokeWidth="3" />;
                })}
              </g>
            ))}
          </svg>
          {p.orbit.map((name, n) => (
            <span key={name} className="absolute left-[40%] flex h-[30px] items-center gap-2 whitespace-nowrap rounded-full border border-white/[.14] bg-ink/80 px-3 text-[12.5px] font-semibold text-white" style={{ top: `${((35 + n * 55) / 600) * 100}%` }}>
              <span className="size-2 rounded-full" style={{ background: pillColors[n] }} />
              {name}
            </span>
          ))}
          <span className="glass-dark absolute left-[42.3%] top-[42.3%] flex size-[15.3%] items-center justify-center rounded-full border-[1.5px] border-white/60 bg-ink/60">
            <Image src="/brand/exeevo-icon.png" alt="" width={42} height={42} className="size-[46%]" />
          </span>
        </div>
      </div>
    </section>
  );
}
