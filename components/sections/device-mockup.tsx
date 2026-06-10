"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Looping vertical auto-scroll: ease down the page, hold at the bottom,
// ease back to the top. Tuned so the inner page reveals every section.
const SCROLL_Y = ["0%", "-52%", "-52%", "0%"];
const SCROLL_TIMES = [0, 0.46, 0.6, 1];
const SCROLL_DUR = 13;
// Scrollbar thumb runs in sync (own-height-relative travel).
const THUMB_Y = ["0%", "176%", "176%", "0%"];

/**
 * A floating browser window playing a looping "screen-recording" of a polished
 * Neura site — the page auto-scrolls through hero, stats, chart, gallery and CTA,
 * with a synced scrollbar thumb. A living demo of what the studio ships.
 * All transform/opacity for speed; pauses entirely under reduced-motion.
 */
export function DeviceMockup() {
  const reduce = useReducedMotion();
  const bars = [42, 64, 50, 80, 58, 72, 90];

  const scroll = reduce
    ? undefined
    : {
        animate: { y: SCROLL_Y },
        transition: {
          duration: SCROLL_DUR,
          times: SCROLL_TIMES,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div className="relative">
      {/* glow — platinum / white metal (monochrome) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 z-0 opacity-70"
        style={{
          background:
            "radial-gradient(50% 50% at 60% 40%, rgba(238,241,246,.16), transparent 70%), radial-gradient(40% 40% at 30% 70%, rgba(220,224,231,.10), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="relative z-[1] [perspective:1200px]"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border-default)] bg-[color:var(--surface-1)] shadow-[var(--shadow-lg),var(--edge-hi)]"
        >
          {/* browser chrome */}
          <div className="flex items-center gap-3 border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
            <div className="mx-auto flex items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border-subtle)] bg-[color:var(--bg-base)] px-3 py-1">
              <Lock size={11} className="text-[color:var(--text-subtle)]" />
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--text-subtle)]">
                neurasistemas.com
              </span>
            </div>
          </div>

          {/* viewport — fixed window; the page scrolls inside it */}
          <div className="relative h-[340px] overflow-hidden [background:linear-gradient(160deg,var(--ink-900),var(--ink-950))]">
            {/* sweeping metallic sheen (over everything) */}
            {!reduce && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(255,255,255,.06) 48%, transparent 60%)",
                  backgroundSize: "260% 100%",
                  animation: "ns-sheen 6s linear infinite",
                }}
              />
            )}

            {/* top/bottom fades so content slides in/out softly */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8"
              style={{
                background:
                  "linear-gradient(180deg, var(--ink-900), transparent)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10"
              style={{
                background:
                  "linear-gradient(0deg, var(--ink-950), transparent)",
              }}
            />

            {/* synced scrollbar */}
            <div className="absolute right-1.5 top-2 bottom-2 z-10 w-1 rounded-full bg-white/[0.05]">
              <motion.div
                className="h-[36%] w-full rounded-full bg-white/25"
                animate={reduce ? undefined : { y: THUMB_Y }}
                transition={{
                  duration: SCROLL_DUR,
                  times: SCROLL_TIMES,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
              />
            </div>

            {/* the scrolling page */}
            <motion.div className="px-5" {...scroll}>
              {/* nav */}
              <div className="flex items-center justify-between pt-5">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo/neurasistemas-monogram.png"
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-auto opacity-90"
                  />
                  <span className="font-[family-name:var(--font-display)] text-[11px] font-semibold text-[color:var(--text-strong)]">
                    Neura
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-7 rounded-full bg-white/10" />
                  <span className="h-1.5 w-7 rounded-full bg-white/10" />
                  <span className="h-4 w-14 rounded-[var(--radius-pill)] [background:var(--metal-text)] opacity-90" />
                </div>
              </div>

              {/* hero */}
              <div className="mt-7 h-3.5 w-3/4 rounded [background:var(--metal-text)] opacity-90" />
              <div className="mt-1.5 h-3.5 w-1/2 rounded [background:var(--metal-text)] opacity-50" />
              <div className="mt-4 flex flex-col gap-1.5">
                <span className="h-1.5 w-full rounded-full bg-white/[0.06]" />
                <span className="h-1.5 w-5/6 rounded-full bg-white/[0.06]" />
              </div>
              <div className="mt-4 flex gap-2">
                <span className="h-6 w-24 rounded-[var(--radius-pill)] [background:var(--metal-text)] opacity-90" />
                <span className="h-6 w-20 rounded-[var(--radius-pill)] border border-white/15 bg-white/[0.03]" />
              </div>

              {/* stat tiles */}
              <div className="mt-7 grid grid-cols-3 gap-2.5">
                {[
                  ["+20", "proyectos"],
                  ["98%", "repiten"],
                  ["1.2s", "carga"],
                ].map(([n, l]) => (
                  <div
                    key={l}
                    className="rounded-[var(--radius-md)] border border-[color:var(--border-subtle)] bg-white/[0.02] p-2.5 [box-shadow:var(--edge-hi)]"
                  >
                    <div className="font-[family-name:var(--font-display)] text-[15px] font-bold text-[color:var(--text-strong)]">
                      {n}
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[8px] uppercase tracking-[0.1em] text-[color:var(--text-subtle)]">
                      {l}
                    </div>
                  </div>
                ))}
              </div>

              {/* chart */}
              <div className="mt-2.5 flex h-20 items-end gap-1.5 rounded-[var(--radius-md)] border border-[color:var(--border-subtle)] bg-white/[0.02] p-3 [box-shadow:var(--edge-hi)]">
                {bars.map((h, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-[color:var(--accent-600)] to-[color:var(--accent-400)]"
                    initial={{ height: "20%" }}
                    animate={
                      reduce ? { height: `${h}%` } : { height: [`20%`, `${h}%`] }
                    }
                    transition={{
                      duration: 0.9,
                      ease: EASE,
                      delay: 0.4 + i * 0.08,
                    }}
                    style={{ transformOrigin: "bottom" }}
                  />
                ))}
              </div>

              {/* gallery */}
              <div className="mt-7 h-2 w-1/3 rounded-full bg-white/[0.08]" />
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--border-subtle)] [background:var(--metal-fill)] [box-shadow:var(--edge-hi)]"
                  >
                    <div className="h-full w-full [background:linear-gradient(135deg,rgba(255,255,255,.10),transparent_55%)]" />
                  </div>
                ))}
              </div>

              {/* feature list */}
              <div className="mt-7 flex flex-col gap-2.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[color:var(--border-subtle)] bg-white/[0.02] p-2.5"
                  >
                    <span className="h-7 w-7 flex-none rounded-[var(--radius-sm)] [background:var(--metal-fill)] [box-shadow:var(--edge-hi)]" />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <span className="h-1.5 w-1/2 rounded-full bg-white/15" />
                      <span className="h-1.5 w-5/6 rounded-full bg-white/[0.06]" />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA band */}
              <div className="mb-6 mt-7 flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-white/10 [background:linear-gradient(160deg,rgba(255,255,255,.05),transparent)] py-6">
                <span className="h-2.5 w-1/2 rounded-full [background:var(--metal-text)] opacity-90" />
                <span className="h-6 w-28 rounded-[var(--radius-pill)] [background:var(--metal-text)] opacity-90" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
