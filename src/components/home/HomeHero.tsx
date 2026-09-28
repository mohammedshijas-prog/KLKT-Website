"use client";

import { useState } from "react";
import { StoreButtons } from "@/components/home/StoreButtons";

export function HomeHero() {
  const [playing, setPlaying] = useState(true);

  return (
    <section className="relative mt-4 h-[100svh] min-h-[640px] overflow-hidden" id="get-the-app">
      <video
        src="/videos/home-hero.mp4"
        poster="/videos/home-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        ref={(node) => {
          if (node) node.muted = true;
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black/55" />

      <div className="relative flex h-full items-center justify-center px-6 text-center text-white">
        <div className="max-w-[820px]">
          <p className="text-[15px] font-medium tracking-[0.01em] text-white/80">
            KLKT by CNTXT AI
          </p>
          <h1 className="mt-4 text-[44px] leading-[1.02] text-white sm:text-[68px]">
            Get paid for everyday tasks, from your phone.
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[18px] leading-[1.45] text-white/90 sm:text-[20px]">
            Pick a task, do it on your phone, get paid for what is accepted. Free to join, always.
          </p>
          <StoreButtons className="mt-8" />
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          const video = event.currentTarget.parentElement?.querySelector("video");
          if (!video) return;
          if (video.paused) void video.play();
          else video.pause();
        }}
        aria-pressed={!playing}
        className="absolute right-5 bottom-5 inline-flex h-11 items-center rounded-full bg-white/90 px-4 text-[14px] font-semibold text-[#15121f]"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </section>
  );
}
