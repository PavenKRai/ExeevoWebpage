import type { CSSProperties, ReactNode } from "react";

/**
 * The Clinical Glass sphere cluster. Design box is 600x600; everything inside is laid out
 * in those units and scaled as one, so `children` may be absolutely positioned in 600-unit px.
 * `size` is a px number or a CSS length/percentage (the box is always square).
 * `orbInset` and `lensSize` are accepted for backward compatibility and ignored.
 */
type Props = {
  size?: number | string;
  children?: ReactNode;
  lens?: boolean;
  orbInset?: number;
  lensSize?: number;
};

export function Specimen({ size = 600, children, lens = true }: Props) {
  const numeric = typeof size === "number";
  const style = { "--size": numeric ? `${size}px` : size, ...(numeric ? { "--k": size / 600 } : {}) } as CSSProperties;
  return (
    <div className={numeric ? "specimen" : "specimen specimen-fluid"} data-specimen aria-hidden="true" style={style}>
      <div className="specimen-stage">
        <span className="specimen-glow" />
        <span className="orb specimen-sphere" />
        <span className="specimen-shade" />
        {lens && <span className="specimen-lens glass-dark" />}
        <span className="specimen-rings">
          <span className="orbit-ring orbit-ring-1"><i className="sat sat-magenta" /></span>
          <span className="orbit-ring orbit-ring-2"><i className="sat sat-green" /></span>
          <span className="orbit-ring orbit-ring-3"><i className="sat sat-white" /></span>
        </span>
        {children}
      </div>
    </div>
  );
}
