"use client";

import { useEffect, useRef, useState } from "react";

export function SlidingSenseImage() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduceMotion(true);
      setShown(true);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.12) {
        setShown(true);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative z-0 mt-2 ml-auto h-[52vw] w-full overflow-hidden sm:h-[min(58vh,520px)] lg:h-[min(68vh,640px)]"
    >
      <img
        src="/roboband-sense.png"
        alt="Hand holding the data collection headband"
        width={1672}
        height={941}
        style={{
          transform: shown ? "translate3d(0, 0, 0)" : "translate3d(24%, 0, 0)",
          transition: reduceMotion ? "none" : "transform 1.05s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="pointer-events-none absolute right-0 bottom-0 h-full w-auto max-w-none will-change-transform"
      />
    </div>
  );
}
