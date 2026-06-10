"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/components/sections/projects-data";

/** Reusable portfolio card — used in both the landing preview and /proyectos. */
export function ProjectCard({
  project,
  showTags = false,
}: {
  project: Project;
  showTags?: boolean;
}) {
  const { name, type, initials, desc, tags } = project;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] [box-shadow:var(--edge-hi)] transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-[color:var(--border-default)] hover:[box-shadow:var(--glow-accent-lg),var(--shadow-md)]"
    >
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden [background:linear-gradient(155deg,var(--ink-800),var(--ink-900))]">
        <span
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{ background: "var(--metal-edge)" }}
        />
        {/* accent wash that blooms on hover */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(70% 90% at 50% 120%, var(--accent-glow), transparent 70%)",
          }}
        />
        <b className="metal-text relative font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-bold tracking-[-0.02em] opacity-85 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.06]">
          {initials}
        </b>
      </div>
      <div className="flex flex-1 flex-col px-5 py-4.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-lg font-bold text-[color:var(--text-strong)]">
              {name}
            </h4>
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.06em] text-[color:var(--text-subtle)]">
              {type}
            </p>
          </div>
          <span className="text-[color:var(--text-subtle)] transition-[transform,color] duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--accent-300)]">
            <ArrowUpRight size={22} strokeWidth={1.6} />
          </span>
        </div>
        {showTags && (
          <>
            <p className="mt-3 text-sm leading-[1.6] text-[color:var(--text-muted)]">
              {desc}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-[var(--radius-pill)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.06em] text-[color:var(--text-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}
