"use client";
import { useState } from "react";
import { RolePanel, type RoleItem } from "./RolePanel";

export function RolePanels({ roles }: { roles: readonly RoleItem[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-4">
      {roles.map((r, i) => (
        <RolePanel key={r.slug} role={r} index={i} total={roles.length} open={active === i} onSelect={() => setActive(i)} />
      ))}
    </div>
  );
}
