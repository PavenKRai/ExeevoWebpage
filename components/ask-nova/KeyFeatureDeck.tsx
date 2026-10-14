"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/components/ui/cn";
import { askNova, keyFeatures } from "@/content/askNova";
import { NovaIcon } from "./NovaIcon";

// Position of a card relative to the current one: front, behind (two steps), and tucked away.
const POSE = [
  { tf: "translate3d(0,0,0) rotateY(0deg)", op: 1, z: 4, blur: "none" },
  { tf: "translate3d(36px,-22px,-110px) rotateY(-7deg)", op: 0.6, z: 3, blur: "blur(1px)" },
  { tf: "translate3d(72px,-44px,-220px) rotateY(-12deg)", op: 0.3, z: 2, blur: "blur(2px)" },
  { tf: "translate3d(-40px,40px,-60px) rotateY(6deg)", op: 0, z: 1, blur: "blur(4px)" },
] as const;

/** The four Ask-Nova Studio key features as a 3D stack of cards. Mobile shows the front card only. */
export function KeyFeatureDeck() {
  const [cur, setCur] = useState(0);
  const n = keyFeatures.length;
  return (
    <div className="srr relative">
      <p className="mb-3 text-[14px] font-medium text-[#8FA0AA]">{askNova.studio.deckLabel}</p>
      <div className="relative h-[400px] max-md:h-[340px] md:[perspective:1600px]" style={{ transformStyle: "preserve-3d" }}>
        {keyFeatures.map((k, i) => {
          const off = (i - cur + n) % n;
          const p = POSE[off];
          return (
            <button
              key={k.t}
              type="button"
              tabIndex={off === 0 ? 0 : -1}
              aria-hidden={off === 0 ? undefined : true}
              aria-label={`Show ${k.t}`}
              onClick={() => setCur(off === 0 ? (cur + 1) % n : i)}
              className={cn("nova-deck-card glass-dark absolute left-0 top-0 flex h-[360px] w-full max-w-[430px] flex-col justify-between rounded-[30px] p-[30px] text-left text-white max-md:h-[340px]", off !== 0 && "max-md:hidden")}
              style={{ transform: p.tf, opacity: p.op, zIndex: p.z, filter: p.blur, pointerEvents: off <= 1 ? "auto" : "none" }}
            >
              <span className={cn("flex w-full items-center justify-between transition-opacity duration-500", off === 0 ? "opacity-100" : "opacity-0")}>
                <span className="flex size-12 items-center justify-center rounded-[15px] bg-white/10"><NovaIcon d={k.icon} size={24} /></span>
                <span className="font-display text-[14px] text-on-dark-muted">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              </span>
              <span className={cn("flex flex-col gap-3.5 transition-opacity duration-500", off === 0 ? "opacity-100" : "opacity-0")}>
                <span className="font-display text-[clamp(22px,1.9vw,26px)] font-semibold leading-[1.12] tracking-[-0.025em]">{k.t}</span>
                <span className="text-[16px] leading-[1.55] text-on-dark">{k.d}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-[26px] flex w-full max-w-[430px] items-center justify-between">
        <IconButton label={askNova.studio.deckPrev} onClick={() => setCur((cur - 1 + n) % n)}><ChevronLeft size={20} strokeWidth={1.8} /></IconButton>
        <div aria-hidden="true" className="flex gap-1.5">
          {keyFeatures.map((k, i) => (
            <span key={k.t} className={cn("h-1.5 rounded-[3px] transition-[width,background-color] duration-500", i === cur ? "w-[26px] bg-white" : "w-1.5 bg-white/30")} />
          ))}
        </div>
        <IconButton label={askNova.studio.deckNext} onClick={() => setCur((cur + 1) % n)}><ChevronRight size={20} strokeWidth={1.8} /></IconButton>
      </div>
      <p aria-live="polite" className="sr-only">{keyFeatures[cur].t}</p>
    </div>
  );
}
