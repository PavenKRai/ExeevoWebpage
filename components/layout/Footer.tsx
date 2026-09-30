import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "../ui/Button";
import { Logo } from "./Logo";

function FooterLink({ href, children }: { href: string; children: string }) {
  const cls = "inline-flex min-h-11 items-center text-on-dark hover:text-white";
  return href.startsWith("[") ? (
    <span className={cls}>{children} <span className="ml-1 text-on-dark-muted">{href}</span></span>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function Footer() {
  const f = site.footer;
  return (
    <footer className="on-dark bg-ink-deep text-on-dark">
      <div className="frame grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr_auto]">
        <div className="grid content-start gap-4">
          <Logo />
          <p className="max-w-xs">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {f.columns.map((c) => (
            <div key={c.title}>
              <p className="mb-2 font-semibold text-white">{c.title}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}><FooterLink href={l.href}>{l.label}</FooterLink></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div><Button href={site.demoHref}>Get a demo</Button></div>
      </div>
      <div className="frame flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-[14px] text-on-dark-muted">
        <p>{f.legal}</p>
        <ul className="flex flex-wrap gap-x-6">
          {f.legalLinks.map((l) => (
            <li key={l.label}><FooterLink href={l.href}>{l.label}</FooterLink></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
