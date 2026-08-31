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
    body: "Only what you approved. If something else turns up, we call before going any further.",
  },
  {
    title: "Collect and pay",
    body: "You pick the car up, we walk you through what we did, and you pay on collection.",
  },
];

export function HowItWorks() {
  return (
    <section className="rule-above bg-panel">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="label">04 — Process</p>
          <h2 className="mt-8 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
            Four steps, <em className="italic text-pine">no surprises.</em>
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-y-10 md:grid-cols-4 md:gap-x-10">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07}>
              <li className="rule-above pt-5">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[1.5rem] leading-tight tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-graphite">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
