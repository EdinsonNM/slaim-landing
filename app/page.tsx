import AppBar from "@/app/components/AppBar/AppBar";
import { HeroScroll } from "@/app/components/HeroScroll";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AppBar />
      <HeroScroll />
    </div>
  );
}
