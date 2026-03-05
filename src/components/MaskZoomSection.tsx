"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MaskZoomSection = () => {
    const container = useRef<HTMLDivElement>(null);
    const maskTextGroup = useRef<SVGGElement>(null);
    const bgImageRef = useRef<HTMLImageElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "+=1200",
                    scrub: 1,
                    pin: true,
                }
            });

            // 1. Zoom the text massively so the hole covers the screen
            tl.to(maskTextGroup.current, {
                scale: 150,
                transformOrigin: "center center",
                ease: "power2.inOut",
            })
                // 2. Add a slight scale to the background image for parallax depth feeling
                .to(bgImageRef.current, {
                    scale: 1.1,
                    ease: "none",
                }, "<")
                // 3. Fade out the front text
                .to(".floating-title", {
                    opacity: 0,
                    y: -50,
                    duration: 0.1,
                }, 0);

        },
        { scope: container }
    );

    return (
        <section ref={container} className="relative w-full h-screen bg-black overflow-hidden select-none">
            {/* 1. Background Image to be revealed through the zoom */}
            <div className="absolute inset-0 z-0">
                <Image
                    ref={bgImageRef}
                    src="/images/poster1.jpg"
                    alt="Background Reveal"
                    fill
                    className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* 2. The SVG Mask Layer */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 1000 1000" className="w-screen h-screen" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <mask id="text-mask">
                            <rect width="1000" height="1000" fill="white" />
                            <g ref={maskTextGroup}>
                                <text x="500" y="520" fill="black" fontSize="400" fontWeight="900" textAnchor="middle" dominantBaseline="middle" className="font-serif">
                                    魂
                                </text>
                            </g>
                        </mask>
                    </defs>
                    <rect width="1000" height="1000" fill="#050505" mask="url(#text-mask)" />
                </svg>
            </div>

            {/* 3. Floating Overlay Text */}
            <div className="floating-title absolute inset-0 z-20 flex flex-col items-center justify-center text-white pointer-events-none">
                <div className="mt-50 md:mt-75 flex flex-col items-center">
                    <p className="text-xs md:text-sm tracking-[0.6em] uppercase font-light text-white/70 mb-3">
                        Enter The Soul
                    </p>
                    <h2 className="text-3xl md:text-5xl font-black tracking-[0.2em] font-serif uppercase">
                        Awaken
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default MaskZoomSection;
