"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { site } from "@/content/site";
import { modules } from "@/content/modules";
import { CategoryDot } from "../ui/CategoryDot";
import { Button } from "../ui/Button";
import { useFocusTrap } from "./useFocusTrap";

const big = "flex min-h-14 items-center font-display text-[30px] font-semibold text-white";

function Group({ id, label, open, onToggle, children }: { id: string; label: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className={`${big} w-full justify-between`}>
        {label} <ChevronDown className={open ? "rotate-180" : ""} size={26} strokeWidth={1.8} />
      </button>
      {open && (
        <ul id={id} className="mb-2 grid gap-1 pl-2">
          {children}
        </ul>
      )}
    </div>
  );
}

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<"platform" | "industries" | null>(null);
  const toggle = (k: "platform" | "industries") => setOpen(open === k ? null : k);
  useFocusTrap(ref, true, onClose);
  const sub = "flex min-h-11 items-center gap-2 text-on-dark";
  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="glass-dark on-dark fixed inset-0 z-50 overflow-y-auto bg-ink/90 p-6"
    >
      <div className="flex justify-end">
        <button type="button" aria-label="Close menu" onClick={onClose} className="flex size-12 items-center justify-center rounded-full glass-dark">
          <X size={22} strokeWidth={1.8} />
        </button>
      </div>
      <nav aria-label="Mobile" className="mt-4 grid gap-1">
        <Group id="mobile-modules" label="Platform" open={open === "platform"} onToggle={() => toggle("platform")}>
          <li>
            <Link href="/platform" onClick={onClose} className={sub}>Platform overview</Link>
          </li>
          {modules.map((m) => (
            <li key={m.slug}>
              <Link href={`/platform?module=${m.slug}`} onClick={onClose} className={sub}>
                <CategoryDot category={m.category} /> {m.name}
              </Link>
            </li>
          ))}
        </Group>
        <Group id="mobile-industries" label="Industries" open={open === "industries"} onToggle={() => toggle("industries")}>
          {site.industriesMenu.map((i) => (
            <li key={i.href}>
              <Link href={i.href} onClick={onClose} className="flex min-h-11 flex-col justify-center py-1 text-white">
                <span>{i.label}</span>
                <span className="text-[14px] text-on-dark-muted">{i.blurb}</span>
              </Link>
            </li>
          ))}
        </Group>
        <Link href="/solutions-by-role" onClick={onClose} className="flex min-h-14 flex-col justify-center font-display text-[30px] font-semibold text-white">
          Solutions by role
          <span className="font-sans text-[14px] font-normal text-on-dark-muted">{site.rolesMenu.blurb}</span>
        </Link>
        <p className="mt-4 text-[14px] text-on-dark-muted">More</p>
        {site.mobile.more.map((l) => (
          <Link key={l.href} href={l.href} onClick={onClose} className={big}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="mt-8" onClick={onClose}>
        <Button href={site.demoHref} size="hero">Get a demo</Button>
      </div>
    </div>
  );
}
