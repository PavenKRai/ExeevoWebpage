"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Maximize2, X } from "lucide-react";
import { useFocusTrap } from "../layout/useFocusTrap";

type Props = { src: string; alt: string; enlargeLabel: string; closeLabel: string };

/** A capability screenshot that opens a larger view in a glass dialog. Escape, the close button or a click outside closes it. */
export function ShotViewer({ src, alt, enlargeLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const reduce = useReducedMotion();
  return (
    <>
      <button
        type="button"
        aria-label={enlargeLabel}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in rounded-[14px]"
      >
        <Image src={src} alt={alt} width={1600} height={1000} sizes="(min-width: 1024px) 700px, 100vw" className="block aspect-[16/10] w-full rounded-[14px] object-cover object-left-top" />
        <span aria-hidden="true" className="glass absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full text-heading transition-opacity group-hover:opacity-100 lg:opacity-70">
          <Maximize2 size={18} strokeWidth={1.8} />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <Viewer key="viewer" src={src} alt={alt} closeLabel={closeLabel} onClose={close} reduce={!!reduce} />
        )}
      </AnimatePresence>
    </>
  );
}

function Viewer({ src, alt, closeLabel, onClose, reduce }: { src: string; alt: string; closeLabel: string; onClose: () => void; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  const fade = reduce ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const };
  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={fade}
      onClick={onClose}
      className="glass fixed inset-0 z-[60] flex items-center justify-center bg-porcelain/90 p-4 sm:p-8"
    >
      <button type="button" aria-label={closeLabel} onClick={onClose} className="btn btn-glass absolute right-4 top-4 z-10 size-12 !p-0 sm:right-6 sm:top-6">
        <X size={20} strokeWidth={1.6} />
      </button>
      <motion.div
        initial={reduce ? false : { scale: 0.97, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={reduce ? undefined : { scale: 0.98, y: 8 }}
        transition={fade}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[calc(100vh-7rem)] max-w-full overflow-auto rounded-[20px] bg-white/80 p-2 shadow-[0_0_0_1px_var(--ex-hairline)] sm:p-3 lg:overflow-visible"
        tabIndex={0}
      >
        <Image src={src} alt={alt} width={1600} height={1000} quality={90} sizes="(min-width: 1024px) 95vw, 1000px" className="block aspect-[16/10] h-auto w-[1000px] max-w-none rounded-[14px] object-contain lg:w-[min(2000px,calc(100vw-4rem),calc((100vh-9rem)*1.6))]" />
      </motion.div>
    </motion.div>
  );
}
