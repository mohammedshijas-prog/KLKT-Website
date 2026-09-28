import { BusinessTwoForm } from "@/components/business/BusinessTwoForm";
import { HomeTwoEarn } from "@/components/home/HomeTwoEarn";

const logos = [
  { src: "/business-2/logo-apple.svg", alt: "Apple Watch", width: 88, height: 24 },
  { src: "/business-2/logo-oura.svg", alt: "Oura", width: 59.25, height: 18.376 },
  { src: "/business-2/logo-garmin.svg", alt: "Garmin", width: 111.75, height: 16.111 },
  { src: "/business-2/logo-amazfit.svg", alt: "Amazfit", width: 90.2303, height: 20.8202 },
  { src: "/business-2/logo-google.svg", alt: "Google Health", width: 137.258, height: 22.0623 },
];

const benefits = [
  {
    title: "No change to your operations",
    body: "Workers do their normal tasks. The headband and wristband record while they work.",
    src: "/business-2/card-operations.png",
    alt: "Workers wearing headbands while packing, typing, and repairing equipment",
  },
  {
    title: "Partners in the process",
    body: "We handle setup, consent and review, so your managers stay focused on the site.",
    src: "/business-2/card-partners.png",
    alt: "Two team members fitting a headband on a worker and checking a tablet",
  },
  {
    title: "Paid for what counts",
    body: "Every hour is scored and human-confirmed. You earn for each one that is accepted.",
  },
];

const steps = [
  {
    title: "Talk to us",
    body: "Tell us about your site, your teams and the work they do.",
    visual: "photo" as const,
    src: "/business-2/talk.png",
    alt: "Two people in purple shirts talking",
  },
  {
    title: "We set up",
    body: "Headbands, wristbands and the KLKT app, or workers' own phones.",
    visual: "photo" as const,
    src: "/business-2/setup.png",
    alt: "Person in a red shirt holding a box",
  },
  {
    title: "Teams record",
    body: "Each worker gives consent in their language, then works as usual.",
    visual: "languages" as const,
  },
  {
    title: "Get paid",
    body: "For every hour that is scored and human-confirmed.",
    visual: "cash" as const,
  },
];

const languages = [
  { name: "Arabic", flag: "/business-2/flag-ae.svg", width: 25, height: 25, blur: true },
  { name: "English (US)", flag: "/business-2/flag-us.svg", width: 31.9355, height: 31.9355, featured: true },
  { name: "Philippines", flag: "/business-2/flag-ph.svg", width: 25, height: 25, blur: true, crop: true },
  { name: "Urdu", flag: "/business-2/flag-pk.svg", width: 24, height: 24, blur: true },
];

