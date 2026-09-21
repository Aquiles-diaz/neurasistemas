"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useScrollTo } from "@/components/scroll/use-scroll-to";
import { useContactDrawer } from "@/components/ui/contact-drawer";
import { RollingText } from "@/components/ui/rolling-text";
import { RollingWords } from "@/components/ui/rolling-words";
import { Container, SecondaryButton, CtaButton } from "@/components/sections/primitives";
import { HeroBg } from "@/components/sections/hero-bg";
import { useT } from "@/lib/i18n";

export function Hero() {
  const t = useT();
  const scrollTo = useScrollTo();
  const { open } = useContactDrawer();

  // Entrance animation lives in CSS (`[data-hero]` in globals.css) so it runs
  // on first paint with zero JS, and opts out under prefers-reduced-motion.
  return (
    <section
      id="top"
      className="relative flex min-h-[88dvh] items-center overflow-hidden pb-[var(--section-y)] pt-[clamp(104px,13vh,150px)]"
    >
      <HeroBg />

      <Container className="relative z-[1]">
        <div className="mx-auto flex max-w-[880px] flex-col items-center text-center">
          <p
            data-hero
            className="mb-5 font-[family-name:var(--font-mono)] text-[12px] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
          >
            {t.hero.eyebrow}
          </p>
          <h1
            data-hero
            className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5.6vw,4.2rem)] font-bold leading-[1.08] tracking-[-0.025em] text-[color:var(--text-strong)] [text-wrap:balance]"
          >
            {/* Fixed line structure so the rolling word never re-wraps the
                heading: "Sistemas [word]" on one line (the word gets its own
                line on phones), then the rest. */}
            {t.hero.titlePre}
            <br className="sm:hidden" />{" "}
            {/* Keyed by language so a switch remounts the slot instead of
                rolling the old word out (and so no Spanish word rolls out on
                first paint for visitors who stored the English mode). */}
            <RollingWords
              key={t.hero.words.join("|")}
              words={t.hero.words}
              className="brand-text text-[color:var(--text-strong)]"
            />
            <br />{" "}
            {t.hero.titlePost}
          </h1>

          <p
            data-hero
            className="mt-6 max-w-[56ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.65] text-[color:var(--text-muted)]"
          >
            {t.hero.subtitle}
          </p>

          <div data-hero className="mt-9 flex flex-wrap justify-center gap-3.5">
            <CtaButton size="lg" onClick={() => scrollTo("sistemas")}>
              <RollingText text={t.hero.ctaPrimary} />
              <ArrowRight size={18} strokeWidth={1.8} />
            </CtaButton>

            <SecondaryButton size="lg" onClick={open}>
              <RollingText text={t.hero.ctaSecondary} />
            </SecondaryButton>
          </div>

          <ul
            data-hero
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3"
          >
            {t.hero.benefits.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-[color:var(--text-body)]"
              >
                <ShieldCheck
                  size={17}
                  strokeWidth={2}
                  className="shrink-0 text-[color:var(--text-strong)]"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
