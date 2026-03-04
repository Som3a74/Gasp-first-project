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

            const tl = gsap.timeline({
                defaults: { ease: "power3.out", duration: 1.5 },
            });

            // 1. Intro Reveal Animation (Start)
            tl.from("#heroSection", {
                clipPath: "inset(30% 20% 30% 20%)",
                duration: 2.5,
                ease: "power2.inOut",
            });

            // 2. Text Animations (Appear right after/during reveal)
            tl.fromTo(".hero-text-small",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }
                , 1.5
            );
            tl.fromTo(".hero-text-large",
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.3, ease: "back.out(1.7)" }
                , 1.7
            );
            tl.fromTo(".hero-description",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }
                , 2.0
            );

            // 3. Branches Animation (Starts after text is settling)
            tl.fromTo(".branch-1",
                { x: 200, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.8 }
                , 2.5
            );
            tl.fromTo(".branch-2",
                { x: -200, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.8 }
                , 2.5
            );

            // 4. Large Clouds (Appear in the MIDDLE of branch animation)
            tl.fromTo(".large-cloud-1",
                { y: 150, opacity: 0 },
                { y: 0, opacity: 0.9, duration: 2 }
                , 2.8
            );
            tl.fromTo(".large-cloud-2",
                { y: 150, opacity: 0 },
                { y: 0, opacity: 0.8, duration: 2 }
                , 2.9
            );

            // Background floating clouds (Looping)
            gsap.to(".cloud", {
                x: `random(0, ${windowWidth - 100})`,
                duration: 30,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 1,
            });

            // Scroll Trigger for fading out Hero
            const HeroSectionScrollTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: "#heroSection",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
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
            <div id="heroElements" className="bg-linear-to-b from-[#4A90E2] to-white -z-10 h-screen w-full absolute inset-0">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <Image src="/images/cloud.png" alt="cloud" className="large-cloud-1 absolute -bottom-40 -left-40 w-150 md:w-200 opacity-0 blur-sm" width={500} height={500} />
                    <Image src="/images/cloud.png" alt="cloud" className="large-cloud-2 absolute -bottom-40 -right-20 w-150 md:w-200 opacity-0" width={500} height={500} />

                    <Image src="/images/cloud.png" alt="cloud" className="cloud absolute top-[15%] left-[10%] w-30 md:w-37.5 opacity-60" width={100} height={100} />
                    <Image src="/images/cloud.png" alt="cloud" className="cloud absolute top-[25%] left-[20%] w-20 md:w-25 opacity-40" width={100} height={100} />
                    <Image src="/images/cloud.png" alt="cloud" className="cloud absolute top-[10%] right-[30%] w-36 md:w-45 opacity-50" width={100} height={100} />
                    <Image src="/images/cloud.png" alt="cloud" className="cloud absolute top-[40%] right-[15%] w-24 md:w-30 opacity-45" width={100} height={100} />
                    <Image src="/images/cloud.png" alt="cloud" className="cloud absolute top-[60%] left-[5%] w-40 md:w-50 opacity-30" width={100} height={100} />
                </div>

                {/* Cherry Blossom Branches - Added opacity-0 to stop flashing */}
                <Image src="/images/branch-1.png" alt="Cherry blossom branch" className="branch-1 absolute right-0 top-0 w-60 md:w-80 lg:w-100 object-contain drop-shadow-lg opacity-0" width={100} height={100} />
                <Image src="/images/branch-1.png" alt="Cherry blossom branch" className="branch-2 absolute left-0 bottom-0 w-72 md:w-96 lg:w-112.5 scale-x-[-1] object-contain drop-shadow-2xl opacity-0" width={100} height={100} />
            </div>

            <div className="relative z-20 text-center max-w-4xl px-4 flex flex-col items-center">
                <p className="hero-text-small text-lg md:text-xl lg:text-2xl font-medium text-black/80 tracking-[0.2em] uppercase mb-4 opacity-0">
                    The <span className="text-white drop-shadow-sm">Clouds</span> Forgot Her
                </p>

                <h1 className="hero-text-large text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] font-black leading-[0.8] text-white drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] mb-8 select-none tracking-tighter opacity-0"
                    style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)' }}
                >
                    Name
                </h1>

                <p className="hero-description text-sm md:text-base lg:text-lg text-black/60 max-w-lg leading-relaxed font-normal italic opacity-0">
                    "The clouds gathered, heavy with unshed tears, yet the sky remained dry,
                    stoic in its silence. The earth below, parched and yearning,
                    looked up in anticipation."
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
