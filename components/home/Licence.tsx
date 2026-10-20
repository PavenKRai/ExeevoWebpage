import { home } from "@/content/home";
import { LicenceStack } from "./LicenceStack";

/** "One licence, instead of a stack": five separate contracts flowing into one Exeevo licence. Porcelain ground. */
export function Licence() {
  const l = home.licence;
  return (
    <section
      aria-labelledby="licence-title"
      className="relative overflow-hidden bg-porcelain py-20 lg:py-[120px]"
    >
      <div
        className="aura -right-[60px] top-[18%] h-[420px] w-[520px] bg-brand-blue opacity-[.16] max-lg:hidden"
        aria-hidden="true"
      />
      <div
        className="aura bottom-[-60px] right-[18%] h-[360px] w-[420px] bg-brand-green opacity-[.14] max-lg:hidden"
        aria-hidden="true"
      />
      <div
        className="aura -left-20 top-[10%] h-[340px] w-[420px] bg-magenta opacity-[.08] max-lg:hidden"
        aria-hidden="true"
      />
      <div className="hm-wrap flex flex-col gap-12">
        <div className="sr flex flex-wrap items-end justify-between gap-6">
          <h2 id="licence-title" className="h2 max-w-[640px]">
            {l.h2.light} <b>{l.h2.bold}</b>
          </h2>
          <p className="lead max-w-[440px]">{l.lead}</p>
        </div>
        <LicenceStack />
      </div>
    </section>
  );
}
