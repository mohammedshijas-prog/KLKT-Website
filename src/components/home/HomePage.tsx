import { FadeIn } from "@/components/home/FadeIn";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeNav } from "@/components/home/HomeNav";
import { SiteFooter } from "@/components/home/SiteFooter";
import { StoreButtons } from "@/components/home/StoreButtons";

const promises = [
  { title: "Clear instructions", line: "for every task", icon: "list" },
  { title: "Paid in US dollars", line: "by PayPal or a local method", icon: "card" },
  { title: "Money, never points", line: "or gift cards", icon: "cash" },
  { title: "Free to join", line: "no fees, ever", icon: "check" },
];

const steps = [
  { title: "Download KLKT", body: "Free on the App Store and Google Play." },
  { title: "Pick your task", body: "Read the instructions and see what is open in your country." },
  { title: "Submit from your phone", body: "Track every submission and your earnings in the app." },
  { title: "Get paid", body: "Accepted work is paid in US dollars, by PayPal or a local method." },
];

const reasons = [
  {
    title: "Backed by a registered company in the UAE",
    body: "KLKT is run by CNTXT AI, based in Abu Dhabi.",
  },
  {
    title: "Clear by design",
    body: "Every task explains what to do and how it is paid.",
  },
  {
    title: "Money, not points",
    body: "Paid in US dollars. No vouchers, no games.",
  },
  {
    title: "Nothing to pay, ever",
    body: "Joining, tasks and cashout are all free.",
  },
];

function Icon({ name }: { name: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 28 28",
    fill: "none",
    "aria-hidden": true as const,
    className: "text-[var(--accent)]",
  };
  if (name === "list") {
    return (
      <svg {...common}>
        <path d="M8 9h12M8 14h12M8 19h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "card") {
    return (
      <svg {...common}>
        <rect x="5" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 12h18" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (name === "cash") {
    return (
      <svg {...common}>
        <rect x="4" y="8" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="14" cy="14" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 14.2l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function HomePage() {
  return (
    <>
      <HomeNav />
      <main>
        <HomeHero />

        <section className="mx-auto max-w-[1100px] px-6 py-24 sm:py-32">
          <FadeIn>
            <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {promises.map((item) => (
                <li key={item.title}>
                  <Icon name={item.icon} />
                  <p className="mt-4 text-[18px] font-semibold leading-snug text-[var(--ink)]">{item.title}</p>
                  <p className="mt-1 text-[16px] leading-snug text-[var(--muted)]">{item.line}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>

        <section className="mx-auto max-w-[1100px] px-6 pb-24 sm:pb-32">
          <FadeIn>
            <p className="text-[15px] font-medium text-[var(--muted)]">How it works</p>
            <h2 className="mt-3 max-w-[16ch] text-[40px] leading-[1.05] text-[var(--ink)] sm:text-[56px]">
              From download to payment in four steps.
            </h2>
            <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {steps.map((step, index) => (
                <li key={step.title} className="rounded-[28px] bg-[var(--lavender)] p-8">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[16px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-6 text-[24px] text-[var(--ink)]">{step.title}</h3>
                  <p className="mt-2 text-[16px] leading-[1.5] text-[var(--muted)]">{step.body}</p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </section>

        <section className="mx-auto max-w-[1100px] px-6 pb-24 sm:pb-32">
          <FadeIn>
            <h2 className="max-w-[12ch] text-[40px] leading-[1.05] text-[var(--ink)] sm:text-[56px]">
              Choose what fits you.
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <article className="overflow-hidden rounded-[32px] bg-[var(--lavender)]">
                <img
                  src="/workers/jobs/housekeeper.png"
                  alt="Person doing household work"
                  className="h-64 w-full object-cover sm:h-80"
                />
                <div className="p-8">
                  <h3 className="text-[28px] leading-tight text-[var(--ink)]">
                    Photograph handwritten Arabic documents
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.5] text-[var(--muted)]">
                    Photograph handwritten Arabic pages, at least 50 words each.{" "}
                    <span className="text-[var(--ink)]">Paid per accepted page.</span> No experience needed.
                  </p>
                  <a
                    href="#get-the-app"
                    className="mt-6 inline-flex h-12 items-center rounded-full bg-[var(--ink)] px-5 text-[15px] font-semibold text-[var(--bg)]"
                  >
                    Start this task
                  </a>
                </div>
              </article>
              <article className="overflow-hidden rounded-[32px] bg-[var(--lavender)]">
                <img
                  src="/workers/jobs/cook.png"
                  alt="Person preparing food at home"
                  className="h-64 w-full object-cover sm:h-80"
                />
                <div className="p-8">
                  <h3 className="text-[28px] leading-tight text-[var(--ink)]">Record everyday activities</h3>
                  <p className="mt-3 text-[16px] leading-[1.5] text-[var(--muted)]">
                    Record everyday tasks at home from your point of view, with your phone on a head strap.{" "}
                    <span className="text-[var(--ink)]">Paid per accepted hour.</span>
                  </p>
                  <a
                    href="#get-the-app"
                    className="mt-6 inline-flex h-12 items-center rounded-full bg-[var(--ink)] px-5 text-[15px] font-semibold text-[var(--bg)]"
                  >
                    Start this task
                  </a>
                </div>
              </article>
            </div>
            <p className="mt-6 text-[15px] text-[var(--muted)]">New tasks are added regularly.</p>
          </FadeIn>
        </section>

        <section className="mx-auto max-w-[1100px] px-6 pb-24 sm:pb-32">
          <FadeIn>
            <h2 className="text-[40px] leading-[1.05] text-[var(--ink)] sm:text-[56px]">Why KLKT</h2>
            <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
              {reasons.map((reason) => (
                <li key={reason.title}>
                  <Icon name="check" />
                  <h3 className="mt-4 text-[24px] leading-tight text-[var(--ink)]">{reason.title}</h3>
                  <p className="mt-2 max-w-[36ch] text-[16px] leading-[1.5] text-[var(--muted)]">{reason.body}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>

        <section className="mx-auto max-w-[1100px] px-6 pb-24 sm:pb-32" aria-labelledby="faq-title">
          <FadeIn>
            <h2 id="faq-title" className="text-[40px] leading-[1.05] text-[var(--ink)] sm:text-[56px]">
              Questions
            </h2>
            <HomeFaq />
          </FadeIn>
        </section>

        <section className="mx-auto max-w-[1100px] px-6 pb-24 sm:pb-28">
          <FadeIn>
            <div className="rounded-[32px] bg-[var(--panel)] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
              <h2 className="text-[40px] leading-[1.05] text-white sm:text-[56px]">Your first task is waiting.</h2>
              <p className="mx-auto mt-4 max-w-[36ch] text-[18px] leading-[1.45] text-white/75">
                Download KLKT, pick a task, and get paid for accepted work.
              </p>
              <StoreButtons className="mt-8" />
              <ul className="mt-8 flex flex-col items-center gap-3 text-[14px] text-white/80 sm:flex-row sm:justify-center sm:gap-6">
                {["By CNTXT AI, Abu Dhabi", "Paid in US dollars", "Free to join"].map((item) => (
                  <li key={item} className="inline-flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3.5 8.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
