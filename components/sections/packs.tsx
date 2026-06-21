"use client";

import { Rocket, TrendingUp, Crown, Check, type LucideIcon } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow, CtaButton } from "@/components/sections/primitives";
import { useContactDrawer } from "@/components/ui/contact-drawer";

interface Pack {
  id: string;
  icon: LucideIcon;
  accent: string;
  /** AA-safe variant of `accent` for small text on white (the saturated
   *  `accent` is for decorative icons/rings only). */
  accentText: string;
  name: string;
  para: string;
  titular: string;
  bullets: string[];
  /** Monto sin decoración — "Desde" y "USD" se renderizan aparte. */
  precio: string;
  cta: string;
  featured: boolean;
}

const PACKS: Pack[] = [
  {
    id: "arrancar",
    icon: Rocket,
    accent: "var(--primary)",
    accentText: "var(--primary)",
    name: "Arrancar",
    para: "Para comercios que recién abren",
    titular: "Tu web lista en 3 semanas",
    bullets: [
      "Sitio profesional que vende",
      "Horarios, ubicación y contacto integrados",
      "Formulario para que te contacten directo",
    ],
    precio: "$450",
    cta: "Quiero arrancar",
    featured: false,
  },
  {
    id: "crecer",
    icon: TrendingUp,
    accent: "var(--secondary)",
    accentText: "var(--secondary-ink)",
    name: "Crecer",
    para: "Para negocios con procesos para optimizar",
    titular: "Automatizamos lo que te quita tiempo",
    bullets: [
      "Reservas/pedidos online automáticos",
      "Chatbot que atiende mientras dormís",
      "Dashboard para ver qué pasa en tu negocio",
    ],
    precio: "$900",
    cta: "Quiero crecer",
    featured: true,
  },
  {
    id: "dominar",
    icon: Crown,
    accent: "var(--accent-cta)",
    accentText: "var(--accent-cta)",
    name: "Dominar",
    para: "Para negocios estructurados",
    titular: "Sistema completo integrado",
    bullets: [
      "Web + CRM + Automatización",
      "Reportes y métricas automáticas",
      "Capacitación de tu equipo incluida",
    ],
    precio: "$1800",
    cta: "Lo quiero todo",
    featured: false,
  },
];

export function Packs() {
  const { open } = useContactDrawer();

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
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-4 max-w-[48ch] text-center text-[color:var(--text-muted)] leading-[1.6]">
            Precios cerrados, sin letra chica. Empezás por donde estás hoy y
            sumás funciones cuando las necesites.
          </p>
        </Reveal>

        {/* items-stretch keeps equal heights; the featured card lifts via a
            constant translate (lg+) so its hover only touches the shadow. */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {PACKS.map((pack, i) => {
            const Icon = pack.icon;
            const { featured } = pack;
            return (
              <Reveal key={pack.id} delay={d(i + 1)} className="h-full">
                <div
                  className={[
                    "group relative flex h-full flex-col rounded-[var(--radius-lg)] p-7 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)]",
                    featured
                      ? "bg-[color:var(--navy)] text-white ring-1 ring-white/12 [box-shadow:0_30px_70px_-24px_rgba(16,185,129,0.45)] hover:[box-shadow:0_40px_90px_-24px_rgba(16,185,129,0.62)] lg:-translate-y-4"
                      : "border border-[color:var(--border-subtle)] bg-white [box-shadow:var(--shadow-md)] hover:-translate-y-1.5 hover:[box-shadow:var(--shadow-lg)]",
                  ].join(" ")}
                >
                  {/* "Más elegido" badge — only on the featured card */}
                  {featured && (
                    <span
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-[var(--radius-pill)] bg-[color:var(--secondary)] px-3.5 py-1 text-xs font-semibold text-[color:var(--navy)] [box-shadow:var(--shadow-sm)]"
                      aria-label="Plan más elegido"
                    >
                      Más elegido
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]"
                    style={
                      featured
                        ? { backgroundColor: "var(--secondary)", color: "var(--navy)" }
                        : {
                            backgroundColor: `color-mix(in srgb, ${pack.accent} 12%, transparent)`,
                            color: pack.accent,
                          }
                    }
                  >
                    <Icon size={24} strokeWidth={1.8} aria-hidden />
                  </div>

                  {/* Pack name + subtitle */}
                  <p
                    className="mb-1 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: featured ? "var(--secondary)" : pack.accentText }}
                  >
                    {pack.name}
                  </p>
                  <p
                    className={
                      featured
                        ? "mb-3 text-sm text-white/70"
                        : "mb-3 text-sm text-[color:var(--text-muted)]"
                    }
                  >
                    {pack.para}
                  </p>

                  {/* Titular */}
                  <h3
                    className={[
                      "mb-5 text-xl font-bold leading-snug",
                      featured ? "text-white" : "text-[color:var(--text-strong)]",
                    ].join(" ")}
                  >
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
                          style={{ color: featured ? "var(--secondary)" : pack.accent }}
                          aria-hidden
                        />
                        <span
                          className={[
                            "text-sm leading-snug",
                            featured ? "text-white/85" : "text-[color:var(--text-body)]",
                          ].join(" ")}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Spacer to push price + CTA to the bottom */}
                  <div className="mt-auto">
                    {/* Price — "Desde" + monto grande + "USD" para dar jerarquía */}
                    <p className="mb-5 flex items-baseline gap-1.5">
                      <span
                        className={
                          featured ? "text-sm text-white/55" : "text-sm text-[color:var(--text-subtle)]"
                        }
                      >
                        Desde
                      </span>
                      <span
                        className={[
                          "font-[family-name:var(--font-display)] font-bold tracking-[-0.02em]",
                          featured ? "text-[2.6rem] leading-none text-white" : "text-[2.1rem] leading-none text-[color:var(--text-strong)]",
                        ].join(" ")}
                      >
                        {pack.precio}
                      </span>
                      <span
                        className={
                          featured
                            ? "text-sm font-medium text-white/55"
                            : "text-sm font-medium text-[color:var(--text-subtle)]"
                        }
                      >
                        USD
                      </span>
                    </p>

                    {/* CTA */}
                    <CtaButton
                      size="md"
                      className="w-full justify-center"
                      onClick={open}
                    >
                      {pack.cta}
                    </CtaButton>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Footnote */}
        <Reveal delay={d(4)}>
          <p className="mt-10 text-center text-sm text-[color:var(--text-muted)]">
            Primeros clientes: <strong className="font-semibold text-[color:var(--secondary-ink)]">30% de descuento</strong>.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
