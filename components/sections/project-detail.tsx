"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import { ArrowLeft, ArrowUpRight, Github, Globe } from "lucide-react";
import { TiltScroll } from "@/components/ui/tilt-scroll";
import { Container, Eyebrow } from "@/components/sections/primitives";
import type { Project } from "@/components/sections/projects-data";
import type { ProjectContent } from "@/lib/github";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Staggered entrance shared by every block on the page. */
const enter = (i: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay: 0.08 * i },
});

export function ProjectDetail({
  project,
  content,
}: {
  project: Project;
  content: ProjectContent;
}) {
  const { title, desc, repoUrl } = content;
  const displayUrl = project.url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <Container className="relative z-[1]">
      <m.div {...enter(0)}>
        <Link
          href="/proyectos"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-strong)]"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.8}
            className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-x-0.5"
          />
          Volver a proyectos
        </Link>
      </m.div>

      <m.div {...enter(1)} className="mt-8">
        <Eyebrow>{project.type}</Eyebrow>
      </m.div>

      <m.h1
        {...enter(2)}
        className="mt-5 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.4vw,4rem)] font-bold leading-[1.03] tracking-[-0.02em] text-[color:var(--text-strong)]"
      >
        <span className="brand-text">{title}</span>
      </m.h1>

      <m.p
        {...enter(3)}
        className="mt-5 max-w-[58ch] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.6] text-[color:var(--text-muted)]"
      >
        {desc}
      </m.p>

      <m.div {...enter(4)} className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-[var(--radius-pill)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.06em] text-[color:var(--text-muted)]"
          >
            {t}
          </span>
        ))}
      </m.div>

      {(project.url || repoUrl) && (
        <m.div {...enter(5)} className="mt-8 flex flex-wrap items-center gap-3.5">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[color:var(--accent-cta)] px-7 text-base font-semibold text-[color:var(--text-onaccent)] shadow-[var(--shadow-md)] transition-[transform,background-color,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:bg-[color:var(--accent-cta-hover)] active:translate-y-px"
            >
              Visitar sitio
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] items-center gap-2 rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] bg-[color:var(--surface-2)] px-6 text-base font-semibold text-[color:var(--text-strong)] [box-shadow:var(--edge-hi)] transition-[transform,background-color,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:bg-[color:var(--surface-3)] hover:[box-shadow:var(--glow-silver),var(--edge-hi)]"
            >
              <Github size={18} strokeWidth={1.6} />
              Ver repositorio
            </a>
          )}
        </m.div>
      )}

      {/* Browser-frame preview of the live site — fades in on load, then
          settles flat in 3D as it scrolls into view. */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
        className="mt-12"
      >
        <TiltScroll>
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border-default)] bg-[color:var(--surface-1)] [box-shadow:var(--shadow-lg),var(--edge-hi)]">
          <div className="flex items-center gap-3 border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-full bg-[color:var(--border-strong)]"
                />
              ))}
            </span>
            <span className="flex min-w-0 flex-1 justify-center">
              <span className="flex max-w-full items-center gap-2 truncate rounded-[var(--radius-pill)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] px-4 py-1.5 font-[family-name:var(--font-mono)] text-xs text-[color:var(--text-subtle)]">
                <Globe size={12} strokeWidth={1.8} className="flex-none" />
                <span className="truncate">
                  {displayUrl ?? `${project.slug}.neurasistemas.com.ar`}
                </span>
              </span>
            </span>
            <span className="w-[46px]" aria-hidden />
          </div>

          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar ${title}`}
              className="group relative flex aspect-[16/9] items-center justify-center overflow-hidden [background:linear-gradient(155deg,var(--surface-2),var(--surface-3))]"
            >
              <PreviewArt project={project} title={title} />
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color:var(--border-default)] bg-[color:var(--surface-2)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--text-strong)] opacity-0 [box-shadow:var(--edge-hi)] transition-opacity duration-300 group-hover:opacity-100">
                Abrir sitio
                <ArrowUpRight size={13} strokeWidth={1.8} />
              </span>
            </a>
          ) : (
            <div className="group relative flex aspect-[16/9] items-center justify-center overflow-hidden [background:linear-gradient(155deg,var(--surface-2),var(--surface-3))]">
              <PreviewArt project={project} title={title} />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-subtle)]">
                Vista previa disponible próximamente
              </span>
            </div>
          )}
          </div>
        </TiltScroll>
      </m.div>
    </Container>
  );
}

function PreviewArt({ project, title }: { project: Project; title: string }) {
  // Real screenshot of the live site when available; initials art otherwise.
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`Vista previa de ${title}`}
        fill
        sizes="(max-width: 1200px) 100vw, 1104px"
        className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.02]"
      />
    );
  }
  return (
    <>
      <span
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{ background: "var(--metal-edge)" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 120%, var(--accent-glow), transparent 70%)",
        }}
      />
      <b className="brand-text relative font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,5.5rem)] font-bold tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.05]">
        {project.initials}
      </b>
    </>
  );
}
