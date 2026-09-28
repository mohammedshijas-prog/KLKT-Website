"use client";

import { useEffect, useRef, useState } from "react";

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function WorkerReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!section || !frame || !video) return;

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

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section ref={sectionRef} className="h-[220vh] bg-white">
      <div className="sticky top-0 h-screen">
        <div
          ref={frameRef}
          className="relative h-full w-full origin-center overflow-hidden bg-black will-change-transform"
          style={{ transform: "scale(1)", borderRadius: 0 }}
        >
          <video
            ref={videoRef}
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full origin-center object-cover"
            style={{ transform: "scale(1)" }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.18),rgba(0,0,0,0.45))]" />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="text-[clamp(34px,7.2vw,96px)] leading-[1.02] font-medium tracking-[-0.03em]">
              Earn from the work
              <br />
              you already do.
            </h1>
            <p className="mt-5 max-w-[34ch] px-2 text-[clamp(18px,4vw,28px)] leading-[1.3] tracking-[-0.3px] text-white/90">
              Record what you do. Get paid daily.
            </p>
          </div>
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? "Pause video" : "Play video"}
            className="absolute right-4 bottom-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md"
          >
            {playing ? (
              <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
                <path fill="currentColor" d="M0 0h4v14H0zM8 0h4v14H8z" />
              </svg>
            ) : (
              <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
                <path fill="currentColor" d="M0 0l12 7L0 14z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
