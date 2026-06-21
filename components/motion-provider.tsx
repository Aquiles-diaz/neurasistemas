"use client";

import { LazyMotion, domMax } from "motion/react";
import type { ReactNode } from "react";

/**
 * App-wide Framer Motion setup. Every animated component uses the lightweight
 * `m` component instead of `motion`, and the feature bundle (`domMax` — needed
 * for the layout animations: nav pill `layoutId`, projects grid `layout`) is
 * registered once here. `strict` throws if a `motion.*` component sneaks in,
 * which would silently defeat the bundle optimization.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion strict features={domMax}>
      {children}
    </LazyMotion>
  );
}
