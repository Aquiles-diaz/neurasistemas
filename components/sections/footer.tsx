import Image from "next/image";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Container } from "@/components/sections/primitives";

const NAV_LINKS: [string, string][] = [
  ["Soluciones", "/#solucion"],
  ["Packs", "/#packs"],
  ["Casos", "/#casos"],
  ["FAQ", "/#faq"],
  ["Contacto", "/#contacto"],
];

const CONTACT_ITEMS: { icon: typeof Mail; label: string; href: string }[] = [
  {
    icon: Mail,
    label: "aquilesdiaz335@gmail.com",
    href: "mailto:aquilesdiaz335@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "+54 9 3402507879",
    href: "https://wa.me/5493402507879",
  },
  {
    icon: MapPin,
    label: "Rosario, Santa Fe",
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="bg-[color:var(--navy)] pt-14 pb-8">
      <Container>
        {/* Top grid: brand / nav / contact */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="max-w-[28ch]">
            <Image
              src="/logo/neurasistemas-mark.png"
              alt="Neura Sistemas"
              width={180}
              height={48}
              className="mb-4 h-12 w-auto"
            />
            <p className="text-sm leading-relaxed text-white/80">
              Automatizamos negocios para que trabajés menos y facturés más.
              Webs, CRM, chatbots y automatización para PyMEs y comercios.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
              Navegación
            </h5>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/80 transition-colors duration-150 hover:text-[color:var(--accent-cta)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
              Contacto
            </h5>
            <ul className="space-y-3">
              {CONTACT_ITEMS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href === "#" ? (
                    <span className="inline-flex items-center gap-2.5 text-sm text-white/80">
                      <Icon size={15} className="shrink-0 text-white/50" aria-hidden />
                      {label}
                    </span>
                  ) : (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2.5 text-sm text-white/80 transition-colors duration-150 hover:text-[color:var(--accent-cta)]"
                    >
                      <Icon size={15} className="shrink-0 text-white/50" aria-hidden />
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
          <span className="text-[11px] tracking-[0.04em] text-white/60">
            © {new Date().getFullYear()} Neura Sistemas — Rosario, Santa Fe
          </span>
          <span className="text-[11px] tracking-[0.04em] text-white/60">
            Automatización para PyMEs argentinas
          </span>
        </div>
      </Container>
    </footer>
  );
}
