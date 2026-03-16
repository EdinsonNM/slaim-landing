"use client";

import { useEffect, useRef, useState } from "react";
import DownloadCTA from "@/app/components/DownloadCTA/DownloadCTA";

const VIDEO_SRC = "/video.mp4";
const PLACEHOLDER_IMAGE = "/character.png";

/** Intervalo en ms entre cambios de titular */
const ROTATION_INTERVAL_MS = 4500;

/** Titulares que rotan cada cierto tiempo */
const HERO_SLIDES: { title: string; subtitle: string }[] = [
  {
    title: "¿Cuántas horas perdiste esta semana en diapositivas?",
    subtitle: "La audiencia recuerda tu mensaje, no tu diseño. Llega directo al punto.",
  },
  {
    title: "Tu idea merece ser escuchada.",
    subtitle: "Genera el contenido, refínalo y preséntalo. Sin atascarte en formatos.",
  },
  {
    title: "De la idea al escenario en minutos.",
    subtitle: "Slaim escribe contigo el guion, las notas de orador y las imágenes. Tú solo comunica.",
  },
  {
    title: "Presentaciones que enganchan. Cero estrés.",
    subtitle: "Menos tiempo en slides. Más impacto en la sala.",
  },
  {
    title: "Listo para presentar sin romperte la cabeza?",
    subtitle: "Descarga Slaim y deja que tu mensaje brille.",
  },
];

const HERO_CARDS = [
  { label: "Contenido", desc: "Genera y refina tu mensaje" },
  { label: "Speech y notas", desc: "Tu guion y notas de orador" },
  { label: "Imágenes", desc: "Generación visual integrada" },
];

export default function HeroScroll() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const cardIndex = Math.min(
    Math.floor((currentSlide / HERO_SLIDES.length) * HERO_CARDS.length),
    HERO_CARDS.length - 1
  );

  return (
    <section
      className="relative w-full h-screen bg-black/70"
      aria-label="Slaim: enfócate en comunicar, no en las diapositivas"
    >
      <div className="relative w-full h-full overflow-hidden flex flex-col md:flex-row">
        {/* Gradiente suave a la izquierda para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none z-0" aria-hidden />
        {/* Columna izquierda: texto que rota cada cierto tiempo */}
        <div className="pointer-events-none flex-1 flex flex-col justify-start md:justify-center items-center pt-2 sm:pt-4 md:pt-0 px-4 sm:px-6 md:px-10 md:pl-12 md:pr-8 lg:pl-16 lg:pr-12 min-w-0 order-2 md:order-1">
          {/* Altura fija: reserva espacio para el slide más alto y evita saltos sin cortar texto */}
          <div className="w-full max-w-xl text-white relative h-[320px] sm:h-[360px] md:h-[380px] flex flex-col justify-center items-center text-center">
            {HERO_SLIDES.map((slide, i) => {
              const isActive = currentSlide === i;
              const isPast = i < currentSlide;
              return (
              <div
                key={i}
                className="absolute inset-0 flex flex-col justify-center items-center text-center px-2 sm:px-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : isPast ? "translateY(-12px)" : "translateY(12px)",
                  transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out",
                  pointerEvents: isActive ? "auto" : "none",
                }}
                aria-hidden={!isActive}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight drop-shadow-lg leading-tight">
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
                <div className="mt-4 sm:mt-6 flex justify-center w-full pointer-events-auto relative z-10">
                  <DownloadCTA variant="hero" />
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Columna derecha: video — sin fondo opaco para que se vea Antigravity detrás */}
        <div className="flex-1 min-w-0 relative order-1 md:order-2 h-[40vh] md:h-full flex items-center justify-center p-4">
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

        {/* Cards en la esquina inferior derecha, en fila horizontal */}
        <div className="absolute right-4 sm:right-8 md:right-12 bottom-6 sm:bottom-8 md:bottom-10 z-10 flex flex-row flex-wrap gap-2 sm:gap-3 pointer-events-none max-md:hidden">
          {HERO_CARDS.map((card, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 text-white/95 text-sm shadow-xl transition-all duration-500"
              style={{
                opacity: cardIndex === i ? 1 : 0.35,
                transform: cardIndex === i ? "translateX(0)" : "translateX(20px)",
              }}
            >
              <span className="font-semibold">{card.label}</span>
              <br />
              <span className="text-white/80">{card.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
