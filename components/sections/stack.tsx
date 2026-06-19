"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Building2,
  Landmark,
  ShoppingBag,
  LayoutDashboard,
  Rocket,
  ListChecks,
  TrendingUp,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { cn } from "@/lib/utils";

type Rubro = {
  id: string;
  label: string;
  icon: LucideIcon;
  tagline: string;
  incluye: string[];
  ganas: string[];
  stack: string[];
};

const RUBROS: Rubro[] = [
  {
    id: "corporativo",
    label: "Corporativo",
    icon: Building2,
    tagline: "Una web que transmite solidez y vende confianza.",
    incluye: [
      "Diseño a medida de tu marca",
      "Páginas que actualizás vos, sin programar",
      "Optimización para aparecer en Google",
      "Formularios y vías de contacto",
      "Panel de métricas de visitas",
    ],
    ganas: [
      "Imagen profesional que genera confianza",
      "Independencia para cargar contenido",
      "Que te encuentren tus clientes",
      "Carga veloz en celular y escritorio",
    ],
    stack: ["Next.js", "Headless CMS", "Tailwind"],
  },
  {
    id: "institucional",
    label: "Institucional",
    icon: Landmark,
    tagline: "Portales públicos para todos, que no se caen.",
    incluye: [
      "Accesibilidad para todos (nivel AA)",
      "Sitio en varios idiomas",
      "Gestor de noticias y trámites",
      "Buscador interno",
      "Preparado para picos de tráfico",
    ],
    ganas: [
      "Llegás a toda la ciudadanía",
      "Cumplís la normativa de accesibilidad",
      "Aguanta días de mucha visita sin caerse",
      "Tu equipo publica sin depender de nadie",
    ],
    stack: ["Astro", "Strapi", "CDN"],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingBag,
    tagline: "Tiendas que venden, no solo que se ven.",
    incluye: [
      "Checkout en pocos pasos",
      "Pagos con tarjeta, MercadoPago y Stripe",
      "Catálogo que gestionás vos mismo",
      "Gestión de envíos y stock",
      "Emails para recuperar carritos",
    ],
    ganas: [
      "Más ventas cerradas",
      "Menos carritos abandonados",
      "Cargás y editás productos solo",
      "Clientes que vuelven a comprar",
    ],
    stack: ["Next.js", "Shopify", "Stripe"],
  },
  {
    id: "saas",
    label: "Aplicación / SaaS",
    icon: LayoutDashboard,
    tagline: "Plataformas a medida que crecen con tu negocio.",
    incluye: [
      "Paneles y dashboards a tu medida",
      "Usuarios y permisos por rol",
      "Integración con tus herramientas",
      "Reportes y exportaciones",
      "Arquitectura lista para escalar",
    ],
    ganas: [
      "Automatizás tareas manuales",
      "Cada equipo ve solo lo que le toca",
      "Escalás sin tener que rehacer todo",
      "Datos claros para tomar decisiones",
    ],
    stack: ["React", "NestJS", "PostgreSQL"],
  },
  {
    id: "landing",
    label: "Landing / Marketing",
    icon: Rocket,
    tagline: "Páginas de alto impacto que convierten visitas en clientes.",
    incluye: [
      "Diseño enfocado en convertir",
      "Animaciones y alto impacto visual",
      "Captación de leads y formularios",
      "Carga ultra rápida",
      "Listo para campañas y test A/B",
    ],
    ganas: [
      "Más leads de tus campañas",
      "Mejor retorno de tu inversión en ads",
      "Carga al instante: no perdés visitas",
      "Medís y mejorás qué funciona",
    ],
    stack: ["Next.js", "Motion", "Analytics"],
  },
];

const PANELS: [string, LucideIcon, keyof Pick<Rubro, "incluye" | "ganas">][] = [
  ["Qué incluye", ListChecks, "incluye"],
  ["Lo que ganás", TrendingUp, "ganas"],
];

export function Stack() {
  const [active, setActive] = useState(RUBROS[0].id);
  const rubro = RUBROS.find((r) => r.id === active) ?? RUBROS[0];

  return (
    <section id="stack" className="relative py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow>Soluciones por rubro</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            La solución correcta para cada proyecto
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mt-4 max-w-[56ch] text-lg leading-[1.6] text-[color:var(--text-muted)]">
            Elegí tu tipo de proyecto y mirá qué incluye y qué ganás. Detrás
            elegimos la tecnología que mejor encaja con tu rubro — sin atarnos a
            una sola herramienta.
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
              {/* punchy promise for the rubro */}
              <p className="max-w-[34ch] font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.6vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.01em] text-[color:var(--text-strong)] [text-wrap:balance]">
                {rubro.tagline}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                {PANELS.map(([title, Icon, key]) => (
                  <div key={title}>
                    <div className="mb-4 flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--surface-3)] text-[color:var(--accent-300)] [box-shadow:var(--edge-hi)]">
                        <Icon size={17} strokeWidth={1.7} />
                      </span>
                      <h4 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
                        {title}
                      </h4>
                    </div>
                    <ul className="flex flex-col gap-2.5">
                      {rubro[key].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[color:var(--text-body)]"
                        >
                          <Check
                            size={16}
                            strokeWidth={2.4}
                            className="mt-0.5 shrink-0 text-[color:var(--accent-300)]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* tech, kept small as a credibility footnote */}
              <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-[color:var(--border-subtle)] pt-5">
                <span className="font-[family-name:var(--font-mono)] text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
                  Bajo el capó
                </span>
                {rubro.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[12.5px] font-medium text-[color:var(--text-muted)]"
                  >
                    · {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
