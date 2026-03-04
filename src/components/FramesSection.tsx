"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FramesSection = () => {

    useGSAP(
        () => {
            // Section 3 - Frames Animation
            const frames = gsap.utils.toArray<HTMLElement>(".frame");

            const framesAnim = gsap.timeline({
                scrollTrigger: {
                    trigger: "#framesSection",
                    start: "top top",
                    end: `+=${frames.length * 1000}px`,
                    scrub: 1,
                    pin: true,
                    snap: {
                        snapTo: [0, 0.5, 1], // Explicitly snap to these progress points
                        duration: { min: 0.2, max: 0.5 },
                        delay: 0, // Snap immediately when scrolling stops
                        ease: "power1.inOut",
                    },
                }
            });

            // Setup frames reveal
            frames.forEach((frame, i) => {
                // We don't need to animate the last frame because it stays as our background
                if (i === frames.length - 1) return;

                framesAnim.to(frame, {
                    clipPath: "inset(0% 0% 100% 0%)",
                    ease: "none",
                    duration: 1,
                });
            });
        },
    );
    return (
        <section className="relative w-full">
            <div id="framesSection" className="relative h-screen text-white text-center uppercase overflow-hidden">
                {/* Frame 1 - Top layer (Visible First) */}
                <div className="frame absolute inset-0 size-full flex justify-center items-center z-30">
                    <h2 className="absolute z-40 text-4xl md:text-6xl lg:text-8xl font-black tracking-widest drop-shadow-2xl">
                        Ephemerality
                    </h2>
                    <Image src="/images/digital-1.jpg" alt="" className="size-full object-cover" fill priority />
                </div>

                {/* Frame 2 - Middle layer */}
                <div className="frame absolute inset-0 size-full flex justify-center items-center z-20">
                    <h2 className="absolute z-40 text-4xl md:text-6xl lg:text-8xl font-black tracking-widest drop-shadow-2xl">
                        Transience
                    </h2>
                    <Image src="/images/digital-2.jpg" alt="" className="size-full object-cover" fill />
                </div>

                {/* Frame 3 - Bottom layer */}
                <div className="frame absolute inset-0 size-full flex justify-center items-center z-10">
                    <h2 className="absolute z-40 text-4xl md:text-6xl lg:text-8xl font-black tracking-widest drop-shadow-2xl">
                        Ethereal
                    </h2>
                    <Image src="/images/digital-3.jpg" alt="" className="size-full object-cover" fill />
                </div>
            </div>
        </section>
    )
}

export default FramesSection