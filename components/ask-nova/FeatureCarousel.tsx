"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Glow } from "@/components/glass/Glow";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/components/ui/cn";
import { askNova, features, novaStages, stageFirst } from "@/content/askNova";
import { MAX_INDEX, VISIBLE, COUNT, useNova } from "./NovaProvider";
import { NovaIcon } from "./NovaIcon";
import { TierBadge } from "./TierBadge";

const rulerSpans = [2, 4, 2, 5];
const two = (n: number) => String(n).padStart(2, "0");

/** From 768px: three cards in view and the track moves; below that it is a swipeable row of all thirteen. */
function useWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

export function FeatureCarousel() {
  const { idx, setIdx } = useNova();
  const wide = useWide();
  const stage = features[idx].stage;

  return (
    <section
      id="features"
      aria-labelledby="cycle-title"
      className="relative overflow-x-clip bg-mist pb-[72px] pt-20"
    >
      <Glow
        parallax
        color="blue"
        className="-left-[120px] top-[360px] h-[420px] w-[560px] blur-[120px]"
        style={{ opacity: 0.22 }}
      />
      <Glow
        parallax
        color="magenta"
        className="-right-20 top-[260px] h-[420px] w-[460px] blur-[130px]"
        style={{ opacity: 0.14 }}
      />
      <div className="frame relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-10">
        <div className="srl flex max-w-[680px] flex-col gap-4">
          <p className="text-[15px] text-muted">{askNova.cycle.label}</p>
          <h2
            id="cycle-title"
            className="text-[clamp(28px,2.7vw,38px)] leading-[1.1] tracking-[-0.03em]"
          >
            {askNova.cycle.title}
          </h2>
        </div>
        <div
          role="group"
          aria-label={askNova.cycle.groupLabel}
          className="glass-light srr flex max-w-full gap-1 self-start overflow-x-auto rounded-[18px] p-[5px]"
        >
          {novaStages.map((s, k) => (
            <button
              key={s.short}
              type="button"
              aria-pressed={k === stage}
              onClick={() => setIdx(stageFirst[k])}
              className={cn(
                "h-[46px] shrink-0 rounded-[14px] px-[18px] text-[14.5px] font-semibold transition-colors",
                k === stage ? "bg-ink text-white" : "text-body hover:bg-slate/[.07]",
              )}
            >
              {s.short}
            </button>
          ))}
        </div>
      </div>

      <div className="nova-carousel relative mt-9 overflow-x-auto pl-[var(--ex-gutter)] max-md:snap-x md:overflow-hidden">
        <ul
          className="nova-track flex w-max gap-6"
          style={{ "--i": wide ? idx : 0 } as React.CSSProperties}
        >
          {features.map((f, i) => {
            const inView = !wide || (i >= idx && i < idx + VISIBLE);
            return (
              <li
                key={f.slug}
                aria-hidden={inView ? undefined : true}
                inert={!inView}
                className={cn(
                  "w-[var(--card)] shrink-0 max-md:snap-start",
                  i < 3 && "srt",
                  i === 1 && "d1",
                  i === 2 && "d2",
                )}
              >
                <div
                  className={cn(
                    "glass-light flex h-[330px] flex-col justify-between rounded-[28px] px-[26px] py-6 transition-opacity duration-500",
                    inView ? "opacity-100" : "opacity-35",
                  )}
                >
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-[34px] font-light leading-none tracking-[-0.04em] text-heading">
                        {f.num}
                      </span>
                      <TierBadge tier={f.tier} />
                    </div>
                    <span className="flex size-[42px] items-center justify-center rounded-[13px] bg-ink text-white">
                      <NovaIcon d={f.icon} size={20} />
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-sans text-[22px] leading-[1.15] tracking-[-0.02em]">
                        {f.name}
                      </h3>
                      <p className="text-[14.5px] leading-[1.5] text-muted">{f.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-hairline pt-3 text-[13px] text-muted">
                    <span>{novaStages[f.stage].who}</span>
                    <span>{novaStages[f.stage].long}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="frame relative mt-7 hidden items-end gap-10 md:flex">
        <div className="flex flex-1 flex-col gap-3.5">
          <div
            className="grid h-[30px] items-end gap-1.5"
            style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}
          >
            {features.map((f, i) => {
              const on = i >= idx && i < idx + VISIBLE;
              return (
                <button
                  key={f.slug}
                  type="button"
                  aria-label={`Show feature ${f.num}, ${f.name}`}
                  onClick={() => setIdx(i)}
                  className="flex h-[30px] items-end"
                >
                  <span
                    className={cn(
                      "nova-tick block w-full rounded-[3px]",
                      on ? "h-[22px] bg-ink" : "h-2.5 bg-[#B6C1C8]",
                    )}
                  />
                </button>
              );
            })}
          </div>
          <div
            className="grid gap-1.5 text-[13px] text-heading"
            style={{ gridTemplateColumns: rulerSpans.map((n) => `${n}fr`).join(" ") }}
            aria-hidden="true"
          >
            {novaStages.map((s) => (
              <span key={s.ruler} className="border-t border-[#B6C1C8] pt-2.5">
                {s.ruler}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span aria-live="polite" className="min-w-24 text-right text-[14px] text-heading">
            {two(idx + 1)}–{two(idx + VISIBLE)} of {COUNT}
          </span>
          <IconButton
            label={askNova.cycle.prev}
            disabled={idx === 0}
            onClick={() => setIdx(idx - 1)}
          >
            <ChevronLeft size={20} strokeWidth={1.8} />
          </IconButton>
          <IconButton
            label={askNova.cycle.next}
            disabled={idx === MAX_INDEX}
            onClick={() => setIdx(idx + 1)}
          >
            <ChevronRight size={20} strokeWidth={1.8} />
          </IconButton>
        </div>
      </div>
    </section>
  );
}
