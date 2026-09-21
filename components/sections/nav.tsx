"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { CtaButton } from "@/components/sections/primitives";
import { useScrollTo } from "@/components/scroll/use-scroll-to";
import { useContactDrawer } from "@/components/ui/contact-drawer";
import { Logo } from "@/components/ui/logo";
import { RollingText } from "@/components/ui/rolling-text";
import { ThemeLangToggle } from "@/components/ui/theme-lang-toggle";
import { useT } from "@/lib/i18n";
import type { NavLink } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function Nav() {
  const t = useT();
  const LINKS = t.nav.links;
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
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
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
  }, [onHome, LINKS]);

  const go = (link: NavLink) => {
    setMenu(false);
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
  const routeActive = pathname.startsWith("/proyectos") ? "casos" : null;
  const highlight = hovered ?? routeActive ?? active;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[var(--gutter)] pt-[clamp(12px,2vw,20px)]">
      <m.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto relative mx-auto flex items-center justify-between gap-4 rounded-[var(--radius-pill)] border border-[color:var(--nav-border)] bg-[color:var(--nav-bg)] pl-5 pr-2.5 [backdrop-filter:blur(16px)_saturate(160%)] transition-[max-width,padding,box-shadow] duration-300 ease-[var(--ease-out-soft)]",
          scrolled
            ? "max-w-[var(--container-lg)] py-1.5 shadow-[var(--shadow-md)]"
            : "max-w-[calc(var(--container-lg)+3rem)] py-2 shadow-[var(--shadow-sm)]"
        )}
      >
        <button
          className="group flex cursor-pointer items-center gap-2.5"
          onClick={() => {
            setMenu(false);
            if (onHome) scrollTo("top");
            else router.push("/");
          }}
          aria-label={t.nav.home}
        >
          <Logo className="opacity-95" />
          <span className="block text-left">
            <b className="block font-[family-name:var(--font-display)] text-[15px] font-bold leading-[1.15] tracking-[0.01em] text-[color:var(--text-strong)]">
              Neura Sistemas
            </b>
            <span className="mt-0.5 hidden whitespace-nowrap font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.22em] text-[color:var(--text-subtle)] sm:block">
              {t.meta.tagline}
            </span>
          </span>
        </button>

        <nav
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {LINKS.map((link) => {
            const key = link.id;
            const isHi = highlight === key;
            return (
              <button
                key={key}
                onClick={() => go(link)}
                onMouseEnter={() => setHovered(key)}
                className={cn(
                  "roll-trigger relative cursor-pointer rounded-[var(--radius-pill)] px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                  isHi
                    ? "text-[color:var(--text-strong)]"
                    : "text-[color:var(--text-muted)] hover:text-[color:var(--text-body)]"
                )}
              >
                {isHi && (
                  <m.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-[var(--radius-pill)] border border-[color:var(--border-default)] bg-[color:var(--accent-soft)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <RollingText text={link.label} />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeLangToggle className="hidden sm:inline-flex" />
          <span className="hidden lg:inline-flex">
            <CtaButton
              size="sm"
              className="font-[family-name:var(--font-body)] font-semibold"
              onClick={() => {
                setMenu(false);
                open();
              }}
            >
              <RollingText text={t.nav.cta} />
            </CtaButton>
          </span>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] text-[color:var(--text-strong)] transition-colors hover:bg-[color:var(--accent-soft)] lg:hidden"
            onClick={() => setMenu(true)}
            aria-label={t.nav.openMenu}
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
            className="pointer-events-auto fixed inset-0 z-[60] flex flex-col bg-[color:var(--bg-base)] px-[var(--gutter)] py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div className="flex h-[50px] items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo />
                <b className="font-[family-name:var(--font-display)] text-[color:var(--text-strong)]">
                  Neura Sistemas
                </b>
              </div>
              <div className="flex items-center gap-2.5">
                <ThemeLangToggle />
                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] text-[color:var(--text-strong)]"
                  onClick={() => setMenu(false)}
                  aria-label={t.nav.closeMenu}
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-1.5">
              {LINKS.map((link, i) => (
                <m.button
                  key={link.id}
                  onClick={() => go(link)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="roll-trigger border-b border-[color:var(--border-subtle)] py-3 text-left font-[family-name:var(--font-display)] text-3xl font-semibold text-[color:var(--text-strong)]"
                >
                  <RollingText text={link.label} />
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
                {t.nav.cta}
              </CtaButton>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
