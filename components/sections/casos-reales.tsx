"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { RollingText } from "@/components/ui/rolling-text";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { ProjectCard } from "@/components/sections/project-card";
import { PROJECTS } from "@/components/sections/projects-data";
import { useT } from "@/lib/i18n";

/** Preview de proyectos reales en la home — prueba en vivo antes del precio. */
export function CasosReales() {
  const t = useT();
  const destacados = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="casos" className="relative py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow center>{t.cases.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4 text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            {t.cases.title}
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-4 max-w-[52ch] text-center leading-[1.6] text-[color:var(--text-muted)]">
            {t.cases.subtitle}
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
              className="roll-trigger group inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--text-strong)] transition-[border-color,background-color] duration-200 hover:border-[color:var(--text-muted)] hover:bg-[color:var(--accent-soft)]"
            >
              <RollingText text={t.cases.cta} />
              <ArrowRight
                size={16}
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
