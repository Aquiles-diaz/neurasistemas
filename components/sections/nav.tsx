"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { CtaButton } from "@/components/sections/primitives";
import { useScrollTo } from "@/components/scroll/use-scroll-to";
import { useContactDrawer } from "@/components/ui/contact-drawer";
import { cn } from "@/lib/utils";

type NavLink = { label: string; id?: string; href?: string };

const LINKS: NavLink[] = [
  { label: "Soluciones", id: "solucion" },
  { label: "Servicios", id: "servicios" },
  { label: "Packs", id: "packs" },
  { label: "Casos", id: "casos" },
  { label: "FAQ", id: "faq" },
  { label: "Contacto", id: "contacto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);
  const scrollTo = useScrollTo();
  const { open } = useContactDrawer();
  const router = useRouter();
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The nav items are buttons (not <Link>), so Next never prefetches their
  // routes — warm them up front so navigation is instant on click.
  useEffect(() => {
    router.prefetch("/proyectos");
    router.prefetch("/iniciar-proyecto");
  }, [router]);

  // Scroll-spy: highlight the section currently in view (home only).
  useEffect(() => {
    if (!onHome) return;
    const ids = LINKS.filter((l) => l.id).map((l) => l.id!);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  const go = (link: NavLink) => {
    setMenu(false);
    if (link.href) {
      router.push(link.href);
      return;
    }
    if (!link.id) return;
    // "Contacto" abre el panel en vez de mandar al fondo (en cualquier página).
    if (link.id === "contacto") {
      open();
      return;
    }
    if (onHome) scrollTo(link.id);
    else router.push(`/#${link.id}`);
  };

  // The pill follows the hovered link, falling back to the active section /
  // the current route for the Proyectos link.
  const routeActive = pathname.startsWith("/proyectos") ? "/proyectos" : null;
  const keyOf = (l: NavLink) => l.href ?? l.id!;
  const highlight = hovered ?? routeActive ?? active;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[var(--gutter)] pt-[clamp(12px,2vw,20px)]">
      <m.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto relative mx-auto flex items-center justify-between gap-4 rounded-[var(--radius-pill)] pl-5 pr-2.5 transition-[max-width,padding,background-color,border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)]",
          // Over hero (dark video): translucent dark pill — white text
          // Over light page (scrolled): blurred light pill — dark text
          scrolled
            ? [
                "max-w-[var(--container-lg)] py-2",
                "border border-[color:var(--border-subtle)] bg-white/80 shadow-[0_4px_24px_-6px_rgba(15,23,42,.10)]",
                "[backdrop-filter:blur(16px)_saturate(160%)]",
              ]
            : [
                "max-w-[calc(var(--container-lg)+3rem)] py-2.5",
                "border border-white/15 bg-[rgba(11,31,51,0.55)]",
                "[backdrop-filter:blur(16px)_saturate(160%)]",
              ]
        )}
      >
        <button
          className="group flex cursor-pointer items-center gap-3"
          onClick={() => {
            setMenu(false);
            if (onHome) scrollTo("top");
            else router.push("/");
          }}
          aria-label="Inicio"
        >
          <span className="block text-left">
            <b
              className={cn(
                "block font-[family-name:var(--font-display)] text-[15px] font-bold leading-[1.15] tracking-[0.01em] transition-colors duration-500",
                scrolled ? "text-[color:var(--text-strong)]" : "text-white"
              )}
            >
              Neura Sistemas
            </b>
            <span
              className={cn(
                "mt-0.5 hidden font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.22em] transition-colors duration-500 sm:block",
                scrolled ? "text-[color:var(--text-subtle)]" : "text-white/60"
              )}
            >
              Automatización &amp; Web
            </span>
          </span>
        </button>

        <nav
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {LINKS.map((link) => {
            const key = keyOf(link);
            return (
              <button
                key={key}
                onClick={() => go(link)}
                onMouseEnter={() => setHovered(key)}
                className={cn(
                  "relative cursor-pointer rounded-[var(--radius-pill)] px-4 py-2 text-sm font-medium transition-colors duration-300",
                  scrolled
                    ? highlight === key
                      ? "text-[color:var(--text-strong)]"
                      : "text-[color:var(--text-muted)] hover:text-[color:var(--text-body)]"
                    : highlight === key
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                )}
              >
                {highlight === key && (
                  <m.span
                    layoutId="nav-pill"
                    className={cn(
                      "absolute inset-0 -z-10 rounded-[var(--radius-pill)]",
                      scrolled
                        ? "border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                        : "border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                    )}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex">
            <CtaButton
              size="sm"
              className="font-[family-name:var(--font-body)] font-semibold"
              onClick={() => {
                setMenu(false);
                open();
              }}
            >
              Agendá una llamada
            </CtaButton>
          </span>
          <button
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-pill)] border transition-colors md:hidden",
              scrolled
                ? "border-[color:var(--border-subtle)] text-[color:var(--text-strong)] hover:bg-[color:var(--surface-1)]"
                : "border-white/25 text-white hover:bg-white/10"
            )}
            onClick={() => setMenu(true)}
            aria-label="Abrir menú"
            aria-expanded={menu}
            aria-controls="mobile-nav"
          >
            <Menu size={20} strokeWidth={1.6} />
          </button>
        </div>
      </m.div>

      <AnimatePresence>
        {menu && (
          <m.div
            id="mobile-nav"
            className="pointer-events-auto fixed inset-0 z-[60] flex flex-col bg-white px-[var(--gutter)] py-6 [backdrop-filter:blur(20px)_saturate(160%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div className="flex h-[50px] items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo/neurasistemas-monogram.png"
                  alt=""
                  width={26}
                  height={26}
                  className="h-[26px] w-auto"
                />
                <b className="font-[family-name:var(--font-display)] text-[color:var(--text-strong)]">
                  Neura Sistemas
                </b>
              </div>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-pill)] border border-[color:var(--border-subtle)] text-[color:var(--text-strong)]"
                onClick={() => setMenu(false)}
                aria-label="Cerrar menú"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-1.5">
              {LINKS.map((link, i) => (
                <m.button
                  key={keyOf(link)}
                  onClick={() => go(link)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-[color:var(--border-subtle)] py-3 text-left font-[family-name:var(--font-display)] text-3xl font-semibold text-[color:var(--text-strong)]"
                >
                  {link.label}
                </m.button>
              ))}
            </div>
            <div className="mt-7">
              <CtaButton
                size="lg"
                className="w-full font-[family-name:var(--font-body)] font-semibold"
                onClick={() => {
                  setMenu(false);
                  open();
                }}
              >
                Agendá una llamada
              </CtaButton>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
