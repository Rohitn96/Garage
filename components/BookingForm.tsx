"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "@/components/Link";
import { useForm } from "react-hook-form";
import { SITE } from "@/site.config";
import { useLang } from "@/lib/i18n";
import { isOfferLive } from "@/lib/offer";
import { pathOf } from "@/lib/routes";
import { CONTACT_ANCHORS, type ContactPath } from "@/lib/links";
import { FORM_TEXT, TIMINGS, VEHICLES, TESLA_VEHICLES, bookingRules, type BookingRequest } from "@/lib/bookingSchema";
import { CONTACT_PAGE } from "@/content/pages";
import { OfferSwitch } from "./OfferSwitch";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || SITE.formEndpoint;

/** Submissions faster than this after the form appears are treated as bots. */
const MIN_FILL_MS = 2500;

const FIELD =
  "mt-2 block w-full min-h-[48px] border-0 bg-ink/[0.06] px-3.5 py-2.5 text-step-0 text-ink shadow-[inset_0_-2px_0_rgb(var(--rule-strong))] transition-shadow duration-2 placeholder:text-faint focus:shadow-[inset_0_-2px_0_rgb(var(--accent))] focus:outline-none focus:ring-0 aria-[invalid=true]:shadow-[inset_0_-2px_0_rgb(var(--accent))]";

