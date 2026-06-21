"use client";

/**
 * HeroVideoBg — full-bleed background video with graceful fallback.
 *
 * - Navy bg is always rendered, so the section looks fine with no video files.
 * - The <video> is hidden via `motion-reduce:hidden` for visitors who prefer
 *   reduced motion; they see the navy + gradient fallback instead.
 * - The scrim gradient ensures white text is always legible over the video.
 */
export function HeroVideoBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[color:var(--navy)]"
    >
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

      {/* Scrim: radial blue highlight top-left + linear dark veil for text legibility.
          Also acts as the visible fallback gradient when neither video nor poster loads. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,rgba(29,78,216,.45),transparent_55%),linear-gradient(180deg,rgba(11,31,51,.78),rgba(11,31,51,.92))]" />
    </div>
  );
}
