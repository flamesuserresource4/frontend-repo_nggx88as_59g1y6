import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const setupGSAP = () => {
  if (!gsap.core.globals().ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
