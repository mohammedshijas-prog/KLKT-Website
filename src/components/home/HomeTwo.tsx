import { HomeTwoEarn } from "@/components/home/HomeTwoEarn";
import { HomeTwoHero } from "@/components/home/HomeTwoHero";
import { HomeTwoTasks } from "@/components/home/HomeTwoTasks";
import { StoreBadges } from "@/components/home/StoreBadges";

const ios = "https://apps.apple.com/us/iphone/search?term=klkt";
const android =
  "https://play.google.com/store/apps/details?id=com.cntxt.cntxtai.data.services&hl=en";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const logos: { src: string; width: number; image?: boolean }[] = [
  { src: "/home-2/logo-1.svg", width: 45 },
  { src: "/home-2/logo-2.svg", width: 60 },
  { src: "/home-2/logo-3.svg", width: 40 },
  { src: "/home-2/logo-perplexity.svg", width: 116, image: true },
  { src: "/home-2/logo-5.svg", width: 89 },
  { src: "/home-2/logo-6.svg", width: 57 },
  { src: "/home-2/logo-7.svg", width: 83 },
  { src: "/home-2/logo-8.svg", width: 94 },
  { src: "/home-2/logo-9.svg", width: 89 },
  { src: "/home-2/logo-10.svg", width: 70 },
  { src: "/home-2/logo-11.svg", width: 62 },
  { src: "/home-2/logo-shopify.svg", width: 54, image: true },
];

