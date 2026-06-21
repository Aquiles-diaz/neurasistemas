"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

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
  const MotionTag = m[as] as typeof m.div;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: EASE_EXPO, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** Stagger delay helper to mirror the original `data-d` 1..6 cadence (~80ms steps). */
export const d = (n: number) => n * 0.08;
