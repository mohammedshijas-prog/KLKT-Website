"use client";

import { StoreBadges } from "@/components/home/StoreBadges";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/worker-app", label: "KLKT" },
  { href: "/hardware", label: "Roboband" },
  { href: "/business", label: "Business" },
];

export function Header() {
  const pathname = usePathname();
  const onLightPage =
    pathname === "/" ||
    pathname === "/hardware" ||
    pathname === "/business";
  const [compact, setCompact] = useState(false);
  const overHeroVideo = pathname === "/" && !compact;
  const darkText = !overHeroVideo && (onLightPage || compact);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = window.scrollY > 48;
      setCompact((current) => (current === next ? current : next));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-3 left-1/2 z-20 w-[min(1191px,calc(100%-1rem))] -translate-x-1/2 overflow-hidden rounded-[18px] transition-[background-color,box-shadow] duration-300 sm:top-[26px] sm:w-[min(1191px,calc(100%-2rem))] ${
        compact
          ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.05)]"
          : "bg-[rgba(0,0,0,0.1)] backdrop-blur-[74.9px]"
      }`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-3 transition-[padding] duration-300 md:flex-nowrap md:px-[21px] ${
          compact ? "py-2" : "py-3 md:py-4"
        }`}
      >
      <Link
        href="/"
        aria-label="KLKT"
        className="relative block h-[22.684px] w-[120px] shrink-0"
      >
        <img
          src="/footer/logo-mark.svg"
          alt=""
          width={24.6575}
          height={21.9789}
          className="absolute top-[2.85%] left-0"
        />
        <img
          src="/footer/logo-wordmark.svg"
          alt=""
          width={91.2672}
          height={22.6886}
          className="absolute top-0 left-[23.94%]"
        />
      </Link>

      <nav
        className={`order-3 flex w-full items-center justify-between gap-2 overflow-x-auto text-[13px] leading-[16.8px] font-normal tracking-[-0.28px] whitespace-nowrap md:order-none md:w-auto md:justify-center md:gap-4 md:overflow-visible lg:absolute lg:top-1/2 lg:left-1/2 lg:w-auto lg:-translate-x-1/2 lg:-translate-y-1/2 lg:gap-3.5 lg:text-[13px] ${darkText ? "text-black" : "text-white"}`}
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:opacity-80">
            {link.label}
          </Link>
        ))}
      </nav>

      <StoreBadges
        ios="https://apps.apple.com/us/iphone/search?term=klkt"
        android="https://play.google.com/store/apps/details?id=com.cntxt.cntxtai.data.services&hl=en"
        light
        className="shrink-0 justify-end"
      />
      </div>
    </header>
  );
}
