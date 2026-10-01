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
  children: ReactNode;
};

/**
 * A pinned scene. `children` are laid out inside a 100svh sticky stage and animated by `.sc` layers
 * (see app/styles/scenes.css). Below 768px / reduced motion / no browser support it is a normal section.
 */
export function Scene({ pin = 140, id, as: Tag = "section", stageClassName, className, overflowVisible, trackRef, children, ...aria }: Props) {
  return (
    <Tag id={id} ref={trackRef} className={cn("scene", className)} style={{ "--pin": `${pin}vh` } as CSSProperties} {...aria}>
      <div className={cn("scene-stage", overflowVisible && "scene-stage--visible", stageClassName)}>{children}</div>
    </Tag>
  );
}
