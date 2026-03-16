import AppBar from "@/app/components/AppBar/AppBar";
import { AntigravityBackground } from "@/app/components/AntigravityBackground/AntigravityBackground";
import { AppPreviewSection } from "@/app/components/AppPreviewSection";
import { Footer } from "@/app/components/Footer";
import { HeroScroll } from "@/app/components/HeroScroll";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white">
      <AntigravityBackground />
      <div className="relative z-10">
        <AppBar />
        <HeroScroll />
        <AppPreviewSection />
        <Footer />
      </div>
    </div>
  );
}
