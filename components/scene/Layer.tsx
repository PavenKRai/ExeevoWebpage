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

/**
 * A layer inside a <Scene>. With `intro` it plays `from` -> natural layout once on load (time-based). With only `from`
 * it is hidden at that state while below the fold and reveals ONCE when it scrolls into view (see RevealObserver);
 * `range[0]` staggers it. With only `to` it eases to that pose once an ancestor has [data-compact]. `blur` is ignored.
 * Without `from`/`to` it is a plain wrapper.
 */
export function Layer({ from, to, range = [0, 1], intro, as: Tag = "div", className, style, children, ...rest }: Props) {
  if (intro !== undefined) {
    const css = { ...vars(from, "0"), "--delay": intro, ...style } as CSSProperties;
    return (
      <Tag className={cn("sc-intro", from?.blur !== undefined && "sc-intro-blur", className)} style={css} {...rest}>
        {children}
      </Tag>
    );
  }
  if (!from && to) {
    // A pose reached once, later, when an ancestor gets [data-compact] (see scenes.css .sc-to). Inert elsewhere.
    return (
      <Tag className={cn("sc-to", className)} style={{ ...vars(to, "1"), ...style } as CSSProperties} {...rest}>
        {children}
      </Tag>
    );
  }
  const reveals = !!from && (from.o !== undefined || from.x !== undefined || from.y !== undefined || from.s !== undefined);
  if (!reveals) {
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }
  const delay = Math.round(Math.min(range[0], 0.8) * 800);
  const css = { ...vars(from, "0"), "--rv-delay": `${delay}ms`, ...style } as CSSProperties;
  return (
    <Tag className={cn("rv", className)} style={css} {...rest}>
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

/** Retired: scene progress hairlines belonged to the scroll-scrubbed scenes. Kept so old imports still compile. */
export function SceneProgress(_props: { className?: string }) {
  void _props;
  return null;
}
