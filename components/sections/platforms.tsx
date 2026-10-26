"use client";

import {
  Monitor,
  Globe,
  Smartphone,
  Check,
  Boxes,
  Plug,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { useT } from "@/lib/i18n";
import type { PlatformItem } from "@/lib/i18n/types";

const ICONS: Record<PlatformItem["key"], LucideIcon> = {
  desktop: Monitor,
  web: Globe,
  mobile: Smartphone,
};

/* Icons in the same order as `services.items` in the dictionaries. */
const SERVICE_ICONS: LucideIcon[] = [Boxes, Plug, ShieldCheck];

/**
 * "Qué construimos": the three platforms, one card each, plus the former
 * Servicios section folded in as a compact strip (one block, less scrolling).
 */
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

        {/* Servicios, fusionados: una fila de tres, sin párrafo introductorio largo. */}
        <div id="servicios" className="mt-14 scroll-mt-28">
          <Reveal>
            <h3 className="text-[clamp(1.3rem,2.6vw,1.7rem)] font-bold leading-snug tracking-[-0.01em] text-[color:var(--text-strong)]">
              {t.services.title}
              <span className="ml-2 font-normal text-[color:var(--text-muted)]">
                {t.services.subtitle}
              </span>
            </h3>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border-subtle)] bg-[color:var(--border-subtle)] md:grid-cols-3">
            {t.services.items.map(({ title, desc }, i) => {
              const Icon = SERVICE_ICONS[i] ?? Boxes;
              return (
                <Reveal key={title} delay={d(i + 1)} className="h-full">
                  <div className="flex h-full gap-4 bg-[color:var(--card)] p-5">
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-[color:var(--text-strong)]"
                      aria-hidden
                    />
                    <div>
                      <h4 className="font-semibold leading-snug text-[color:var(--text-strong)]">
                        {title}
                      </h4>
                      <p className="mt-1 text-sm leading-[1.55] text-[color:var(--text-muted)]">
                        {desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
