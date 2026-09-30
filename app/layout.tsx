import type { Metadata } from "next";
import { Figtree, Sora } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { OffscreenPause } from "@/components/layout/OffscreenPause";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { site } from "@/content/site";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Exeevo | Life sciences CRM built natively on Microsoft", template: "%s | Exeevo" },
  description: site.tagline,
  openGraph: { siteName: "Exeevo", type: "website", description: site.tagline },
};

const orgJsonLd = { "@context": "https://schema.org", "@type": "Organization", name: "Exeevo", url: siteUrl, description: site.tagline };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${figtree.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <OffscreenPause />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
