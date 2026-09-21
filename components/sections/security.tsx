"use client";

import {
  KeyRound,
  Lock,
  DatabaseBackup,
  ScanSearch,
  Bug,
  Activity,
  FileCode2,
  FileLock2,
  Receipt,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { useT } from "@/lib/i18n";

/* Icons follow the order of `security.practices` / `security.trust`. */
const PRACTICE_ICONS: LucideIcon[] = [KeyRound, Lock, DatabaseBackup, ScanSearch, Bug, Activity];
const TRUST_ICONS: LucideIcon[] = [FileCode2, FileLock2, Receipt, UserCheck];

/**
 * Security + trust. Painted as the inverse band (white on a dark site, black
 * on a light one): the one section that flips the page, on purpose — it's the
 * part that has to feel solid.
 */
export function Security() {
  const t = useT();

  return (
    <section id="seguridad" className="band relative py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow center>{t.security.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mx-auto mt-4.5 max-w-[20ch] text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em]">
            {t.security.title}
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-4 max-w-[56ch] text-center text-lg leading-[1.6] text-[color:var(--text-muted)]">
            {t.security.subtitle}
          </p>
        </Reveal>

        {/* Practices: a hairline grid, no cards — reads like a spec sheet. */}
        {/* `gap-px` over a hairline-coloured background draws the grid lines. */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border-subtle)] bg-[color:var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-3">
          {t.security.practices.map(({ title, desc }, i) => {
            const Icon = PRACTICE_ICONS[i] ?? Lock;
            return (
              <Reveal key={title} delay={d((i % 3) + 1)} className="h-full">
                <div className="flex h-full flex-col gap-4 bg-[color:var(--band-bg)] p-7 transition-colors duration-200 hover:bg-[color:color-mix(in_srgb,var(--band-fg)_4%,var(--band-bg))]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border-subtle)]">
                    <Icon size={20} strokeWidth={1.7} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-bold leading-snug">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.6] text-[color:var(--text-muted)]">
                      {desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Contract guarantees */}
        <Reveal delay={d(1)}>
          <h3 className="mt-16 text-center font-[family-name:var(--font-display)] text-[clamp(1.3rem,2.8vw,1.75rem)] font-bold">
            {t.security.trustTitle}
          </h3>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.security.trust.map(({ title, desc }, i) => {
            const Icon = TRUST_ICONS[i] ?? FileCode2;
            return (
              <Reveal key={title} delay={d(i + 1)} className="h-full">
                <div className="flex h-full gap-4 rounded-[var(--radius-lg)] bg-[color:var(--card)] p-5">
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0"
                    aria-hidden
                  />
                  <div>
                    <h4 className="font-semibold leading-snug">{title}</h4>
                    <p className="mt-1 text-sm leading-[1.55] text-[color:var(--text-muted)]">
                      {desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
