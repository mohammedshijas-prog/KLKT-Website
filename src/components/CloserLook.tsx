"use client";

import { useState } from "react";

const items = [
  {
    label: "Modular design",
    body: "Modular design. Up to 8 sense units clip onto the band. Each one attaches in seconds, so the setup fits the task.",
  },
  {
    label: "Camera",
    body: "ST VD66GY camera with a 90° field of view and 1.5 megapixels. Global shutter at 1360 × 1120 pixels, so fast movement stays sharp.",
  },
  {
    label: "Motion",
    body: "A 6-axis IMU with onboard sensor fusion tracks head movement, sampling 400 times a second.",
  },
  {
    label: "Sync",
    body: "Every camera records at 30 FPS, synced with under 1 ms jitter, so all views line up frame by frame.",
  },
  {
    label: "Stream & storage",
    body: "Footage streams in real time over Wi-Fi and is saved to the onboard SD card as MP4 (H.264).",
  },
  {
    label: "Battery",
    body: "An external USB-C battery powers the headband. The onboard battery lasts under an hour, enough to hot-swap without stopping the recording.",
  },
  {
    label: "Weight",
    body: "The full headband weighs under 150 g, light enough to wear through a whole shift.",
  },
];

const visuals: Record<string, { src: string; alt: string }> = {
  Camera: { src: "/closer/camera.png?v=2", alt: "Exploded camera sense unit" },
  Motion: { src: "/closer/motion.png?v=2", alt: "Motion sensor board" },
  Sync: { src: "/closer/sync.png?v=2", alt: "Runners recorded at 30 frames per second" },
  "Stream & storage": { src: "/closer/stream.png", alt: "Wi-Fi board for streaming and storage" },
  Battery: { src: "/closer/battery.png", alt: "Battery cell" },
};

export function CloserLook() {
  const [active, setActive] = useState<number | null>(null);
  const image =
    (active !== null && visuals[items[active].label]) || {
      src: "/roboband.png",
      alt: "Data collection headband",
    };

  return (
    <section className="bg-white pt-12 pb-4 sm:pt-16 sm:pb-6">
      <div className="site">
      <h2 className="text-center text-[40px] leading-[1.05] font-medium tracking-[-0.8px] text-[#1d1d1f] sm:text-[56px] sm:tracking-[-1.2px]">
        Take a closer look.
      </h2>

      <div className="mt-8 flex flex-col items-center gap-8 rounded-[32px] bg-[#f5f5f7] px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-12">
        <div className="flex w-full max-w-[340px] flex-col items-start gap-3.5">
          {items.map((item, index) =>
            active === index ? (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(null)}
                aria-expanded="true"
                className="w-full rounded-[22px] bg-[#e8e8ed] px-6 py-5 text-left"
              >
                <p className="text-[17px] leading-[1.35] font-medium tracking-[-0.2px] text-[#1d1d1f]">
                  {item.body}
                </p>
              </button>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(index)}
                aria-expanded="false"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#ececef] py-2 pr-5 pl-2 text-[17px] leading-none font-medium tracking-[-0.2px] text-[#1d1d1f]"
              >
                <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#1d1d1f] text-[16px] leading-none">
                  +
                </span>
                {item.label}
              </button>
            ),
          )}
        </div>

        <img
          src={image.src}
          alt={image.alt}
          width={1672}
          height={941}
          className="h-auto w-full max-w-[640px] object-contain"
        />
      </div>
      </div>
    </section>
  );
}
