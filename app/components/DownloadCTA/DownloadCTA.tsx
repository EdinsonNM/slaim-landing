"use client";

import { useEffect, useState } from "react";
import { SiApple } from "react-icons/si";
import { FaWindows } from "react-icons/fa";

type OS = "mac" | "win" | null;

function getOS(): OS {
  if (typeof window === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  const platform =
    (navigator as Navigator & { userAgentData?: { platform: string } })
      .userAgentData?.platform ?? navigator.platform ?? "";
  const platformLower = platform.toLowerCase();
  if (
    platformLower.includes("mac") ||
    platformLower.includes("darwin") ||
    ua.includes("mac os")
  )
    return "mac";
  if (
    platformLower.includes("win") ||
    ua.includes("windows") ||
    ua.includes("win32") ||
    ua.includes("wow64")
  )
    return "win";
  return null;
}

const DOWNLOAD_URLS = {
  mac: "#", // Sustituir por URL real: ej. /download/slaim-mac.dmg o enlace externo
  win: "#", // Sustituir por URL real: ej. /download/slaim-win.exe
} as const;

type Variant = "hero" | "section";

export default function DownloadCTA({ variant = "section" }: { variant?: Variant }) {
  const [os, setOs] = useState<OS>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOs(getOS());
    setMounted(true);
  }, []);

  const isHero = variant === "hero";
  const baseClass =
    "inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]";
  const heroClass =
    "px-6 py-3.5 bg-white text-zinc-900 hover:bg-white/90 shadow-lg hover:shadow-xl";
  const sectionClass =
    "px-8 py-4 bg-white text-zinc-900 hover:bg-white/90";
  const buttonClass = `${baseClass} ${isHero ? heroClass : sectionClass}`;
  const iconSize = isHero ? "w-5 h-5" : "w-6 h-6";

  if (!mounted) {
    return (
      <div className={isHero ? "mt-6" : "mt-8 flex flex-wrap justify-center gap-3"}>
        <span
          className={`${buttonClass} opacity-70 cursor-wait`}
          aria-live="polite"
          aria-busy="true"
        >
          Cargando...
        </span>
      </div>
    );
  }

  if (os === "mac") {
    return (
      <div className={isHero ? "mt-6" : "mt-8 flex flex-wrap justify-center gap-3"}>
        <a
          href={DOWNLOAD_URLS.mac}
          className={buttonClass}
          aria-label="Descargar Slaim para Mac"
        >
          <SiApple className={`${iconSize} shrink-0`} aria-hidden />
          Descargar para Mac
        </a>
      </div>
    );
  }

  if (os === "win") {
    return (
      <div className={isHero ? "mt-6" : "mt-8 flex flex-wrap justify-center gap-3"}>
        <a
          href={DOWNLOAD_URLS.win}
          className={buttonClass}
          aria-label="Descargar Slaim para Windows"
        >
          <FaWindows className={`${iconSize} shrink-0`} aria-hidden />
          Descargar para Windows
        </a>
      </div>
    );
  }

  return (
    <div className={isHero ? "mt-6" : "mt-8 flex flex-wrap justify-center gap-3"}>
      <a
        href={DOWNLOAD_URLS.mac}
        className={buttonClass}
        aria-label="Descargar Slaim para Mac"
      >
        <SiApple className={`${iconSize} shrink-0`} aria-hidden />
        Mac
      </a>
      <a
        href={DOWNLOAD_URLS.win}
        className={buttonClass}
        aria-label="Descargar Slaim para Windows"
      >
        <FaWindows className={`${iconSize} shrink-0`} aria-hidden />
        Windows
      </a>
    </div>
  );
}
