import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "../ui/Button";
import { Logo } from "./Logo";

const linkCls = "inline-flex min-h-11 items-center text-[14px] text-body hover:text-heading";

function FooterLink({ href, children, className }: { href: string; children: string; className: string }) {
  return href.startsWith("[") ? <span className={className} title={href}>{children}</span> : <Link href={href} className={className}>{children}</Link>;
}

/** White footer with a hairline top border: brand and CTA, three link columns, legal row. */
export function Footer() {
  const f = site.footer;
  return (
    <footer className="border-t border-hairline bg-white">
      <div className="frame flex flex-col gap-14 pb-8 pt-16 lg:pt-[72px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col items-start gap-5">
            <Logo size="footer" />
            <p className="body-text max-w-[280px]">{site.tagline}</p>
            <Button href={site.demoHref} size="nav" className="!h-11 !px-5 !text-[14px]">Get a demo</Button>
          </div>
          {f.columns.map((c) => (
            <nav key={c.title} aria-label={`Footer: ${c.title}`} className="flex flex-col gap-0.5">
              <p className="mb-2 text-[14px] font-medium text-heading">{c.title}</p>
              {c.links.map((l) => (
                <FooterLink key={l.label} href={l.href} className={linkCls}>{l.label}</FooterLink>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-hairline pt-6 text-[13px] text-muted">
          <p>{f.legal}</p>
          <ul className="flex flex-wrap gap-x-6">
            {f.legalLinks.map((l) => (
              <li key={l.label}><FooterLink href={l.href} className="inline-flex min-h-11 items-center hover:text-heading">{l.label}</FooterLink></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
