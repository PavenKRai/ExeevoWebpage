import type { Metadata } from "next";
import { MsBuiltFor } from "@/components/microsoft/MsBuiltFor";
import { MsGroup } from "@/components/microsoft/MsGroup";
import { MsHero } from "@/components/microsoft/MsHero";
import { MsStats } from "@/components/microsoft/MsStats";
import { MsStrip } from "@/components/microsoft/MsStrip";
import { MsWhy } from "@/components/microsoft/MsWhy";
import { JsonLd } from "@/components/resources/JsonLd";
import { microsoft } from "@/content/microsoft";
import { seo } from "@/content/seo";
import { microsoftJsonLd } from "@/lib/companyJsonLd";
import { pageMetadata } from "@/lib/seo";
import "@/app/styles/microsoft.css";

export const metadata: Metadata = pageMetadata(seo.microsoft);

const grounds = [
  { tone: "porcelain", auras: ["-right-[120px] top-[120px] h-[460px] w-[520px] bg-brand-blue opacity-[.12]", "left-[40%] -bottom-20 h-80 w-[360px] bg-brand-blue opacity-[.08]"] },
  { tone: "white", auras: ["-left-24 top-[100px] h-[400px] w-[520px] bg-violet opacity-10"] },
  { tone: "porcelain", auras: ["-right-24 top-[140px] h-[420px] w-[500px] bg-sky opacity-[.12]"] },
  { tone: "white", auras: ["-left-24 top-[120px] h-[420px] w-[520px] bg-magenta opacity-[.08]", "-right-20 bottom-0 h-[360px] w-[460px] bg-brand-green opacity-10"] },
] as const;

export default function MicrosoftPage() {
  return (
    <>
      <JsonLd data={microsoftJsonLd()} />
      <MsHero />
      <MsStrip />
      <MsStats />
      <MsBuiltFor />
      {microsoft.groups.map((g, k) => (
        <MsGroup key={g.id} group={g} tone={grounds[k].tone} auras={[...grounds[k].auras]} />
      ))}
      <MsWhy />
    </>
  );
}
