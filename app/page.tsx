import type { Metadata } from "next";
import { BuiltForLifeSciences } from "@/components/home/BuiltForLifeSciences";
import { ClosingCta } from "@/components/home/ClosingCta";
import { GoLive } from "@/components/home/GoLive";
import { HomeHero } from "@/components/home/HomeHero";
import { MicrosoftUnderneath } from "@/components/home/MicrosoftUnderneath";
import { ModuleGrid } from "@/components/home/ModuleGrid";
import { Outcomes } from "@/components/home/Outcomes";
import { PrivacyTenant } from "@/components/home/PrivacyTenant";
import { TechStrip } from "@/components/home/TechStrip";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";
import "@/app/styles/home.css";

export const metadata: Metadata = pageMetadata(seo.home);

export default function Home() {
  return (
    <>
      <HomeHero />
      <TechStrip />
      <BuiltForLifeSciences />
      <MicrosoftUnderneath />
      <Outcomes />
      <ModuleGrid />
      <PrivacyTenant />
      <GoLive />
      <ClosingCta />
    </>
  );
}
