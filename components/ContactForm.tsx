"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { makeBookingSchema, type BookingRequest } from "@/lib/bookingSchema";
import { useLang, useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";
import { Reveal } from "./Reveal";

/** Live Formspree endpoint; an env var overrides it for preview builds. */
const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/maeyoeeq";

/** Underlined field rather than a boxed input — one rule per row, like a form. */
const FIELD =
  "w-full border-0 border-b border-rule bg-transparent px-0 pb-2.5 pt-1 text-[1.05rem] text-ink placeholder:text-graphite/45 focus:border-pine focus:outline-none focus:ring-0";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 font-mono text-[0.7rem] text-pine">{message}</p>;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const { lang } = useLang();
  const t = useT();
  const c = CONTENT.contact;

  // Rebuilt when the language changes so error messages match the page.
  const schema = useMemo(() => makeBookingSchema(lang), [lang]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingRequest>({ resolver: zodResolver(schema), mode: "onBlur" });

  /**
   * Delivery: Formspree → revampmotors1@gmail.com.
   *
   * Chosen over Resend-on-a-Worker because this site is a static export with no
   * server route. Formspree needs no backend code and no secret: the endpoint id
   * is public by design — it ships in the HTML of every Formspree form — and
   * abuse is rate-limited on their side.
   *
   * The endpoint is baked in rather than read only from the environment, because
   * a static export inlines env vars at BUILD time — an unset variable would
   * silently ship a form that posts nowhere. The env var still wins if set.
   *
   * Note: Formspree rejects posts with no Origin header ("Bad form post
   * request"). Browsers always send one; curl does not, so test with
   * -H "Origin: https://revampmotors.fi" or it will look broken when it is not.
   */
  const onSubmit = handleSubmit(async (values) => {
    setFailed(false);
    try {
      if (FORMSPREE_ENDPOINT) {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...values,
            _subject: `Booking request — ${values.name} (${values.registration})`,
            _language: lang,
          }),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      } else {
        console.warn("[booking form] No endpoint configured — NOT sent.", values);
      }
      setSent(true);
    } catch (error) {
      console.error("[booking form]", error);
      setFailed(true);
    }
  });

  const deliveryConfigured = Boolean(FORMSPREE_ENDPOINT);

  return (
    <section id="contact" className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="label">{t(c.eyebrow)}</p>
            <h2 className="mt-8 max-w-[12ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
              {t(c.headingA)} <em className="italic text-pine">{t(c.headingAccent)}</em>
            </h2>
            <p className="mt-6 max-w-[40ch] text-graphite">{t(c.p1)}</p>
            <p className="mt-4 max-w-[40ch] text-graphite">{t(c.p2)}</p>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
            {sent ? (
              <div className="rule-above pt-8" role="status">
                <p className="label">{t(c.successEyebrow)}</p>
                <h3 className="mt-5 font-display text-[2rem] leading-tight tracking-[-0.01em]">
                  {t(c.successHeading)}
                </h3>
                <p className="mt-4 max-w-[40ch] text-graphite">{t(c.successBody)}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-9">
                <div>
                  <label htmlFor="name" className="label mb-3 block">
                    {t(c.fields.name)}
                  </label>
                  <input
                    id="name"
                    className={FIELD}
                    placeholder={t(c.placeholders.name)}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    {...register("name")}
                  />
                  <FieldError message={errors.name?.message} />
                </div>

                <div>
                  <label htmlFor="registration" className="label mb-3 block">
                    {t(c.fields.registration)}
                  </label>
                  <input
                    id="registration"
                    className={`${FIELD} font-mono uppercase`}
                    placeholder={t(c.placeholders.registration)}
                    aria-invalid={Boolean(errors.registration)}
                    {...register("registration")}
                  />
                  <FieldError message={errors.registration?.message} />
                </div>

                <div>
                  <label htmlFor="email" className="label mb-3 block">
                    {t(c.fields.email)}
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    className={FIELD}
                    placeholder={t(c.placeholders.email)}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                  />
                  <FieldError message={errors.email?.message} />
                </div>

                <div>
                  <label htmlFor="phone" className="label mb-3 block">
                    {t(c.fields.phone)}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    className={`${FIELD} font-mono`}
                    placeholder={t(c.placeholders.phone)}
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    {...register("phone")}
                  />
                  <FieldError message={errors.phone?.message} />
                </div>

                <div>
                  <label htmlFor="message" className="label mb-3 block">
                    {t(c.fields.message)}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`${FIELD} resize-y`}
                    placeholder={t(c.placeholders.message)}
                    aria-invalid={Boolean(errors.message)}
                    {...register("message")}
                  />
                  <FieldError message={errors.message?.message} />
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="link-underline font-display text-[1.5rem] tracking-[-0.01em] disabled:opacity-50"
                  >
                    {isSubmitting ? t(c.submitting) : t(c.submit)}
                  </button>
                  {failed && (
                    <p role="alert" className="font-mono text-[0.7rem] text-pine">
                      {t(c.failed)}
                    </p>
                  )}
                </div>

                <p className="text-[0.8rem] leading-relaxed text-graphite">
                  {deliveryConfigured ? t(c.notice) : t(c.noticeOffline)}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
