"use client";

import { useRef, type ReactNode } from "react";
import {
  m,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * Apple-style scroll perspective (adapted from 21st.dev
 * "container-scroll-animation"): the child starts tilted back in 3D and
 * settles flat as it scrolls into view. Renders static under reduced m.
 */
export function TiltScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [26, 0]);
  // Compose one `transform` string so the GPU compositor drives it — Motion's
  // shorthand props (rotateX/scale/y) run on the main thread (rAF) and can
  // drop frames while paint is busy. The string is hardware-accelerated.
  const transform = useMotionTemplate`rotateX(${rotateX}deg) scale(${scale}) translateY(${y}px)`;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <m.div style={{ transform, transformOrigin: "center top" }}>
        {children}
      </m.div>
    </div>
  );
}
