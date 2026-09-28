import type { Metadata } from "next";
import { CloserLook } from "@/components/CloserLook";
import { InsideSection, InsideVideo } from "@/components/InsideSection";
import { ShiftSection } from "@/components/ShiftSection";
import { SlidingSenseImage } from "@/components/SlidingSenseImage";

export const metadata: Metadata = {
  title: "Roboband",
};

export default function HardwarePage() {
  return (
    <main className="bg-white">
      <section className="h-[170vh] bg-white">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 pt-24 pb-8 text-center">
        <p
          className={`text-[20px] leading-[1.28] tracking-[-0.4px] text-black/60`}
        >
          Data Collection Headband
        </p>
        <h1
          className="mt-1 text-[clamp(36px,7vw,68px)] leading-[1.05] font-medium tracking-[-0.03em] text-black"
        >
          Move. Capture. Train.
        </h1>
        <p
          className={`mt-6 max-w-[640px] text-[20px] leading-[1.28] tracking-[-0.4px] text-black/60`}
        >
          Real human movement, recorded on real shifts. Up to 8 cameras, synced to the
          millisecond.
        </p>
        <InsideVideo className="mt-5 h-[min(34vh,360px)] w-full max-w-[820px]" />
        <div className="mt-5 flex h-11 items-center gap-4 rounded-full border border-black/10 bg-white pr-1.5 pl-5">
          <span
            className={`text-[15px] leading-none tracking-[-0.2px] text-black`}
          >
            From AED 8,499
          </span>
          <a
            href="#pricing"
            className={`flex h-8 items-center justify-center rounded-full bg-[#7c40ff] px-4 text-[13px] leading-none font-medium text-white`}
          >
            View pricing
          </a>
        </div>
        </div>
      </section>

      <section id="explore" className="relative scroll-mt-24 overflow-hidden bg-white">
        <div className="site relative z-10 pt-8 lg:pt-10">
          <h2 className="text-[clamp(34px,7vw,66px)] leading-[1.08] font-medium tracking-[-0.03em] text-[#1d1d1f]">
            Move. Capture. Train.
          </h2>
          <p className="mt-4 max-w-[649px] text-[18px] leading-[26px] font-medium text-black/60 sm:text-[20px]">
            The modular headband holds up to 8 camera sense units. Each one has a 1.5
            megapixel global shutter camera with a 90° view, so every movement is recorded
            sharp and in real time.
          </p>
          <div className="mt-8 flex max-w-[720px] flex-col gap-8 sm:mt-10 sm:flex-row sm:gap-[72px]">
            <div>
              <p className="text-[20px] leading-[26px] font-medium text-black/60">Up to</p>
              <p className="font-display text-[40px] leading-[1.15] font-medium tracking-[-1.2px] text-[#1d1d1f] sm:text-[48px] sm:leading-[71px]">
                8 sense units
              </p>
              <p className="text-[20px] leading-[26px] font-medium text-black/60">per headband</p>
            </div>
            <div>
              <p className="text-[20px] leading-[26px] font-medium text-black/60">Under</p>
              <p className="font-display text-[40px] leading-[1.15] font-medium tracking-[-1.2px] text-[#1d1d1f] sm:text-[48px] sm:leading-[71px]">
                150 g
              </p>
              <p className="text-[20px] leading-[26px] font-medium text-black/60">
                total headband weight
              </p>
            </div>
          </div>
        </div>
        <SlidingSenseImage />
      </section>
      <ShiftSection />
      <CloserLook />
      <InsideSection />
    </main>
  );
}
