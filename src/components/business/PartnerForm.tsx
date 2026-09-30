"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

/** Where submissions are POSTed as JSON. Placeholder until HubSpot / email / Slack is connected. */
const FORM_ENDPOINT = "";

/** Delay before a picked choice moves on to the next question. */
const CHOICE_ADVANCE_MS = 300;

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7d52f4]";

type Answers = Record<string, string>;

type Question = {
  name: string;
  prompt: (answers: Answers) => string;
  required: boolean;
} & (
  | { kind: "text" | "email"; placeholder?: string; autoComplete?: string }
  | { kind: "textarea"; placeholder?: string }
  | { kind: "choice"; options: string[] }
);

const firstName = (answers: Answers) => (answers.name ?? "").trim().split(/\s+/)[0] ?? "";

/** Edit, add or reorder questions here. */
const questions: Question[] = [
  {
    name: "name",
    prompt: () => "Let’s start. What’s your name?",
    kind: "text",
    required: true,
    placeholder: "First Name *",
    autoComplete: "name",
  },
  {
    name: "email",
    prompt: (answers) => {
      const first = firstName(answers);
      return first ? `Nice to meet you, ${first}. What’s your work email?` : "Nice to meet you. What’s your work email?";
    },
    kind: "email",
    required: true,
    autoComplete: "email",
  },
  { name: "company", prompt: () => "Which company are you with?", kind: "text", required: true, autoComplete: "organization" },
  {
    name: "siteType",
    prompt: () => "What kind of site do you run?",
    kind: "choice",
    required: true,
    options: ["Warehouse", "Kitchen", "Hotel", "Hospital", "Facilities", "Other"],
  },
  {
    name: "workers",
    prompt: () => "How many workers are on your site?",
    kind: "choice",
    required: true,
    options: ["1–25", "26–100", "101–500", "500+"],
  },
  {
    name: "country",
    prompt: () => "Where is your site?",
    kind: "choice",
    required: true,
    options: ["UAE", "Jordan", "United States", "Somewhere else"],
  },
  {
    name: "startTime",
    prompt: () => "When would you like to start?",
    kind: "choice",
    required: true,
    options: ["As soon as possible", "In 1–3 months", "Just exploring"],
  },
  {
    name: "notes",
    prompt: () => "Anything else we should know?",
    kind: "textarea",
    required: false,
    placeholder: "Optional — the tasks your teams do, number of sites, questions…",
  },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const letter = (index: number) => String.fromCharCode(65 + index);

function validate(question: Question, value: string) {
  const trimmed = value.trim();
  if (question.kind === "choice") return question.required && !trimmed ? "Please choose an option." : "";
  if (question.required && !trimmed) return "Please fill this in.";
  if (question.kind === "email" && trimmed && !EMAIL_PATTERN.test(trimmed)) return "That email doesn’t look right.";
  return "";
}

async function send(answers: Answers) {
  const payload = {
    ...Object.fromEntries(questions.map((q) => [q.name, (answers[q.name] ?? "").trim()])),
    submittedAt: new Date().toISOString(),
    source: "business-page",
  };

  if (!FORM_ENDPOINT) {
    // No endpoint connected yet: log the payload so the flow can be tested end to end.
    console.warn("[PartnerForm] FORM_ENDPOINT is not set. Submission was not sent:", payload);
    return;
  }

  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);
}

