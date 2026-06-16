"use client";

import {
  Monitor,
  Code2,
  ShoppingCart,
  Gauge,
  PenTool,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { SpotlightGlow, trackSpotlight } from "@/components/ui/spotlight";

// Monochrome platinum palette — every tile is the same white metal, varied
// only in brightness so the grid keeps depth without colour.
const ITEMS: [LucideIcon, string, string, string][] = [
  [Monitor, "Sitios web a medida", "Webs corporativas y landing pages que cargan al instante y se ven impecables en cualquier pantalla.", "#f5f6f8"],
  [Code2, "Aplicaciones web", "Plataformas y paneles a medida con React y arquitecturas modernas, listas para escalar.", "#dde0e5"],
  [ShoppingCart, "E-commerce", "Tiendas online optimizadas para vender, con pagos seguros y una experiencia de compra fluida.", "#c5c9d0"],
  [Gauge, "Performance & SEO", "Optimización técnica, Core Web Vitals y posicionamiento para que te encuentren primero.", "#eef0f3"],
  [PenTool, "Diseño UI/UX", "Interfaces claras y memorables, diseñadas a partir de tu marca y tus objetivos.", "#cfd3da"],
  [ShieldCheck, "Mantenimiento", "Soporte continuo, monitoreo y mejoras para que tu producto siga impecable con el tiempo.", "#aeb3bd"],
];

export function Services() {
  return (
    <section id="servicios" className="relative py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow>Qué hacemos</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            Servicios pensados para crecer
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mt-4 max-w-[54ch] text-lg leading-[1.6] text-[color:var(--text-muted)]">
            Un equipo, todo el ciclo: del primer boceto al despliegue y más allá.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4.5 md:grid-cols-3">
          {ITEMS.map(([Icon, title, desc, tint], i) => (
            <Reveal key={title} delay={d((i % 3) + 1)} className="h-full">
              <div
                style={{ "--tile": tint } as React.CSSProperties}
                onPointerMove={trackSpotlight}
                className="group relative h-full overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[image:linear-gradient(180deg,var(--surface-2),var(--surface-1))] p-7 [box-shadow:var(--shadow-md),var(--edge-hi)] transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-[color:color-mix(in_srgb,var(--tile)_32%,var(--border-strong))] hover:[box-shadow:0_0_44px_-12px_color-mix(in_srgb,var(--tile)_50%,transparent),var(--shadow-lg)]"
              >
                {/* Platinum spotlight that follows the cursor. */}
                <SpotlightGlow />
                {/* Soft tinted bloom — reveals the card's hue on hover. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[color:color-mix(in_srgb,var(--tile)_45%,transparent)] opacity-0 blur-[44px] transition-opacity duration-500 group-hover:opacity-70"
                />
                <div className="relative">
                  <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--tile)_28%,transparent)] bg-[image:linear-gradient(150deg,color-mix(in_srgb,var(--tile)_20%,var(--surface-3)),var(--surface-3))] text-[color:var(--tile)] [box-shadow:var(--edge-hi)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:[box-shadow:var(--edge-hi),0_0_22px_-4px_color-mix(in_srgb,var(--tile)_70%,transparent)]">
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[color:var(--text-strong)]">
                    {title}
                  </h3>
                  <p className="text-sm leading-[1.65] text-[color:var(--text-muted)]">
                    {desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
