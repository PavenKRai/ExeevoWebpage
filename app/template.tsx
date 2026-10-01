"use client";
import { motion, useReducedMotion } from "motion/react";
import { PageEntrance } from "@/components/layout/PageEntrance";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <PageEntrance />
      {children}
    </motion.div>
  );
}
