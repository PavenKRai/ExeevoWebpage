import { GoLivePaths } from "@/components/sections/GoLivePaths";
import { gettingStarted, servicesPage } from "@/content/services";

/** "Two paths to go live" (Core / Enterprise), shown at the top of the Implement phase. */
export function PathsBlock() {
  return (
    <div className="mb-6 flex flex-col gap-[22px] lg:mb-[72px] lg:gap-3.5">
      <div className="sr flex flex-col justify-between gap-3 lg:flex-row lg:items-end lg:gap-6">
        <h3 className="text-[clamp(22px,1.7vw,24px)] leading-[1.1] tracking-[-0.02em]">{servicesPage.paths.title}</h3>
        <p className="max-w-[400px] text-[15px] leading-[1.55] text-muted">{servicesPage.paths.body}</p>
      </div>
      <GoLivePaths paths={gettingStarted.paths} connector={gettingStarted.connector} reveal />
    </div>
  );
}
