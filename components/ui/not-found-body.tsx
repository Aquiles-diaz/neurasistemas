"use client";

import Link from "next/link";
import { Container } from "@/components/sections/primitives";
import { useT } from "@/lib/i18n";

export function NotFoundBody() {
  const t = useT();
  return (
    <Container className="py-[var(--section-y)] text-center">
      <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
        {t.notFound.code}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-[color:var(--text-strong)]">
        {t.notFound.title}
      </h1>
      <p className="mx-auto mt-4 max-w-[48ch] text-[color:var(--text-muted)]">
        {t.notFound.body}
      </p>
      <div className="mt-7 flex items-center justify-center">
        <Link
          href="/"
          className="rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text-strong)] transition-colors hover:bg-[color:var(--accent-soft)]"
        >
          {t.notFound.cta}
        </Link>
      </div>
    </Container>
  );
}
