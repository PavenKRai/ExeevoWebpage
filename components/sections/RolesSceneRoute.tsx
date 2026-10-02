"use client";
import { useSearchParams } from "next/navigation";
import { RolesScene } from "./RolesScene";
import type { RoleItem } from "./RolePanel";

type Page = { label: string; h1: string; intro: string; closing: { line: string; cta: string } };

/** Reads ?role= (deep link from the nav menu) and passes it down; the page itself renders without it. */
export function RolesSceneRoute({ roles, page }: { roles: readonly RoleItem[]; page: Page }) {
  const role = useSearchParams().get("role");
  return <RolesScene roles={roles} page={page} roleParam={role} />;
}
