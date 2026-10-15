import type { Metadata } from "next";
import { BestOfBoth, CompareTable, ConfigPlatform, TenantSection, WhyHero } from "@/components/why/WhySections";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seo.why);

export default function WhyExeevoPage() {
  return (
    <>
      <WhyHero />
      <BestOfBoth />
      <ConfigPlatform />
      <CompareTable />
      <TenantSection />
    </>
  );
}
