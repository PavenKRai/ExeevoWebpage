"use client";
import { useSearchParams } from "next/navigation";
import { IndustrySwitcher } from "./IndustrySwitcher";

/** Reads ?industry= on the client and passes it down; the page itself renders without it. */
export function IndustrySwitcherRoute() {
  return <IndustrySwitcher industryParam={useSearchParams().get("industry")} />;
}
