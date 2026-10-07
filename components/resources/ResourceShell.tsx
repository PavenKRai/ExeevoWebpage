import type { ReactNode } from "react";
import { Glow } from "../glass/Glow";

/** Light ground for every Resources page: glass panels need light behind them, so soft glows sit under the header. */
export function ResourceShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-x-clip pb-20 lg:pb-[120px]">
      <Glow color="blue" style={{ opacity: 0.32 }} className="-right-24 top-[300px] size-[340px] lg:right-[6%] lg:top-[260px] lg:size-[420px]" />
      <Glow color="magenta" style={{ opacity: 0.25 }} className="-left-32 top-[460px] size-[300px]" />
      <div className="frame pt-[128px] lg:pt-[150px]">{children}</div>
    </div>
  );
}
