import type { Metadata } from "next";
import { Suspense } from "react";
import { CapabilityExplorer } from "@/components/platform/CapabilityExplorer";
import { ModuleScroll } from "@/components/platform/ModuleScroll";
import { PlatformCta } from "@/components/platform/PlatformCta";
import { PlatformHero } from "@/components/platform/PlatformHero";
import { JsonLd } from "@/components/resources/JsonLd";
import { seo } from "@/content/seo";
import { platformJsonLd } from "@/lib/platformJsonLd";
import { pageMetadata } from "@/lib/seo";
import "@/app/styles/platform.css";

export const metadata: Metadata = pageMetadata(seo.platform);

/** Hero, the filterable list of eleven capabilities (all in the server HTML), then the closing call to action. `?module=` (old slugs) and `#cap-<id>` scroll to a section. */
export default function PlatformPage() {
  return (
    <>
      <JsonLd data={platformJsonLd()} />
      <Suspense fallback={null}>
        <ModuleScroll />
      </Suspense>
      <PlatformHero />
      <CapabilityExplorer />
      <PlatformCta />
    </>
  );
}
