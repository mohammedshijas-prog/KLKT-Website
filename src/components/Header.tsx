"use client";

import { StoreBadges } from "@/components/home/StoreBadges";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ios = "https://apps.apple.com/us/iphone/search?term=klkt";
const android = "https://play.google.com/store/apps/details?id=com.cntxt.cntxtai.data.services&hl=en";

const links = [
  { href: "/", label: "Home" },
  { href: "/worker-app", label: "KLKT" },
  { href: "/hardware", label: "Roboband" },
  { href: "/business", label: "Business" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const pathname = usePathname();
  const onLightPage =
    pathname === "/" ||
    pathname === "/hardware" ||
    pathname === "/business" ||
    pathname.startsWith("/blog");
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overHeroVideo = (pathname === "/" || pathname === "/business") && !compact;
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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = compact || menuOpen;
  const iconTone = darkText || menuOpen ? "bg-black" : "bg-white";

  return (
    <header
      className={`fixed top-3 left-1/2 z-20 w-[min(1191px,calc(100%-1rem))] -translate-x-1/2 overflow-hidden rounded-[18px] transition-[background-color,box-shadow] duration-300 sm:top-[26px] sm:w-[min(1191px,calc(100%-2rem))] ${
        solid
          ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.05)]"
          : "bg-[rgba(0,0,0,0.1)] backdrop-blur-[74.9px]"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-3 px-3 transition-[padding] duration-300 md:px-[21px] ${
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
        className={`hidden items-center gap-4 text-[13px] leading-[16.8px] font-normal tracking-[-0.28px] whitespace-nowrap md:flex lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:gap-3.5 ${darkText ? "text-black" : "text-white"}`}
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:opacity-80">
            {link.label}
          </Link>
        ))}
      </nav>

      <StoreBadges
        ios={ios}
        android={android}
        light
        compact
        className="hidden shrink-0 justify-end md:flex"
      />

      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
        className="relative -mr-1 flex size-10 items-center justify-center rounded-full md:hidden"
      >
        <span
          className={`absolute h-[2px] w-5 rounded-full transition-transform duration-300 ${iconTone} ${menuOpen ? "rotate-45" : "-translate-y-[4px]"}`}
        />
        <span
          className={`absolute h-[2px] w-5 rounded-full transition-transform duration-300 ${iconTone} ${menuOpen ? "-rotate-45" : "translate-y-[4px]"}`}
        />
      </button>
      </div>

      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-300 md:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={!menuOpen}>
          <nav className="flex flex-col px-3 pt-1 pb-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-black/[0.06] py-3.5 text-[17px] tracking-[-0.3px] text-black ${pathname === link.href ? "font-medium" : "text-black/70"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <StoreBadges ios={ios} android={android} className="px-3 pt-2 pb-4" />
        </div>
      </div>
    </header>
  );
}
