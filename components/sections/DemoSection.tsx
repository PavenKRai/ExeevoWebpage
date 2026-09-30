import { gettingStarted } from "@/content/paths";
import { Orb } from "../glass/Orb";
import { Glow } from "../glass/Glow";
import { DemoForm } from "./DemoForm";

export function DemoSection({ demo }: { demo: typeof gettingStarted.demo }) {
  return (
    <section id="demo" className="on-dark relative overflow-hidden rounded-block bg-ink p-8 text-white md:p-14 lg:p-16">
      <Glow color="blue" className="-left-20 top-10 size-80" />
      <Glow color="magenta" className="-right-24 bottom-0 size-80" />
      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="sr grid gap-6">
          <div aria-hidden="true" className="relative mb-4 size-[140px]">
            <Orb size={140} />
            <span className="glass-dark absolute -bottom-4 -right-6 size-[90px] rounded-full" />
          </div>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em]">{demo.title}</h2>
          <p className="body-lg max-w-[46ch] text-on-dark">{demo.body}</p>
        </div>
        <div className="glass-light srg rounded-card p-6 md:p-9">
          <DemoForm copy={{ consent: demo.consent, success: demo.success, teams: demo.teams }} />
        </div>
      </div>
    </section>
  );
}
