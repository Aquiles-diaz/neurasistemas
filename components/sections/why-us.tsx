"use client";

import {
  Zap,
  MapPin,
  MousePointerClick,
  Sprout,
  BadgeCheck,
  LineChart,
  Check,
  X,
  type LucideIcon,
} from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";

/* ─── Diferenciadores ─────────────────────────────────────────────────────── */

type Diferenciador = {
  Icon: LucideIcon;
  title: string;
  line: string;
};

const DIFERENCIADORES: Diferenciador[] = [
  {
    Icon: Zap,
    title: "Implementación rápida",
    line: "2-4 semanas, no meses.",
  },
  {
    Icon: MapPin,
    title: "Soporte local",
    line: "Aquiles en Rosario, no un chat robótico.",
  },
  {
    Icon: MousePointerClick,
    title: "Sin código",
    line: "No necesitás saber programar.",
  },
  {
    Icon: Sprout,
    title: "Crece con vos",
    line: "Empezás chico, sumás funciones después.",
  },
  {
    Icon: BadgeCheck,
    title: "Precio justo",
    line: "Presupuestos cerrados, sin sorpresas.",
  },
  {
    Icon: LineChart,
    title: "Es inversión, no gasto",
    line: "Vuelve en tiempo ahorrado y en ventas que hoy se te escapan.",
  },
];

/* ─── Compromisos (en vez de métricas que todavía no podemos demostrar) ────── */

type Compromiso = {
  value: string;
  label: string;
};

const COMPROMISOS: Compromiso[] = [
  { value: "2-3 sem", label: "de la idea a tu sistema andando" },
  { value: "24/7", label: "tu negocio atendiendo sin parar" },
  { value: "100%", label: "en español y con soporte local" },
  { value: "0", label: "sorpresas: presupuesto cerrado" },
];

/* ─── Tabla comparativa ───────────────────────────────────────────────────── */

type CompRow = {
  aspecto: string;
  neura: string;
  agencias: string;
};

const COMP_ROWS: CompRow[] = [
  {
    aspecto: "Ubicación",
    neura: "Rosario, soporte local",
    agencias: "CABA, soporte remoto",
  },
  {
    aspecto: "Tiempo",
    neura: "2-4 semanas",
    agencias: "8-12 semanas",
  },
  {
    aspecto: "Precio",
    neura: "$450 a 2.500 USD",
    agencias: "$1.000 a 5.000+ USD",
  },
  {
    aspecto: "Modelo",
    neura: "Packs claros",
    agencias: "Presupuesto a medida",
  },
  {
    aspecto: "Recurrencia",
    neura: "Mantenimiento mensual",
    agencias: "Proyecto y se acabó",
  },
];

/* ─── Componente principal ────────────────────────────────────────────────── */

export function WhyUs() {
  return (
    <section
      id="porque"
      className="bg-[color:var(--ink)] py-[var(--section-y)] text-white"
    >
      <Container>
        {/* Encabezado */}
        <Reveal>
          <Eyebrow center className="text-[color:var(--accent)]">
            Por qué nosotros
          </Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4 text-center font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.08] tracking-[-0.015em] text-white">
            Lo que nos hace diferentes
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mt-4 mx-auto max-w-[54ch] text-center text-lg leading-[1.6] text-white/70">
            No somos una agencia de Buenos Aires que te manda un PDF. Somos un
            equipo local que entiende cómo funciona tu negocio y trabaja con vos
            hasta que el sistema está andando.
          </p>
        </Reveal>

        {/* ── Diferenciadores grid ── */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIFERENCIADORES.map(({ Icon, title, line }, i) => (
            <Reveal key={title} delay={d((i % 3) + 1)}>
              <div className="flex gap-4 rounded-[var(--radius-lg)] border border-[color:var(--hairline)] bg-[color:var(--card)] p-6 transition-colors duration-200 hover:border-[color:var(--accent)]/35 hover:bg-[color:var(--card-hover)]">
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--accent)]/15"
                  aria-hidden
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="text-[color:var(--accent)]"
                  />
                </div>
                <div>
                  <h3 className="font-semibold leading-snug text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-[1.55] text-white/65">
                    {line}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Compromisos row ── */}
        <Reveal delay={d(1)}>
          <div className="mt-16 grid grid-cols-2 gap-6 border-y border-[color:var(--hairline)] py-10 md:grid-cols-4">
            {COMPROMISOS.map((c) => (
              <div key={c.label} className="text-center">
                <b className="block font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] text-[color:var(--accent)]">
                  {c.value}
                </b>
                <span className="mt-1 block text-sm text-white/60">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Tabla comparativa ── */}
        <Reveal delay={d(1)}>
          <h3 className="mt-16 font-[family-name:var(--font-display)] text-[clamp(1.3rem,2.8vw,1.75rem)] font-bold text-white">
            Neura Sistemas vs. Agencias típicas
          </h3>
          <p className="mt-2 text-sm text-white/60">
            No todas las agencias son iguales. Mirá la diferencia.
          </p>
        </Reveal>

        {/* Desktop: tabla visible desde md */}
        <Reveal delay={d(2)}>
          <div className="mt-8 hidden overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--hairline)] md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[color:var(--hairline)] bg-[color:var(--card)]">
                  <th className="px-5 py-3.5 text-left font-semibold text-white/70">
                    Aspecto
                  </th>
                  <th className="px-5 py-3.5 text-left font-semibold text-[color:var(--accent)]">
                    Neura Sistemas
                  </th>
                  <th className="px-5 py-3.5 text-left font-semibold text-white/50">
                    Agencias típicas
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMP_ROWS.map((row, i) => (
                  <tr
                    key={row.aspecto}
                    className={
                      i % 2 === 0
                        ? "border-b border-[color:var(--hairline)]"
                        : "border-b border-[color:var(--hairline)] bg-white/[0.03]"
                    }
                  >
                    <td className="px-5 py-4 font-medium text-white/80">
                      {row.aspecto}
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-2 text-white">
                        <Check
                          size={15}
                          strokeWidth={2.5}
                          className="shrink-0 text-[color:var(--accent)]"
                          aria-hidden
                        />
                        {row.neura}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-2 text-white/60">
                        <X
                          size={15}
                          strokeWidth={2.5}
                          className="shrink-0"
                          aria-hidden
                        />
                        {row.agencias}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile: stacked cards (visible solo hasta md) */}
        <div className="mt-8 flex flex-col gap-4 md:hidden">
          {COMP_ROWS.map((row, i) => (
            <Reveal key={row.aspecto} delay={d(i + 1)}>
              <div className="rounded-[var(--radius-lg)] border border-[color:var(--hairline)] bg-[color:var(--card)] p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                  {row.aspecto}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-sm text-white">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="shrink-0 text-[color:var(--accent)]"
                      aria-hidden
                    />
                    <span>
                      <span className="font-semibold text-[color:var(--accent)]">
                        Neura:{" "}
                      </span>
                      {row.neura}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-sm text-white/60">
                    <X
                      size={14}
                      strokeWidth={2.5}
                      className="shrink-0"
                      aria-hidden
                    />
                    <span>
                      <span className="font-semibold">Agencias: </span>
                      {row.agencias}
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
