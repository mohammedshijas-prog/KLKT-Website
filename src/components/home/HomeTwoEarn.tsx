"use client";

import { useState } from "react";
import { rates } from "@/lib/business-rates";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const amount = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const hoursLabel = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

function rateNumber(value: string) {
  const next = Number(value);
  if (!Number.isFinite(next) || next < 0) return 0;
  return next;
}

function Slider({
  id,
  label,
  min,
  max,
  step,
  value,
  display,
  marks,
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  marks: number[];
  onChange: (value: number) => void;
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-[18px] leading-normal text-[#333] sm:text-[20px]">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        <span className="font-semibold tabular-nums">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`earn-slider mt-2 ${focus}`}
        style={{ ["--p" as string]: `${percent}%` }}
      />
      <div className="mt-0.5 flex justify-between text-[13px] leading-[25px] text-black/30">
        {marks.map((mark) => (
          <span key={mark} className={mark === value ? "text-[#7c40ff]" : ""}>
            {mark}
          </span>
        ))}
      </div>
    </div>
  );
}

function RateField({
  id,
  label,
  suffix,
  value,
  onChange,
}: {
  id: string;
  label: string;
  suffix: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="border-t border-[#e5e7eb] pt-4">
      <label htmlFor={id} className="text-[14px] text-[#333]">
        {label}
      </label>
      <div className="mt-2.5 flex h-10 w-[132px] items-center gap-1.5 rounded-[6px] border border-[#d1d5db] bg-white px-3">
        <span className="text-[14px] text-[#374151]">$</span>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="0.01"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full min-w-0 bg-transparent text-[14px] text-[#374151] tabular-nums outline-none ${focus}`}
        />
        <span className="shrink-0 text-[12px] text-[#9ca3af]">{suffix}</span>
      </div>
    </div>
  );
}

export function HomeTwoEarn({ panel = "bg-[#c1a8f8]" }: { panel?: string }) {
  const [audience, setAudience] = useState<"me" | "business">("me");
  const [mode, setMode] = useState<"hours" | "pages">("hours");
  const [hours, setHours] = useState(2);
  const [pages, setPages] = useState(20);
  const [days, setDays] = useState(5);
  const [accepted, setAccepted] = useState(80);
  const [hourRate, setHourRate] = useState(String(rates.collectorHourRate));
  const [pageRate, setPageRate] = useState(String(rates.collectorPageRate));

  const [workers, setWorkers] = useState(50);
  const [partnerHours, setPartnerHours] = useState(4);
  const [partnerDays, setPartnerDays] = useState(22);
  const [partnerAccepted, setPartnerAccepted] = useState(80);
  const [partnerRate, setPartnerRate] = useState(String(rates.partnerRate));

  const meUnits = (mode === "hours" ? hours : pages) * days * (accepted / 100);
  const meRate = rateNumber(mode === "hours" ? hourRate : pageRate);
  const weekly = meUnits * meRate;
  const meMonthly = (weekly * 52) / 12;
  const meAccepted = (meUnits * 52) / 12;

  const partnerAcceptedHours = workers * partnerHours * partnerDays * (partnerAccepted / 100);
  const partnerMonthly = partnerAcceptedHours * rateNumber(partnerRate);

  const monthly = audience === "me" ? meMonthly : partnerMonthly;

  return (
    <section className="site py-12 text-center sm:py-28">
      <h2 className="text-[clamp(32px,5vw,51px)] leading-[1.12] font-medium tracking-[-0.01em]">
        See what you could earn.
        <br />
        For you, or for your business.
      </h2>
      <div className="mx-auto mt-8 inline-flex h-[55px] gap-2.5 rounded-[17px] bg-[#f1f1f3] p-1.5" role="group" aria-label="Who the estimate is for">
        {(
          [
            ["me", "For me"],
            ["business", "For business"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={audience === key}
            onClick={() => setAudience(key)}
            className={`rounded-[13px] px-3.5 text-[18px] leading-[25px] sm:text-[20px] ${focus} ${
              audience === key ? "bg-white" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid items-stretch gap-3 rounded-[16px] bg-[#f4f4f6] p-3 text-left lg:grid-cols-2">
        <div className="flex flex-col gap-8 rounded-[12px] bg-white p-6 sm:p-9">
          {audience === "me" ? (
            <>
              <div>
                <p className="text-[24px] leading-none font-semibold">Task type</p>
                <div className="mt-6 inline-flex gap-2.5 rounded-[29px] bg-[#f4f4f6] p-1" role="group" aria-label="Task type">
                  {(
                    [
                      ["hours", "Record activities"],
                      ["pages", "Handwritten pages"],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={mode === key}
                      onClick={() => setMode(key)}
                      className={`rounded-[39px] px-2.5 py-2.5 text-[16px] text-[#333] ${focus} ${
                        mode === key ? "bg-white" : ""
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {mode === "hours" ? (
                  <Slider
                    id="earn-hours"
                    label="Hours recorded per day"
                    min={0.5}
                    max={8}
                    step={0.5}
                    value={hours}
                    display={`${hoursLabel.format(hours)} h`}
                    marks={[1, 2, 4, 6, 8]}
                    onChange={setHours}
                  />
                ) : (
                  <Slider
                    id="earn-pages"
                    label="Pages per day"
                    min={5}
                    max={100}
                    step={5}
                    value={pages}
                    display={amount.format(pages)}
                    marks={[5, 20, 40, 60, 80, 100]}
                    onChange={setPages}
                  />
                )}
                <Slider
                  id="earn-days"
                  label="Days per week"
                  min={1}
                  max={7}
                  step={1}
                  value={days}
                  display={`${days} days`}
                  marks={[1, 2, 3, 4, 5, 6, 7]}
                  onChange={setDays}
                />
                <Slider
                  id="earn-accepted"
                  label="Accepted"
                  min={50}
                  max={100}
                  step={5}
                  value={accepted}
                  display={`${accepted}%`}
                  marks={[50, 60, 70, 80, 90, 100]}
                  onChange={setAccepted}
                />
              </div>
              <RateField
                id={mode === "hours" ? "earn-hour-rate" : "earn-page-rate"}
                label={mode === "hours" ? "Rate per accepted hour" : "Rate per accepted page"}
                suffix={mode === "hours" ? "/ hr" : "/ page"}
                value={mode === "hours" ? hourRate : pageRate}
                onChange={mode === "hours" ? setHourRate : setPageRate}
              />
            </>
          ) : (
            <>
              <p className="text-[24px] leading-none font-semibold">Your team</p>
              <div className="flex flex-col gap-6">
                <Slider
                  id="earn-workers"
                  label="Workers recording"
                  min={5}
                  max={500}
                  step={5}
                  value={workers}
                  display={amount.format(workers)}
                  marks={[5, 100, 200, 300, 400, 500]}
                  onChange={setWorkers}
                />
                <Slider
                  id="earn-partner-hours"
                  label="Hours per worker, per day"
                  min={1}
                  max={8}
                  step={0.5}
                  value={partnerHours}
                  display={`${hoursLabel.format(partnerHours)} h`}
                  marks={[1, 2, 4, 6, 8]}
                  onChange={setPartnerHours}
                />
                <Slider
                  id="earn-partner-days"
                  label="Working days per month"
                  min={4}
                  max={30}
                  step={1}
                  value={partnerDays}
                  display={`${partnerDays} days`}
                  marks={[4, 10, 16, 22, 26, 30]}
                  onChange={setPartnerDays}
                />
                <Slider
                  id="earn-partner-accepted"
                  label="Accepted"
                  min={50}
                  max={100}
                  step={5}
                  value={partnerAccepted}
                  display={`${partnerAccepted}%`}
                  marks={[50, 60, 70, 80, 90, 100]}
                  onChange={setPartnerAccepted}
                />
              </div>
              <RateField
                id="earn-partner-rate"
                label="Rate per accepted hour"
                suffix="/ hr"
                value={partnerRate}
                onChange={setPartnerRate}
              />
            </>
          )}
        </div>

        <div aria-live="polite" className={`flex flex-col justify-between rounded-[12px] p-6 text-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:p-9 ${panel}`}>
          <div>
            <p className="text-[22px] leading-normal font-semibold tracking-[0.5px] sm:text-[24px]">
              Estimated monthly earnings
            </p>
            <p className="mt-3 text-[clamp(64px,8vw,101px)] leading-none font-bold tabular-nums">
              {money.format(monthly)}
            </p>
          </div>
          <div className="mt-8">
            <dl>
              {audience === "me" ? (
                <>
                  <div className="flex h-[50px] items-center justify-between border-b border-white/20 text-[16px]">
                    <dt>Per week</dt>
                    <dd className="font-medium tabular-nums">{money.format(weekly)}</dd>
                  </div>
                  <div className="flex h-[50px] items-center justify-between border-b border-white/20 text-[16px]">
                    <dt>{mode === "hours" ? "Accepted hours per month" : "Accepted pages per month"}</dt>
                    <dd className="font-medium tabular-nums">{amount.format(meAccepted)}</dd>
                  </div>
                  <div className="flex h-[50px] items-center justify-between border-b border-white/20 text-[16px]">
                    <dt>Paid in</dt>
                    <dd className="font-medium">US dollars</dd>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-[50px] items-center justify-between border-b border-white/20 text-[16px]">
                    <dt>Per year</dt>
                    <dd className="font-medium tabular-nums">{money.format(partnerMonthly * 12)}</dd>
                  </div>
                  <div className="flex h-[50px] items-center justify-between border-b border-white/20 text-[16px]">
                    <dt>Accepted hours per month</dt>
                    <dd className="font-medium tabular-nums">{amount.format(partnerAcceptedHours)}</dd>
                  </div>
                  <div className="flex h-[50px] items-center justify-between border-b border-white/20 text-[16px]">
                    <dt>Headband sets</dt>
                    <dd className="font-medium tabular-nums">{amount.format(workers)}</dd>
                  </div>
                </>
              )}
            </dl>
            {audience === "me" ? null : (
              <a
                href="mailto:info@cntxt.com"
                className={`mt-8 inline-flex h-11 items-center rounded-full bg-black px-5 text-[15px] font-medium text-white ${focus}`}
              >
                Talk to us
              </a>
            )}
          </div>
        </div>
      </div>
      <p className="mt-6 text-left text-[15px] leading-[22px] text-black/50">
        Example rates only. Not confirmed pay. Extra income, not a salary.
      </p>
    </section>
  );
}
