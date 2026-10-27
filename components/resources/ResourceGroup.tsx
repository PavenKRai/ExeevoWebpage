import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Resource, ResourceType } from "@/content/resources";
import { resourceConfig } from "@/content/resources/config";
import { ResourceCard } from "./ResourceCard";

/** One type on the hub: dot + name, "All <type>" link and the three newest cards. */
export function ResourceGroup({ type, items, tone }: { type: ResourceType; items: Resource[]; tone: "white" | "porcelain" }) {
  const c = resourceConfig(type);
  return (
    <section aria-labelledby={`grp-${type}`} className={`py-14 ${tone === "white" ? "bg-white" : "bg-porcelain"}`}>
      <div className="wrap flex flex-col gap-[26px]">
        <div className="sr flex items-end justify-between gap-4">
          <h2 id={`grp-${type}`} className="inline-flex items-center gap-3 text-[30px] font-normal tracking-[-0.025em] text-heading">
            <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: c.color }} />
            {c.label}
          </h2>
          <Link href={c.path} className="tlink !min-h-11 text-[14px]">
            All {c.label.toLowerCase()}
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <ResourceCard key={r.slug} type={type} item={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
