"use client";

import { MessageCircle, FileText, Wrench, GraduationCap, type LucideIcon } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";

const STEPS: [string, LucideIcon, string, string][] = [
  ["01", MessageCircle, "Diagnóstico", "Hablamos 20 minutos. Entendemos tu negocio."],
  ["02", FileText, "Propuesta", "Te decimos exactamente qué hacemos y cuánto cuesta."],
  ["03", Wrench, "Implementación", "Construimos tu sistema sin molestarte."],
  ["04", GraduationCap, "Capacitación + Soporte", "Te enseñamos a usarlo, y estamos cuando nos necesités."],
];

export function Process() {
  return (
    <section id="proceso" className="py-[var(--section-y-sm)]">
      <Container>
        <Reveal>
          <Eyebrow>Simple y sin vueltas</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            Cómo trabajamos
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 items-stretch gap-4.5 lg:grid-cols-4">
          {STEPS.map(([n, Icon, title, desc], i) => (
            <Reveal key={n} delay={d(i + 1)} className="h-full">
              <div className="relative h-full rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] px-5.5 py-6.5 [box-shadow:var(--edge-hi)]">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.1em] text-[color:var(--accent-300)]">
                    {n}
                  </span>
                  <span className="text-[color:var(--silver-300)]">
                    <Icon size={20} strokeWidth={1.6} />
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
          ))}
        </div>
      </Container>
    </section>
  );
}
