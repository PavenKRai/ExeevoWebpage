import type { CSSProperties, ReactNode } from "react";
import { platformPage } from "@/content/platform";

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const svg = (d: string) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const deviceIcons: ReactNode[] = [
  svg("M3 5h18v12H3z M8 21h8 M12 17v4"),
  svg("M6 3h12v18H6z M11 18h2"),
  svg("M8 2h8v20H8z M11 18h2"),
  svg("M3 3l18 18 M8.5 16.5a5 5 0 0 1 7 0 M5 12.9a10 10 0 0 1 5.2-2.8 M19 12.9a10 10 0 0 0-2.3-1.6 M1.4 9a15 15 0 0 1 4.3-2.6 M22.6 9A15 15 0 0 0 12 5c-.9 0-1.8.1-2.7.2"),
];

/** Platform hero: "Everything in one view", the lead, and the "wherever your teams work" device chip. */
export function PlatformHero() {
  const p = platformPage;
  return (
    <section className="relative overflow-hidden bg-porcelain pb-[70px] pt-[128px] lg:pt-[160px]">
      <div className="gridbg" aria-hidden="true" />
      <div className="aura -right-20 top-10 h-[500px] w-[540px] bg-brand-blue opacity-[.15] max-lg:hidden" aria-hidden="true" />
      <div className="aura right-[330px] top-[260px] h-[360px] w-[380px] bg-brand-green opacity-[.12] max-lg:hidden" aria-hidden="true" />
      <div className="wrap flex flex-wrap items-end justify-between gap-8">
        <div className="flex max-w-[720px] flex-col gap-[26px]">
          <h1 className="h1 rise" style={i(1)}>
            {p.h1.light}
            <br />
            <b>{p.h1.bold}</b>
          </h1>
          <p className="lead rise max-w-[560px]" style={i(2)}>{p.lead}</p>
        </div>
        <div className="glass rise flex flex-col gap-3 rounded-[22px] px-5 py-[18px]" style={i(3)}>
          <p className="text-[13px] text-muted">{p.devices.title}</p>
          <ul className="flex flex-wrap gap-1.5">
            {p.devices.items.map((d, k) => (
              <li key={d} className="inline-flex items-center gap-[7px] rounded-full bg-white px-3 py-[7px] text-[13px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]">
                {deviceIcons[k]}
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
