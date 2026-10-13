"use client";
import { useRef, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { askNova, features, novaStages } from "@/content/askNova";
import { cn } from "@/components/ui/cn";
import { COUNT, useNova } from "./NovaProvider";
import { TierBadge } from "./TierBadge";

const BOX = 580;
const CENTER = 290;
const NODE_R = 222;
const TICK_R = 258;
const TICKS = 65;
const pct = (n: number) => `${((n / BOX) * 100).toFixed(3)}%`;

/** The hero dial: 13 numbered nodes around the sphere, 65 ticks lit for the selected feature's stage. From 768px; below it shows a row of buttons. */
export function FeatureDial() {
  const { sel, setSel, setIdx } = useNova();
  const f = features[sel];
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (to: number) => {
    const n = (to + COUNT) % COUNT;
    setSel(n);
    refs.current[n]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const to: Record<string, number> = {
      ArrowRight: sel + 1,
      ArrowDown: sel + 1,
      ArrowLeft: sel - 1,
      ArrowUp: sel - 1,
      Home: 0,
      End: COUNT - 1,
    };
    if (!(e.key in to)) return;
    e.preventDefault();
    move(to[e.key]);
  };

  const card = (
    <div key={sel} className="nova-swap flex flex-col items-center gap-2.5">
      <span className="text-[13px] tracking-[.02em] text-on-dark-muted">
        {f.num} of 13 · {novaStages[f.stage].long}
      </span>
      <span className="font-display text-[23px] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
        {f.name}
      </span>
      <TierBadge tier={f.tier} onDark size="sm" />
    </div>
  );

  return (
    <div className="flex min-w-0 flex-col items-center gap-3">
      {/* Mobile: the selected feature on the sphere, with a scrolling row of the 13 numbers */}
      <div
        className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center md:hidden"
        aria-hidden={false}
      >
        <span aria-hidden="true" className="orb absolute inset-[8%] opacity-85" />
        <div className="glass-dark relative flex size-[84%] flex-col items-center justify-center rounded-full bg-ink/70 px-8 text-center">
          {card}
        </div>
      </div>
      <div
        role="group"
        aria-label="Features"
        onKeyDown={onKey}
        className="-mx-5 flex w-[calc(100%+40px)] gap-2 overflow-x-auto px-5 pb-1 md:hidden"
      >
        {features.map((x, i) => (
          <button
            key={x.slug}
            type="button"
            aria-label={`Feature ${x.num}, ${x.name}`}
            aria-pressed={i === sel}
            onClick={() => setSel(i)}
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white",
              i === sel ? "nova-ring" : "glass-dark",
            )}
          >
            {x.num}
          </button>
        ))}
      </div>

      {/* Desktop and tablet: the dial */}
      <div className="relative hidden h-[464px] w-[464px] max-w-full md:block">
        <div
          className="absolute left-0 top-0 h-[580px] w-[580px] origin-top-left scale-[.8]"
          role="group"
          aria-label="Features"
          onKeyDown={onKey}
        >
          {Array.from({ length: TICKS }, (_, k) => {
            const deg = -90 + (k * 360) / TICKS;
            const a = (deg * Math.PI) / 180;
            const lit = features[Math.floor(k / 5)].stage === f.stage;
            return (
              <span
                key={k}
                aria-hidden="true"
                className={cn(
                  "nova-tick nova-tickin absolute h-2 w-px",
                  lit
                    ? k % 5 === 0
                      ? "bg-white"
                      : "bg-white/70"
                    : k % 5 === 0
                      ? "bg-white/35"
                      : "bg-white/[.14]",
                )}
                style={
                  {
                    left: pct(CENTER + TICK_R * Math.cos(a) - 0.5),
                    top: pct(CENTER + TICK_R * Math.sin(a) - 4),
                    rotate: `${(deg + 90).toFixed(2)}deg`,
                    "--n": k,
                  } as React.CSSProperties
                }
              />
            );
          })}
          <span
            aria-hidden="true"
            className="absolute rounded-full border border-white/[.14]"
            style={{ left: pct(68), top: pct(68), width: pct(444), height: pct(444) }}
          />
          <span
            aria-hidden="true"
            className="orb absolute opacity-85"
            style={{ left: pct(170), top: pct(170), width: pct(240), height: pct(240) }}
          />
          <div
            className="glass-dark absolute flex flex-col items-center justify-center gap-2.5 rounded-full bg-ink/70 px-[6%] text-center"
            style={{ left: pct(150), top: pct(150), width: pct(280), height: pct(280) }}
            aria-live="polite"
          >
            {card}
          </div>
          {features.map((x, i) => {
            const a = ((-90 + (i * 360) / COUNT) * Math.PI) / 180;
            const on = i === sel;
            return (
              <button
                key={x.slug}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                aria-label={`Feature ${x.num}, ${x.name}`}
                aria-pressed={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setSel(i)}
                className={cn(
                  "nova-node nova-pop absolute flex size-11 items-center justify-center rounded-full text-[13px] font-semibold text-white",
                  on ? "nova-ring scale-[1.18]" : "glass-dark hover:bg-white/10",
                )}
                style={
                  {
                    left: pct(CENTER + NODE_R * Math.cos(a) - 22),
                    top: pct(CENTER + NODE_R * Math.sin(a) - 22),
                    "--n": i,
                  } as React.CSSProperties
                }
              >
                {x.num}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex w-[464px] max-w-full items-center justify-center gap-4">
        <button
          type="button"
          aria-label={askNova.dial.prev}
          onClick={() => setSel((sel - 1 + COUNT) % COUNT)}
          className="glass-dark nav-link nav-link-dark flex size-11 items-center justify-center rounded-[15px] text-white"
        >
          <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.8} />
        </button>
        <a
          href="#features"
          onClick={() => setIdx(sel)}
          className="inline-flex min-h-11 items-center border-b border-link-on-dark/60 pb-0.5 text-[14px] font-medium text-[#DCE3E7]"
        >
          {askNova.dial.read}
        </a>
        <button
          type="button"
          aria-label={askNova.dial.next}
          onClick={() => setSel((sel + 1) % COUNT)}
          className="glass-dark nav-link nav-link-dark flex size-11 items-center justify-center rounded-[15px] text-white"
        >
          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
