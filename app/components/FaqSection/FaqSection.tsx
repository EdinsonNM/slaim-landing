"use client";

import { useId, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const FAQS = [
  {
    q: "¿Qué es Slaim?",
    a: "Slaim es una aplicación de escritorio (Tauri) para crear presentaciones técnicas con ayuda de IA: Markdown, código con resaltado, diagramas Excalidraw, Mermaid y export a PowerPoint o vídeo. Está pensada para desarrolladores y equipos que necesitan explicar arquitecturas, APIs o flujos sin quedar atrapados en herramientas solo decorativas.",
  },
  {
    q: "¿Necesito API keys o cuenta?",
    a: "Para generar contenido con IA necesitas al menos una clave de Google Gemini u OpenAI, configurable dentro de la app (no hace falta .env). El inicio de sesión con Google es opcional: puedes usar Slaim 100 % en local.",
  },
  {
    q: "¿Qué diferencia a Slaim de PowerPoint o Google Slides?",
    a: "PowerPoint y Slides brillan cuando el mensaje es genérico y el diseño lo es todo. Slaim nace para lo contrario: cuando tu historia es código en vivo, arquitecturas que cambian, demos de producto y diagramas que no quieres “dibujar a mano” en cajas y conectores que se rompen al mínimo cambio. Aquí el contenido es dinámico de verdad — Markdown, bloques técnicos, IA que te ayuda a generar y reescribir sin salir del flujo — y los diagramas fluyen: Excalidraw en la slide, Mermaid cuando quieres acelerar, isometría y vistas 3D cuando necesitas que la sala entienda topología, APIs o el “por qué” de tu software. Es la herramienta para equipos que venden y construyen tecnología: menos plantilla decorativa, más claridad para presentar arquitecturas, roadmaps técnicos y narrativas de producto que merecen el mismo rigor que tu repo.",
  },
  {
    q: "¿En qué sistemas está disponible?",
    a: "Binarios publicados en GitHub Releases para Windows, macOS (Intel y Apple Silicon) y Linux x86_64, según el README del proyecto slides-for-devs.",
  },
  {
    q: "¿Es de código abierto?",
    a: "Parte del proyecto es open source bajo licencia MIT: puedes usarlo, adaptarlo y contribuir. Los detalles y el flujo de contribución están en el repositorio en GitHub.",
  },
] as const;

export default function FaqSection() {
  const idBase = useId();
  const [open, setOpen] = useState<number>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-zinc-200/80 bg-[#f9f9fa] px-4 py-20 sm:px-6 sm:py-24 md:py-28"
      aria-labelledby="faq-titulo"
    >
      <div className="mx-auto max-w-2xl">
        <h2
          id="faq-titulo"
          className="text-center font-[family-name:var(--font-serif-hero)] text-3xl font-normal leading-[1.12] tracking-[-0.02em] text-zinc-900 sm:text-4xl"
        >
          ¿Dudas?
          <br />
          Aquí van respuestas directas.
        </h2>

        <div className="mt-12 space-y-3">
          {FAQS.map((item, index) => {
            const expanded = open === index;
            const panelId = `${idBase}-panel-${index}`;
            const buttonId = `${idBase}-trigger-${index}`;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-zinc-200/90 bg-white shadow-[0_8px_30px_-18px_rgba(15,23,42,0.12)]"
              >
                <h3 className="text-base font-medium text-zinc-900">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-4 text-left font-[family-name:var(--font-body-landing)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f9fa] sm:px-5"
                    onClick={() => setOpen(expanded ? -1 : index)}
                  >
                    <span className="min-w-0 pr-2">{item.q}</span>
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-transform duration-200 motion-reduce:transition-none ${
                        expanded ? "-rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      <HiChevronDown className="size-5" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={
                    expanded
                      ? "px-4 pb-4 sm:px-5 sm:pb-5"
                      : "hidden px-4 pb-0 sm:px-5"
                  }
                >
                  <p className="font-[family-name:var(--font-body-landing)] text-sm leading-relaxed text-zinc-600">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