function Logo({ src, width, image }: { src: string; width: number; image?: boolean }) {
  if (image) {
    return (
      <img
        src={src}
        alt=""
        width={width}
        height={28}
        className="h-7 w-auto max-w-[120px] opacity-40"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="block h-7 max-w-[120px] bg-[#0c0a08] opacity-40"
      style={{
        width,
        WebkitMask: `url(${src}) center / contain no-repeat`,
        mask: `url(${src}) center / contain no-repeat`,
      }}
    />
  );
}

export function HomeTwo() {
  return (
    <main className="bg-white text-[#0c0a08]">
      <HomeTwoHero>
        <h1 className="mx-auto text-[clamp(36px,6vw,64px)] leading-none font-medium tracking-[-0.03em]">
          Everyday tasks. Real pay.
        </h1>
        <p className="mx-auto mt-6 max-w-[712px] text-[18px] leading-[1.28] tracking-[-0.48px] text-white/80 sm:text-[24px]">
          Photograph pages or record activities on your phone, and get paid in US dollars for what is accepted.
        </p>
        <StoreBadges light ios={ios} android={android} className="mt-8 justify-center" />
      </HomeTwoHero>

      <section className="site pt-16 sm:pt-32">
        <h2 className="max-w-[656px] text-[22px] leading-[1.35] font-normal sm:text-[28px] sm:leading-[39px]">
          Join [X] contributors earning from their phone, paid in US dollars for every accepted task.
        </h2>
        <a href="/#faq-title" className={`mt-6 inline-flex items-center gap-2 text-[16px] leading-6 text-[#0c0a08]/60 ${focus}`}>
          Is KLKT safe? Read the answers
          <img src="/home-2/arrow.svg" alt="" width={16} height={16} />
        </a>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[12px] bg-[#f4f2f0] p-px sm:grid-cols-3 lg:grid-cols-8">
          <div className="relative order-last col-span-full min-h-[280px] overflow-hidden bg-[#7c40ff] sm:col-span-3 lg:order-none lg:col-span-2 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:min-h-[328px]">
            <img
              src="/home-2/contributors.png"
              alt=""
              className="absolute top-0 left-0 h-[172%] w-[131%] max-w-none object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(124,64,255,0) 29%, #7c40ff 86%)" }}
            />
            <div className="absolute right-0 bottom-0 left-0 px-6 pb-6">
              <p className="text-[64px] leading-none text-white">$0</p>
              <p className="mt-1.5 text-[16px] leading-[22px] text-white">fees to join, work or cash out</p>
            </div>
          </div>
          {logos.map((logo) => (
            <div key={logo.src} className="flex h-[120px] items-center justify-center bg-white px-4 lg:h-[163px]">
              <Logo {...logo} />
            </div>
          ))}
        </div>
      </section>

      <section className="site pt-24 sm:pt-32">
        <h2 className="max-w-[755px] text-[clamp(32px,5vw,51px)] leading-[1.12] font-normal tracking-[-0.01em]">
          One app for every task.
          <br />
          <span className="text-[#0c0a08]/60">Paid for every accepted one.</span>
        </h2>
        <StoreBadges ios={ios} android={android} className="mt-6 justify-start" />
        <HomeTwoTasks />
      </section>

      <HomeTwoEarn />

      <section className="site flex flex-col items-center py-16 text-center sm:py-32">
        <h2 className="text-[clamp(32px,5vw,51px)] leading-[1.16] font-normal">
          Real company.
          <br />
          Real payouts.
        </h2>
        <p className="mt-8 text-[22px] leading-[1.3] text-[#0c0a08]/60 sm:text-[28px]">You work. We pay. No catch.</p>
        <div className="mt-8 grid w-full gap-8 text-left lg:grid-cols-2 lg:gap-8">
          <article>
            <div className="relative h-[280px] overflow-hidden rounded-[16px] sm:h-[407px]">
              <div className="absolute inset-0 bg-[#7c40ff]/20" />
              <img
                src="/home-2/office.png"
                alt=""
                className="absolute top-[-17%] left-0 h-[134%] w-full max-w-none object-cover"
              />
              <div className="absolute top-1/2 left-1/2 flex size-[140px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[32px] bg-white/10 backdrop-blur-[22px] sm:size-[177px]">
                <img src="/home-2/mark-x.svg" alt="" width={111} height={96} />
              </div>
            </div>
            <h3 className="mt-4 text-[24px] leading-8 sm:text-[28px]">
              Backed by a registered company in{" "}
              <br className="hidden sm:block" />
              the UAE
            </h3>
            <p className="mt-2.5 max-w-[551px] text-[15px] leading-[22px] text-[#0c0a08]/60">
              KLKT is operated by CNTXT AI (CNTXT-FZCO), a data and AI company based in Abu Dhabi. Look us up at{" "}
              <a href="https://www.cntxt.tech/" target="_blank" rel="noopener noreferrer" className={`underline ${focus}`}>
                cntxt.tech
              </a>{" "}
              or on LinkedIn.
            </p>
          </article>
          <article>
            <div className="relative h-[280px] overflow-hidden rounded-[16px] bg-[#f1efee] sm:h-[407px]">
              <img src="/home-2/map.png" alt="" className="absolute inset-0 h-full w-full object-contain" />
            </div>
            <h3 className="mt-4 text-[24px] leading-8 sm:text-[28px]">
              We never process your content to
              <br />
              identify you
            </h3>
            <p className="mt-2.5 max-w-[491px] text-[15px] leading-[22px] text-[#0c0a08]/60">
              Submissions train AI models by CNTXT AI and its partners. Never include personal information. Read the{" "}
              <a
                href="https://www.cntxt.tech/klkt-privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline ${focus}`}
              >
                Privacy Policy
              </a>
              .
            </p>
          </article>
        </div>
      </section>

      <section className="site pb-16 sm:pb-24">
        <div className="relative flex flex-col gap-8 overflow-hidden rounded-[12px] bg-[linear-gradient(120deg,#f3f3f3_55%,#ece6fb)] px-6 py-10 sm:flex-row sm:bg-none sm:items-center sm:justify-between sm:px-16 sm:py-16">
          <div className="absolute inset-0 hidden bg-[#7c40ff] sm:block" />
          <img src="/home-2/cta.png" alt="" className="absolute inset-0 hidden h-full w-full object-cover sm:block" />
          <div className="relative max-w-[680px]">
            <h2 className="text-[28px] leading-tight sm:text-[36px] sm:leading-[26px]">Your first task is waiting.</h2>
            <p className="mt-3 text-[16px] leading-[22px] text-[#0c0a08]/60">
              Download KLKT, pick a task open in your country, and get paid for accepted work.
            </p>
          </div>
          <StoreBadges ios={ios} android={android} className="relative shrink-0 justify-start" />
        </div>
      </section>
    </main>
  );
}
