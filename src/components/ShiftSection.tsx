"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
  {
    title: "Modular sense units.",
    body: "Clip up to 8 camera units onto the headband. Each one attaches in seconds, so the setup fits the task.",
  },
  {
    title: "Hands in full view.",
    body: "The wristband's 154° camera sees what the hands do, and connects to the headband over Wi-Fi.",
  },
  {
    title: "Synced to the millisecond.",
    body: "Every camera records at 30 FPS with under 1 ms jitter, with a 400 Hz IMU tracking movement.",
  },
  {
    title: "Swap power, keep recording.",
    body: "The external USB-C battery hot-swaps mid-shift. The wristband runs up to 12 hours on its own.",
  },
];

function CardTitle({ children }: { children: string }) {
  return (
    <p className="font-display relative z-10 text-center text-[28px] leading-[26px] font-semibold tracking-[-0.35px] text-black sm:text-[35px]">
      {children}
    </p>
  );
}

export function ShiftSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const articles = [...scroller.querySelectorAll("article")];
      const max = scroller.scrollWidth - scroller.clientWidth;
      if (scroller.scrollLeft >= max - 8) {
        setActive(articles.length - 1);
        return;
      }
      const origin = scroller.getBoundingClientRect().left + 80;
      let index = 0;
      articles.forEach((article, i) => {
        const rect = article.getBoundingClientRect();
        if (rect.left <= origin && rect.right > origin) index = i;
      });
      setActive(index);
    };

    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (index: number) => {
    const scroller = scrollerRef.current;
    const article = scroller?.querySelectorAll("article")[index];
    if (!scroller || !article) return;
    const articles = scroller.querySelectorAll("article");
    const max = scroller.scrollWidth - scroller.clientWidth;
    const padding = parseFloat(getComputedStyle(scroller).paddingLeft);
    const left =
      index === articles.length - 1
        ? max
        : article.getBoundingClientRect().left -
          scroller.getBoundingClientRect().left +
          scroller.scrollLeft -
          padding;
    setActive(index);
    scroller.scrollTo({ left });
  };

  return (
    <section className="bg-[#D9D5F4] py-12 lg:py-16">
      <h2 className="site-pad text-[clamp(32px,6vw,49px)] leading-[1.15] font-medium tracking-[-0.03em] text-black">
        Built for any shift.
      </h2>

      <div
        ref={scrollerRef}
        className="site-pad mt-6 flex gap-[13px] overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <article className="w-[min(702px,86vw)] shrink-0">
          <div className="relative flex h-[375px] items-start justify-center overflow-hidden rounded-[22px] bg-white px-6 pt-[72px]">
            <CardTitle>Modular sense units.</CardTitle>
            <img
              src="/shift/sense.png"
              alt=""
              className="pointer-events-none absolute top-[21%] left-[14%] h-[77%] w-[73%] object-contain"
            />
          </div>
          <p className="mt-[13px] max-w-[652px] text-[18px] leading-[26px] tracking-[-0.2px] text-black/60 sm:text-[20px]">
            <span className="font-semibold">Modular sense units.</span> {cards[0].body}
          </p>
        </article>

        <article className="w-[min(702px,86vw)] shrink-0">
          <div className="relative h-[375px] overflow-hidden rounded-[22px] bg-white">
            <img
              src="/shift/hands.png"
              alt=""
              className="pointer-events-none absolute top-[2%] left-0 w-[84%] max-w-none"
            />
            <div className="absolute inset-x-0 top-[68px] flex justify-center px-6">
              <CardTitle>Hands in full view.</CardTitle>
            </div>
          </div>
          <p className="mt-[13px] max-w-[652px] text-[18px] leading-[26px] tracking-[-0.2px] text-black/60 sm:text-[20px]">
            <span className="font-semibold">Hands in full view.</span> {cards[1].body}
          </p>
        </article>

        <article className="w-[min(702px,86vw)] shrink-0">
          <div className="relative flex h-[375px] flex-col items-center overflow-hidden rounded-[22px] bg-white px-6 pt-[65px]">
            <CardTitle>Synced to the millisecond.</CardTitle>
            <div className="relative mt-6 h-[227px] w-[371px] max-w-full">
              <img
                src="/shift/sync.png"
                alt=""
                className="absolute top-0 left-1/2 h-[173px] w-[85%] -translate-x-1/2 rounded-[22px] object-cover opacity-10"
              />
              <img
                src="/shift/sync.png"
                alt=""
                className="absolute top-[6px] left-1/2 h-[180px] w-[88%] -translate-x-1/2 rounded-[22px] object-cover opacity-10"
              />
              <img
                src="/shift/sync.png"
                alt=""
                className="absolute top-[15px] left-1/2 h-[191px] w-[93%] -translate-x-1/2 rounded-[22px] object-cover opacity-25"
              />
              <img
                src="/shift/sync.png"
                alt="First-person view of stocking shelves"
                className="absolute top-[22px] left-1/2 h-[205px] w-full -translate-x-1/2 rounded-[22px] object-cover"
              />
            </div>
          </div>
          <p className="mt-[13px] max-w-[652px] text-[18px] leading-[26px] tracking-[-0.2px] text-black/60 sm:text-[20px]">
            <span className="font-semibold">Synced to the millisecond.</span> {cards[2].body}
          </p>
        </article>

        <article className="w-[min(702px,86vw)] shrink-0">
          <div className="relative h-[375px] overflow-hidden rounded-[22px] bg-white">
            <img
              src="/shift/power.png"
              alt=""
              className="absolute inset-x-0 top-[9%] h-[91%] w-full object-contain"
            />
            <div className="absolute inset-x-0 top-[72px] flex justify-center px-6">
              <CardTitle>Swap power, keep recording.</CardTitle>
            </div>
          </div>
          <p className="mt-[13px] max-w-[652px] text-[18px] leading-[26px] tracking-[-0.2px] text-black/60 sm:text-[20px]">
            <span className="font-semibold">Swap power, keep recording.</span> {cards[3].body}
          </p>
        </article>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="flex h-[34px] items-center gap-3 rounded-full bg-[#e6e6e9] px-4">
          {cards.map((card, index) => (
            <button
              key={card.title}
              type="button"
              aria-label={card.title}
              onClick={() => goTo(index)}
              className={`rounded-full bg-[#8e8e93] ${
                index === active ? "h-2 w-8" : "h-2 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
