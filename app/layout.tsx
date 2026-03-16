import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://slaim.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Slaim — Presentaciones que enganchan. Cero estrés.",
    template: "%s | Slaim",
  },
  description:
    "De la idea al escenario en minutos. Slaim escribe contigo el guion, las notas de orador y las imágenes. Menos tiempo en slides, más impacto en la sala.",
  keywords: [
    "presentaciones",
    "diapositivas",
    "slides",
    "pitch",
    "oratoria",
    "guion",
    "Slaim",
  ],
  authors: [{ name: "Slaim" }],
  creator: "Slaim",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Slaim",
    title: "Slaim — Presentaciones que enganchan. Cero estrés.",
    description:
      "De la idea al escenario en minutos. Slaim escribe contigo el guion, las notas de orador y las imágenes. Tú solo comunica.",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Slaim — Presentaciones que enganchan. Cero estrés.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slaim — Presentaciones que enganchan. Cero estrés.",
    description:
      "De la idea al escenario en minutos. Slaim escribe contigo el guion y las imágenes. Tú solo comunica.",
    images: ["/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
