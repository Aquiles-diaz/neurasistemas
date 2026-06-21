"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollTo } from "@/components/scroll/use-scroll-to";
import { useContactDrawer } from "@/components/ui/contact-drawer";
import { Container, SecondaryButton, CtaButton } from "@/components/sections/primitives";
import { HeroVideoBg } from "@/components/sections/hero-video";

const BENEFITS = [
  "Listo en 2-3 semanas",
  "Soporte local en Rosario",
  "Recuperás la inversión en 30 días",
] as const;

export function Hero() {
  const scrollTo = useScrollTo();
  const { open } = useContactDrawer();

  // Entrance animation lives in CSS (`[data-hero]` in globals.css) so it runs
  // on first paint with zero JS, and opts out under prefers-reduced-motion.
  return (
    <section
      id="top"
      className="relative flex min-h-[88dvh] items-center overflow-hidden pb-[var(--section-y)] pt-[clamp(104px,13vh,150px)]"
    >
      <HeroVideoBg />

      <Container className="relative z-[1]">
        <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <h1
            data-hero
            className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white [text-wrap:balance]"
          >
            Recuperá 8 horas por semana y hacé crecer tu negocio sin sumar empleados.
          </h1>

          <p
            data-hero
            className="mt-6 max-w-[50ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.65] text-slate-200"
          >
            Las reservas, los pedidos y la atención de tu comercio pasan a
            funcionar solos. Vos recuperás tus horas; del trabajo repetitivo nos
            encargamos nosotros.
          </p>

          <div data-hero className="mt-9 flex flex-wrap justify-center gap-3.5">
            <CtaButton
              size="lg"
              onClick={() => scrollTo("solucion")}
            >
              Ver cómo funciona
              <ArrowRight size={18} strokeWidth={1.8} />
            </CtaButton>

            <SecondaryButton
              size="lg"
              onClick={open}
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Agendá una llamada
            </SecondaryButton>
          </div>

          <ul
            data-hero
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3"
            aria-label="Beneficios principales"
          >
            {BENEFITS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-slate-100"
              >
                <CheckCircle2
                  size={17}
                  strokeWidth={2}
                  className="shrink-0 text-[color:var(--secondary)]"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
