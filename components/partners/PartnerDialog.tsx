"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { catNames, partnersPage, type Partner } from "@/content/partners";
import { IconButton } from "@/components/ui/IconButton";
import { catDot } from "./PartnerCard";
import { cn } from "@/components/ui/cn";

/** Full partner profile in a native <dialog> (focus trap, Esc to close). `list` is the partners currently shown, so previous/next follow the filter. */
export function PartnerDialog({ partner, pos, total, open, onClose, onStep }: { partner: Partner; pos: number; total: number; open: boolean; onClose: () => void; onStep: (d: -1 | 1) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const m = partnersPage.modal;
  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()} aria-labelledby={`partner-${partner.id}-title`} className="co-dialog">
      <div className="glass-light relative flex flex-col gap-5 rounded-[32px] bg-frost p-7 sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <div className="relative h-[96px] w-[200px] rounded-2xl bg-white">
            <Image src={partner.image} alt="" fill sizes="200px" className="object-contain p-4" />
          </div>
          <button type="button" onClick={onClose} aria-label={m.close} className="flex size-11 items-center justify-center rounded-full hover:bg-slate/10"><X size={20} strokeWidth={1.8} /></button>
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-[13.5px] text-muted">
            <span aria-hidden="true" className={cn("size-2 rounded-full", catDot[partner.cat])} />
            {catNames[partner.cat]} partner
          </p>
          <h2 id={`partner-${partner.id}-title`} className="text-[clamp(26px,3vw,34px)] leading-[1.1] tracking-[-0.025em]">{partner.name}</h2>
          <p className="text-[16px] font-medium text-heading">{partner.spec}</p>
        </div>
        {partner.regions.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {partner.regions.map((r) => (
              <li key={r} className="flex h-8 items-center rounded-full bg-white/70 px-3 text-[12.5px] text-body">{r}</li>
            ))}
          </ul>
        )}
        <div className="flex flex-col gap-3.5 text-[16px] leading-[1.65] text-muted">
          {partner.body.map((p, n) => (
            <p key={n}>{p}</p>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-hairline pt-4">
          <p className="text-[13.5px] text-muted">{pos} {m.of} {total}</p>
          <div className="flex items-center gap-2">
            <IconButton label={m.previous} onClick={() => onStep(-1)} className="size-11 rounded-[13px]"><ChevronLeft size={18} strokeWidth={1.8} /></IconButton>
            <IconButton label={m.next} onClick={() => onStep(1)} className="size-11 rounded-[13px]"><ChevronRight size={18} strokeWidth={1.8} /></IconButton>
          </div>
        </div>
      </div>
    </dialog>
  );
}
