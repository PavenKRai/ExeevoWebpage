import type { Metadata } from "next";
import Link from "next/link";
import { ResourceShell } from "@/components/resources/ResourceShell";
import { resourceTypes } from "@/content/resources/config";
import { capabilities } from "@/content/platform";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Site map",
  description: "Every page on the Exeevo website.",
  alternates: { canonical: "/site-map" },
  openGraph: { title: "Site map | Exeevo", description: "Every page on the Exeevo website.", url: "/site-map", siteName: "Exeevo", type: "website", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Exeevo" }] },
  twitter: { card: "summary_large_image", title: "Site map | Exeevo", description: "Every page on the Exeevo website.", images: ["/twitter-image"] },
};

const groups = [
  { title: "Main pages", links: [{ label: "Home", href: "/" }, ...site.nav.filter((l) => !l.href.includes("#"))] },
  { title: "Platform capabilities", links: [{ label: "Pharma", href: "/platform?industry=pharma" }, { label: "MedTech", href: "/platform?industry=medtech" }, { label: "Consumer Health", href: "/platform?industry=consumer-health" }, ...capabilities.map((c) => ({ label: c.name, href: `/platform#cap-${c.id}` }))] },
  { title: "Resources", links: [{ label: "All resources", href: "/resources" }, ...resourceTypes.map((t) => ({ label: t.label, href: t.path }))] },
  { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Privacy policy", href: "/privacy" }, { label: "Cookie policy", href: "/cookies" }] },
];

export default function SiteMapPage() {
  return (
    <ResourceShell>
      <h1 className="rise text-[clamp(40px,5vw,64px)] leading-[1.04] tracking-[-0.035em]">Site map</h1>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {groups.map((g) => (
          <section key={g.title} aria-labelledby={`sm-${g.title}`} className="glass-light rounded-[28px] p-7">
            <h2 id={`sm-${g.title}`} className="text-[26px] leading-[1.15]">{g.title}</h2>
            <ul className="mt-4">
              {g.links.map((l) => (
                <li key={l.href}><Link href={l.href} className="inline-flex min-h-11 items-center text-[16px] underline decoration-brand-blue decoration-2 underline-offset-[3px]">{l.label}</Link></li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </ResourceShell>
  );
}
