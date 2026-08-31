import { Reveal } from "./Reveal";

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
          <p className="label">03 — Why us</p>
          <h2 className="mt-8 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
            A garage that <em className="italic text-pine">tells you first.</em>
          </h2>
        </Reveal>

        {/* Numbered entries on hairlines: the claims read as a document rather
            than as four floating marketing tiles with icons. */}
        <ol className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {PROMISES.map((promise, i) => (
            <Reveal key={promise.title} delay={i * 0.06}>
              <li className="rule-above grid gap-1.5 pt-5 md:grid-cols-12">
                <span className="label md:col-span-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-10">
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
      </div>
    </section>
  );
}
