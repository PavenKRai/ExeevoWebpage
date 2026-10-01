import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "../ui/Button";
import { Logo } from "./Logo";

// Text keeps the design's line pitch while the hit target stays at least 44px tall.
const linkCls = "-my-[13px] inline-flex min-h-11 items-center";

function FooterLink({ href, children, className }: { href: string; children: string; className: string }) {
  return href.startsWith("[") ? (
    <span className={className} title={href}>{children}</span>
  ) : (
    <Link href={href} className={`${className} hover:text-white`}>{children}</Link>
  );
}

export function Footer() {
  const f = site.footer;
  return (
    <footer className="on-dark flex min-h-[360px] flex-col bg-ink-deep leading-[normal] text-[#DCE3E7]">
      <div className="frame grid gap-10 pb-10 pt-16 lg:grid-cols-12 lg:gap-x-6 lg:pt-20">
        <div className="flex flex-col gap-[18px] lg:col-span-4">
          <div className="-my-[5px]"><Logo size="footer" /></div>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-on-dark-muted">{site.tagline}</p>
        </div>
        {f.columns.map((c) => (
          <nav key={c.title} aria-label={`Footer: ${c.title}`} className="flex flex-col gap-[14px] lg:col-span-2">
            <p className="text-[14px] font-medium text-[#8FA0AA]">{c.title}</p>
            {c.links.map((l) => (
              <FooterLink key={l.label} href={l.href} className={`${linkCls} text-[15px]`}>{l.label}</FooterLink>
            ))}
          </nav>
        ))}
        <div className="flex items-start lg:col-span-2 lg:justify-end">
          <Button href={site.demoHref} size="nav">Get a demo</Button>
        </div>
      </div>
      <div className="frame mt-auto pb-9">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/[.08] pt-6 text-[13px] text-[#8FA0AA]">
          <p>{f.legal}</p>
          <ul className="flex flex-wrap gap-x-6">
            {f.legalLinks.map((l) => (
              <li key={l.label}><FooterLink href={l.href} className="-my-[14px] inline-flex min-h-11 items-center">{l.label}</FooterLink></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
