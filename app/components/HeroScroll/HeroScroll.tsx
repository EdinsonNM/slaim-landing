"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  HiOutlineCode,
  HiOutlineLightningBolt,
  HiOutlineMicrophone,
} from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi2";
import DownloadCTA from "@/app/components/DownloadCTA/DownloadCTA";

const VIDEO_SRC = "/slaim-video.mp4";

const ROTATION_INTERVAL_MS = 4500;

const HERO_SLIDES: { title: string; subtitle: string }[] = [
  {
    title: "Presenta producto, marketing, demos o arquitectura con claridad.",
    subtitle:
      "Slides con IA que sirven para vender la idea, contar el roadmap o enseñar cómo funciona por dentro. Markdown, diagramas y código en un solo flujo.",
  },
  {
    title: "Del borrador al deck listo para la reunión, sin perder el hilo.",
    subtitle:
      "Gemini u OpenAI integrados, modo presentador con notas y guion sugerido. Exporta a .pptx o vídeo con el look de tu marca.",
  },
  {
    title: "Presentación de tu proyecto, propuesta comercial o reunión técnica: mismo lugar.",
    subtitle:
      "Imágenes coherentes, slides que se editan rápido y diagramas cuando hay que mostrar flujos o arquitectura sin marear a nadie.",
  },
  {
    title: "Cuando hace falta código, se ve bien. Cuando no, también.",
    subtitle:
      "Bloques con resaltado, Excalidraw y Mermaid para que el mensaje quede prolijo en sala, sea para clientes o para el equipo.",
  },
  {
    title: "¿Tu próxima presentación o demostración? Aquí la preparas y la presentas mejor.",
    subtitle:
      "App nativa con Tauri: ligera y rápida. Uso local gratis; cuenta opcional para la experiencia unificada.",
  },
];

const HERO_FEATURES: {
  Icon: typeof HiOutlineCode;
  title: string;
  desc: string;
}[] = [
  {
    Icon: HiOutlineCode,
    title: "Markdown y código",
    desc: "Para marketing, producto o ingeniería: slides que se leen bien en sala.",
  },
  {
    Icon: HiOutlineLightningBolt,
    title: "IA en el editor",
    desc: "Pasa de la idea al deck con texto, imágenes y estructura que avanzan contigo.",
  },
  {
    Icon: HiOutlineMicrophone,
    title: "Presentador y export",
    desc: "Notas, guion sugerido, .pptx y vídeo alineados a tu tema.",
  },
];

