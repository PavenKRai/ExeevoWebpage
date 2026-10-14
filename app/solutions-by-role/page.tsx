import type { Metadata } from "next";
import { Suspense } from "react";
import { roles, rolesPage } from "@/content/roles";
import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/seo";
import { RolesScene } from "@/components/sections/RolesScene";
import { RolesSceneRoute } from "@/components/sections/RolesSceneRoute";

export const metadata: Metadata = pageMetadata(seo.roles);

export default function SolutionsByRolePage() {
  return (
    // The fallback is the full page (so the h1 and copy are in the static HTML); the route reads ?role= on the client.
    <Suspense fallback={<RolesScene roles={roles} page={rolesPage} />}>
      <RolesSceneRoute roles={roles} page={rolesPage} />
    </Suspense>
  );
}
