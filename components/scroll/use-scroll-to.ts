"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

const NAV_OFFSET = 74;

/** Returns a function that smoothly scrolls to a section id ("top" → page top). */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      if (id === "top") {
        if (lenis) lenis.scrollTo(0, { offset: 0 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: -NAV_OFFSET });
      } else {
        const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    [lenis]
  );
}
