"use client";

import { useEffect, useRef } from "react";

function liftBackground(image: ImageData) {
  const pixels = image.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];
    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);
    if (min < 236 || max - min >= 10) continue;
    const blend = Math.min(1, (min - 236) / 16);
    const keep = 1 - blend;
    pixels[i] = red * keep + 255 * blend;
    pixels[i + 1] = green * keep + 255 * blend;
    pixels[i + 2] = blue * keep + 255 * blend;
  }
}

function isStudioGray(pixels: Uint8ClampedArray, index: number) {
  const red = pixels[index];
  const green = pixels[index + 1];
  const blue = pixels[index + 2];
  const min = Math.min(red, green, blue);
  const max = Math.max(red, green, blue);
  return max - min < 16 && min >= 198 && max < 250;
}

function clearGrayBackground(image: ImageData) {
  const { data: pixels, width, height } = image;
  const count = width * height;
  const background = new Uint8Array(count);
  const queue = new Int32Array(count);
  let head = 0;
  let tail = 0;

  const push = (x: number, y: number) => {
    const index = y * width + x;
    if (background[index] || !isStudioGray(pixels, index * 4)) return;
    background[index] = 1;
    queue[tail++] = index;
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    const y = (index / width) | 0;
    if (x > 0) push(x - 1, y);
    if (x + 1 < width) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y + 1 < height) push(x, y + 1);
  }

  for (let index = 0; index < count; index++) {
    if (!background[index]) continue;
    pixels[index * 4 + 3] = 0;
  }
}

export function InsideVideo({
  className = "",
  src = "/inside.mp4?v=2",
  background = "white",
  label = "Exploded view of the data collection headband",
  fit = "contain",
  scrub = "section",
}: {
  className?: string;
  src?: string;
  background?: "white" | "gray";
  label?: string;
  fit?: "contain" | "cover";
  scrub?: "section" | "view";
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.closest("section");
    const video = videoRef.current;
    if (!root || !(section instanceof HTMLElement) || !video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let seeking = false;
    let target = 0;

    const seek = () => {
      frame = 0;
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      if (motionQuery.matches) {
        target = duration;
      } else {
        const view = window.innerHeight;
        const top = section.getBoundingClientRect().top;
        let progress = 0;
        if (scrub === "view") {
          const box = root.getBoundingClientRect();
          const start = view * 0.72;
          const docTop = box.top + window.scrollY;
          const maxScroll = Math.max(0, document.documentElement.scrollHeight - view);
          const end = Math.min(view * 0.08, docTop - maxScroll);
          const span = start - end;
          progress = span > 1 ? Math.min(1, Math.max(0, (start - box.top) / span)) : 0;
        } else {
          const distance = Math.max(0, section.offsetHeight - view);
          const scrolled = Math.min(Math.max(-top, 0), distance);
          progress = distance > 0 ? scrolled / distance : 0;
        }
        target = progress * duration;
      }

      if (seeking || Math.abs(video.currentTime - target) < 1 / 24) return;
      seeking = true;
      video.currentTime = target;
    };

    const paint = () => {
      const canvas = canvasRef.current;
      if (!canvas || !video.videoWidth) return;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
      context.drawImage(video, 0, 0);
      const frameImage = context.getImageData(0, 0, canvas.width, canvas.height);
      if (background === "gray") clearGrayBackground(frameImage);
      else liftBackground(frameImage);
      context.putImageData(frameImage, 0, 0);
    };

    const onSeeked = () => {
      seeking = false;
      paint();
      if (Math.abs(video.currentTime - target) >= 1 / 24) seek();
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(seek);
    };

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", paint);
    video.addEventListener("loadedmetadata", seek);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (video.readyState >= 2) paint();
    if (video.readyState >= 1) seek();

    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", paint);
      video.removeEventListener("loadedmetadata", seek);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [background, scrub, src]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        aria-label={label}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />
      <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${fit === "cover" ? "object-cover object-[center_22%]" : "object-contain"}`} />
    </div>
  );
}

export function InsideSection() {
  return (
    <section className="bg-white pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="flex flex-col items-center px-6">
        <h2 className="text-center text-[40px] leading-[1.05] font-medium tracking-[-0.8px] text-[#1d1d1f] sm:text-[56px] sm:tracking-[-1.2px]">
          Wear it. Get to work.
        </h2>
        <InsideVideo
          src="/wear.mp4?v=1"
          background="gray"
          label="Headband being worn"
          scrub="view"
          className="mt-8 aspect-video w-full max-w-[920px] sm:mt-10"
        />
      </div>
    </section>
  );
}
