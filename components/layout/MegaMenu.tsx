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
      className="glass-dark on-dark pointer-events-auto grid w-[920px] max-w-full grid-cols-3 gap-1.5 rounded-[26px] bg-[rgba(24,32,38,.72)] p-[22px] text-[#EEF2F4]"
    >
      <Link
        href="/platform"
        onClick={onClose}
        className="nav-link nav-link-dark row-span-3 flex min-h-[220px] flex-col justify-between rounded-[18px] bg-white/[.06] p-[22px]"
      >
        <Orb size={64} />
        <span className="flex flex-col gap-1.5">
          <span className="text-[19px] font-semibold">{platformPage.overview.name}</span>
          <span className="text-[14px] text-on-dark-muted">{platformPage.overview.blurb}</span>
        </span>
      </Link>
      {modules.map((m) => (
        <Link
          key={m.slug}
          href={`/platform?module=${m.slug}`}
          onClick={onClose}
          className="nav-link nav-link-dark flex min-h-11 items-start gap-3 rounded-[14px] px-4 py-3.5"
        >
          <span className="mt-[7px] flex">
            <CategoryDot category={m.category} className="!size-2" />
          </span>
          <span className="flex flex-col gap-[3px]">
            <span className="text-[15px] font-[550]">{m.name}</span>
            <span className="text-[13px] leading-[1.4] text-on-dark-muted">{m.menuBlurb}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
