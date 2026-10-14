import type { Metadata } from "next";
import { Suspense } from "react";
import { IndustriesPage as Industries } from "@/components/industries/IndustriesPage";
import { IndustriesRoute } from "@/components/industries/IndustriesRoute";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seo.industries);

export default function IndustriesPage() {
  // The fallback is the full Pharma page (h1, intro and cards are in the static HTML / without JS); the route reads
  // ?industry= on the client.
  return (
    <Suspense fallback={<Industries />}>
      <IndustriesRoute />
    </Suspense>
  );
}
