"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HeroSection = () => {

    useGSAP(
        () => {
            const windowWidth = window.innerWidth

            // Create a timeline for the entry animation
            const tl = gsap.timeline({
                defaults: { ease: "power3.out", duration: 1.5 },
            });

            // intro animation
            tl.from("#heroSection", {
                clipPath: "inset(30% 20% 30% 20%)",
                duration: 2.5,
                ease: "power1.inOut",
                onComplete: () => {
                    console.log("Animation completed");
                    tl.kill();
                }
            });

            // branches animation
            tl.from(".branch-1", { x: 200, opacity: 0 }, 1.5);
            tl.from(".branch-2", { x: -200, opacity: 0 }, 1.5);

            gsap.to(".cloud", {
                x: `random(0, ${windowWidth - 100})`,
                duration: 30,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 1,
            });

            tl.from(".large-cloud-1", {
                y: 200,
                opacity: 0,
            }, 1.8);

            tl.from(".large-cloud-2", { y: 200, opacity: 0 }, 1.9);

            // Text animations
            tl.from(".hero-text-small", { y: 30, opacity: 0, duration: 1 }, 1.2);
            tl.from(".hero-text-large", { scale: 0.8, opacity: 0, duration: 1.5, ease: "back.out(1.7)" }, 1.4);
            tl.from(".hero-description", { y: 20, opacity: 0, duration: 1 }, 1.8);

            const HeroSectionScrollTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: "#heroSection",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5, // Smoother scrub
                    invalidateOnRefresh: true,
                },
            });

            HeroSectionScrollTrigger.to(".large-cloud-1", { scale: 2 }, 0)
                .to(".large-cloud-2", { scale: 2 }, 0)
                .to(".branch-1", { y: 200 }, 0)
                .to(".branch-2", { y: -200 }, 0)
                .to(".hero-text-small, .hero-text-large, .hero-description", {
                    opacity: 0,
                    y: -50,
                    overwrite: "auto",
                }, 0);
        },
    );
    return (
        <section id="heroSection" className="relative overflow-hidden grid place-content-center h-screen z-10 w-full select-none">
            {/* Background & Decorative Elements */}
            <div id="heroElements" className="bg-linear-to-b from-[#4A90E2] to-white -z-10 h-screen w-full absolute inset-0">
                {/* Clouds */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <Image src="/Images/cloud.png" alt="cloud" className="large-cloud-1 absolute -bottom-40 -left-40 w-150 md:w-200 opacity-90 blur-sm" width={100} height={100} />
                    <Image src="/Images/cloud.png" alt="cloud" className="large-cloud-2 absolute -bottom-40 -right-20 w-150 md:w-200 opacity-80" width={100} height={100} />

                    {/* Random small clouds */}
                    <Image src="/Images/cloud.png" alt="cloud" className="cloud absolute top-[15%] left-[10%] w-30 md:w-37.5 opacity-60" width={100} height={100} />
                    <Image src="/Images/cloud.png" alt="cloud" className="cloud absolute top-[25%] left-[20%] w-20 md:w-25 opacity-40" width={100} height={100} />
                    <Image src="/Images/cloud.png" alt="cloud" className="cloud absolute top-[10%] right-[30%] w-36 md:w-45 opacity-50" width={100} height={100} />
                    <Image src="/Images/cloud.png" alt="cloud" className="cloud absolute top-[40%] right-[15%] w-24 md:w-30 opacity-45" width={100} height={100} />
                    <Image src="/Images/cloud.png" alt="cloud" className="cloud absolute top-[60%] left-[5%] w-40 md:w-50 opacity-30" width={100} height={100} />
                </div>

                {/* Cherry Blossom Branches */}
                <Image src="/Images/branch-1.png" alt="Cherry blossom branch" className="branch-1 absolute right-0 top-0 w-60 md:w-80 lg:w-100 object-contain drop-shadow-lg" width={100} height={100} />
                <Image src="/Images/branch-1.png" alt="Cherry blossom branch" className="branch-2 absolute left-0 bottom-0 w-72 md:w-96 lg:w-112.5 scale-x-[-1] object-contain drop-shadow-2xl" width={100} height={100} />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center max-w-4xl px-4 flex flex-col items-center select-none">
                <p className="hero-text-small text-lg md:text-xl lg:text-2xl font-medium text-black/80 tracking-[0.2em] uppercase mb-4">
                    The <span className="text-white drop-shadow-sm">Clouds</span> Forgot Her
                </p>

                <h1 className="hero-text-large text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-black leading-[0.8] text-white drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] mb-8 select-none tracking-tighter"
                    style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)' }}
                >
                    Name
                </h1>

                <p className="hero-description text-sm md:text-base lg:text-lg text-black/60 max-w-lg leading-relaxed font-normal italic">
                    "The clouds gathered, heavy with unshed tears, yet the sky remained dry,
                    stoic in its silence. The earth below, parched and yearning,
                    looked up in anticipation."
                </p>
            </div>
        </section>
    )
}

export default HeroSection