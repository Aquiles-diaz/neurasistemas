"use client";

import { useEffect } from "react";

/**
 * Registro de errores del navegador con Sentry. El SDK se carga con un
 * import dinámico después del montaje para no sumar peso al primer pintado;
 * solo se inicializa si NEXT_PUBLIC_SENTRY_DSN está cargada.
 *
 * Usamos @sentry/browser (no @sentry/nextjs): el sitio es un export estático,
 * sin servidor que instrumentar, y así evitamos el plugin de build.
 */
const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const RELEASE = process.env.NEXT_PUBLIC_RELEASE;

export function SentryInit() {
  useEffect(() => {
    if (!DSN) return;
    import("@sentry/browser").then((Sentry) => {
      Sentry.init({
        dsn: DSN,
        release: RELEASE,
        environment: process.env.NODE_ENV,
        sampleRate: 1,
        tracesSampleRate: 0.1,
        sendDefaultPii: false,
        // Ruido conocido de extensiones y navegadores viejos.
        ignoreErrors: [
          "ResizeObserver loop limit exceeded",
          "ResizeObserver loop completed with undelivered notifications",
          /extension\//i,
          /^chrome-extension:/i,
        ],
      });
    });
  }, []);
  return null;
}

/** Reporta un error a mano (p. ej. desde el error boundary). No-op sin DSN. */
export function reportError(error: unknown, context?: Record<string, unknown>) {
  if (!DSN) return;
  import("@sentry/browser").then((Sentry) => {
    Sentry.captureException(error, context ? { extra: context } : undefined);
  });
}
