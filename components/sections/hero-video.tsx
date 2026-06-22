"use client";

/**
 * HeroVideoBg — full-bleed hero background.
 *
 * Layered, CSS-only (zero JS at runtime), `prefers-reduced-motion`-safe:
 *   1. dot grid        → faint "data/tech" texture, masked to fade out
 *   2. lime auroras    → two soft glows drifting slowly
 *   3. scrim           → dark veil so white copy stays legible (AA)
 *   4. particles       → a sparse field of tiny lime motes, gentle float
 *
 * If a real loop is ever added, drop files in `public/hero/`
 * (`hero-bg.webm`, `hero-bg.mp4`, `hero-poster.jpg`) and flip `HAS_VIDEO`.
 */

const HAS_VIDEO = false;

// Fixed positions (no Math.random → identical on server + client, no hydration
// mismatch). l/t = % position, s = px size, d = anim delay, dur = anim duration.
const PARTICLES = [
  { l: 5, t: 18, s: 3, d: 0, dur: 7 },
  { l: 9, t: 52, s: 2, d: 1.4, dur: 9 },
  { l: 12, t: 78, s: 2, d: 0.6, dur: 10 },
  { l: 16, t: 30, s: 3, d: 2.1, dur: 8 },
  { l: 20, t: 64, s: 2, d: 0.9, dur: 9.5 },
  { l: 24, t: 42, s: 4, d: 1.7, dur: 8.5 },
  { l: 28, t: 84, s: 2, d: 0.3, dur: 7.5 },
  { l: 32, t: 22, s: 3, d: 2.4, dur: 10 },
  { l: 37, t: 58, s: 2, d: 1.1, dur: 8 },
  { l: 41, t: 16, s: 3, d: 0.5, dur: 9 },
  { l: 45, t: 74, s: 2, d: 2.0, dur: 11 },
  { l: 49, t: 38, s: 3, d: 1.3, dur: 7 },
  { l: 53, t: 88, s: 2, d: 0.8, dur: 9 },
  { l: 57, t: 26, s: 4, d: 2.6, dur: 8 },
  { l: 61, t: 62, s: 2, d: 0.2, dur: 10 },
  { l: 65, t: 44, s: 3, d: 1.9, dur: 8.5 },
  { l: 69, t: 80, s: 2, d: 1.0, dur: 9.5 },
  { l: 73, t: 20, s: 3, d: 2.3, dur: 7.5 },
  { l: 77, t: 56, s: 2, d: 0.7, dur: 9 },
  { l: 81, t: 34, s: 4, d: 1.6, dur: 8 },
  { l: 84, t: 72, s: 2, d: 2.5, dur: 10.5 },
  { l: 88, t: 48, s: 3, d: 0.4, dur: 8 },
  { l: 91, t: 24, s: 2, d: 1.2, dur: 9 },
  { l: 94, t: 66, s: 3, d: 2.2, dur: 7 },
  { l: 7, t: 38, s: 2, d: 1.5, dur: 9 },
  { l: 35, t: 70, s: 2, d: 0.6, dur: 10 },
  { l: 50, t: 50, s: 3, d: 2.8, dur: 12 },
  { l: 66, t: 14, s: 2, d: 1.0, dur: 8 },
  { l: 79, t: 90, s: 2, d: 0.3, dur: 9 },
  { l: 96, t: 82, s: 2, d: 1.8, dur: 8.5 },
];

export function HeroVideoBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[color:var(--ink)]"
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

      {/* 1. Dot grid — faint tech texture, fades toward the bottom/edges */}
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle,rgba(182,255,0,0.10)_1px,transparent_1.5px)] [background-size:38px_38px] [mask-image:radial-gradient(135%_95%_at_50%_-8%,#000_30%,transparent_72%)]" />

      {/* 2. Drifting lime auroras */}
      <div className="hero-aurora absolute -left-[12%] -top-[24%] h-[62vh] w-[62vh] rounded-full bg-[radial-gradient(circle,rgba(182,255,0,0.16),transparent_62%)] blur-[44px]" />
      <div className="hero-aurora-2 absolute -right-[10%] top-[16%] h-[52vh] w-[52vh] rounded-full bg-[radial-gradient(circle,rgba(182,255,0,0.07),transparent_62%)] blur-[56px]" />

      {/* 3. Scrim — keeps white copy legible over the texture */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0.34),rgba(20,20,20,0.7)_55%,rgba(20,20,20,0.9))]" />

      {/* 4. Particle motes (above the scrim, below the copy) */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="hero-particle absolute rounded-full bg-[color:var(--accent)]"
          style={{
            left: `${p.l}%`,
            top: `${p.t}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            animationDelay: `${p.d}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
