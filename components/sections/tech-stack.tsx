"use client";

import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";

/* Logos de integraciones y medios de pago (full-color, en /public/logos).
   `color` se usa solo para el glow de hover. Para sumar uno: dejá su .svg
   (transparente) en /public/logos y agregá { slug, name, color } acá. */
const INTEGRACIONES = [
  { slug: "odoo", name: "Odoo", color: "#714B67" },
  { slug: "stripe", name: "Stripe", color: "#635BFF" },
  { slug: "mercadopago", name: "Mercado Pago", color: "#009EE3" },
  { slug: "n8n", name: "n8n", color: "#EA4B71" },
  { slug: "whatsapp", name: "WhatsApp", color: "#25D366" },
  { slug: "make", name: "Make", color: "#6D00CC" },
  { slug: "paypal", name: "PayPal", color: "#0070BA" },
];

export function TechStack() {
  // Duplicamos la lista: la pista mide el doble y el marquee (-50%) loopea sin cortes.
  const loop = [...INTEGRACIONES, ...INTEGRACIONES];

  return (
    <section
      id="integraciones"
      className="relative overflow-hidden py-[var(--section-y)] bg-[color:var(--surface-1)]"
    >
      <Container>
        <Reveal>
          <Eyebrow center>Integraciones</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4 text-center text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            Conectamos tu negocio con lo que ya usás
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-4 max-w-[60ch] text-center text-[color:var(--text-muted)] leading-[1.6]">
            Cobrá con{" "}
            <strong className="font-semibold text-[color:var(--text-body)]">Stripe</strong>,{" "}
            <strong className="font-semibold text-[color:var(--text-body)]">Mercado Pago</strong> y
            los medios que tus clientes prefieren. Gestioná con{" "}
            <strong className="font-semibold text-[color:var(--text-body)]">Odoo</strong>, automatizá
            con <strong className="font-semibold text-[color:var(--text-body)]">n8n</strong> y{" "}
            <strong className="font-semibold text-[color:var(--text-body)]">Make</strong>, y atendé
            por{" "}
            <strong className="font-semibold text-[color:var(--text-body)]">WhatsApp</strong>. Tu
            software a medida, conectado a las plataformas que tu negocio necesita.
          </p>
        </Reveal>
      </Container>

      {/* Marquee full-bleed (rompe el Container a propósito) */}
      <div
        className="relative mt-12 [--fade:72px]"
        aria-label="Integraciones y medios de pago con los que trabajamos"
      >
        {/* Fades laterales para que el loop entre/salga suave */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[var(--fade)] bg-gradient-to-r from-[color:var(--surface-1)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[var(--fade)] bg-gradient-to-l from-[color:var(--surface-1)] to-transparent" />

        {/* Pausa al hover para poder apuntar un logo */}
        <div className="flex w-max items-center [animation:ns-marquee_36s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]">
          {loop.map((item, i) => {
            const dup = i >= INTEGRACIONES.length;
            return (
              <span
                key={i}
                className="group/logo relative mx-8 inline-flex shrink-0 items-center justify-center"
              >
                {/* Glow del color de marca que se enciende en hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover/logo:opacity-60"
                  style={{ backgroundColor: item.color }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logos/${item.slug}.svg`}
                  alt={dup ? "" : item.name}
                  aria-hidden={dup || undefined}
                  loading="lazy"
                  draggable={false}
                  className="relative h-9 w-auto max-w-[140px] object-contain opacity-80 transition duration-300 ease-[var(--ease-out-soft)] group-hover/logo:scale-110 group-hover/logo:opacity-100"
                />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
