"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { bookingSchema, type BookingRequest } from "@/lib/bookingSchema";
import { usePrefersReducedMotion } from "@/lib/useMotionPreference";
import { Reveal } from "./Reveal";

const FIELD =
  "w-full rounded-lg border border-line bg-ink px-4 py-3 text-[0.95rem] text-chalk placeholder:text-fog/50 transition-colors focus:border-rust";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-rust-glow">{message}</p>;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingRequest>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
  });

  /**
   * Dry-run intake. The site is a static export, so there is no server route to
   * receive this — and no business to route it to yet.
   *
   * Set NEXT_PUBLIC_BOOKING_ENDPOINT (a form service, a Worker, whatever you
   * end up using) and the same payload gets POSTed there instead of logged.
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
    <section id="contact" className="rule-top bg-graphite">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-bold uppercase leading-[1.02] tracking-tight">
              Get in <span className="text-rust">touch</span>
            </h2>
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-fog sm:text-base">
              We are not open yet, so nothing is bookable today. Leave your
              details and we will come back to you with a slot as soon as the
              doors are up.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-steel/60 p-6 sm:p-8">
              {sent ? (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 text-center"
                  role="status"
                >
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-rust text-rust">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
                      <path
                        d="m5 12.5 4.5 4.5L19 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-semibold">
                    Thanks — we will be in touch once we are open.
                  </h3>
                  <p className="mx-auto mt-3 max-w-[38ch] text-sm leading-relaxed text-fog">
                    Nothing is booked yet. We have your details and will contact
                    you directly when we can offer you a time.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="grid gap-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
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
                    <label htmlFor="registration" className="mb-2 block text-sm font-medium">
                      Registration number
                    </label>
                    <input
                      id="registration"
                      className={`${FIELD} uppercase tracking-wide`}
                      placeholder="ABC-123"
                      aria-invalid={Boolean(errors.registration)}
                      {...register("registration")}
                    />
                    <FieldError message={errors.registration?.message} />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
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
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`${FIELD} resize-y`}
                      placeholder="Tell us what your car needs, and let us know a few times that would work for you."
                      aria-invalid={Boolean(errors.message)}
                      {...register("message")}
                    />
                    <FieldError message={errors.message?.message} />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 rounded-full bg-rust px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-rust-glow disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending…" : "Send booking request"}
                  </button>

                  {failed && (
                    <p role="alert" className="text-sm text-rust-glow">
                      That did not go through. Please try again in a moment.
                    </p>
                  )}

                  <p className="text-xs leading-relaxed text-fog/70">
                    Pre-launch form. Your details are not yet stored in a live
                    system and no booking is confirmed.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
