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
    <Suspense
      fallback={
        <section className="px-5 pb-16 pt-[140px] xl:px-20 xl:pt-[170px]">
          <h1 className="max-w-[760px]">{industries.items.pharma.h1}</h1>
          <p className="body-lg mt-6 max-w-[620px] text-muted">{industries.items.pharma.intro}</p>
        </section>
      }
    >
      <IndustrySwitcher />
    </Suspense>
  );
}
