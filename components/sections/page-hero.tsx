"use client";

import { Container, Eyebrow } from "@/components/sections/primitives";
import { Reveal } from "@/components/ui/reveal";
import { useT } from "@/lib/i18n";

/**
 * Header shared by the secondary pages (/proyectos, /iniciar-proyecto).
 * Server pages keep their metadata; the visible copy comes from the
 * dictionary so it follows the language switch.
 */
export function PageHero({ page }: { page: "projectsPage" | "startPage" }) {
  const t = useT();
  const copy = t[page];

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-[var(--section-y-sm)] pt-[clamp(120px,16vh,180px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% -6%, var(--accent-glow), transparent 70%)",
        }}
      />
      <Container className="relative z-[1] text-center">
        <Reveal>
          <Eyebrow center>{copy.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-5 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.4vw,4rem)] font-bold leading-[1.03] tracking-[-0.02em] text-[color:var(--text-strong)]">
            {copy.titlePre}
            <span className="brand-text">{copy.titleAccent}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.6] text-[color:var(--text-muted)]">
            {copy.subtitle}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
