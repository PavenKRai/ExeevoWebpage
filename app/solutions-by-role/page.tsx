import type { Metadata } from "next";
import { Suspense } from "react";
import { roles, rolesPage } from "@/content/roles";
import { RolesScene } from "@/components/sections/RolesScene";
import { RolesSceneRoute } from "@/components/sections/RolesSceneRoute";

export const metadata: Metadata = {
  title: rolesPage.h1,
  description: rolesPage.intro,
};

export default function SolutionsByRolePage() {
  return (
    // The fallback is the full page (so the h1 and copy are in the static HTML); the route reads ?role= on the client.
    <Suspense fallback={<RolesScene roles={roles} page={rolesPage} />}>
      <RolesSceneRoute roles={roles} page={rolesPage} />
    </Suspense>
  );
}
