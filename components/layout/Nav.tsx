"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "../ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky glass pill over a short gradient blur. Plain links (no dropdowns): the designs have none. Below 1180px the links
 * collapse into the menu button.
 */
export function Nav() {
  const pathname = usePathname();
  // The sheet is keyed to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const mobile = openOn === pathname;

  return (
    <div className="sticky top-0 z-40 h-0">
      <div className="navfade" aria-hidden="true">
        <span className="nf1" />
        <span className="nf2" />
        <span className="nf3" />
      </div>
      <header className="glass absolute inset-x-5 top-3.5 mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-4 rounded-full pl-[22px] pr-[9px] shadow-[0_0_0_1px_rgba(29,38,45,.06),inset_0_1px_0_#fff]">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-0.5 min-[1181px]:flex">
          {site.nav.map((l) => {
            const base = l.href.split(/[?#]/)[0];
            const current = pathname === base || (base !== "/" && pathname.startsWith(`${base}/`));
            return (
              <Link key={l.href} href={l.href} aria-current={current ? "page" : undefined} className="nl">
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5">
          <Button href={site.demoHref} size="nav" className="!h-[46px] !px-[22px] !text-[14px]">
            Get a demo
          </Button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setOpenOn(pathname)}
            className="btn btn-glass size-[46px] !p-0 min-[1181px]:hidden"
          >
            <Menu size={18} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </header>
      {mobile && <MobileMenu onClose={() => setOpenOn(null)} />}
    </div>
  );
}
