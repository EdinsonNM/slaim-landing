"use client";

import gsap from "gsap";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCubeTransparent,
  HiOutlinePencilSquare,
  HiOutlinePresentationChartLine,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

const SLIDE_COUNT = 4;
const AUTO_MS = 6400;

type SlideDef = {
  key: string;
  kicker: string;
  title: string;
  body: string;
  surface: string;
  image: { src: string; alt: string };
  Icon: typeof HiOutlineCubeTransparent;
};

/** Mismas rutas que `AppPreviewSection` (capturas reales de la app). */
const SLIDES: SlideDef[] = [
  {
    key: "presentador-3d",
    kicker: "Vista presentador",
    title: "Presentador con escena 3D",
    body: "Ventana de presentación con slide actual, siguiente, notas y chat — y un viewport 3D que encuadra el dispositivo en la escena para ensayar o presentar con sensación espacial, sin perder el foco en el contenido técnico.",
    surface: "bg-[#e8f5f1]",
    image: {
      src: "/slaim-app-03.jpeg",
      alt: "Slaim: diapositiva en el editor con contenido e ilustración.",
    },
    Icon: HiOutlinePresentationChartLine,
  },
  {
    key: "canvas-3d",
    kicker: "Slides 3D",
    title: "Canvas y panel 3D en el editor",
    body: "Trabaja con slides en perspectiva 3D desde el editor: panel dedicado y viewport con autoencuadre y límites para que el dispositivo encaje en la escena. Ideal para previews de producto o narrativas donde el “stage” importa tanto como el bullet.",
    surface: "bg-[#e8eff5]",
    image: {
      src: "/slaim-app-06.jpeg",
      alt: "Slaim: carga de modelo 3D para usar en las diapositivas.",
    },
    Icon: HiOutlineCubeTransparent,
  },
  {
    key: "isometrico-redes",
    kicker: "Topología y flujos",
    title: "Diagrama isométrico para redes",
    body: "Tipo de contenido isométrico pensado para esquemas de red y flujos: cajas, enlaces y lectura clara de arquitectura en un lienzo dedicado. Complementa el resto del deck cuando necesitas explicar capas, zonas o tráfico sin mezclarlo con texto plano.",
    surface: "bg-[#f0eff5]",
    image: {
      src: "/slaim-app-05.jpeg",
      alt: "Slaim: diagrama de redes isométrico para arquitecturas y flujos.",
    },
    Icon: HiOutlineSquares2X2,
  },
  {
    key: "excalidraw",
    kicker: "Sketch técnico",
    title: "Excalidraw dentro de la slide",
    body: "Tipo de slide diagrama con Excalidraw integrado: arquitecturas, APIs y flujos a mano alzada con el mismo estilo de boceto que ya conoces, exportable junto al tema visual del deck a presentación o vídeo.",
    surface: "bg-[#f5f0ea]",
    image: {
      src: "/slaim-app-07.jpeg",
      alt: "Slaim: diagrama con Excalidraw dentro de la diapositiva.",
    },
    Icon: HiOutlinePencilSquare,
  },
];

