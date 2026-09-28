"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/worker-app", label: "KLKT" },
  { href: "/hardware", label: "Hardware" },
  { href: "/worker-app#noor", label: "Noor" },
  { href: "/business", label: "Business" },
];

export function HomeNav({ sticky = true }: { sticky?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`${sticky ? "sticky top-0" : ""} z-30 px-4 pt-4`}>
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 rounded-full bg-[var(--nav)] px-4 py-2.5 backdrop-blur-xl sm:px-5">
        <Link href="/" className="font-[family-name:var(--font-sora)] text-[18px] font-semibold tracking-[-0.04em] text-[var(--accent)]">
          KLKT
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[15px] text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#get-the-app"
            className="inline-flex h-10 items-center rounded-full bg-[var(--ink)] px-4 text-[14px] font-semibold text-[var(--bg)]"
          >
            Get the app
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--ink)] md:hidden"
            aria-expanded={open}
            aria-controls="home-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" fill="none" stroke="currentColor" strokeWidth="1.6" />
              ) : (
                <path d="M3 5h12M3 9h12M3 13h12" fill="none" stroke="currentColor" strokeWidth="1.6" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="home-menu"
          aria-label="Mobile"
          className="mx-auto mt-2 flex max-w-[1100px] flex-col rounded-[28px] bg-[var(--nav)] p-3 backdrop-blur-xl md:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-2xl px-4 py-3 text-[17px] text-[var(--ink)]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
