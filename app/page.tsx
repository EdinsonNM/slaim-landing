import AppBar from "@/app/components/AppBar/AppBar";
import { AppPreviewSection } from "@/app/components/AppPreviewSection";
import { Footer } from "@/app/components/Footer";
import { HeroScroll } from "@/app/components/HeroScroll";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
      >
        Saltar al contenido principal
      </a>
      <AppBar />
      <HeroScroll />
      <AppPreviewSection />
      <Footer />
    </div>
  );
}
