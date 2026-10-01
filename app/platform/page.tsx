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
      <Suspense fallback={null}>
        <ModuleDeck
          modules={modules}
          header={<PlatformHeader label={platformPage.label} title={platformPage.h1} intro={platformPage.intro} />}
        />
      </Suspense>
      <RolesBand text={platformPage.band.text} cta={platformPage.band.cta} href={platformPage.band.href} />
    </main>
  );
}
