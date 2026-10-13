"use client";
import { useSearchParams } from "next/navigation";
import { createContext, Suspense, useContext, type ReactNode } from "react";

/** The `?service=<slug>` deep link, available to the phase rails and the form without making the whole page client-rendered. */
const Ctx = createContext<string | null>(null);
export const useServiceParam = () => useContext(Ctx);

function Reader({ children }: { children: ReactNode }) {
  return <Ctx.Provider value={useSearchParams().get("service")}>{children}</Ctx.Provider>;
}

/** The fallback is the full page, so prerendered HTML (and JS-off visitors) get everything; the param is read on the client. */
export function ServiceParamProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={children}>
      <Reader>{children}</Reader>
    </Suspense>
  );
}
