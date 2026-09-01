import { Reveal } from "./Reveal";

/*
 * PLACEHOLDER / DRY-RUN COPY.
 *
 * The "years in the trade" framing below is deliberately unquantified because no
 * real credentials, dates or headcount have been supplied yet. Once there is an
 * actual history to point at — who, how long, which marques, which
 * certifications — this should be rewritten to say it plainly. Vague seniority
 * claims are exactly the thing a customer discounts, so this is a stopgap, not
 * the final voice.
 */

export function OurStory() {
  return (
    <section className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="label">03 — Our story</p>
          <h2 className="mt-8 max-w-[18ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
            Built on experience,{" "}
            <em className="italic text-pine">tuned for what&rsquo;s next.</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-12">
          <Reveal delay={0.06} className="md:col-span-6 md:col-start-1">
            <p className="max-w-[52ch] leading-relaxed text-graphite">
              Revamp Motors is built by mechanics who have spent years in the
              trade — from routine servicing to the kind of diagnostic work that
              separates a real fix from a guess.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-6 md:col-start-7">
            <p className="max-w-[52ch] leading-relaxed text-graphite">
              We have watched the industry shift toward EVs and built genuine
              depth there. Tesla and other electric vehicles are where a lot of
              our attention goes — battery and drivetrain diagnostics, and the
              software-related quirks most general garages have not caught up on
              yet.
            </p>
            <p className="mt-6 max-w-[52ch] leading-relaxed text-graphite">
              That said, most cars on Finnish roads still run on an engine, and
              that is not something we have set aside. Combustion servicing and
              repair is still the bulk of what keeps the lights on, and we are
              just as exacting about it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
