"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Gift, X, MessageCircle, Mail } from "lucide-react";
import { CtaButton } from "@/components/sections/primitives";
import { EMAIL } from "@/lib/site";

/* Datos de contacto — el mail sale del único lugar central (lib/site.ts). */
const WHATSAPP_DIGITS = "5493402507879";
const WA_TEXT =
  "Hola Neura! Quiero el diagnóstico gratis de automatización para mi negocio.";
const MAIL_SUBJECT = "Quiero mi diagnóstico gratis";
const MAIL_BODY =
  "Hola Neura, me interesa el diagnóstico gratis de automatización.\n\nMi negocio es: \nLo que más tiempo me quita es: ";

const WA_HREF = `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(WA_TEXT)}`;
const MAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  MAIL_SUBJECT
)}&body=${encodeURIComponent(MAIL_BODY)}`;

/* Frecuencia: una vez por sesión; si lo cierran, no vuelve por COOLDOWN_DAYS;
   si convierten (clic en un CTA), no vuelve nunca ("done"). */
const STORAGE_KEY = "ns_exit_offer_v1";
const COOLDOWN_DAYS = 21;
const MOBILE_DELAY_MS = 55_000;
const SCROLL_TRIGGER = 0.55;

function recentlyHandled(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return true; // "done" → convirtió, no mostrar más
    return Date.now() - ts < COOLDOWN_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

function markHandled(converted: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, converted ? "done" : String(Date.now()));
  } catch {
    /* localStorage bloqueado (modo privado) — no rompemos nada */
  }
}

export function ExitOfferModal() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const shown = useRef(false); // máximo una vez por sesión

  const dismiss = useCallback(() => {
    markHandled(false);
    setOpen(false);
  }, []);

  // WhatsApp: abrimos nosotros (CtaButton es un <button>) y registramos conversión.
  const onWhatsApp = useCallback(() => {
    markHandled(true);
    window.open(WA_HREF, "_blank", "noopener,noreferrer");
    setOpen(false);
  }, []);

  // Mail: el <a href={MAIL_HREF}> navega solo; acá solo registramos y cerramos.
  const onMail = useCallback(() => {
    markHandled(true);
    setOpen(false);
  }, []);

  /* ── Disparadores ─────────────────────────────────────────────── */
  useEffect(() => {
    if (recentlyHandled()) return;

    // No interrumpir a quien ya está en la zona de conversión.
    const contact = document.getElementById("contacto");
    let contactInView = false;
    const io = contact
      ? new IntersectionObserver(
          ([e]) => {
            contactInView = e.isIntersecting;
          },
          { threshold: 0.2 }
        )
      : null;
    if (contact && io) io.observe(contact);

    const trigger = () => {
      if (shown.current || contactInView) return;
      shown.current = true;
      setOpen(true);
      cleanup();
    };

    // Desktop: exit-intent (el cursor sale por arriba del viewport).
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };
    // Mobile/touch: respaldo por scroll-depth (no hay exit-intent).
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_TRIGGER) trigger();
    };
    const timer = window.setTimeout(trigger, MOBILE_DELAY_MS);

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });

    function cleanup() {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      io?.disconnect();
    }
    return cleanup;
  }, []);

  /* ── Accesibilidad: focus-trap + Esc + lock de scroll ─────────── */
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const card = cardRef.current;
    const focusables = card
      ? Array.from(
          card.querySelectorAll<HTMLElement>(
            'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
          )
        )
      : [];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-offer-title"
          className="fixed inset-0 z-[90] grid place-items-center px-[var(--gutter)]"
        >
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={dismiss}
            className="absolute inset-0 bg-[rgba(6,7,8,0.72)] [backdrop-filter:blur(12px)_saturate(140%)]"
          />
          <m.div
            ref={cardRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[440px] overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--border-default)] bg-[color:var(--surface-1)] p-8 text-center ring-1 ring-[color:color-mix(in_srgb,var(--secondary)_30%,transparent)] [box-shadow:var(--shadow-lg),var(--edge-hi)]"
          >
            <button
              onClick={dismiss}
              aria-label="Cerrar"
              className="absolute right-3.5 top-3.5 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[var(--radius-pill)] border border-[color:var(--border-subtle)] text-[color:var(--text-muted)] transition-colors hover:border-[color:var(--border-default)] hover:text-[color:var(--text-strong)]"
            >
              <X size={16} strokeWidth={1.8} />
            </button>

            <div className="mx-auto mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--secondary)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--secondary)_14%,transparent)] text-[color:var(--secondary-ink)]">
              <Gift size={26} strokeWidth={1.9} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--secondary-ink)]">
              Diagnóstico gratis · sin compromiso
            </p>
            <h3
              id="exit-offer-title"
              className="mb-2.5 font-[family-name:var(--font-display)] text-2xl font-bold leading-[1.15] text-[color:var(--text-strong)]"
            >
              ¿Te vas con la duda?
            </h3>
            <p className="mx-auto max-w-[38ch] text-sm leading-[1.6] text-[color:var(--text-muted)]">
              Llevate un diagnóstico gratis: te decimos qué tareas de tu negocio
              podés automatizar y cuántas horas te ahorrarías. 20 minutos, sin
              compromiso.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <CtaButton
                size="lg"
                className="w-full justify-center"
                onClick={onWhatsApp}
              >
                <MessageCircle size={18} strokeWidth={2} />
                Quiero mi diagnóstico
              </CtaButton>
              <a
                href={MAIL_HREF}
                onClick={onMail}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[color:var(--text-muted)] underline-offset-4 transition-colors hover:text-[color:var(--text-strong)] hover:underline"
              >
                <Mail size={15} strokeWidth={1.8} />
                Prefiero por mail
              </a>
              <button
                onClick={dismiss}
                className="cursor-pointer text-xs text-[color:var(--text-subtle)] underline-offset-4 transition-colors hover:text-[color:var(--text-muted)] hover:underline"
              >
                Ahora no
              </button>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
