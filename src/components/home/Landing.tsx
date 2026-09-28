import { ConfidenceSection } from "@/components/home/ConfidenceSection";
import { HomeHeroStage } from "@/components/home/HomeHeroStage";
import { StoreBadges } from "@/components/home/StoreBadges";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const section = "site py-24 sm:py-36";

const promises = [
  {
    title: "Clear instructions",
    line: "for every task",
    image: "/home/promise-instructions.png",
    imageClass: "top-[26.1%] left-[7.8%] h-[73.9%] w-[84.7%] object-contain",
  },
  {
    title: "Paid in US dollars",
    line: "for every task",
    image: "/home/promise-paid.png",
    imageClass: "top-[36%] left-[7.8%] h-[73.9%] w-[84.7%] object-cover",
  },
  {
    title: "Money, never points",
    line: "or gift cards",
    image: "/home/promise-cash.png",
    imageClass: "top-[41.5%] left-[6.2%] h-[51.9%] w-[87.6%] object-contain",
  },
  {
    title: "Free to join",
    line: "no fees, ever",
    image: "/home/promise-free.png",
    imageClass: "",
  },
] as const;

const steps = [
  { title: "Download KLKT", body: "Free on the App Store and Google Play." },
  {
    title: "Pick your task",
    body: "Read the instructions and see what is open in your country before you start.",
  },
  {
    title: "Submit from your phone",
    body: "Track every submission and your earnings live in the app.",
  },
  {
    title: "Get paid",
    body: "Accepted work is paid in US dollars, by PayPal or a payment method available in your country.",
  },
];

const faqs = [
  {
    question: "Is KLKT safe? How do I know this isn't a scam?",
    answer:
      "Fair question, this category is full of fake earn-money apps. KLKT is operated by CNTXT AI, a registered data and AI company headquartered in the UAE (CNTXT-FZCO). You can look us up at cntxt.tech or on LinkedIn. We will never ask you for money, a deposit, or a fee of any kind. If anyone claiming to be KLKT asks you to pay anything, it is not us.",
  },
  {
    question: "Is KLKT free to use?",
    answer:
      "Yes. Joining and completing tasks are completely free. We will never ask you for a fee, a deposit, or a payment of any kind.",
  },
  {
    question: "What kind of tasks will I do?",
    answer:
      "Simple tasks you can do from your phone, like photographing handwritten Arabic documents or recording short videos of everyday activities. Each task shows its instructions and whether it is open in your country before you start.",
  },
  {
    question: "How much can I earn?",
    answer:
      "Each task is paid per accepted page or per accepted hour, and the amount depends on the project. KLKT is extra income in your spare time, not a full salary, and we will never promise otherwise.",
  },
  {
    question: "When and how do I get paid?",
    answer:
      "You are paid in US dollars for every accepted submission, by PayPal or a payment method available in your country.",
  },
  {
    question: "Why do submissions get rejected?",
    answer:
      "The most common reasons: blurry or dark photos, text cut off at the edges, screenshots or printed-only documents instead of handwriting, content that does not follow the instructions, or duplicates.",
  },
  {
    question: "Which countries can join?",
    answer:
      "KLKT is available in the countries listed on the App Store and Google Play. Anyone 18 or older there can create a free account.",
  },
];

