"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container } from "@/components/sections/primitives";

const FAQS = [
  {
    q: "¿Cuánto cuesta realmente?",
    a: "Depende del pack. Desde $450 USD. Sin sorpresas: presupuesto cerrado antes de empezar.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "Tu web, entre 2 y 4 semanas. Los sistemas más grandes (automatizaciones, CRM) los definimos juntos según el alcance.",
  },
  {
    q: "¿Y si después necesito cambios?",
    a: "Los hacemos. Si querés que nos encarguemos siempre, hay un Plan Cuidado opcional desde $29/mes, con el primer mes gratis. Lo tomás solo si lo necesitás.",
  },
  {
    q: "¿Es difícil de usar?",
    a: "No. Te enseñamos a usarlo. Cualquiera de tu equipo puede hacerlo.",
  },
  {
    q: "¿Cómo es el soporte?",
    a: "Respondemos rápido: dudas simples en menos de 1 h y temas a fondo en menos de 12 h, en horario laboral. Con Plan Cuidado monitoreamos tu sistema y tenés soporte prioritario por WhatsApp. Nada de “24/7” robótico ni tickets que nadie contesta: hablás con quien lo construyó.",
  },
  {
    q: "¿Tienen referencias?",
    a: "Sí. Escribinos y te mostramos casos y contactos.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-[var(--section-y)] bg-[color:var(--surface-1)]"
    >
      <Container>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-center text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.015em] text-[color:var(--text-strong)] [font-family:var(--font-display)]">
            Lo que probablemente te estés preguntando
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-[720px]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={d(i + 2)}>
                <div
                  className="border-b border-[color:var(--border-subtle)] last:border-b-0"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-[color:var(--text-strong)] transition-colors duration-150 hover:text-[color:var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--primary)]"
                  >
                    <span className="text-base font-semibold leading-snug sm:text-lg">
                      {item.q}
                    </span>
                    <ChevronDown
                      aria-hidden
                      size={20}
                      strokeWidth={2}
                      className={[
                        "shrink-0 text-[color:var(--text-muted)] transition-transform duration-300 motion-reduce:transition-none",
                        isOpen ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                    />
                  </button>

                  {/* CSS grid-rows trick for smooth height animation */}
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className={[
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-8 text-sm leading-[1.7] text-[color:var(--text-body)] sm:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
