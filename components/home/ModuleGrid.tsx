import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CategoryDot } from "@/components/ui/CategoryDot";
import { modules } from "@/content/modules";
import { home } from "@/content/home";

/** "Everything in one view": heading, category legend and the eight modules as glass cards linking into the Platform page. */
export function ModuleGrid() {
  const p = home.platform;
  return (
    <section aria-labelledby="platform-title" className="relative overflow-hidden bg-mist py-20 lg:py-[120px]">
      <div className="aura -left-40 top-[200px] size-[560px] bg-brand-blue opacity-[.14] max-lg:hidden" aria-hidden="true" />
      <div className="aura -bottom-[60px] -right-20 size-[420px] bg-brand-green opacity-[.16] max-lg:hidden" aria-hidden="true" />
      <div className="hm-wrap grid gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col gap-7 lg:col-span-4">
          <div className="sr flex max-w-[760px] flex-col gap-5">
            <h2 id="platform-title" className="h2">{p.h2.light} <b>{p.h2.bold}</b></h2>
            <p className="hm-lead max-w-[640px]">{p.body}</p>
          </div>
          <ul className="sr flex flex-col border-t border-[#D3DBE0]">
            {p.legend.map((l) => (
              <li key={l.text} className="flex items-baseline gap-3 border-b border-[#D3DBE0] py-3 text-[14px] text-body">
                <CategoryDot category={l.category} className="!size-2.5" />
                <span>{l.text}</span>
              </li>
            ))}
          </ul>
          <Button href="/platform" className="sr self-start">
            {p.cta}
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </Button>
        </div>
        <ul className="grid grid-cols-2 content-center gap-3.5 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
          {modules.map((m) => {
            const lines = p.breaks[m.slug];
            return (
              <li key={m.slug} className="contents">
                <Link href={m.slug === "ask-nova-studio" ? "/ask-nova" : `/platform?module=${m.slug}`} className="glass lift srg relative flex min-h-[168px] flex-col justify-between gap-10 rounded-[22px] p-[22px]">
                  <CategoryDot category={m.category} className="!size-3" />
                  <span className="flex flex-col gap-1.5">
                    <span className="text-[18px] font-[450] tracking-[-0.01em] text-heading">
                      {lines ? lines.map((l, k) => <span key={l}>{k > 0 && <br />}{l}</span>) : m.name}
                    </span>
                    <span className="label">{m.category === "ai" ? "AI" : m.categoryLabel}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
