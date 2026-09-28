"use client";

import { useState } from "react";

const tools = [
  {
    label: "Designed for calm, not chaos",
    body: "Fixa removes the clutter that makes planning feel exhausting. Every screen is built to be clear, gentle, and easy to follow so you can focus on doing, not figuring things out.",
  },
  {
    label: "The effortless way to begin",
    body: "When starting feels hard, Fixa offers simple days to begin with — some inspired by familiar celebrity routines.",
  },
  {
    label: "Stay fully focused",
    body: "Turn on the timer to stay in the zone and minimize distractions. Knowing how much time you have makes it easier to complete tasks efficiently.",
  },
  {
    label: "Small steps. Zero guilt",
    body: "Become the best version of yourself. Grow your streak, celebrate your wins, and trust the process as small wins lead to big transformations.",
  },
];

function CalmVisual() {
  return (
    <div className="relative mx-auto h-[210px] w-full max-w-[280px]">
      <div className="absolute top-8 left-2 w-[108px] -rotate-6 rounded-2xl bg-gradient-to-b from-[#ffb067] to-[#ff5a3c] p-3 text-left text-white shadow-lg">
        <p className="text-[11px] opacity-80">15 min</p>
        <p className="mt-6 text-[13px] font-medium">Next task</p>
      </div>
      <div className="absolute top-3 left-1/2 z-10 w-[124px] -translate-x-1/2 rounded-2xl bg-gradient-to-b from-[#ffe08a] to-[#ff9a2e] p-3 text-left text-[#1d1d1f] shadow-xl">
        <p className="text-[11px]">30 min</p>
        <p className="mt-8 text-[13px] font-semibold">Clean the kitchen</p>
      </div>
      <div className="absolute top-8 right-2 w-[108px] rotate-6 rounded-2xl bg-gradient-to-b from-[#8fd3ff] to-[#3b82f6] p-3 text-left text-white shadow-lg">
        <p className="text-[11px] opacity-80">1 hour</p>
        <p className="mt-6 text-[13px] font-medium">Open the kitchen</p>
      </div>
      <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[28px] font-medium tracking-[-0.6px] text-white">
        8:00
      </p>
    </div>
  );
}

function BeginVisual() {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-[22px] bg-gradient-to-b from-[#f6e27a] to-[#c9a227] p-5 text-center text-[#1d1d1f]">
      <p className="text-[18px] font-semibold">Feeling stuck?</p>
      <p className="mt-2 text-[13px] leading-[1.35] text-black/70">
        You don’t have to figure it out. Just pick a plan and follow the steps.
      </p>
      <div className="mt-5 rounded-xl bg-black/75 py-2.5 text-[14px] text-white">Pick a day</div>
      <div className="mt-2 rounded-xl bg-black/90 py-2.5 text-[14px] text-white">Create your own day</div>
    </div>
  );
}

function FocusVisual() {
  return (
    <div className="mx-auto flex h-[210px] w-[210px] items-center justify-center rounded-full border-[10px] border-white/15">
      <div className="text-center text-white">
        <p className="text-[40px] leading-none font-medium tracking-[-1px]">25:00</p>
        <p className="mt-2 text-[13px] text-white/60">Stay in the zone</p>
      </div>
    </div>
  );
}

function StepsVisual() {
  return (
    <div className="mx-auto w-full max-w-[260px] text-center text-white">
      <p className="text-[56px] leading-none font-medium tracking-[-1.5px]">12</p>
      <p className="mt-1 text-[14px] text-white/60">day streak</p>
      <div className="mt-5 flex justify-center gap-2">
        {["Done", "Done", "Next"].map((item) => (
          <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-[12px]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const visuals = [CalmVisual, BeginVisual, FocusVisual, StepsVisual];

export function FixaTools() {
  const [active, setActive] = useState(0);
  const Visual = visuals[active];

  return (
    <section id="features" className="bg-[#f6f5f2] px-6 py-20 sm:px-10 sm:py-28 lg:px-[83px]">
      <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-[1fr_minmax(320px,460px)] lg:gap-16">
        <div>
          <h2 className="max-w-[12ch] text-[40px] leading-[1.05] font-medium tracking-[-1px] text-[#1d1d1f] sm:text-[56px] sm:tracking-[-1.4px]">
            Tools that work with your mind, not against it
          </h2>
          <div className="mt-8 flex flex-col items-start gap-2">
            {tools.map((tool, index) => {
              const selected = index === active;
              return (
                <button
                  key={tool.label}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`rounded-lg px-3 py-2 text-left text-[15px] leading-none tracking-[-0.2px] ${
                    selected ? "bg-[#1d1d1f] text-white" : "bg-[#e7e7ea] text-[#6e6e73]"
                  }`}
                >
                  {tool.label}
                </button>
              );
            })}
          </div>
          <p className="mt-16 max-w-[280px] text-[15px] leading-[1.4] text-[#6e6e73]">
            No clutter. No complicated setup.
            <br />
            Just your day, clearly planned.
          </p>
          <a
            href="#contact"
            className="mt-5 inline-flex rounded-lg bg-[#1d1d1f] px-4 py-2.5 text-[14px] font-medium text-white"
          >
            Join the waitlist
          </a>
        </div>

        <div className="rounded-[28px] bg-[#1c1c1e] px-6 py-8 text-white sm:px-8">
          <h3 className="text-[22px] leading-[1.2] font-medium tracking-[-0.4px]">{tools[active].label}</h3>
          <div className="mt-8">
            <Visual />
          </div>
          <p className="mt-8 text-[14px] leading-[1.45] text-white/65">{tools[active].body}</p>
        </div>
      </div>
    </section>
  );
}
