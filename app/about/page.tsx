import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { ClosingCards } from "@/components/about/ClosingCards";
import { MicrosoftWhy } from "@/components/about/MicrosoftWhy";
import { OfficesMap } from "@/components/about/OfficesMap";
import { StoryTimeline } from "@/components/about/StoryTimeline";
import { ValsoftSection } from "@/components/about/ValsoftSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { JsonLd } from "@/components/resources/JsonLd";
import { seo } from "@/content/seo";
import { aboutJsonLd } from "@/lib/companyJsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seo.about);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd()} />
      <AboutHero />
      <StoryTimeline />
      <MicrosoftWhy />
      <ValsoftSection />
      <ValuesSection />
      <OfficesMap />
      <ClosingCards />
    </>
  );
}
