"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { useContactDrawer } from "@/components/ui/contact-drawer";

/* ============================================================
   Barra de anuncio descartable (sticky bottom).
   Reutilizable para ofertas O novedades: cambiá MESSAGE / CTA y
   subí VERSION para que reaparezca a quien ya la había cerrado.
   ============================================================ */
const VERSION = "primeros-30off-2026-06"; // bump → se reanuncia
const STORAGE_KEY = "ns_promo_dismissed";
const MESSAGE = "Primeros clientes: 30% OFF en tu primer proyecto.";
const CTA_LABEL = "Aprovechar";

function alreadyDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === VERSION;
  } catch {
    return false;
  }
}

export function PromoBanner() {
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

  const onCta = () => {
    open();
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
          aria-label="Anuncio"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[color:var(--navy)] [box-shadow:0_-12px_40px_-18px_rgba(0,0,0,0.55)]"
        >
          <div className="mx-auto flex max-w-[var(--container-lg)] items-center gap-3 px-[var(--gutter)] py-3 sm:gap-4">
            <Sparkles
              size={18}
              strokeWidth={1.9}
              className="hidden flex-none text-[color:var(--secondary)] sm:block"
              aria-hidden
            />
            <p className="min-w-0 flex-1 text-sm leading-snug text-white/90">
              <span className="font-semibold text-white">{MESSAGE}</span>
            </p>

            <button
              onClick={onCta}
              className="group inline-flex flex-none cursor-pointer items-center gap-1.5 rounded-[var(--radius-pill)] bg-[color:var(--accent-cta)] px-4 py-2 text-sm font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[color:var(--accent-cta-hover)] active:translate-y-px"
            >
              {CTA_LABEL}
              <ArrowRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            <button
              onClick={dismiss}
              aria-label="Cerrar anuncio"
              className="inline-flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-[var(--radius-pill)] text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={16} strokeWidth={1.8} />
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
