"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Handshake,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { MetalButton } from "@/components/ui/metal-button";
import { Reveal, d } from "@/components/reveal";
import { Container, Eyebrow, SecondaryButton } from "@/components/sections/primitives";
import { cn } from "@/lib/utils";

const EMAIL = "aquilesdiaz335@gmail.com";
const PHONE_DISPLAY = "+54 9 3402 507879";
const WHATSAPP = "https://wa.me/5493402507879";

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

const inputBase =
  "w-full rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--surface-2)] px-3.5 py-3 text-[color:var(--text-strong)] placeholder:text-[color:var(--text-subtle)] transition-[border-color,box-shadow] duration-200 outline-none focus:border-[color:var(--accent-500)] focus:[box-shadow:0_0_0_3px_var(--accent-glow)]";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-subtle)]">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
  });

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
          <div className="rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-7 [box-shadow:var(--shadow-md),var(--edge-hi)]">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="py-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[rgba(52,165,116,0.4)] bg-[rgba(52,165,116,0.14)] text-[color:var(--success)]">
                    <Check size={26} strokeWidth={2} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[color:var(--text-strong)]">
                    ¡Casi listo!
                  </h3>
                  <p className="mx-auto max-w-[38ch] text-sm leading-[1.6] text-[color:var(--text-muted)]">
                    Abrimos tu correo con todo prellenado — solo tenés que darle{" "}
                    <span className="text-[color:var(--text-body)]">Enviar</span>.
                    Te respondemos en menos de 24 h.
                  </p>
                  <div className="mt-5.5">
                    <SecondaryButton
                      size="sm"
                      onClick={() => {
                        setForm({
                          nombre: "",
                          empresa: "",
                          correo: "",
                          telefono: "",
                        });
                        setSent(false);
                      }}
                    >
                      Enviar otro
                    </SecondaryButton>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4.5"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                    <Field label="Nombre">
                      <input
                        className={inputBase}
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={set("nombre")}
                        required
                      />
                    </Field>
                    <Field label="Empresa (opcional)">
                      <input
                        className={inputBase}
                        placeholder="Tu empresa"
                        value={form.empresa}
                        onChange={set("empresa")}
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                    <Field label="Correo">
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
                    <Field label="Teléfono (opcional)">
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

                  <MetalButton
                    type="submit"
                    size="lg"
                    className="mt-1 gap-2 font-[family-name:var(--font-body)] text-base font-semibold"
                  >
                    Enviar mensaje
                    <ArrowRight size={18} strokeWidth={1.8} />
                  </MetalButton>

                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[color:var(--text-subtle)]">
                    <Lock size={12} strokeWidth={1.8} className="flex-none" />
                    Tus datos están seguros — solo los usamos para responderte.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
