"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { ShotDialog } from "./ShotViewer";

export type Slide = { src: string; label: string; alt: string; size: [number, number] };
type Text = { group: string; prev: string; next: string; goTo: string; enlarge: string; close: string };

const arrow = "btn btn-glass absolute top-1/2 z-20 size-12 -translate-y-1/2 !p-0 transition-opacity";
const arrowShow = "opacity-0 group-hover/shot:opacity-100 group-focus-within/shot:opacity-100 [@media(hover:none)]:opacity-100";

/** The capability frame as a carousel: label and counter in the title bar, slides that cross-fade, arrows that appear on hover, dots underneath and the expand button. Plays on its own until the user uses an arrow or a dot. */
export function ShotCarousel({ slides, text, interval = 3000 }: { slides: Slide[]; text: Text; interval?: number }) {
  const [i, setI] = useState(0);
  const [stopped, setStopped] = useState(false); // the user took over
  const [hold, setHold] = useState(false); // pointer or focus inside
  const [onScreen, setOnScreen] = useState(false);
  const [near, setNear] = useState(false); // close to the viewport: load every slide now (stacked, transparent images are otherwise never lazy-loaded)
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  const go = useCallback((to: number) => setI(((to % n) + n) % n), [n]);
  const step = useCallback((d: number) => { setStopped(true); setI((c) => (((c + d) % n) + n) % n); }, [n]);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const nearIo = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "900px 0px" });
    nearIo.observe(el);
    return () => {
      io.disconnect();
      nearIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduce || stopped || hold || open || !onScreen) return;
    const t = setInterval(() => go(i + 1), interval);
    return () => clearInterval(t);
  }, [reduce, stopped, hold, open, onScreen, i, go, interval]);

  useEffect(() => {
    if (!open) return;
    const key = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open, step]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  };
  const cur = slides[i];
  const goTo = (k: number) => text.goTo.replace("{n}", String(k + 1));

  const dots = (className: string) => (
    <div className={className}>
      {slides.map((s, k) => (
        <button key={s.src} type="button" aria-label={goTo(k)} aria-current={k === i ? "true" : undefined} onClick={() => { setStopped(true); go(k); }} className="flex min-h-11 min-w-11 items-center justify-center">
          <span aria-hidden="true" className={`block h-2 rounded-full transition-all duration-300 ${k === i ? "w-7 bg-heading" : "w-2 bg-[rgba(29,38,45,.22)]"}`} />
        </button>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      role="group"
      aria-roledescription="carousel"
      aria-label={text.group}
      onKeyDown={onKey}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="flex items-center gap-1.5 px-1.5 pb-2.5 pt-1">
        <span aria-hidden="true" className="size-[9px] rounded-full bg-hairline" />
        <span aria-hidden="true" className="size-[9px] rounded-full bg-hairline" />
        <span aria-hidden="true" className="size-[9px] rounded-full bg-hairline" />
        <span className="ml-2 min-w-0 flex-1 truncate text-[12px] text-muted">{cur.label}</span>
        <span aria-hidden="true" className="shrink-0 pr-1 text-[12px] tabular-nums text-muted">{i + 1} / {n}</span>
      </div>
      <div
        className="group/shot relative aspect-[16/10] overflow-hidden rounded-[14px]"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const x = touchX.current;
          touchX.current = null;
          if (x === null) return;
          const dx = e.changedTouches[0].clientX - x;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
      >
        <div aria-live={stopped ? "polite" : "off"} className="absolute inset-0">
          {slides.map((s, k) => (
            <Image
              unoptimized
              loading={near ? "eager" : "lazy"}
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={s.size[0]}
              height={s.size[1]}
              sizes="(min-width: 1024px) 700px, 100vw"
              aria-hidden={k === i ? undefined : true}
              className={`absolute inset-0 size-full object-cover object-left-top transition-opacity duration-500 ease-[var(--ex-ease-soft)] ${k === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        <button type="button" aria-label={text.enlarge} aria-haspopup="dialog" onClick={() => setOpen(true)} className="absolute inset-0 z-10 cursor-zoom-in rounded-[14px]">
          <span aria-hidden="true" className="glass absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full text-heading lg:opacity-70">
            <Maximize2 size={18} strokeWidth={1.8} />
          </span>
        </button>
        <button type="button" aria-label={text.prev} onClick={() => step(-1)} className={`${arrow} ${arrowShow} left-3`}>
          <ChevronLeft size={22} strokeWidth={1.6} />
        </button>
        <button type="button" aria-label={text.next} onClick={() => step(1)} className={`${arrow} ${arrowShow} right-3`}>
          <ChevronRight size={22} strokeWidth={1.6} />
        </button>
      </div>
      {dots("flex justify-center pt-1")}
      <AnimatePresence>
        {open && (
          <ShotDialog key="dialog" unoptimized src={cur.src} alt={cur.label} size={cur.size} closeLabel={text.close} onClose={close} reduce={!!reduce}>
            <button type="button" aria-label={text.prev} onClick={() => step(-1)} className="btn btn-glass absolute left-3 top-1/2 z-10 size-12 -translate-y-1/2 !p-0 sm:left-6">
              <ChevronLeft size={22} strokeWidth={1.6} />
            </button>
            <button type="button" aria-label={text.next} onClick={() => step(1)} className="btn btn-glass absolute right-3 top-1/2 z-10 size-12 -translate-y-1/2 !p-0 sm:right-6">
              <ChevronRight size={22} strokeWidth={1.6} />
            </button>
            {dots("absolute inset-x-0 bottom-1 flex justify-center")}
          </ShotDialog>
        )}
      </AnimatePresence>
    </div>
  );
}
