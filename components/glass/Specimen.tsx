import type { CSSProperties, ReactNode } from "react";

/** The Clinical Glass sphere: orb, glow, lens and three tilted rings. Decorative. */
export function Specimen({ size = 440, children, lens = true }: { size?: number | string; children?: ReactNode; lens?: boolean }) {
  return (
    <div className="specimen" data-specimen aria-hidden="true" style={{ "--size": typeof size === "number" ? `${size}px` : size } as CSSProperties}>
      <span className="specimen-glow" />
      <span className="specimen-rings">
        <span className="orbit-ring orbit-ring-1"><span className="ring-spin"><i className="sat sat-magenta" /></span></span>
        <span className="orbit-ring orbit-ring-2"><span className="ring-spin"><i className="sat sat-green" /></span></span>
        <span className="orbit-ring orbit-ring-3"><span className="ring-spin"><i className="sat sat-white" /></span></span>
      </span>
      <span className="specimen-orb orb-fixed" />
      {lens && <span className="lens glass-dark" />}
      {children}
    </div>
  );
}
