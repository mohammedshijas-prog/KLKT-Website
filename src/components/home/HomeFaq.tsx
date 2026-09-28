"use client";

import { useState } from "react";

const items = [
  {
    question: "Is KLKT safe?",
    answer:
      "KLKT is run by CNTXT AI, a registered company in Abu Dhabi. You never pay to join, and you are paid for work that is accepted.",
  },
  {
    question: "Is KLKT free?",
    answer: "Yes. Joining is free. Doing tasks is free. Cashing out is free. There are no fees, ever.",
  },
  {
    question: "What tasks will I do?",
    answer:
      "Simple things on your phone. You might photograph handwritten pages, or record everyday activities at home. Each task tells you what to do before you start.",
  },
  {
    question: "How much can I earn?",
    answer:
      "It depends on the task and on how much accepted work you send. This is extra income, not a salary. Each task shows how it is paid before you begin.",
  },
  {
    question: "When and how do I get paid?",
    answer:
      "Accepted work is paid in US dollars, by PayPal or a local method. The app shows each submission and when a payment is on the way.",
  },
  {
    question: "Why do submissions get rejected?",
    answer:
      "A submission is turned down when it does not follow the instructions. A photo may be unclear, or a recording may be too short. The app tells you why, and you can try again.",
  },
  {
    question: "Which countries can join?",
    answer:
      "The app shows the tasks open where you are. If nothing is open yet, new tasks are added regularly.",
  },
  {
    question: "What about my privacy?",
    answer:
      "You choose what to send. We use it only for the task you picked. We do not sell your personal details.",
  },
];

export function HomeFaq() {
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
