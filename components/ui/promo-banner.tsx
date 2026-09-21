"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { useContactDrawer } from "@/components/ui/contact-drawer";
import { useT } from "@/lib/i18n";

/* ============================================================
   Barra de anuncio descartable (sticky bottom). El texto vive en
   lib/i18n (`promo`); subí VERSION para que reaparezca a quien ya
   la había cerrado.
   ============================================================ */
const VERSION = "primeros-30off-sistemas-2026-09"; // bump → se reanuncia
const STORAGE_KEY = "ns_promo_dismissed";

function alreadyDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === VERSION;
  } catch {
    return false;
  }
}

export function PromoBanner() {
  const t = useT();
  const [visible, setVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const reduce = useReducedMotion();
  const { open } = useContactDrawer();

  // Mostrar solo si no fue descartada en esta versión (lectura post-mount → sin
  // mismatch de hidratación en el export estático).
  useEffect(() => {
    if (!alreadyDismissed()) setVisible(true);
  }, []);

  // Ocultarla cuando la sección de contacto está en pantalla: no tapar la
  // conversión. Reaparece si el usuario sube de nuevo.
  useEffect(() => {
    const contact = document.getElementById("contacto");
    if (!contact) return;
    const io = new IntersectionObserver(
      ([e]) => setContactInView(e.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, VERSION);
    } catch {
      /* localStorage bloqueado — solo cerramos en runtime */
    }
    setVisible(false);
  };

  const show = visible && !contactInView;

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={reduce ? { opacity: 0 } : { y: "100%" }}
          animate={reduce ? { opacity: 1 } : { y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="region"
          aria-label={t.promo.region}
          className="band fixed inset-x-0 bottom-0 z-[60] border-t border-[color:var(--band-hairline)] [box-shadow:0_-12px_40px_-18px_rgba(0,0,0,0.45)]"
        >
          <div className="mx-auto flex max-w-[var(--container-lg)] items-center gap-3 px-[var(--gutter)] py-3 sm:gap-4">
            <Sparkles
              size={18}
              strokeWidth={1.9}
              className="hidden flex-none sm:block"
              aria-hidden
            />
            <p className="min-w-0 flex-1 text-sm font-semibold leading-snug">
              {t.promo.message}
            </p>

            <button
              onClick={open}
              className="group inline-flex flex-none cursor-pointer items-center gap-1.5 rounded-[var(--radius-pill)] bg-[color:var(--band-fg)] px-4 py-2 text-sm font-semibold text-[color:var(--band-bg)] transition-[transform,opacity] duration-200 hover:-translate-y-px hover:opacity-90 active:translate-y-px"
            >
              {t.promo.cta}
              <ArrowRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            <button
              onClick={dismiss}
              aria-label={t.promo.close}
              className="inline-flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-[var(--radius-pill)] text-[color:var(--band-muted)] transition-colors hover:bg-[color:var(--band-card)] hover:text-[color:var(--band-fg)]"
            >
              <X size={16} strokeWidth={1.8} />
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
