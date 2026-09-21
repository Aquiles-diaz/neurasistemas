import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { SiteModeProvider, SITE_MODE_SCRIPT } from "@/components/site-mode";
import { ContactDrawerProvider } from "@/components/ui/contact-drawer";
import { SITE_URL } from "@/lib/site";

// Two voices only: Montserrat (display headings) + Inter for everything else.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neura Sistemas: Sistemas a medida y ciberseguridad",
    template: "%s · Neura Sistemas",
  },
  description:
    "Desarrollamos sistemas a medida para empresas: aplicaciones de escritorio, plataformas web y apps móviles, con ciberseguridad desde el diseño. Código propio, presupuesto cerrado y soporte real desde Rosario.",
  keywords: [
    "desarrollo de sistemas",
    "software a medida",
    "sistemas de gestión",
    "aplicaciones de escritorio",
    "desarrollo web",
    "apps móviles",
    "ciberseguridad",
    "auditoría de seguridad",
    "Rosario",
    "Neura Sistemas",
  ],
  authors: [{ name: "Neura Sistemas" }],
  creator: "Neura Sistemas",
  publisher: "Neura Sistemas",
  other: {
    copyright: "© 2026 Neura Sistemas. Todos los derechos reservados.",
    "rights-standard": "All Rights Reserved",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "Neura Sistemas",
    title: "Neura Sistemas: Sistemas a medida y ciberseguridad",
    description:
      "Sistemas de escritorio, web y móviles para empresas que no pueden fallar. Seguridad desde el diseño, código propio y presupuesto cerrado.",
    images: [
      {
        url: "/logo/logoneurasistemas.png",
        width: 2000,
        height: 2000,
        alt: "Neura Sistemas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neura Sistemas: Sistemas a medida y ciberseguridad",
    description:
      "Sistemas de escritorio, web y móviles. Seguridad desde el diseño.",
    images: ["/logo/logoneurasistemas.png"],
  },
  icons: {
    icon: [
      { url: "/logo/favicon.ico", sizes: "any" },
      { url: "/logo/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/logo/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: { url: "/logo/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `dark` + `lang="es"` are the SSR defaults; the inline script below
    // swaps them to `light` + `en` before paint when that's what the visitor
    // chose last time. suppressHydrationWarning covers that intentional diff.
    <html
      lang="es"
      className={`dark ${inter.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SITE_MODE_SCRIPT }} />
      </head>
      <body>
        <SiteModeProvider>
          <MotionProvider>
            <ContactDrawerProvider>{children}</ContactDrawerProvider>
          </MotionProvider>
        </SiteModeProvider>
      </body>
    </html>
  );
}
