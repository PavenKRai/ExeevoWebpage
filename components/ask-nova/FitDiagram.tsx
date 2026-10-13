import { ShieldCheck } from "lucide-react";
import { askNova } from "@/content/askNova";

const f = askNova.fits;
const line = "ln absolute hidden h-px lg:block";

/** "How it fits together": your data -> Ask-Nova Studio -> where your teams ask. Connector lines from 1024px; stacked cards below. */
export function FitDiagram() {
  return (
    <div className="relative mt-10 flex flex-col gap-10 lg:mt-0 lg:block lg:h-[430px]">
      <div className="lg:absolute lg:left-0 lg:top-12 lg:w-[23.4%]">
        <p className="mb-4 text-[13px] text-[#8FA0AA] lg:absolute lg:-top-12 lg:mb-0">{f.data.label}</p>
        <ul className="srl flex flex-col gap-4">
          {f.data.items.map((it) => (
            <li key={it.name} className="glass-dark flex min-h-[76px] items-center gap-3.5 rounded-[20px] px-5">
              <span aria-hidden="true" className="size-[9px] shrink-0 rounded-full bg-brand-blue" />
              <span className="flex flex-col gap-[3px]">
                <span className="text-[15.5px] font-semibold text-white">{it.name}</span>
                {"note" in it && <span className="text-[13px] text-on-dark-muted">{it.note}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {[86, 178, 270, 362].map((top, k) => (
        <span key={top} aria-hidden="true" className={`${line} ${k ? `d${Math.min(k, 3)}` : ""}`} style={{ left: "23.4%", top, width: "14.9%", background: "linear-gradient(90deg, rgba(7,98,200,.2), var(--ex-blue))" }} />
      ))}

      <div className="srg lg:absolute lg:left-[38.3%] lg:top-10 lg:w-[23.4%] lg:min-w-[260px]">
        <p className="mb-4 text-[13px] text-[#8FA0AA] lg:absolute lg:-top-[40px] lg:mb-0">{f.studio.label}</p>
        <div className="rounded-[30px] p-0.5 lg:h-[370px]" style={{ background: "linear-gradient(160deg, var(--ex-magenta), var(--ex-blue) 55%, var(--ex-green))" }}>
          <div className="flex h-full flex-col justify-between gap-6 rounded-[28px] bg-[#1D262D] p-[26px]">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="orb size-[34px]" />
              <span className="font-display text-[19px] font-semibold text-white">{f.studio.name}</span>
            </div>
            <ul className="flex flex-col gap-2">
              {f.studio.parts.map((p) => (
                <li key={p} className="flex h-[42px] items-center rounded-[13px] bg-white/[.07] px-4 text-[15px] text-white">{p}</li>
              ))}
              <li className="flex h-[42px] items-center rounded-[13px] border border-dashed border-white/[.28] px-4 text-[14.5px] text-[#DCE3E7]">{f.studio.third}</li>
            </ul>
            <p className="flex items-center gap-2.5 border-t border-white/10 pt-3.5 text-[13px] leading-[1.4] text-on-dark">
              <ShieldCheck aria-hidden="true" size={16} strokeWidth={1.8} className="shrink-0" />
              {f.studio.guard}
            </p>
          </div>
        </div>
      </div>

      {[80, 156, 232, 308, 384].map((top, k) => (
        <span key={top} aria-hidden="true" className={`${line} ${k ? `d${Math.min(k, 3)}` : ""}`} style={{ left: "61.7%", top, width: "14.9%", background: "linear-gradient(90deg, var(--ex-green), rgba(0,195,137,.2))" }} />
      ))}

      <div className="lg:absolute lg:left-[76.6%] lg:top-12 lg:w-[23.4%]">
        <p className="mb-4 text-[13px] text-[#8FA0AA] lg:absolute lg:-top-12 lg:mb-0">{f.ask.label}</p>
        <ul className="srr flex flex-col gap-3">
          {f.ask.items.map((it) => (
            <li key={it.name} className="glass-dark flex min-h-16 items-center justify-between gap-3 rounded-[18px] px-5 py-2">
              <span className="text-[15.5px] font-semibold text-white">{it.name}</span>
              <span className="shrink-0 text-[12.5px] text-on-dark-muted">{it.tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
