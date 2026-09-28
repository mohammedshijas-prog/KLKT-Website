"use client";

import { useState } from "react";

const items = [
  {
    question: "What is the difference between a partner and a collector?",
    answer:
      "A partner runs a site, such as a warehouse, kitchen, hotel, hospital, or facility, and is paid for giving access. A collector is a person, 18 or older, who uses the KLKT app and is paid for accepted work.",
  },
  {
    question: "How is the estimate calculated?",
    answer:
      "For a partner, it is workers times hours per day times working days, times the share that is accepted, times the rate per hour. For a collector, it is the daily amount times days per week, times the share that is accepted, times the rate. A month is that weekly figure times 52, divided by 12.",
  },
  {
    question: "What are the real rates?",
    answer:
      "The real rates are not confirmed yet. The numbers in the calculators are placeholders for illustration only.",
  },
  {
    question: "Do we need to buy devices?",
    answer: "This is not confirmed yet. Talk to us and we will explain what your site needs.",
  },
  {
    question: "How is consent handled?",
    answer: "Every worker agrees in the app, in their language, before anything is recorded.",
  },
];

export function BusinessFaq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-12 flex flex-col gap-3">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} className="rounded-[24px] bg-[var(--lavender)]">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-5 text-left text-[18px] font-semibold text-[var(--ink)] sm:text-[20px]"
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                {item.question}
                <span aria-hidden="true" className="text-[22px] leading-none text-[var(--accent)]">
                  {expanded ? "–" : "+"}
                </span>
              </button>
            </h3>
            {expanded ? (
              <p className="px-6 pb-6 text-[16px] leading-[1.5] text-[var(--muted)]">{item.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
