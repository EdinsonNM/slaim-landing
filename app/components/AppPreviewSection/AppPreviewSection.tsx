"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const PREVIEW_IMAGES = [
  {
    src: "/slaim-app-01.png",
    alt: "Slaim: pantalla de configuración de API con Google Gemini y OpenAI, botón Continuar.",
    description:
      "Configura tu API: necesitas al menos una clave (Google Gemini u OpenAI) para generar presentaciones e imágenes. Puedes usar Gemini, OpenAI o ambas; OpenAI con DALL-E 3 es opcional para las imágenes.",
  },
  {
    src: "/slaim-app-02.png",
    alt: "Slaim: pantalla principal con barra de búsqueda y carrusel de presentaciones.",
    description:
      "Escribe sobre qué quieres hablar (texto o voz) y Slaim genera el plan y las diapositivas. Tus presentaciones aparecen en tarjetas con título, número de diapositivas y fecha; puedes navegar, duplicar o eliminar.",
  },
  {
    src: "/slaim-app-03.png",
    alt: "Slaim: diapositiva «El Desafío de los LLMs Tradicionales» con ilustración y panel de diapositivas.",
    description:
      "Cada diapositiva puede incluir texto e ilustraciones generadas por IA. Slaim aborda limitaciones de los LLMs tradicionales (alucinaciones, información desactualizada) para ofrecer contenido más fiable.",
  },
  {
    src: "/slaim-app-04.png",
    alt: "Slaim: editor de diagramas con herramientas, canvas y diapositivas.",
    description:
      "Además de diapositivas con texto, puedes crear diagramas: formas, flechas, texto e ilustraciones. Herramientas de dibujo, lienzo y navegación entre diapositivas para explicar conceptos de forma visual.",
  },
  {
    src: "/slaim-app-05.png",
    alt: "Slaim: diapositiva «Introducción» sobre Patrones de Diseño RAG.",
    description:
      "Vista previa de una diapositiva de ejemplo: título, texto e ilustración generados por Slaim para una presentación.",
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
        <h2 className="mb-3 text-center font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
          Así se ve Slaim
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center font-[family-name:var(--font-body-landing)] text-sm text-zinc-600 sm:mb-12 sm:text-base">
          Escribe tu tema, elige el modelo y crea presentaciones en minutos.
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
                    i === index ? "w-5 bg-zinc-900" : "w-2 bg-zinc-300 hover:bg-zinc-400"
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
