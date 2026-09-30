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

const DARK_HEROES = ["/", "/why-exeevo", "/solutions-by-role"];

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
  const closeMega = useCallback(() => setMega(false), [setMega]);
  const closeMobile = useCallback(() => setMobile(false), [setMobile]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled || DARK_HEROES.includes(pathname);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-6 md:px-10">
      <div
        className={cn(
          "relative mx-auto flex h-[72px] max-w-[1360px] items-center justify-between rounded-3xl px-4 md:px-6",
          dark ? "glass-dark on-dark bg-ink/60" : "glass-light",
        )}
      >
        <Logo tone={dark ? "dark" : "light"} />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((l) =>
            l.label === "Platform" ? (
              <div key={l.href} className="flex items-center">
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={cn("flex min-h-11 items-center rounded-input px-3 font-medium", dark ? "text-white" : "text-heading", pathname === l.href && "bg-white/14")}
                >
                  Platform
                </Link>
                <button
                  type="button"
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  aria-label="Platform modules"
                  onClick={() => setMega(!mega)}
                  className={cn("flex size-11 items-center justify-center rounded-input", dark ? "text-white" : "text-heading")}
                >
                  <ChevronDown size={18} strokeWidth={1.8} className={mega ? "rotate-180" : ""} />
                </button>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={cn("flex min-h-11 items-center rounded-input px-3 font-medium", dark ? "text-white" : "text-heading", pathname === l.href && "bg-white/14")}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Button href={site.demoHref} size="nav">Get a demo</Button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile(true)}
            className={cn("flex size-12 items-center justify-center rounded-input lg:hidden", dark ? "text-white" : "text-heading")}
          >
            <Menu size={24} strokeWidth={1.8} />
          </button>
        </div>
        {mega && <MegaMenu id="mega-menu" onClose={closeMega} />}
      </div>
      {mobile && <MobileMenu onClose={closeMobile} />}
    </header>
  );
}
