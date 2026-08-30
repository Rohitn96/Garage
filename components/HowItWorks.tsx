import { Reveal } from "./Reveal";

const STEPS = [
  {
    title: "Tell us what is wrong",
    body: "Describe the noise, the warning light or the inspection failure — or just book a standard service.",
  },
  {
    title: "We confirm scope and price",
    body: "We look the car over, then come back to you with what it needs and what it will cost.",
  },
  {
    title: "We do the work",
    body: "Only what you approved. If something else turns up, we call before going further.",
  },
  {
    title: "Collect and pay",
    body: "You pick the car up, we walk you through what we did, and you pay on collection.",
  },
];

export function HowItWorks() {
  return (
    <section className="rule-top bg-ink">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:py-32">
        <Reveal>
          <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-bold uppercase leading-[1.02] tracking-tight">
            How it works
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <li className="relative md:pr-6">
                {/* Connector rule between steps on wide screens. */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute right-0 top-[13px] hidden h-px w-6 bg-line md:block"
                  />
                )}
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-bold text-rust">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-line md:hidden" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fog">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
