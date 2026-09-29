const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c40ff]";

function PlayIcon({ compact }: { compact: boolean }) {
  return (
    <svg viewBox="0 0 28 31" aria-hidden className={`h-[22px] w-[20px] shrink-0 ${compact ? "" : "sm:h-[26px] sm:w-[23px]"}`}>
      <path fill="#4285F4" d="M1.3 0.9C0.9 1.3 0.7 1.9 0.7 2.7V28.3C0.7 29.1 0.9 29.7 1.3 30.1L15.6 15.5Z" />
      <path fill="#34A853" d="M1.3 0.9L15.6 15.5L20.3 10.8L3.9 1.3C2.9 0.7 1.9 0.6 1.3 0.9Z" />
      <path fill="#EA4335" d="M1.3 30.1C1.9 30.4 2.9 30.3 3.9 29.7L20.3 20.2L15.6 15.5Z" />
      <path fill="#FBBC04" d="M20.3 10.8L15.6 15.5L20.3 20.2L25.6 17.2C27.1 16.3 27.1 14.7 25.6 13.8Z" />
    </svg>
  );
}

function AppleIcon({ compact }: { compact: boolean }) {
  return (
    <span
      aria-hidden
      className={`block h-[23px] w-[19px] shrink-0 bg-current ${compact ? "" : "sm:h-[27px] sm:w-[22px]"}`}
      style={{
        WebkitMask: "url(/apple.svg) center / contain no-repeat",
        mask: "url(/apple.svg) center / contain no-repeat",
      }}
    />
  );
}

/**
 * Official-style App Store / Google Play badges.
 * White on dark or photo backgrounds (`light` / `onDark`),
 * solid black on light backgrounds (default).
 */
export function StoreBadges({
  ios,
  android,
  onDark = false,
  light = false,
  compact = false,
  className = "",
}: {
  ios: string;
  android: string;
  onDark?: boolean;
  light?: boolean;
  /** Keep the small phone size at every breakpoint (used in the header). */
  compact?: boolean;
  className?: string;
}) {
  const up = (classes: string) => (compact ? "" : classes);
  const white = light || onDark;
  const tone = white
    ? "bg-white text-black"
    : "bg-black text-white";
  const badge = `inline-flex h-[40px] shrink-0 items-center gap-1.5 rounded-[7px] pr-2.5 pl-2 ${up("sm:h-[46px] sm:gap-2 sm:rounded-[8px] sm:pr-3.5 sm:pl-3")} transition-opacity hover:opacity-85 ${tone} ${focus}`;

  const appStore = (
    <a key="ios" href={ios} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store" className={badge}>
      <AppleIcon compact={compact} />
      <span className="flex flex-col items-start">
        <span className={`text-[9px] leading-[11px] font-medium tracking-[0.01em] ${up("sm:text-[10.5px] sm:leading-[12px]")}`}>Download on the</span>
        <span className={`text-[16.5px] leading-[19px] font-medium tracking-[-0.03em] ${up("sm:text-[20px] sm:leading-[22px]")}`}>App Store</span>
      </span>
    </a>
  );

  const googlePlay = (
    <a key="android" href={android} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play" className={badge}>
      <PlayIcon compact={compact} />
      <span className="flex flex-col items-start">
        <span className={`text-[8.5px] leading-[11px] font-medium tracking-[0.04em] uppercase ${up("sm:text-[10px] sm:leading-[12px]")}`}>Get it on</span>
        <span className={`text-[16px] leading-[19px] font-medium tracking-[-0.03em] ${up("sm:text-[19px] sm:leading-[22px]")}`}>Google Play</span>
      </span>
    </a>
  );

  return (
    <div className={`flex flex-wrap items-center gap-2 ${up("sm:gap-2.5")} ${className}`}>
      {white ? [appStore, googlePlay] : [googlePlay, appStore]}
    </div>
  );
}
