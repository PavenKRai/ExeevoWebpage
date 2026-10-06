import type { Metadata } from "next";
import { Suspense } from "react";
import { IndustrySwitcher } from "@/components/sections/IndustrySwitcher";
import { IndustrySwitcherRoute } from "@/components/sections/IndustrySwitcherRoute";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seo.industries);

export default function IndustriesPage() {
  // The fallback is the full Pharma page (h1, intro and cards are in the static HTML / without JS); the route reads
  // ?industry= on the client.
  return (
    <Suspense fallback={<IndustrySwitcher />}>
      <IndustrySwitcherRoute />
    </Suspense>
  );
}
