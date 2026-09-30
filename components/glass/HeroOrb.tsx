"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Wraps each page's hero sphere so it shares one layoutId across routes. */
export function HeroOrb({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div layoutId="hero-orb" className={className} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
