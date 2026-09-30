"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { site } from "@/content/site";
import { modules } from "@/content/modules";
import { CategoryDot } from "../ui/CategoryDot";
import { Button } from "../ui/Button";
import { useFocusTrap } from "./useFocusTrap";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useFocusTrap(ref, true, onClose);
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
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-modules"
          onClick={() => setOpen(!open)}
          className="flex min-h-14 items-center justify-between font-display text-[30px] font-semibold text-white"
        >
          Platform <ChevronDown className={open ? "rotate-180" : ""} size={26} strokeWidth={1.8} />
        </button>
        {open && (
          <ul id="mobile-modules" className="mb-2 grid gap-1 pl-2">
            <li>
              <Link href="/platform" onClick={onClose} className="flex min-h-11 items-center text-on-dark">Platform overview</Link>
            </li>
            {modules.map((m) => (
              <li key={m.slug}>
                <Link href={`/platform?module=${m.slug}`} onClick={onClose} className="flex min-h-11 items-center gap-2 text-on-dark">
                  <CategoryDot category={m.category} /> {m.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {site.nav.filter((l) => l.label !== "Platform").map((l) => (
          <Link key={l.href} href={l.href} onClick={onClose} className="flex min-h-14 items-center font-display text-[30px] font-semibold text-white">
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
