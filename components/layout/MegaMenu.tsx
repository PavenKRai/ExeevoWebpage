"use client";
import Link from "next/link";
import { useRef } from "react";
import { modules, platformPage } from "@/content/modules";
import { CategoryDot } from "../ui/CategoryDot";
import { Orb } from "../glass/Orb";
import { useFocusTrap } from "./useFocusTrap";

export function MegaMenu({ id, onClose }: { id: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);
  return (
    <div
      ref={ref}
      id={id}
      role="dialog"
      aria-label="Platform modules"
      className="glass-dark on-dark absolute left-0 right-0 top-[calc(100%+12px)] grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 rounded-[28px] bg-ink/85 p-6"
    >
      <Link href="/platform" onClick={onClose} className="glass-dark relative flex min-h-56 flex-col justify-end overflow-hidden rounded-[22px] p-6">
        <Orb size={120} className="absolute -right-6 -top-6 opacity-90" />
        <span className="font-display text-[24px] font-semibold text-white">{platformPage.overview.name}</span>
        <span className="text-on-dark">{platformPage.overview.blurb}</span>
      </Link>
      <ul className="grid grid-cols-2 gap-2">
        {modules.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/platform?module=${m.slug}`}
              onClick={onClose}
              className="flex min-h-14 flex-col gap-0.5 rounded-input px-4 py-2.5 hover:bg-white/10"
            >
              <span className="flex items-center gap-2 font-semibold text-white">
                <CategoryDot category={m.category} /> {m.name}
              </span>
              <span className="text-[14px] text-on-dark-muted">{m.menuBlurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
