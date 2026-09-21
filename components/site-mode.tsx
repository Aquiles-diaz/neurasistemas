"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import type { Lang } from "@/lib/i18n/types";

/**
 * Site mode = theme + language, deliberately coupled: one switch flips both.
 *   dark  → español (default)
 *   light → english
 *
 * The mode lives on <html> (`.dark` / `.light` + `lang`) so CSS tokens and
 * screen readers pick it up, and is mirrored in localStorage. A tiny inline
 * script (SITE_MODE_SCRIPT, injected in <head>) applies the stored mode
 * before first paint so there's no flash of the wrong theme.
 */
export type Mode = "dark" | "light";

const STORAGE_KEY = "ns_mode";
const LANG_OF: Record<Mode, Lang> = { dark: "es", light: "en" };

export const SITE_MODE_SCRIPT = `(function(){try{var m=localStorage.getItem("${STORAGE_KEY}");if(m!=="light"&&m!=="dark")m="dark";var h=document.documentElement;h.classList.remove("dark","light");h.classList.add(m);h.lang=m==="light"?"en":"es";}catch(e){}})();`;

/* ── Tiny external store (hydration-safe via useSyncExternalStore) ── */
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const readMode = (): Mode =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
const serverMode = (): Mode => "dark";

function applyMode(next: Mode) {
  const html = document.documentElement;
  html.classList.remove("dark", "light");
  html.classList.add(next);
  html.lang = LANG_OF[next];
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode — the choice just won't persist */
  }
  listeners.forEach((fn) => fn());
}

type Ctx = {
  mode: Mode;
  lang: Lang;
  /** Flip theme + language. Pass the click origin for the circle reveal. */
  toggle: (origin?: { x: number; y: number }) => void;
};

const SiteModeContext = createContext<Ctx | null>(null);

export function useSiteMode(): Ctx {
  const ctx = useContext(SiteModeContext);
  if (!ctx) throw new Error("useSiteMode must be used inside <SiteModeProvider>");
  return ctx;
}

export function SiteModeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(subscribe, readMode, serverMode);

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Mode = readMode() === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No wipe under reduced motion, without API support, or while the tab
    // isn't painting (the transition callback would wait for a frame).
    if (
      reduce ||
      typeof document.startViewTransition !== "function" ||
      document.visibilityState !== "visible"
    ) {
      applyMode(next);
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      // Commit React's re-render (new copy) inside the DOM update callback so
      // the "new" snapshot already shows the translated page.
      flushSync(() => applyMode(next));
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({ mode, lang: LANG_OF[mode], toggle }),
    [mode, toggle]
  );

  return (
    <SiteModeContext.Provider value={value}>{children}</SiteModeContext.Provider>
  );
}
