import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
<<<<<<< HEAD
import { LaptopBackground } from "@/components/sections/laptop-background";
=======
import { SITE_URL } from "@/lib/site";
>>>>>>> c441da0a641563f76f8a2c565d36ce0516cbb1d8

// Two voices only: Stack Sans Notch (display headings, loaded from Google Fonts
// below) + Inter for everything else.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neura Sistemas — Desarrollo Web",
    template: "%s · Neura Sistemas",
  },
  description:
    "Estudio de diseño y desarrollo web. Convertimos ideas en experiencias digitales rápidas, elegantes y hechas para crecer.",
  keywords: [
    "desarrollo web",
    "diseño web",
    "aplicaciones web",
    "e-commerce",
    "React",
    "Next.js",
    "Neura Sistemas",
  ],
  authors: [{ name: "Neura Sistemas" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Neura Sistemas",
    title: "Neura Sistemas — Desarrollo Web",
    description:
      "Creamos sitios web que inspiran confianza. Diseño y desarrollo web rápido, elegante y hecho para crecer.",
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
    title: "Neura Sistemas — Desarrollo Web",
    description: "Creamos sitios web que inspiran confianza.",
    images: ["/logo/neurasistemas-mark-dark.jpeg"],
  },
  icons: { icon: "/logo/neurasistemas-monogram.png" },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
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
      className={`dark ${inter.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          <LaptopBackground />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
