"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { HeroMedia } from "@/components/home/HeroMedia";

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function HomeHeroStage({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = (progress: number) => {
      const eased = smooth(progress);
      frame.style.transform = `scale(${1 - 0.32 * eased})`;
      frame.style.borderRadius = `${eased * 40}px`;
    };

    if (motion.matches) {
      apply(0);
      return;
    }

    let frameId = 0;
    const update = () => {
      frameId = 0;
      const distance = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), Math.max(distance, 0));
      apply(distance > 0 ? scrolled / distance : 1);
    };
    const onScroll = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-[220vh] bg-white">
      <div className="sticky top-0 h-screen">
        <div
          ref={frameRef}
          className="relative h-full w-full origin-center overflow-hidden bg-black text-center text-white will-change-transform"
          style={{ transform: "scale(1)", borderRadius: 0 }}
        >
          <div className="absolute inset-0">
            <HeroMedia />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.28)_46%,rgba(0,0,0,0.52)_100%)]"
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-24">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