export function BusinessTwo() {
  return (
    <main>
      <section className="site flex min-h-[calc(100svh-120px)] flex-col items-center justify-center gap-10 py-24 lg:flex-row lg:gap-6">
        <div className="flex flex-1 flex-col items-start justify-center gap-8">
          <div>
            <h1 className="max-w-[546px] text-[clamp(40px,5vw,64px)] leading-[1.11] font-normal tracking-[-0.01em] text-[#0c0a08]">
              The sites building
              <br />
              physical AI run on KLKT.
            </h1>
            <p className="mt-3 max-w-[634px] text-[18px] leading-6 text-[#0c0a08]/60">
              Your teams work as usual. You get paid for every accepted hour.
            </p>
          </div>
          <div>
            <a
              href="#demo"
              className="inline-flex min-w-[169px] items-center justify-center rounded-[6px] bg-[#7c40ff] px-5 py-5 text-[13.1px] leading-[11px] text-white"
            >
              Become a partner
            </a>
            <p className="mt-2 text-[14px] leading-5 text-[#0c0a08]/60">
              Live across UAE, Jordan and the US
            </p>
          </div>
        </div>
        <div className="relative aspect-[634/542] w-full flex-1 overflow-hidden rounded-[22px] bg-[rgba(160,150,150,0.2)]">
          <img
            src="/business-2/hero-cleaning.png"
            alt="Two cleaners wearing headbands, one wiping a table and one mopping the floor"
            className="pointer-events-none absolute top-[9.59%] left-[-2.52%] h-[80.81%] w-[105.52%] max-w-none object-cover"
          />
        </div>
      </section>

      <section className="site flex flex-col items-center py-16 sm:py-24">
        <p className="text-[20px] leading-[22px] font-medium tracking-[-0.24px] text-[#222326]">
          Data used by
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {logos.map((logo) => (
            <img key={logo.alt} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="shrink-0" />
          ))}
        </div>

        <h2 className="mt-20 text-center text-[clamp(32px,5vw,51px)] leading-[1.16] font-normal tracking-[-0.01em] sm:mt-28">
          Robots learn from real work.
          <br />
          Your sites have it.
        </h2>

        <div className="mt-20 grid w-full gap-3 sm:mt-28 lg:grid-cols-3">
          {benefits.map((card) => (
            <article key={card.title}>
              {card.src ? (
                <div className="relative h-[320px] overflow-hidden rounded-[16px] bg-[rgba(124,64,255,0.2)] sm:h-[407px]">
                  <img src={card.src} alt={card.alt} className="absolute inset-0 size-full object-cover" />
                </div>
              ) : (
                <div className="relative h-[320px] overflow-hidden rounded-[16px] bg-[#dbcbff] sm:h-[407px]">
                  <div className="absolute top-[42.75%] left-[57.7%] flex h-[45px] items-center gap-2.5 rounded-[20px] bg-[#effff5] p-5">
                    <img src="/business-2/icon-check-circle.svg" alt="" width={32} height={32} className="shrink-0" />
                    <span className="text-[16px] font-semibold whitespace-nowrap text-[#0f172a]">
                      Paid
                    </span>
                  </div>
                  <img
                    src="/business-2/card-paid.png"
                    alt="Worker wearing a headband holding a parcel"
                    className="pointer-events-none absolute bottom-[-7px] left-1/2 aspect-square w-[79.2%] max-w-[348px] -translate-x-1/2 object-cover"
                  />
                </div>
              )}
              <h3 className="mt-4 text-[24px] leading-8 font-medium">{card.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[22px] text-[#0c0a08]/60">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <HomeTwoEarn panel="bg-[#7c40ff]" />

      <section className="overflow-hidden py-16 sm:py-24">
        <div className="site">
          <h2 className="text-[clamp(32px,4vw,48px)] leading-[1.04] font-normal tracking-[-0.01em]">
            Join the program. Grow with it.
          </h2>
        </div>
        <div className="site-pad mt-8 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {steps.map((step) => (
            <article
              key={step.title}
              className="relative h-[395px] w-[300px] shrink-0 overflow-hidden rounded-[26px] bg-[#f5f5f7] sm:w-[340px] lg:w-auto"
            >
              <div className="relative z-10 px-7 pt-7">
                <h3 className="text-[16.9px] leading-[22px] font-medium tracking-[-0.36px]">{step.title}</h3>
                <p className="mt-1 max-w-[312px] text-[15.1px] leading-[21px] text-black/60">{step.body}</p>
              </div>
              {step.visual === "photo" ? (
                <img
                  src={step.src}
                  alt={step.alt}
                  className={`pointer-events-none absolute max-w-none object-cover ${
                    step.title === "Talk to us"
                      ? "bottom-0 left-[-16px] h-[250px] w-[118%]"
                      : "right-4 bottom-0 h-[270px] w-[78%]"
                  }`}
                />
              ) : null}
              {step.visual === "languages" ? (
                <div className="absolute inset-x-5 bottom-6 flex flex-col gap-2">
                  {languages.map((language) => (
                    <div
                      key={language.name}
                      className={`flex items-center gap-2.5 rounded-[13px] border border-[#ebebeb] bg-white px-3.5 py-3 ${
                        language.blur ? "blur-[1.4px]" : "shadow-[0_4px_7px_rgba(0,0,0,0.25)]"
                      } ${language.featured ? "order-2 py-4" : language.name === "Arabic" ? "order-1" : language.name === "Philippines" ? "order-3" : "order-4"}`}
                    >
                      {language.crop ? (
                        <span className="relative size-[25px] shrink-0 overflow-hidden rounded-full">
                          <img
                            src={language.flag}
                            alt=""
                            width={77.6}
                            height={77.6}
                            className="absolute top-1/2 left-1/2 h-[77.6px] w-[77.6px] max-w-none -translate-x-1/2 -translate-y-1/2"
                          />
                        </span>
                      ) : (
                        <img src={language.flag} alt="" width={language.width} height={language.height} className="shrink-0" />
                      )}
                      <span className="text-[15px] text-[#171717]">{language.name}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {step.visual === "cash" ? (
                <img
                  src="/business-2/cash.png"
                  alt="Cash balance ready to withdraw"
                  className="pointer-events-none absolute right-5 bottom-4 h-[180px] w-[calc(100%-40px)] object-contain object-bottom"
                />
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="site py-16 text-center sm:py-20">
        <h2 className="text-[clamp(32px,4vw,48px)] leading-[1.04] font-normal tracking-[-0.01em]">
          We&apos;re on your floor.
          <br />
          Not just in your inbox.
        </h2>
        <div className="mt-16 grid gap-10 text-left sm:grid-cols-3 sm:gap-6">
          <div>
            <span className="flex size-12 items-center justify-center rounded-[8px] bg-[#f3edff]">
              <img src="/business-2/icon-glasses.svg" alt="" width={24} height={24} />
            </span>
            <h3 className="mt-8 text-[20px] leading-[26px] font-normal">Hands-on onboarding</h3>
            <p className="mt-1 text-[16px] leading-[22px] text-[#0c0a08]/60">
              We set up the hardware and the KLKT app with your teams.
            </p>
          </div>
          <div>
            <span className="flex size-12 items-center justify-center rounded-[8px] bg-[#f3edff]">
              <img src="/business-2/icon-help.svg" alt="" width={24} height={24} />
            </span>
            <h3 className="mt-8 text-[20px] leading-[26px] font-normal">Help on every shift</h3>
            <p className="mt-1 text-[16px] leading-[22px] text-[#0c0a08]/60">
              Noor answers workers&apos; questions, and our team supports your managers.
            </p>
          </div>
          <div>
            <span className="flex size-12 items-center justify-center rounded-[8px] bg-[#f3edff]">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 16l5-5 3 3 8-8" fill="none" stroke="#7c40ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 6h6v6" fill="none" stroke="#7c40ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="mt-8 text-[20px] leading-[26px] font-normal">Built to grow with you</h3>
            <p className="mt-1 text-[16px] leading-[22px] text-[#0c0a08]/60">
              Start with one site, then add more sites and workers.
            </p>
          </div>
        </div>
      </section>

      <section id="demo" className="scroll-mt-28 bg-[#f5f5f7] px-4 py-20 sm:py-28">
        <h2 className="text-center text-[clamp(32px,5vw,51px)] leading-[1.16] font-normal tracking-[-0.01em]">
          Explore KLKT for your site
        </h2>
        <div className="mx-auto mt-12 flex justify-center sm:mt-16">
          <BusinessTwoForm />
        </div>
      </section>
    </main>
  );
}
