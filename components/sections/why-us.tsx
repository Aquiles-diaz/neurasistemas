"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
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
import { AnimatedNumber } from "@/components/ui/animated-number";
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
    title: "Rentabilidad inmediata",
    line: "Ves ROI en los primeros 30 días.",
  },
];

/* ─── Métricas ────────────────────────────────────────────────────────────── */

function CountUp({
  value,
  precision = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  precision?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <span ref={ref}>
      {prefix}
      <AnimatedNumber
        value={inView ? value : 0}
        precision={precision}
        stiffness={70}
        damping={18}
        format={(n) =>
          n.toLocaleString("es", {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
          })
        }
      />
      {suffix}
    </span>
  );
}

type Metrica = {
  display: "animated" | "static";
  value?: number;
  prefix?: string;
  suffix?: string;
  staticText?: string;
  label: string;
};

const METRICAS: Metrica[] = [
  {
    display: "animated",
    value: 20,
    prefix: "+",
    label: "negocios automatizados",
  },
  {
    display: "animated",
    value: 8,
    suffix: " h",
    label: "ahorradas por semana",
  },
  {
    display: "static",
    staticText: "2-3 sem",
    label: "de implementación",
  },
  {
    display: "static",
    staticText: "24/7",
    label: "atención sin parar",
  },
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
      className="bg-[color:var(--navy)] py-[var(--section-y)] text-white"
    >
      <Container>
        {/* Encabezado */}
        <Reveal>
          <Eyebrow className="text-[color:var(--secondary)]">
            Por qué nosotros
          </Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.08] tracking-[-0.015em] text-white">
            Lo que nos hace diferentes
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mt-4 max-w-[54ch] text-lg leading-[1.6] text-white/70">
            No somos una agencia de Buenos Aires que te manda un PDF. Somos un
            equipo local que entiende cómo funciona tu negocio y trabaja con vos
            hasta que el sistema está andando.
          </p>
        </Reveal>

        {/* ── Diferenciadores grid ── */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIFERENCIADORES.map(({ Icon, title, line }, i) => (
            <Reveal key={title} delay={d((i % 3) + 1)}>
              <div className="flex gap-4 rounded-[var(--radius-lg)] border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:bg-white/10">
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--secondary)]/15"
                  aria-hidden
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="text-[color:var(--secondary)]"
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

        {/* ── Métricas row ── */}
        <Reveal delay={d(1)}>
          <div className="mt-16 grid grid-cols-2 gap-6 border-y border-white/10 py-10 md:grid-cols-4">
            {METRICAS.map((m) => (
              <div key={m.label} className="text-center">
                <b className="block font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] text-[color:var(--secondary)]">
                  {m.display === "animated" ? (
                    <CountUp
                      value={m.value!}
                      prefix={m.prefix}
                      suffix={m.suffix}
                    />
                  ) : (
                    m.staticText
                  )}
                </b>
                <span className="mt-1 block text-sm text-white/60">
                  {m.label}
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
          <div className="mt-8 hidden overflow-hidden rounded-[var(--radius-lg)] border border-white/10 md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-5 py-3.5 text-left font-semibold text-white/70">
                    Aspecto
                  </th>
                  <th className="px-5 py-3.5 text-left font-semibold text-[color:var(--secondary)]">
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
                        ? "border-b border-white/5"
                        : "border-b border-white/5 bg-white/[0.03]"
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
                          className="shrink-0 text-[color:var(--secondary)]"
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
              <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/5 p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                  {row.aspecto}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-sm text-white">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="shrink-0 text-[color:var(--secondary)]"
                      aria-hidden
                    />
                    <span>
                      <span className="font-semibold text-[color:var(--secondary)]">
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
