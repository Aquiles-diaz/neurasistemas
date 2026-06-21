"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import {
  ArrowRight,
  Handshake,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { SentModal } from "@/components/ui/sent-modal";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow, CtaButton } from "@/components/sections/primitives";
import { cn } from "@/lib/utils";

// Datos de contacto hardcodeados correctos (spec §5.9 / Global Constraints)
const EMAIL = "aquilesdiaz335@gmail.com";
const PHONE_DISPLAY = "+54 9 3402 507879";
const WHATSAPP = "https://wa.me/5493402507879";

const CONTACTS: { Icon: typeof Mail; text: string; href?: string }[] = [
  { Icon: Mail, text: EMAIL, href: `mailto:${EMAIL}` },
  { Icon: Phone, text: PHONE_DISPLAY, href: WHATSAPP },
  { Icon: MapPin, text: "Rosario, Santa Fe" },
];

// Señales de confianza — el formulario no tiene backend, abre el cliente de correo del visitante.
const TRUST: { Icon: typeof Lock; text: string }[] = [
  {
    Icon: Lock,
    text: "No guardamos tus datos en ningún servidor — el formulario abre tu correo y los enviás vos.",
  },
  {
    Icon: ShieldCheck,
    text: "Tu información es privada: nunca la compartimos con terceros ni te mandamos spam.",
  },
  {
    Icon: Handshake,
    text: "Sin compromiso ni costos ocultos. Hablás directo con quien construye tu proyecto.",
  },
];

// text-base (16px) evita el zoom automático de iOS al enfocar un input en mobile.
// Inputs claros sobre el fondo navy para mantener contraste AA.
const inputBase =
  "w-full rounded-[var(--radius-md)] border border-white/20 bg-white/10 px-3.5 py-3.5 text-base text-white placeholder:text-white/50 transition-[border-color,box-shadow] duration-200 outline-none focus:border-[color:var(--accent-cta)] focus:[box-shadow:0_0_0_3px_rgba(249,115,22,0.35)]";

// helper para el delay escalonado de la animación de entrada
const ai = (i: number) => ({ ["--i" as string]: i } as CSSProperties);

