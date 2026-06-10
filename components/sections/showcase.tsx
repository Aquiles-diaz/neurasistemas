"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, d } from "@/components/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { ProjectCard } from "@/components/sections/project-card";
import { PROJECTS } from "@/components/sections/projects-data";
import { gsap, useGSAP, EASE } from "@/lib/gsap";

/** Landing preview: a few featured projects + a link out to the full page. */
export function Showcase() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-card]", {
          y: 44,
          autoAlpha: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.12,
          scrollTrigger: { trigger: grid.current, start: "top 82%" },
        });
      });
    },
    { scope: grid }
  );

  return (
    <section id="portafolio" className="py-[var(--section-y)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Trabajo reciente</Eyebrow>
            </Reveal>
            <Reveal delay={d(1)}>
              <h2 className="mt-4.5 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
                Proyectos que hablan por nosotros
              </h2>
            </Reveal>
          </div>
          <Reveal delay={d(2)}>
            <Link
              href="/proyectos"
              className="group inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] bg-[color:var(--surface-2)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text-strong)] [box-shadow:var(--edge-hi)] transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:[box-shadow:var(--glow-accent-lg),var(--edge-hi)]"
            >
              Ver todos los proyectos
              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>

        <div
          ref={grid}
          className="mt-9 grid grid-cols-1 gap-4.5 md:grid-cols-3"
        >
          {featured.map((p) => (
            <div key={p.name} data-card className="h-full">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
