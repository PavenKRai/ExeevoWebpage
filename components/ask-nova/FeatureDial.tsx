"use client";
import type { CSSProperties, KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { askNova, features, novaStages } from "@/content/askNova";
import { cn } from "@/components/ui/cn";
import { COUNT, useNova } from "./NovaProvider";
import { TierBadge } from "./TierBadge";

const C = 240; // dial centre (design box is 480x480)
const NODE_R = 212;
const TICKS = 65;

/** Detail card for the selected feature (centre of the dial on desktop, a plain card on small screens). */
function DetailCard({ className, style }: { className?: string; style?: CSSProperties }) {
  const { sel, setSel, openFeature } = useNova();
  const f = features[sel];
  return (
    <div className={cn("glass flex flex-col gap-2.5 rounded-[28px] p-[22px]", className)} style={style} aria-live="polite">
      <span className="num text-[12px] text-muted">{f.num} of 13 · {novaStages[f.stage].short}</span>
      <span className="text-[22px] font-[450] leading-[1.15] tracking-[-0.02em] text-heading">{f.name}</span>
      <div className="flex"><TierBadge tier={f.tier} /></div>
      <p className="line-clamp-3 text-[13px] leading-[1.5] text-muted">{f.desc}</p>
      <span className="flex items-center gap-1.5 text-[11.5px] text-body">
        <Image src="/microsoft/microsoft-square.png" alt="" width={11} height={11} />
        {f.built.join(" · ")}
      </span>
      <div className="mt-auto flex items-center pt-1 justify-between gap-2">
        <button type="button" onClick={() => openFeature(sel)} className="tlink relative !min-h-0 whitespace-nowrap text-[13px] after:absolute after:-inset-y-3 after:-inset-x-1 after:content-['']">{askNova.dial.read}</button>
        <span className="flex gap-2.5">
          <button type="button" aria-label={askNova.dial.prev} onClick={() => setSel((sel - 1 + COUNT) % COUNT)} className="btn btn-glass relative !size-[34px] !min-h-0 !p-0 after:absolute after:-inset-[5px] after:content-['']"><ChevronLeft size={16} strokeWidth={1.6} aria-hidden="true" /></button>
          <button type="button" aria-label={askNova.dial.next} onClick={() => setSel((sel + 1) % COUNT)} className="btn btn-glass relative !size-[34px] !min-h-0 !p-0 after:absolute after:-inset-[5px] after:content-['']"><ChevronRight size={16} strokeWidth={1.6} aria-hidden="true" /></button>
        </span>
      </div>
    </div>
  );
}

/**
 * The hero dial: 13 numbered nodes on a ring around a glass card that describes the selected feature. From 1024px; below
 * that the card sits above a scrolling row of the same 13 buttons.
 */
export function FeatureDial() {
  const { sel, setSel } = useNova();
  const move = (to: number) => {
    const n = (to + COUNT) % COUNT;
    setSel(n);
    document.getElementById(`dial-node-${n}`)?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const to: Record<string, number> = { ArrowRight: sel + 1, ArrowDown: sel + 1, ArrowLeft: sel - 1, ArrowUp: sel - 1, Home: 0, End: COUNT - 1 };
    if (!(e.key in to)) return;
    e.preventDefault();
    move(to[e.key]);
  };

  return (
    <div id="dial" className="fi min-w-0 scroll-mt-[120px]">
      {/* Small screens */}
      <div className="flex flex-col gap-4 lg:hidden">
        <DetailCard />
        <div role="group" aria-label="Features" onKeyDown={onKey} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {features.map((x, i) => (
            <button key={x.slug} type="button" aria-label={`Feature ${x.num}, ${x.name}`} aria-pressed={i === sel} onClick={() => setSel(i)} className={cn("num size-11 shrink-0 rounded-full border text-[12px] transition-all", i === sel ? "border-heading bg-heading text-white" : "border-heading/10 bg-white/80 text-body")}>
              {x.num}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop dial */}
      <div className="relative mx-auto hidden size-[480px] max-xl:scale-[.88] lg:block" role="group" aria-label="Features" onKeyDown={onKey}>
        <svg width="480" height="480" viewBox="0 0 480 480" aria-hidden="true" className="absolute inset-0">
          {Array.from({ length: TICKS }, (_, k) => {
            const major = k % 5 === 0;
            return <line key={k} x1="240" y1="6" x2="240" y2={major ? 20 : 14} stroke={major ? "rgba(29,38,45,0.35)" : "rgba(29,38,45,0.16)"} strokeWidth="1" transform={`rotate(${((k * 360) / TICKS).toFixed(2)} 240 240)`} />;
          })}
          <circle cx="240" cy="240" r="210" fill="none" stroke="rgba(29,38,45,.12)" strokeDasharray="2 6" />
          <circle cx="240" cy="240" r="150" fill="none" stroke="url(#nova-ring)" strokeWidth="1" />
          <defs>
            <linearGradient id="nova-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#DF1995" />
              <stop offset=".55" stopColor="#0762C8" />
              <stop offset="1" stopColor="#00C389" />
            </linearGradient>
          </defs>
        </svg>
        {features.map((x, i) => {
          const a = ((-90 + (i * 360) / COUNT) * Math.PI) / 180;
          const on = i === sel;
          return (
            <button
              key={x.slug}
              id={`dial-node-${i}`}
              type="button"
              aria-label={`Feature ${x.num}, ${x.name}`}
              aria-pressed={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setSel(i)}
              className={cn("num absolute size-11 rounded-full border text-[12px] transition-all duration-300", on ? "border-heading bg-heading text-white shadow-[0_0_0_6px_rgba(7,98,200,.12),0_12px_24px_-10px_rgba(29,38,45,.5)]" : "border-heading/10 bg-white/80 text-body shadow-[0_6px_14px_-10px_rgba(29,38,45,.4)] hover:bg-white")}
              style={{ left: C + NODE_R * Math.cos(a) - 22, top: C + NODE_R * Math.sin(a) - 22 }}
            >
              {x.num}
            </button>
          );
        })}
        <DetailCard className="absolute !backdrop-blur-[54px]" style={{ left: 104, top: C, width: 272, minHeight: 248, transform: "translateY(-50%)" }} />
      </div>
    </div>
  );
}
