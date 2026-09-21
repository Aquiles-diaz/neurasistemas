"use client";

import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { useT } from "@/lib/i18n";

/**
 * Technology marquee. Monochrome wordmarks (no vendor colours) so the band
 * stays in the black/white system; the track is duplicated in the markup so
 * the -50% loop is seamless.
 */
export function TechStack() {
  const t = useT();
  const loop = [...t.stack.items, ...t.stack.items];

  return (
    <section
      id="tecnologia"
      className="relative overflow-hidden border-y border-[color:var(--border-subtle)] py-[var(--section-y-sm)]"
    >
      <Container>
        <Reveal>
          <Eyebrow center>{t.stack.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4 text-center text-[clamp(1.75rem,3.6vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.015em] text-[color:var(--text-strong)]">
            {t.stack.title}
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-4 max-w-[56ch] text-center leading-[1.6] text-[color:var(--text-muted)]">
            {t.stack.subtitle}
          </p>
        </Reveal>
      </Container>

      {/* Full-bleed marquee (breaks out of the Container on purpose) */}
      <div
        className="relative mt-10 [--fade:96px]"
        aria-label={t.stack.items.join(", ")}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[var(--fade)] bg-gradient-to-r from-[color:var(--bg-base)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[var(--fade)] bg-gradient-to-l from-[color:var(--bg-base)] to-transparent" />

        <div
          className="flex w-max items-center [animation:ns-marquee_44s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
          aria-hidden
        >
          {loop.map((name, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-8 px-4 font-[family-name:var(--font-display)] text-[clamp(1.3rem,2.4vw,1.9rem)] font-bold tracking-[-0.01em] text-[color:var(--text-subtle)] transition-colors duration-300 hover:text-[color:var(--text-strong)]"
            >
              {name}
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--border-strong)]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
