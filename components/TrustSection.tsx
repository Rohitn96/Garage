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

/*
 * This section used to carry four claim tiles — price agreed first, no extra
 * work without a call, all makes and models, warranty on parts and labour.
 * They were cut to reach the prices faster. The two that actually differentiate
 * a garage (the price is agreed first, nothing extra happens without a call)
 * are folded into the standfirst below so the promise is not lost with them.
 * "All makes and models" and the warranty line are no longer stated anywhere.
 */

export function TrustSection() {
  return (
    <section className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="label">Why us</p>
            <h2 className="mt-8 max-w-[14ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
              Fair prices, <em className="italic text-pine">agreed first.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-6 md:col-start-7">
            <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-graphite">
              Independent rates without the dealer overheads — and the number is
              agreed with you before anything is touched. If we find something
              else along the way, we stop and ring you first.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-20 grid gap-x-12 gap-y-8 md:grid-cols-12">
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
