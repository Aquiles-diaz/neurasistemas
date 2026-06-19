"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Layers } from "lucide-react";
import { MetalButton } from "@/components/ui/metal-button";
import { useScrollTo } from "@/components/scroll/use-scroll-to";
import { Badge, Container, SecondaryButton } from "@/components/sections/primitives";
import { HeroFlow, HeroPhone } from "@/components/sections/device-mockup";
import { gsap, useGSAP, EASE } from "@/lib/gsap";

const STATS: [string, string][] = [
  ["+20", "Proyectos entregados"],
  ["98%", "Clientes que repiten"],
  ["4.9", "Valoración media"],
];

export function Hero() {
  const scrollTo = useScrollTo();
  const router = useRouter();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Only animate when the visitor hasn't asked to reduce motion. Outside
      // this branch nothing is hidden, so content is always readable.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Cinematic staggered entrance for the copy column.
        gsap.from("[data-hero]", {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: EASE,
          stagger: 0.09,
          delay: 0.1,
        });

        // Minimalist colour aura — two slow, overlapping drifts so the light
        // feels organic and never quite loops.
        gsap.to("[data-hero-aura]", {
          xPercent: 6,
          yPercent: 8,
          scale: 1.12,
          duration: 22,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.to("[data-hero-aura]", {
          rotate: 8,
          duration: 30,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // The flow + phone showpiece drifts in a touch later than the copy.
        gsap.from("[data-hero-media]", {
          y: 28,
          autoAlpha: 0,
          duration: 1.1,
          ease: EASE,
          delay: 0.35,
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
      {/* Minimalist black ground with a slow colour aura that echoes the flow's
          palette. Biased to the right so the copy on the left stays clean. The
          n8n flow itself lives behind this whole region (see page wrapper). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          data-hero-aura
          className="absolute inset-[-25%] will-change-transform"
          style={{
            background:
              "radial-gradient(36% 40% at 78% 28%, rgba(91,140,255,0.16), transparent 64%)," +
              "radial-gradient(34% 36% at 90% 60%, rgba(176,124,255,0.14), transparent 64%)," +
              "radial-gradient(30% 34% at 66% 82%, rgba(21,200,160,0.11), transparent 66%)," +
              "radial-gradient(26% 30% at 94% 12%, rgba(242,201,76,0.10), transparent 62%)",
          }}
        />
      </div>

      <Container className="relative z-[1]">
        {/* Desktop: three zones — flow (left) · copy (center) · phone (right),
            so the eye rests on a balanced, symmetric scene. Stacks to copy +
            phone on mobile/tablet, where the flow is hidden. */}
        <div className="grid items-center gap-x-8 gap-y-14 lg:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-x-12">
          {/* flow — left column on desktop */}
          <HeroFlow />

          {/* copy — centered between the two visuals on desktop */}
          <div className="flex max-w-[640px] flex-col lg:mx-auto lg:items-center lg:text-center">
            <div data-hero>
              <Badge dot>Disponibles para nuevos proyectos</Badge>
            </div>

            <h1
              data-hero
              className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-[color:var(--text-strong)] [text-wrap:balance]"
            >
              Creamos Soluciones que{" "}
              <span className="metal-text">inspiran confianza</span>
            </h1>

            <p
              data-hero
              className="mt-6 max-w-[48ch] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.6] text-[color:var(--text-muted)]"
            >
              Estudio de Automatización IA y desarrollo web. Convertimos ideas en
              experiencias digitales rápidas, elegantes y hechas para crecer.
            </p>

            <div data-hero className="mt-9 flex flex-wrap gap-3.5">
              <MetalButton
                size="lg"
                className="gap-2 font-[family-name:var(--font-body)] text-base font-semibold"
                onClick={() => router.push("/iniciar-proyecto")}
              >
                Iniciar proyecto
                <ArrowRight size={18} strokeWidth={1.8} />
              </MetalButton>
              <SecondaryButton size="lg" onClick={() => scrollTo("portafolio")}>
                <Layers size={18} strokeWidth={1.6} />
                Ver portafolio
              </SecondaryButton>
            </div>

            <div data-hero className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
              {STATS.map(([big, small]) => (
                <div key={small}>
                  <b className="block font-[family-name:var(--font-display)] text-[2rem] font-bold tracking-[-0.02em] text-[color:var(--text-strong)]">
                    {big}
                  </b>
                  <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-subtle)]">
                    {small}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* phone — right column on desktop, centered below copy on mobile */}
          <HeroPhone />
        </div>
      </Container>
    </section>
  );
}
