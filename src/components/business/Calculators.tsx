"use client";

import { useState } from "react";
import { StoreBadges } from "@/components/home/StoreBadges";
import { rates } from "@/lib/business-rates";

const CONTACT = "mailto:info@cntxt.com";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const amount = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});

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
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="mt-7">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[18px] leading-[26px] font-medium">
          {label}
        </label>
        <span className="text-[18px] leading-none font-medium tabular-nums">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`mt-3 h-2 w-full cursor-pointer accent-black ${focus}`}
      />
    </div>
  );
}

function RateField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-7">
      <label htmlFor={id} className="text-[18px] leading-[26px] font-medium">
        {label} <span className="font-normal text-black/60">(placeholder)</span>
      </label>
      <div className="mt-3 flex h-12 items-center rounded-full bg-white px-4">
        <span aria-hidden="true" className="text-[18px] font-medium">
          $
        </span>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="0.01"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`h-full w-full bg-transparent px-2 text-[18px] font-medium tabular-nums outline-none ${focus}`}
        />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-white/15 py-4">
      <dt className="text-[18px] leading-[26px] text-white/70">{label}</dt>
      <dd className="text-[18px] font-medium tabular-nums">{value}</dd>
    </div>
  );
}

export function PartnerCalculator() {
  const [workers, setWorkers] = useState(50);
  const [hours, setHours] = useState(4);
  const [days, setDays] = useState(22);
  const [accepted, setAccepted] = useState(80);
  const [rate, setRate] = useState(rates.partnerRate.toFixed(2));

  const acceptedHours = workers * hours * days * (accepted / 100);
  const monthly = acceptedHours * rateNumber(rate);

  return (
    <div className="mt-12 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
      <div className="rounded-[28px] bg-[#f5f5f7] p-6 sm:p-8">
        <Slider
          id="partner-workers"
          label="Workers recording"
          min={5}
          max={500}
          step={5}
          value={workers}
          display={amount.format(workers)}
          onChange={setWorkers}
        />
        <Slider
          id="partner-hours"
          label="Recorded hours per worker, per day"
          min={1}
          max={8}
          step={0.5}
          value={hours}
          display={amount.format(hours)}
          onChange={setHours}
        />
        <Slider
          id="partner-days"
          label="Working days per month"
          min={4}
          max={30}
          step={1}
          value={days}
          display={amount.format(days)}
          onChange={setDays}
        />
        <Slider
          id="partner-accepted"
          label="Hours accepted"
          min={50}
          max={100}
          step={5}
          value={accepted}
          display={`${accepted}%`}
          onChange={setAccepted}
        />
        <RateField
          id="partner-rate"
          label="Partner rate per accepted hour"
          value={rate}
          onChange={setRate}
        />
      </div>

      <div aria-live="polite" className="flex flex-col rounded-[28px] bg-[#9463FF] p-6 text-white sm:p-8">
        <p className="text-[15px] font-medium tracking-[-0.2px] text-white/70">Estimated monthly earnings</p>
        <p className="mt-3 text-[48px] leading-none font-medium tracking-[-0.8px] tabular-nums sm:text-[68px] sm:tracking-[-1.36px]">
          {money.format(monthly)}
        </p>
        <dl className="mt-8">
          <Row label="Per year" value={money.format(monthly * 12)} />
          <Row label="Accepted hours per month" value={amount.format(acceptedHours)} />
          <Row label="Headband & wristband sets" value={amount.format(workers)} />
        </dl>
        <a
          href={CONTACT}
          className={`mt-8 inline-flex h-11 items-center self-start rounded-full bg-white px-5 text-[15px] font-medium text-black ${focus}`}
        >
          Talk to us
        </a>
      </div>
    </div>
  );
}

export function CollectorCalculator() {
  const [mode, setMode] = useState<"hours" | "pages">("hours");
  const [hours, setHours] = useState(2);
  const [pages, setPages] = useState(20);
  const [days, setDays] = useState(5);
  const [accepted, setAccepted] = useState(80);
  const [hourRate, setHourRate] = useState(rates.collectorHourRate.toFixed(2));
  const [pageRate, setPageRate] = useState(rates.collectorPageRate.toFixed(2));

  const perDay = mode === "hours" ? hours : pages;
  const rate = rateNumber(mode === "hours" ? hourRate : pageRate);
  const weeklyUnits = perDay * days * (accepted / 100);
  const weekly = weeklyUnits * rate;
  const monthly = (weekly * 52) / 12;
  const acceptedMonth = (weeklyUnits * 52) / 12;

  return (
    <div className="mt-12 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
      <div className="rounded-[28px] bg-[#f5f5f7] p-6 sm:p-8">
        <div className="flex rounded-full bg-white p-1" role="group" aria-label="Task type">
          <button
            type="button"
            aria-pressed={mode === "hours"}
            className={`h-11 flex-1 rounded-full text-[15px] font-medium ${focus} ${
              mode === "hours" ? "bg-black text-white" : "text-black"
            }`}
            onClick={() => setMode("hours")}
          >
            Record activities
          </button>
          <button
            type="button"
            aria-pressed={mode === "pages"}
            className={`h-11 flex-1 rounded-full text-[15px] font-medium ${focus} ${
              mode === "pages" ? "bg-black text-white" : "text-black"
            }`}
            onClick={() => setMode("pages")}
          >
            Handwritten pages
          </button>
        </div>

        {mode === "hours" ? (
          <>
            <Slider
              id="collector-hours"
              label="Hours recorded per day"
              min={0.5}
              max={8}
              step={0.5}
              value={hours}
              display={amount.format(hours)}
              onChange={setHours}
            />
            <RateField
              id="collector-hour-rate"
              label="Rate per accepted hour"
              value={hourRate}
              onChange={setHourRate}
            />
          </>
        ) : (
          <>
            <Slider
              id="collector-pages"
              label="Pages per day"
              min={5}
              max={100}
              step={5}
              value={pages}
              display={amount.format(pages)}
              onChange={setPages}
            />
            <RateField
              id="collector-page-rate"
              label="Rate per accepted page"
              value={pageRate}
              onChange={setPageRate}
            />
          </>
        )}

        <Slider
          id="collector-days"
          label="Days per week"
          min={1}
          max={7}
          step={1}
          value={days}
          display={amount.format(days)}
          onChange={setDays}
        />
        <Slider
          id="collector-accepted"
          label="Accepted"
          min={50}
          max={100}
          step={5}
          value={accepted}
          display={`${accepted}%`}
          onChange={setAccepted}
        />
      </div>

      <div aria-live="polite" className="flex flex-col rounded-[28px] bg-[#9463FF] p-6 text-white sm:p-8">
        <p className="text-[15px] font-medium tracking-[-0.2px] text-white/70">Estimated monthly earnings</p>
        <p className="mt-3 text-[48px] leading-none font-medium tracking-[-0.8px] tabular-nums sm:text-[68px] sm:tracking-[-1.36px]">
          {money.format(monthly)}
        </p>
        <dl className="mt-8">
          <Row label="Per week" value={money.format(weekly)} />
          <Row
            label={mode === "hours" ? "Accepted hours per month" : "Accepted pages per month"}
            value={amount.format(acceptedMonth)}
          />
          <Row label="Paid in" value="US dollars" />
        </dl>
        <StoreBadges
          className="mt-8 justify-start"
          onDark
          ios="https://apps.apple.com/us/iphone/search?term=klkt"
          android="https://play.google.com/store/apps/details?id=com.cntxt.cntxtai.data.services&hl=en"
        />
      </div>
    </div>
  );
}
