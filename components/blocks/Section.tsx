import type { ReactNode } from "react";

/** The eyebrow above a heading: a short accent rule and quiet capitals. */
export function SystemLabel({ children }: { children: ReactNode }) {
  return (
    <p className="label flex items-center gap-3">
      <span aria-hidden className="h-px w-6 bg-accent" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  label,
  title,
  lead,
  as: H = "h2",
  className = "",
}: {
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <SystemLabel>{label}</SystemLabel> : null}
      <H className={`${H === "h2" ? "h2" : "h3"} ${label ? "mt-5" : ""} max-w-[22ch]`}>{title}</H>
      {lead ? <p className="lead mt-5 max-w-[60ch]">{lead}</p> : null}
    </div>
  );
}

/**
 * Inner page hero. The H1 is never animated: it is the page's largest
 * contentful paint, and an entrance animation would only delay it.
 */
export function PageHero({
  label,
  title,
  lead,
  children,
  aside,
}: {
  label: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="glow border-b border-rule">
      <div className="wrap grid gap-10 pb-14 pt-10 md:pb-20 md:pt-16 lg:grid-cols-12 lg:items-center">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <SystemLabel>{label}</SystemLabel>
          <h1 className="h1 mt-6 max-w-[18ch]">{title}</h1>
          <p className="lead mt-6 max-w-[58ch]">{lead}</p>
          {children ? <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-5">{aside}</div> : null}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
  id,
  tone = "ground",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "ground" | "surface";
}) {
  return (
    <section id={id} className={`border-b border-rule ${tone === "surface" ? "bg-surface" : ""} ${className}`}>
      <div data-reveal className="wrap section">
        {children}
      </div>
    </section>
  );
}
