"use client";

import { useCallback } from "react";

const NAV_OFFSET = 74;

/** Returns a function that smoothly scrolls to a section id ("top" → page top).
 *  Uses the browser's native smooth scroll (GPU-composited, no rAF hijack) and
 *  honours prefers-reduced-motion by falling back to an instant jump. */
export function useScrollTo() {
  return useCallback((id: string) => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

    if (id === "top") {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior });
  }, []);
}
