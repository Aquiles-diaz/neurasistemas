"use client";

import { Globe, Boxes, Layers3, Check, type LucideIcon } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow, CtaButton } from "@/components/sections/primitives";
import { useContactDrawer } from "@/components/ui/contact-drawer";
import { useT } from "@/lib/i18n";

/* Icons follow the order of `packs.items` in the dictionaries. */
const ICONS: LucideIcon[] = [Globe, Boxes, Layers3];

export function Packs() {
  const t = useT();
  const { open } = useContactDrawer();

  return (
    <section id="packs" className="relative py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow center>{t.packs.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            {t.packs.title}
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-4 max-w-[52ch] text-center leading-[1.6] text-[color:var(--text-muted)]">
            {t.packs.subtitle}
          </p>
        </Reveal>

        {/* The featured card is painted in the inverse colours (a mini band)
            and lifted on lg+; its hover only touches the shadow. */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {t.packs.items.map((pack, i) => {
            const Icon = ICONS[i] ?? Boxes;
            const { featured } = pack;
            return (
              <Reveal key={pack.id} delay={d(i + 1)} className="h-full">
                <div
                  className={[
                    "group relative flex h-full flex-col rounded-[var(--radius-lg)] p-7 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)]",
                    featured
                      ? "band [box-shadow:var(--shadow-lg)] lg:-translate-y-4"
                      : "border border-[color:var(--border-subtle)] bg-[color:var(--card)] [box-shadow:var(--shadow-md)] hover:-translate-y-1.5 hover:[box-shadow:var(--shadow-lg)]",
                  ].join(" ")}
                >
                  {featured && (
                    <span
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-[var(--radius-pill)] border border-[color:var(--band-hairline)] bg-[color:var(--band-bg)] px-3.5 py-1 text-xs font-semibold text-[color:var(--band-fg)]"
                      aria-label={t.packs.popularAria}
                    >
                      {t.packs.popular}
                    </span>
                  )}

                  <div
                    className={[
                      "mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]",
                      featured
                        ? "bg-[color:var(--band-fg)] text-[color:var(--band-bg)]"
                        : "bg-[color:var(--accent-soft)] text-[color:var(--text-strong)]",
                    ].join(" ")}
                  >
                    <Icon size={24} strokeWidth={1.8} aria-hidden />
                  </div>

                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--text-strong)]">
                    {pack.name}
                  </p>
                  <p className="mb-3 text-sm text-[color:var(--text-muted)]">{pack.para}</p>

                  <h3 className="mb-5 text-xl font-bold leading-snug text-[color:var(--text-strong)]">
                    {pack.headline}
                  </h3>

                  <ul className="mb-7 flex flex-col gap-2.5" role="list">
                    {pack.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0 text-[color:var(--text-strong)]"
                          aria-hidden
                        />
                        <span className="text-sm leading-snug text-[color:var(--text-body)]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <p className="mb-5 flex items-baseline gap-1.5">
                      <span className="text-sm text-[color:var(--text-subtle)]">{t.packs.from}</span>
                      <span
                        className={[
                          "font-[family-name:var(--font-display)] font-bold leading-none tracking-[-0.02em] text-[color:var(--text-strong)]",
                          featured ? "text-[2.6rem]" : "text-[2.1rem]",
                        ].join(" ")}
                      >
                        {pack.price}
                      </span>
                      <span className="text-sm font-medium text-[color:var(--text-subtle)]">
                        {t.packs.currency}
                      </span>
                    </p>

                    <CtaButton size="md" className="w-full justify-center" onClick={open}>
                      {pack.cta}
                    </CtaButton>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={d(4)}>
          <p className="mt-10 text-center text-sm text-[color:var(--text-muted)]">
            {t.packs.footnotePre}
            <strong className="font-semibold text-[color:var(--text-strong)]">
              {t.packs.footnoteStrong}
            </strong>
            {t.packs.footnotePost}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
