"use client";

import { Boxes, Plug, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { useT } from "@/lib/i18n";

/* Icons in the same order as `services.items` in the dictionaries. */
const ICONS: LucideIcon[] = [Boxes, Plug, ShieldCheck];

export function Servicios() {
  const t = useT();

  return (
    <section
      id="servicios"
      className="relative bg-[color:var(--surface-1)] py-[var(--section-y)]"
    >
      <Container>
        <Reveal>
          <Eyebrow>{t.services.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 max-w-[24ch] text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            {t.services.title}
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mt-4 max-w-[56ch] text-lg leading-[1.6] text-[color:var(--text-muted)]">
            {t.services.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map(({ title, desc, featured }, i) => {
            const Icon = ICONS[i] ?? Boxes;
            return (
              <Reveal key={title} delay={d((i % 3) + 1)} className="h-full">
                <article
                  className={[
                    "group flex h-full flex-col rounded-[var(--radius-lg)] border p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1",
                    featured
                      ? "border-[color:var(--text-strong)] bg-[color:var(--card)] [box-shadow:var(--shadow-md)] hover:[box-shadow:var(--shadow-lg)]"
                      : "border-[color:var(--border-subtle)] bg-[color:var(--card)] [box-shadow:var(--shadow-sm)] hover:border-[color:var(--border-strong)] hover:[box-shadow:var(--shadow-md)]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] transition-transform duration-300 group-hover:-translate-y-0.5",
                      featured
                        ? "bg-[color:var(--accent)] text-[color:var(--text-onaccent)]"
                        : "bg-[color:var(--accent-soft)] text-[color:var(--text-strong)]",
                    ].join(" ")}
                  >
                    <Icon size={22} strokeWidth={1.7} aria-hidden />
                  </div>
                  <h3 className="mb-2 text-lg font-bold leading-snug text-[color:var(--text-strong)]">
                    {title}
                  </h3>
                  <p className="text-sm leading-[1.6] text-[color:var(--text-body)]">
                    {desc}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
