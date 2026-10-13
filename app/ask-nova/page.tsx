import type { Metadata } from "next";
import { FeatureCarousel } from "@/components/ask-nova/FeatureCarousel";
import { LicensingSection } from "@/components/ask-nova/LicensingSection";
import { NovaCta } from "@/components/ask-nova/NovaCta";
import { NovaHero } from "@/components/ask-nova/NovaHero";
import { NovaProvider } from "@/components/ask-nova/NovaProvider";
import { StudioSection } from "@/components/ask-nova/StudioSection";
import { TrustCards } from "@/components/ask-nova/TrustCards";
import { JsonLd } from "@/components/resources/JsonLd";
import { seo } from "@/content/seo";
import { askNovaJsonLd } from "@/lib/askNovaJsonLd";
import { pageMetadata } from "@/lib/seo";
import "@/app/styles/ask-nova.css";

export const metadata: Metadata = pageMetadata(seo.askNova);

export default function AskNovaPage() {
  return (
    <NovaProvider>
      <JsonLd data={askNovaJsonLd()} />
      <NovaHero />
      <FeatureCarousel />
      <LicensingSection />
      <StudioSection />
      <TrustCards />
      <NovaCta />
    </NovaProvider>
  );
}
