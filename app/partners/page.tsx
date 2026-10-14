import type { Metadata } from "next";
import { BecomePartner } from "@/components/partners/BecomePartner";
import { PartnerDirectory } from "@/components/partners/PartnerDirectory";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { JsonLd } from "@/components/resources/JsonLd";
import { seo } from "@/content/seo";
import { partnersJsonLd } from "@/lib/companyJsonLd";
import { pageMetadata } from "@/lib/seo";
import "@/app/styles/company.css";

export const metadata: Metadata = pageMetadata(seo.partners);

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={partnersJsonLd()} />
      <PartnersHero />
      <PartnerDirectory />
      <BecomePartner />
    </>
  );
}
