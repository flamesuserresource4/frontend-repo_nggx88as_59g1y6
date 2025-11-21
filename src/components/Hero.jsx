import { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { gsap } from "gsap";
import { setupGSAP, prefersReducedMotion } from "./gsapSetup";

export default function Hero() {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    setupGSAP();
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.2"
      );

    return () => tl.kill();
  }, []);

  return (
    <section id="top" className="relative min-h-[90svh] flex items-center">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <h1 ref={titleRef} className="text-4xl md:text-6xl font-semibold tracking-tight">
          Designing Interfaces, Motion, and Code — choreographed end-to-end.
        </h1>
        <p ref={subRef} className="mt-4 max-w-2xl text-base md:text-lg text-white/80">
          I’m Ayan Mondal, a UI/UX, motion, and frontend developer crafting premium experiences with GSAP and modern web tech.
        </p>
        <div ref={ctaRef} className="mt-8 flex gap-4">
          <a href="#work" className="px-5 py-2 rounded bg-violet-500 hover:bg-violet-400 transition-colors">
            View Work
          </a>
          <a href="#contact" className="px-5 py-2 rounded border border-white/20 hover:bg-white/10">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
