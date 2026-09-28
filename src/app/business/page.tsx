import type { Metadata } from "next";
import { BusinessTwo } from "@/components/business/BusinessTwo";

export const metadata: Metadata = {
  title: "Business · KLKT",
  description:
    "Partners get paid for giving access to their sites. Collectors get paid for every accepted hour they record.",
};

export default function Page() {
  return <BusinessTwo />;
}
