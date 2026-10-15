"use client";
import { useSearchParams } from "next/navigation";
import { IndustriesPage } from "./IndustriesPage";

/** Reads ?industry= on the client and passes it down; the page itself renders without it (full Pharma page as the Suspense fallback). */
export function IndustriesRoute() {
  return <IndustriesPage industryParam={useSearchParams().get("industry")} />;
}
