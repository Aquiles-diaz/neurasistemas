"use client";

import { Star, ArrowUpRight } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { useT } from "@/lib/i18n";

function Stars({ size = 16, label }: { size?: number; label: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className="fill-[color:var(--text-strong)] text-[color:var(--text-strong)]"
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useT();

  return (
    <section
      id="opiniones"
      className="relative bg-[color:var(--surface-1)] py-[var(--section-y)]"
    >
      <Container>
        <Reveal>
          <Eyebrow center>{t.testimonials.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4 text-center text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.015em] text-[color:var(--text-strong)] [font-family:var(--font-display)]">
            {t.testimonials.title}
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <div className="mt-5 flex justify-center">
            <Stars size={20} label={t.testimonials.stars} />
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[920px] grid-cols-1 gap-6 md:grid-cols-2">
          {t.testimonials.items.map((r, i) => (
            <Reveal key={r.author} delay={d(i + 1)} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] p-6 [box-shadow:var(--shadow-md),var(--edge-hi)]">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] text-base font-bold text-[color:var(--text-onaccent)]"
                    aria-hidden
                  >
                    {r.author.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold leading-tight text-[color:var(--text-strong)]">
                      {r.author}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[color:var(--text-subtle)]">
                      {r.business} &middot; {r.place}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Stars label={t.testimonials.stars} />
                  <span className="text-xs text-[color:var(--text-subtle)]">{r.when}</span>
                </div>

                <blockquote className="text-[15px] leading-[1.7] text-[color:var(--text-body)]">
                  {r.quote}
                </blockquote>

                {r.href && (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 self-start text-sm font-semibold text-[color:var(--text-strong)] underline-offset-4 hover:underline"
                  >
                    {t.testimonials.viewLive}
                    <ArrowUpRight size={15} strokeWidth={2} aria-hidden />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
