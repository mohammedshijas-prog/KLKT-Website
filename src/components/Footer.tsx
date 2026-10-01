"use client";

import { StoreBadges } from "@/components/home/StoreBadges";
import Link from "next/link";
import { useEffect, useRef } from "react";

const information = [
  { href: "/", label: "Home" },
  { href: "/worker-app", label: "KLKT" },
  { href: "/hardware", label: "Roboband" },
  { href: "/business", label: "Business" },
  { href: "/blog", label: "Blog" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const card = cardRef.current;
    if (!footer || !card) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const apply = () => {
      frame = 0;
      if (reduce) return;
      const remaining = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      const progress = Math.min(1, Math.max(0, 1 - remaining / 320));
      const inset = 24 + (1 - progress) * 8;
      footer.style.paddingLeft = `${inset}px`;
      footer.style.paddingRight = `${inset}px`;
      footer.style.paddingBottom = "16px";
      const available = window.innerWidth - inset * 2;
      card.style.maxWidth = `${1245 + Math.max(0, available - 1245) * progress}px`;
      card.style.borderRadius = "30px";
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-white px-4 pb-4 sm:px-8">
      <div
        ref={cardRef}
        className="mx-auto flex w-full max-w-[1245px] flex-col rounded-[30px] bg-[#1a1a1a] px-6 pt-12 pb-7 sm:px-10 lg:px-[46px] lg:pt-[57px] lg:pb-[29px]"
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full max-w-[358px] flex-col items-start gap-[18px]">
            <Link href="/" aria-label="KLKT" className="relative block h-[22.684px] w-[120px]">
              <img
                src="/logo-mark.svg"
                alt=""
                width={24.6575}
                height={21.9789}
                className="absolute top-[2.85%] left-0"
              />
              <img
                src="/logo-wordmark.svg"
                alt=""
                width={91.2672}
                height={22.6886}
                className="absolute top-0 left-[23.94%]"
              />
            </Link>
            <p className="text-[14.8px] leading-[20.5px] font-medium tracking-[-0.63px] text-white/60">
              Get paid for the everyday work you already do. Your real-world footage trains
              AI and is licensed to the labs that use it, and pays the people behind it.
            </p>
            <StoreBadges
              className="justify-start"
              ios="https://apps.apple.com/us/iphone/search?term=klkt"
              android="https://play.google.com/store/apps/details?id=com.cntxt.cntxtai.data.services&hl=en"
              onDark
            />
          </div>

          <div className="flex flex-wrap gap-x-[59px] gap-y-8 lg:pt-[41px]">
            <nav aria-label="Information" className="flex flex-col gap-4">
              <p className="text-[14.9px] leading-[15px] tracking-[-0.32px] text-white/40">
                Information
              </p>
              <div className="flex flex-col gap-2">
                {information.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[15.8px] leading-[15px] font-medium tracking-[-0.32px] text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <nav aria-label="Social" className="flex flex-col gap-4">
              <p className="text-[15.2px] leading-[15px] tracking-[-0.32px] text-white/40">
                Social
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="#instagram"
                  className="text-[15.8px] leading-[15px] font-medium tracking-[-0.32px] text-white"
                >
                  Instagram
                </a>
                <a
                  href="#linkedin"
                  className="text-[15.7px] leading-[15px] font-medium tracking-[-0.32px] text-white"
                >
                  LinkedIn
                </a>
              </div>
            </nav>

            <div className="flex flex-col gap-4">
              <p className="text-[15.2px] leading-[15px] tracking-[-0.32px] text-white/40">
                Contact
              </p>
              <a
                href="mailto:info@cntxt.com"
                className="text-[15.3px] leading-[15px] font-medium tracking-[-0.32px] text-white"
              >
                info@cntxt.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 rounded-[24px] border border-white/55 px-4 py-3 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:px-[19px] sm:py-[10px] lg:mt-[88px]">
          <div className="flex items-center gap-[17px] text-[15.2px] leading-[15px] font-medium tracking-[-0.32px] text-white">
            <a href="https://www.cntxt.tech/klkt-privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <Link href="/#terms">Terms and condition</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
