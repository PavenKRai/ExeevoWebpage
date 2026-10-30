import type { ImageLoaderProps } from "next/image";

/** Platform screenshots are at most ~1.9k px wide, so never ask the optimiser for the 3840 px size a retina screen would otherwise pick (an upscale that is slow and can stall). */
export const shotLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${Math.min(width, 2048)}&q=${quality ?? 75}`;
