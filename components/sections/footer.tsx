import Image from "next/image";
import { Container } from "@/components/sections/primitives";
import { WHATSAPP } from "@/lib/site";

const COLS: [string, [string, string][]][] = [
  [
    "Servicios",
    [
      ["Sitios web", "/#servicios"],
      ["Aplicaciones", "/#servicios"],
      ["E-commerce", "/#servicios"],
      ["SEO & Performance", "/#servicios"],
    ],
  ],
  [
    "Estudio",
    [
      ["Stack", "/#stack"],
      ["Proceso", "/#proceso"],
      ["Proyectos", "/proyectos"],
      ["Contacto", "/#contacto"],
      ["WhatsApp", WHATSAPP],
    ],
  ],
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border-subtle)] bg-[color:var(--bg-sunken)] pb-8.5 pt-14">
      <Container>
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[34ch]">
            <Image
              src="/logo/neurasistemas-mark.png"
              alt="Neura Sistemas"
              width={180}
              height={48}
              className="mb-3.5 h-12 w-auto"
            />
            <p className="text-sm text-[color:var(--text-muted)]">
              Estudio de diseño y desarrollo web. Construimos productos digitales
              que inspiran confianza.
            </p>
          </div>
          <div className="flex flex-wrap gap-16">
            {COLS.map(([title, links]) => (
              <div key={title}>
                <h5 className="mb-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
                  {title}
                </h5>
                {links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mb-2.5 block text-sm text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-strong)]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-subtle)] pt-6">
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-subtle)]">
            © {new Date().getFullYear()} Neura Sistemas — Desarrollo Web
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-subtle)]">
            Hecho con precisión en cada pixel
          </span>
        </div>
      </Container>
    </footer>
  );
}
