"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Layers } from "lucide-react";
import { MetalButton } from "@/components/ui/metal-button";
import { useScrollTo } from "@/components/use-scroll-to";
import { Badge, Container, SecondaryButton } from "@/components/sections/primitives";
import { DeviceMockup } from "@/components/sections/device-mockup";
import { DitherBackground } from "@/components/dither-background";
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

        // Scroll parallax: watermark drifts down, the mockup floats up a touch.
        gsap.to("[data-parallax='watermark']", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
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
      {/* monochrome dithered backdrop (no WebGL) — the hero's signature texture */}
      <DitherBackground className="z-0" />
      {/* full-bleed n8n flow drifting behind everything */}
      <DeviceMockup />
      {/* radial glow: platinum / white metal — monochrome */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% -8%, rgba(238,241,246,.12), transparent 70%), radial-gradient(50% 40% at 80% 0%, rgba(220,224,231,.07), transparent 70%)",
        }}
      />
      {/* NS monogram watermark */}
      <Image
        aria-hidden
        data-parallax="watermark"
        src="/logo/neurasistemas-monogram.png"
        alt=""
        width={620}
        height={620}
        className="pointer-events-none absolute right-[-6%] top-[2%] z-0 hidden w-[40%] max-w-[560px] opacity-[0.04] grayscale lg:block"
      />

      <Container className="relative z-[1]">
        <div>
          {/* copy — the flow drifts full-bleed behind it */}
          <div className="max-w-[640px]">
            <div data-hero>
              <Badge dot>Disponibles para nuevos proyectos</Badge>
            </div>

            <h1
              data-hero
              className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-[color:var(--text-strong)] [text-wrap:balance]"
            >
              Creamos sitios web que{" "}
              <span className="metal-text">inspiran confianza</span>
            </h1>

            <p
              data-hero
              className="mt-6 max-w-[48ch] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.6] text-[color:var(--text-muted)]"
            >
              Estudio de diseño y desarrollo web. Convertimos ideas en
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
        </div>
      </Container>
    </section>
  );
}
