import { PageEntrance } from "@/components/layout/PageEntrance";

/**
 * Page transition: a CSS-only fade + 16px rise (`.page-in`, app/styles/motion.css). The HTML is fully visible without
 * JavaScript (the animation is a backwards-filled keyframe, never an inline opacity:0), it adds no filter or transform
 * afterwards, and it is skipped under prefers-reduced-motion by the global rule.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-in">
      <PageEntrance />
      {children}
    </div>
  );
}
