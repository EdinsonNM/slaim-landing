"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DownloadCTA from "@/app/components/DownloadCTA/DownloadCTA";
import {
  PARALLAX_OVERLAY_Y,
  PARALLAX_STICKY_Y,
  SCROLL_HEIGHT_VH,
  TEXT_FADE_WINDOW,
} from "./constants";

const VIDEO_SRC = "/video.mp4";
const PLACEHOLDER_IMAGE = "/character.png";

/** Opacidad para un texto con data-progress="min,max": fade in/out en los bordes */
function textOpacity(progress: number, min: number, max: number): number {
  if (progress < min || progress > max) return 0;
  const fadeInEnd = min + TEXT_FADE_WINDOW;
  const fadeOutStart = max - TEXT_FADE_WINDOW;
  // Primer slide (min === 0): visible desde el inicio sin esperar scroll
  if (min === 0 && progress <= fadeInEnd) return 1;
  // Último slide (max === 1): visible al final del scroll
  if (max === 1 && progress >= fadeOutStart) return 1;
  if (progress <= fadeInEnd) return (progress - min) / TEXT_FADE_WINDOW;
  if (progress >= fadeOutStart) return (max - progress) / TEXT_FADE_WINDOW;
  return 1;
}

/** Titulares que rotan con el scroll — copy orientado a curiosidad y conversión */
const HERO_SLIDES: { title: string; subtitle: string; min: number; max: number }[] = [
  {
    title: "¿Cuántas horas perdiste esta semana en diapositivas?",
    subtitle: "La audiencia recuerda tu mensaje, no tu diseño. Llega directo al punto.",
    min: 0,
    max: 0.22,
  },
  {
    title: "Tu idea merece ser escuchada.",
    subtitle: "Genera el contenido, refínalo y preséntalo. Sin atascarte en formatos.",
    min: 0.2,
    max: 0.42,
  },
  {
    title: "De la idea al escenario en minutos.",
    subtitle: "Slaim escribe contigo el guion, las notas de orador y las imágenes. Tú solo comunica.",
    min: 0.4,
    max: 0.62,
  },
  {
    title: "Presentaciones que enganchan. Cero estrés.",
    subtitle: "Menos tiempo en slides. Más impacto en la sala.",
    min: 0.6,
    max: 0.82,
  },
  {
    title: "Listo para presentar sin romperte la cabeza?",
    subtitle: "Descarga Slaim y deja que tu mensaje brille.",
    min: 0.78,
    max: 1,
  },
];

export default function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const getScrollProgress = useCallback((): number => {
    const section = sectionRef.current;
    if (!section) return 0;
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const winH = window.innerHeight;
    const progress = -rect.top / (sectionHeight - winH);
    return Math.max(0, Math.min(1, progress));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrollProgress(getScrollProgress());
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [getScrollProgress]);

  const p = scrollProgress;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#000]"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
      aria-label="Slaim: enfócate en comunicar, no en las diapositivas"
    >
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col md:flex-row bg-[#000]"
        style={{
          transform: `translate3d(0, ${p * PARALLAX_STICKY_Y}px, 0)`,
        }}
      >
        {/* Columna izquierda: texto (centrado y responsive) */}
        <div
          className="pointer-events-none flex-1 flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 md:pl-12 md:pr-8 lg:pl-16 lg:pr-12 min-w-0 order-2 md:order-1"
          style={{
            transform: `translate3d(0, ${p * PARALLAX_OVERLAY_Y}px, 0)`,
          }}
        >
          <div className="pointer-events-auto w-full max-w-xl text-white relative min-h-[200px] sm:min-h-[220px] flex flex-col justify-center items-center text-center">
            {HERO_SLIDES.map((slide, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-300 px-2 sm:px-0"
                style={{
                  opacity: textOpacity(p, slide.min, slide.max),
                  pointerEvents: textOpacity(p, slide.min, slide.max) > 0.5 ? "auto" : "none",
                }}
                aria-hidden={textOpacity(p, slide.min, slide.max) < 0.5}
              >
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight drop-shadow-lg leading-tight"
                  style={{ opacity: 1 - p * 0.15 }}
                >
                  {slide.title}
                </h1>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto">
                  {slide.subtitle}
                </p>
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-white/95 backdrop-blur-sm max-w-[95%] sm:max-w-none text-center">
                    <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                    Herramienta gratuita para la comunidad de desarrolladores
                  </span>
                </div>
                <div className="mt-4 sm:mt-6 flex justify-center w-full">
                  <DownloadCTA variant="hero" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha: video (completo, sin recortar) — placeholder mientras carga */}
        <div className="flex-1 min-w-0 relative bg-[#000] order-1 md:order-2 h-[40vh] md:h-full flex items-center justify-center p-4">
          {/* Placeholder: personaje mientras carga el video */}
          <img
            src={PLACEHOLDER_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
            style={{ opacity: videoReady ? 0 : 1 }}
            aria-hidden
            fetchPriority="high"
          />
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className="max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-500"
            style={{ opacity: videoReady ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            onCanPlay={() => setVideoReady(true)}
          />
        </div>

        {/* Cards a la derecha (posición original) */}
        <div className="absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3 max-w-[200px] pointer-events-none max-md:hidden">
          <div
            className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 text-white/95 text-sm shadow-xl transition-transform duration-200"
            style={{
              transform: `translateX(${(1 - textOpacity(p, 0.15, 0.4)) * 80}px)`,
              opacity: textOpacity(p, 0.12, 0.45),
            }}
          >
            <span className="font-semibold">Contenido</span>
            <br />
            <span className="text-white/80">Genera y refina tu mensaje</span>
          </div>
          <div
            className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 text-white/95 text-sm shadow-xl transition-transform duration-200"
            style={{
              transform: `translateX(${(1 - textOpacity(p, 0.4, 0.65)) * 80}px)`,
              opacity: textOpacity(p, 0.38, 0.7),
            }}
          >
            <span className="font-semibold">Speech y notas</span>
            <br />
            <span className="text-white/80">Tu guion y notas de orador</span>
          </div>
          <div
            className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 text-white/95 text-sm shadow-xl transition-transform duration-200"
            style={{
              transform: `translateX(${(1 - textOpacity(p, 0.65, 0.92)) * 80}px)`,
              opacity: textOpacity(p, 0.63, 0.95),
            }}
          >
            <span className="font-semibold">Imágenes</span>
            <br />
            <span className="text-white/80">Generación visual integrada</span>
          </div>
        </div>
      </div>
    </section>
  );
}
