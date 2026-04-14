"use client";

import { useEffect, useState } from "react";
import { SiApple } from "react-icons/si";
import { FaWindows } from "react-icons/fa";

const REPO = "EdinsonNM/slides-for-devs";
const GITHUB_LATEST = `https://api.github.com/repos/${REPO}/releases/latest`;

/** URLs por defecto si falla la API (última conocida) */
const FALLBACK_URLS = {
  mac: `https://github.com/${REPO}/releases/latest/download/Slaim.app.tar.gz`,
  win: `https://github.com/${REPO}/releases/download/v0.1.8/Slaim_0.1.8_x64-setup.exe`,
} as const;

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

type ReleaseAsset = { name: string; browser_download_url: string };

function getDownloadUrlsFromRelease(assets: ReleaseAsset[]): {
  mac: string;
  win: string;
} {
  const mac =
    assets.find(
      (a) =>
        a.name === "Slaim.app.tar.gz" ||
        (a.name.endsWith(".app.tar.gz") && !a.name.endsWith(".sig"))
    )?.browser_download_url ?? FALLBACK_URLS.mac;
  const win =
    assets.find(
      (a) =>
        a.name.includes("x64-setup.exe") && !a.name.endsWith(".sig")
    )?.browser_download_url ?? FALLBACK_URLS.win;
  return { mac, win };
}

type Variant = "hero" | "section";

export default function DownloadCTA({ variant = "section" }: { variant?: Variant }) {
  const [os, setOs] = useState<OS>(null);
  const [mounted, setMounted] = useState(false);
  const [urls, setUrls] = useState<{ mac: string; win: string }>(FALLBACK_URLS);

  useEffect(() => {
    setOs(getOS());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const controller = new AbortController();
    fetch(GITHUB_LATEST, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Not ok"))))
      .then((data: { assets?: ReleaseAsset[] }) => {
        if (data?.assets?.length) {
          setUrls(getDownloadUrlsFromRelease(data.assets));
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [mounted]);

  const isHero = variant === "hero";
  const baseClass =
    "inline-flex min-h-11 items-center justify-center gap-2 sm:gap-2.5 font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm sm:text-base cursor-pointer";
  const heroClass =
    "rounded-full px-8 py-3.5 sm:px-10 sm:py-4 bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-400 focus-visible:ring-offset-white shadow-[0_16px_48px_-16px_rgba(0,0,0,0.22)] min-w-0";
  const sectionRounded = "rounded-xl";
  const sectionClass =
    `${sectionRounded} px-6 sm:px-8 py-3.5 sm:py-4 border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:border-zinc-300 hover:bg-zinc-50 focus-visible:ring-blue-500 focus-visible:ring-offset-white`;
  const buttonClass = `${baseClass} ${isHero ? heroClass : sectionClass}`;
  const iconSize = isHero ? "w-4 h-4 sm:w-5 sm:h-5" : "w-5 h-5 sm:w-6 sm:h-6";

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
          href={urls.mac}
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
          href={urls.win}
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
    <div
      className={
        isHero
          ? "mt-6 flex flex-wrap justify-center gap-3 sm:gap-4"
          : "mt-8 flex flex-wrap justify-center gap-3"
      }
    >
      <a
        href={urls.mac}
        className={buttonClass}
        aria-label="Descargar Slaim para Mac"
      >
        <SiApple className={`${iconSize} shrink-0`} aria-hidden />
        Mac
      </a>
      <a
        href={urls.win}
        className={buttonClass}
        aria-label="Descargar Slaim para Windows"
      >
        <FaWindows className={`${iconSize} shrink-0`} aria-hidden />
        Windows
      </a>
    </div>
  );
}
