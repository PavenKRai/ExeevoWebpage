import type { Metadata } from "next";
import { Suspense } from "react";
import { PlatformHeader } from "@/components/sections/PlatformHeader";
import { ModuleDeck } from "@/components/sections/ModuleDeck";
import { ModuleDeckRoute } from "@/components/sections/ModuleDeckRoute";
import { RolesBand } from "@/components/sections/RolesBand";
import { platformPage, modules } from "@/content/modules";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seo.platform);

export default function PlatformPage() {
  const header = <PlatformHeader label={platformPage.label} title={platformPage.h1} intro={platformPage.intro} />;
  return (
    <>
      {/* The fallback is the full page (so the h1 and every module are in the static HTML / without JS); the route
          reads ?module= on the client. */}
      <Suspense fallback={<ModuleDeck modules={modules} header={header} />}>
        <ModuleDeckRoute modules={modules} header={header} />
      </Suspense>
      <RolesBand text={platformPage.band.text} cta={platformPage.band.cta} href={platformPage.band.href} />
    </>
  );
}
