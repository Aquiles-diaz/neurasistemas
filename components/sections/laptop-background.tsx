"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ScrollState } from "@/components/sections/laptop-3d";

// WebGL touches `window`; never render on the server.
const Laptop3D = dynamic(() => import("@/components/sections/laptop-3d"), {
  ssr: false,
});

/**
 * Global rotating MacBook behind every section. Lenis drives it: each
 * smooth-scroll tick stashes `progress` (0→1 down the page) and `velocity` into
 * a ref that the WebGL loop reads, so the laptop spins and descends in lockstep
 * with the scroll. Negative z-index + transparent `body` (see globals.css) lets
 * it show through; blue glows flank it left and right.
 */
export function LaptopBackground() {
  const reduce = useReducedMotion() ?? false;
  const scroll = useRef<ScrollState>({ progress: 0, velocity: 0 });

  useLenis((lenis) => {
    scroll.current.progress = lenis.progress;
    scroll.current.velocity = lenis.velocity;
  });

  return (
    <>
      {/* ===== TEMP DEBUG MARKER ===== proves this component mounts & HMR is live.
          On top of everything (z-9999) so layering can't hide it. */}
      <div className="fixed left-2 top-2 z-[9999] rounded bg-fuchsia-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
        BG-DEBUG montado ✔
      </div>

      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 select-none">
        {/* Blue light glows on both sides, felt across the whole page. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(38% 70% at 0% 50%, rgba(58,134,255,0.26), transparent 60%), radial-gradient(38% 70% at 100% 50%, rgba(90,125,255,0.24), transparent 60%)",
          }}
        />
        {/* The 3D laptop, fully visible. */}
        <Laptop3D scroll={scroll} reduce={reduce} />
      </div>
    </>
  );
}
