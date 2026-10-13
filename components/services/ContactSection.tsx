import { Layer } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";
import { contact } from "@/content/services";
import { ServiceForm } from "./ServiceForm";
import "../sections/demo-section.css";
import "../sections/scene-choreo.css";

/** "Talk to our team": the dark block with the sphere and the dark-glass form (same styling as the old demo form). `#demo` is the anchor every "Get a demo" button links to. */
export function ContactSection() {
  return (
    <Scene id="talk" className="gs-demo" stageClassName="gs-ground">
      <span id="demo" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px scroll-mt-24" />
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 md:px-10 lg:px-20 lg:pb-[90px] lg:pt-20">
        <Layer
          from={{ s: 0.9 }}
          className="on-dark relative overflow-hidden rounded-[36px] bg-ink lg:min-h-[640px] lg:py-14 lg:pl-[600px] lg:pr-[60px]"
        >
          <Layer from={{ rot: -140, s: 0.7 }} range={[0, 0.25]} className="absolute -bottom-32 -left-20 size-[320px] lg:-left-[120px] lg:bottom-auto lg:top-[160px] lg:size-[520px]" aria-hidden="true">
            <div className="demo-orb size-full opacity-90" />
          </Layer>
          <Layer from={{ x: -70, o: 0, s: 0.9 }} range={[0, 0.25]} className="glass-dark absolute -bottom-24 -left-10 size-[280px] rounded-full lg:-left-10 lg:bottom-auto lg:top-[250px] lg:size-[440px]" aria-hidden="true" />
          <div className="relative flex flex-col gap-4 p-8 lg:absolute lg:left-16 lg:top-[70px] lg:w-[440px] lg:p-0">
            <h2 className="text-[clamp(32px,4vw,42px)] leading-[1.08] tracking-[-0.03em]">{contact.title}</h2>
            <p className="text-[17px] leading-[1.55] text-on-dark">{contact.body}</p>
          </div>
          <div className="glass-dark relative mx-5 mb-6 rounded-[28px] p-6 lg:mx-0 lg:mb-0 lg:min-h-[520px] lg:p-[34px]">
            <ServiceForm />
          </div>
        </Layer>
      </div>
    </Scene>
  );
}
