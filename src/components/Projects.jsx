import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupGSAP, prefersReducedMotion } from "./gsapSetup";

const projects = [
  {
    title: "Cinematic Finance Dashboard",
    tags: ["UI/UX", "GSAP", "React"],
    summary:
      "Micro-interactions and narrative walkthrough for complex workflows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Iridescent E‑commerce Motion",
    tags: ["Motion", "WebGL", "GSAP"],
    summary: "High-polish transitions and tactile product interactions.",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Portfolio as Performance",
    tags: ["Design", "Next.js", "Framer"],
    summary: "Story beats across sections with precise choreography.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Projects() {
  useEffect(() => {
    setupGSAP();
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion()) return;

    const cards = gsap.utils.toArray(".proj-card");
    gsap.set(cards, { opacity: 0, y: 24 });

    ScrollTrigger.batch(cards, {
      start: "top 85%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }),
      once: true,
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="text-3xl md:text-5xl font-semibold">Selected Work</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <article
            key={i}
            className="proj-card group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 transition-transform"
          >
            <img
              src={p.image}
              alt={`${p.title} cover`}
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="text-xl font-medium">{p.title}</h3>
              <p className="mt-1 text-sm text-white/70">{p.summary}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded bg-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
