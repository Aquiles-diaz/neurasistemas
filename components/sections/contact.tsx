"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import {
  ArrowRight,
  Building2,
  Handshake,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { SentModal } from "@/components/ui/sent-modal";
import { Reveal, d } from "@/components/ui/reveal";
import { Container } from "@/components/sections/primitives";
import { sendEmail, emailConfigured } from "@/lib/email";
import { EMAIL } from "@/lib/site";
import { cn } from "@/lib/utils";

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
    text: "Tu mensaje nos llega directo, sin que tengas que abrir tu correo.",
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
// Campos "hundidos" (fondo = base) dentro de la tarjeta, borde fino — sin gris/glass.
const inputBase =
  "w-full rounded-[var(--radius-md)] border border-[color:var(--hairline)] bg-[color:var(--ink)] px-3.5 py-3.5 text-base text-white placeholder:text-white/55 transition-[border-color,box-shadow] duration-200 outline-none focus:border-[color:var(--accent)] focus:[box-shadow:0_0_0_3px_rgba(182,255,0,0.3)]";

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
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [hp, setHp] = useState(""); // honeypot anti-bot
  const [inView, setInView] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
    mensaje: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) {
      // Honeypot lleno → bot. Fingimos éxito y no enviamos nada.
      setSent(true);
      return;
    }
    const subject = `Contacto: ${form.nombre || "Web"}`;
    const message = [
      `Nombre: ${form.nombre}`,
      `Correo: ${form.correo}`,
      `Teléfono: ${form.telefono || "-"}`,
      `Empresa: ${form.empresa || "-"}`,
      `Consulta: ${form.mensaje || "-"}`,
    ].join("\n");

    // Sin claves de EmailJS: fallback al cliente de correo del visitante.
    if (!emailConfigured) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(message)}`;
      setSent(true);
      return;
    }

    setStatus("sending");
    try {
      await sendEmail({
        subject,
        fromName: form.nombre || "Web",
        replyTo: form.correo,
        message,
      });
      setStatus("idle");
      setSent(true);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="bg-[color:var(--ink)] py-[var(--section-y)] text-white"
    >
      <Container>
        {/* Encabezado centrado */}
        <div className="mb-12 text-center">
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
                className="group inline-flex h-[52px] cursor-pointer items-center justify-center gap-3 rounded-[var(--radius-pill)] bg-[color:var(--accent)] px-7 text-base font-semibold text-[color:var(--ink)] shadow-[var(--shadow-md)] transition-[transform,background-color,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:bg-[color:var(--accent-hover)] active:translate-y-px"
              >
                Agendá una llamada sin compromiso
                <ArrowRight size={18} strokeWidth={2} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Grid: info de contacto + formulario — dos tarjetas simétricas */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Columna izquierda: marca + datos directos + trust, en una sola tarjeta */}
          <Reveal delay={d(3)} className="h-full">
            <div className="flex h-full flex-col justify-center gap-7 rounded-[var(--radius-lg)] bg-[color:var(--card)] p-6 sm:p-8">
              {/* Datos directos */}
              <ul className="flex flex-col gap-4">
                {CONTACTS.map(({ Icon, text, href }, i) => {
                  const inner = (
                    <>
                      <span className="flex h-[44px] w-[44px] flex-none items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--ink)] text-white/80 transition-colors group-hover:bg-[color:var(--card-hover)] group-hover:text-[color:var(--accent)]">
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

              {/* Separador */}
              <div className="h-px w-full bg-[color:var(--hairline)]" />

              {/* Señales de confianza */}
              <ul className="flex flex-col gap-3.5">
                {TRUST.map(({ Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                      className="mt-0.5 flex-none text-[color:var(--accent)]"
                    />
                    <span className="text-sm leading-[1.55] text-white/65">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Columna derecha: formulario mailto */}
          <Reveal delay={d(2)} className="h-full w-full">
            <div className="contact-card relative flex h-full flex-col rounded-[var(--radius-lg)] border border-transparent bg-[color:var(--card)] p-6 sm:p-8">
              <form
                ref={formRef}
                className={cn("contact-form flex flex-1 flex-col gap-5", inView && "in-view")}
                onSubmit={handleSubmit}
              >
                {/* Honeypot anti-bot: invisible para humanos, tentador para bots. */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Nombre" className="anim-item" style={ai(0)}>
                    <div className="relative">
                      <User
                        size={18}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60"
                      />
                      <input
                        className={cn(inputBase, "pl-11")}
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={set("nombre")}
                        required
                      />
                    </div>
                  </Field>
                  <Field label="Correo" className="anim-item" style={ai(1)}>
                    <div className="relative">
                      <Mail
                        size={18}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60"
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
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Teléfono (opcional)" className="anim-item" style={ai(2)}>
                    <div className="relative">
                      <Phone
                        size={18}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60"
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
                  <Field label="Empresa (opcional)" className="anim-item" style={ai(3)}>
                    <div className="relative">
                      <Building2
                        size={18}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60"
                      />
                      <input
                        className={cn(inputBase, "pl-11")}
                        placeholder="Tu empresa"
                        value={form.empresa}
                        onChange={set("empresa")}
                      />
                    </div>
                  </Field>
                </div>

                <Field
                  label="¿En qué te podemos ayudar?"
                  className="anim-item"
                  style={ai(4)}
                >
                  <textarea
                    className={cn(inputBase, "min-h-[104px] resize-y")}
                    placeholder="Contanos brevemente qué necesitás (web, automatización, chatbot…)"
                    value={form.mensaje}
                    onChange={set("mensaje")}
                    rows={3}
                  />
                </Field>

                <div className="anim-item mt-auto" style={ai(5)}>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[color:var(--accent)] px-5 py-3.5 text-base font-semibold text-[color:var(--ink)] shadow-[var(--shadow-md)] transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-[color:var(--accent-hover)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                    {status !== "sending" && (
                      <ArrowRight size={18} strokeWidth={1.8} />
                    )}
                  </button>
                  {status === "error" && (
                    <p className="mt-3 text-sm leading-[1.5] text-white/85">
                      No se pudo enviar. Escribinos por{" "}
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline underline-offset-2 hover:text-white"
                      >
                        WhatsApp
                      </a>{" "}
                      o a{" "}
                      <a
                        href={`mailto:${EMAIL}`}
                        className="font-semibold underline underline-offset-2 hover:text-white"
                      >
                        {EMAIL}
                      </a>
                      .
                    </p>
                  )}
                </div>

                <p
                  className="anim-item flex items-center justify-center gap-1.5 text-center text-xs text-white/60"
                  style={ai(6)}
                >
                  <Lock size={12} strokeWidth={1.8} className="flex-none" />
                  Tus datos están seguros. Solo los usamos para responderte.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </Container>

      <SentModal
        open={sent}
        onClose={() => {
          setForm({ nombre: "", empresa: "", correo: "", telefono: "", mensaje: "" });
          setHp("");
          setStatus("idle");
          setSent(false);
        }}
        message="Recibimos tu mensaje. Te respondemos en menos de 24 h."
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
            var(--accent),
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
          border-color: rgba(182, 255, 0, 0.45);
        }
        .contact-card:focus-within::before {
          opacity: 0.85;
          transform: scaleX(1);
        }
        /* etiqueta del campo enfocado se tiñe de naranja */
        .contact-form :global(label:focus-within) .field-label {
          color: var(--accent);
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
