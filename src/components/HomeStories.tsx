"use client";

import { useEffect, useState } from "react";

const stories = [
  {
    src: "/workers/jobs/stocker.png",
    alt: "A shelf stocker reaching for a box",
    caption:
      "Record the shift. Capture the work you already do, from the aisle to the line.",
  },
  {
    src: "/workers/jobs/cook.png",
    alt: "A line cook working a shift",
    caption: "Get paid daily. Everyday tasks turn into payouts, and it stays free to join.",
  },
  {
    src: "/workers/jobs/housekeeper.png",
    alt: "A housekeeper making a bed",
    caption: "Ask Noor. Get the next step on the job without waiting for a supervisor.",
  },
  {
    src: "/workers/jobs/hospital.png",
    alt: "A hospital porter moving through a ward",
    caption: "Every kind of shift. The same app works in warehouses, kitchens, and hospitals.",
  },
];

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 12 20" className="h-4 w-2.5" aria-hidden>
      <path
        d={direction === "left" ? "M10 2 L2 10 L10 18" : "M2 2 L10 10 L2 18"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeStories() {
  const [index, setIndex] = useState(0);
  const [desktop, setDesktop] = useState(true);
  const perView = desktop ? 2 : 1;
  const maxIndex = Math.max(0, stories.length - perView);
  const safeIndex = Math.min(index, maxIndex);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const apply = () => setDesktop(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <section className="bg-white px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <h2 className="text-[34px] leading-[1.1] font-semibold tracking-[-0.7px] text-[#1d1d1f] sm:text-[48px]">
          Whatever the shift looks like.
        </h2>
        <div className="mt-8 overflow-hidden sm:mt-10">
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{
              width: `${(stories.length / perView) * 100}%`,
              transform: `translateX(-${(safeIndex / stories.length) * 100}%)`,
            }}
          >
            {stories.map((story) => (
              <article key={story.src} className="shrink-0" style={{ width: `${100 / stories.length}%` }}>
                <div className="sm:px-2.5">
                  <img
                    src={story.src}
                    alt={story.alt}
                    className="aspect-[4/3] w-full rounded-[22px] object-cover"
                  />
                  <p className="mt-4 max-w-[520px] text-[15px] leading-[1.35] text-[#1d1d1f] sm:text-[17px]">
                    {story.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            aria-label="Previous"
            disabled={safeIndex === 0}
            onClick={() => setIndex((current) => Math.max(0, Math.min(current, maxIndex) - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 text-[#1d1d1f] disabled:opacity-30"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={safeIndex >= maxIndex}
            onClick={() => setIndex((current) => Math.min(maxIndex, Math.min(current, maxIndex) + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 text-[#1d1d1f] disabled:opacity-30"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
