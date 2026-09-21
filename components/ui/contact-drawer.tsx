"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Clock, Mail, MessageCircle, Phone, X, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { EMAIL, PHONE_TEL, WHATSAPP_DIGITS } from "@/lib/site";
import { useT } from "@/lib/i18n";

/* ── Contexto global ──────────────────────────────────────────── */
type Ctx = { isOpen: boolean; open: () => void; close: () => void };
const ContactDrawerContext = createContext<Ctx | null>(null);

export function useContactDrawer(): Ctx {
  const ctx = useContext(ContactDrawerContext);
  if (!ctx) {
    throw new Error("useContactDrawer debe usarse dentro de <ContactDrawerProvider>");
  }
  return ctx;
}

export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <ContactDrawerContext.Provider value={{ isOpen, open, close }}>
      {children}
      <ContactDrawer open={isOpen} onClose={close} />
    </ContactDrawerContext.Provider>
  );
}

/* ── El panel ─────────────────────────────────────────────────── */
function ContactDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const WA_HREF = `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(t.drawer.waText)}`;
  const MAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(t.drawer.mailSubject)}`;
  const TEL_HREF = `tel:${PHONE_TEL}`;

  const CHANNELS: {
    Icon: LucideIcon;
    label: string;
    href: string;
    external?: boolean;
    primary?: boolean;
  }[] = [
    { Icon: MessageCircle, label: t.drawer.channels.whatsapp, href: WA_HREF, external: true, primary: true },
    { Icon: Phone, label: t.drawer.channels.call, href: TEL_HREF },
    { Icon: Mail, label: t.drawer.channels.mail, href: MAIL_HREF },
  ];

  // Accesibilidad: focus-trap + Esc + lock de scroll + foco devuelto al cerrar.
  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
          )
        )
      : [];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
      prevFocus.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-drawer-title"
          className="fixed inset-0 z-[90]"
        >
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[color:var(--overlay)] [backdrop-filter:blur(12px)_saturate(140%)]"
          />
          {/* The panel is an inverse band: it always contrasts with the page. */}
          <m.aside
            ref={panelRef}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="band absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col overflow-y-auto [box-shadow:-24px_0_60px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between p-6 pb-0">
              <h2
                id="contact-drawer-title"
                className="font-[family-name:var(--font-display)] text-2xl font-bold"
              >
                {t.drawer.title}
              </h2>
              <button
                onClick={onClose}
                aria-label={t.drawer.close}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[var(--radius-pill)] border border-[color:var(--band-hairline)] text-[color:var(--band-muted)] transition-colors hover:text-[color:var(--band-fg)]"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex items-center gap-4 px-6 pt-7">
              <span className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-full bg-[color:var(--band-fg)]">
                <Logo on="band" alt="Neura Sistemas" className="h-auto w-[36px]" />
              </span>
              <p className="text-[15px] leading-snug text-[color:var(--band-muted)]">
                <span className="font-semibold text-[color:var(--band-fg)]">
                  {t.drawer.introStrong}
                </span>{" "}
                {t.drawer.intro}
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 px-6">
              {CHANNELS.map(({ Icon, label, href, external, primary }) => (
                <a
                  key={label}
                  href={href}
                  onClick={onClose}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={
                    primary
                      ? "inline-flex h-[52px] items-center justify-center gap-2.5 rounded-[var(--radius-pill)] bg-[color:var(--band-fg)] px-5 text-base font-semibold text-[color:var(--band-bg)] transition-[transform,opacity] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:opacity-90 active:translate-y-px"
                      : "inline-flex h-[52px] items-center justify-center gap-2.5 rounded-[var(--radius-pill)] border border-[color:var(--band-hairline)] px-5 text-base font-semibold transition-[transform,border-color,background-color] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:bg-[color:var(--band-card)] active:translate-y-px"
                  }
                >
                  <Icon size={18} strokeWidth={1.9} />
                  {label}
                </a>
              ))}
            </div>

            <div className="mt-auto px-6 pb-6 pt-8">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-[color:var(--band-muted)]">
                <Clock size={13} strokeWidth={1.8} className="mt-0.5 flex-none" />
                <span>{t.drawer.foot}</span>
              </p>
            </div>
          </m.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