function Field({
  label,
  children,
  className,
  style,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <label style={style} className={cn("flex flex-col gap-2", className)}>
      <span className="field-label text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors duration-200">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [inView, setInView] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
  });

  // Dispara la animación de entrada cuando el formulario entra en pantalla.
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    // Fallback: si el observer no dispara, mostramos igual.
    const t = setTimeout(() => setInView(true), 1200);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Contacto — ${form.nombre || "Web"}`;
    const body = [
      `Nombre: ${form.nombre}`,
      `Empresa: ${form.empresa || "—"}`,
      `Correo: ${form.correo}`,
      `Teléfono: ${form.telefono || "—"}`,
    ].join("\n");
    // Abre el cliente de correo del visitante con todo prellenado (sin backend).
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section
      id="contacto"
      className="bg-[color:var(--navy)] py-[var(--section-y)] text-white"
    >
      <Container>
        {/* Encabezado centrado */}
        <div className="mb-12 text-center">
          <Reveal>
            <Eyebrow className="text-white/60">&nbsp;Contacto&nbsp;</Eyebrow>
          </Reveal>
          <Reveal delay={d(1)}>
            <h2 className="mt-4 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-white">
              ¿Listo para que tu negocio crezca?
            </h2>
          </Reveal>
          <Reveal delay={d(2)}>
            <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-[1.6] text-white/70">
              Agendá una llamada sin compromiso y contanos en qué podemos
              ayudarte. En 20 minutos sabemos si podemos hacer algo juntos.
            </p>
          </Reveal>
          <Reveal delay={d(3)}>
            <div className="mt-7 flex justify-center">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
              >
                <CtaButton size="lg" className="gap-3">
                  Agendá una llamada sin compromiso
                  <ArrowRight size={18} strokeWidth={2} />
                </CtaButton>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Grid: info de contacto + formulario */}
        <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Columna izquierda: datos directos + trust */}
          <div>
            <Reveal delay={d(3)}>
              <ul className="flex flex-col gap-4">
                {CONTACTS.map(({ Icon, text, href }, i) => {
                  const inner = (
                    <>
                      <span className="flex h-[44px] w-[44px] flex-none items-center justify-center rounded-[var(--radius-md)] border border-white/20 bg-white/10 text-white/80 transition-colors group-hover:border-white/40 group-hover:text-white">
                        <Icon size={18} strokeWidth={1.6} />
                      </span>
                      <span className="text-white/80 transition-colors group-hover:text-white">
                        {text}
                      </span>
                    </>
                  );
                  return (
                    <li key={i}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group flex items-center gap-3.5 text-base"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="group flex items-center gap-3.5 text-base">
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* Panel de confianza */}
            <Reveal delay={d(4)}>
              <div className="mt-8 rounded-[var(--radius-lg)] border border-white/15 bg-white/8 p-5">
                <ul className="flex flex-col gap-3.5">
                  {TRUST.map(({ Icon, text }, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Icon
                        size={17}
                        strokeWidth={1.7}
                        className="mt-0.5 flex-none text-[color:var(--secondary)]"
                      />
                      <span className="text-sm leading-[1.55] text-white/65">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Columna derecha: formulario mailto */}
          <Reveal delay={d(2)} className="w-full">
            <div className="contact-card relative rounded-[var(--radius-lg)] border border-white/15 bg-white/8 p-6 sm:p-8">
              <form
                ref={formRef}
                className={cn("contact-form flex flex-col gap-5", inView && "in-view")}
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Nombre" className="anim-item" style={ai(0)}>
                    <input
                      className={inputBase}
                      placeholder="Tu nombre"
                      value={form.nombre}
                      onChange={set("nombre")}
                      required
                    />
                  </Field>
                  <Field label="Empresa (opcional)" className="anim-item" style={ai(1)}>
                    <input
                      className={inputBase}
                      placeholder="Tu empresa"
                      value={form.empresa}
                      onChange={set("empresa")}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Correo" className="anim-item" style={ai(2)}>
                    <div className="relative">
                      <Mail
                        size={18}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
                      />
                      <input
                        type="email"
                        className={cn(inputBase, "pl-11")}
                        placeholder="tu@empresa.com"
                        value={form.correo}
                        onChange={set("correo")}
                        required
                      />
                    </div>
                  </Field>
                  <Field label="Teléfono (opcional)" className="anim-item" style={ai(3)}>
                    <div className="relative">
                      <Phone
                        size={18}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
                      />
                      <input
                        type="tel"
                        className={cn(inputBase, "pl-11")}
                        placeholder="WhatsApp o teléfono"
                        value={form.telefono}
                        onChange={set("telefono")}
                      />
                    </div>
                  </Field>
                </div>

                <div className="anim-item" style={ai(4)}>
                  <button
                    type="submit"
                    className="mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-white/30 bg-white/15 px-5 py-3 text-base font-semibold text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-px hover:border-white/50 hover:bg-white/25 active:translate-y-px sm:w-auto"
                  >
                    Enviar mensaje
                    <ArrowRight size={18} strokeWidth={1.8} />
                  </button>
                </div>

                <p
                  className="anim-item flex items-center justify-center gap-1.5 text-center text-xs text-white/40"
                  style={ai(5)}
                >
                  <Lock size={12} strokeWidth={1.8} className="flex-none" />
                  Tus datos están seguros — solo los usamos para responderte.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </Container>

      <SentModal
        open={sent}
        onClose={() => {
          setForm({ nombre: "", empresa: "", correo: "", telefono: "" });
          setSent(false);
        }}
        message="Abrimos tu correo con todo prellenado — solo tenés que darle Enviar. Te respondemos en menos de 24 h."
      />

      {/* Animaciones de entrada y focus. prefers-reduced-motion seguro. */}
      <style jsx>{`
        /* línea de acento naranja al activar un campo */
        .contact-card::before {
          content: "";
          position: absolute;
          left: 24px;
          right: 24px;
          top: 0;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent-cta),
            transparent
          );
          opacity: 0;
          transform: scaleX(0.4);
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .contact-card {
          transition: border-color 0.4s ease;
        }
        .contact-card:focus-within {
          border-color: rgba(249, 115, 22, 0.4);
        }
        .contact-card:focus-within::before {
          opacity: 0.85;
          transform: scaleX(1);
        }
        /* etiqueta del campo enfocado se tiñe de naranja */
        .contact-form :global(label:focus-within) .field-label {
          color: var(--accent-cta);
        }

        /* entrada escalonada al entrar en viewport */
        .contact-form .anim-item {
          opacity: 0;
        }
        .contact-form.in-view .anim-item {
          animation: fieldUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: calc(var(--i, 0) * 70ms);
        }
        @keyframes fieldUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-form .anim-item,
          .contact-form.in-view .anim-item {
            opacity: 1;
            animation: none;
          }
          .contact-card::before {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
