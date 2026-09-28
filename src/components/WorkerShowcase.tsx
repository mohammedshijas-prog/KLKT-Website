"use client";

import { StoreBadges } from "@/components/home/StoreBadges";
import { useEffect, useRef } from "react";

const phones = [
  { src: "/workers/phone-1.png", alt: "Recording a task with the headset and wrist cameras" },
  { src: "/workers/phone-2.png", alt: "Wallet with earnings and payout history" },
  { src: "/workers/phone-3.png", alt: "Player rank, statistics, and upload quota" },
  { src: "/workers/phone-4.png", alt: "A $200 payout for processed recordings" },
  { src: "/workers/phone-5.png", alt: "Headband connection screen" },
];

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function WorkerShowcase() {
  const rowRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<Array<HTMLImageElement | null>>([]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = (progress: number) => {
      const eased = smooth(progress);
      phoneRefs.current.forEach((phone) => {
        if (!phone) return;
        phone.style.transform = `translate3d(0, ${(1 - eased) * 240}px, 0)`;
      });
    };

    if (motion.matches) {
      apply(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = row.getBoundingClientRect().top;
      const start = window.innerHeight * 0.95;
      const end = window.innerHeight * 0.42;
      apply((start - top) / (start - end));
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
    <section className="w-full overflow-hidden bg-white pt-12 sm:pt-[69px]">
      <div className="w-full">
        <h2 className="text-center text-[clamp(34px,8vw,63px)] leading-[1.05] font-medium tracking-[-0.03em] text-black">
          Rewriting the
          <br />
          reading experience.
        </h2>
        <p className="mx-auto mt-7 max-w-[455px] px-6 text-center text-[16px] leading-[1.2] tracking-[-0.32px] text-black">
          Tech companies have used our data for free for years.But your data has value.
          Everyone should benefit from it. That{" "}
          <span className="text-black/60">is what shift is about.</span>
        </p>
        <StoreBadges
          className="mt-7 justify-center"
          ios="https://apps.apple.com/us/iphone/search?term=klkt"
          android="https://play.google.com/store/apps/details?id=com.cntxt.cntxtai.data.services&hl=en"
        />
        <div
          ref={rowRef}
          className="site-pad mt-16 flex items-start justify-center gap-4 pb-12 max-sm:overflow-x-auto sm:mt-[95px] sm:gap-[25px] sm:pb-[84px]"
        >
          {phones.map((phone, index) => (
            <img
              key={phone.src}
              ref={(node) => {
                phoneRefs.current[index] = node;
              }}
              src={phone.src}
              alt={phone.alt}
              width={210}
              height={428}
              style={{
                transform: "translate3d(0, 240px, 0)",
                filter: "drop-shadow(4px -5px 6.7px rgba(0, 0, 0, 0.25))",
              }}
              className={`h-[320px] w-[156px] shrink-0 object-cover will-change-transform sm:h-[428px] sm:w-[210px] ${
                index % 2 === 1 ? "mt-8 sm:mt-[62px]" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
