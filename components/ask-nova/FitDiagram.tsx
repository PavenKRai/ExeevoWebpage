"use client";
import { useReducedMotion } from "motion/react";
import { ShieldCheck, Check } from "lucide-react";
import { askNova } from "@/content/askNova";
import "@/app/styles/ask-nova.css";

const f = askNova.fits;
// Connector geometry in the design's 1000x440 space.
const LEFT_Y = [80, 150, 220, 290];
const RIGHT_Y = [60, 130, 200, 270, 340];
const curve = (x1: number, y1: number, x2: number, y2: number) => `M${x1},${y1} C${x1 + 70},${y1} ${x2 - 70},${y2} ${x2},${y2}`;

function Dots({ paths, color, from, dur, step, opacity }: { paths: string[]; color: string; from: number; dur: number; step: number; opacity: number }) {
  return paths.map((d, i) => (
    <circle key={d} r="2.4" fill={color} opacity={opacity}>
      <animateMotion dur={`${(dur + i * step).toFixed(2)}s`} begin={`-${(from * i).toFixed(2)}s`} repeatCount="indefinite" path={d} />
    </circle>
  ));
}

function Pulse({ d, color, times }: { d: string; color: string; times: [number, number] }) {
  const [a, b] = times;
  return (
    <circle r="5" fill={color} opacity="0">
      <animateMotion dur="12s" repeatCount="indefinite" path={d} keyPoints="0;0;1;1" keyTimes={`0;${a};${b};1`} calcMode="linear" />
      <animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={`0;${a};${a + 0.005};${b};${b + 0.005};1`} />
    </circle>
  );
}

const nodeCls = "absolute left-0 z-[2] flex h-[52px] w-[24%] flex-col justify-center gap-0.5 rounded-[14px] bg-white px-3.5 text-[14px] text-heading shadow-[0_0_0_1px_#E1E6EA]";

/**
 * "How it fits together": a 12s looping demo. A cursor clicks Microsoft Teams, the request flows into Ask-Nova Studio (the
 * Agents chip lights), data lights up on the left, and the answer flows back with a reply bubble. Under reduced motion
 * everything stays at rest (no cursor, no moving dots).
 */
