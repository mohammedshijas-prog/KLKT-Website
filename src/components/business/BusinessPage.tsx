import { CollectorCalculator, PartnerCalculator } from "@/components/business/Calculators";

const CONTACT = "mailto:info@cntxt.com";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const section = "site py-24 sm:py-36";

const steps = [
  {
    title: "Talk to us",
    body: "Tell us about your site, your teams and the work they do.",
    image: "/business/steps/talk.png",
    imageClass: "top-[138px] -left-4 h-[265px] w-[405px] object-cover",
  },
  {
    title: "We set up",
    body: "Headbands, wristbands and the KLKT app, or workers' own phones.",
    image: "/business/steps/setup.png",
    imageClass: "top-[106px] left-[41px] h-[289px] w-[290px] object-cover",
  },
  {
    title: "Get paid",
    body: "For every hour that is scored and human-confirmed.",
    image: "/business/steps/paid.png",
    imageClass: "top-[164px] left-[23px] h-[205px] w-[326px] object-contain",
  },
];

const languages = [
  { label: "Arabic", flag: "/business/steps/flag-ae.svg", className: "top-0 blur-[1.45px]", flagClass: "size-[25px]", text: "text-[14px]" },
  { label: "English (US)", flag: "/business/steps/flag-us.svg", className: "top-[59px] z-10 drop-shadow-[0_4px_7px_rgba(0,0,0,0.25)]", flagClass: "size-[32px]", text: "text-[16px]" },
  { label: "Philippines", flag: "/business/steps/flag-ph.svg", className: "top-[140px] blur-[1.45px]", flagClass: "size-[25px]", text: "text-[17.5px]" },
  { label: "Urdu", flag: "/business/steps/flag-pk.svg", className: "top-[199px] blur-[1.45px]", flagClass: "size-[25px]", text: "text-[17.5px]" },
];

const faqs = [
  {
    question: "What is the difference between a partner and a collector?",
    answer:
      "A partner is a business that brings KLKT to its sites and teams. A collector is an individual who records tasks with the KLKT app.",
  },
  {
    question: "How is the estimate calculated?",
    answer: "Recorded hours × share accepted × rate per accepted hour. Only accepted hours are paid.",
  },
  {
    question: "What are the real rates?",
    answer: "[PLACEHOLDER: confirmed partner and collector rates]",
  },
  {
    question: "Do we need to buy hardware?",
    answer: "[PLACEHOLDER: hardware terms] Workers can also record with their own phone.",
  },
  {
    question: "How is consent handled?",
    answer: "Every worker reads and agrees in the KLKT app, in their language, before anything is recorded.",
  },
];

