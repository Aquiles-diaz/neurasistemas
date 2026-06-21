"use client";

import { useContactDrawer } from "@/components/ui/contact-drawer";

/* Links que navegan a anclas (funcionan desde cualquier página). "Contacto"
   se maneja aparte: abre el panel en vez de bajar al fondo. */
const NAV_LINKS: [string, string][] = [
  ["Soluciones", "/#solucion"],
  ["Packs", "/#packs"],
  ["Casos", "/#casos"],
  ["FAQ", "/#faq"],
];

const linkClass =
  "text-sm text-white/80 transition-colors duration-150 hover:text-[color:var(--accent-cta)]";

export function FooterNav() {
  const { open } = useContactDrawer();
  return (
    <ul className="space-y-2.5">
      {NAV_LINKS.map(([label, href]) => (
        <li key={label}>
          <a href={href} className={linkClass}>
            {label}
          </a>
        </li>
      ))}
      <li>
        <button type="button" onClick={open} className={`${linkClass} cursor-pointer`}>
          Contacto
        </button>
      </li>
    </ul>
  );
}
