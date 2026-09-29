"use client";

import { useEffect, useRef, type ReactNode } from "react";

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function HomeTwoHero({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phone = window.matchMedia("(max-width: 639px)");

    const apply = (progress: number) => {
      const eased = smooth(progress);
      const shrink = phone.matches ? 0.04 : 0.32;
      frame.style.transform = `scale(${1 - shrink * eased})`;
      frame.style.borderRadius = `${eased * (phone.matches ? 20 : 40)}px`;
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
    <section ref={sectionRef} className="h-[150svh] bg-white sm:h-[220vh]">
      <div className="sticky top-0 h-svh sm:h-screen">
        <div
          ref={frameRef}
          className="relative h-full w-full origin-center overflow-hidden bg-black text-center text-white will-change-transform"
          style={{ transform: "scale(1)", borderRadius: 0 }}
        >
          <img
            src="/home-2/hero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
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
