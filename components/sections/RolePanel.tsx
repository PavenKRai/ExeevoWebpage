"use client";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Glow } from "../glass/Glow";
import { cn } from "../ui/cn";

export type RoleItem = {
  slug: string;
  name: string;
  glow: "blue" | "magenta" | "purple" | "green";
  description: string;
  capabilities: readonly string[];
};

const dot = { blue: "bg-brand-blue", magenta: "bg-magenta", purple: "bg-purple", green: "bg-brand-green" } as const;

type Props = { role: RoleItem; index: number; total: number; open: boolean; onSelect: () => void };

export function RolePanel({ role, index, total, open, onSelect }: Props) {
  const reduce = useReducedMotion();
  const regionId = `role-region-${role.slug}`;
  const buttonId = `role-button-${role.slug}`;
  const dur = reduce ? 0 : 0.7;
  return (
    <motion.article
      initial={false}
      animate={{ flexGrow: open ? 5 : 1 }}
      transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
      className="glass-dark relative basis-auto overflow-hidden rounded-panel md:h-[560px] md:min-w-0 md:basis-0"
    >
      <Glow
        color={role.glow}
        className="-bottom-20 -right-20 size-72 transition-opacity duration-700"
        style={{ opacity: open ? 0.85 : 0.3 }}
      />
      <h3 className="relative m-0 font-display text-[inherit] font-normal md:contents">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={regionId}
          onClick={onSelect}
          className={cn(
            "relative flex w-full min-h-[64px] cursor-pointer items-center gap-3 px-6 text-left text-white",
            "md:min-h-0 md:flex-col md:items-start md:justify-start md:gap-5 md:p-7",
            !open && "md:h-full",
          )}
        >
          <span aria-hidden="true" className={cn("inline-block size-3.5 shrink-0 rounded-full", dot[role.glow])} />
          <span
            className={cn(
              "font-display font-semibold tracking-tight",
              open ? "text-[22px] md:text-[38px] md:leading-[1.1]" : "text-[20px] md:text-[22px] md:[writing-mode:vertical-rl]",
            )}
          >
            {role.name}
          </span>
        </button>
      </h3>
      <div id={regionId} role="region" aria-labelledby={buttonId} className="relative">
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, delay: reduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-5 px-6 pb-7 md:px-7 md:pb-7 md:pt-0"
          >
            <p className="text-[15px] font-medium text-on-dark">{`Role ${index + 1} of ${total}`}</p>
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-on-dark">{role.description}</p>
            <ul className="grid gap-3">
              {role.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 rounded-card-s border border-white/15 bg-white/10 p-4">
                  <span aria-hidden="true" className="mt-0.5 flex size-[26px] shrink-0 items-center justify-center rounded-[9px] bg-white text-ink">
                    <Check size={16} strokeWidth={1.8} />
                  </span>
                  <span className="text-[15px] leading-snug text-white">{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}
