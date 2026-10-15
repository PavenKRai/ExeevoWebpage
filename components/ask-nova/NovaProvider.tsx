"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { features } from "@/content/askNova";

export const COUNT = features.length;

type Ctx = {
  /** Feature selected on the hero dial. */
  sel: number;
  setSel: (i: number) => void;
  /** Stage filter of the feature list (-1 = all). */
  stage: number;
  setStage: (s: number) => void;
  /** Feature number briefly highlighted in the list after "Read about this feature" or a Plus tile was used. */
  flash: string | null;
  /** Select a feature, show it in the list, scroll to it and highlight it. */
  openFeature: (i: number) => void;
};
const NovaCtx = createContext<Ctx | null>(null);

export function useNova() {
  const c = useContext(NovaCtx);
  if (!c) throw new Error("useNova must be used inside NovaProvider");
  return c;
}

/** Shared state for the dial, the Ask-Nova Plus tiles and the feature list (they all point at the same 13 features). */
export function NovaProvider({ children }: { children: ReactNode }) {
  const [sel, setSel] = useState(0);
  const [stage, setStage] = useState(-1);
  const [flash, setFlash] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const openFeature = useCallback((i: number) => {
    setSel(i);
    setStage(-1);
    const num = features[i].num;
    setFlash(num);
    window.setTimeout(() => document.getElementById(`f${num}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 40);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFlash(null), 2200);
  }, []);

  const value = useMemo(() => ({ sel, setSel, stage, setStage, flash, openFeature }), [sel, stage, flash, openFeature]);
  return <NovaCtx.Provider value={value}>{children}</NovaCtx.Provider>;
}
