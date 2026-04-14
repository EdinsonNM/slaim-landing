"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { HiArrowDownTray, HiBars3, HiXMark } from "react-icons/hi2";

const navLinkClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-4 text-sm font-medium text-zinc-600 transition-colors duration-200 hover:bg-zinc-100/90 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer";

const mobileNavLinkClass =
  "flex min-h-12 w-full items-center rounded-xl px-4 text-base font-medium text-zinc-800 transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const MOBILE_NAV_LINKS: { href: string; label: string }[] = [
  { href: "/#contenido-principal", label: "Inicio" },
  { href: "/#caracteristicas", label: "Características" },
  { href: "/#destacados", label: "Destacados" },
  { href: "/#vista-previa", label: "Vista previa" },
  { href: "/#faq", label: "FAQ" },
];

export default function AppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const titleId = `${menuId}-title`;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    }, 0);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))]"
      role="banner"
    >
      <div className="pointer-events-auto mx-auto max-w-[90rem] px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="flex h-[3.25rem] items-center justify-between gap-2 rounded-full bg-white/90 pl-2 pr-1.5 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.1),0_2px_12px_-2px_rgba(15,23,42,0.05)] ring-1 ring-zinc-900/[0.04] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/75 sm:h-14 sm:gap-3 sm:pl-2.5 sm:pr-2">
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

          <div className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-1">
            <nav
              className="hidden min-w-0 items-center lg:flex"
              aria-label="Principal"
            >
              <Link href="/#contenido-principal" className={navLinkClass}>
                Inicio
              </Link>
              <Link href="/#caracteristicas" className={navLinkClass}>
                Características
              </Link>
              <Link href="/#destacados" className={navLinkClass}>
                Destacados
              </Link>
              <Link href="/#vista-previa" className={navLinkClass}>
                Vista previa
              </Link>
              <Link href="/#faq" className={navLinkClass}>
                FAQ
              </Link>
            </nav>

            <Link
              href="/#descargar"
              aria-label="Descargar Slaim"
              className="inline-flex min-h-11 min-w-0 shrink cursor-pointer items-center justify-center gap-2 rounded-full bg-zinc-900 px-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-6"
            >
              <HiArrowDownTray className="size-5 shrink-0 sm:hidden" aria-hidden />
              <span className="hidden sm:inline">Descargar</span>
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-haspopup="dialog"
              aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? (
                <HiXMark className="size-6" aria-hidden />
              ) : (
                <HiBars3 className="size-6" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="pointer-events-auto fixed inset-0 z-[55] bg-zinc-900/25 backdrop-blur-[2px] lg:hidden"
            aria-label="Cerrar menú"
            onClick={closeMenu}
          />
          <div
            ref={panelRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="pointer-events-auto fixed left-3 right-3 top-[max(calc(env(safe-area-inset-top)+4.75rem),4.75rem)] z-[60] max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain rounded-2xl border border-zinc-200/80 bg-white/95 p-2 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.2)] ring-1 ring-zinc-900/[0.06] backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 sm:left-auto sm:right-8 sm:top-[max(calc(env(safe-area-inset-top)+5rem),5rem)] sm:w-[min(100%,20rem)] md:right-12 lg:hidden"
          >
            <p id={titleId} className="sr-only">
              Navegación del sitio
            </p>
            <nav className="flex flex-col gap-0.5 py-1" aria-label="Principal móvil">
              {MOBILE_NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={mobileNavLinkClass}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/#descargar"
                className="mt-1 flex min-h-12 w-full items-center justify-center rounded-xl bg-zinc-900 px-4 text-base font-semibold text-white transition-colors hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                onClick={closeMenu}
              >
                Descargar Slaim
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
