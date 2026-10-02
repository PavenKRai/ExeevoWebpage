"use client";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import type { Module } from "@/content/modules";
import { ModuleDeck } from "./ModuleDeck";

/** Reads ?module= (deep link) on the client and passes it down; the page itself renders without it. */
export function ModuleDeckRoute({ modules, header }: { modules: Module[]; header: ReactNode }) {
  return <ModuleDeck modules={modules} header={header} moduleParam={useSearchParams().get("module")} />;
}
