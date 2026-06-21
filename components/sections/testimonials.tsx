"use client";

import { Star } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Badge } from "@/components/sections/primitives";

const QUOTES = [
  {
    quote:
      "En 3 semanas teníamos web funcional. Ahora recibimos 5 pedidos online por día que antes no existían.",
    autor: "Paula García",
    negocio: 'Pastelería "Delicias"',
    zona: "Rosario",
  },
  {
    quote:
      "El chatbot atiende mis clientes 24/7 mientras yo duermo. Nunca había visto algo tan útil.",
    autor: "Martín López",
    negocio: 'Bar "La Esquina"',
    zona: "Rosario",
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className="fill-amber-400 text-amber-400"
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-[var(--section-y)] bg-[color:var(--surface-1)]">
      <Container>
        <Reveal delay={d(1)}>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.015em] text-[color:var(--text-strong)] [font-family:var(--font-display)]">
              Lo que dicen quienes ya automatizaron
            </h2>
            <Badge>Ejemplo ilustrativo</Badge>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {QUOTES.map(({ quote, autor, negocio, zona }, i) => (
            <Reveal key={autor} delay={d(i + 2)}>
              <article className="flex h-full flex-col gap-5 rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-white p-7 [box-shadow:var(--shadow-md),var(--edge-hi)]">
                <StarRating />

                <blockquote className="flex-1 text-base leading-[1.7] text-[color:var(--text-body)]">
                  <p>&ldquo;{quote}&rdquo;</p>
                </blockquote>

                <footer className="border-t border-[color:var(--border-subtle)] pt-4">
                  <p className="font-semibold text-[color:var(--text-strong)]">
                    {autor}
                  </p>
                  <p className="mt-0.5 text-sm text-[color:var(--text-muted)]">
                    {negocio} &middot; {zona}
                  </p>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
