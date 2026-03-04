"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { section2 } from "@/utils/section2";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HorizontalSection = () => {

    useGSAP(
        () => {
            //  section 2 - Horizontal Scroll //
            const horizontalAnim = gsap.to("#horizontalScroll", {
                x: -100 * (section2.length - 1) + "vw",
                ease: "none",
                scrollTrigger: {
                    trigger: "#horizontalSection",
                    start: "top top",
                    end: `+=${section2.length * 1000}px`,
                    scrub: 1,
                    pin: true,
                    snap: {
                        duration: 0.5,
                        snapTo: 1 / (section2.length - 1),
                        ease: "none",
                    },
                },
            });

            // 2. Animate elements & background on EACH slide as they come into view
            const colors = ["#fdfcfb", "#f5f5f7", "#eef2f3", "#fcf8f8", "#f3f8f9"];
            const slides = gsap.utils.toArray<HTMLElement>(".slide-container");

            slides.forEach((slide, index) => {
                // Animate Slide Background Color
                gsap.to(slide, {
                    backgroundColor: colors[index % colors.length],
                    scrollTrigger: {
                        trigger: slide,
                        containerAnimation: horizontalAnim,
                        start: "left center",
                        end: "right center",
                        scrub: true,
                    },
                });

                // Animate elements within the slide
                const elements = slide.querySelectorAll(".animate-item");
                if (elements.length > 0 && index !== 0) {
                    gsap.from(elements, {
                        y: 80,
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: slide,
                            containerAnimation: horizontalAnim,
                            start: "left 80%",
                            toggleActions: "play reverse play reverse",
                        },
                    });
                }
            });
        },
    );

    return (
        <section id="horizontalSection" className="relative h-screen w-full bg-white">
            <div id="horizontalScroll" className="flex h-screen w-[500vw]">
                {section2.map((item, index) => (
                    <div key={index} className="slide-container w-screen h-screen shrink-0 grid lg:grid-cols-2 justify-items-center lg:justify-items-normal items-center px-12 md:px-24 lg:px-32 relative overflow-hidden bg-white">
                        <div className="lg:col-span-1 space-y-6 z-10">
                            <h6 className="animate-item text-red-500 font-bold text-xl lg:text-2xl tracking-tight">
                                {item.chapter}
                            </h6>
                            <h2 className="animate-item text-black text-4xl lg:text-8xl font-bold leading-tight tracking-tight max-w-xl">
                                {item.title}
                            </h2>
                            <p className="animate-item text-black/50 text-sm lg:text-base leading-relaxed max-w-lg font-light">
                                {item.desc}
                            </p>
                        </div>
                        <div className="lg:col-span-1 flex justify-center lg:justify-end items-center h-full py-12">
                            <div className="animate-item relative w-75 md:w-100 aspect-2/3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden translate-x-0 transition-transform duration-500 hover:scale-[1.02]">
                                <Image src={item.img} alt={item.title} className="object-cover" fill sizes="(max-width: 768px) 300px, 400px" priority={index === 0} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default HorizontalSection