"use client";

import Antigravity from "@/app/components/Antigravity";

export function AntigravityBackground() {
  return (
    <div className="fixed inset-0 z-0 w-full min-h-screen h-full [height:100dvh]">
      <Antigravity
        count={300}
        color="#a3e635"
        magnetRadius={6}
        ringRadius={7}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={1.5}
        autoAnimate
      />
    </div>
  );
}
