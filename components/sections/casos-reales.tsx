"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { ProjectCard } from "@/components/sections/project-card";
import { PROJECTS } from "@/components/sections/projects-data";

/** Preview de proyectos reales en la home — prueba en vivo antes del precio. */
export function CasosReales() {
  const destacados = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="casos" className="relative py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow center>Casos reales</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4 text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            Proyectos reales, funcionando hoy
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-4 max-w-[52ch] text-center text-[color:var(--text-muted)] leading-[1.6]">
            No son maquetas: son sistemas en vivo que ya están dando resultados.
            Entrá y probalos vos mismo.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((p, i) => (
            <Reveal key={p.slug} delay={d((i % 3) + 1)} className="h-full">
              <ProjectCard project={p} showTags />
            </Reveal>
          ))}
        </div>

        <Reveal delay={d(2)}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/proyectos"
              className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border-default)] px-6 text-base font-semibold text-[color:var(--text-strong)] transition-[transform,border-color,background-color] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-2)]"
            >
              Ver todos los proyectos
              <ArrowRight
                size={18}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
