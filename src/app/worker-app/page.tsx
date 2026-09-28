import type { Metadata } from "next";
import { WorkerNoor } from "@/components/WorkerNoor";
import { WorkerReveal } from "@/components/WorkerReveal";
import { WorkerSessions } from "@/components/WorkerSessions";
import { WorkerShift } from "@/components/WorkerShift";
import { WorkerShowcase } from "@/components/WorkerShowcase";

export const metadata: Metadata = {
  title: "KLKT",
};

export default function WorkerAppPage() {
  return (
    <main className="bg-white">
      <WorkerReveal />
      <WorkerShowcase />
      <WorkerSessions />
      <WorkerShift />
      <WorkerNoor />
    </main>
  );
}
