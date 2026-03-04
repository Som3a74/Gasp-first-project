"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { section2 } from "@/utils/section2";
import HeroSection from "@/components/HeroSection";
import HorizontalSection from "@/components/HorizontalSection";
import FramesSection from "@/components/FramesSection";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="bg-white overflow-hidden">
      <HeroSection />
      <HorizontalSection />
      <FramesSection />
    </main>
  );
}
