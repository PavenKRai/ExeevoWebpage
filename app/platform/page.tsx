import type { Metadata } from "next";
import { Suspense } from "react";
import { PlatformHeader } from "@/components/sections/PlatformHeader";
import { ModuleDeck } from "@/components/sections/ModuleDeck";
import { RolesBand } from "@/components/sections/RolesBand";
import { platformPage, modules } from "@/content/modules";

export const metadata: Metadata = {
  title: platformPage.h1,
  description: platformPage.intro,
};

export default function PlatformPage() {
  return (
    <main id="main">
      <PlatformHeader label={platformPage.label} title={platformPage.h1} intro={platformPage.intro} />
      <section className="lab-grid relative overflow-hidden pb-[var(--ex-section-y)]" aria-label="Platform modules">
        <div className="frame">
          <Suspense fallback={null}>
            <ModuleDeck modules={modules} />
          </Suspense>
        </div>
      </section>
      <RolesBand text={platformPage.band.text} cta={platformPage.band.cta} href={platformPage.band.href} />
    </main>
  );
}
