"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { LenisGsapSync } from "@/components/scroll/lenis-gsap-sync";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * App-wide buttery smooth scrolling (Lenis). Mounted at the root so every
 * section shares one momentum context, and anchor links smooth-scroll with a
 * nav offset. Disabled when the user prefers reduced motion. `useLenis()` is
 * available anywhere below for programmatic jumps.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        anchors: { offset: -74 },
      }}
    >
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
