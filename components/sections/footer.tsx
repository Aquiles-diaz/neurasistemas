"use client";

import { Mail, MessageCircle, MapPin, type LucideIcon } from "lucide-react";
import { Container } from "@/components/sections/primitives";
import { Logo } from "@/components/ui/logo";
import { RollingText } from "@/components/ui/rolling-text";
import { ThemeLangToggle } from "@/components/ui/theme-lang-toggle";
import { useContactDrawer } from "@/components/ui/contact-drawer";
import { EMAIL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site";
import { useT } from "@/lib/i18n";

const linkClass =
  "roll-trigger text-sm text-[color:var(--text-muted)] transition-colors duration-150 hover:text-[color:var(--text-strong)]";

export function Footer() {
  const t = useT();
  const { open } = useContactDrawer();

  const CONTACT_ITEMS: { icon: LucideIcon; label: string; href?: string }[] = [
    { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MessageCircle, label: PHONE_DISPLAY, href: WHATSAPP },
    { icon: MapPin, label: t.footer.location },
  ];

  return (
    <footer className="border-t border-[color:var(--border-subtle)] bg-[color:var(--bg-base)] pb-8 pt-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="max-w-[30ch]">
            <Logo alt="Neura Sistemas" className="mb-4 h-10" />
            <p className="text-sm leading-relaxed text-[color:var(--text-muted)]">
              {t.footer.blurb}
            </p>
            <div className="mt-6">
              <ThemeLangToggle />
            </div>
          </div>

          {/* Nav */}
          <div>
            <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
              {t.footer.navTitle}
            </h5>
            <ul className="space-y-2.5">
              {t.footer.links.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={linkClass}>
                    <RollingText text={label} />
                  </a>
                </li>
              ))}
              <li>
                <button type="button" onClick={open} className={`${linkClass} cursor-pointer`}>
                  <RollingText text={t.footer.contactLink} />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
              {t.footer.contactTitle}
            </h5>
            <ul className="space-y-3">
              {CONTACT_ITEMS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2.5 text-sm text-[color:var(--text-muted)] transition-colors duration-150 hover:text-[color:var(--text-strong)]"
                    >
                      <Icon size={15} className="shrink-0 text-[color:var(--text-subtle)]" aria-hidden />
                      {label}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2.5 text-sm text-[color:var(--text-muted)]">
                      <Icon size={15} className="shrink-0 text-[color:var(--text-subtle)]" aria-hidden />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-subtle)] pt-6">
          <span className="text-[11px] tracking-[0.04em] text-[color:var(--text-subtle)]">
            © {new Date().getFullYear()} Neura Sistemas · {t.footer.rights}
          </span>
          <span className="text-[11px] tracking-[0.04em] text-[color:var(--text-subtle)]">
            {t.footer.tagline}
          </span>
        </div>
      </Container>
    </footer>
  );
}
