"use client";

import { useEffect, useRef } from "react";

const cards = [
  {
    title: "Help on every task",
    lines: ["Help on", "every task"],
    body: "Workers ask Noor what to do next.\nNoor answers from their tasks for the shift.",
    image: "/workers/noor/task.png",
    alt: "Noor telling a worker to restock shelves in aisle 4",
    className: "bg-[#efe7ff]",
  },
  {
    title: "Accepted hours, on request",
    lines: ["Accepted hours,", "on request"],
    body: "Workers ask how their hours are doing.\nNoor shows what was accepted and what is still in review.",
    image: "/workers/noor/hours.png",
    alt: "Noor showing accepted hours and hours still in review",
    className:
      "bg-[radial-gradient(ellipse_925px_849px_at_75%_100%,rgba(244,108,65,0.4)_0%,rgba(244,108,65,0.2)_10%,rgba(244,108,65,0)_64%),linear-gradient(#ebf0f8,#ebf0f8)]",
  },
  {
    title: "No supervisor needed",
    lines: ["No supervisor", "needed"],
    body: "Questions are answered in the\napp, any time during the shift.",
    image: "/workers/noor/supervisor.png",
    alt: "Noor confirming the headband is recording",
    className:
      "bg-[radial-gradient(ellipse_925px_849px_at_75%_100%,rgba(255,150,194,0.4)_0%,rgba(255,150,194,0.2)_10%,rgba(255,150,194,0)_64%),linear-gradient(#ebf0f8,#ebf0f8)]",
  },
];

export function WorkerNoor() {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const images = imageRefs.current;
      if (reduce || window.innerWidth < 640) {
        images.forEach((image) => {
          if (image) image.style.opacity = "1";
        });
        return;
      }
      const focus = window.innerHeight * 0.45;
      let best = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const box = card.getBoundingClientRect();
        const distance = Math.abs(box.top + box.height / 2 - focus);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      images.forEach((image, index) => {
        if (!image) return;
        image.style.opacity = index === best ? "1" : "0";
      });
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
    <section className="bg-white py-16 sm:py-[66px]">
      <div className="site flex flex-col items-center gap-8">
        <header className="text-center">
          <h2 className="text-[clamp(34px,8vw,63px)] leading-[1.1] font-medium tracking-[-0.03em] text-black">
            Noor, on every shift.
          </h2>
          <p className="mt-3 text-[18px] leading-[1.21] tracking-[-0.4px] text-black/60 sm:text-[20px]">
            Workers ask. <span className="font-bold text-black/60">Noor answers,</span> so the shift keeps moving.
          </p>
        </header>
        <div className="relative w-full">
          <div className="flex flex-col gap-8">
            {cards.map((card, index) => (
              <article
                key={card.title}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={`relative h-auto overflow-hidden rounded-[18px] pb-4 sm:h-[437px] sm:pb-0 ${card.className}`}
              >
                <div className="relative z-10 max-w-[16rem] px-5 pt-7 sm:absolute sm:top-[138px] sm:left-[69px] sm:max-w-[460px] sm:px-0 sm:pt-0">
                  <h3 className="text-[clamp(28px,7vw,48px)] leading-[1.05] font-semibold tracking-[-0.04em] text-[#1f2025] sm:leading-[49px]">
                    {card.lines[0]}
                    <br />
                    {card.lines[1]}
                  </h3>
                  <p className="mt-5 text-[16px] leading-[1.45] text-[#1f2025]/60 sm:whitespace-pre-line sm:mt-[22px] sm:text-[20px] sm:leading-[31.2px]">
                    {card.body}
                  </p>
                </div>
                <img
                  ref={(node) => {
                    imageRefs.current[index] = node;
                  }}
                  src={card.image}
                  alt={card.alt}
                  className="pointer-events-none relative z-0 mx-auto mt-2 h-[240px] w-auto max-w-[70%] object-contain transition-opacity duration-500 sm:absolute sm:top-[24px] sm:right-[40px] sm:mx-0 sm:mt-0 sm:h-[389px] sm:w-[312px] sm:max-w-none"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
