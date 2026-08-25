"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { INDIAN_STATES } from "@/lib/site";
import type { Division } from "@/types/db";
import { cn } from "@/lib/utils";

const initial: EnquiryState = { ok: false, message: "" };

type Tone = "light" | "dark";

const TONE = {
  light: {
    label: "text-ink/45",
    field: "text-ink placeholder:text-ink/25",
    rule: "bg-rule",
    ruleActive: "bg-leaf",
    option: "bg-bone text-ink",
    note: "text-ink/40",
    btn: "bg-ink text-bone",
    btnFill: "bg-leaf",
    btnHover: "group-hover:text-ink",
  },
  dark: {
    label: "text-bone/45",
    field: "text-bone placeholder:text-bone/25",
    rule: "bg-bone/20",
    ruleActive: "bg-lime",
    option: "bg-navy text-bone",
    note: "text-bone/35",
    btn: "bg-lime text-ink",
    btnFill: "bg-bone",
    btnHover: "group-hover:text-ink",
  },
} as const;

export default function EnquiryForm({
  kind = "franchise",
  divisions = [],
  productName,
  compact = false,
  tone = "light",
  className,
}: {
  kind?: "franchise" | "contact" | "product";
  divisions?: Division[];
  productName?: string;
  compact?: boolean;
  tone?: Tone;
  className?: string;
}) {
  const pathname = usePathname();
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const formRef = useRef<HTMLFormElement>(null);
  // Derived, not synced — `dismissed` only tracks the "send another" click.
  const [dismissed, setDismissed] = useState(0);
  const done = state.ok && Boolean(state.message) && dismissed === 0;
  const t = TONE[tone];

  useEffect(() => {
    if (state.ok && state.message) formRef.current?.reset();
  }, [state]);

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "flex min-h-64 flex-col justify-center border-t py-12",
              tone === "dark" ? "border-lime" : "border-leaf",
            )}
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={cn("mb-8 block h-1 w-16 origin-left", tone === "dark" ? "bg-lime" : "bg-leaf")}
            />
            <h3
              className={cn(
                "display text-[2rem] leading-none",
                tone === "dark" ? "text-bone" : "text-ink",
              )}
            >
              Received.
            </h3>
            <p className={cn("mt-4 max-w-[42ch] text-[0.95rem] leading-[1.7]", t.note)}>
              {state.message}
            </p>
            <button
              onClick={() => setDismissed((n) => n + 1)}
              className={cn(
                "label link-draw mt-8 self-start",
                tone === "dark" ? "text-lime" : "text-leaf",
              )}
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            action={action}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-7"
          >
            <input type="hidden" name="kind" value={kind} />
            <input type="hidden" name="source_path" value={pathname} />
            {productName && <input type="hidden" name="product_name" value={productName} />}

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className={cn("grid gap-7", !compact && "sm:grid-cols-2")}>
              <Field t={t} label="Full name" name="full_name" placeholder="Rakesh Verma" required error={state.fieldErrors?.full_name} />
              <Field t={t} label="Mobile" name="phone" type="tel" placeholder="98765 43210" required error={state.fieldErrors?.phone} />
            </div>

            <div className={cn("grid gap-7", !compact && "sm:grid-cols-2")}>
              <Field t={t} label="Email" name="email" type="email" placeholder="you@company.com" error={state.fieldErrors?.email} />
              <Field t={t} label="Firm" name="company" placeholder="Shree Medico Distributors" />
            </div>

            {kind === "franchise" && (
              <>
                <div className={cn("grid gap-7", !compact && "sm:grid-cols-2")}>
                  <Field t={t} label="City / district" name="city" placeholder="Lucknow" />
                  <SelectField t={t} label="State" name="state" options={INDIAN_STATES} placeholder="Select state" />
                </div>

                <div className={cn("grid gap-7", !compact && "sm:grid-cols-2")}>
                  <SelectField t={t} label="Division" name="division" options={divisions.map((d) => d.name)} placeholder="Any / not sure yet" />
                  <SelectField
                    t={t}
                    label="Experience"
                    name="experience"
                    options={["New to pharma", "Under 2 years", "2–5 years", "5–10 years", "10+ years"]}
                    placeholder="Select experience"
                  />
                </div>
              </>
            )}

            <Field
              t={t}
              label="Message"
              name="message"
              as="textarea"
              placeholder={
                kind === "franchise"
                  ? "Districts you cover, doctors you already service, segments you want to start with…"
                  : "How can we help?"
              }
            />

            <AnimatePresence>
              {!state.ok && state.message && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="label border-l-2 border-red-500 pl-3 text-red-500"
                >
                  {state.message}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button
                type="submit"
                disabled={pending}
                data-cursor="hover"
                className={cn(
                  "group relative overflow-hidden px-8 py-4 label transition-colors duration-400 disabled:opacity-60",
                  t.btn,
                  t.btnHover,
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100",
                    t.btnFill,
                  )}
                />
                <span className="relative z-10">
                  {pending
                    ? "Sending…"
                    : kind === "franchise"
                      ? "Check territory availability"
                      : "Send enquiry"}
                </span>
              </button>

              <p className={cn("label max-w-[28ch] leading-[1.6]", t.note)}>
                Reply within one working day. Never shared with a third party.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------ fields ------------------------------ */

type ToneStyles = (typeof TONE)[Tone];

function Field({
  t, label, name, type = "text", placeholder, required, error, as = "input",
}: {
  t: ToneStyles;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  as?: "input" | "textarea";
}) {
  const [focused, setFocused] = useState(false);
  const base = cn(
    "w-full bg-transparent pb-3 pt-1 text-[0.95rem] outline-none",
    t.field,
  );

  return (
    <label className="relative block">
      <span className={cn("label mb-2 block", t.label)}>
        {label}
        {required && <span className="ml-1 text-leaf">*</span>}
      </span>

      {as === "textarea" ? (
        <textarea
          name={name}
          rows={3}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(base, "resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={base}
        />
      )}

      <span className={cn("absolute inset-x-0 bottom-0 block h-px", error ? "bg-red-500" : t.rule)} />
      <motion.span
        className={cn("absolute inset-x-0 bottom-0 block h-px origin-left", t.ruleActive)}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />

      {error && <span className="label mt-2 block text-red-500">{error}</span>}
    </label>
  );
}

function SelectField({
  t, label, name, options, placeholder,
}: {
  t: ToneStyles;
  label: string;
  name: string;
  options: string[];
  placeholder: string;
}) {
  return (
    <label className="relative block">
      <span className={cn("label mb-2 block", t.label)}>{label}</span>
      <select
        name={name}
        defaultValue=""
        className={cn(
          "w-full appearance-none bg-transparent pb-3 pt-1 text-[0.95rem] outline-none",
          t.field,
        )}
      >
        <option value="" className={t.option}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className={t.option}>
            {o}
          </option>
        ))}
      </select>
      <span className={cn("absolute inset-x-0 bottom-0 block h-px", t.rule)} />
    </label>
  );
}