export default function HeroScroll() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuresListRef = useRef<HTMLUListElement>(null);
  const slideTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [targetSlide, setTargetSlide] = useState(0);
  const [displaySlide, setDisplaySlide] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTargetSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    const id = setInterval(tick, ROTATION_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Solo targetSlide en deps: si incluimos displaySlide, el cleanup mata la entrada al actualizar el texto.
  useLayoutEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!title || !subtitle) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      slideTimelineRef.current?.kill();
      slideTimelineRef.current = null;
      queueMicrotask(() => {
        setDisplaySlide(targetSlide);
      });
      gsap.set([title, subtitle], { autoAlpha: 1, y: 0 });
      return;
    }

    // displaySlide viene del render en el que cambió targetSlide; no añadir a deps
    // para no re-ejecutar el efecto al terminar la entrada y matar la timeline.
    if (targetSlide === displaySlide) return;

    slideTimelineRef.current?.kill();

    const tl = gsap.timeline();
    slideTimelineRef.current = tl;

    tl.to([title, subtitle], {
      autoAlpha: 0,
      y: -14,
      duration: 0.38,
      stagger: 0.06,
      ease: "power2.in",
    })
      .call(() => {
        flushSync(() => {
          setDisplaySlide(targetSlide);
        });
      })
      .fromTo(
        [title, subtitle],
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
        },
      );

    return () => {
      tl.kill();
      gsap.set([title, subtitle], { autoAlpha: 1, y: 0 });
    };
  }, [targetSlide]); // eslint-disable-line react-hooks/exhaustive-deps -- displaySlide omitido a propósito (evita matar la timeline al entrar)

  useLayoutEffect(() => {
    const list = featuresListRef.current;
    if (!list) return;

    const items = Array.from(
      list.querySelectorAll<HTMLLIElement>(":scope > li"),
    );
    if (items.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.25,
        },
      );
    }, list);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (mq.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {});
      }
    };

    syncPlayback();
    mq.addEventListener("change", syncPlayback);
    return () => mq.removeEventListener("change", syncPlayback);
  }, []);

  const activeSlide = HERO_SLIDES[displaySlide];

  return (
    <section
      id="contenido-principal"
      className="relative isolate min-h-[100dvh] bg-white font-[family-name:var(--font-body-landing)]"
      aria-label="Slaim: presentaciones con Markdown, diagramas e IA para producto, marketing y equipos técnicos"
    >
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[90rem] flex-col justify-between px-5 pb-8 pt-[5.75rem] sm:px-8 sm:px-10 sm:pt-28 md:px-12 md:pt-32 lg:px-16">
        <div className="flex min-h-0 flex-1 flex-col justify-center py-6 sm:py-8">
          {/* Texto a la izquierda, tarjeta de vídeo a la derecha (en columna en móvil) */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 sm:mb-8 sm:text-xs">
              Tauri · React 19 · licencia MIT
            </p>

            <h1
              ref={titleRef}
              className="max-w-2xl font-[family-name:var(--font-serif-hero)] text-[2rem] font-normal leading-[1.08] tracking-[-0.02em] text-zinc-900 sm:text-5xl md:text-[3.25rem] md:leading-[1.06] lg:max-w-[40rem] xl:max-w-[48rem]"
            >
              {activeSlide.title}
            </h1>

            <p
              ref={subtitleRef}
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:mt-6 sm:text-lg lg:mx-0 lg:max-w-xl xl:max-w-2xl"
            >
              {activeSlide.subtitle}
            </p>

            <div
              className="mt-6 flex items-center justify-center gap-2 sm:mt-7 lg:justify-start"
              aria-hidden
            >
              {HERO_SLIDES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                    i === displaySlide ? "w-7 bg-zinc-900" : "w-1 bg-zinc-300"
                  }`}
                />
              ))}
            </div>

            <div
              id="descargar"
              className="mt-9 flex w-full justify-center sm:mt-10 md:mt-11 lg:justify-start"
            >
              <DownloadCTA variant="hero" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-xl lg:justify-self-end xl:max-w-2xl 2xl:max-w-[40rem]">
            <div
              className="pointer-events-none absolute inset-0 -z-10 overflow-visible motion-reduce:opacity-60"
              aria-hidden
            >
              <div className="absolute left-[6%] top-[18%] h-56 w-56 rounded-full bg-rose-200/50 blur-[72px] sm:h-64 sm:w-64 sm:blur-[88px] motion-reduce:blur-2xl" />
              <div className="absolute right-[4%] top-[32%] h-52 w-52 rounded-full bg-emerald-200/45 blur-[68px] sm:h-60 sm:w-60 motion-reduce:blur-2xl" />
              <div className="absolute bottom-[8%] left-[38%] h-48 w-48 rounded-full bg-violet-200/35 blur-[64px] motion-reduce:blur-2xl" />
            </div>

            <div className="relative overflow-hidden rounded-[1.65rem] bg-transparent shadow-[0_28px_80px_-28px_rgba(15,23,42,0.18)] ring-1 ring-zinc-200/90 sm:rounded-[2rem]">
              <div className="relative aspect-[4/3] w-full sm:aspect-video">
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 motion-reduce:transition-none ${
                    videoReady ? "opacity-100" : "opacity-0"
                  }`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onCanPlay={() => setVideoReady(true)}
                />
                {!videoReady ? (
                  <div
                    className="absolute inset-0 bg-zinc-200 motion-reduce:animate-none"
                    aria-hidden
                  />
                ) : null}
                {/* Degradado casi imperceptible: solo un leve apoyo si el vídeo oscurece la esquina */}
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[min(7rem,28%)] bg-gradient-to-r from-black/[0.07] to-transparent sm:w-[min(7.5rem,30%)] sm:from-black/[0.09]"
                  aria-hidden
                />
                {/* Línea de acento a altura completa de la tarjeta */}
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[3px] bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 sm:w-1"
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] px-5 pb-3 pl-4 pt-5 sm:px-7 sm:pb-4 sm:pl-5 sm:pt-6">
                  <p className="font-[family-name:var(--font-serif-hero)] text-[1.65rem] font-normal leading-[1.05] tracking-[-0.02em] text-lime-600 [text-shadow:0_1px_0_rgba(255,255,255,0.5)] sm:text-[1.85rem] sm:text-lime-500 md:text-3xl md:text-lime-500">
                    Slaim
                  </p>
                  <p className="mt-2 max-w-[11rem] text-[13px] leading-snug text-zinc-500/90 [text-shadow:0_1px_0_rgba(255,255,255,0.55)] sm:mt-2.5 sm:max-w-[14rem] sm:text-sm sm:leading-relaxed sm:text-zinc-500">
                    Presentaciones con Markdown, diagramas e IA: para clientes, marketing y mostrar cómo funciona tu producto.
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute bottom-2 right-2.5 z-[3] rounded border border-zinc-300/60 bg-white/45 px-1.5 py-0.5 font-mono text-[10px] font-medium tabular-nums text-zinc-500 backdrop-blur-[2px] sm:bottom-2.5 sm:right-3 sm:text-[11px]"
                  aria-hidden
                >
                  1
                </span>
              </div>
            </div>
          </div>
          </div>

          {/* Tres columnas de valor */}
          <ul
            ref={featuresListRef}
            className="mx-auto mt-14 grid w-full max-w-3xl gap-10 text-center sm:mt-16 sm:max-w-none sm:grid-cols-3 sm:gap-8 md:gap-10"
          >
            {HERO_FEATURES.map(({ Icon, title, desc }) => (
              <li key={title} className="flex flex-col items-center px-2">
                <span className="mb-4 flex size-11 items-center justify-center rounded-full border border-zinc-200/90 bg-white text-zinc-700 shadow-[0_10px_28px_-12px_rgba(244,63,94,0.35),0_4px_14px_-6px_rgba(15,23,42,0.08)]">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold tracking-tight text-zinc-900">
                  {title}
                </span>
                <span className="mt-2 max-w-[16rem] text-sm leading-relaxed text-zinc-600 sm:max-w-none">
                  {desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 justify-center pt-6 sm:pt-8">
          <a
            href="#vista-previa"
            className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-medium text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Ver la app
            <HiChevronDown className="size-4 shrink-0 opacity-70" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
