import Image from "next/image";
import Link from "next/link";

const linkClass =
  "font-[family-name:var(--font-body-landing)] text-sm text-zinc-400 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-[#0f0f10] text-white"
      aria-label="Pie de página"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pb-6 pt-14 sm:px-8 md:px-12 lg:px-16 lg:pt-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <Link
            href="/#contenido-principal"
            className="flex shrink-0 items-center gap-2.5 self-start rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f10]"
            aria-label="Slaim — Inicio"
          >
            <span className="flex size-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/15">
              <Image
                src="/logo-icons/web/icon-192.png"
                alt=""
                width={32}
                height={32}
                className="size-7 object-contain"
              />
            </span>
          </Link>

          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:max-w-2xl lg:justify-items-end">
            <div>
              <p className="font-[family-name:var(--font-body-landing)] text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Producto
              </p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <Link href="/#caracteristicas" className={linkClass}>
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="/#destacados" className={linkClass}>
                    Destacados 3D y lienzo
                  </Link>
                </li>
                <li>
                  <Link href="/#vista-previa" className={linkClass}>
                    Vista previa
                  </Link>
                </li>
                <li>
                  <Link href="/#descargar" className={linkClass}>
                    Descargar
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className={linkClass}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-[family-name:var(--font-body-landing)] text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Código y releases
              </p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <Link
                    href="https://github.com/EdinsonNM/slides-for-devs"
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repositorio
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/EdinsonNM/slides-for-devs/releases"
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Releases
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/EdinsonNM/slides-for-devs/blob/release/README.md"
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    README
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-[family-name:var(--font-body-landing)] text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Créditos
              </p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <Link
                    href="https://edi-developer.dev"
                    className={linkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EdiDev
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tipografía gigante recortada por abajo (efecto “tucked” detrás de la barra) */}
        <div className="relative z-10 mt-12 select-none sm:mt-14 lg:mt-16">
          <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2">
            <div className="mx-auto h-[clamp(3.25rem,10vw,6.25rem)] max-w-[90rem] overflow-hidden sm:h-[clamp(3.75rem,11vw,7.25rem)] md:h-[clamp(4.25rem,12vw,8.25rem)]">
              <p
                className="pointer-events-none absolute bottom-0 left-1/2 w-full -translate-x-1/2 translate-y-[18%] text-center font-[family-name:var(--font-display)] text-[clamp(3.75rem,22vw,16rem)] font-bold uppercase leading-[0.58] tracking-[-0.055em] text-white/[0.09] sm:translate-y-[19%] sm:text-[clamp(4.5rem,24vw,17rem)] md:translate-y-[20%]"
                aria-hidden
              >
                SLAIM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-[clamp(0.15rem,0.5vw,0.35rem)] border-t border-white/10 bg-[#141416] shadow-[0_-10px_32px_-8px_rgba(0,0,0,0.5)]">
        <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8 md:px-12 lg:px-16">
          <Link
            href="/#contenido-principal"
            className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141416]"
          >
            <span className="flex size-8 items-center justify-center overflow-hidden rounded-lg bg-white/10">
              <Image
                src="/logo-icons/web/icon-192.png"
                alt=""
                width={24}
                height={24}
                className="size-5 object-contain"
              />
            </span>
            <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight">
              Slaim
            </span>
          </Link>
          <p className="font-[family-name:var(--font-body-landing)] text-xs text-zinc-500">
            MIT · Presentaciones técnicas para desarrolladores
          </p>
        </div>
      </div>
    </footer>
  );
}
