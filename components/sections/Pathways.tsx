import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Glow } from "../glass/Glow";
import { Orb } from "../glass/Orb";
import { home } from "@/content/site";

const delays = ["d1", "d2", "d3"];

export function Pathways() {
  const p = home.pathways;
  return (
    <section className="section bg-mist">
      <div className="frame">
        <h2 className="sr max-w-[720px]">{p.title}</h2>
        <p className="lead sr mt-4 text-muted">{p.subtitle}</p>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {p.items.map((item, i) => (
            <div key={item.persona} className="relative">
              <Glow color={item.glow} parallax className="-right-6 top-10 size-48" />
              <Link
                href={item.href}
                className={`glass-light srg ${delays[i]} relative flex h-full flex-col rounded-card p-7 lift md:p-8`}
              >
                <Orb size={44} />
                <p className="mt-6 text-[15px] font-semibold text-muted">{item.persona}</p>
                <h3 className="mt-2">{item.question}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-body">{item.body}</p>
                <span className="mt-8 flex items-center justify-between gap-4 pt-2 font-semibold text-heading">
                  {item.cta}
                  <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-chip bg-ink text-white">
                    <ArrowRight size={20} strokeWidth={1.8} />
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
