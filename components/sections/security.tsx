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
 * Garantías: la única banda invertida de la página. Cuatro números grandes,
 * cuatro garantías por contrato y la seguridad como una línea de chips. Reúne
 * lo que antes se repetía en tres secciones (hero, seguridad, por qué nosotros).
 */
export function Security() {
  const t = useT();

  return (
    <section id="seguridad" className="band relative py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow>{t.security.eyebrow}</Eyebrow>
        </Reveal>
        <div className="mt-4.5 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <Reveal delay={d(1)}>
            <h2 className="max-w-[18ch] text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em]">
              {t.security.title}
            </h2>
          </Reveal>
          <Reveal delay={d(2)}>
            <p className="max-w-[44ch] text-lg leading-[1.6] text-[color:var(--text-muted)]">
              {t.security.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Números: lo más escaneable, arriba de todo. */}
        <Reveal delay={d(1)}>
          <div className="mt-12 grid grid-cols-2 gap-6 border-y border-[color:var(--border-subtle)] py-9 md:grid-cols-4">
            {t.security.numbers.map((c) => (
              <div key={c.label}>
                <b className="block font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] font-bold leading-none tracking-[-0.02em]">
                  {c.value}
                </b>
                <span className="mt-2 block text-sm leading-snug text-[color:var(--text-muted)]">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Garantías por contrato */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.security.trust.map(({ title, desc }, i) => {
            const Icon = TRUST_ICONS[i] ?? FileCode2;
            return (
              <Reveal key={title} delay={d(i + 1)} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-[var(--radius-lg)] bg-[color:var(--card)] p-5">
                  <Icon size={22} strokeWidth={1.8} aria-hidden />
                  <div>
                    <h3 className="font-semibold leading-snug">{title}</h3>
                    <p className="mt-1 text-sm leading-[1.55] text-[color:var(--text-muted)]">
                      {desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Seguridad incluida: una línea de chips, sin párrafos. */}
        <Reveal delay={d(2)}>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label={t.security.eyebrow}>
            {t.security.practices.map(({ title }, i) => {
              const Icon = PRACTICE_ICONS[i] ?? Lock;
              return (
                <li
                  key={title}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border-subtle)] px-3.5 py-2 text-sm font-medium"
                >
                  <Icon size={15} strokeWidth={1.9} aria-hidden />
                  {title}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
