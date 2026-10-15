import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryDot } from "@/components/ui/CategoryDot";
import { home } from "@/content/home";

/** "Not sure where to start?": two solid cards that route visitors by intent. */
export function Pathways() {
  const p = home.pathways;
  return (
    <section aria-labelledby="pathways-title" className="bg-white py-20 lg:py-[120px]">
      <div className="hm-wrap flex flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="pathways-title" className="h2 sr max-w-[760px]">{p.h2.light} <b>{p.h2.bold}</b></h2>
          <p className="hm-lead sr max-w-[360px]">{p.lead}</p>
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {p.items.map((it) => (
            <li key={it.href} className="contents">
              <Link href={it.href} className="card lift sr flex min-h-[330px] flex-col gap-[22px] p-[30px]">
                <p className="label inline-flex items-center gap-2.5"><CategoryDot category={it.category} className="!size-2.5" />{it.persona}</p>
                <h3 className="h3 !text-[24px] !font-normal">{it.question}</h3>
                <p className="body-text">{it.body}</p>
                <span className="tlink mt-auto">{it.cta}<ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
