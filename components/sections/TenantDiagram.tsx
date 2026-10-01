import { Cloud, Lock, X } from "lucide-react";
import type { ReactNode } from "react";
import { Layer } from "../scene/Layer";
import { home } from "@/content/site";
import "../../app/styles/home.css";

type Diagram = { boundary: string; chips: readonly string[]; external: string; note?: string };

const burst = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6.5 6.5l2.2 2.2M15.3 15.3l2.2 2.2M6.5 17.5l2.2-2.2M15.3 8.7l2.2-2.2" />
  </svg>
);
const icons: { node: ReactNode; color: string }[] = [
  { node: <Lock aria-hidden="true" size={20} strokeWidth={1.8} />, color: "text-brand-blue" },
  { node: burst, color: "text-magenta" },
  { node: <Cloud aria-hidden="true" size={20} strokeWidth={1.8} />, color: "text-[color:var(--ex-green-ink)]" },
];

function Chip({ i, label, className, top, scrub }: { i: number; label: string; className?: string; top?: number; scrub?: boolean }) {
  const ic = icons[i % icons.length];
  const Wrap = scrub ? Layer : "li";
  const extra = scrub ? { as: "li" as const, from: { o: 0, x: -170, s: 0.9 }, range: [0.3 + i * 0.12, 0.5 + i * 0.12] as [number, number] } : {};
  return (
    <Wrap {...extra} style={top === undefined ? undefined : { top }} className={`glass-light flex h-16 items-center gap-3 rounded-[18px] px-[18px] text-[15px] font-[550] text-heading ${className ?? ""}`}>
      <span className={`flex ${ic.color}`}>{ic.node}</span>
      {label}
    </Wrap>
  );
}

/** Design-space (600x460) tenant boundary diagram; stacks into a flow layout on phones. */
export function TenantDiagram({ diagram = home.privacy.diagram }: { diagram?: Diagram }) {
  return (
    <>
      <div className="hm-stage hm-tenant-stage max-[699px]:hidden">
        <div className="hm-canvas">
          <Layer aria-hidden="true" from={{ o: 0, s: 0.8 }} range={[0, 0.3]} className="absolute left-[30px] top-[30px] h-[400px] w-[420px] rounded-[34px] border-[1.5px] border-dashed border-brand-blue" />
          <Layer from={{ o: 0 }} range={[0.1, 0.3]} className="absolute left-[54px] top-3 bg-mist px-2.5 text-[13px] font-[550] text-brand-blue">{diagram.boundary}</Layer>
          <Layer aria-hidden="true" from={{ o: 0, s: 0.3 }} range={[0.1, 0.45]} className="absolute left-[130px] top-[120px] size-[220px]">
            <span className="hm-orb block size-full opacity-[.85] blur-[18px]" />
          </Layer>
          <ul>
            {diagram.chips.map((c, i) => (
              <Chip key={c} i={i} label={c} top={84 + i * 84} scrub className="absolute left-[70px] w-[340px]" />
            ))}
          </ul>
          {diagram.note && (
            <Layer as="p" from={{ o: 0 }} range={[0.6, 0.72]} className="absolute left-[70px] top-[340px] w-[340px] text-[13px] leading-[1.5] text-muted">
              {diagram.note}
            </Layer>
          )}
          <Layer aria-hidden="true" from={{ o: 0, s: 0.05 }} range={[0.66, 0.82]} className="absolute left-[410px] top-[199px] w-[84px] origin-left border-t-[1.5px] border-dashed border-[color:var(--hm-dash)]" />
          <Layer aria-hidden="true" from={{ o: 0, s: 0.3 }} range={[0.78, 0.88]} className="absolute left-[436px] top-[186px] grid size-7 place-items-center rounded-full bg-slate text-white">
            <X size={14} strokeWidth={2.2} />
          </Layer>
          <Layer from={{ o: 1 }} to={{ o: 0.4, x: 26, s: 0.94 }} range={[0.8, 1]} className="absolute left-[494px] top-40 flex h-20 w-[106px] items-center justify-center rounded-[18px] border border-[color:var(--hm-line)] px-2.5 text-center text-[13px] leading-[1.35] text-muted">
            {diagram.external}
          </Layer>
        </div>
      </div>

      <div className="min-[700px]:hidden">
        <div className="relative rounded-[28px] border-[1.5px] border-dashed border-brand-blue px-4 pb-5 pt-7">
          <span className="absolute -top-2.5 left-5 bg-mist px-2.5 text-[13px] font-[550] text-brand-blue">{diagram.boundary}</span>
          <span aria-hidden="true" className="hm-orb absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 opacity-[.85] blur-[18px]" />
          <ul className="relative flex flex-col gap-3">
            {diagram.chips.map((c, i) => (
              <Chip key={c} i={i} label={c} className="!h-auto min-h-16 py-3" />
            ))}
          </ul>
          {diagram.note && <p className="relative mt-4 text-[13px] leading-[1.5] text-muted">{diagram.note}</p>}
        </div>
        <div aria-hidden="true" className="relative mx-auto h-14 w-0 border-l-[1.5px] border-dashed border-[color:var(--hm-dash)]">
          <span className="absolute left-0 top-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-slate text-white">
            <X size={14} strokeWidth={2.2} />
          </span>
        </div>
        <div className="mx-auto flex h-20 w-40 items-center justify-center rounded-[18px] border border-[color:var(--hm-line)] px-2.5 text-center text-[13px] text-muted">
          {diagram.external}
        </div>
      </div>
    </>
  );
}