export function FitDiagram() {
  const reduce = useReducedMotion();
  const toHub = LEFT_Y.map((y) => curve(240, y, 380, 220));
  const toAsk = RIGHT_Y.map((y) => curve(620, 220, 760, y));
  return (
    <div className="card srg flex flex-col gap-7 overflow-hidden bg-porcelain p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex max-w-[640px] flex-col gap-2">
          <h3 className="h3 !text-[26px] !font-normal">{f.title}</h3>
          <p className="body-text">{f.body}</p>
        </div>
        <p className="label inline-flex items-center gap-2" aria-hidden="true">
          <span className="dot !size-2" style={{ ["--c" as string]: "var(--ex-blue)" }} />{f.legend.request}
          <span className="dot ml-2.5 !size-2" style={{ ["--c" as string]: "var(--ex-green)" }} />{f.legend.answer}
        </p>
      </div>

      {/* Desktop: the diagram. */}
      <div className="hidden overflow-x-auto px-3 pb-1 pt-3 lg:block">
        <div role="img" aria-label={f.alt} className="relative h-[440px] min-w-[900px]">
          <div aria-hidden="true" className="absolute inset-x-[-12px] bottom-[30px] top-[22px] rounded-[26px] border-[1.5px] border-dashed border-[#B6C1C8]" />
          <div aria-hidden="true" className="absolute inset-0">
            <span className="label absolute left-0 top-0">{f.data.label}</span>
            <span className="label absolute left-[38%] top-0 w-[24%] text-center">{f.studio.label}</span>
            <span className="label absolute right-0 top-0">{f.ask.label}</span>

            <svg width="100%" height="440" viewBox="0 0 1000 440" preserveAspectRatio="none" className="absolute inset-0 z-[1] overflow-visible">
              {[...toHub, ...toAsk].map((d) => (
                <path key={d} d={d} fill="none" stroke="#C3CDD3" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              ))}
              {!reduce && (
                <>
                  <Dots paths={toHub} color="#9AA7AF" from={0.7} dur={3.2} step={0.3} opacity={0.7} />
                  <Dots paths={toAsk} color="#9AA7AF" from={0.6} dur={3} step={0.25} opacity={0.7} />
                  <Pulse d="M760,130 C690,130 690,220 620,220" color="#0762C8" times={[0.16, 0.27]} />
                  <Pulse d="M380,220 C310,220 310,80 240,80" color="#0762C8" times={[0.29, 0.4]} />
                  <Pulse d="M380,220 C310,220 310,150 240,150" color="#0762C8" times={[0.29, 0.4]} />
                  <Pulse d="M240,80 C310,80 310,220 380,220" color="#00C389" times={[0.48, 0.58]} />
                  <Pulse d="M240,150 C310,150 310,220 380,220" color="#00C389" times={[0.48, 0.58]} />
                  <Pulse d="M620,220 C690,220 690,130 760,130" color="#00C389" times={[0.6, 0.71]} />
                </>
              )}
            </svg>

            {f.data.items.map((it, n) => (
              <div key={it.name} className={`${nodeCls} ${n === 0 ? "hw-crm" : n === 1 ? "hw-db" : ""}`} style={{ top: 54 + n * 70 }}>
                {it.name}
                {"note" in it && <span className="text-[11.5px] leading-[1.3] text-muted">{it.note}</span>}
              </div>
            ))}

            <div className="hw-hub glass absolute left-[38%] top-[90px] z-[2] flex h-[260px] w-[24%] flex-col justify-center gap-3 rounded-[26px] p-5">
              <div className="aura left-5 top-10 size-[180px] bg-[#7A3FC0] opacity-[.16]" aria-hidden="true" />
              <span className="label relative inline-flex items-center gap-2 !text-heading"><span className="dot dot-ai" />{f.studio.name}</span>
              <div className="relative grid grid-cols-3 gap-1.5">
                {f.studio.parts.map((p, n) => (
                  <span key={p} className={`rounded-xl bg-white px-0.5 py-[11px] text-center text-[13px] text-heading shadow-[0_0_0_1px_#E1E6EA] ${n === 2 ? "hw-agent" : ""}`}>{p}</span>
                ))}
              </div>
              <span className="relative rounded-xl border border-dashed border-[#9AA7AF] p-2.5 text-center text-[13px] text-body">{f.studio.third}</span>
            </div>

            {f.ask.items.map((it, n) => (
              <div key={it.name} className={`absolute left-[76%] z-[2] flex h-[52px] w-[24%] items-center justify-between gap-2 rounded-[14px] bg-white px-3.5 text-[14px] text-heading shadow-[0_0_0_1px_#E1E6EA] ${n === 1 ? "hw-teams" : ""}`} style={{ top: 34 + n * 70 }}>
                {it.name}
                <span className={`text-[10.5px] ${n === 0 ? "text-heading" : "text-muted"}`}>{it.tag}</span>
              </div>
            ))}

            <div className="hw-reply glass absolute right-[calc(24%+14px)] top-24 z-[5] flex w-[190px] items-center gap-2 rounded-[14px] px-3 py-2.5">
              <span className="flex size-[22px] items-center justify-center rounded-[7px] bg-[#E3F7EF] text-green-ink"><Check size={14} strokeWidth={2} /></span>
              <span className="text-[12px] leading-[1.35] text-heading">{f.reply}</span>
            </div>
            <div className="absolute bottom-3 left-1/2 z-[3] inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#E3F7EF] px-3.5 py-2 text-[13px] text-[#006B4B]">
              <ShieldCheck size={15} strokeWidth={1.8} aria-hidden="true" />{f.studio.guard}
            </div>
            <div className="hw-cur pointer-events-none absolute left-[96%] top-[420px] z-[6] size-[22px] opacity-0">
              <span className="hw-rip absolute -left-3.5 -top-3.5 size-7 rounded-full bg-brand-blue/35 opacity-0" />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#1D262D" stroke="#fff" strokeWidth="1.2"><path d="M5 3l14 8-6 1.5L10 19z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Small screens: three stacked groups. */}
      <div className="grid gap-5 lg:hidden">
        {[{ label: f.data.label, items: f.data.items.map((i) => ({ name: i.name, tag: "note" in i ? i.note : undefined })) }, { label: f.studio.label, items: [{ name: f.studio.name, tag: f.studio.parts.join(", ") }, { name: f.studio.third }] }, { label: f.ask.label, items: f.ask.items.map((i) => ({ name: i.name, tag: i.tag })) }].map((g) => (
          <div key={g.label} className="flex flex-col gap-2">
            <p className="label">{g.label}</p>
            <ul className="flex flex-col gap-2">
              {g.items.map((it) => (
                <li key={it.name} className="flex flex-wrap items-center justify-between gap-2 rounded-[14px] bg-white px-3.5 py-3 text-[14px] text-heading shadow-[0_0_0_1px_#E1E6EA]">
                  {it.name}
                  {it.tag && <span className="text-[12px] text-muted">{it.tag}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="inline-flex items-center gap-2 self-start rounded-full bg-[#E3F7EF] px-3.5 py-2 text-[13px] text-[#006B4B]"><ShieldCheck size={15} strokeWidth={1.8} aria-hidden="true" />{f.studio.guard}</p>
      </div>
    </div>
  );
}
