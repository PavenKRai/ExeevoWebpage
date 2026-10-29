import type { Metadata } from "next";
import { JsonLd } from "@/components/resources/JsonLd";
import { HowWeEngage } from "@/components/services/HowWeEngage";
import { PathsBlock } from "@/components/services/PathsBlock";
import { PhaseSection } from "@/components/services/PhaseSection";
import { ServiceParamProvider } from "@/components/services/ServiceParam";
import { ServicesHero } from "@/components/services/ServicesHero";
import { phases } from "@/content/services";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";
import { servicesJsonLd } from "@/lib/servicesJsonLd";
import "@/app/styles/services.css";

export const metadata: Metadata = pageMetadata(seo.services);

export default function ServicesPage() {
  return (
    <ServiceParamProvider>
      <JsonLd data={servicesJsonLd()} />
      <ServicesHero />
      <HowWeEngage />
      {phases.map((p) => (
        <PhaseSection key={p.slug} phase={p}>
          {p.slug === "implement" && <PathsBlock />}
        </PhaseSection>
      ))}
    </ServiceParamProvider>
  );
}
