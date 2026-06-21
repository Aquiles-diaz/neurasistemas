"use client";

import { Rocket, TrendingUp, Crown, Check, type LucideIcon } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow, CtaButton } from "@/components/sections/primitives";
import { useScrollTo } from "@/components/scroll/use-scroll-to";

interface Pack {
  id: string;
  icon: LucideIcon;
  accent: string;
  name: string;
  para: string;
  titular: string;
  bullets: string[];
  precio: string;
  featured: boolean;
}

const PACKS: Pack[] = [
  {
    id: "arrancar",
    icon: Rocket,
    accent: "var(--primary)",
    name: "Arrancar",
    para: "Para comercios que recién abren",
    titular: "Tu web lista en 3 semanas",
    bullets: [
      "Sitio profesional que vende",
      "Horarios, ubicación y contacto integrados",
      "Formulario para que te contacten directo",
    ],
    precio: "Desde $450 USD",
    featured: false,
  },
  {
    id: "crecer",
    icon: TrendingUp,
    accent: "var(--secondary)",
    name: "Crecer",
    para: "Para negocios con procesos para optimizar",
    titular: "Automatizamos lo que te quita tiempo",
    bullets: [
      "Reservas/pedidos online automáticos",
      "Chatbot que atiende mientras dormís",
      "Dashboard para ver qué pasa en tu negocio",
    ],
    precio: "Desde $900 USD",
    featured: true,
  },
  {
    id: "dominar",
    icon: Crown,
    accent: "var(--accent-cta)",
    name: "Dominar",
    para: "Para negocios estructurados",
    titular: "Sistema completo integrado",
    bullets: [
      "Web + CRM + Automatización",
      "Reportes y métricas automáticas",
      "Capacitación de tu equipo incluida",
    ],
    precio: "Desde $1800 USD",
    featured: false,
  },
];

export function Packs() {
  const scrollTo = useScrollTo();

  return (
    <section id="packs" className="relative py-[var(--section-y)] bg-[color:var(--surface-1)]">
      <Container>
        <Reveal>
          <Eyebrow center>Planes</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            Elegí cómo querés crecer
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PACKS.map((pack, i) => {
            const Icon = pack.icon;
            return (
              <Reveal key={pack.id} delay={d(i + 1)} className="h-full">
                <div
                  className={[
                    "relative flex h-full flex-col rounded-[var(--radius-lg)] border bg-white p-7 [box-shadow:var(--shadow-md)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:[box-shadow:var(--shadow-lg)]",
                    pack.featured
                      ? "ring-2 ring-[color:var(--secondary)] border-transparent"
                      : "border-[color:var(--border-subtle)]",
                  ].join(" ")}
                >
                  {/* "Más elegido" badge — only on the featured card */}
                  {pack.featured && (
                    <span
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-[var(--radius-pill)] bg-[color:var(--secondary)] px-3.5 py-1 text-xs font-semibold text-white [box-shadow:var(--shadow-sm)]"
                      aria-label="Plan más elegido"
                    >
                      Más elegido
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${pack.accent} 12%, transparent)`,
                      color: pack.accent,
                    }}
                  >
                    <Icon size={24} strokeWidth={1.8} aria-hidden />
                  </div>

                  {/* Pack name + subtitle */}
                  <p
                    className="mb-1 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: pack.accent }}
                  >
                    {pack.name}
                  </p>
                  <p className="mb-3 text-sm text-[color:var(--text-muted)]">{pack.para}</p>

                  {/* Titular */}
                  <h3 className="mb-5 text-xl font-bold leading-snug text-[color:var(--text-strong)]">
                    {pack.titular}
                  </h3>

                  {/* Benefit bullets */}
                  <ul className="mb-7 flex flex-col gap-2.5" role="list">
                    {pack.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0"
                          style={{ color: pack.accent }}
                          aria-hidden
                        />
                        <span className="text-sm leading-snug text-[color:var(--text-body)]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Spacer to push price + CTA to the bottom */}
                  <div className="mt-auto">
                    {/* Price */}
                    <p className="mb-5 text-2xl font-bold text-[color:var(--text-strong)]">
                      {pack.precio}
                    </p>

                    {/* CTA */}
                    <CtaButton
                      size="md"
                      className="w-full justify-center"
                      onClick={() => scrollTo("contacto")}
                    >
                      Quiero este
                    </CtaButton>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Footnote */}
        <Reveal delay={d(4)}>
          <p className="mt-8 text-center text-sm text-[color:var(--text-muted)]">
            Primeros clientes: 30% de descuento.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
