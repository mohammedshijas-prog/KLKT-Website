const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const stores = [
  {
    key: "android",
    name: "Google Play",
    label: "Google Play",
    icon: "/play.svg",
  },
  {
    key: "ios",
    name: "App Store",
    label: "App Store",
    icon: "/apple.svg",
  },
] as const;

export function StoreBadges({
  ios,
  android,
  onDark = false,
  light = false,
  className = "",
}: {
  ios: string;
  android: string;
  onDark?: boolean;
  light?: boolean;
  className?: string;
}) {
  const hrefs = { ios, android };
  const tone = light
    ? "bg-white text-black ring-1 ring-black/15"
    : `bg-black text-white ${onDark ? "ring-1 ring-white/25" : ""}`;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {stores.map((store) => (
        <a
          key={store.key}
          href={hrefs[store.key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={store.label}
          className={`inline-flex items-center gap-2.5 rounded-[18px] px-4 py-2.5 text-[15px] font-semibold ${tone} ${focus}`}
        >
          <span
            aria-hidden
            className={`block h-[18px] w-[16px] shrink-0 ${light ? "bg-black" : "bg-white"}`}
            style={{
              WebkitMask: `url(${store.icon}) center / contain no-repeat`,
              mask: `url(${store.icon}) center / contain no-repeat`,
            }}
          />
          {store.name}
        </a>
      ))}
    </div>
  );
}
