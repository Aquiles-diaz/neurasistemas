"use client";

import { ArrowRight, Globe, Boxes, ShieldAlert, type LucideIcon } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { CrowdCanvas } from "@/components/ui/crowd-canvas";
import { RollingText } from "@/components/ui/rolling-text";
import { Container, Eyebrow, CtaButton, SecondaryButton } from "@/components/sections/primitives";
import { useContactDrawer } from "@/components/ui/contact-drawer";
import { useScrollTo } from "@/components/scroll/use-scroll-to";
import { useT } from "@/lib/i18n";

/* Icons follow the order of `gap.points` in the dictionaries. */
const ICONS: LucideIcon[] = [Globe, Boxes, ShieldAlert];

/** Sprite sheet of Open Peeps (CC0), 15 × 7 people. See NOTICE. */
const PEEPS_SRC = "/peeps/all-peeps.png";

/**
 * "The problem": a crowd walks across the bottom of the section while the
 * copy asks whether any of them can find your business. It sits right after
 * the hero as the emotional hook before "what we build".
 */
export function DigitalGap() {
  const t = useT();
  const { open } = useContactDrawer();
  const scrollTo = useScrollTo();

  return (
    <section
      id="problema"
      className="relative overflow-hidden border-y border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] pt-[var(--section-y)]"
    >
      <Container className="relative z-[1]">
        <Reveal>
          <Eyebrow center>{t.gap.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mx-auto mt-4.5 max-w-[22ch] text-center text-[clamp(2rem,4.6vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[color:var(--text-strong)]">
            {t.gap.title}
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-5 max-w-[60ch] text-center text-lg leading-[1.6] text-[color:var(--text-muted)]">
            {t.gap.subtitle}
          </p>
        </Reveal>

        {/* The three gaps, as a hairline strip */}
        <div className="mx-auto mt-12 grid max-w-[960px] grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border-subtle)] bg-[color:var(--border-subtle)] sm:grid-cols-3">
          {t.gap.points.map(({ title, desc }, i) => {
            const Icon = ICONS[i] ?? Globe;
            return (
              <Reveal key={title} delay={d(i + 1)} className="h-full">
                <div className="flex h-full flex-col gap-3 bg-[color:var(--card)] p-6">
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="text-[color:var(--text-strong)]"
                    aria-hidden
                  />
                  <h3 className="text-base font-bold leading-snug text-[color:var(--text-strong)]">
                    {title}
                  </h3>
                  <p className="text-sm leading-[1.6] text-[color:var(--text-muted)]">{desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={d(3)}>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <CtaButton size="lg" onClick={open}>
              <RollingText text={t.gap.cta} />
              <ArrowRight size={18} strokeWidth={1.8} />
            </CtaButton>
            <SecondaryButton size="lg" onClick={() => scrollTo("packs")}>
              <RollingText text={t.gap.ctaSecondary} />
            </SecondaryButton>
          </div>
        </Reveal>

        <Reveal delay={d(4)}>
          <p className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[color:var(--text-subtle)]">
            <span className="mr-1 text-[color:var(--text-muted)]">{t.gap.sectorsLabel}</span>
            {t.gap.sectors.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="h-1 w-1 rounded-full bg-[color:var(--border-strong)]"
                  />
                )}
                {s}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>

      {/* The crowd: full-bleed, pinned to the bottom edge of the section */}
      <div className="relative mt-6 h-[clamp(220px,30vw,360px)] w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-[color:var(--surface-1)] to-transparent" />
        <CrowdCanvas src={PEEPS_SRC} cols={15} rows={7} />
      </div>
    </section>
  );
}
