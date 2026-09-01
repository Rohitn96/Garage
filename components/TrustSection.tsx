import { Reveal } from "./Reveal";

/*
 * PLACEHOLDER PRICING for the dry run.
 *
 * These are indicative figures, which is exactly why PRICE_NOTE below is
 * rendered directly under the list rather than buried in a footer. Any change
 * that puts a number on screen has to keep a caveat beside it.
 */
const PRICES: Array<{ service: string; price: string }> = [
  { service: "Comprehensive vehicle inspection", price: "120 €" },
  { service: "Tesla service packages", price: "290–330 €" },
  { service: "Filter change, oil change, tyre work", price: "80 €" },
  { service: "AC service", price: "150–200 €" },
  { service: "Hourly labour rate", price: "80 € / hr" },
];

const PRICE_NOTE =
  "Prices shown are examples and may be adjusted based on your vehicle and the specific work needed. Special rates are available for food delivery and rideshare fleet vehicles — get in touch for a fleet quote.";

const PROMISES = [
  {
    title: "The price is agreed first",
    body: "We inspect, we quote, you decide. Nothing gets touched until you have said yes to a number.",
  },
  {
    title: "No extra work without a call",
    body: "If we find something else, we stop and ring you. You will never collect a car carrying charges you did not approve.",
  },
  {
    title: "All makes and models",
    body: "Japanese, German, French, Korean, hybrids included. If it is on Finnish plates, we will look at it.",
  },
  {
    title: "Warranty on parts and labour",
    body: "[Placeholder] cover on everything we fit and every hour we work. Terms confirmed before opening.",
  },
];

export function TrustSection() {
  return (
    <section className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="label">Why us</p>
          <h2 className="mt-8 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
            A garage that <em className="italic text-pine">tells you first.</em>
          </h2>
        </Reveal>

        {/* Numbered entries on hairlines: the claims read as a document rather
            than as four floating marketing tiles with icons. */}
        <ol className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {PROMISES.map((promise, i) => (
            <Reveal key={promise.title} delay={i * 0.06}>
              <li className="rule-above pt-5">
                <div>
                  <h3 className="font-display text-[1.6rem] leading-tight tracking-[-0.01em]">
                    {promise.title}
                  </h3>
                  <p className="mt-2.5 max-w-[44ch] text-[0.95rem] leading-relaxed text-graphite">
                    {promise.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        {/*
          Price list. The Services section's old price cards were removed when
          prices came off the site, so there is no card style left to reuse —
          these are hairline rows in the same register as the service catalogue,
          which is what that card style had become anyway.
        */}
        <Reveal>
          <div className="mt-24 grid gap-x-12 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label">Guide prices</p>
              <h3 className="mt-5 max-w-[14ch] font-display text-[1.9rem] leading-tight tracking-[-0.01em]">
                What the common jobs cost.
              </h3>
            </div>

            <dl className="md:col-span-7 md:col-start-6">
              {PRICES.map((row) => (
                <div
                  key={row.service}
                  className="flex items-baseline justify-between gap-6 border-b border-rule/70 py-3.5 first:border-t first:border-rule/70"
                >
                  <dt className="font-display text-[1.2rem] leading-snug tracking-[-0.01em]">
                    {row.service}
                  </dt>
                  <dd className="shrink-0 whitespace-nowrap font-mono text-[0.85rem] text-pine">
                    {row.price}
                  </dd>
                </div>
              ))}
              <p className="mt-6 max-w-[52ch] text-[0.85rem] leading-relaxed text-graphite">
                {PRICE_NOTE}
              </p>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
