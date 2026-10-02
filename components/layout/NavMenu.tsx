"use client";
import Link from "next/link";
import { useRef } from "react";
import { site } from "@/content/site";
import { CategoryDot } from "../ui/CategoryDot";
import { useFocusTrap } from "./useFocusTrap";

type Item = { label: string; href: string; blurb?: string; dot?: "commercial" | "medical" | "platform" | "ai" };

const industries: Item[] = site.industriesMenu.map((i, n) => ({ ...i, dot: n === 0 ? "medical" : "commercial" }));
const roles: Item[] = site.rolesMenu.items.map((r, n) => ({
  label: r.label,
  href: `/solutions-by-role?role=${r.slug}`,
  dot: (["commercial", "medical", "ai", "platform"] as const)[n],
}));

/** Dark-glass dropdown used by the Industries and Solutions by role nav items (same recipe as the Platform mega menu). */
export function NavMenu({ kind, id, onClose }: { kind: "industries" | "roles"; id: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);
  const label = kind === "industries" ? "Industries" : "Solutions by role";
  const items = kind === "industries" ? industries : roles;
  const lead = kind === "roles" ? site.rolesMenu.blurb : undefined;
  return (
    <div
      ref={ref}
      id={id}
      role="dialog"
      aria-label={label}
      className="glass-dark on-dark pointer-events-auto grid w-[380px] max-w-full gap-1.5 rounded-[26px] bg-[rgba(24,32,38,.72)] p-[14px] text-[#EEF2F4]"
    >
      {lead && <p className="px-4 pb-1 pt-2 text-[13px] leading-[1.4] text-on-dark-muted">{lead}</p>}
      {items.map((it) => (
        <Link key={it.href} href={it.href} onClick={onClose} className="nav-link nav-link-dark flex min-h-11 items-start gap-3 rounded-[14px] px-4 py-3.5">
          <span className="mt-[7px] flex">
            <CategoryDot category={it.dot ?? "platform"} className="!size-2" />
          </span>
          <span className="flex flex-col gap-[3px]">
            <span className="text-[15px] font-[550]">{it.label}</span>
            {it.blurb && <span className="text-[13px] leading-[1.4] text-on-dark-muted">{it.blurb}</span>}
          </span>
        </Link>
      ))}
    </div>
  );
}
