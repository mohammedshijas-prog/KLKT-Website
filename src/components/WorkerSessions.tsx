const jobs = [
  { src: "/workers/jobs/picker.png", label: "Warehouse picker" },
  { src: "/workers/jobs/packer.png", label: "Packer" },
  { src: "/workers/jobs/stocker.png", label: "Shelf stocker" },
  { src: "/workers/jobs/cook.png", label: "Line cook" },
  { src: "/workers/jobs/porter.png", label: "Kitchen porter" },
  { src: "/workers/jobs/housekeeper.png", label: "Housekeeper" },
  { src: "/workers/jobs/laundry.png", label: "Laundry attendant" },
  { src: "/workers/jobs/cleaner.png", label: "Cleaner" },
  { src: "/workers/jobs/hospital.png", label: "Hospital porter" },
];

function JobCard({ src, label }: { src: string; label: string }) {
  return (
    <article className="relative h-[220px] w-[220px] shrink-0 overflow-hidden rounded-[16px] sm:h-[307px] sm:w-[307px]">
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-x-[10px] bottom-[10px] flex h-11 items-center justify-center rounded-[15px] bg-black/10 px-4 backdrop-blur-[37px] sm:h-[49px]">
        <p className="text-[16px] leading-[1.28] tracking-[-0.4px] text-white sm:text-[20px]">{label}</p>
      </div>
    </article>
  );
}

export function WorkerSessions() {
  const loop = [...jobs, ...jobs];

  return (
    <section className="w-full overflow-hidden bg-[#D9D5F4] pt-16 sm:pt-[184px]">
      <div className="site">
        <h2 className="max-w-[725px] text-[clamp(30px,6vw,49px)] leading-[1.15] font-medium tracking-[-0.03em] text-black">
          Join 2.5 million workers recording{" "}
          <br className="hidden sm:block" />
          the work <span className="text-black/60">they already do</span>
        </h2>
        <p className="mt-4 text-[18px] leading-[1.21] tracking-[-0.4px] text-black/60 sm:text-[20px]">
          Real sessions from the field.
        </p>
      </div>
      <div className="mt-10 overflow-hidden pb-16 sm:pb-[143px]">
        <div className="worker-marquee flex w-max gap-[11px]">
          {loop.map((job, index) => (
            <JobCard key={`${job.label}-${index}`} src={job.src} label={job.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
