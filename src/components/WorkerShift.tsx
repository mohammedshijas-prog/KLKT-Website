"use client";

import { useEffect, useRef, type ReactNode } from "react";

const features = [
  {
    title: "Consent & pay, in-language",
    body: "Every worker reads what is recorded and how they are paid, in their language, and agrees in the app.",
    icon: "/workers/shift/icon-consent.svg",
  },
  {
    title: "Check-in, tasks & earnings",
    body: "Workers check in, see their tasks for the shift, and track accepted hours and earnings.",
    icon: "/workers/shift/icon-tasks.svg",
  },
  {
    title: "Noor copilot, 5 languages",
    body: "Noor guides workers through each task, so your supervisors don't have to.",
    icon: "/workers/shift/icon-noor.svg",
  },
  {
    title: "Levels: Starter → Expert",
    body: "Workers move up five levels as they gain skill and trust. Each level opens more work.",
    icon: "/workers/shift/icon-levels.svg",
  },
];

const ticks = [6, 4, 4, 8, 4, 4, 10, 4, 4, 8, 4, 4, 6];

function MockFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[274px] w-full max-w-[476px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#ffffff_0%,#d5c2fe_136%)]">
      <div className="absolute top-0 left-1/2 h-[274px] w-[300px] -translate-x-1/2">{children}</div>
    </div>
  );
}

function GradientButton({ children }: { children: string }) {
  return (
    <div className="relative flex h-[50px] w-full items-center justify-center overflow-hidden rounded-[32px]">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#7c40ff] to-[#2e035d]" />
      <span className="relative text-[16px] leading-4 font-semibold text-white">{children}</span>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_1px_1px_0px_0px_rgba(255,255,255,0.05),inset_0px_0px_2px_1px_rgba(125,64,255,0.6),inset_0px_0px_20px_0px_rgba(255,255,255,0.6)]" />
    </div>
  );
}

