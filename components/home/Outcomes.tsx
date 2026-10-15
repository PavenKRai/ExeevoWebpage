import { home } from "@/content/home";

const pill = "rounded-full bg-white px-3 py-[7px] text-[12.5px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]";
const stage = "relative flex h-[210px] items-center overflow-hidden rounded-[20px] bg-porcelain p-6 shadow-[inset_0_0_0_1px_#E8EDF0]";
const auras = ["bg-brand-blue", "bg-magenta", "bg-brand-green"];

type Outcome = (typeof home.outcomes)[number];

function Cycle({ c }: { c: { left: string; right: string; flag: string } }) {
  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex justify-between text-[12.5px] text-muted"><span>{c.left}</span><span>{c.right}</span></div>
      <div className="flex gap-[5px]">
        {Array.from({ length: 10 }, (_, k) => (
          <span key={k} className="oc-seg h-[30px] flex-1 rounded-md" style={{ animationDelay: `${(k * 0.18).toFixed(2)}s` }} />
        ))}
      </div>
      <div className="oc-flag inline-flex items-center gap-2 self-start rounded-full bg-white px-3 py-2 text-[12.5px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]">
        <span className="size-[7px] rounded-full bg-brand-blue" />
        {c.flag}
      </div>
    </div>
  );
}

function Hcp({ h }: { h: { roles: readonly string[]; card: string; sub: string } }) {
  const tops = ["18.7%", "50%", "81.3%"];
  const lefts = ["14%", "14%", "17%"];
  const paths = ["M50,28 C120,28 140,75 200,75", "M50,75 L200,75", "M50,122 C120,122 140,75 200,75"];
  return (
    <div className="relative h-[150px] w-full">
      <svg viewBox="0 0 300 150" preserveAspectRatio="none" width="100%" height="150" aria-hidden="true" className="absolute inset-0">
        {paths.map((d) => (
          <path key={d} d={d} fill="none" stroke="#C3CDD3" vectorEffect="non-scaling-stroke" className="oc-dash" />
        ))}
      </svg>
      {h.roles.map((r, k) => (
        <span key={r} className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${pill}`} style={{ left: lefts[k], top: tops[k] }}>{r}</span>
      ))}
      <div className="absolute right-0 top-1/2 flex w-[42%] -translate-y-1/2 flex-col gap-1.5 rounded-[14px] bg-white px-3.5 py-3 shadow-[0_0_0_1px_var(--ex-hairline),0_16px_30px_-22px_rgba(29,38,45,.4)]">
        <span className="flex items-center gap-2"><span className="size-[22px] rounded-full" style={{ background: "linear-gradient(145deg,#E6EBEE,#C3CDD3)" }} /><span className="text-[13px] font-medium text-heading">{h.card}</span></span>
        <span className="text-[11.5px] leading-[1.4] text-muted">{h.sub}</span>
      </div>
    </div>
  );
}

function Launch({ l }: { l: { tools: readonly string[]; from: string; to: string } }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">{l.tools.map((t) => <span key={t} className={pill}>{t}</span>)}</div>
      <div className="relative h-1.5 overflow-hidden rounded-md bg-[#E6EBEE]"><span className="oc-bar absolute inset-y-0 left-0 rounded-md" style={{ background: "var(--ex-gradient)" }} /></div>
      <div className="flex justify-between text-[12.5px] text-muted"><span>{l.from}</span><span>{l.to}</span></div>
    </div>
  );
}

/** Three outcomes as glass cards, each with a small looping visual. */
export function Outcomes() {
  return (
    <section aria-label="Outcomes" className="relative overflow-hidden bg-white py-20 lg:py-[120px]">
      <div className="aura left-[10%] top-[30%] h-[360px] w-[560px] bg-brand-blue opacity-10 max-lg:hidden" aria-hidden="true" />
      <div className="aura right-[5%] top-[40%] h-[320px] w-[420px] bg-brand-green opacity-10 max-lg:hidden" aria-hidden="true" />
      <div className="hm-wrap">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(home.outcomes as readonly Outcome[]).map((o, n) => (
            <li key={o.statement} className="glass srg relative flex flex-col overflow-hidden rounded-[28px] p-3.5">
              <div className={stage}>
                <div className={`aura -right-10 -top-10 h-40 w-[220px] opacity-[.16] ${auras[n]}`} aria-hidden="true" />
                <div className="relative w-full" aria-hidden="true">
                  {"cycle" in o && <Cycle c={o.cycle} />}
                  {"hcp" in o && <Hcp h={o.hcp} />}
                  {"launch" in o && <Launch l={o.launch} />}
                </div>
              </div>
              <div className="flex flex-col gap-3 px-3.5 pb-[18px] pt-6">
                <h3 className="text-[24px] font-normal leading-[1.18] tracking-[-0.025em] text-heading">{o.statement}</h3>
                <p className="body-text">{o.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
