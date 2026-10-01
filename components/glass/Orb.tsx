import { cn } from "../ui/cn";

/** Brand orb. Static by default (as in the design); pass `spin` for the slow rotation. */
export function Orb({ size = 48, className, spin = false }: { size?: number | string; className?: string; spin?: boolean }) {
  return (
    <span
      aria-hidden="true"
      {...(spin ? { "data-orb": "" } : {})}
      className={cn("orb", spin && "orb-spin", className)}
      style={{ width: size, height: size }}
    />
  );
}
