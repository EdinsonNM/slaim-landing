"use client";

import Image from "next/image";
import Link from "next/link";

export default function AppBar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-6 py-4 sm:px-8 md:px-10 lg:px-16 bg-transparent"
      role="banner"
    >
      <Link
        href="/"
        className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
        aria-label="Slaim - Inicio"
      >
        <Image
          src="/logo-icons/web/icon-192.png"
          alt=""
          width={36}
          height={36}
          className="shrink-0 rounded-lg object-contain"
          priority
        />
        <span className="text-xl font-bold tracking-tight">Slaim</span>
      </Link>
      <span className="ml-auto hidden text-sm text-white/80 sm:inline" aria-label="Herramienta gratuita para la comunidad de desarrolladores">
        Gratis para la comunidad de desarrolladores
      </span>
    </header>
  );
}
