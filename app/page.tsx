import type { Metadata } from "next";
import { GoLive } from "@/components/home/GoLive";
import { HomeHero } from "@/components/home/HomeHero";
import { ModuleGrid } from "@/components/home/ModuleGrid";
import { Outcomes } from "@/components/home/Outcomes";
import { Pathways } from "@/components/home/Pathways";
import { PrivacyTenant } from "@/components/home/PrivacyTenant";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";
import "@/app/styles/home.css";

export const metadata: Metadata = pageMetadata(seo.home);

export default function Home() {
  return (
    <>
      <HomeHero />
      <Outcomes />
      <ModuleGrid />
      <PrivacyTenant />
      <GoLive />
      <Pathways />
    </>
  );
}
