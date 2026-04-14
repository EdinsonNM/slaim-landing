const STEPS = [
  {
    n: "01",
    title: "Define el tema",
    body: "Escribe de qué va la charla o pega contexto; elige Gemini u OpenAI en la barra.",
  },
  {
    n: "02",
    title: "Edita en el lienzo",
    body: "Markdown, código, Excalidraw, Mermaid y ajustes de tema visual del deck.",
  },
  {
    n: "03",
    title: "Presenta o exporta",
    body: "Vista presentador con notas y speech sugerido; salida a .pptx o vídeo con tiempos por slide.",
  },
] as const;

export default function HowItWorksSection() {
  return (
    <section
      className="relative border-t border-zinc-200/80 bg-gradient-to-b from-[#eef6ff] to-white px-4 py-20 sm:px-6 sm:py-24 md:py-28"
      aria-labelledby="como-funciona-titulo"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="como-funciona-titulo"
          className="text-center font-[family-name:var(--font-serif-hero)] text-3xl font-normal leading-tight tracking-[-0.02em] text-zinc-900 sm:text-4xl"
        >
          De la idea al deck en tres pasos
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center font-[family-name:var(--font-body-landing)] text-sm text-zinc-600 sm:text-base">
          Flujo pensado para iterar rápido: generar, refinar y compartir sin
          pelear con plantillas decorativas.
        </p>

        <ol className="mt-12 space-y-4">
          {STEPS.map((step) => (
            <li key={step.n}>
              <div className="flex gap-4 rounded-2xl border border-white/80 bg-white/85 px-4 py-4 shadow-sm ring-1 ring-zinc-200/60 backdrop-blur-sm sm:px-5 sm:py-5">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 font-[family-name:var(--font-body-landing)] text-xs font-semibold text-white"
                  aria-hidden
                >
                  {step.n}
                </span>
                <div className="min-w-0 text-left">
                  <h3 className="font-[family-name:var(--font-body-landing)] text-base font-semibold text-zinc-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-[family-name:var(--font-body-landing)] text-sm leading-relaxed text-zinc-600">
                    {step.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center font-[family-name:var(--font-body-landing)] text-xs text-zinc-500">
          Uso local gratuito; inicio de sesión opcional con Google para
          experiencia unificada y funciones en la nube cuando apliquen.
        </p>
      </div>
    </section>
  );
}
