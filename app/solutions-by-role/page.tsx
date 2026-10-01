import type { Metadata } from "next";
import { roles, rolesPage } from "@/content/roles";
import { RolesScene } from "@/components/sections/RolesScene";

export const metadata: Metadata = {
  title: rolesPage.h1,
  description: rolesPage.intro,
};

export default function SolutionsByRolePage() {
  return <RolesScene roles={roles} page={rolesPage} />;
}
