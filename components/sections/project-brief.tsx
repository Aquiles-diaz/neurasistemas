"use client";

import {
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AnimatePresence, m } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Lock,
  Mail,
  Phone,
} from "lucide-react";
import { SentModal } from "@/components/ui/sent-modal";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, CtaButton } from "@/components/sections/primitives";
import { sendEmail, emailConfigured } from "@/lib/email";
import { EMAIL, WHATSAPP } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Projects take more than 10 days, so the first 10 days are never selectable. */
const LEAD_DAYS = 10;

const TIPOS = [
  "Sitio web",
  "Aplicación web",
  "E-commerce",
  "Rediseño",
  "Otro",
];
const PRESUPUESTOS = ["Aún no lo sé", "Hasta US$1.5k", "US$1.5k-4k", "US$4k+"];

const inputBase =
  "w-full rounded-[var(--radius-md)] border border-[color:var(--border-default)] bg-[color:var(--surface-2)] px-3.5 py-3 text-[color:var(--text-strong)] placeholder:text-[color:var(--text-subtle)] transition-[border-color,box-shadow] duration-200 outline-none focus:border-[color:var(--accent-500)] focus:[box-shadow:0_0_0_3px_var(--accent-glow)]";

// ── date helpers (day granularity, local time) ──────────────────────────────
const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
const monthKey = (d: Date) => d.getFullYear() * 12 + d.getMonth();

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DOW = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

// Stable no-op subscription: lets useSyncExternalStore act as a hydration-safe
// "is mounted" flag (false in the build-time HTML, true on the client).
const subscribeNoop = () => () => {};

const formatLong = (d: Date) =>
  new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);

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

