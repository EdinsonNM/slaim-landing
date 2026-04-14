const PILLS = [
  { label: "Markdown" },
  { label: "React 19" },
  { label: "Tauri 2" },
  { label: "Mermaid" },
  { label: "Excalidraw" },
  { label: "Export .pptx" },
  { label: "Vídeo (Remotion)" },
  { label: "Gemini" },
  { label: "OpenAI" },
  { label: "Tema del deck" },
  { label: "SQLite local" },
] as const;

const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-0"];

export default function StackPillsSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-zinc-200/80 bg-[#f4f5f7] px-4 py-20 sm:px-6 sm:py-24 md:py-28"
      aria-labelledby="stack-titulo"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_#93c5fd_0%,_transparent_65%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 font-[family-name:var(--font-body-landing)] text-[11px] font-medium uppercase tracking-wide text-zinc-600 shadow-sm">
          Tu stack, tu narrativa
        </span>
        <h2
          id="stack-titulo"
          className="mt-5 font-[family-name:var(--font-serif-hero)] text-3xl font-normal leading-tight tracking-[-0.02em] text-zinc-900 sm:text-4xl"
        >
          ¿Qué encaja en un deck con Slaim?
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-body-landing)] text-sm leading-relaxed text-zinc-600 sm:text-base">
          Desde bloques de código hasta diagramas y export listo para compartir
          con el equipo o grabar la charla.
        </p>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-2.5 sm:gap-3 md:max-w-3xl">
          {PILLS.map((pill, i) => (
            <span
              key={pill.label}
              className={`inline-flex items-center rounded-full border border-zinc-200/90 bg-white px-3.5 py-2 font-[family-name:var(--font-body-landing)] text-xs font-medium text-zinc-800 shadow-sm sm:text-sm ${ROTATIONS[i % ROTATIONS.length]} motion-reduce:rotate-0`}
            >
              <span
                className="mr-2 inline-block size-2 rounded-full bg-zinc-300 ring-2 ring-white"
                aria-hidden
              />
              {pill.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
