import { microsoft } from "@/content/microsoft";
import { dotStyle } from "./colors";

/** "A backend the world already runs on": four figures with their sources. White ground. */
export function MsStats() {
  const s = microsoft.stats;
  return (
    <section aria-labelledby="ms-stats-title" className="relative overflow-hidden bg-white py-20 lg:py-[110px]">
      <div className="aura left-[5%] top-[30%] h-[360px] w-[560px] bg-brand-blue opacity-[.12] max-md:hidden" aria-hidden="true" />
      <div className="aura right-[5%] top-[40%] h-80 w-[460px] bg-violet opacity-10 max-md:hidden" aria-hidden="true" />
      <div className="wrap flex flex-col gap-11">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="ms-stats-title" className="h2 sr max-w-[760px]">{s.h2.light} <b>{s.h2.bold}</b></h2>
          <p className="lead sr max-w-[440px]">{s.lead}</p>
        </div>
        <ul className="glass srg grid grid-cols-1 overflow-hidden rounded-[28px] sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((x) => (
            <li key={x.value} className="sr flex flex-col gap-3.5 border-hairline px-[26px] py-7 max-lg:border-t first:max-lg:border-t-0 sm:max-lg:nth-[2]:border-t-0 lg:border-l lg:first:border-l-0">
              <span aria-hidden="true" className="dot" style={dotStyle(x.color)} />
              <span className="text-[clamp(44px,4.4vw,64px)] font-[250] leading-none tracking-[-0.045em] text-heading">{x.value}</span>
              <span className="body-text !text-body">{x.text}</span>
              <span className="mt-auto text-[12px] text-muted">{x.source}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
