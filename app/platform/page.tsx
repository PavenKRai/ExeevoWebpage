import type { Metadata } from "next";
import { Suspense } from "react";
import { ModuleScroll } from "@/components/platform/ModuleScroll";
import { ModuleSection } from "@/components/platform/ModuleSection";
import { PlatformIntro } from "@/components/platform/PlatformIntro";
import { modules } from "@/content/modules";
import "@/app/styles/platform.css";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seo.platform);

/** Intro with the module list, then the eight modules stacked (all in the server HTML). `?module=` scrolls to a section. */
export default function PlatformPage() {
  return (
    <>
      <Suspense fallback={null}>
        <ModuleScroll />
      </Suspense>
      <PlatformIntro />
      {modules.map((m, n) => (
        <ModuleSection key={m.slug} module={m} index={n} />
      ))}
    </>
  );
}
