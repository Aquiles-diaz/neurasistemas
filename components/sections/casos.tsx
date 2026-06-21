"use client";

import {
  UtensilsCrossed,
  Shirt,
  Stethoscope,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Badge } from "@/components/sections/primitives";

interface Caso {
  lugar: string;
  zona: string;
  icon: LucideIcon;
  antes: string;
  ahora: string;
  metrica: string;
}

const CASOS: Caso[] = [
  {
    lugar: 'Restaurante "La Trattoria"',
    zona: "Rosario",
    icon: UtensilsCrossed,
    antes: "40 llamadas/día para reservas, perdían clientes",
    ahora: "Reservas online automáticas",
    metrica: "−70% llamadas · +25% ocupación",
  },
  {
    lugar: 'Tienda de ropa "Estilo"',
    zona: "Centro, Rosario",
    icon: Shirt,
    antes: "Inventario en papel, retrasos en pedidos",
    ahora: "CRM integrado que avisa automáticamente",
    metrica: "Tiempo de respuesta −80%",
  },
  {
    lugar: 'Consultorio "Dr. García"',
    zona: "San Nicolás",
    icon: Stethoscope,
    antes: "Pacientes olvidaban citas, confirmación manual",
    ahora: "Recordatorios automáticos por SMS",
    metrica: "No-shows −50%",
  },
];

export function Casos() {
  return (
    <section id="casos" className="relative py-[var(--section-y)] bg-[color:var(--surface-1)]">
      <Container>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)] [font-family:var(--font-display)]">
            Resultados que se notan
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mt-4 mx-auto max-w-[54ch] text-center text-lg leading-[1.6] text-[color:var(--text-muted)]">
            Negocios como el tuyo que dejaron de perder tiempo y empezaron a crecer.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4.5 md:grid-cols-3">
          {CASOS.map(({ lugar, zona, icon: Icon, antes, ahora, metrica }, i) => (
            <Reveal key={lugar} delay={d(i + 1)} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-white p-7 [box-shadow:var(--shadow-md),var(--edge-hi)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:[box-shadow:var(--shadow-lg),var(--edge-hi)]">
                {/* Ejemplo ilustrativo badge — non-negotiable */}
                <div className="mb-5">
                  <Badge>Ejemplo ilustrativo</Badge>
                </div>

                {/* Icon tile */}
                <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--surface-2)] border border-[color:var(--border-subtle)] text-[color:var(--primary)] transition-[transform] duration-300 group-hover:-translate-y-0.5">
                  <Icon size={26} strokeWidth={1.6} aria-hidden />
                </div>

                {/* Lugar + zona */}
                <h3 className="mb-0.5 text-base font-bold leading-snug text-[color:var(--text-strong)] [font-family:var(--font-display)]">
                  {lugar}
                </h3>
                <p className="mb-5 text-xs text-[color:var(--text-subtle)]">{zona}</p>

                {/* Antes / Ahora */}
                <div className="mb-5 flex flex-col gap-2.5 flex-1">
                  <div className="flex gap-2.5">
                    <span className="mt-0.5 shrink-0 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-subtle)]">
                      Antes:
                    </span>
                    <span className="text-sm leading-[1.55] text-[color:var(--text-muted)]">
                      {antes}
                    </span>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="mt-0.5 shrink-0 text-xs font-semibold uppercase tracking-wide text-[color:var(--secondary-ink)]">
                      Ahora:
                    </span>
                    <span className="text-sm leading-[1.55] text-[color:var(--text-body)]">
                      {ahora}
                    </span>
                  </div>
                </div>

                {/* Metric highlight */}
                <div className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[color:var(--surface-1)] border border-[color:var(--border-subtle)] px-3.5 py-2.5">
                  <TrendingUp
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-[color:var(--secondary)]"
                    aria-hidden
                  />
                  <span className="text-xs font-semibold text-[color:var(--secondary-ink)]">
                    {metrica}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
