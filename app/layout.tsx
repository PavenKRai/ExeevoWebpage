import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@/components/analytics/Analytics";
import { ConsentGate } from "@/components/analytics/ConsentGate";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { OffscreenPause } from "@/components/layout/OffscreenPause";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { orgFacts, seo } from "@/content/seo";
import { analyticsEnabled, BOT_PATTERN, CONSENT_KEY, POLICY_PATHS } from "@/lib/analytics";
import { isStaging, siteUrl } from "@/lib/siteUrl";
import "./globals.css";

// One typeface for everything (new design system): Geist, weights 300-600.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.home.title, template: "%s | Exeevo" },
  description: seo.home.description,
  applicationName: "Exeevo",
  alternates: { canonical: "/" },
  robots: isStaging ? { index: false, follow: false } : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { siteName: "Exeevo", type: "website", locale: "en_US", title: seo.home.title, description: seo.home.description, url: "/" },
  twitter: { card: "summary_large_image", title: seo.home.title, description: seo.home.description },
};

// Sitewide structured data: who Exeevo is (Organization) and the site itself (WebSite), linked by @id.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: orgFacts.name,
      url: siteUrl,
      logo: `${siteUrl}/brand/exeevo-icon.png`,
      description: orgFacts.tagline,
      parentOrganization: { "@type": "Organization", name: orgFacts.parent },
    },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "Exeevo", description: orgFacts.tagline, publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "en" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        {analyticsEnabled && (
          // Before first paint: if the visitor has not chosen yet (and is not a crawler or on a policy page), hide the page so it never flashes before the consent gate takes over.
          <Script id="consent-pending" strategy="beforeInteractive">{`try{var s=null;try{s=localStorage.getItem(${JSON.stringify(CONSENT_KEY)})}catch(e){}if(s!=='granted'&&s!=='denied'&&!new RegExp(${JSON.stringify(BOT_PATTERN)},'i').test(navigator.userAgent)&&${JSON.stringify(POLICY_PATHS)}.indexOf(location.pathname)<0){document.documentElement.setAttribute('data-consent-pending','')}}catch(e){}`}</Script>
        )}
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <OffscreenPause />
        <Analytics />
        <ConsentGate />
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