function Arrow() {
  return (
    <span className="mt-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 3v9M4.5 8.5L8 12l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function BusinessPage() {
  return (
    <main className="bg-white pt-28 text-black sm:pt-32">
      <section className="site pt-8 pb-24 text-center sm:pt-12 sm:pb-36">
        <p className="text-[15px] font-medium tracking-[-0.2px] text-black/60">Business</p>
        <h1 className="mx-auto mt-4 max-w-[14ch] text-[clamp(36px,7vw,68px)] leading-[1.08] font-medium tracking-[-0.03em]">
          See what KLKT can earn you.
        </h1>
        <p className="mx-auto mt-5 max-w-[38rem] text-[18px] leading-[1.4] tracking-[-0.2px] text-black/60 sm:text-[20px] sm:leading-[1.28] sm:tracking-[-0.4px]">
          Partners get paid for giving access to their sites. Collectors get paid for every accepted hour they record. Work out both below.
        </p>
      </section>

      <section className="site grid grid-cols-1 gap-4 pb-24 sm:grid-cols-2 sm:pb-36">
        <a
          href="#partners"
          className={`flex h-full flex-col rounded-[28px] bg-[#f5f5f7] p-7 sm:p-8 ${focus}`}
        >
          <p className="text-[15px] font-medium tracking-[-0.2px] text-black/60">For site operators</p>
          <h2 className="mt-3 text-[40px] leading-[1.05] font-medium tracking-[-0.8px]">Partners</h2>
          <p className="mt-3 text-[18px] leading-[26px] text-black/60">
            Warehouses, kitchens, hotels, hospitals and facilities that bring KLKT to their teams.
          </p>
          <Arrow />
        </a>
        <a
          href="#collectors"
          className={`flex h-full flex-col rounded-[28px] bg-[#f5f5f7] p-7 sm:p-8 ${focus}`}
        >
          <p className="text-[15px] font-medium tracking-[-0.2px] text-black/60">For individuals</p>
          <h2 className="mt-3 text-[40px] leading-[1.05] font-medium tracking-[-0.8px]">Collectors</h2>
          <p className="mt-3 text-[18px] leading-[26px] text-black/60">
            Anyone 18 or older who records their work or everyday tasks with the KLKT app.
          </p>
          <Arrow />
        </a>
      </section>

      <section id="partners" className={`${section} scroll-mt-48 pt-0`}>
        <p className="text-[15px] font-medium tracking-[-0.2px] text-black/60">Partners calculator</p>
        <h2 className="mt-3 max-w-[14ch] text-[clamp(32px,6vw,56px)] leading-[1.08] font-medium tracking-[-0.03em]">
          What your site could earn.
        </h2>
        <PartnerCalculator />
      </section>

      <section id="collectors" className={`${section} scroll-mt-48 pt-0 pb-4 sm:pb-6`}>
        <p className="text-[15px] font-medium tracking-[-0.2px] text-black/60">Collectors calculator</p>
        <h2 className="mt-3 max-w-[12ch] text-[clamp(32px,6vw,56px)] leading-[1.08] font-medium tracking-[-0.03em]">
          What you could make.
        </h2>
        <CollectorCalculator />
      </section>

      <section className="site pb-16 sm:pb-24">
        <p className="text-[15px] leading-[22px] text-black/50">
          Example rates only. Not confirmed pay. Extra income, not a salary.
        </p>
      </section>

      <section className="pb-24 sm:pb-36">
        <div className="site">
          <p className="text-[15px] font-medium tracking-[-0.2px] text-black/60">How partnering works</p>
          <h2 className="mt-3 max-w-[16ch] text-[clamp(32px,6vw,56px)] leading-[1.08] font-medium tracking-[-0.03em]">
            Four steps to your first accepted hours.
          </h2>
        </div>
        <ul className="site-pad mt-8 flex gap-3 overflow-x-auto overflow-y-hidden pb-6 sm:mt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {steps.slice(0, 2).map((step) => (
            <li key={step.title} className="relative h-[395px] w-[min(82vw,372px)] shrink-0 overflow-hidden rounded-[26px] bg-[#f5f5f7] sm:w-[372px]">
              <div className="absolute top-[29px] left-[29px] flex flex-col gap-1">
                <h3 className="text-[16.9px] leading-[21.6px] font-medium tracking-[-0.36px] text-black">{step.title}</h3>
                <p className="max-w-[312px] text-[15.1px] leading-[20.8px] text-black/60">{step.body}</p>
              </div>
              <img src={step.image} alt="" className={`pointer-events-none absolute max-w-none ${step.imageClass}`} />
            </li>
          ))}
          <li className="relative h-[395px] w-[min(82vw,372px)] shrink-0 overflow-hidden rounded-[26px] bg-[#f5f5f7] sm:w-[372px]">
            <div className="absolute top-[29px] left-[29px] flex flex-col gap-1">
              <h3 className="text-[16.9px] leading-[21.6px] font-medium tracking-[-0.36px] text-black">Teams record</h3>
              <p className="max-w-[312px] text-[15.1px] leading-[20.8px] text-black/60">
                Each worker gives consent in their language, then works as usual.
              </p>
            </div>
            <div className="absolute top-[137px] left-[22px] h-[249px] w-[min(329px,88%)]">
              {languages.map((item) => (
                <div
                  key={item.label}
                  className={`absolute inset-x-0 flex items-center gap-2.5 rounded-[13px] border border-[#ebebeb] bg-white py-3 pr-3 pl-4 ${item.className}`}
                >
                  {item.label === "Philippines" ? (
                    <span className="relative size-[25px] shrink-0">
                      <span className="absolute inset-[-77.2%_-105.2%_-133.2%_-105.2%]">
                        <img src={item.flag} alt="" className="size-full max-w-none" />
                      </span>
                    </span>
                  ) : (
                    <img src={item.flag} alt="" className={`${item.flagClass} shrink-0`} />
                  )}
                  <span className={`${item.text} leading-none tracking-[-0.08px] text-[#171717]`}>{item.label}</span>
                </div>
              ))}
            </div>
          </li>
          {steps.slice(2).map((step) => (
            <li key={step.title} className="relative h-[395px] w-[min(82vw,372px)] shrink-0 overflow-hidden rounded-[26px] bg-[#f5f5f7] sm:w-[372px]">
              <div className="absolute top-[29px] left-[29px] flex flex-col gap-1">
                <h3 className="text-[16.9px] leading-[21.6px] font-medium tracking-[-0.36px] text-black">{step.title}</h3>
                <p className="max-w-[264px] text-[15.1px] leading-[20.8px] text-black/60">{step.body}</p>
              </div>
              <img src={step.image} alt="" className={`pointer-events-none absolute max-w-none ${step.imageClass}`} />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#D9D5F4] py-20 sm:py-28" aria-labelledby="business-faq">
        <div className="site">
        <h2
          id="business-faq"
          className="text-center text-[clamp(36px,8vw,68px)] leading-[1.12] font-medium tracking-[-0.03em] text-black"
        >
          Questions
        </h2>
        <div className="mt-10 flex w-full flex-col gap-[9px]">
          {faqs.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group rounded-[26px] bg-black/5 p-[29px]"
            >
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
              <p className="mt-[19px] text-[15.1px] leading-[20.8px] font-medium text-black/60">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        </div>
      </section>

      <section className="site pt-16 pb-24 sm:pt-28 sm:pb-36">
        <div className="relative overflow-hidden rounded-[28px] bg-[#f5f5f7] sm:min-h-[500px]">
          <div className="relative z-10 flex flex-col items-start justify-start gap-8 px-6 py-8 sm:min-h-[500px] sm:justify-between sm:gap-0 sm:px-7 sm:py-14 sm:pr-[52%] sm:pb-14 sm:pl-[43px]">
            <div>
              <h2 className="text-[32px] leading-[1.2] font-medium tracking-[-0.64px] text-black sm:text-[41px] sm:tracking-[-0.82px]">
                Ready to partner with KLKT?
              </h2>
              <p className="mt-4 max-w-[434px] text-[18px] leading-[1.28] tracking-[-0.36px] text-black/60 sm:text-[20px] sm:tracking-[-0.4px]">
                Tell us about your operations and we&apos;ll get back to you.
              </p>
            </div>
            <a
              href={CONTACT}
              className={`mt-8 inline-flex h-9 items-center justify-center rounded-[8px] bg-[#7c40ff] px-4 text-[11.6px] leading-none font-semibold text-white sm:mt-0 ${focus}`}
            >
              Talk to us
            </a>
          </div>
          <img
            src="/business/partner-cta.png"
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
