"use client";

import { MessageCircle, FileText, Wrench, PackageCheck, type LucideIcon } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { useT } from "@/lib/i18n";

/* Icons follow the order of `process.steps` in the dictionaries. */
const ICONS: LucideIcon[] = [MessageCircle, FileText, Wrench, PackageCheck];

export function Process() {
  const t = useT();

  return (
    <section id="proceso" className="py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow center>{t.process.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            {t.process.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map(({ n, title, desc }, i) => {
            const Icon = ICONS[i] ?? Wrench;
            return (
              <Reveal key={n} delay={d(i + 1)} className="h-full">
                <div className="relative h-full rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] px-5.5 py-6.5 [box-shadow:var(--edge-hi)]">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.1em] text-[color:var(--text-strong)]">
                      {n}
                    </span>
                    <span className="text-[color:var(--text-muted)]">
                      <Icon size={20} strokeWidth={1.6} aria-hidden />
                    </span>
                  </div>
                  <h4 className="mb-2 mt-3.5 text-lg font-bold text-[color:var(--text-strong)]">
                    {title}
                  </h4>
                  <p className="text-sm leading-[1.6] text-[color:var(--text-muted)]">
                    {desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
