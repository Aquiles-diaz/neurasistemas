"use client";

import { Star } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";

/* Dorado de las estrellas */
const GOLD = "#fbbc04";

type Review = {
  quote: string;
  autor: string;
  negocio: string;
  zona: string;
  fecha: string;
  initial: string;
  avatar: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "Pensé que era imposible: un generador 3D donde el cliente arma su mueble, lo ve en realidad virtual y recibe la cotización en tiempo real. Le salvó la vida a la empresa.",
    autor: "Pablo B. Arcadigni",
    negocio: "Reno Amoblamientos",
    zona: "Piñero, Santa Fe",
    fecha: "hace 1 mes",
    initial: "P",
    avatar: "#7c3aed",
  },
  {
    quote:
      "Montamos un portal de empleo donde cada persona sube su CV y un video de un minuto presentándose. Revolucionó la búsqueda: hoy damos trabajo en toda la provincia de Santa Fe.",
    autor: "Sergio Ducca",
    negocio: "Human Power",
    zona: "Rosario, Santa Fe",
    fecha: "hace 2 meses",
    initial: "S",
    avatar: "#0ea5e9",
  },
];

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} style={{ fill: GOLD, color: GOLD }} aria-hidden />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="opiniones"
      className="relative py-[var(--section-y)] bg-[color:var(--surface-1)]"
    >
      <Container>
        {/* Encabezado */}
        <Reveal>
          <Eyebrow center>Opiniones</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4 text-center text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.015em] text-[color:var(--text-strong)] [font-family:var(--font-display)]">
            Lo que dicen nuestros clientes
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <div className="mt-5 flex justify-center">
            <Stars size={20} />
          </div>
        </Reveal>

        {/* Opiniones */}
        <div className="mx-auto mt-12 grid max-w-[920px] grid-cols-1 gap-6 md:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.autor} delay={d(i + 1)} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] p-6 [box-shadow:var(--shadow-md),var(--edge-hi)]">
                {/* Autor */}
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
                    style={{ backgroundColor: r.avatar }}
                    aria-hidden
                  >
                    {r.initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold leading-tight text-[color:var(--text-strong)]">
                      {r.autor}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[color:var(--text-subtle)]">
                      {r.negocio} &middot; {r.zona}
                    </p>
                  </div>
                </div>

                {/* Estrellas + fecha */}
                <div className="flex items-center gap-2">
                  <Stars />
                  <span className="text-xs text-[color:var(--text-subtle)]">
                    {r.fecha}
                  </span>
                </div>

                {/* Texto */}
                <blockquote className="text-[15px] leading-[1.7] text-[color:var(--text-body)]">
                  {r.quote}
                </blockquote>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
