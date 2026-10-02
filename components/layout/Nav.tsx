"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "../ui/Button";
import { cn } from "../ui/cn";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { NavMenu } from "./NavMenu";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  const pathname = usePathname();
  // Menus are keyed to the pathname they were opened on, so navigating closes them. Only one is open at a time.
  type MenuKey = "platform" | "industries" | "roles";
  const [openFor, setOpenFor] = useState<{ key: MenuKey; path: string } | null>(null);
  const [mobileFor, setMobileFor] = useState<string | null>(null);
  const openKey = openFor && openFor.path === pathname ? openFor.key : null;
  const mobile = mobileFor === pathname;
  const toggleMenu = useCallback((key: MenuKey) => setOpenFor((cur) => (cur && cur.key === key && cur.path === pathname ? null : { key, path: pathname })), [pathname]);
  const closeMenu = useCallback(() => setOpenFor(null), []);
  const setMobile = useCallback((v: boolean) => setMobileFor(v ? pathname : null), [pathname]);
  const barRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Partial<Record<MenuKey, HTMLDivElement | null>>>({});
  const [menuLeft, setMenuLeft] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  // Whether the page content currently under the bar is a dark section (`.on-dark`).
  const [overDark, setOverDark] = useState(false);
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

  useEffect(() => {
    if (!openKey || openKey === "platform") return;
    const t = triggerRefs.current[openKey];
    const bar = barRef.current;
    if (t && bar) setMenuLeft(t.getBoundingClientRect().left - bar.getBoundingClientRect().left);
  }, [openKey]);

  const dark = overDark;
  const tint = dark ? "bg-white/[.14]" : "bg-[rgba(51,63,72,.08)]";
  const item = cn(
    "nav-link flex h-11 items-center rounded-[14px] whitespace-nowrap text-[15px] font-[450] leading-[normal]",
    dark ? "nav-link-dark" : "nav-link-light",
  );

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-6 md:px-10">
      <div
        ref={barRef}
        className={cn(
          "relative flex h-[72px] items-center justify-between rounded-3xl pl-4 pr-3 md:pl-6 md:pr-[14px]",
          dark ? "glass-dark on-dark text-[#EEF2F4]" : "glass-light",
          dark && scrolled && "bg-ink/60",
        )}
      >
        <Logo tone={dark ? "dark" : "light"} />
        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {site.nav.map((l) => {
            const base = l.href.split(/[?#]/)[0];
            const anchored = l.href.includes("#"); // an anchor link never owns the "current page" tint
            const current = !anchored && pathname === base;
            const key: MenuKey | null = l.label === "Platform" ? "platform" : l.label === "Industries" ? "industries" : l.label === "Solutions by role" ? "roles" : null;
            if (!key)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(item, "px-4", current && tint)}
                >
                  {l.label}
                </Link>
              );
            const isOpen = openKey === key;
            const menuId = `${key}-menu`;
            const label = key === "platform" ? "Platform modules" : key === "industries" ? "Industries menu" : "Solutions by role menu";
            return (
              <div
                key={l.href}
                ref={(el) => {
                  triggerRefs.current[key] = el;
                }}
                className={cn(item, "gap-0", (current || isOpen) && tint)}
              >
                <Link href={l.href} aria-current={current ? "page" : undefined} className="flex h-11 items-center pl-4">
                  {l.label}
                </Link>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={menuId}
                  aria-label={label}
                  onClick={() => toggleMenu(key)}
                  className="flex h-11 w-9 items-center justify-start rounded-[14px] pl-1.5"
                >
                  <ChevronDown size={16} strokeWidth={1.8} className={isOpen ? "rotate-180" : ""} />
                </button>
              </div>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button href={site.demoHref} size="nav" solid={!dark}>Get a demo</Button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile(true)}
            className="flex size-12 items-center justify-center rounded-input xl:hidden"
          >
            <Menu size={24} strokeWidth={1.8} />
          </button>
        </div>
      </div>
      {openKey === "platform" && (
        <div className="pointer-events-none absolute inset-x-3 top-[82px] hidden justify-center md:inset-x-10 xl:flex">
          <MegaMenu id="platform-menu" onClose={closeMenu} />
        </div>
      )}
      {(openKey === "industries" || openKey === "roles") && (
        <div className="pointer-events-none absolute inset-x-3 top-[82px] hidden md:inset-x-10 xl:block">
          <div className="relative">
            <div className="pointer-events-none absolute top-0" style={{ left: menuLeft }}>
              <NavMenu kind={openKey} id={`${openKey}-menu`} onClose={closeMenu} />
            </div>
          </div>
        </div>
      )}
      {mobile && <MobileMenu onClose={closeMobile} />}
    </header>
  );
}
