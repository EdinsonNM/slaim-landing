"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const PREVIEW_IMAGES = [
  {
    src: "/slaim-app-01.jpeg",
    alt: "Slaim: Inicia sesión con Google o continua como invitado.",
    description:
      "Inicia sesión con Google o continua como invitado. Slaim te permite usar Gemini, OpenAI o ambas; OpenAI con DALL-E 3 es opcional para las imágenes.",
  },
  {
    src: "/slaim-app-02.jpeg",
    alt: "Slaim: Escribe sobre qué quieres hablar (texto o voz) y Slaim genera el plan y las diapositivas.",
    description:
      "Escribe sobre qué quieres hablar (texto o voz) y Slaim genera el plan y las diapositivas. Tus presentaciones aparecen en tarjetas con título, número de diapositivas y fecha; puedes navegar, duplicar o eliminar.",
  },
  {
    src: "/slaim-app-03.jpeg",
    alt: "Slaim: Genera diapositivas con texto e ilustraciones generadas por IA.",
    description:
      "Genera diapositivas con texto e ilustraciones generadas por IA. Slaim aborda limitaciones de los LLMs tradicionales (alucinaciones, información desactualizada) para ofrecer contenido más fiable.",
  },
  {
    src: "/slaim-app-04.jpeg",
    alt: "Slaim: Crea slides con diferentes tipos de contenido: texto, código, diagramas, imágenes y personajes reutilizables.",
    description:
      "Además de diapositivas con texto, puedes crear diagramas: formas, flechas, texto e ilustraciones. Herramientas de dibujo, lienzo y navegación entre diapositivas para explicar conceptos de forma visual.",
  },
  {
    src: "/slaim-app-05.jpeg",
    alt: "Slaim: Crea diagramas de redes isométricos para explicar arquitecturas y flujos.",
    description:
      "Crea diagramas de redes isométricos para explicar arquitecturas y flujos. Slaim te permite usar personajes reutilizables para imágenes coherentes, matriz editable en slide y actualizador desde GitHub Releases.",
  },
  {
    src: "/slaim-app-06.jpeg",
    alt: "Slaim: Carga tu modelo 3D favorito para usar en las diapositivas.",
    description:
      "Carga tu modelo 3D favorito para usar en las diapositivas. Slaim te permite usar personajes reutilizables para imágenes coherentes, matriz editable en slide y actualizador desde GitHub Releases.",
  },
  {
    src: "/slaim-app-07.jpeg",
    alt: "Slaim: Crea diagramas con excalidraw dentro de la diapositiva.",
    description:
      "Crea diagramas con excalidraw dentro de la diapositiva. Slaim te permite usar personajes reutilizables para imágenes coherentes, matriz editable en slide y actualizador desde GitHub Releases.",
  },
];

const ROTATE_MS = 4500;

export default function AppPreviewSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % PREVIEW_IMAGES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="vista-previa"
      className="w-full border-t border-zinc-200 bg-white py-16 sm:py-20 md:py-24 px-4"
      aria-label="Vista previa de la aplicación Slaim"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-3 text-center font-[family-name:var(--font-serif-hero)] text-3xl font-normal tracking-tight text-zinc-900 sm:text-4xl md:text-[2.5rem]">
          Así se ve en la app
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center font-[family-name:var(--font-body-landing)] text-sm leading-relaxed text-zinc-600 sm:mb-12 sm:text-base">
          Configuración de API keys, home con tus decks, editor de diapositivas
          y lienzo de diagramas — el mismo producto descrito en el README de{" "}
          <span className="whitespace-nowrap text-zinc-800">
            slides-for-devs
          </span>
          .
        </p>

        {/* Carrusel de imágenes con transición */}
        <div className="relative aspect-[16/10] min-h-[240px] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm sm:min-h-[280px] sm:rounded-2xl">
          {PREVIEW_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className="absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{
                opacity: i === index ? 1 : 0,
                pointerEvents: i === index ? "auto" : "none",
              }}
              aria-hidden={i !== index}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain object-top"
                sizes="(max-width: 768px) 100vw, 896px"
                priority={i === 0}
              />
            </div>
          ))}
          {/* Indicadores */}
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
            <div className="flex gap-1.5 rounded-full border border-zinc-200/80 bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur-sm">
              {PREVIEW_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-5 bg-zinc-900"
                      : "w-2 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Ver captura ${i + 1} de ${PREVIEW_IMAGES.length}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Descripción que explica cómo funciona la app en esta pantalla */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-zinc-600 sm:text-base">
          {PREVIEW_IMAGES[index].description}
        </p>
      </div>
    </section>
  );
}
