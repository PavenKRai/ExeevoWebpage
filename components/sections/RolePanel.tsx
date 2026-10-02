"use client";
import { useRef, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "../ui/cn";

export type RoleItem = {
  slug: string;
  name: string;
  glow: "blue" | "magenta" | "purple" | "green";
  description: string;
  capabilities: readonly string[];
  modules?: readonly { label: string; href: string }[];
};

const color = {
  blue: "var(--ex-blue)",
  magenta: "var(--ex-magenta)",
  purple: "var(--ex-purple)",
  green: "var(--ex-green)",
} as const;

type Props = { role: RoleItem; index: number; total: number; open: boolean; onSelect: () => void };

export function RolePanel({ role, index, total, open, onSelect }: Props) {
  const reduce = useReducedMotion();
  const regionId = `role-region-${role.slug}`;
  const buttonId = `role-button-${role.slug}`;
  const c = color[role.glow];
  const ease = [0.16, 1, 0.3, 1] as const;
  const clicked = useRef(false);
  const button = (
    <button
      id={buttonId}
      type="button"
      aria-expanded={open}
      aria-controls={regionId}
      onClick={() => {
        clicked.current = true;
        onSelect();
      }}
      className={cn(
        "m-0 cursor-pointer border-0 bg-transparent p-0 text-left font-[inherit] text-white after:absolute after:inset-0 after:content-['']",
        open
          ? "font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] md:text-[30px] lg:text-[38px] [@media(max-height:800px)]:lg:text-[30px]!"
          : "text-[20px] font-semibold tracking-[-0.01em] md:text-[21px]",
      )}
    >
      <span className={open ? undefined : "md:inline-block md:whitespace-nowrap md:[transform:rotate(180deg)] md:[writing-mode:vertical-rl]"}>
        {role.name}
      </span>
    </button>
  );
  return (
    <motion.article
      initial={false}
      animate={{ flexGrow: open ? 5 : 1 }}
      transition={{ duration: reduce ? 0 : 0.7, ease }}
      style={{ "--i": index } as CSSProperties}
      className={cn(
        "glass-dark role-arrive relative min-w-0 overflow-hidden rounded-[32px] transition-[translate] duration-500 md:h-full md:basis-0",
        !open && "hover:[translate:0_-6px]",
      )}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px] [clip-path:inset(0_round_32px)]">
        <motion.span
          initial={false}
          animate={{ opacity: open ? 0.6 : 0.25, scale: open ? 1.15 : 1 }}
          transition={{ duration: reduce ? 0 : 0.9, ease }}
          className="absolute -bottom-[110px] -right-[90px] size-80 rounded-full blur-[70px]"
          style={{ background: c }}
        />
      </span>
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="open"
            id={regionId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduce ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.15 } }}
            onAnimationStart={() => {
              // The label button is re-created on open; hand keyboard focus to the new one.
              if (!clicked.current) return;
              clicked.current = false;
              document.getElementById(buttonId)?.focus({ preventScroll: true });
            }}
            transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.05, ease }}
            className="relative flex flex-col gap-8 p-6 text-white md:absolute md:inset-0 md:justify-between md:gap-4 md:px-7 md:py-7 lg:px-11 lg:py-10 [@media(max-height:800px)]:lg:py-5! [@media(max-height:800px)]:md:gap-2!"
          >
            <div className="flex max-w-[640px] flex-col gap-[18px] [@media(max-height:800px)]:gap-2">
              <span className="flex items-center gap-2.5 text-[14px] text-[#C4CED4]">
                <span aria-hidden="true" className="size-3 rounded-full" style={{ background: c }} />
                {`Role ${index + 1} of ${total}`}
              </span>
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <h3 className="m-0 text-[inherit]">{button}</h3>
                {role.modules && (
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {role.modules.map((m) => (
                      <li key={m.href}>
                        <Link href={m.href} className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-[14px] font-medium text-white hover:bg-white/10">
                          {m.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="text-[17px] leading-[1.55] text-on-dark [@media(max-height:800px)]:text-[15px] [@media(max-height:800px)]:leading-[1.45]">{role.description}</p>
            </div>
            <ul className="m-0 flex max-w-[600px] list-none flex-col gap-2.5 p-0">
              {role.capabilities.map((cap, n) => (
                <motion.li
                  key={cap}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.2 + n * 0.09, ease }}
                  className="flex items-center gap-3.5 rounded-[18px] border border-white/[0.14] bg-white/[0.09] px-[18px] py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] [@media(max-height:800px)]:py-2.5"
                >
                  <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-[9px] bg-white text-ink">
                    <Check size={14} strokeWidth={2.4} />
                  </span>
                  <span className="text-[15px] leading-[1.45] text-[#EEF2F4]">{cap}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <motion.div
            key="closed"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.15 } }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.1, ease }}
            className="relative flex items-center gap-3 px-6 py-5 md:absolute md:inset-0 md:flex-col md:items-start md:justify-between md:px-[22px] md:py-7 lg:px-[26px]"
          >
            <span id={regionId} hidden />
            <span aria-hidden="true" className="size-3 shrink-0 rounded-full" style={{ background: c }} />
            <h3 className="m-0 flex text-[inherit]">{button}</h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
