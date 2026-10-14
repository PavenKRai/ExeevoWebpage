"use client";
import { useEffect, useState } from "react";
import { phases, servicesPage } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/components/ui/cn";
import { phaseStyle } from "./phaseStyle";

/** Sticky phase navigation. Real anchor links (work without JS); the scroll-spy only highlights the phase in view. */
export function PhaseDock() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const ids = phases.map((p) => p.slug);
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const pick = () => {
      const probe = window.innerHeight * 0.35;
      let cur: string | null = null;
      for (const el of els) if (el.getBoundingClientRect().top <= probe) cur = el.id;
      const talk = document.getElementById("talk");
      if (talk && talk.getBoundingClientRect().top <= probe) cur = null;
      setActive(cur);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);
  return (
    <div className="pointer-events-none sticky top-[119px] z-30 h-0">
      <div className="absolute inset-x-0 top-[-27px] flex justify-center px-3">
        <nav
          aria-label={servicesPage.dock}
          className="glass pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full p-1"
        >
          {phases.map((p) => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              aria-current={active === p.slug ? "true" : undefined}
              className={cn(
                "flex h-11 shrink-0 items-center gap-2.5 rounded-full px-4 text-[14px] font-medium text-heading transition-colors hover:bg-slate/[.07] sm:px-5",
                active === p.slug && "bg-slate/[.1]",
              )}
            >
              <span aria-hidden="true" className={cn("dot", phaseStyle[p.color].dot)} />
              {p.title}
            </a>
          ))}
          <Button
            href={site.demoHref}
            size="nav"
            className="ml-1 !h-11 shrink-0 !px-5 !text-[14px]"
          >
            {servicesPage.primaryCta}
          </Button>
        </nav>
      </div>
    </div>
  );
}
