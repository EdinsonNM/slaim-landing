import {
  HiOutlineCode,
  HiOutlineLightningBolt,
  HiOutlinePhotograph,
} from "react-icons/hi";

const CARDS = [
  {
    title: "IA integrada",
    description:
      "Genera el deck completo desde un tema con Gemini u OpenAI, reescribe slides y crea código o imágenes sin salir del editor.",
    Icon: HiOutlineLightningBolt,
    tint: "bg-[#e8f5f1]",
    innerLabel: "Modelos",
    innerHighlight: "Gemini · OpenAI",
  },
  {
    title: "Markdown y código",
    description:
      "Diapositivas con syntax highlighting, bloques configurables y contenido pensado para explicar APIs, arquitecturas y flujos.",
    Icon: HiOutlineCode,
    tint: "bg-[#e8eff5]",
    innerLabel: "Editor",
    innerHighlight: "MD + código",
  },
  {
    title: "Diagramas y medios",
    description:
      "Excalidraw en la slide, Mermaid asistido por IA, imágenes con personajes reutilizables y export coherente con el tema del deck.",
    Icon: HiOutlinePhotograph,
    tint: "bg-[#f0eff5]",
    innerLabel: "Canvas",
    innerHighlight: "Excalidraw",
  },
] as const;

export default function FeaturesBentoSection() {
  return (
    <section
      id="caracteristicas"
      className="scroll-mt-24 border-t border-zinc-200/80 bg-[#f7f7f8] px-4 py-20 sm:px-6 sm:py-24 md:py-28"
      aria-labelledby="caracteristicas-titulo"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-center font-[family-name:var(--font-body-landing)] text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Hecha para equipos técnicos
        </p>
        <h2
          id="caracteristicas-titulo"
          className="mx-auto max-w-3xl text-center font-[family-name:var(--font-serif-hero)] text-3xl font-normal leading-tight tracking-[-0.02em] text-zinc-900 sm:text-4xl md:text-[2.65rem]"
        >
          Presentaciones técnicas con IA, sin perder el foco en el código.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-[family-name:var(--font-body-landing)] text-sm leading-relaxed text-zinc-600 sm:text-base">
          Slaim es una app de escritorio (Tauri) para crear decks con Markdown,
          diagramas y export a PowerPoint o vídeo — pensada para devs, tech
          leads y quien necesite explicar lo técnico con claridad.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CARDS.map(
            ({ title, description, Icon, tint, innerLabel, innerHighlight }) => (
              <article
                key={title}
                className={`flex flex-col rounded-2xl ${tint} p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-black/[0.04] sm:p-7`}
              >
                <div className="mx-auto mb-6 flex w-full max-w-[220px] flex-col items-center rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200/80">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    {innerLabel}
                  </span>
                  <span className="mt-1 text-center font-[family-name:var(--font-serif-hero)] text-lg text-zinc-900">
                    {innerHighlight}
                  </span>
                  <span
                    className="mt-3 flex size-12 items-center justify-center rounded-full bg-zinc-50 text-zinc-700 ring-1 ring-zinc-200/90"
                    aria-hidden
                  >
                    <Icon className="size-6" />
                  </span>
                </div>
                <h3 className="text-center font-[family-name:var(--font-serif-hero)] text-xl font-normal text-zinc-900">
                  {title}
                </h3>
                <p className="mt-3 text-center font-[family-name:var(--font-body-landing)] text-sm leading-relaxed text-zinc-600">
                  {description}
                </p>
              </article>
            ),
          )}
        </div>

        <p className="mt-10 text-center font-[family-name:var(--font-body-landing)] text-xs text-zinc-500">
          Vista presentador, notas y guiones sugeridos; export .pptx y vídeo
          del deck alineado al tema visual.
        </p>
      </div>
    </section>
  );
}
