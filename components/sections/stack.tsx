"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Building2,
  Landmark,
  ShoppingBag,
  LayoutDashboard,
  Rocket,
  MonitorSmartphone,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Reveal, d } from "@/components/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { cn } from "@/lib/utils";

type Rubro = {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  frontend: string[];
  backend: string[];
  extras: string[];
};

const RUBROS: Rubro[] = [
  {
    id: "corporativo",
    label: "Corporativo",
    icon: Building2,
    desc: "Webs de empresa que transmiten solidez: veloces, seguras y fáciles de actualizar por tu equipo.",
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Headless CMS", "PostgreSQL"],
    extras: ["SEO técnico", "Analytics", "CI/CD"],
  },
  {
    id: "institucional",
    label: "Institucional",
    icon: Landmark,
    desc: "Portales públicos accesibles (AA), multilingües y preparados para picos de tráfico.",
    frontend: ["Astro", "Next.js", "TypeScript", "Tailwind CSS"],
    backend: ["Strapi", "Node.js", "PostgreSQL"],
    extras: ["Accesibilidad AA", "i18n", "CDN / Caché"],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingBag,
    desc: "Tiendas que venden: checkout fluido, pagos seguros y un catálogo a tu medida.",
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    backend: ["Shopify Hydrogen", "Stripe", "GraphQL", "Node.js"],
    extras: ["Pasarelas de pago", "Inventario", "Email marketing"],
  },
  {
    id: "saas",
    label: "Aplicación / SaaS",
    icon: LayoutDashboard,
    desc: "Plataformas y paneles a medida, multi-usuario y diseñados para escalar sin fricción.",
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    backend: ["NestJS", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    extras: ["Auth & roles", "API REST / GraphQL", "Docker"],
  },
  {
    id: "landing",
    label: "Landing / Marketing",
    icon: Rocket,
    desc: "Páginas de alto impacto para campañas, con animaciones y captación de leads.",
    frontend: ["Next.js", "Motion", "TypeScript", "Tailwind CSS"],
    backend: ["Serverless", "Formularios", "Webhooks"],
    extras: ["A/B testing", "Tag Manager", "Performance"],
  },
];

const COLS: [string, LucideIcon, keyof Pick<Rubro, "frontend" | "backend" | "extras">][] = [
  ["Frontend", MonitorSmartphone, "frontend"],
  ["Backend", Server, "backend"],
  ["Infra & extras", Wrench, "extras"],
];

export function Stack() {
  const [active, setActive] = useState(RUBROS[0].id);
  const rubro = RUBROS.find((r) => r.id === active) ?? RUBROS[0];

  return (
    <section id="stack" className="relative py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow>Habilidades & stack</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            La tecnología correcta para cada proyecto
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mt-4 max-w-[56ch] text-lg leading-[1.6] text-[color:var(--text-muted)]">
            Elegí el tipo de proyecto y mirá el stack que recomendamos. No casamos
            con una sola herramienta: usamos la que mejor encaja con tu rubro.
          </p>
        </Reveal>

        {/* rubro selector with sliding indicator */}
        <Reveal delay={d(3)} className="mt-9 flex flex-wrap gap-2">
          {RUBROS.map((r) => {
            const Icon = r.icon;
            const on = active === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                className={cn(
                  "relative flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                  on
                    ? "text-[color:var(--text-strong)]"
                    : "text-[color:var(--text-muted)] hover:text-[color:var(--text-body)]"
                )}
              >
                {on && (
                  <motion.span
                    layoutId="rubro-pill"
                    className="absolute inset-0 -z-10 rounded-[var(--radius-pill)] border border-[color:var(--border-default)] bg-[rgba(255,255,255,0.07)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <Icon
                  size={16}
                  strokeWidth={1.7}
                  className={on ? "text-[color:var(--accent-300)]" : ""}
                />
                {r.label}
              </button>
            );
          })}
        </Reveal>

        {/* panel */}
        <div className="mt-7 rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-7 [box-shadow:var(--edge-hi)] sm:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={rubro.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="max-w-[60ch] text-base leading-[1.6] text-[color:var(--text-body)]">
                {rubro.desc}
              </p>
              <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-3">
                {COLS.map(([title, Icon, key]) => (
                  <div key={title}>
                    <div className="mb-4 flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--surface-3)] text-[color:var(--accent-300)] [box-shadow:var(--edge-hi)]">
                        <Icon size={17} strokeWidth={1.7} />
                      </span>
                      <h4 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
                        {title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rubro[key].map((tech) => (
                        <span
                          key={tech}
                          className="rounded-[var(--radius-pill)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-2)] px-3 py-1.5 text-[13px] font-medium text-[color:var(--text-body)] transition-colors hover:border-[color:var(--border-strong)] hover:text-[color:var(--text-strong)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
