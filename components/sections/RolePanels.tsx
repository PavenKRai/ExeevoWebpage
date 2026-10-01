"use client";
import { RolePanel, type RoleItem } from "./RolePanel";

/** Controlled accordion: the parent owns which role is open (scroll-driven when the scene is pinned). */
export function RolePanels({ roles, active, onSelect }: { roles: readonly RoleItem[]; active: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex flex-col gap-3 md:h-[var(--panel-h,560px)] md:flex-row md:gap-4">
      {roles.map((r, i) => (
        <RolePanel key={r.slug} role={r} index={i} total={roles.length} open={active === i} onSelect={() => onSelect(i)} />
      ))}
    </div>
  );
}
