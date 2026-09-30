import { PartnerSection } from "@/components/business/PartnerForm";
import { HomeTwoEarn } from "@/components/home/HomeTwoEarn";
import { HomeTwoHero } from "@/components/home/HomeTwoHero";
import { WorkerSessions } from "@/components/WorkerSessions";

const partnership = [
  {
    title: "Your team records",
    body: "The everyday work they already do, captured hands-free on the job with a simple headset.",
    video: "/business-2/partnership-team-records.mp4",
  },
  {
    title: "KLKT turns it into AI training data",
    body: "That real-world footage becomes AI training data behind smarter AI and robotics.",
    video: "/business-2/partnership-ai-training.mp4",
  },
  {
    title: "Everyone earns",
    body: "shift pays per accepted hour. Your team takes home income, your business shares the upside.",
    image: "/business-2/partnership-cash.png",
    alt: "Cash balance of $12,743.94 ready to cash out",
  },
];

const steps = [
  {
    title: "Talk to us",
    body: "Tell us about your site, your teams and the work they do.",
    visual: "photo" as const,
    src: "/business-2/hero-cleaning.png",
    alt: "Two cleaners wearing headbands, one wiping a table and one mopping",
  },
  {
    title: "We set up",
    body: "Headbands, wristbands and the KLKT app, or workers' own phones.",
    visual: "photo" as const,
    src: "/business-2/card-paid.png",
    alt: "Worker wearing a headband holding a parcel",
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
      <HomeTwoHero video="/hero.mp4">
        <p className="text-[16px] leading-[1.28] tracking-[0.02em] text-white uppercase sm:text-[20px]">For businesses</p>
        <h1 className="mx-auto mt-3 text-[clamp(40px,7.5vw,96px)] leading-[1.05] font-normal tracking-[-0.03em]">
          Get paid for
          <br />
          work you already do.
        </h1>
        <a
          href="#partner"
          className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-white px-9 text-[18px] text-black transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-16 sm:text-[20px]"
        >
          Become a partner
        </a>
      </HomeTwoHero>

      <section className="site py-12 sm:py-24">
        <h2 className="max-w-[573px] text-[clamp(38px,5vw,64px)] leading-[1.05] font-normal tracking-[-0.01em] text-[#0c0a08]">
          How does the shift partnership work?
        </h2>
        <p className="mt-3 max-w-[616px] text-[17px] leading-[1.4] text-black/60 sm:text-[20px] sm:leading-[23px]">
          Your team records the everyday work they already do. shift turns it into AI training data, and everyone gets
          paid, with zero disruption.
        </p>
        <div className="mt-8 grid gap-x-3 gap-y-8 lg:grid-cols-3">
          {partnership.map((step) => (
            <article key={step.title}>
              {step.video ? (
                <div className="relative h-[320px] overflow-hidden rounded-[16px] bg-[rgba(124,64,255,0.2)] sm:h-[407px]">
                  <video
                    src={step.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
              ) : step.image ? (
                <div className="relative h-[320px] overflow-hidden rounded-[16px] bg-[#dbcbff] sm:h-[407px]">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="absolute top-[24.8%] left-1/2 aspect-[326/205] w-[77%] max-w-[326px] -translate-x-1/2 object-contain"
                  />
                </div>
              ) : (
                <div className="h-[320px] rounded-[16px] bg-[rgba(124,64,255,0.2)] sm:h-[407px]" />
              )}
              <h3 className="mt-4 text-[24px] leading-8 font-medium">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[22px] text-[#0c0a08]/60">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <WorkerSessions />

      <section className="overflow-hidden bg-white py-12 sm:py-[109px]">
        <div className="site">
          <h2 className="text-[clamp(32px,4vw,48px)] leading-[1.04] font-normal tracking-[-0.01em] text-[#0c0a08]">
            Join the program. Grow with it.
          </h2>
        </div>
        <div className="site-pad mt-8 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {steps.map((step) => (
            <article
              key={step.title}
              className="relative h-[395px] w-[300px] shrink-0 overflow-hidden rounded-[26px] bg-[#f5f5f7] sm:w-[372px]"
            >
              <div className="relative z-10 px-[29px] pt-[29px]">
                <h3 className="text-[16.9px] leading-[22px] font-medium tracking-[-0.36px]">{step.title}</h3>
                <p className="mt-1 max-w-[312px] text-[15.1px] leading-[21px] text-black/60">{step.body}</p>
              </div>
              {step.visual === "photo" ? (
                <img
                  src={step.src}
                  alt={step.alt}
                  className={`pointer-events-none absolute max-w-none object-cover ${
                    step.title === "Talk to us"
                      ? "top-[165px] left-[-13px] h-[216px] w-[330px] sm:top-[138px] sm:left-[-16px] sm:h-[265px] sm:w-[405px]"
                      : "top-[140px] left-1/2 h-[255px] w-[256px] -translate-x-1/2 sm:top-[106px] sm:h-[289px] sm:w-[290px]"
                  }`}
                />
              ) : null}
              {step.visual === "languages" ? (
                <div className="absolute inset-x-[22px] top-[137px] flex flex-col gap-2">
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
                  src="/business-2/partnership-cash.png"
                  alt="Cash balance ready to withdraw"
                  className="pointer-events-none absolute top-[164px] left-1/2 h-[205px] w-[326px] max-w-[calc(100%-24px)] -translate-x-1/2 object-contain"
                />
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <HomeTwoEarn panel="bg-[#7c40ff]" />

      <PartnerSection />

    </main>
  );
}