export function Landing() {
  return (
    <main className="bg-white text-black">
      <HomeHeroStage>
        <h1 className="mx-auto text-[clamp(36px,6.4vw,84px)] leading-[1.05] font-medium tracking-[-0.02em]">
          <span className="block">Get paid for everyday</span>
          <span className="block">tasks, from your phone.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[36rem] text-[18px] leading-[1.35] tracking-[-0.2px] text-white/80 sm:text-[22px] sm:tracking-[-0.4px]">
          Pick a task, get paid. Free to join, always.
        </p>
        <div className="mt-8">
          <StoreBadges
            light
            ios="https://app.adjust.com/2415t5fd?campaign=landing&adgroup=hero-ios"
            android="https://app.adjust.com/2415t5fd?campaign=landing&adgroup=hero-android"
          />
        </div>
      </HomeHeroStage>

      <section aria-label="Promises" className="bg-white pt-16 pb-6 sm:pt-24 sm:pb-10">
        <h2 className="site text-[clamp(34px,7vw,63px)] leading-[1.12] font-medium tracking-[-0.03em] text-black">
          Simple, clear and fair.
        </h2>
        <ul className="site-pad mt-8 flex gap-3 overflow-x-auto overflow-y-hidden pb-6 sm:mt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {promises.map((item) => (
            <li
              key={item.title}
              className="relative h-[395px] w-[min(78vw,372px)] shrink-0 overflow-hidden rounded-[26px] bg-[#f5f5f7] sm:w-[372px]"
            >
              <div className="absolute top-[29px] left-[29px] flex flex-col gap-1">
                <h3 className="text-[16.9px] leading-[21.6px] font-medium tracking-[-0.36px] text-black">
                  {item.title}
                </h3>
                <p className="text-[15.1px] leading-[20.8px] text-black/60">{item.line}</p>
              </div>
              {item.title === "Free to join" ? (
                <img
                  src={item.image}
                  alt=""
                  width={1023}
                  height={1537}
                  className="pointer-events-none absolute top-[22%] left-1/2 h-[155%] w-auto max-w-none -translate-x-[44.6%]"
                />
              ) : (
                <img
                  src={item.image}
                  alt=""
                  className={`pointer-events-none absolute ${item.imageClass}`}
                />
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={section}>
        <h2 className="text-[clamp(26px,6vw,56px)] leading-[1.08] font-medium tracking-[-0.03em]">
          <span className="block">From download to payment</span>
          <span className="block">in four steps.</span>
        </h2>
        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-[28px] bg-[#f5f5f7] p-7">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#7C40FF] text-[15px] font-medium text-white">
                {index + 1}
              </span>
              <h3 className="mt-6 text-[24px] leading-[1.2] font-medium tracking-[-0.4px]">{step.title}</h3>
              <p className="mt-2 text-[18px] leading-[26px] text-black/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="site pt-0 pb-24 sm:pb-36">
        <h2 className="text-[clamp(34px,7vw,63px)] leading-[1.12] font-medium tracking-[-0.03em] text-black">
          Choose what fits you.
        </h2>
        <p className="mt-3 text-[15px] leading-[1.35] text-black/60 sm:text-[16px]">
          New tasks are added regularly. Download the app to see everything open in your country.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-[9px] md:grid-cols-2">
          <article className="relative h-[480px] overflow-hidden rounded-[26px] bg-[#f5f5f7] p-[29px]">
            <img
              src="/media/task-handwriting.png"
              alt=""
              width={1448}
              height={1086}
              className="pointer-events-none absolute top-[22%] left-[12.6%] h-[86%] w-[75%] object-contain object-bottom"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(168deg,#f5f5f7_31%,rgba(245,245,247,0)_57%)]" />
            <div className="relative z-10 flex flex-col gap-3">
              <h3 className="text-[16.9px] leading-[21.6px] font-medium tracking-[-0.36px] text-black">
                Photograph handwritten Arabic documents
              </h3>
              <p className="max-w-[436px] text-[13px] leading-[18px] text-black/60">
                Photograph handwritten Arabic pages, at least 50 words each. Paid per accepted page. No experience needed.
              </p>
            </div>
          </article>
          <article className="relative h-[480px] overflow-hidden rounded-[26px] bg-[#f5f5f7] p-[29px]">
            <img
              src="/media/task-recording.png"
              alt=""
              width={1399}
              height={1124}
              className="pointer-events-none absolute top-[30%] left-[21%] h-[70%] w-[57%] object-contain object-bottom"
            />
            <div className="relative z-10 flex flex-col gap-3">
              <h3 className="text-[16.9px] leading-[21.6px] font-medium tracking-[-0.36px] text-black">
                Record everyday activities
              </h3>
              <p className="max-w-[475px] text-[13px] leading-[18px] text-black/60">
                Record everyday tasks at home from your point of view, with your phone on a head strap. Paid per accepted hour.
              </p>
            </div>
          </article>
        </div>
      </section>

      <ConfidenceSection />

      <section className="bg-white py-20 sm:py-28" aria-labelledby="faq-title">
        <div className="site">
        <h2
          id="faq-title"
          className="text-center text-[clamp(36px,8vw,68px)] leading-[1.12] font-medium tracking-[-0.03em] text-black"
        >
          Questions
        </h2>
        <div className="mt-10 flex w-full flex-col gap-[9px]">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0} className="group rounded-[26px] bg-black/5 p-[29px]">
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden ${focus}`}
              >
                <span className="text-[16.9px] leading-[21.6px] font-medium tracking-[-0.36px] text-black">
                  {item.question}
                </span>
                <span className="flex h-[22px] w-8 shrink-0 items-center justify-center rounded-[12px] bg-black/10">
                  <img
                    src="/business/faq-chevron.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                  />
                </span>
              </summary>
              <p className="mt-[19px] text-[15.1px] leading-[20.8px] font-medium text-black/60">{item.answer}</p>
            </details>
          ))}
          <details className="group rounded-[26px] bg-black/5 p-[29px]">
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden ${focus}`}
            >
              <span className="text-[16.9px] leading-[21.6px] font-medium tracking-[-0.36px] text-black">
                What about my privacy?
              </span>
              <span className="flex h-[22px] w-8 shrink-0 items-center justify-center rounded-[12px] bg-black/10">
                <img
                  src="/business/faq-chevron.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
              </span>
            </summary>
            <p className="mt-[19px] text-[15.1px] leading-[20.8px] font-medium text-black/60">
              Your submissions are used to train AI models by CNTXT AI and its partners. We never process your content to identify you. Never include personal information in your submissions.{" "}
              <a href="https://www.cntxt.tech/klkt-privacy-policy" className={`underline underline-offset-2 ${focus}`}>
                KLKT Privacy Policy
              </a>{" "}
              <a href="https://www.cntxt.tech/klkt-terms-conditions" className={`underline underline-offset-2 ${focus}`}>
                Terms and Conditions
              </a>
            </p>
          </details>
        </div>
        </div>
      </section>

      <section className="site pt-16 pb-24 sm:pt-28 sm:pb-36">
        <div className="relative overflow-hidden rounded-[28px] bg-[#f5f5f7] sm:min-h-[500px]">
          <div className="relative z-10 flex flex-col items-start justify-start gap-8 px-6 py-8 sm:min-h-[500px] sm:justify-between sm:gap-0 sm:px-7 sm:py-14 sm:pr-[52%] sm:pb-14 sm:pl-[43px]">
            <div>
              <h2 className="text-[32px] leading-[1.2] font-medium tracking-[-0.64px] text-black sm:text-[41px] sm:tracking-[-0.82px]">
                Your first task is waiting.
              </h2>
              <p className="mt-4 max-w-[434px] text-[18px] leading-[1.28] tracking-[-0.36px] text-black/60 sm:text-[20px] sm:tracking-[-0.4px]">
                Download KLKT, pick a task open in your country, and get paid for accepted work.
              </p>
            </div>
            <StoreBadges
              className="mt-8 justify-start sm:mt-0"
              ios="https://app.adjust.com/2415t5fd?campaign=landing&adgroup=footer-ios"
              android="https://app.adjust.com/2415t5fd?campaign=landing&adgroup=footer-android"
            />
          </div>
          <img
            src="/home/first-task.png"
            alt=""
            width={571}
            height={493}
            className="pointer-events-none relative z-0 mx-auto h-[280px] w-auto max-w-[88%] object-contain sm:absolute sm:top-auto sm:right-[-36px] sm:bottom-[-150px] sm:mx-0 sm:h-[136%] sm:w-auto sm:max-w-none"
          />
        </div>
      </section>
    </main>
  );
}
