import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
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
    default: "Neura Sistemas: Software a medida para PyMEs",
    template: "%s · Neura Sistemas",
  },
  description:
    "Desarrollamos software a medida para PyMEs y comercios: webs, automatización, CRM y chatbots. Orientados a PyMEs, abiertos a cualquier rubro. Trabajás menos, facturás más.",
  keywords: [
    "desarrollo de software",
    "software a medida",
    "automatización",
    "chatbots",
    "CRM",
    "desarrollo web",
    "PyMEs",
    "comercios",
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
    url: SITE_URL,
    siteName: "Neura Sistemas",
    title: "Neura Sistemas: Software a medida para PyMEs",
    description:
      "Desarrollamos software a medida: webs, automatización, CRM y chatbots. Orientados a PyMEs y comercios, abiertos a cualquier rubro que quiera crecer.",
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
    title: "Neura Sistemas: Software a medida para PyMEs",
    description: "Desarrollamos software a medida. Trabajás menos, facturás más.",
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
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body>
        <MotionProvider>
          <ContactDrawerProvider>{children}</ContactDrawerProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
