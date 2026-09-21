"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Cycles through `words` with a vertical roll (the previous word exits up,
 * the next enters from below), like a split-flap board. Every word is laid
 * in the same grid cell (invisible) so the slot's height never changes; its
 * width is measured from the active word and transitioned, so the line
 * reflows smoothly and any underline hugs the word. Under reduced motion it
 * just swaps.
 */
export function RollingWords({
  words,
  interval = 2400,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const ghosts = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (words.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => window.clearInterval(id);
  }, [words, interval]);

  // Reset when the language changes (the words array is swapped wholesale).
  useEffect(() => setIndex(0), [words]);

  // Width of the active word, re-measured on resize / font load.
  useIsoLayoutEffect(() => {
    const measure = () => {
      const el = ghosts.current[index];
      if (el) setWidth(el.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [index, words]);

  const word = words[index] ?? words[0];

  return (
    <span
      className={cn(
        // No overflow-hidden: with a tight heading line-height it would eat
        // descenders ("p", "g"), and while the slot's width is still growing
        // it would cut the new, wider word on the right. The clip-path only
        // trims top/bottom (so the word rolling in/out is hidden) and leaves
        // the sides wide open.
        "relative inline-grid align-bottom transition-[width] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none [clip-path:inset(-0.18em_-100vw_-0.32em_-100vw)]",
        className
      )}
      style={width ? { width } : undefined}
      aria-live="polite"
    >
      {/* Invisible copies reserve the height and are measured for the width. */}
      {words.map((w, i) => (
        <span
          key={w}
          ref={(el) => {
            ghosts.current[i] = el;
          }}
          aria-hidden
          className="invisible col-start-1 row-start-1 w-max whitespace-nowrap"
        >
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={word}
          initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-110%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {word}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