export function PartnerForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "failed" | "done">("idle");

  const interacted = useRef(false);
  const sending = useRef(false);
  const advanceTimer = useRef<number | undefined>(undefined);
  const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const firstOptionRef = useRef<HTMLButtonElement | null>(null);

  const question = questions[step];
  const value = answers[question.name] ?? "";
  const last = step === questions.length - 1;
  const done = status === "done";
  const errorId = `partner-${question.name}-error`;

  // Move focus to the new question only after the user has interacted with the form.
  useEffect(() => {
    if (!interacted.current || done) return;
    (question.kind === "choice" ? firstOptionRef.current : fieldRef.current)?.focus({ preventScroll: true });
  }, [step, done, question.kind]);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  function goTo(next: number) {
    window.clearTimeout(advanceTimer.current);
    interacted.current = true;
    setDirection(next > step ? "forward" : "back");
    setError("");
    setStatus((current) => (current === "failed" ? "idle" : current));
    setStep(next);
  }

  function setValue(next: string) {
    setAnswers((current) => ({ ...current, [question.name]: next }));
    if (error) setError("");
  }

  async function submit() {
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    try {
      await send(answers);
      setStatus("done");
    } catch {
      setStatus("failed");
    } finally {
      sending.current = false;
    }
  }

  function advance(currentValue = value) {
    interacted.current = true;
    const message = validate(question, currentValue);
    if (message) {
      setError(message);
      return;
    }
    if (last) void submit();
    else goTo(step + 1);
  }

  function choose(option: string) {
    setValue(option);
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => advance(option), CHOICE_ADVANCE_MS);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    advance();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (question.kind !== "choice" || done) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target as HTMLElement;
    if (target.closest("input, textarea, select, [contenteditable='true']")) return;
    const index = event.key.length === 1 ? event.key.toUpperCase().charCodeAt(0) - 65 : -1;
    if (index >= 0 && index < question.options.length) {
      event.preventDefault();
      choose(question.options[index]);
    }
  }

  const progressText = done ? "All done" : `Question ${step + 1} of ${questions.length}`;
  const slide =
    direction === "forward"
      ? "motion-safe:animate-[partner-from-below_320ms_ease-out]"
      : "motion-safe:animate-[partner-from-above_320ms_ease-out]";
  const describedBy = error ? errorId : undefined;

  return (
    <div
      onKeyDown={onKeyDown}
      className="flex min-h-[340px] flex-1 flex-col justify-between gap-10 overflow-hidden rounded-[24px] border border-[rgba(32,22,19,0.1)] bg-[#fafaf8] p-6 sm:rounded-[29px] sm:p-10 lg:min-h-full lg:p-14"
    >
      <div className="flex flex-1 flex-col justify-center gap-3">
        <p aria-live="polite" className="text-[13px] leading-5 font-medium text-[#7d52f4]">
          {progressText}
        </p>

        {done ? (
          <div className="flex flex-col gap-3">
            <p className="text-[26px] leading-[1.25] font-medium text-black sm:text-[32px]">
              {firstName(answers) ? `Thanks, ${firstName(answers)}. We’ll be in touch.` : "Thanks. We’ll be in touch."}
            </p>
            <p className="text-[16px] leading-6 text-black/60">
              Our team will reply to {(answers.email ?? "").trim()} to plan the next step.
            </p>
          </div>
        ) : (
          <form key={step} onSubmit={onSubmit} noValidate className={`flex flex-col gap-3 ${slide}`}>
            {question.kind === "choice" ? (
              <>
                <p id={`partner-${question.name}-label`} className="text-[24px] leading-[1.25] font-medium text-black sm:text-[32px] sm:leading-[1.4]">
                  {question.prompt(answers)}
                </p>
                <div
                  role="radiogroup"
                  aria-labelledby={`partner-${question.name}-label`}
                  aria-required={question.required}
                  aria-describedby={describedBy}
                  className="flex flex-wrap gap-2"
                >
                  {question.options.map((option, index) => {
                    const selected = option === value;
                    return (
                      <button
                        key={option}
                        ref={index === 0 ? firstOptionRef : undefined}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => choose(option)}
                        className={`inline-flex items-center gap-2 rounded-[12px] px-4 py-2.5 text-[15px] leading-5 transition-colors ${
                          selected ? "bg-[#7d52f4] text-white" : "bg-[rgba(236,235,229,0.7)] text-[#201613] hover:bg-[rgba(125,82,244,0.12)]"
                        } ${focus}`}
                      >
                        <span aria-hidden className={`text-[12px] font-medium ${selected ? "text-white/80" : "text-[#7d52f4]"}`}>
                          {letter(index)}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <label
                  htmlFor={`partner-${question.name}`}
                  className="text-[24px] leading-[1.25] font-medium text-black sm:text-[32px] sm:leading-[1.4]"
                >
                  {question.prompt(answers)}
                </label>
                {question.kind === "textarea" ? (
                  <textarea
                    ref={(node) => {
                      fieldRef.current = node;
                    }}
                    id={`partner-${question.name}`}
                    name={question.name}
                    rows={3}
                    placeholder={question.placeholder}
                    value={value}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                        event.preventDefault();
                        advance();
                      }
                    }}
                    className="w-full resize-none rounded-[14px] bg-[rgba(236,235,229,0.5)] px-5 py-4 text-[15px] text-[#201613] outline-none placeholder:text-[rgba(32,22,19,0.5)] focus-visible:ring-2 focus-visible:ring-[#7d52f4]"
                  />
                ) : (
                  <input
                    ref={(node) => {
                      fieldRef.current = node;
                    }}
                    id={`partner-${question.name}`}
                    name={question.name}
                    type={question.kind}
                    inputMode={question.kind === "email" ? "email" : undefined}
                    required={question.required}
                    autoComplete={question.autoComplete}
                    placeholder={question.placeholder}
                    value={value}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    onChange={(event) => setValue(event.target.value)}
                    className="h-[56.6px] w-full rounded-[14px] bg-[rgba(236,235,229,0.5)] px-5 text-[15px] text-[#201613] outline-none placeholder:text-[rgba(32,22,19,0.5)] focus-visible:ring-2 focus-visible:ring-[#7d52f4]"
                  />
                )}
              </>
            )}

            {error ? (
              <p id={errorId} role="alert" className="text-[14px] leading-5 text-[#e10004]">
                {error}
              </p>
            ) : null}
            {status === "failed" ? (
              <p role="alert" className="text-[14px] leading-5 text-[#e10004]">
                Something went wrong. Please try again.
              </p>
            ) : null}

            <div className="mt-1 flex items-center gap-3">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  disabled={status === "sending"}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-[13px] bg-[rgba(236,235,229,0.7)] px-6 text-[16px] font-medium text-[#201613] transition-colors hover:bg-[rgba(125,82,244,0.12)] disabled:opacity-40 ${focus}`}
                >
                  <img src="/business-2/icon-arrow-right.svg" alt="" width={16} height={16} className="rotate-180 invert" />
                  Back
                </button>
              ) : null}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`inline-flex h-12 items-center justify-center gap-2 rounded-[13px] bg-[#7d52f4] px-7 text-[16px] font-medium text-[#fafaf8] shadow-[0_1px_0.5px_rgba(32,22,19,0.06)] transition-opacity disabled:opacity-40 ${focus}`}
              >
                {status === "sending" ? "Sending…" : last ? "Submit" : "Next"}
                {status === "sending" ? null : <img src="/business-2/icon-arrow-right.svg" alt="" width={16} height={16} />}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="flex items-center">
        <div className="flex flex-1 gap-2.5" aria-hidden>
          {questions.map((q, index) => (
            <span
              key={q.name}
              className={`h-[2px] flex-1 rounded-full transition-colors ${done || index < step ? "bg-[#7d52f4]" : index === step ? "bg-[#7d52f4]/70" : "bg-[rgba(125,82,244,0.25)]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PartnerSection() {
  return (
    <section id="partner" className="scroll-mt-28 bg-[#f5f5f7] py-14 sm:py-[140px]">
      <div className="site">
        <div className="flex flex-col gap-6 rounded-[24px] bg-[#d6c7ff] p-2 sm:rounded-[29px] lg:min-h-[402px] lg:flex-row lg:items-stretch lg:gap-8 lg:py-2.5 lg:pr-1.5 lg:pl-[47px]">
          <div className="flex flex-col justify-center gap-3 px-4 pt-6 sm:px-8 sm:pt-8 lg:w-[400px] lg:shrink-0 lg:p-0">
            <p className="text-[16px] leading-[30px] tracking-[0.02em] text-[#7c40ff] uppercase sm:text-[20px]">Become a partner</p>
            <h2 className="text-[clamp(34px,4vw,48px)] leading-[1.17] font-medium text-black">Explore KLKT for your site.</h2>
            <p className="text-[16px] leading-[1.4] text-black/60 sm:text-[18px] sm:leading-[26px]">8 quick questions. About a minute.</p>
          </div>
          <PartnerForm />
        </div>
      </div>
    </section>
  );
}
