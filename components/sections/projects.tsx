"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/sections/primitives";
import { ProjectCard } from "@/components/sections/project-card";
import { PROJECTS, FILTERS } from "@/components/sections/projects-data";
import { cn } from "@/lib/utils";

/** Full, filterable project grid — lives on the dedicated /proyectos page. */
export function Projects() {
  const [active, setActive] = useState("all");
  const shown = PROJECTS.filter((p) => active === "all" || p.cat === active);

  return (
    <section className="pb-[var(--section-y)]">
      <Container>
        <Reveal className="flex flex-wrap gap-2.5">
          {FILTERS.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                "cursor-pointer rounded-[var(--radius-pill)] border px-4 py-2 text-sm font-medium transition-[color,background-color,border-color] duration-200",
                active === id
                  ? "border-[color:var(--border-strong)] bg-[color:var(--surface-3)] text-[color:var(--text-strong)] [box-shadow:var(--edge-hi)]"
                  : "border-[color:var(--border-default)] bg-transparent text-[color:var(--text-muted)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--text-strong)]"
              )}
            >
              {label}
            </button>
          ))}
        </Reveal>

        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <ProjectCard key={p.name} project={p} showTags />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
