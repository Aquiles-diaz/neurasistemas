"use client";

import { useEffect } from "react";
import { AnimatePresence, m } from "motion/react";
import { Check, X } from "lucide-react";
import { SecondaryButton } from "@/components/sections/primitives";

/**
 * Minimal confirmation modal shown after a form opens the visitor's mail
 * client. One glass card, centered, dismissable via backdrop, ✕ or Escape.
 */
export function SentModal({
  open,
  onClose,
  title = "¡Mensaje enviado!",
  message,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[80] grid place-items-center px-[var(--gutter)]"
        >
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[rgba(6,7,8,0.72)] [backdrop-filter:blur(12px)_saturate(140%)]"
          />
          <m.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] rounded-[var(--radius-xl)] border border-[color:var(--border-default)] bg-[color:var(--surface-1)] p-8 text-center [box-shadow:var(--shadow-lg),var(--edge-hi)]"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              autoFocus
              className="absolute right-3.5 top-3.5 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[var(--radius-pill)] border border-[color:var(--border-subtle)] text-[color:var(--text-muted)] transition-colors hover:border-[color:var(--border-default)] hover:text-[color:var(--text-strong)]"
            >
              <X size={16} strokeWidth={1.8} />
            </button>
            <div className="mx-auto mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[rgba(52,165,116,0.4)] bg-[rgba(52,165,116,0.14)] text-[color:var(--success-400)]">
              <Check size={26} strokeWidth={2} />
            </div>
            <h3 className="mb-2.5 font-[family-name:var(--font-display)] text-xl font-bold text-[color:var(--text-strong)]">
              {title}
            </h3>
            <p className="mx-auto max-w-[36ch] text-sm leading-[1.65] text-[color:var(--text-muted)]">
              {message}
            </p>
            <div className="mt-6">
              <SecondaryButton size="sm" onClick={onClose}>
                Entendido
              </SecondaryButton>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
