import { contact } from "@/content/services";
import { ServiceForm } from "./ServiceForm";

/** "Talk to our team": mist section with soft glows; the glass form carries `#demo`, the anchor every "Get a demo" button links to. */
export function ContactSection() {
  return (
    <section id="talk" aria-labelledby="talk-title" className="relative scroll-mt-20 overflow-hidden bg-mist py-20 lg:py-[120px]">
      <span aria-hidden="true" className="aura -left-[120px] top-20 size-[520px] bg-brand-blue opacity-[.14] max-lg:hidden" />
      <span aria-hidden="true" className="aura -bottom-[120px] left-[260px] size-[380px] bg-magenta opacity-10 max-lg:hidden" />
      <span id="demo" aria-hidden="true" className="absolute left-0 top-0 h-px w-px scroll-mt-24" />
      <div className="frame relative grid items-start gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="sr flex max-w-[760px] flex-col gap-5 lg:col-span-5">
          <h2 id="talk-title" className="h2">Talk to <b>our team</b></h2>
          <p className="text-[18px] font-[350] leading-[1.6] tracking-normal text-muted [text-wrap:pretty] max-w-[640px]">{contact.body}</p>
        </div>
        <div className="glass srg rounded-[28px] p-6 sm:p-8 lg:col-span-6 lg:col-start-7">
          <ServiceForm />
        </div>
      </div>
    </section>
  );
}
