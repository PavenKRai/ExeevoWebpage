import { Layer } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";
import { gettingStarted } from "@/content/paths";
import { DemoForm } from "./DemoForm";
import "./demo-section.css";
import "./scene-choreo.css";

/**
 * Pinned demo scene (from 1024px). `#demo` is an anchor placed 30% into the pinned interval, so a link to
 * /getting-started#demo lands with the block already expanded and the form fully readable.
 */
export function DemoSection({ demo }: { demo: typeof gettingStarted.demo }) {
  return (
    <Scene id="start-demo" pin={40} className="gs-demo" stageClassName="gs-ground">
      <span id="demo" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px pinned:lg:top-[calc(var(--pin)*0.3)]" />
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 md:px-10 lg:px-20 lg:pb-[90px] lg:pt-20 pinned:lg:flex pinned:lg:h-full pinned:lg:flex-col pinned:lg:justify-center pinned:lg:pb-6 pinned:lg:pt-[96px]">
        <Layer
          from={{ s: 0.82 }}
          range={[0, 0.25]}
          className="on-dark relative overflow-hidden rounded-[36px] bg-ink lg:min-h-[580px] lg:py-14 lg:pl-[600px] lg:pr-[60px]"
        >
          <Layer from={{ rot: -140, s: 0.7 }} range={[0, 0.25]} className="absolute -bottom-32 -left-20 size-[320px] lg:-left-[120px] lg:bottom-auto lg:top-[160px] lg:size-[520px]" aria-hidden="true">
            <div className="demo-orb size-full opacity-90" />
          </Layer>
          <Layer from={{ x: -70, o: 0, s: 0.9 }} range={[0, 0.25]} className="glass-dark absolute -bottom-24 -left-10 size-[280px] rounded-full lg:-left-10 lg:bottom-auto lg:top-[250px] lg:size-[440px]" aria-hidden="true" />
          <Layer from={{ o: 0, y: 30 }} range={[0, 0.2]} className="relative flex flex-col gap-4 p-8 lg:absolute lg:left-16 lg:top-[70px] lg:w-[440px] lg:p-0">
            <h2 className="text-[clamp(32px,4vw,42px)] leading-[1.08] tracking-[-0.03em]">{demo.title}</h2>
            <p className="text-[17px] leading-[1.55] text-on-dark">{demo.body}</p>
          </Layer>
          <Layer from={{ x: 160, o: 0, s: 0.96 }} range={[0, 0.25]} className="glass-dark relative mx-5 mb-6 rounded-[28px] p-6 lg:mx-0 lg:mb-0 lg:min-h-[468px] lg:p-[34px]">
            <DemoForm copy={{ consent: demo.consent, success: demo.success, teams: demo.teams }} />
          </Layer>
        </Layer>
      </div>
    </Scene>
  );
}
