import type { Metadata } from "next";
import {
  Archivo,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

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
    default: "Slaim — Presentaciones técnicas con IA para desarrolladores",
    template: "%s | Slaim",
  },
  description:
    "App de escritorio (Tauri) para crear decks con Markdown, código, Excalidraw, Mermaid e IA (Gemini/OpenAI). Export a PowerPoint y vídeo, vista presentador y licencia MIT.",
  keywords: [
    "Slaim",
    "presentaciones",
    "diapositivas",
    "Markdown",
    "Excalidraw",
    "Mermaid",
    "Tauri",
    "Gemini",
    "OpenAI",
    "PowerPoint",
    "desarrolladores",
  ],
  authors: [{ name: "Slaim" }],
  creator: "Slaim",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Slaim",
    title: "Slaim — Presentaciones técnicas con IA para desarrolladores",
    description:
      "Markdown, diagramas, IA integrada y export a .pptx o vídeo. App nativa con Tauri para devs y equipos técnicos.",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Slaim — Presentaciones técnicas con IA para desarrolladores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slaim — Presentaciones técnicas con IA para desarrolladores",
    description:
      "Markdown, código, diagramas e IA en una sola app. Export a PowerPoint y vídeo; vista presentador con notas.",
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
        className={`${instrumentSerif.variable} ${archivo.variable} ${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
