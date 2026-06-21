"use client";

/**
 * HeroVideoBg — full-bleed background video with graceful fallback.
 *
 * - Navy bg + scrim gradient is always rendered, so the section looks finished
 *   with NO video files (no broken poster, no 404s).
 * - When the real loop is ready, drop the files in `public/hero/`
 *   (`hero-bg.webm`, `hero-bg.mp4`, `hero-poster.jpg`) and flip `HAS_VIDEO` to
 *   `true` — the <video> renders, hidden under `prefers-reduced-motion`.
 * - The scrim gradient keeps white text legible over the video.
 */

// Flip to `true` once the video assets exist in `public/hero/`.
const HAS_VIDEO = false;

export function HeroVideoBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[color:var(--navy)]"
    >
      {HAS_VIDEO && (
        <video
          className="h-full w-full object-cover opacity-90 motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero/hero-poster.jpg"
        >
          <source src="/hero/hero-bg.webm" type="video/webm" />
          <source src="/hero/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Scrim: radial blue highlight top-left + linear dark veil for text legibility.
          Also the visible background when no video is present. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(29,78,216,.45),transparent_55%),linear-gradient(180deg,rgba(11,31,51,.78),rgba(11,31,51,.92))]" />
    </div>
  );
}
