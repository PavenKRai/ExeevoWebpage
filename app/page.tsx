import type { Metadata } from "next";
import { Adoption } from "@/components/home/Adoption";
import { ClosingCta } from "@/components/home/ClosingCta";
import { GoLive } from "@/components/home/GoLive";
import { HomeHero } from "@/components/home/HomeHero";
import { Licence } from "@/components/home/Licence";
import { MicrosoftUnderneath } from "@/components/home/MicrosoftUnderneath";
import { ModuleGrid } from "@/components/home/ModuleGrid";
import { Moments } from "@/components/home/Moments";
import { Outcomes } from "@/components/home/Outcomes";
import { PrivacyTenant } from "@/components/home/PrivacyTenant";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";
import "@/app/styles/home.css";

export const metadata: Metadata = pageMetadata(seo.home);

export default function Home() {
  return (
    <div data-reveal-always style={{ display: "contents" }}>
      <HomeHero />
      <Adoption />
      <Outcomes />
      <Licence />
      <Moments />
      <ModuleGrid />
      <MicrosoftUnderneath />
      <PrivacyTenant />
      <GoLive />
      <ClosingCta />
    </div>
  );
}
