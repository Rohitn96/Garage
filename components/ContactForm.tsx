"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingRequest } from "@/lib/bookingSchema";
import { Reveal } from "./Reveal";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingRequest>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
  });

  /**
   * Dry-run intake. The site is a static export, so there is no server route —
   * and no business to route this to yet.
   *
   * Set NEXT_PUBLIC_BOOKING_ENDPOINT (a form service, a Worker, whatever you end
   * up using) and the same payload gets POSTed there instead of logged.
   */
  const onSubmit = handleSubmit(async (values) => {
    setFailed(false);
    const endpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      } else {
        console.log("[booking request]", {
          ...values,
          submittedAt: new Date().toISOString(),
        });
      }
      setSent(true);
    } catch (error) {
      console.error("[booking form]", error);
      setFailed(true);
    }
  });

  return (
    <section id="contact" className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="label">05 — Contact</p>
            <h2 className="mt-8 max-w-[12ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
              Tell us about <em className="italic text-pine">the car.</em>
            </h2>
            <p className="mt-6 max-w-[38ch] text-graphite">
              We are not open yet, so nothing is bookable today. Leave your
              details and we will come back to you with a slot as soon as the
              doors are up.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
            {sent ? (
              <div className="rule-above pt-8" role="status">
                <p className="label">Received</p>
                <h3 className="mt-5 font-display text-[2rem] leading-tight tracking-[-0.01em]">
                  Thanks — we will be in touch once we are open.
                </h3>
                <p className="mt-4 max-w-[40ch] text-graphite">
                  Nothing is booked yet. We have your details and will contact
                  you directly when we can offer you a time.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-9">
                <div>
                  <label htmlFor="name" className="label mb-3 block">
                    Name
                  </label>
                  <input
                    id="name"
                    className={FIELD}
                    placeholder="Matti Virtanen"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    {...register("name")}
                  />
                  <FieldError message={errors.name?.message} />
                </div>

                <div>
                  <label htmlFor="registration" className="label mb-3 block">
                    Registration number
                  </label>
                  <input
                    id="registration"
                    className={`${FIELD} font-mono uppercase`}
                    placeholder="ABC-123"
                    aria-invalid={Boolean(errors.registration)}
                    {...register("registration")}
                  />
                  <FieldError message={errors.registration?.message} />
                </div>

                <div>
                  <label htmlFor="email" className="label mb-3 block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    className={FIELD}
                    placeholder="matti@example.fi"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                  />
                  <FieldError message={errors.email?.message} />
                </div>

                <div>
                  <label htmlFor="message" className="label mb-3 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`${FIELD} resize-y`}
                    placeholder="Tell us what your car needs, and let us know a few times that would work for you."
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
                    {isSubmitting ? "Sending…" : "Send booking request →"}
                  </button>
                  {failed && (
                    <p role="alert" className="font-mono text-[0.7rem] text-pine">
                      That did not go through. Please try again in a moment.
                    </p>
                  )}
                </div>

                <p className="text-[0.8rem] leading-relaxed text-graphite">
                  Pre-launch form. Your details are not yet stored in a live
                  system and no booking is confirmed.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