function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-step--1 font-medium">
        {label}
        {optional ? <span className="font-normal text-muted"> ({optional})</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-step--2 text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-step--2 font-medium text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The contact page's two paths, side by side, and the one form they share.
 * Picking a path (or arriving on #diagnostiikka / #tarjous) sets the form's
 * mode; the diagnosis path accepts Tesla models only.
 */
export function BookingSection() {
  const lang = useLang();
  const f = FORM_TEXT[lang];
  const c = CONTACT_PAGE[lang];
  const [path, setPath] = useState<ContactPath>("quote");
  const [status, setStatus] = useState<"idle" | "sent" | "failed">("idle");
  const mountedAt = useRef(0);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
    const fromHash = () => {
      const hit = CONTACT_ANCHORS[window.location.hash.slice(1)];
      if (hit) setPath(hit);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const rules = useMemo(() => bookingRules(lang, path), [lang, path]);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<BookingRequest>({
    mode: "onBlur",
    defaultValues: { reg: "", timing: undefined, vehicle: undefined },
  });

  // Re-check the vehicle when the path changes: "Other EV" is fine for a quote
  // but not for the Tesla-only diagnosis.
  useEffect(() => {
    if (submitCount > 0) void trigger("vehicle");
  }, [path, submitCount, trigger]);

  const choose = (next: ContactPath) => {
    setPath(next);
    setStatus("idle");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    formRef.current?.querySelector<HTMLElement>("select, input")?.focus({ preventScroll: true });
  };

  const onSubmit = handleSubmit(async (values, event) => {
    const form = event?.target as HTMLFormElement | undefined;
    const honeypot = (form?.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    // Bots: pretend success, send nothing.
    if (honeypot || Date.now() - mountedAt.current < MIN_FILL_MS) {
      setStatus("sent");
      return;
    }
    const live = isOfferLive(Date.now());
    const kind = path === "diagnosis" ? (live ? "Free Tesla diagnosis" : "Tesla diagnosis") : "Quote request";
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          request: kind,
          vehicle: FORM_TEXT.en.vehicles[values.vehicle],
          year: values.year,
          registration: values.reg || "",
          message: values.message,
          timing: FORM_TEXT.en.timings[values.timing],
          name: values.name,
          phone: values.phone,
          email: values.email,
          consent: "yes",
          language: lang,
          _replyto: values.email,
          _subject: `${kind}: ${values.name}, ${FORM_TEXT.en.vehicles[values.vehicle]} ${values.year}`,
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
    } catch (error) {
      console.error("[booking form]", error);
      setStatus("failed");
    }
  });

  const describe = (id: keyof BookingRequest, hint = false) =>
    errors[id] ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const pathButton = (which: ContactPath, label: string) => (
    <button
      type="button"
      onClick={() => choose(which)}
      aria-pressed={path === which}
      className={path === which ? "btn-primary mt-6 w-full sm:w-auto" : "btn-secondary mt-6 w-full sm:w-auto"}
    >
      {label}
    </button>
  );

  return (
    <div>
      {/* Two paths, side by side on wide screens. */}
      <div className="grid gap-4 md:grid-cols-2">
        <article
          id={lang === "fi" ? "diagnostiikka" : "diagnosis"}
          className={`card scroll-mt-28 p-6 sm:p-8 ${path === "diagnosis" ? "shadow-[inset_0_0_0_2px_rgb(var(--accent))]" : ""}`}
        >
          <OfferSwitch
            live={
              <>
                <span className="chip chip-accent">{c.diagnosis.badge}</span>
                <h2 className="h3 mt-4">{c.diagnosis.title}</h2>
                <p className="mt-3 text-muted">{c.diagnosis.body}</p>
              </>
            }
            ended={
              <>
                <span className="chip">Tesla</span>
                <h2 className="h3 mt-4">{c.diagnosis.titleEnded}</h2>
                <p className="mt-3 text-muted">{c.diagnosis.bodyEnded}</p>
              </>
            }
          />
          <ul className="mt-5 grid gap-2 text-step--1">
            {c.diagnosis.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden className="font-mono text-ok">✓</span>
                {point}
              </li>
            ))}
          </ul>
          {pathButton("diagnosis", c.diagnosis.cta)}
        </article>

        <article
          id={lang === "fi" ? "tarjous" : "quote"}
          className={`card scroll-mt-28 p-6 sm:p-8 ${path === "quote" ? "shadow-[inset_0_0_0_2px_rgb(var(--accent))]" : ""}`}
        >
          <span className="chip">{lang === "fi" ? "Kaikki autot" : "Any vehicle"}</span>
          <h2 className="h3 mt-4">{c.quote.title}</h2>
          <p className="mt-3 text-muted">{c.quote.body}</p>
          <ul className="mt-5 grid gap-2 text-step--1">
            {c.quote.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden className="font-mono text-ok">✓</span>
                {point}
              </li>
            ))}
          </ul>
          {pathButton("quote", c.quote.cta)}
        </article>
      </div>

      <div ref={formRef} className="scroll-mt-28 pt-10">
        {status === "sent" ? (
          <div role="status" className="card p-6 sm:p-10">
            <span className="icon-tile">✓</span>
            <h2 className="h3 mt-4">{f.successTitle}</h2>
            <p className="mt-3 max-w-prose text-muted">{f.successBody}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="card relative grid gap-6 p-6 sm:p-10">
            <p className="label">
              {path === "diagnosis" ? (
                <OfferSwitch as="span" live={c.diagnosis.title} ended={c.diagnosis.titleEnded} />
              ) : (
                c.quote.title
              )}
            </p>

            {submitCount > 0 && Object.keys(errors).length > 0 ? (
              <p role="alert" className="text-step--1 font-medium text-accent">
                {f.fixErrors}
              </p>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-3">
              <Field id="vehicle" label={f.vehicle} error={errors.vehicle?.message}>
                <select
                  id="vehicle"
                  className={FIELD}
                  defaultValue=""
                  aria-invalid={Boolean(errors.vehicle)}
                  aria-describedby={describe("vehicle")}
                  {...register("vehicle", rules.vehicle)}
                >
                  <option value="" disabled>
                    {f.choose}
                  </option>
                  {VEHICLES.filter((v) => path === "quote" || TESLA_VEHICLES.includes(v)).map((v) => (
                    <option key={v} value={v}>
                      {f.vehicles[v]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="year" label={f.year} error={errors.year?.message}>
                <input
                  id="year"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={4}
                  placeholder="2021"
                  className={`${FIELD} font-mono`}
                  aria-invalid={Boolean(errors.year)}
                  aria-describedby={describe("year")}
                  {...register("year", rules.year)}
                />
              </Field>
              <Field id="reg" label={f.reg} optional={f.optional} error={errors.reg?.message}>
                <input
                  id="reg"
                  autoComplete="off"
                  autoCapitalize="characters"
                  placeholder="ABC-123"
                  className={`${FIELD} font-mono uppercase`}
                  aria-invalid={Boolean(errors.reg)}
                  aria-describedby={describe("reg")}
                  {...register("reg", rules.reg)}
                />
              </Field>
            </div>

            <Field id="message" label={f.message} hint={f.messageHint} error={errors.message?.message}>
              <textarea
                id="message"
                rows={5}
                className={`${FIELD} resize-y`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describe("message", true)}
                {...register("message", rules.message)}
              />
            </Field>

            <fieldset aria-describedby={errors.timing ? "timing-error" : undefined}>
              <legend className="text-step--1 font-medium">{f.timing}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {TIMINGS.map((value) => (
                  <label
                    key={value}
                    className="cut-sm flex min-h-[48px] cursor-pointer items-center gap-3 bg-ink/[0.06] px-3.5 py-2.5 text-step--1 transition-shadow duration-2 has-[:checked]:shadow-[inset_0_0_0_2px_rgb(var(--accent))]"
                  >
                    <input type="radio" value={value} className="h-4 w-4 accent-[rgb(var(--accent))]" {...register("timing", rules.timing)} />
                    {f.timings[value]}
                  </label>
                ))}
              </div>
              {errors.timing ? (
                <p id="timing-error" className="mt-1.5 text-step--2 font-medium text-accent">
                  {errors.timing.message}
                </p>
              ) : null}
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-3">
              <Field id="name" label={f.name} error={errors.name?.message}>
                <input id="name" autoComplete="name" className={FIELD} aria-invalid={Boolean(errors.name)} aria-describedby={describe("name")} {...register("name", rules.name)} />
              </Field>
              <Field id="phone" label={f.phone} error={errors.phone?.message}>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={`${FIELD} font-mono`}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={describe("phone")}
                  {...register("phone", rules.phone)}
                />
              </Field>
              <Field id="email" label={f.email} error={errors.email?.message}>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className={FIELD}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describe("email")}
                  {...register("email", rules.email)}
                />
              </Field>
            </div>

            {/* Honeypot. Hidden from people and assistive tech; bots fill it in. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="_gotcha">Leave this empty</label>
              <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-step--1">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-[rgb(var(--accent))]"
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  {...register("consent", rules.consent)}
                />
                <span>
                  {f.consent}{" "}
                  <Link href={pathOf("privacy", lang)} className="link">
                    {f.privacy}
                  </Link>
                </span>
              </label>
              {errors.consent ? (
                <p id="consent-error" className="mt-1.5 text-step--2 font-medium text-accent">
                  {errors.consent.message}
                </p>
              ) : null}
            </div>

            {status === "failed" ? (
              <div role="alert" className="cut bg-accent/10 p-4 shadow-[inset_4px_0_0_rgb(var(--accent))]">
                <p className="font-semibold">{f.errorTitle}</p>
                <p className="mt-1 text-step--1 text-muted">{f.errorBody}</p>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
                {isSubmitting ? f.sending : path === "diagnosis" ? f.submitDiagnosis : f.submitQuote}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