export default function HighlightsCarouselSection() {
  const baseId = useId();
  const regionRef = useRef<HTMLDivElement>(null);
  const imageStageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);

  const go = useCallback((dir: -1 | 1) => {
    setIndex((i) => (i + dir + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || hoverPaused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDE_COUNT);
    }, AUTO_MS);
    return () => window.clearInterval(t);
  }, [reduceMotion, hoverPaused]);

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go]);

  const slide = SLIDES[index];
  const Icon = slide.Icon;
  const labelId = `${baseId}-label`;
  const slideId = `${baseId}-slide`;

  useLayoutEffect(() => {
    const stage = imageStageRef.current;
    if (!stage) return;

    if (reduceMotion) {
      gsap.killTweensOf(stage);
      gsap.set(stage, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        transformPerspective: 1100,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.killTweensOf(stage);
      gsap.fromTo(
        stage,
        {
          transformPerspective: 1100,
          rotationY: -26,
          rotationX: 6,
          x: 48,
          y: 10,
          autoAlpha: 0,
          scale: 0.94,
        },
        {
          transformPerspective: 1100,
          rotationY: 0,
          rotationX: 0,
          x: 0,
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.72,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(stage, {
              rotationY: 2.2,
              rotationX: -0.8,
              y: -4,
              duration: 2.4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          },
        },
      );
    }, stage);

    return () => {
      ctx.revert();
    };
  }, [index, slide.key, reduceMotion]);

  return (
    <section
      id="destacados"
      className="scroll-mt-24 border-t border-zinc-200/80 bg-white pb-0"
      aria-labelledby={labelId}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      <div
        ref={regionRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carrusel"
        aria-labelledby={labelId}
        aria-label="Destacados: presentador 3D, canvas 3D, diagrama isométrico y Excalidraw"
        className="outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        <div
          className={`relative left-1/2 w-screen max-w-none -translate-x-1/2 border-t border-zinc-200/60 transition-[background-color] duration-500 ease-out ${slide.surface}`}
        >
          <div className="mx-auto max-w-3xl px-4 pt-14 text-center sm:px-6 sm:pt-20 md:pt-24">
            <p className="font-[family-name:var(--font-body-landing)] text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
              Experiencia en el lienzo
            </p>
            <h2
              id={labelId}
              className="mt-3 font-[family-name:var(--font-serif-hero)] text-3xl font-normal leading-tight tracking-[-0.02em] text-zinc-900 sm:text-4xl"
            >
              Herramientas que se notan al presentar y al diseñar
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-body-landing)] text-sm leading-relaxed text-zinc-700 sm:text-base">
              Capturas reales de la app (como en la vista previa), con un vistazo
              3D al cambiar de destacado.
            </p>
          </div>

          <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-4 px-4 pb-10 pt-8 sm:flex-row sm:items-center sm:gap-3 sm:px-6 sm:pb-12 sm:pt-10 md:pb-14 md:pt-12">
            <button
              type="button"
              className="order-2 hidden size-10 shrink-0 items-center justify-center rounded-full border border-zinc-200/80 bg-white/50 text-zinc-400 shadow-none backdrop-blur-sm transition hover:border-zinc-300/90 hover:bg-white/85 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 motion-safe:active:scale-[0.97] sm:order-1 sm:mx-0 sm:inline-flex sm:self-center"
              aria-controls={slideId}
              aria-label="Destacado anterior"
              onClick={() => go(-1)}
            >
              <HiChevronLeft className="size-[1.15rem]" strokeWidth={1.75} aria-hidden />
            </button>

            <div className="order-1 flex min-w-0 flex-1 flex-col gap-8 sm:order-2 lg:flex-row lg:items-center lg:gap-10">
              <article
                id={slideId}
                aria-live={reduceMotion ? "off" : "polite"}
                aria-atomic="true"
                className="min-w-0 flex-1 lg:max-w-[26rem]"
              >
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <span
                    className="mb-4 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-zinc-900/10 bg-white/90 text-zinc-900 shadow-sm backdrop-blur-sm"
                    aria-hidden
                  >
                    <Icon className="size-7" />
                  </span>
                  <p className="font-[family-name:var(--font-body-landing)] text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                    {slide.kicker}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-serif-hero)] text-2xl font-normal leading-snug tracking-[-0.02em] text-zinc-900 sm:text-[1.65rem]">
                    {slide.title}
                  </h3>
                  <p className="mt-3 font-[family-name:var(--font-body-landing)] text-sm leading-relaxed text-zinc-700 sm:text-[0.95rem]">
                    {slide.body}
                  </p>
                </div>
              </article>

              <div className="relative mx-auto w-full max-w-lg flex-1 [perspective:1100px] [perspective-origin:50%_40%] lg:mx-0 lg:max-w-md">
                <div
                  ref={imageStageRef}
                  key={slide.key}
                  className="will-change-transform [transform-style:preserve-3d]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-900/10 bg-white/60 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] ring-1 ring-white/50 backdrop-blur-[2px]">
                    <button
                      type="button"
                      className="absolute left-1.5 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/35 text-zinc-500 shadow-sm backdrop-blur-md transition hover:bg-white/65 hover:text-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 motion-safe:active:scale-[0.97] sm:hidden"
                      aria-controls={slideId}
                      aria-label="Destacado anterior"
                      onClick={() => go(-1)}
                    >
                      <HiChevronLeft className="size-4 opacity-90" aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="absolute right-1.5 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/35 text-zinc-500 shadow-sm backdrop-blur-md transition hover:bg-white/65 hover:text-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 motion-safe:active:scale-[0.97] sm:hidden"
                      aria-controls={slideId}
                      aria-label="Siguiente destacado"
                      onClick={() => go(1)}
                    >
                      <HiChevronRight className="size-4 opacity-90" aria-hidden />
                    </button>
                    <Image
                      src={slide.image.src}
                      alt={slide.image.alt}
                      fill
                      className="object-contain object-top"
                      sizes="(max-width: 768px) 100vw, 420px"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="order-3 hidden size-10 shrink-0 items-center justify-center rounded-full border border-zinc-200/80 bg-white/50 text-zinc-400 shadow-none backdrop-blur-sm transition hover:border-zinc-300/90 hover:bg-white/85 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 motion-safe:active:scale-[0.97] sm:mx-0 sm:inline-flex sm:self-center"
              aria-controls={slideId}
              aria-label="Siguiente destacado"
              onClick={() => go(1)}
            >
              <HiChevronRight className="size-[1.15rem]" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <div className="mx-auto max-w-3xl px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-7">
            <div
              className="flex flex-wrap items-center justify-center gap-2"
              aria-label="Ir a un destacado"
            >
              {SLIDES.map((s, i) => {
                const selected = i === index;
                return (
                  <button
                    key={s.key}
                    type="button"
                    aria-current={selected ? true : undefined}
                    aria-controls={slideId}
                    aria-label={`Mostrar: ${s.title}`}
                    className={`min-h-10 min-w-10 rounded-full px-3 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white/90 sm:text-sm ${
                      selected
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "border border-zinc-900/10 bg-white/80 text-zinc-800 shadow-sm hover:bg-white"
                    }`}
                    onClick={() => setIndex(i)}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-center font-[family-name:var(--font-body-landing)] text-[11px] leading-relaxed text-zinc-600">
              {reduceMotion
                ? "Animación 3D desactivada con “reducir movimiento” del sistema."
                : hoverPaused
                  ? "Avance automático en pausa al pasar el ratón por la sección."
                  : "Los destacados avanzan solos; pausa al pasar el ratón."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
