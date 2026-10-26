"use client";
import { useState } from "react";
import { capabilities, platformIndustries, platformPage, platformRoles, type PlatformIndustry } from "@/content/platform";
import { CapabilitySection } from "./CapabilitySection";

type IndustryFilter = "All" | PlatformIndustry;

/** Filter bar (industry + who uses it), the "Jump to a capability" row, and the capability sections. Everything renders on the server; filtering only hides what does not match. */
export function CapabilityExplorer() {
  const p = platformPage;
  const [industry, setIndustry] = useState<IndustryFilter>("All");
  const [role, setRole] = useState("All");
  const visible = capabilities.filter((c) => (industry === "All" || c.industries.includes(industry)) && (role === "All" || c.roles.includes(role)));
  const roleOn = role !== "All";
  return (
    <>
      <section aria-label={p.filter.title} className="relative bg-porcelain pt-7">
        <div className="wrap flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[15px] font-medium text-heading">{p.filter.title}</h2>
            <div className="flex flex-wrap items-center gap-2.5">
              <div role="group" aria-label={p.filter.industryLabel} className="flex flex-wrap gap-1.5">
                {(["All", ...platformIndustries.map((i) => i.name)] as IndustryFilter[]).map((f) => {
                  const on = f === industry;
                  const dot = platformIndustries.find((i) => i.name === f)?.color;
                  return (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setIndustry(f)}
                      className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[13.5px] transition-all duration-300 ${on ? "border-heading bg-heading text-white" : "border-[#D9E0E5] bg-white text-heading"}`}
                    >
                      {dot && <span aria-hidden="true" className="size-[9px] rounded-full" style={{ background: dot }} />}
                      {f === "All" ? p.filter.all : f}
                    </button>
                  );
                })}
              </div>
              <label className={`inline-flex h-11 items-center gap-2 rounded-full border pl-4 pr-1.5 text-[13.5px] ${roleOn ? "border-heading bg-heading text-white" : "border-[#D9E0E5] bg-white text-heading"}`}>
                <span>{p.filter.usedBy}</span>
                <select aria-label={p.filter.roleLabel} value={role} onChange={(e) => setRole(e.target.value)} className="h-[34px] cursor-pointer border-0 bg-transparent pr-2 text-[13.5px] text-inherit [&>option]:text-heading">
                  <option value="All">{p.filter.allRoles}</option>
                  {platformRoles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <nav aria-label={p.filter.jump} className="cap-jump flex gap-1.5 overflow-x-auto border-b border-[#D9E0E5] pb-3.5 pt-1">
            {visible.map((c) => (
              <a key={c.id} href={`#cap-${c.id}`} className="flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-white/70 px-3.5 text-[13px] text-heading shadow-[0_0_0_1px_var(--ex-hairline)]">{c.name}</a>
            ))}
          </nav>
          <p className="sr-only" role="status" aria-live="polite">{p.shown(visible.length)}</p>
          {visible.length === 0 && <p className="rounded-3xl bg-white/70 p-9 text-[15px] text-muted shadow-[0_0_0_1px_var(--ex-hairline)]">{p.empty}</p>}
        </div>
      </section>
      {visible.map((c, k) => (
        <CapabilitySection key={c.id} cap={c} index={k} features={c.features.filter((f) => !f.industry || industry === "All" || f.industry === industry)} />
      ))}
    </>
  );
}
