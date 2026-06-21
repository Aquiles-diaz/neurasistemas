"use client";

import type { PointerEvent } from "react";

/**
 * Mouse-follow spotlight (adapted from 21st.dev "spotlight-card" to the Neura
 * design system): the coloured hue rotation is replaced by a single platinum
 * wash plus a hairline border glint, so cards stay monochrome.
 *
 * Usage: the host element needs `group relative overflow-hidden` and a border
 * radius; attach `onPointerMove={trackSpotlight}` to it and render
 * `<SpotlightGlow />` as its first child.
 */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
  el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
}

export function SpotlightGlow() {
  return (
    <>
      {/* interior wash that follows the pointer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(240px circle at var(--spot-x,-999px) var(--spot-y,-999px), rgba(238,241,246,0.07), transparent 70%)",
        }}
      />
      {/* border glint — only the hairline lights up under the cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(200px circle at var(--spot-x,-999px) var(--spot-y,-999px), rgba(255,255,255,0.38), transparent 70%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
    </>
  );
}
