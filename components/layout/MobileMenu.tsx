"use client";
import Link from "next/link";
import { useRef } from "react";
import { X } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "../ui/Button";
import { useFocusTrap } from "./useFocusTrap";

/** Full-height light glass sheet with the same links as the bar. */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);
  return (
    <div ref={ref} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="glass fixed inset-0 z-50 overflow-y-auto bg-porcelain/95 p-6">
      <div className="flex justify-end">
        <button type="button" aria-label="Close menu" onClick={onClose} className="btn btn-glass size-12 !p-0">
          <X size={20} strokeWidth={1.6} />
        </button>
      </div>
      <nav aria-label="Mobile" className="mt-4 grid gap-1">
        {site.nav.map((l) => (
          <Link key={l.href} href={l.href} onClick={onClose} className="flex min-h-14 items-center text-[30px] font-light tracking-[-0.03em] text-heading">
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
