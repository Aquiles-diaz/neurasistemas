"use client";

import { Moon, Sun } from "lucide-react";
import { useSiteMode } from "@/components/site-mode";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * One switch, two effects: theme (dark ↔ light) and language (ES ↔ EN).
 * Pill track with a sliding knob; the knob holds the icon of the *current*
 * mode and the track shows the language you'll switch *to*. The click origin
 * is passed to the provider so the View Transition circle grows from here.
 */
export function ThemeLangToggle({ className }: { className?: string }) {
  const { mode, toggle } = useSiteMode();
  const t = useT();
  const isLight = mode === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={t.meta.toggle}
      title={t.meta.toggle}
      onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
      className={cn(
        "group relative inline-flex h-9 w-[76px] shrink-0 cursor-pointer items-center rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] bg-[color:var(--surface-2)] px-1 text-[color:var(--text-strong)] transition-colors duration-300 hover:border-[color:var(--text-muted)]",
        className
      )}
    >
      {/* Language labels sit on the track; the knob covers the active one. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.16em]"
      >
        <span
          className={cn(
            "transition-opacity duration-300",
            isLight ? "opacity-70" : "opacity-0"
          )}
        >
          ES
        </span>
        <span
          className={cn(
            "transition-opacity duration-300",
            isLight ? "opacity-0" : "opacity-70"
          )}
        >
          EN
        </span>
      </span>

      {/* Knob */}
      <span
        aria-hidden
        className={cn(
          "relative z-[1] flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--text-onaccent)] shadow-[var(--shadow-sm)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-active:scale-95",
          isLight ? "translate-x-[38px]" : "translate-x-0"
        )}
      >
        <Sun
          size={14}
          strokeWidth={2}
          className={cn(
            "absolute transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]",
            isLight ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          )}
        />
        <Moon
          size={14}
          strokeWidth={2}
          className={cn(
            "absolute transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]",
            isLight ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          )}
        />
      </span>
    </button>
  );
}
