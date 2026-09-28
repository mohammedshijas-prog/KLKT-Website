"use client";

import { useState } from "react";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const reasons = [
  {
    title: "Backed by a registered company in the UAE",
    body: "KLKT is operated by CNTXT AI, a data and AI company based in Abu Dhabi. Your work goes into AI projects that are reviewed and paid.",
  },
  {
    title: "Clear by design",
    body: "Every task explains what to do and how it is paid. Your task status and earnings are visible in the app.",
  },
  {
    title: "Money, not points",
    body: "Paid in US dollars, by PayPal or a payment method available in your country. No points, no vouchers, no minimum-balance games.",
  },
  {
    title: "Nothing to pay, ever",
    body: "Joining, tasks and cashout are all free. We never ask you for a fee, a deposit or a payment of any kind.",
  },
] as const;

export function ConfidenceSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#D9D5F4] py-16 sm:py-24 lg:py-28">
      <div className="site grid items-stretch gap-3 lg:min-h-[529px] lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-10 lg:max-w-[554px]">
          <h2 className="text-[clamp(32px,4.2vw,49px)] leading-[1.2] font-medium tracking-[-0.02em] text-black">
            <span className="block">Built for you to earn with</span>
            <span className="block">confidence</span>
          </h2>
          <ul className="flex flex-col gap-2">
            {reasons.map((reason, index) => {
              const expanded = open === index;
              return (
                <li key={reason.title}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpen(index)}
                    className={`w-full rounded-[14px] px-[21px] text-left ${focus} ${
                      expanded
                        ? "flex min-h-[138px] flex-col justify-center gap-2.5 bg-white py-4"
                        : "flex h-12 items-center bg-white/50"
                    }`}
                  >
                    <span className="text-[20px] leading-6 font-medium tracking-[-0.2px] text-black">
                      {reason.title}
                    </span>
                    {expanded ? (
                      <span className="max-w-[488px] text-[16px] leading-6 tracking-[0.16px] text-black/60">
                        {reason.body}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative h-[320px] overflow-hidden rounded-[21px] bg-[#ecebe5] sm:h-[420px] lg:h-auto lg:min-h-[529px]">
          <img
            src="/home/confidence-photo.png"
            alt=""
            width={720}
            height={800}
            className="absolute top-[-17%] left-0 h-[134%] w-full max-w-none object-cover blur-[3px]"
          />
          <span className="absolute top-[10px] left-[10px] flex size-4 items-center justify-center border border-[#fafaf8]/85 text-[8px] leading-[9px] text-[#fafaf8]">
            {String(open + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