/** Single-select pill group — click again to clear. */
function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-subtle)]">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              type="button"
              key={opt}
              aria-pressed={active}
              onClick={() => onChange(active ? "" : opt)}
              className={cn(
                "cursor-pointer rounded-[var(--radius-pill)] border px-3.5 py-1.5 text-sm transition-[border-color,background-color,color,box-shadow] duration-200 ease-[var(--ease-out-soft)]",
                active
                  ? "border-[color:var(--accent-500)] bg-[color:var(--accent-glow)] text-[color:var(--text-strong)] [box-shadow:var(--edge-hi)]"
                  : "border-[color:var(--border-default)] bg-[color:var(--surface-2)] text-[color:var(--text-muted)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--text-body)]"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Month calendar, Monday-first. Everything before `minDate` renders greyed and
 * unselectable — that's the first 10 days, since a project never ships sooner.
 */
function Calendar({
  value,
  onChange,
  minDate,
}: {
  value: Date | null;
  onChange: (d: Date) => void;
  minDate: Date;
}) {
  const [view, setView] = useState(() => startOfMonth(value ?? minDate));

  const minMonth = monthKey(minDate);
  const maxMonth = minMonth + 18; // ~18 months of runway is plenty to plan
  const canPrev = monthKey(view) > minMonth;
  const canNext = monthKey(view) < maxMonth;

  const cells = useMemo(() => {
    const first = startOfMonth(view);
    const offset = (first.getDay() + 6) % 7; // shift so Monday = 0
    const daysInMonth = new Date(
      view.getFullYear(),
      view.getMonth() + 1,
      0
    ).getDate();
    const out: (Date | null)[] = Array(offset).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
      out.push(new Date(view.getFullYear(), view.getMonth(), day));
    }
    return out;
  }, [view]);

  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--border-default)] bg-[color:var(--surface-2)] p-4 [box-shadow:var(--edge-hi)]">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Mes anterior"
          disabled={!canPrev}
          onClick={() => setView((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border-default)] text-[color:var(--text-muted)] transition-colors enabled:cursor-pointer enabled:hover:border-[color:var(--border-strong)] enabled:hover:text-[color:var(--text-strong)] disabled:opacity-30"
        >
          <ChevronLeft size={18} strokeWidth={1.8} />
        </button>
        <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-[color:var(--text-strong)]">
          {MESES[view.getMonth()]} {view.getFullYear()}
        </span>
        <button
          type="button"
          aria-label="Mes siguiente"
          disabled={!canNext}
          onClick={() => setView((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--border-default)] text-[color:var(--text-muted)] transition-colors enabled:cursor-pointer enabled:hover:border-[color:var(--border-strong)] enabled:hover:text-[color:var(--text-strong)] disabled:opacity-30"
        >
          <ChevronRight size={18} strokeWidth={1.8} />
        </button>
      </div>

      <div className="mb-1.5 grid grid-cols-7 gap-1">
        {DOW.map((dl) => (
          <span
            key={dl}
            className="py-1 text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.06em] text-[color:var(--text-subtle)]"
          >
            {dl}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <span key={`e${i}`} />;
          const disabled = day < minDate;
          const selected = value != null && sameDay(day, value);
          return (
            <button
              type="button"
              key={day.getTime()}
              disabled={disabled}
              aria-pressed={selected}
              onClick={() => onChange(day)}
              className={cn(
                "flex h-9 items-center justify-center rounded-[var(--radius-md)] text-sm transition-[background-color,color,border-color] duration-150",
                disabled &&
                  "cursor-not-allowed text-[color:var(--text-subtle)] opacity-35 line-through",
                !disabled &&
                  !selected &&
                  "cursor-pointer text-[color:var(--text-body)] hover:bg-[color:var(--surface-3)] hover:text-[color:var(--text-strong)]",
                selected &&
                  "cursor-pointer border border-[color:var(--accent-500)] bg-[color:var(--accent-glow)] font-semibold text-[color:var(--text-strong)] [box-shadow:var(--edge-hi)]"
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Fixed-height stand-in so the date computation can wait for the client. */
function CalendarSkeleton() {
  return (
    <div className="h-[332px] rounded-[var(--radius-lg)] border border-[color:var(--border-default)] bg-[color:var(--surface-2)] [box-shadow:var(--edge-hi)]" />
  );
}

const EMPTY = {
  tipo: "",
  tipoOtro: "",
  presupuesto: "",
  nombre: "",
  empresa: "",
  correo: "",
  telefono: "",
  mensaje: "",
};

export function ProjectBrief() {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [hp, setHp] = useState(""); // honeypot anti-bot
  const [form, setForm] = useState(EMPTY);
  const [fecha, setFecha] = useState<Date | null>(null);

  // Compute "today" on the client only: this is a static export, so the
  // server HTML is baked at build time and would otherwise disagree.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
  const minDate = useMemo(
    () => (mounted ? addDays(startOfDay(new Date()), LEAD_DAYS) : null),
    [mounted]
  );

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const setChip = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const tipoLabel =
    form.tipo === "Otro"
      ? form.tipoOtro.trim()
        ? `Otro: ${form.tipoOtro.trim()}`
        : "Otro"
      : form.tipo || "-";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) {
      // Honeypot lleno → bot. Fingimos éxito y no enviamos nada.
      setSent(true);
      return;
    }
    const subject = `Nuevo proyecto: ${form.nombre || "Brief web"}`;
    const message = [
      `Nombre: ${form.nombre}`,
      `Empresa: ${form.empresa || "-"}`,
      `Correo: ${form.correo}`,
      `Teléfono: ${form.telefono || "-"}`,
      "",
      `¿Qué necesita?: ${tipoLabel}`,
      `Presupuesto estimado: ${form.presupuesto || "-"}`,
      `Fecha deseada: ${fecha ? formatLong(fecha) : "-"}`,
      "",
      "Detalles:",
      form.mensaje || "-",
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
        fromName: form.nombre || "Brief web",
        replyTo: form.correo,
        message,
      });
      setStatus("idle");
      setSent(true);
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setFecha(null);
    setHp("");
    setStatus("idle");
    setSent(false);
  };

  return (
    <section className="pb-[var(--section-y)]">
      <Container>
        <Reveal delay={d(1)} className="mx-auto w-full max-w-[760px]">
          <div className="rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-6 [box-shadow:var(--shadow-md),var(--edge-hi)] sm:p-8">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
                  <div className="flex flex-col gap-3">
                    <ChipGroup
                      label="¿Qué necesitás?"
                      options={TIPOS}
                      value={form.tipo}
                      onChange={setChip("tipo")}
                    />
                    <AnimatePresence initial={false}>
                      {form.tipo === "Otro" && (
                        <m.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <input
                            className={cn(inputBase, "mt-1")}
                            placeholder="Contanos qué necesitás"
                            value={form.tipoOtro}
                            onChange={set("tipoOtro")}
                            required
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <ChipGroup
                    label="Presupuesto estimado"
                    options={PRESUPUESTOS}
                    value={form.presupuesto}
                    onChange={setChip("presupuesto")}
                  />

                  <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-subtle)]">
                      <CalendarDays size={13} strokeWidth={1.8} />
                      ¿Fecha Estimada?
                    </span>
                    {minDate ? (
                      <Calendar value={fecha} onChange={setFecha} minDate={minDate} />
                    ) : (
                      <CalendarSkeleton />
                    )}
                    <p className="text-xs leading-[1.55] text-[color:var(--text-subtle)]">
                      {fecha ? (
                        <span className="text-[color:var(--text-body)]">
                          Fecha elegida: {formatLong(fecha)}
                        </span>
                      ) : (
                        `Los primeros ${LEAD_DAYS} días aparecen en gris: ningún proyecto se entrega antes.`
                      )}
                    </p>
                  </div>

                  <div className="h-px bg-[color:var(--border-subtle)]" />

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

                  <Field label="Algo más que debamos saber (opcional)">
                    <textarea
                      rows={4}
                      className={cn(inputBase, "resize-y leading-[1.6]")}
                      placeholder="Objetivo, público, webs de referencia, funciones que no pueden faltar…"
                      value={form.mensaje}
                      onChange={set("mensaje")}
                    />
                  </Field>

                  <CtaButton
                    type="submit"
                    size="lg"
                    disabled={status === "sending"}
                    className="mt-1 font-[family-name:var(--font-body)] text-base font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? "Enviando…" : "Enviar brief"}
                    {status !== "sending" && (
                      <ArrowRight size={18} strokeWidth={1.8} />
                    )}
                  </CtaButton>

                  {status === "error" && (
                    <p className="text-sm leading-[1.5] text-[color:var(--text-muted)]">
                      No se pudo enviar. Escribinos por{" "}
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[color:var(--accent-cta)] underline underline-offset-2"
                      >
                        WhatsApp
                      </a>{" "}
                      o a{" "}
                      <a
                        href={`mailto:${EMAIL}`}
                        className="font-semibold text-[color:var(--accent-cta)] underline underline-offset-2"
                      >
                        {EMAIL}
                      </a>
                      .
                    </p>
                  )}

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[color:var(--text-subtle)]">
                <Lock size={12} strokeWidth={1.8} className="flex-none" />
                Tu brief nos llega directo. Te respondemos en menos de 12 h.
              </p>
            </form>
          </div>
        </Reveal>
      </Container>

      <SentModal
        open={sent}
        onClose={reset}
        title="¡Brief enviado!"
        message="Recibimos tu brief. Te respondemos en menos de 12 h."
      />
    </section>
  );
}
