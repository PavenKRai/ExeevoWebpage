import type { Metadata } from "next";
import { Suspense } from "react";
import { IndustrySwitcher } from "@/components/sections/IndustrySwitcher";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description: industries.items.pharma.intro,
};

export default function IndustriesPage() {
  return (
    <Suspense fallback={null}>
      <IndustrySwitcher />
    </Suspense>
  );
}
