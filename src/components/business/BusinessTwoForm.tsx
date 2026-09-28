"use client";

import { useState, type FormEvent } from "react";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const field =
  "h-[60px] w-full rounded-[24px] border border-[#d2cecb] bg-white px-6 text-[16px] text-[#0c0a08] outline-none placeholder:text-[#0c0a08]/60";

export function BusinessTwoForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      `First name: ${data.get("firstName")}`,
      `Last name: ${data.get("lastName")}`,
      `Work email: ${data.get("email")}`,
      `Company: ${data.get("company")}`,
      `Sites: ${data.get("sites")}`,
    ];
    window.location.href = `mailto:info@cntxt.com?subject=${encodeURIComponent("KLKT demo request")}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="text-center text-[18px] leading-7 text-[#0c0a08]">
        Thanks. Your email app should open with the request to info@cntxt.com.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-[640px] flex-col gap-6">
      <input required name="firstName" autoComplete="given-name" placeholder="First name" className={`${field} ${focus}`} />
      <input required name="lastName" autoComplete="family-name" placeholder="Last name" className={`${field} ${focus}`} />
      <input required type="email" name="email" autoComplete="email" placeholder="Work email" className={`${field} ${focus}`} />
      <input required name="company" autoComplete="organization" placeholder="Company name" className={`${field} ${focus}`} />
      <div className="relative">
        <select
          required
          name="sites"
          defaultValue=""
          className={`${field} appearance-none pr-12 ${focus}`}
        >
          <option value="" disabled>
            How many clients does your firm serve?
          </option>
          <option>1–10</option>
          <option>11–50</option>
          <option>51–200</option>
          <option>More than 200</option>
        </select>
        <span className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2">
          <img src="/business-2/icon-chevron.svg" alt="" width={16} height={16} className="-scale-y-100" />
        </span>
      </div>
      <button
        type="submit"
        className={`h-[51px] rounded-[24px] bg-[#7c40ff] text-[16px] font-semibold text-white ${focus}`}
      >
        Request a demo
      </button>
    </form>
  );
}
