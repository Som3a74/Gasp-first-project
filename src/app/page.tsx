"use client";

import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import HorizontalSection from "@/components/HorizontalSection";
import FramesSection from "@/components/FramesSection";
import MaskZoomSection from "@/components/MaskZoomSection";
import JapaneseParallaxGallery from "@/components/JapaneseParallaxGallery";


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="bg-white overflow-hidden">
      <HeroSection />
      <HorizontalSection />
      <FramesSection />
      <MaskZoomSection />
      <JapaneseParallaxGallery />
    </main>
  );
}
