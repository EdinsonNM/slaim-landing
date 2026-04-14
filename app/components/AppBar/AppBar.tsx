"use client";

import Image from "next/image";
import Link from "next/link";

const navLinkClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-4 text-sm font-medium text-zinc-600 transition-colors duration-200 hover:bg-zinc-100/90 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer";

export default function AppBar() {
  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))]"
      role="banner"
    >
      <div className="pointer-events-auto mx-auto max-w-[90rem] px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="flex h-[3.25rem] items-center justify-between gap-3 rounded-full bg-white/90 pl-2 pr-1.5 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.1),0_2px_12px_-2px_rgba(15,23,42,0.05)] ring-1 ring-zinc-900/[0.04] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/75 sm:h-14 sm:pl-2.5 sm:pr-2">
          <Link
            href="/#contenido-principal"
            className="group flex min-h-11 min-w-0 shrink items-center gap-2 rounded-full py-1 pl-1 pr-2 text-zinc-900 outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:gap-2.5 sm:pr-2.5"
            aria-label="Slaim — Inicio"
          >
            <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-50 ring-1 ring-zinc-200/80 transition ring-inset group-hover:bg-white sm:size-10">
              <Image
                src="/logo-icons/web/icon-192.png"
                alt=""
                width={36}
                height={36}
                className="size-[1.55rem] object-contain sm:size-8"
                priority
              />
            </span>
            <span className="font-[family-name:var(--font-display)] text-[1.02rem] font-semibold tracking-tight sm:text-lg">
              Slaim
            </span>
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-0.5 sm:gap-1">
            <nav
              className="flex min-w-0 items-center"
              aria-label="Principal"
            >
              <Link href="/#contenido-principal" className={navLinkClass}>
                Inicio
              </Link>
              <Link href="/#caracteristicas" className={navLinkClass}>
                <span className="sm:hidden" title="Características">
                  Features
                </span>
                <span className="hidden sm:inline">Características</span>
              </Link>
              <Link
                href="/#destacados"
                className={`${navLinkClass} hidden lg:inline-flex`}
              >
                Destacados
              </Link>
              <Link href="/#vista-previa" className={navLinkClass}>
                <span className="sm:hidden" title="Vista previa">
                  App
                </span>
                <span className="hidden sm:inline">Vista previa</span>
              </Link>
              <Link href="/#faq" className={`${navLinkClass} hidden md:inline-flex`}>
                FAQ
              </Link>
            </nav>

            <Link
              href="/#descargar"
              className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-6"
            >
              Descargar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
