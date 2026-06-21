"use client";

import {
  Phone,
  FileSpreadsheet,
  Clock,
  Frown,
  CalendarCheck,
  LayoutDashboard,
  Zap,
  Smile,
  ArrowRight,
  ArrowDown,
  type LucideIcon,
} from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";

interface Row {
  pIcon: LucideIcon;
  problema: string;
  sIcon: LucideIcon;
  solucion: string;
}

const ROWS: Row[] = [
  {
    pIcon: Phone,
    problema: "30 llamadas por día para tomar reservas",
    sIcon: CalendarCheck,
    solucion: "Sistema de reservas automático 24/7",
  },
  {
    pIcon: FileSpreadsheet,
    problema: "Hojas de Excel desactualizadas",
    sIcon: LayoutDashboard,
    solucion: "Dashboard en tiempo real",
  },
  {
    pIcon: Clock,
    problema: "8 horas por semana en tareas manuales",
    sIcon: Zap,
    solucion: "Automatización completa",
  },
  {
    pIcon: Frown,
    problema: "Equipo estresado y desmotivado",
    sIcon: Smile,
    solucion: "Procesos fluidos y simples",
  },
];

export function Solution() {
  return (
    <section id="solucion" className="relative py-[var(--section-y)]">
      <Container>
        {/* Header */}
        <Reveal>
          <Eyebrow center>Antes / Después</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            Del caos operativo al piloto automático
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mt-4 mx-auto max-w-[52ch] text-center text-[color:var(--text-muted)] leading-[1.6]">
            Esto es lo que cambia cuando dejás de hacer a mano lo que un sistema
            resuelve solo.
          </p>
        </Reveal>

        {/* Transformation rows */}
        <div className="mt-12 flex flex-col gap-4">
          {ROWS.map(({ pIcon: PIcon, problema, sIcon: SIcon, solucion }, i) => (
            <Reveal key={problema} delay={d(i + 1)}>
              {/* Grid: [problema card] [arrow] [solución card] on md+, stacked on mobile */}
              <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr]">

                {/* Problema card — left */}
                <div className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-5 [box-shadow:var(--shadow-sm)]">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-red-50">
                    <PIcon
                      size={20}
                      strokeWidth={1.7}
                      style={{ color: "var(--danger-400)" }}
                    />
                  </span>
                  <p className="text-sm leading-[1.6] text-[color:var(--text-muted)] line-through decoration-[color:var(--danger-400)] decoration-[1.5px]">
                    {problema}
                  </p>
                </div>

                {/* Arrow — points right on md+, down on mobile */}
                <div className="flex justify-center">
                  <ArrowRight
                    size={22}
                    strokeWidth={2}
                    className="hidden text-[color:var(--text-subtle)] md:block"
                    aria-hidden
                  />
                  <ArrowDown
                    size={22}
                    strokeWidth={2}
                    className="block text-[color:var(--text-subtle)] md:hidden"
                    aria-hidden
                  />
                </div>

                {/* Solución card — right (tinte esmeralda: el "después" deseable) */}
                <div className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-[color:color-mix(in_srgb,var(--secondary)_32%,transparent)] bg-[color:color-mix(in_srgb,var(--secondary)_6%,white)] p-5 [box-shadow:var(--shadow-sm)]">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-emerald-50">
                    <SIcon
                      size={20}
                      strokeWidth={1.7}
                      style={{ color: "var(--secondary)" }}
                    />
                  </span>
                  <p className="text-sm font-semibold leading-[1.6] text-[color:var(--secondary-ink)]">
                    {solucion}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
