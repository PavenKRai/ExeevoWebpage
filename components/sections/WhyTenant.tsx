import { GlassPanel } from "@/components/glass/GlassPanel";
import { Glow } from "@/components/glass/Glow";
import { Orb } from "@/components/glass/Orb";

type Tenant = {
  title: string;
  lead: string;
  body: string;
  cardTitle: string;
  cardBody: string;
  rings: { outer: string; inner: string; core: string };
};

export function WhyTenant({ tenant }: { tenant: Tenant }) {
  return (
    <section className="on-dark section relative overflow-hidden bg-ink text-on-dark">
      <Glow color="magenta" className="-right-20 top-10 h-96 w-96" />
      <div className="frame grid items-center gap-16 lg:grid-cols-2">
        <div>
          <h2 className="sr">{tenant.title}</h2>
          <p className="lead sr mt-5 text-link-on-dark">{tenant.lead}</p>
          <p className="body-lg sr mt-6">{tenant.body}</p>
          <GlassPanel tone="dark" className="srg d2 mt-10 max-w-[560px] rounded-card p-7">
            <h3 className="mb-3 text-[24px]">{tenant.cardTitle}</h3>
            <p className="text-[16px] text-on-dark">{tenant.cardBody}</p>
          </GlassPanel>
        </div>

        <div className="srg relative mx-auto aspect-square w-full max-w-[560px]" role="group" aria-label={`${tenant.rings.outer}, ${tenant.rings.inner}, ${tenant.rings.core}`}>
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/30">
            <span className="absolute left-1/2 top-4 -translate-x-1/2 px-3 text-center text-[15px] font-semibold text-link-on-dark">{tenant.rings.outer}</span>
          </div>
          <div className="absolute inset-[16%] rounded-full border border-white/40 bg-white/5">
            <span className="absolute left-1/2 top-4 -translate-x-1/2 px-3 text-center text-[15px] font-semibold text-white">{tenant.rings.inner}</span>
          </div>
          <div className="absolute inset-[34%] flex items-center justify-center">
            <Orb size="100%" className="absolute inset-0" />
            <GlassPanel tone="dark" className="relative z-10 flex h-[62%] w-[82%] items-center justify-center rounded-card-s p-2 text-center">
              <span className="text-[15px] font-semibold leading-tight text-white">{tenant.rings.core}</span>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
