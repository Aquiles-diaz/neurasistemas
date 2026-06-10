"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once, on the client only (these plugins touch window/document).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Signature expo-out easing — matches the `Reveal` (Framer) motion curve. */
export const EASE = "expo.out";

export { gsap, ScrollTrigger, useGSAP };
