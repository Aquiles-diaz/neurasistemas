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
    default: "Neura Sistemas: Automatización y Web para PyMEs",
    template: "%s · Neura Sistemas",
  },
  description:
    "Automatizamos tu negocio: webs, CRM, chatbots y automatización para PyMEs y comercios. Trabajás menos, facturás más.",
  keywords: [
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
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Neura Sistemas",
    title: "Neura Sistemas: Automatización y Web para PyMEs",
    description:
      "Automatizamos tu negocio. Webs, CRM, chatbots y automatización para PyMEs y comercios que quieren crecer. Trabajás menos, facturás más.",
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
    title: "Neura Sistemas: Automatización y Web para PyMEs",
    description: "Automatizamos tu negocio. Trabajás menos, facturás más.",
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
