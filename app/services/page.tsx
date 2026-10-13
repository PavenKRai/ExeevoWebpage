import type { Metadata } from "next";
import { JsonLd } from "@/components/resources/JsonLd";
import { Scene } from "@/components/scene/Scene";
import { ContactSection } from "@/components/services/ContactSection";
import { HowWeEngage } from "@/components/services/HowWeEngage";
import { PathsBlock } from "@/components/services/PathsBlock";
import { PhaseDock } from "@/components/services/PhaseDock";
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
      <Scene id="services-hero" stageClassName="on-dark bg-ink text-[#EEF2F4]">
        <ServicesHero />
        <HowWeEngage />
      </Scene>
      <PhaseDock />
      <div className="frame">
        {phases.map((p) => (
          <PhaseSection key={p.slug} phase={p}>
            {p.slug === "implement" && <PathsBlock />}
          </PhaseSection>
        ))}
      </div>
      <ContactSection />
    </ServiceParamProvider>
  );
}
