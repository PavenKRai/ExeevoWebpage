import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "../ui/cn";

type N = number | string;
export type LayerState = {
  /** opacity 0..1 */ o?: number;
  /** translate X/Y — numbers are px, strings pass through (e.g. "-20vw", "30%") */ x?: N; y?: N;
  /** scale */ s?: number;
  /** rotate — number = degrees about Z, or a string like "x -30deg" (use the same axis in from & to) */ rot?: N;
  /** blur in px */ blur?: number;
};

type Props = {
  /** Scrubbed-from state (start of this layer's slice). The plain layout is the end state. */
  from?: LayerState;
  /** Scrubbed-to state (defaults to the natural layout). */
  to?: LayerState;
  /** Slice of the pinned interval this layer animates in, 0..1. */
  range?: [number, number];
  /**
   * Play `from` -> natural layout as a TIME-based entrance on load instead of scrubbing with scroll
   * (value = delay in seconds). Use for anything in the first scene of a page, so the page is complete at
   * scroll position 0. `range` is ignored.
   */
  intro?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  "aria-hidden"?: boolean | "true" | "false";
};

const len = (v: N) => (typeof v === "number" ? `${v}px` : v);
const deg = (v: N) => (typeof v === "number" ? `${v}deg` : v);

function vars(st: LayerState | undefined, k: "0" | "1") {
  const o: Record<string, string | number> = {};
  if (!st) return o;
  if (st.o !== undefined) o[`--o${k}`] = st.o;
  if (st.x !== undefined) o[`--x${k}`] = len(st.x);
  if (st.y !== undefined) o[`--y${k}`] = len(st.y);
  if (st.s !== undefined) o[`--s${k}`] = st.s;
  if (st.rot !== undefined) o[`--rot${k}`] = deg(st.rot);
  if (st.blur !== undefined) o[`--b${k}`] = `${st.blur}px`;
  return o;
}

/** A scrubbed layer inside a <Scene>. Without pinning support it simply renders in its natural (final) state. */
export function Layer({ from, to, range = [0, 1], intro, as: Tag = "div", className, style, children, ...rest }: Props) {
  const css = { ...vars(from, "0"), ...vars(to, "1"), "--a": range[0], "--b": range[1], ...style } as CSSProperties;
  // Only layers that actually blur get a filter (a filter makes a backdrop root for glass inside).
  const blurIn = from?.blur !== undefined, blurOut = to?.blur !== undefined;
  const blurClass = blurIn && blurOut ? "sc-blur" : blurIn ? "sc-blur-in" : blurOut ? "sc-blur-out" : undefined;
  if (intro !== undefined) {
    return (
      <Tag className={cn("sc-intro", blurIn && "sc-intro-blur", className)} style={{ ...css, "--delay": intro } as CSSProperties} {...rest}>
        {children}
      </Tag>
    );
  }
  return (
    <Tag className={cn("sc", blurClass, className)} style={css} {...rest}>
      {children}
    </Tag>
  );
}

/** Slow background parallax across the whole track. `depth` = px travelled each way (bigger = nearer). */
export function Parallax({ depth = 80, as: Tag = "div", className, style, children, ...rest }: { depth?: number; as?: ElementType; className?: string; style?: CSSProperties; children?: ReactNode; "aria-hidden"?: boolean | "true" | "false" }) {
  return (
    <Tag className={cn("sc-par", className)} style={{ "--par": `${depth}px`, ...style } as CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}

/** Hairline that fills across the pinned interval (scene progress). */
export function SceneProgress({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("sc-progress h-0.5 w-full origin-left bg-[image:var(--ex-gradient)]", className)} />;
}
