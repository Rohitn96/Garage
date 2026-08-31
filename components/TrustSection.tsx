import { Reveal } from "./Reveal";

type Promise_ = { title: string; body: string; icon: React.ReactNode };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PROMISES: Promise_[] = [
  {
    title: "The price is agreed first",
    body: "We inspect, we quote, you decide. Nothing gets touched until you have said yes to a number.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 7h16M4 12h10M4 17h7" />
        <circle cx="18.5" cy="16.5" r="3.5" />
        <path d="m17 16.5 1.1 1.1 2-2.2" />
      </svg>
    ),
  },
  {
    title: "No extra work without a call",
    body: "If we find something else, we stop and ring you. You will never collect a car with charges you did not approve.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M5.2 4.5h3l1.4 3.4-1.8 1.4a11 11 0 0 0 4.9 4.9l1.4-1.8 3.4 1.4v3a1.6 1.6 0 0 1-1.8 1.6A14.6 14.6 0 0 1 3.6 6.3 1.6 1.6 0 0 1 5.2 4.5Z" />
      </svg>
    ),
  },
  {
    title: "All makes and models",
    body: "Japanese, German, French, Korean, hybrids included. If it is on Finnish plates, we will look at it.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 14.5v-2.2l1.8-4.1A2 2 0 0 1 6.6 7h10.8a2 2 0 0 1 1.8 1.2l1.8 4.1v2.2" />
        <path d="M3 14.5h18v3H3zM4.5 10.8h15" />
        <circle cx="7.2" cy="17.5" r="1.6" />
        <circle cx="16.8" cy="17.5" r="1.6" />
      </svg>
    ),
  },
  {
    title: "Warranty on parts and labour",
    body: "[Placeholder] cover on everything we fit and every hour we work. Terms to be confirmed before opening.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3.2 19 6v6c0 4.2-2.9 7.4-7 8.8-4.1-1.4-7-4.6-7-8.8V6Z" />
        <path d="m8.8 12 2.2 2.2 4.2-4.4" />
      </svg>
    ),
  },
];

export function TrustSection() {
  return (
    <section className="rule-top bg-graphite">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:py-32">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-bold uppercase leading-[1.02] tracking-tight">
            Why Revamp <span className="text-rust">Motors</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((promise, i) => (
            <Reveal key={promise.title} delay={i * 0.07}>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-steel text-rust">
                <span className="block h-[22px] w-[22px]">{promise.icon}</span>
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug">
                {promise.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fog">{promise.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
