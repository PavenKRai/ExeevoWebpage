import type { Metadata } from "next";
import { compliance, whyExeevo } from "@/content/compliance";
import { comparison } from "@/content/comparison";
import { WhyHero } from "@/components/sections/WhyHero";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { WhyTenant } from "@/components/sections/WhyTenant";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seo.why);

export default function WhyExeevoPage() {
  return (
    <>
      <WhyHero label={whyExeevo.label} h1={whyExeevo.h1} intro={whyExeevo.intro} complianceTitle={whyExeevo.complianceTitle} compliance={compliance} />
      <ComparisonTable title={comparison.title} columns={comparison.columns} rows={comparison.rows} footnote={comparison.footnote} />
      <WhyTenant tenant={whyExeevo.tenant} />
    </>
  );
}
