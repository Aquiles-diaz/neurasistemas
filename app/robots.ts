import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Static export: generated once at build time into /robots.txt.
export const dynamic = "force-static";

// Bots de IA que descargan el sitio para entrenar/alimentar modelos o para
// scraping masivo. Los bloqueamos para proteger el contenido propietario, sin
// afectar el posicionamiento en buscadores: Googlebot, Bingbot y demás motores
// de búsqueda siguen permitidos vía la regla "*". (Google-Extended sólo controla
// el uso para IA, no el ranking de Google Search.)
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "PerplexityBot",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
  "FacebookBot",
  "Diffbot",
  "Omgilibot",
  "ImagesiftBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Buscadores y resto de bots: acceso total (bueno para SEO).
      { userAgent: "*", allow: "/" },
      // Crawlers de IA / scraping: bloqueados por completo.
      { userAgent: AI_CRAWLERS, disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
