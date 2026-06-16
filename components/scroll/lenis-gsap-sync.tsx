"use client";

import { useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Keeps GSAP ScrollTrigger in lockstep with Lenis' smooth scroll. Mounted
 * inside `<ReactLenis>`, so it only runs when smooth scroll is active (under
 * reduced motion Lenis is absent and ScrollTrigger falls back to native scroll).
 */
export function LenisGsapSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}
