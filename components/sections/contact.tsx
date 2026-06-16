"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Handshake,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { MetalButton } from "@/components/ui/metal-button";
import { SentModal } from "@/components/ui/sent-modal";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { EMAIL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site";
import { cn } from "@/lib/utils";

const CONTACTS: { Icon: typeof Mail; text: string; href?: string }[] = [
  { Icon: Mail, text: EMAIL, href: `mailto:${EMAIL}` },
  { Icon: Phone, text: PHONE_DISPLAY, href: WHATSAPP },
  { Icon: Zap, text: "Respuesta en 24 h hábiles" },
];

// Honest trust signals — this is a static site with no backend, so the form
// opens the visitor's own mail client and stores nothing. That's worth saying.
const TRUST: { Icon: typeof Lock; text: string }[] = [
  { Icon: Lock, text: "No guardamos tus datos en ningún servidor — el formulario abre tu correo y los envías vos." },
  { Icon: ShieldCheck, text: "Tu información es privada: nunca la compartimos con terceros ni te mandamos spam." },
  { Icon: Handshake, text: "Sin compromiso ni costos ocultos. Hablás directo con quien construye tu proyecto." },
];

// text-base (16px) evita el zoom automático de iOS al enfocar un input en mobile.
const inputBase =
  "w-full rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--surface-2)] px-3.5 py-3.5 text-base text-[color:var(--text-strong)] placeholder:text-[color:var(--text-subtle)] transition-[border-color,box-shadow] duration-200 outline-none focus:border-[color:var(--accent-500)] focus:[box-shadow:0_0_0_3px_var(--accent-glow)]";

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
      <span className="field-label font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-subtle)] transition-colors duration-200">
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
    // Fallback: si por algún motivo el observer no dispara, mostramos igual.
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
    // Open the visitor's mail client with everything prefilled (no backend).
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contacto" className="py-[var(--section-y)]">
      <Container className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <Reveal>
            <Eyebrow>Hablemos</Eyebrow>
          </Reveal>
          <Reveal delay={d(1)}>
            <h2 className="mt-4.5 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
              ¿Listo para empezar tu proyecto?
            </h2>
          </Reveal>
          <Reveal delay={d(2)}>
            <p className="mt-4 max-w-[54ch] text-lg leading-[1.6] text-[color:var(--text-muted)]">
              Dejanos tus datos y te escribimos. Si ya tenés un proyecto en
              mente,{" "}
              <Link
                href="/iniciar-proyecto"
                className="text-[color:var(--accent-300)] underline-offset-4 transition-colors hover:text-[color:var(--accent-400)] hover:underline"
              >
                iniciá el brief completo
              </Link>{" "}
              y contanos qué necesitás, presupuesto y fecha.
            </p>
          </Reveal>
          <Reveal delay={d(3)}>
            <ul className="mt-7 flex flex-col gap-4.5">
              {CONTACTS.map(({ Icon, text, href }, i) => {
                const inner = (
                  <>
                    <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--surface-2)] text-[color:var(--silver-100)] transition-colors group-hover:border-[color:var(--border-strong)] group-hover:text-[color:var(--accent-300)]">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <span className="transition-colors group-hover:text-[color:var(--text-strong)]">
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
                        className="group flex items-center gap-3.5 text-base text-[color:var(--text-body)]"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-3.5 text-base text-[color:var(--text-body)]">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Trust panel — eases the natural hesitation before handing over data. */}
          <Reveal delay={d(4)}>
            <div className="mt-8 rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-5 [box-shadow:var(--edge-hi)]">
              <ul className="flex flex-col gap-3.5">
                {TRUST.map(({ Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                      className="mt-0.5 flex-none text-[color:var(--success)]"
                    />
                    <span className="text-sm leading-[1.55] text-[color:var(--text-muted)]">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={d(2)} className="w-full">
          <div className="contact-card relative rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-6 sm:p-8 [box-shadow:var(--shadow-md),var(--edge-hi)]">
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
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--text-subtle)]"
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
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--text-subtle)]"
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
                <MetalButton
                  type="submit"
                  size="lg"
                  className="mt-1 w-full justify-center gap-2 font-[family-name:var(--font-body)] text-base font-semibold sm:w-auto"
                >
                  Enviar mensaje
                  <ArrowRight size={18} strokeWidth={1.8} />
                </MetalButton>
              </div>

              <p
                className="anim-item flex items-center justify-center gap-1.5 text-center text-xs text-[color:var(--text-subtle)]"
                style={ai(5)}
              >
                <Lock size={12} strokeWidth={1.8} className="flex-none" />
                Tus datos están seguros — solo los usamos para responderte.
              </p>
            </form>
          </div>
        </Reveal>
      </Container>

      <SentModal
        open={sent}
        onClose={() => {
          setForm({ nombre: "", empresa: "", correo: "", telefono: "" });
          setSent(false);
        }}
        message="Abrimos tu correo con todo prellenado — solo tenés que darle Enviar. Te respondemos en menos de 24 h."
      />

      {/* Animaciones táctiles, mobile-first. Si preferís, movelas a globals.css. */}
      <style jsx>{`
        /* línea de acento que aparece cuando el form está activo */
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
            var(--accent-500),
            transparent
          );
          opacity: 0;
          transform: scaleX(0.4);
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .contact-card {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        /* glow suave de toda la card al tocar cualquier campo (sirve en touch) */
        .contact-card:focus-within {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-md), 0 0 0 1px var(--accent-glow),
            0 0 44px -10px var(--accent-glow);
        }
        .contact-card:focus-within::before {
          opacity: 0.85;
          transform: scaleX(1);
        }
        /* la etiqueta del campo enfocado se tiñe de acento */
        .contact-form :global(label:focus-within) .field-label {
          color: var(--accent-300);
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