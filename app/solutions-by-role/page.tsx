import type { Metadata } from "next";
import { roles, rolesPage } from "@/content/roles";
import { RolePanels } from "@/components/sections/RolePanels";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: rolesPage.h1,
  description: rolesPage.intro,
};

export default function SolutionsByRolePage() {
  return (
    <div className="on-dark relative overflow-hidden bg-ink-deep text-white">
      <div aria-hidden="true" className="rings-bg pointer-events-none absolute inset-0" style={{ "--rx": "88%", "--ry": "12%" } as React.CSSProperties} />
      <div className="frame section pt-[140px]">
        <header className="max-w-[760px]">
          <p className="rise text-[15px] font-semibold text-link-on-dark" style={{ "--i": 0 } as React.CSSProperties}>
            {rolesPage.label}
          </p>
          <h1 className="rise mt-4 font-display text-[clamp(40px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ "--i": 1 } as React.CSSProperties}>
            {rolesPage.h1}
          </h1>
          <p className="rise lead mt-6 text-on-dark" style={{ "--i": 2 } as React.CSSProperties}>
            {rolesPage.intro}
          </p>
        </header>
        <div className="sr mt-14">
          <RolePanels roles={roles} />
        </div>
        <div className="sr mt-14 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="lead max-w-[640px] text-white">{rolesPage.closing.line}</p>
          <Button href="/getting-started#demo" size="hero">
            {rolesPage.closing.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
