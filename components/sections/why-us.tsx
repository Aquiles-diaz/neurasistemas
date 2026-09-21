"use client";

import { Check, X } from "lucide-react";
import { Reveal, d } from "@/components/ui/reveal";
import { Container, Eyebrow } from "@/components/sections/primitives";
import { useT } from "@/lib/i18n";

export function WhyUs() {
  const t = useT();
  const [colAspect, colNeura, colOthers] = t.whyUs.cols;

  return (
    <section id="porque" className="bg-[color:var(--surface-1)] py-[var(--section-y)]">
      <Container>
        <Reveal>
          <Eyebrow center>{t.whyUs.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={d(1)}>
          <h2 className="mt-4 text-center font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.08] tracking-[-0.015em] text-[color:var(--text-strong)]">
            {t.whyUs.title}
          </h2>
        </Reveal>
        <Reveal delay={d(2)}>
          <p className="mx-auto mt-4 max-w-[54ch] text-center text-lg leading-[1.6] text-[color:var(--text-muted)]">
            {t.whyUs.subtitle}
          </p>
        </Reveal>

        {/* ── Compromisos ── */}
        <Reveal delay={d(1)}>
          <div className="mt-12 grid grid-cols-2 gap-6 border-y border-[color:var(--border-subtle)] py-10 md:grid-cols-4">
            {t.whyUs.commitments.map((c) => (
              <div key={c.label} className="text-center">
                <b className="block font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] font-bold tracking-[-0.02em] text-[color:var(--text-strong)]">
                  {c.value}
                </b>
                <span className="mt-1 block text-sm text-[color:var(--text-muted)]">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Tabla comparativa ── */}
        <Reveal delay={d(1)}>
          <h3 className="mt-16 font-[family-name:var(--font-display)] text-[clamp(1.3rem,2.8vw,1.75rem)] font-bold text-[color:var(--text-strong)]">
            {t.whyUs.tableTitle}
          </h3>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">
            {t.whyUs.tableSubtitle}
          </p>
        </Reveal>

        {/* Desktop: table from md */}
        <Reveal delay={d(2)}>
          <div className="mt-8 hidden overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[color:var(--border-subtle)] bg-[color:var(--card)]">
                  <th className="px-5 py-3.5 text-left font-semibold text-[color:var(--text-muted)]">
                    {colAspect}
                  </th>
                  <th className="px-5 py-3.5 text-left font-semibold text-[color:var(--text-strong)]">
                    {colNeura}
                  </th>
                  <th className="px-5 py-3.5 text-left font-semibold text-[color:var(--text-subtle)]">
                    {colOthers}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.whyUs.rows.map((row, i) => (
                  <tr
                    key={row.aspect}
                    className={
                      i % 2 === 0
                        ? "border-b border-[color:var(--border-subtle)]"
                        : "border-b border-[color:var(--border-subtle)] bg-[color:var(--accent-soft)]"
                    }
                  >
                    <td className="px-5 py-4 align-top font-medium text-[color:var(--text-body)]">
                      {row.aspect}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <span className="flex items-start gap-2 text-[color:var(--text-strong)]">
                        <Check
                          size={15}
                          strokeWidth={2.5}
                          className="mt-1 shrink-0"
                          aria-hidden
                        />
                        {row.neura}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <span className="flex items-start gap-2 text-[color:var(--text-muted)]">
                        <X
                          size={15}
                          strokeWidth={2.5}
                          className="mt-1 shrink-0"
                          aria-hidden
                        />
                        {row.others}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile: stacked cards */}
        <div className="mt-8 flex flex-col gap-4 md:hidden">
          {t.whyUs.rows.map((row, i) => (
            <Reveal key={row.aspect} delay={d(i + 1)}>
              <div className="rounded-[var(--radius-lg)] border border-[color:var(--border-subtle)] bg-[color:var(--card)] p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--text-subtle)]">
                  {row.aspect}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="flex items-start gap-2 text-sm text-[color:var(--text-strong)]">
                    <Check size={14} strokeWidth={2.5} className="mt-0.5 shrink-0" aria-hidden />
                    <span>
                      <span className="font-semibold">{t.whyUs.shortNeura}: </span>
                      {row.neura}
                    </span>
                  </span>
                  <span className="flex items-start gap-2 text-sm text-[color:var(--text-muted)]">
                    <X size={14} strokeWidth={2.5} className="mt-0.5 shrink-0" aria-hidden />
                    <span>
                      <span className="font-semibold">{t.whyUs.shortOthers}: </span>
                      {row.others}
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
