"use client";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export const VISIBLE = 3;
export const COUNT = 13;
export const MAX_INDEX = COUNT - VISIBLE;
const clamp = (i: number) => Math.max(0, Math.min(MAX_INDEX, i));

type Ctx = {
  /** Feature selected on the hero dial. */
  sel: number;
  setSel: (i: number) => void;
  /** First feature shown in the carousel. */
  idx: number;
  setIdx: (i: number) => void;
  /** Move the carousel to a feature and scroll to it. */
  openFeature: (i: number) => void;
};
const NovaCtx = createContext<Ctx | null>(null);

export function useNova() {
  const c = useContext(NovaCtx);
  if (!c) throw new Error("useNova must be used inside NovaProvider");
  return c;
}

/** Shared selection for the dial, the carousel and the Ask-Nova Plus grid (they all point at the same 13 features). */
export function NovaProvider({ children }: { children: ReactNode }) {
  const [sel, setSel] = useState(0);
  const [idx, setIdxState] = useState(0);
  const setIdx = useCallback((i: number) => setIdxState(clamp(i)), []);
  const openFeature = useCallback((i: number) => {
    setIdxState(clamp(i));
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const value = useMemo(() => ({ sel, setSel, idx, setIdx, openFeature }), [sel, idx, setIdx, openFeature]);
  return <NovaCtx.Provider value={value}>{children}</NovaCtx.Provider>;
}
