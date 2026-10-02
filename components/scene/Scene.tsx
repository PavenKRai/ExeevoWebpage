import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "../ui/cn";

type Props = {
  /** Extra scroll distance the stage stays pinned for, in viewport heights (e.g. 140). */
  pin?: number;
  id?: string;
  as?: ElementType;
  /** Ground colour classes for the stage, e.g. "bg-ink on-dark" or "bg-mist". */
  stageClassName?: string;
  className?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  /** Let children overflow the stage (glows, 3D); default clips to the stage. */
  overflowVisible?: boolean;
  /** Attach to the track for client code (see useSceneProgress). */
  trackRef?: React.Ref<HTMLElement>;
  style?: CSSProperties;
  /** One-screen stage: the stage is 100svh tall and the `pinned:` layout classes apply (Platform, Industries, Roles). */
  fit?: boolean;
  children: ReactNode;
};

/**
 * A scene is a normal scrolling section (`pin` is accepted for compatibility and ignored). Its <Layer>s reveal once
 * as they scroll into view; see app/styles/reveal.css.
 */
export function Scene({ pin: _pin, id, as: Tag = "section", stageClassName, className, overflowVisible, trackRef, style, fit, children, ...aria }: Props) {
  void _pin;
  return (
    <Tag id={id} ref={trackRef} className={cn("scene", fit && "pin-layout", className)} style={style} {...aria}>
      <div className={cn("scene-stage", overflowVisible && "scene-stage--visible", stageClassName)}>{children}</div>
    </Tag>
  );
}