function ConsentVisual() {
  return (
    <MockFrame>
      <p className="pt-6 text-center text-[20px] leading-none font-semibold tracking-[-0.4px] text-black">
        Consent
      </p>
      <div className="mx-auto mt-4 flex h-[41px] w-[269px] items-center rounded-[33px] bg-white/25 p-1">
        <span className="flex h-[31px] w-1/2 items-center justify-center rounded-[37px] bg-[#e5daff] text-[14px] leading-4 font-medium text-[#171717]">
          English
        </span>
        <span className="flex h-[31px] w-1/2 items-center justify-center text-[14px] leading-4 font-medium text-[#171717]">
          العربية
        </span>
      </div>
      <div className="mt-8 flex flex-col gap-[11px] px-5">
        {["I agree to be recorded", "I understand how I am paid"].map((label) => (
          <div key={label} className="flex items-center gap-[9px]">
            <span className="flex size-[21px] items-center justify-center rounded-[7px] bg-[#7c40ff]">
              <img src="/workers/shift/check.svg" alt="" className="size-4 brightness-0 invert" />
            </span>
            <span className="text-[14px] leading-4 font-medium text-[#171717]">{label}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-[9px] bottom-[8px]">
        <GradientButton>Agree and start</GradientButton>
      </div>
    </MockFrame>
  );
}

function TaskCard({
  title,
  className,
  hourglass,
}: {
  title: string;
  className: string;
  hourglass: string;
}) {
  return (
    <div className={`absolute flex flex-col items-start rounded-[22px] p-3 ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#c2a6ff_25%,#7c40ff_75%)]" />
        <img src="/workers/shift/card-texture.png" alt="" className="size-full object-cover opacity-20" />
      </div>
      <span className="relative flex items-center gap-[5px] rounded-[14px] bg-black/10 px-2.5 py-[5px]">
        <img src={hourglass} alt="" className="size-3" />
        <span className="text-[11px] font-semibold text-white">15 min</span>
      </span>
      <span className="absolute bottom-[18px] left-3">
        <span className="block text-[9px] text-white/60">Next task</span>
        <span className="block text-[14px] font-bold text-white">{title}</span>
      </span>
    </div>
  );
}

function TasksVisual() {
  return (
    <MockFrame>
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="flex size-[30px] items-center justify-center rounded-[15px] bg-black/10">
          <img src="/workers/shift/chevron-left.svg" alt="" className="size-3.5" />
        </span>
        <p className="text-[17px] font-bold text-black">Tasks</p>
        <span className="flex size-[30px] items-center justify-center rounded-[15px] bg-black/10">
          <img src="/workers/shift/plus.svg" alt="" className="size-3.5" />
        </span>
      </div>
      <div className="relative h-[160px]">
        <TaskCard
          title="Pick & pack"
          hourglass="/workers/shift/hourglass.svg"
          className="top-[18px] left-[-8px] h-[125px] w-[125px] -rotate-[12deg]"
        />
        <TaskCard
          title="Laundry"
          hourglass="/workers/shift/hourglass-light.svg"
          className="top-[16px] right-[-10px] h-[125px] w-[125px] rotate-[17deg]"
        />
        <TaskCard
          title="Clean the kitchen"
          hourglass="/workers/shift/hourglass-light.svg"
          className="top-[7px] left-[78px] z-10 h-[145px] w-[145px] shadow-[0px_8px_12px_rgba(0,0,0,0.35)]"
        />
      </div>
      <div className="flex flex-col items-center gap-1 pt-1">
        <div className="flex h-4 items-end gap-1.5">
          {ticks.map((height, index) => (
            <span
              key={index}
              className="w-px rounded-[1px] bg-[#777]"
              style={{ height }}
            />
          ))}
        </div>
        <p className="text-[26px] leading-none font-light text-black">13:32</p>
      </div>
    </MockFrame>
  );
}

function NoorVisual() {
  return (
    <MockFrame>
      <div className="flex h-[47px] items-center gap-2 border-b border-[#cfc5c5] px-4">
        <span className="relative h-[29px] w-[30px] overflow-hidden">
          <img
            src="/workers/shift/noor.png"
            alt=""
            className="absolute h-[160%] w-[204%] max-w-none top-[-30%] left-[-52%]"
          />
        </span>
        <p className="text-[22px] leading-none font-medium tracking-[-0.72px] text-black">Noor</p>
      </div>
      <div className="mt-6 flex justify-end px-3">
        <span className="rounded-[37px] bg-[#e5daff] px-4 py-2 text-[14px] leading-4 font-medium text-[#171717]">
          What should I record next?
        </span>
      </div>
      <div className="mt-4 ml-3 w-[197px] rounded-[12px] bg-white px-3 py-2.5 text-[14px] leading-4 font-medium text-black">
        Restock shelves in aisle 4.
        <br />
        Keep both hands in view.
      </div>
      <div className="absolute bottom-6 left-3 flex gap-1">
        {["English", "العربية", "+3 more"].map((label) => (
          <span
            key={label}
            className="flex h-6 w-[65px] items-center justify-center rounded-[37px] bg-[#fefefe] text-[11px] leading-4 font-medium text-[#171717]"
          >
            {label}
          </span>
        ))}
      </div>
    </MockFrame>
  );
}

const levels = [
  { mark: "✓", label: "Starter", done: true },
  { mark: "2", label: "Camera", done: true },
  { mark: "3", label: "Labeller", done: false },
  { mark: "4", label: "Operator", done: false },
  { mark: "5", label: "Expert", done: false },
];

function LevelsVisual() {
  return (
    <MockFrame>
      <div className="flex h-full flex-col items-center px-4 pt-5 pb-4">
        <span className="flex size-[52px] items-center justify-center rounded-[12px] bg-[#7c40ff]/20">
          <img src="/workers/shift/camera.svg" alt="" className="size-8" />
        </span>
        <p className="mt-3 text-center text-[18px] font-bold text-black">Camera & consent</p>
        <p className="mt-1 text-center text-[13px] text-[#8e8e93]">Level 2 of 5</p>
        <div className="mt-3 flex w-full justify-between">
          {levels.map((level) => (
            <div key={level.label} className="flex w-12 flex-col items-center gap-1">
              <span
                className={`flex size-6 items-center justify-center rounded-[12px] text-[14px] ${
                  level.done
                    ? "bg-[#fafafc] font-medium text-[#09080e]"
                    : "border-[1.5px] border-[#e1d4ff] bg-black font-semibold text-[#a399b0]"
                }`}
              >
                {level.mark}
              </span>
              <span className={`text-[9.5px] font-semibold ${level.done ? "text-black" : "text-[#898585]"}`}>
                {level.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-auto w-full">
          <GradientButton>See what&apos;s next</GradientButton>
        </div>
      </div>
    </MockFrame>
  );
}

const visuals = [ConsentVisual, TasksVisual, NoorVisual, LevelsVisual];

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function WorkerShift() {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const reveal = () => {
      frame = 0;
      const start = window.innerHeight * 0.62;
      const end = window.innerHeight * 0.2;
      cardRefs.current.forEach((card) => {
        const panel = card?.querySelector<HTMLElement>("[data-reveal]");
        if (!card || !panel) return;
        if (reduce) {
          panel.style.opacity = "1";
          panel.style.transform = "none";
          return;
        }
        const progress = smooth((start - card.getBoundingClientRect().top) / (start - end));
        panel.style.opacity = String(progress);
        panel.style.transform = `translate3d(0, ${(1 - progress) * -72}px, 0) scale(${1.06 - progress * 0.06})`;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(reveal);
    };

    reveal();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="bg-white py-20 sm:py-[105px]">
      <div className="site flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <aside className="lg:sticky lg:top-28 lg:w-[min(464px,42%)] lg:shrink-0">
          <h2 className="max-w-[464px] text-[clamp(32px,6vw,46px)] leading-[1.12] font-medium tracking-[-0.03em] text-black">
            One app for your whole shift
          </h2>
        </aside>
        <div className="flex w-full max-w-[556px] shrink-0 flex-col gap-10 lg:w-[min(556px,48%)]">
          {features.map((feature, index) => {
            const Visual = visuals[index];
            return (
              <article
                key={feature.title}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                data-index={index}
                className="scroll-mt-28"
              >
                <div
                  data-reveal
                  className="origin-top rounded-[24px] border border-black/10 bg-white p-6 opacity-0 will-change-transform sm:p-10"
                >
                  <img src={feature.icon} alt="" className="size-10 object-contain" />
                  <h3 className="mt-5 text-[22px] leading-[28.8px] font-medium tracking-[-0.72px] text-black">
                    {feature.title}
                  </h3>
                  <div className="my-8 flex justify-center sm:my-10">
                    <Visual />
                  </div>
                  <p className="text-[15px] leading-[19.2px] tracking-[-0.32px] text-black/60">
                    {feature.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
