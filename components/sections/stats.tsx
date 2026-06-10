"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Reveal, d } from "@/components/reveal";
import { Container } from "@/components/sections/primitives";

type Stat = {
  value: number;
  precision?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 20, prefix: "+", label: "Proyectos lanzados" },
  { value: 7, suffix: " años", label: "Construyendo en la web" },
  { value: 1.2, precision: 1, suffix: "s", label: "Carga media de inicio" },
  { value: 24, suffix: " h", label: "Tiempo de respuesta" },
];

function CountUp({ value, precision = 0, prefix = "", suffix = "" }: Stat) {
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

export function Stats() {
  return (
    <section className="border-y border-[color:var(--border-subtle)] py-[var(--section-y-sm)] [background:linear-gradient(180deg,var(--surface-1),var(--bg-base))]">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={d(i + 1)}>
            <b className="block font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3rem)] font-bold tracking-[-0.02em] text-[color:var(--text-strong)]">
              <CountUp {...s} />
            </b>
            <span className="text-sm text-[color:var(--text-muted)]">
              {s.label}
            </span>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
