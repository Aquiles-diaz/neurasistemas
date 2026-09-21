"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import {
  ArrowRight,
  Building2,
  Clock,
  Handshake,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";
import { SentModal } from "@/components/ui/sent-modal";
import { Reveal, d } from "@/components/ui/reveal";
import { RollingText } from "@/components/ui/rolling-text";
import { Container } from "@/components/sections/primitives";
import { sendEmail, emailConfigured } from "@/lib/email";
import { EMAIL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/* Icons follow the order of `contact.trust` in the dictionaries. */
const TRUST_ICONS: LucideIcon[] = [Clock, Lock, ShieldCheck, Handshake];

// text-base (16px) evita el zoom automático de iOS al enfocar un input en mobile.
const inputBase =
  "w-full rounded-[var(--radius-md)] border border-[color:var(--hairline)] bg-[color:var(--bg-base)] px-3.5 py-3.5 text-base text-[color:var(--text-strong)] placeholder:text-[color:var(--text-subtle)] transition-[border-color,box-shadow] duration-200 outline-none focus:border-[color:var(--text-strong)] focus:[box-shadow:0_0_0_3px_var(--accent-glow)]";

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
      <span className="field-label text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--text-muted)] transition-colors duration-200">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Contact() {
  const t = useT();
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

  const CONTACTS: { Icon: LucideIcon; text: string; href?: string }[] = [
    { Icon: Mail, text: EMAIL, href: `mailto:${EMAIL}` },
    { Icon: Phone, text: PHONE_DISPLAY, href: WHATSAPP },
    { Icon: MapPin, text: t.contact.location },
  ];

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
    const timer = setTimeout(() => setInView(true), 1200);
    return () => {
      io.disconnect();
      clearTimeout(timer);
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
    const L = t.contact.labels;
    const subject = `${t.contact.subjectPrefix}: ${form.nombre || "Web"}`;
    const message = [
      `${L.name}: ${form.nombre}`,
      `${L.email}: ${form.correo}`,
      `${L.phone}: ${form.telefono || "-"}`,
      `${L.company}: ${form.empresa || "-"}`,
      `${L.message}: ${form.mensaje || "-"}`,
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
      className="bg-[color:var(--surface-1)] py-[var(--section-y)]"
    >
      <Container>
        <div className="mb-12 text-center">
          <Reveal delay={d(1)}>
            <h2 className="mt-4 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)]">
              {t.contact.title}
            </h2>
          </Reveal>
          <Reveal delay={d(2)}>
            <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-[1.6] text-[color:var(--text-muted)]">
              {t.contact.subtitle}
            </p>
          </Reveal>
          <Reveal delay={d(3)}>
            <div className="mt-7 flex justify-center">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="roll-trigger group inline-flex h-[52px] cursor-pointer items-center justify-center gap-3 rounded-[var(--radius-pill)] bg-[color:var(--accent)] px-7 text-base font-semibold text-[color:var(--text-onaccent)] shadow-[var(--shadow-md)] transition-[transform,background-color,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:bg-[color:var(--accent-hover)] active:translate-y-px"
              >
                <RollingText text={t.contact.cta} />
                <ArrowRight size={18} strokeWidth={2} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Datos directos + señales de confianza */}
          <Reveal delay={d(3)} className="h-full">
            <div className="flex h-full flex-col justify-center gap-7 rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] p-6 sm:p-8">
              <ul className="flex flex-col gap-4">
                {CONTACTS.map(({ Icon, text, href }, i) => {
                  const inner = (
                    <>
                      <span className="flex h-[44px] w-[44px] flex-none items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border-subtle)] bg-[color:var(--bg-base)] text-[color:var(--text-body)] transition-colors group-hover:border-[color:var(--border-strong)] group-hover:text-[color:var(--text-strong)]">
                        <Icon size={18} strokeWidth={1.6} />
                      </span>
                      <span className="text-[color:var(--text-body)] transition-colors group-hover:text-[color:var(--text-strong)]">
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
                        <div className="group flex items-center gap-3.5 text-base">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="h-px w-full bg-[color:var(--hairline)]" />

              <ul className="flex flex-col gap-3.5">
                {t.contact.trust.map((text, i) => {
                  const Icon = TRUST_ICONS[i] ?? ShieldCheck;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <Icon
                        size={17}
                        strokeWidth={1.7}
                        className="mt-0.5 flex-none text-[color:var(--text-strong)]"
                      />
                      <span className="text-sm leading-[1.55] text-[color:var(--text-muted)]">
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={d(2)} className="h-full w-full">
            <div className="contact-card relative flex h-full flex-col rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] p-6 sm:p-8">
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
                  <Field label={t.contact.fields.name} className="anim-item" style={ai(0)}>
                    <div className="relative">
                      <User
                        size={18}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--text-subtle)]"
                      />
                      <input
                        className={cn(inputBase, "pl-11")}
                        placeholder={t.contact.fields.namePh}
                        value={form.nombre}
                        onChange={set("nombre")}
                        required
                      />
                    </div>
                  </Field>
                  <Field label={t.contact.fields.email} className="anim-item" style={ai(1)}>
                    <div className="relative">
                      <Mail
                        size={18}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--text-subtle)]"
                      />
                      <input
                        type="email"
                        className={cn(inputBase, "pl-11")}
                        placeholder={t.contact.fields.emailPh}
                        value={form.correo}
                        onChange={set("correo")}
                        required
                      />
                    </div>
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label={t.contact.fields.phone} className="anim-item" style={ai(2)}>
                    <div className="relative">
                      <Phone
                        size={18}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--text-subtle)]"
                      />
                      <input
                        type="tel"
                        className={cn(inputBase, "pl-11")}
                        placeholder={t.contact.fields.phonePh}
                        value={form.telefono}
                        onChange={set("telefono")}
                      />
                    </div>
                  </Field>
                  <Field label={t.contact.fields.company} className="anim-item" style={ai(3)}>
                    <div className="relative">
                      <Building2
                        size={18}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--text-subtle)]"
                      />
                      <input
                        className={cn(inputBase, "pl-11")}
                        placeholder={t.contact.fields.companyPh}
                        value={form.empresa}
                        onChange={set("empresa")}
                      />
                    </div>
                  </Field>
                </div>

                <Field label={t.contact.fields.message} className="anim-item" style={ai(4)}>
                  <textarea
                    className={cn(inputBase, "min-h-[104px] resize-y")}
                    placeholder={t.contact.fields.messagePh}
                    value={form.mensaje}
                    onChange={set("mensaje")}
                    rows={3}
                  />
                </Field>

                <div className="anim-item mt-auto" style={ai(5)}>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[color:var(--accent)] px-5 py-3.5 text-base font-semibold text-[color:var(--text-onaccent)] shadow-[var(--shadow-md)] transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-[color:var(--accent-hover)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? t.contact.sending : t.contact.submit}
                    {status !== "sending" && <ArrowRight size={18} strokeWidth={1.8} />}
                  </button>
                  {status === "error" && (
                    <p className="mt-3 text-sm leading-[1.5] text-[color:var(--text-body)]">
                      {t.contact.errorPre}
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline underline-offset-2 hover:text-[color:var(--text-strong)]"
                      >
                        WhatsApp
                      </a>
                      {t.contact.errorMid}
                      <a
                        href={`mailto:${EMAIL}`}
                        className="font-semibold underline underline-offset-2 hover:text-[color:var(--text-strong)]"
                      >
                        {EMAIL}
                      </a>
                      {t.contact.errorPost}
                    </p>
                  )}
                </div>

                <p
                  className="anim-item flex items-center justify-center gap-1.5 text-center text-xs text-[color:var(--text-subtle)]"
                  style={ai(6)}
                >
                  <Lock size={12} strokeWidth={1.8} className="flex-none" />
                  {t.contact.privacy}
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
        message={t.contact.sentMessage}
      />

      {/* Animaciones de entrada y focus. prefers-reduced-motion seguro. */}
      <style jsx>{`
        /* hairline de acento que se dibuja al activar un campo */
        .contact-card::before {
          content: "";
          position: absolute;
          left: 24px;
          right: 24px;
          top: 0;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0;
          transform: scaleX(0.4);
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .contact-card {
          transition: border-color 0.4s ease;
        }
        .contact-card:focus-within {
          border-color: var(--border-strong);
        }
        .contact-card:focus-within::before {
          opacity: 0.85;
          transform: scaleX(1);
        }
        .contact-form :global(label:focus-within) .field-label {
          color: var(--text-strong);
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
