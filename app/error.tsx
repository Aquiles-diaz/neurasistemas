"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/sections/primitives";

/**
 * Route-level safety net: a client-side throw renders this instead of blanking
 * the whole page. Keeps the site usable even if a visual effect fails.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center">
      <Container className="py-[var(--section-y)] text-center">
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-[color:var(--text-strong)]">
          Algo salió mal
        </h1>
        <p className="mx-auto mt-4 max-w-[48ch] text-[color:var(--text-muted)]">
          Ocurrió un error al cargar esta sección. Podés reintentar o volver al
          inicio.
        </p>
        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="cursor-pointer rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] bg-[color:var(--surface-2)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text-strong)] [box-shadow:var(--edge-hi)] transition-colors hover:bg-[color:var(--surface-3)]"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="rounded-[var(--radius-pill)] px-5 py-2.5 text-sm font-medium text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-strong)]"
          >
            Volver al inicio
          </Link>
        </div>
      </Container>
    </main>
  );
}
