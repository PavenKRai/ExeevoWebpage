import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/HomeHero";
import { Pathways } from "@/components/sections/Pathways";
import { Outcomes } from "@/components/sections/Outcomes";
import { PlatformBoard } from "@/components/sections/PlatformBoard";
import { PrivacyTenant } from "@/components/sections/PrivacyTenant";
import { GoLiveBand } from "@/components/sections/GoLiveBand";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seo.home);

export default function Home() {
  return (
    <>
      <HomeHero />
      <Pathways />
      <Outcomes />
      <PlatformBoard />
      <PrivacyTenant />
      <GoLiveBand />
    </>
  );
}
