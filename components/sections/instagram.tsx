"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { InstagramEmbed } from "@/components/ui/instagram-embed";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { Container, Eyebrow } from "@/components/sections/primitives";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  INSTAGRAM_LATEST_POST_URL,
  WHATSAPP,
} from "@/lib/site";
import { useT } from "@/lib/i18n";

/**
 * "Mirá cómo trabajamos": el último video de Instagram como prueba para quien
 * no lee, justo debajo del hero. Reel a un lado, una frase + CTAs al otro.
 */
export function Instagram() {
  const t = useT();

  return (
    <section id="instagram" className="relative py-[var(--section-y)]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            <Reveal>
              <Eyebrow center className="lg:justify-start">
                {t.social.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={d(1)}>
              <h2 className="mt-4.5 text-[clamp(2rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-[color:var(--text-strong)] [font-family:var(--font-display)]">
                {t.social.title}
              </h2>
            </Reveal>
            <Reveal delay={d(2)}>
              <p className="mx-auto mt-4 max-w-[44ch] text-lg leading-[1.6] text-[color:var(--text-muted)] lg:mx-0">
                {t.social.subtitle}
              </p>
            </Reveal>
            <Reveal delay={d(3)}>
              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-[var(--radius-pill)] bg-[color:var(--accent)] px-6 text-base font-semibold text-[color:var(--text-onaccent)] shadow-[var(--shadow-md)] transition-[transform,background-color] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:bg-[color:var(--accent-hover)] active:translate-y-px"
                >
                  <WhatsAppIcon size={18} />
                  {t.social.ctaWhatsapp}
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] px-6 text-base font-semibold text-[color:var(--text-strong)] transition-[transform,border-color,background-color] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:bg-[color:var(--accent-soft)] active:translate-y-px"
                >
                  <InstagramIcon size={18} />
                  @{INSTAGRAM_HANDLE}
                </a>
              </div>
            </Reveal>
            <Reveal delay={d(4)}>
              <a
                href={INSTAGRAM_LATEST_POST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--text-muted)] underline-offset-4 transition-colors hover:text-[color:var(--text-strong)] hover:underline"
              >
                {t.social.open}
                <ArrowUpRight size={15} strokeWidth={2} aria-hidden />
              </a>
            </Reveal>
          </div>

          <Reveal delay={d(2)} className="order-first lg:order-none">
            <InstagramEmbed loadingLabel={t.social.loading} openLabel={t.social.open} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
