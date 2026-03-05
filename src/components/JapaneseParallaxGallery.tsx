"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const JapaneseParallaxGallery = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });

            // Parallax effect on scattered floating images
            gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => {
                // Different speeds depending on data-speed attribute
                const speed = parseFloat(el.getAttribute("data-speed") || "1");
                tl.to(el, {
                    yPercent: -150 * speed,
                    ease: "none",
                }, 0);
            });

            // Parallax effect on large background Kanji texts
            gsap.utils.toArray<HTMLElement>(".bg-kanji").forEach((el) => {
                const speed = parseFloat(el.getAttribute("data-speed") || "0.5");
                tl.to(el, {
                    yPercent: -200 * speed,
                    ease: "none",
                }, 0);
            });

            // Central Text Fade-in and gentle movement
            gsap.from(".center-quote", {
                scrollTrigger: {
                    trigger: ".center-quote",
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: true,
                },
                y: 100,
                opacity: 0,
                duration: 2,
            });

        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="relative w-full min-h-[150vh] bg-[#050505] overflow-hidden text-white flex items-center justify-center">

            {/* Background Floating Kanji text for texture and mood */}
            <div className="absolute inset-0 pointer-events-none select-none z-0">
                <span className="bg-kanji absolute top-[10%] left-[5%] text-[15rem] md:text-[30rem] font-serif opacity-[0.03] text-white" data-speed="1.2">静</span>
                <span className="bg-kanji absolute top-[40%] right-[-5%] text-[20rem] md:text-[40rem] font-serif opacity-[0.04] text-white" data-speed="0.8">心</span>
                <span className="bg-kanji absolute bottom-[10%] left-[30%] text-[10rem] md:text-[20rem] font-serif opacity-[0.03] text-white" data-speed="1.5">道</span>
            </div>

            {/* Parallax Images Group */}
            <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none">
                {/* Randomly scattered images around the center */}
                <div className="parallax-img absolute top-[20%] left-[10%] w-32 md:w-48 lg:w-64 aspect-3/4" data-speed="1.4">
                    <Image src="/images/poster2.jpg" alt="Art 1" fill className="object-cover rounded-sm shadow-2xl brightness-75" />
                </div>

                <div className="parallax-img absolute top-[45%] left-[25%] w-24 md:w-36 lg:w-48 aspect-square" data-speed="0.9">
                    <Image src="/images/poster3.jpg" alt="Art 2" fill className="object-cover rounded-sm shadow-2xl brightness-50" />
                </div>

                <div className="parallax-img absolute top-[15%] right-[15%] w-40 md:w-56 lg:w-72 aspect-video" data-speed="1.6">
                    <Image src="/images/poster4.jpg" alt="Art 3" fill className="object-cover rounded-sm shadow-2xl brightness-75" />
                </div>

                <div className="parallax-img absolute top-[60%] right-[10%] w-36 md:w-52 lg:w-64 aspect-4/5" data-speed="1.1">
                    <Image src="/images/poster5.jpg" alt="Art 4" fill className="object-cover rounded-sm shadow-2xl brightness-50" />
                </div>

                <div className="parallax-img absolute top-[75%] left-[15%] w-48 md:w-64 lg:w-80 aspect-2/3" data-speed="1.3">
                    <Image src="/images/digital-1.jpg" alt="Art 5" fill className="object-cover rounded-sm shadow-2xl brightness-60" />
                </div>
            </div>

            {/* Foreground Content Focus - Stays static in center horizontally, but scrolls up normally */}
            <div className="center-quote relative z-20 text-center max-w-2xl px-6 pointer-events-auto">
                <p className="text-red-600 font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-6">The Journey</p>
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif font-black leading-tight tracking-wide mb-8 drop-shadow-2xl">
                    Every step forward <br className="hidden md:block" />
                    is a reflection <br className="hidden md:block" />
                    of the past.
                </h2>
                <div className="w-px h-24 bg-white/30 mx-auto"></div>
            </div>

        </section>
    );
};

export default JapaneseParallaxGallery;
