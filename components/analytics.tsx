import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

/**
 * Tráfico.
 *  - Google Analytics 4: solo si NEXT_PUBLIC_GA_ID está cargada. gtag se carga
 *    `afterInteractive`, sin bloquear el primer pintado.
 *  - Vercel Analytics: solo cuando el build corre en Vercel (la plataforma
 *    define NEXT_PUBLIC_VERCEL_ENV sola). En Firebase no se monta, así no
 *    pide un script que ahí no existe.
 * En desarrollo y en previews sin variables no se envía nada.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ON_VERCEL = Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV);

export function Analytics() {
  return (
    <>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {ON_VERCEL && <VercelAnalytics />}
    </>
  );
}
