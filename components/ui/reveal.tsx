"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Brand reveal: rise + fade on enter, expo-out easing — the signature
 * "entrance" motion. Staggered children via `delay` (matches the original
 * data-d="1..6" cadence). Respects prefers-reduced-motion.
 */
const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
  once = true,
  amount = 0.18,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "section" | "li" | "h1" | "h2" | "h3";
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  // Defer the reduced-motion branch to after mount so SSR and the first client
  // render are identical (both render the deterministic "hidden" initial) — no
  // hydration mismatch. Post-mount, reduced-motion users jump straight to the
  // visible state (no scroll gating); everyone else keeps the rise+fade.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduceNow = mounted && reduce;

  const MotionTag = m[as] as typeof m.div;

  const variants: Variants = {
    // `hidden` must not depend on `reduce`: it's the SSR-rendered initial style,
    // so it has to be identical on server and first client paint.
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.55,
        ease: EASE_EXPO,
        delay: reduce ? 0 : delay,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate={reduceNow ? "show" : undefined}
      whileInView={reduceNow ? undefined : "show"}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** Stagger delay helper to mirror the original `data-d` 1..6 cadence (~80ms steps). */
export const d = (n: number) => n * 0.08;
