import Link from "next/link";
import type { CSSProperties } from "react";
import { resourceTypes } from "@/content/resources/config";
import type { ResourceType } from "@/content/resources";
import { cn } from "../ui/cn";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Shared Resources page header (design: label, h1, intro and the sub-navigation tabs). One h1 per page. */
export function ResourcesHeader({ label = "Resources", h1, intro, active }: { label?: string; h1: string; intro: string; active?: ResourceType }) {
  return (
    <header className="flex flex-col gap-8 lg:gap-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex max-w-[760px] flex-col gap-4">
          <p className="rise text-[15px] text-muted" style={i(0)}>{label}</p>
          <h1 className="rise text-[clamp(40px,5vw,64px)] leading-[1.04] tracking-[-0.035em]" style={i(1)}>{h1}</h1>
        </div>
        <p className="rise max-w-[420px] text-[18px] font-[350] leading-[1.55] text-muted" style={i(2)}>{intro}</p>
      </div>
      <nav aria-label="Resources" className="glass-light rise -mx-1 max-w-full self-start overflow-x-auto rounded-[20px] p-1.5" style={i(3)}>
        <ul className="flex gap-1">
          {resourceTypes.map((t) => (
            <li key={t.type}>
              <Link
                href={t.path}
                aria-current={active === t.type ? "page" : undefined}
                className={cn(
                  "flex h-11 items-center whitespace-nowrap rounded-[14px] px-[18px] text-[15px] transition-colors",
                  active === t.type ? "bg-ink font-semibold text-white" : "font-[450] text-body hover:bg-slate/[.07]",
                )}
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
