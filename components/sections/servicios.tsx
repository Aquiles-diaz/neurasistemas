"use client";

import {
  Zap,
  Globe,
  CalendarCheck,
  MessageCircle,
  Users,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";

interface Servicio {
  Icon: LucideIcon;
  title: string;
  desc: string;
  /** El servicio ancla (recuperar horas) — se destaca en esmeralda. */
  featured?: boolean;
}

const SERVICIOS: Servicio[] = [
  {
    Icon: Zap,
    title: "Automatización de tareas",
    desc: "Lo que repetís cada día —cargar pedidos, pasar datos, mandar confirmaciones— pasa a hacerse solo. Recuperás las horas que hoy se van en lo manual.",
    featured: true,
  },
  {
    Icon: Globe,
    title: "Sitio web que vende",
    desc: "Una web rápida y clara que convierte visitas en mensajes. Horarios, ubicación y un formulario que te llega directo. Lista en 3 semanas.",
  },
  {
    Icon: CalendarCheck,
    title: "Reservas y pedidos online",
    desc: "Tus clientes reservan o piden solos, 24/7, sin que atiendas el teléfono. Menos llamadas, más ventas, cero turnos perdidos.",
  },
  {
    Icon: MessageCircle,
    title: "Atención automática",
    desc: "Un asistente responde precios, horarios y disponibilidad al instante, a cualquier hora. No perdés al cliente que escribe a las 11 de la noche.",
  },
  {
    Icon: Users,
    title: "CRM y seguimiento",
    desc: "Todos tus contactos y conversaciones en un lugar, con avisos automáticos para que ningún cliente se enfríe. Sabés a quién seguir y cuándo.",
  },
  {
    Icon: LayoutDashboard,
    title: "Dashboard y reportes",
    desc: "Ves cómo va tu negocio en una pantalla: ventas, reservas, lo que funciona y lo que no. Decidís con datos, no a ojo.",
  },
];

export function Servicios() {
  return (
    <section
      id="servicios"
      className="relative py-[var(--section-y)] bg-[color:var(--surface-1)]"
    >
      <Container>
        <Reveal>
          <Eyebrow>Servicios</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4.5 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
            Todo lo que hacemos por tu negocio
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mt-4 max-w-[56ch] text-lg leading-[1.6] text-[color:var(--text-muted)]">
            Automatizamos el trabajo repetitivo —de la web a la atención— para
            que recuperes horas sin sumar gente.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.map(({ Icon, title, desc, featured }, i) => (
            <Reveal key={title} delay={d((i % 3) + 1)} className="h-full">
              <article
                className={[
                  "group flex h-full flex-col rounded-[var(--radius-lg)] border p-6 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1",
                  featured
                    ? "border-[color:color-mix(in_srgb,var(--secondary)_32%,transparent)] bg-[color:color-mix(in_srgb,var(--secondary)_5%,white)] [box-shadow:var(--shadow-md)] hover:[box-shadow:var(--shadow-lg)]"
                    : "border-[color:var(--border-subtle)] bg-white [box-shadow:var(--shadow-sm)] hover:[box-shadow:var(--shadow-md)]",
                ].join(" ")}
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={
                    featured
                      ? {
                          backgroundColor:
                            "color-mix(in srgb, var(--secondary) 14%, transparent)",
                          color: "var(--secondary-ink)",
                        }
                      : {
                          backgroundColor:
                            "color-mix(in srgb, var(--primary) 10%, transparent)",
                          color: "var(--primary)",
                        }
                  }
                >
                  <Icon size={22} strokeWidth={1.7} aria-hidden />
                </div>
                <h3 className="mb-2 text-lg font-bold leading-snug text-[color:var(--text-strong)]">
                  {title}
                </h3>
                <p className="text-sm leading-[1.6] text-[color:var(--text-body)]">
                  {desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
