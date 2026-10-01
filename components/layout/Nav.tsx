"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "../ui/Button";
import { cn } from "../ui/cn";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  const pathname = usePathname();
  // Menus are keyed to the pathname they were opened on, so navigating closes them.
  const [megaFor, setMegaFor] = useState<string | null>(null);
  const [mobileFor, setMobileFor] = useState<string | null>(null);
  const mega = megaFor === pathname;
  const mobile = mobileFor === pathname;
  const setMega = useCallback((v: boolean) => setMegaFor(v ? pathname : null), [pathname]);
  const setMobile = useCallback((v: boolean) => setMobileFor(v ? pathname : null), [pathname]);
  const [scrolled, setScrolled] = useState(false);
  // Whether the page content currently under the bar is a dark section (`.on-dark`).
  const [overDark, setOverDark] = useState(false);
  const closeMega = useCallback(() => setMega(false), [setMega]);
  const closeMobile = useCallback(() => setMobile(false), [setMobile]);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setScrolled(window.scrollY > 480);
      // Sample just below the bar: pinned scenes swap light/dark grounds under a fixed nav.
      const hits = document.elementsFromPoint(window.innerWidth / 2, 124);
      setOverDark(hits.some((e) => !e.closest("header") && !!e.closest(".on-dark")));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Route changes / late-mounting sections can change what sits under the bar without a scroll.
    const settle = window.setTimeout(schedule, 400);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.clearTimeout(settle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const dark = overDark;
  const tint = dark ? "bg-white/[.14]" : "bg-[rgba(51,63,72,.08)]";
  const item = cn(
    "nav-link flex h-11 items-center rounded-[14px] whitespace-nowrap text-[15px] font-[450] leading-[normal]",
    dark ? "nav-link-dark" : "nav-link-light",
  );

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-6 md:px-10">
      <div
        className={cn(
          "relative flex h-[72px] items-center justify-between rounded-3xl pl-4 pr-3 md:pl-6 md:pr-[14px]",
          dark ? "glass-dark on-dark text-[#EEF2F4]" : "glass-light",
          dark && scrolled && "bg-ink/60",
        )}
      >
        <Logo tone={dark ? "dark" : "light"} />
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {site.nav.map((l) =>
            l.label === "Platform" ? (
              <div
                key={l.href}
                className={cn(item, "gap-0", (pathname === l.href || mega) && tint)}
              >
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="flex h-11 items-center pl-4"
                >
                  Platform
                </Link>
                <button
                  type="button"
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  aria-label="Platform modules"
                  onClick={() => setMega(!mega)}
                  className="flex h-11 w-9 items-center justify-start pl-1.5 rounded-[14px]"
                >
                  <ChevronDown size={16} strokeWidth={1.8} className={mega ? "rotate-180" : ""} />
                </button>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={cn(item, "px-4", pathname === l.href && tint)}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          {/* Keeps the nav group where the design places it (it reserves room for the omitted Resources link). */}
          <span aria-hidden="true" className="hidden w-[102px] xl:block" />
          <Button href={site.demoHref} size="nav" solid={!dark}>Get a demo</Button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile(true)}
            className="flex size-12 items-center justify-center rounded-input lg:hidden"
          >
            <Menu size={24} strokeWidth={1.8} />
          </button>
        </div>
      </div>
      {mega && (
        <div className="pointer-events-none absolute inset-x-3 top-[82px] hidden justify-center md:inset-x-10 lg:flex">
          <MegaMenu id="mega-menu" onClose={closeMega} />
        </div>
      )}
      {mobile && <MobileMenu onClose={closeMobile} />}
    </header>
  );
}
