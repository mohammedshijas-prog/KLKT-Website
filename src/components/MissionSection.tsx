"use client";

import { useEffect, useRef, useState } from "react";

const headline =
  "Tech companies have used our data for free for years.But your data has value. Everyone should benefit from it. That is what shift is about.";

const words = headline.split(" ");

const stats = [
  {
    target: 25,
    prefix: "",
    suffix: "K+",
    label: "People",
    detail: "Real people getting paid for the data they create",
  },
  {
    target: 5,
    prefix: "$",
    suffix: "M+",
    label: "Paid out",
    detail: "Value returned to the people behind the data.",
  },
  {
    target: 15,
    prefix: "",
    suffix: "+",
    label: "Countries",
    detail: "A growing community sharing in the AI economy.",
  },
  {
    target: 20,
    prefix: "",
    suffix: "+",
    label: "Partners",
    detail: "Across industries Teams training on data sourced fairly",
  },
];

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smooth(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function wordReveal(index: number, progress: number) {
  const lead = 4;
  const cursor = progress * (words.length + lead) - lead;
  return clamp((cursor - index + lead) / lead);
}

export function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      setProgress(1);
      return;
    }

    let frame = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const start = viewHeight * 0.95;
      const end = viewHeight * 0.16;
      const next = clamp((start - rect.top) / (start - end));
      setProgress((current) => (Math.abs(current - next) < 0.003 ? current : next));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
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

  const phoneProgress = smooth(clamp(progress / 0.42));
  const textProgress = clamp((progress - 0.04) / 0.62);
  const numberProgress = clamp((progress - 0.22) / 0.62);

  return (
    <section className="relative z-10 bg-transparent">
      <div
        ref={sectionRef}
        id="mission"
        className="relative w-full overflow-hidden rounded-t-[57px] bg-[#eaeaea]"
      >
        <div className="relative z-10 px-8 pt-16 pb-12 lg:px-[104px] lg:pt-[146px] lg:pb-16">
          <p
            className={`text-[20px] leading-[1.28] tracking-[-0.4px] text-[#7c40ff]`}
          >
            OUR MISSION
          </p>
          <h2
            className={`mt-5 max-w-[680px] text-[32px] leading-[1.2] font-medium tracking-[-0.64px] md:max-w-[58%] lg:text-[41px] lg:tracking-[-0.82px] xl:max-w-[680px]`}
          >
            {words.map((word, index) => {
              const amount = wordReveal(index, textProgress);
              const gray = Math.round(176 - 176 * amount);
              return (
                <span key={`${word}-${index}`} style={{ color: `rgb(${gray} ${gray} ${gray})` }}>
                  {word}{" "}
                </span>
              );
            })}
          </h2>

          <div className="mt-14 grid max-w-[1072px] grid-cols-2 gap-x-8 gap-y-10 sm:mt-[72px] sm:grid-cols-4 sm:gap-8">
            {stats.map((stat) => {
              const value = Math.round(stat.target * numberProgress);
              return (
                <div key={stat.label}>
                  <p
                    aria-label={`${stat.prefix}${stat.target}${stat.suffix}`}
                    className="font-display text-[40px] leading-[1.2] font-medium tracking-[-0.8px] text-black tabular-nums sm:text-[48px] sm:tracking-[-0.96px]"
                  >
                    {stat.prefix}
                    {value}
                    {stat.suffix}
                  </p>
                  <p
                    className={`mt-2 text-[14px] leading-[1.2] font-bold tracking-[-0.28px] text-black`}
                  >
                    {stat.label}
                  </p>
                  <p
                    className={`mt-1 max-w-[220px] text-[13px] leading-[1.28] tracking-[-0.26px] text-black/60`}
                  >
                    {stat.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <img
          src="/mission/phone.png"
          alt=""
          width={952}
          height={1024}
          style={{ transform: `translate3d(${(1 - phoneProgress) * 100}%, 0, 0)` }}
          className="pointer-events-none absolute top-6 right-0 hidden h-[460px] w-auto will-change-transform md:block xl:top-2 xl:h-[620px]"
        />
      </div>
    </section>
  );
}
