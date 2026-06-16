import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/sections/primitives";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center">
      <Container className="py-[var(--section-y)] text-center">
        <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
          Error 404
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-[color:var(--text-strong)]">
          Página no encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-[48ch] text-[color:var(--text-muted)]">
          La página que buscás no existe o fue movida. Volvé al inicio para
          seguir navegando.
        </p>
        <div className="mt-7 flex items-center justify-center">
          <Link
            href="/"
            className="rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] bg-[color:var(--surface-2)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text-strong)] [box-shadow:var(--edge-hi)] transition-colors hover:bg-[color:var(--surface-3)]"
          >
            Volver al inicio
          </Link>
        </div>
      </Container>
    </main>
  );
}
