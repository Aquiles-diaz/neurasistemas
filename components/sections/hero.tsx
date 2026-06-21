"use client";

import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useScrollTo } from "@/components/scroll/use-scroll-to";
import { Container, SecondaryButton, CtaButton } from "@/components/sections/primitives";
import { HeroVideoBg } from "@/components/sections/hero-video";

const BENEFITS = [
  "Implementación en 2-3 semanas",
  "Sin codificar",
  "Soporte local",
] as const;

export function Hero() {
  const scrollTo = useScrollTo();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Only animate when the visitor hasn't asked to reduce motion.
      // Outside this branch nothing is hidden, so content is always readable.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero]", {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: EASE,
          stagger: 0.09,
          delay: 0.1,
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[88vh] items-center overflow-hidden pb-[var(--section-y)] pt-[clamp(104px,13vh,150px)]"
    >
      <HeroVideoBg />

      <Container className="relative z-[1]">
        <div className="flex max-w-[640px] flex-col">
          <h1
            data-hero
            className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white [text-wrap:balance]"
          >
            Automatizamos tu negocio. Trabajás menos, facturás más.
          </h1>

          <p
            data-hero
            className="mt-6 max-w-[50ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.65] text-slate-200"
          >
            Webs, CRM, chatbots y automatización para PyMEs y comercios que
            quieren crecer sin morir en el intento.
          </p>

          <div data-hero className="mt-9 flex flex-wrap gap-3.5">
            <CtaButton
              size="lg"
              onClick={() => scrollTo("solucion")}
            >
              Ver cómo funciona
              <ArrowRight size={18} strokeWidth={1.8} />
            </CtaButton>

            <SecondaryButton
              size="lg"
              onClick={() => scrollTo("contacto")}
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Agendá una llamada
            </SecondaryButton>
          </div>

          <ul
            data-hero
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
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
