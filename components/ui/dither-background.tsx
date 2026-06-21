import { cn } from "@/lib/utils";

/**
 * Monochrome dithered backdrop — the cult-ui "Dither" look WITHOUT WebGL, so it
 * renders everywhere (no GPU/shader needed). Platinum light blobs drift slowly
 * under a static 4×4 dot grid mask, so the light reads as halftone "pixels".
 * A faint always-on dot field textures the dark areas. Light is biased to the
 * right so copy on the left stays readable.
 *
 * The drift is pure CSS (`.dither-drift` / `.dither-spin` in globals.css) so it
 * runs on the compositor — cheaper than a JS rAF loop — and pauses under
 * prefers-reduced-motion. No hooks → server component (zero client JS).
 */
export function DitherBackground({
  className,
  /** 4px → the "4×4" cell from the reference. */
  cell = 4,
  /** Overall brightness of the dithered light (0–1). */
  intensity = 1,
}: {
  className?: string;
  cell?: number;
  intensity?: number;
}) {
  // 4×4 ordered dot grid used as a mask — turns the light into "pixels".
  const dots = `radial-gradient(circle at center, #000 ${
    cell * 0.16
  }px, transparent ${cell * 0.3}px)`;
  const cellSize = `${cell}px ${cell}px`;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* constant dot field so the dark areas still read as a pixel grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(238,241,246,1) " +
            `${cell * 0.18}px, transparent ${cell * 0.32}px)`,
          backgroundSize: cellSize,
        }}
      />

      {/* dithered light: bright blobs cut into dots by a static grid mask */}
      <div
        className="absolute inset-0"
        style={{
          opacity: intensity,
          maskImage: dots,
          WebkitMaskImage: dots,
          maskSize: cellSize,
          WebkitMaskSize: cellSize,
        }}
      >
        {/* Two overlapping slow drifts → organic, non-looping-feeling motion.
            Split across two nested elements so each animates its own transform
            (translate vs rotate+scale) without one overwriting the other. */}
        <div className="dither-drift absolute inset-[-35%]">
          <div
            className="dither-spin h-full w-full"
            style={{
              background:
                "radial-gradient(34% 46% at 72% 24%, rgba(238,241,246,1), transparent 64%)," +
                "radial-gradient(30% 40% at 90% 64%, rgba(210,216,226,0.92), transparent 64%)," +
                "radial-gradient(38% 44% at 58% 88%, rgba(238,241,246,0.78), transparent 64%)," +
                "radial-gradient(26% 34% at 84% 6%, rgba(228,232,240,0.80), transparent 64%)," +
                "radial-gradient(24% 30% at 40% 40%, rgba(220,225,234,0.55), transparent 64%)",
            }}
          />
        </div>
      </div>

      {/* left-side scrim → keeps headings/CTAs legible over the brighter dither */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--bg-base) 0%, var(--bg-base) 16%, transparent 60%)",
        }}
      />
    </div>
  );
}
