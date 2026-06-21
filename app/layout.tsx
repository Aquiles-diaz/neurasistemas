import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/scroll/smooth-scroll";
import { MotionProvider } from "@/components/motion-provider";
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
    default: "Neura Sistemas — Automatización y Web para PyMEs",
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
    title: "Neura Sistemas — Automatización y Web para PyMEs",
    description:
      "Automatizamos tu negocio. Webs, CRM, chatbots y automatización para PyMEs y comercios que quieren crecer. Trabajás menos, facturás más.",
    images: [
      {
        url: "/logo/neurasistemas-mark-dark.jpeg",
        width: 1254,
        height: 1254,
        alt: "Neura Sistemas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neura Sistemas — Automatización y Web para PyMEs",
    description: "Automatizamos tu negocio. Trabajás menos, facturás más.",
    images: ["/logo/neurasistemas-mark-dark.jpeg"],
  },
  icons: { icon: "/logo/neurasistemas-monogram.png" },
};

export const viewport: Viewport = {
  themeColor: "#0b1f33",
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
        <SmoothScroll>
          <MotionProvider>{children}</MotionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
