import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/worker-app", label: "KLKT" },
  { href: "/hardware", label: "Hardware" },
  { href: "/worker-app#noor", label: "Noor" },
  { href: "/business", label: "Business" },
  { href: "/#terms", label: "Terms" },
  { href: "/#privacy", label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-[1100px] flex-col gap-6 px-6 pt-4 pb-10 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-[family-name:var(--font-sora)] text-[18px] font-semibold tracking-[-0.04em] text-[var(--accent)]">
          KLKT
        </p>
        <p className="mt-1 text-[14px] text-[var(--muted)]">© 2026 CNTXT-FZCO</p>
      </div>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
        {footerLinks.map((link) => (
          <Link key={link.label} href={link.href} className="text-[14px] text-[var(--muted)]">
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
