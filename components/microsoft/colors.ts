import type { CSSProperties } from "react";
import type { MsColor } from "@/content/microsoft";

/** Colour keys from the Microsoft copy as the --c custom property the `.dot` class reads. */
export const dotStyle = (c: MsColor) => ({ "--c": `var(--ex-${c})` }) as CSSProperties;
