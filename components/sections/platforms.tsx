"use client";

import { Monitor, Globe, Smartphone, Check, type LucideIcon } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { useT } from "@/lib/i18n";
import type { PlatformItem } from "@/lib/i18n/types";

const ICONS: Record<PlatformItem["key"], LucideIcon> = {
  desktop: Monitor,
  web: Globe,
  mobile: Smartphone,
};

/** "Qué construimos": the three platforms, one card each. */
export function Platforms() {
  const t = useT();

  return (
    <section id="sistemas" className="relative py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow center>{t.platforms.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mx-auto mt-4.5 max-w-[22ch] text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            {t.platforms.title}
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-4 max-w-[54ch] text-center text-lg leading-[1.6] text-[color:var(--text-muted)]">
            {t.platforms.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4.5 md:grid-cols-3">
          {t.platforms.items.map((item, i) => {
            const Icon = ICONS[item.key];
            return (
              <Reveal key={item.key} delay={d(i + 1)} className="h-full">
                <article className="group relative flex h-full flex-col rounded-[var(--radius-xl)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] p-7 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-[color:var(--border-strong)] hover:[box-shadow:var(--shadow-md)]">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--accent)] text-[color:var(--text-onaccent)] transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon size={22} strokeWidth={1.7} aria-hidden />
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.12em] text-[color:var(--text-subtle)]">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-[1.35rem] font-bold leading-snug text-[color:var(--text-strong)]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-[color:var(--text-body)]">
                    {item.desc}
                  </p>

                  <p className="mt-6 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--text-subtle)]">
                    {t.platforms.idealFor}
                  </p>
                  <ul className="mt-2.5 flex flex-col gap-2" role="list">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-[color:var(--text-body)]">
                        <Check
                          size={15}
                          strokeWidth={2.5}
                          className="mt-[3px] shrink-0 text-[color:var(--text-strong)]"
                          aria-hidden
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-auto border-t border-[color:var(--border-subtle)] pt-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-subtle)]">
                    {item.tech}
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
