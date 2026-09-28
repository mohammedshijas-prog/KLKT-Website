"use client";

import { useEffect, useRef } from "react";

const photos = [
  { src: "/workers/jobs/picker.png", alt: "Warehouse picker", className: "top-[7%] left-[2%] h-[110px] w-[160px] sm:h-[150px] sm:w-[210px]" },
  { src: "/workers/jobs/packer.png", alt: "Packer", className: "top-[11%] left-[18%] h-[72px] w-[96px] sm:h-[100px] sm:w-[130px]" },
  { src: "/workers/jobs/stocker.png", alt: "Shelf stocker", className: "top-[4%] left-[36%] hidden h-[140px] w-[120px] sm:block" },
  { src: "/workers/jobs/cook.png", alt: "Line cook", className: "top-[16%] right-[24%] h-[80px] w-[110px] sm:h-[110px] sm:w-[150px]" },
  { src: "/workers/jobs/porter.png", alt: "Kitchen porter", className: "top-[5%] right-[2%] h-[70px] w-[100px] sm:h-[90px] sm:w-[130px]" },
  { src: "/workers/jobs/housekeeper.png", alt: "Housekeeper", className: "top-[38%] right-[6%] h-[140px] w-[120px] sm:h-[190px] sm:w-[160px]" },
  { src: "/workers/jobs/cleaner.png", alt: "Cleaner", className: "top-[40%] left-[3%] h-[80px] w-[70px] sm:h-[100px] sm:w-[90px]" },
  { src: "/workers/jobs/laundry.png", alt: "Laundry attendant", className: "bottom-[12%] left-[8%] h-[110px] w-[150px] sm:h-[150px] sm:w-[200px]" },
  { src: "/workers/jobs/hospital.png", alt: "Hospital porter", className: "right-[6%] bottom-[8%] h-[120px] w-[160px] sm:h-[170px] sm:w-[220px]" },
];

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function WorkerScatter() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLSpanElement>(null);
  const photoRefs = useRef<Array<HTMLImageElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const square = squareRef.current;
    if (!section || !stage || !square) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = (progress: number) => {
      const gatherEnd = 0.78;
      const gather = smooth(Math.min(1, progress / gatherEnd));
      const suck = smooth(progress <= gatherEnd ? 0 : (progress - gatherEnd) / (1 - gatherEnd));
      const stageBox = stage.getBoundingClientRect();
      const squareBox = square.getBoundingClientRect();
      if (squareBox.width < 1) return;
      const targetX = squareBox.left - stageBox.left + squareBox.width / 2;
      const targetY = squareBox.top - stageBox.top + squareBox.height / 2;
      const midX = stage.clientWidth / 2;
      const midY = stage.clientHeight / 2;

      photoRefs.current.forEach((photo) => {
        if (!photo) return;
        const cx = photo.offsetLeft + photo.offsetWidth / 2;
        const cy = photo.offsetTop + photo.offsetHeight / 2;
        const toMidX = midX - cx;
        const toMidY = midY - cy;
        const toSquareX = targetX - cx;
        const toSquareY = targetY - cy;
        const x = toMidX * gather + (toSquareX - toMidX) * suck;
        const y = toMidY * gather + (toSquareY - toMidY) * suck;
        const fit = Math.max(
          squareBox.width / photo.offsetWidth,
          squareBox.height / photo.offsetHeight,
        );
        const scale = 1 + (fit - 1) * suck;
        const visualRadius = 22 + (3 - 22) * suck;
        const localW = squareBox.width / scale;
        const localH = squareBox.height / scale;
        const insetX = ((photo.offsetWidth - localW) / 2) * suck;
        const insetY = ((photo.offsetHeight - localH) / 2) * suck;
        photo.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        photo.style.borderRadius = `${scale > 0 ? visualRadius / scale : 22}px`;
        photo.style.clipPath =
          suck > 0 ? `inset(${insetY}px ${insetX}px round ${visualRadius / scale}px)` : "none";
      });
    };

    if (motion.matches) {
      apply(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), Math.max(distance, 0));
      apply(distance > 0 ? scrolled / distance : 1);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-[180vh] bg-[#f6f5f2]">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
      {photos.map((photo, index) => (
        <img
          key={photo.src}
          ref={(node) => {
            photoRefs.current[index] = node;
          }}
          src={photo.src}
          alt={photo.alt}
          className={`pointer-events-none absolute z-10 rounded-[22px] object-cover will-change-transform ${photo.className}`}
        />
      ))}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <h2 className="relative z-30 text-[40px] leading-none font-medium tracking-[-0.8px] text-[#1d1d1f] sm:text-[64px] sm:tracking-[-1.4px]">
          On every shift.
        </h2>
        <p className="mt-6 flex items-center justify-center gap-3 text-[28px] leading-none font-semibold tracking-[-0.4px] text-[#ff2a2a] sm:text-[40px]">
          <span className="relative flex h-[0.85em] w-[0.85em] items-center justify-center">
            <span ref={squareRef} className="h-[0.34em] w-[0.34em] rounded-[3px] bg-current" />
            <span aria-hidden className="pointer-events-none absolute inset-0 z-30 rounded-full border-[2.5px] border-current" />
          </span>
          <span className="relative z-30">RECORDED</span>
        </p>
        <p className="relative z-30 mt-6 text-[18px] leading-none font-medium tracking-[-0.2px] text-[#8e8e93] sm:text-[22px]">
          on 500+ industries
        </p>
      </div>
      </div>
    </section>
  );
}
