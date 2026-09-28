import { StoreBadges } from "@/components/home/StoreBadges";

const IOS = "https://apps.apple.com/us/iphone/search?term=klkt";
const ANDROID =
  "https://play.google.com/store/apps/details?id=com.cntxt.cntxtai.data.services&hl=en";

export function StoreButtons({ className = "" }: { className?: string }) {
  return <StoreBadges ios={IOS} android={ANDROID} onDark className={className} />;
}
