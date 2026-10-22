import { SITE, type Lang } from "@/site.config";
import { SectionHeading } from "./Section";

/**
 * Slots for content only the shop can supply. Each one returns null until
 * site.config.ts holds real data, so the site never shows a placeholder
 * review, an empty team grid or a sample that does not exist.
 */

export function Reviews({ lang }: { lang: Lang }) {
  const reviews = SITE.reviews;
  if (!reviews.length) return null;
  return (
    <section className="border-b border-rule">
      <div className="wrap section">
        <SectionHeading label={lang === "fi" ? "Asiakkaat" : "Customers"} title={lang === "fi" ? "Mitä asiakkaat sanovat" : "What customers say"} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={`${review.author}-${review.date}`} className="card p-6">
              <p className="font-mono text-step--1 text-accent" aria-label={`${review.rating} / 5`}>
                {"★".repeat(review.rating)}
                <span className="text-faint">{"★".repeat(5 - review.rating)}</span>
              </p>
              <blockquote className="mt-4 text-step-0">{review.text}</blockquote>
              <p className="mt-4 text-step--1 text-muted">
                {review.author} · {review.source}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Certificates({ lang }: { lang: Lang }) {
  const certs = SITE.certificates;
  if (!certs.length) return null;
  return (
    <div>
      <p className="label">{lang === "fi" ? "Pätevyydet" : "Certificates"}</p>
      <ul className="mt-4 grid gap-3">
        {certs.map((cert) => (
          <li key={cert.name.en} className="flex flex-wrap items-baseline justify-between gap-2 border-t border-rule pt-3">
            <span className="font-medium">{cert.name[lang]}</span>
            <span className="font-mono text-step--2 text-muted">
              {cert.issuer}
              {cert.holder ? ` · ${cert.holder}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Team({ lang }: { lang: Lang }) {
  const team = SITE.team;
  if (!team.length) return null;
  return (
    <section className="border-b border-rule">
      <div className="wrap section">
        <SectionHeading label={lang === "fi" ? "Tiimi" : "Team"} title={lang === "fi" ? "Ketkä autoasi korjaavat" : "Who works on your car"} />
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <li key={member.name}>
              {member.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.photo} alt={member.name} width={600} height={750} loading="lazy" className="aspect-[4/5] w-full rounded object-cover" />
              ) : null}
              <h3 className="mt-4 text-step-1 font-bold">{member.name}</h3>
              <p className="text-step--1 text-muted">{member.role[lang]}</p>
              {member.bio ? <p className="mt-2 text-step--1">{member.bio[lang]}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function GaragePhotos({ lang }: { lang: Lang }) {
  const photos = SITE.garagePhotos;
  if (!photos.length) return null;
  return (
    <section className="border-b border-rule">
      <div className="wrap section">
        <SectionHeading label={lang === "fi" ? "Korjaamo" : "Workshop"} title={lang === "fi" ? "Halli 3, Tattarisuo" : "Hall 3, Tattarisuo"} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <li key={photo.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt[lang]} width={photo.width} height={photo.height} loading="lazy" decoding="async" className="h-auto w-full rounded" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BatteryReportSample({ lang }: { lang: Lang }) {
  const sample = SITE.batteryReportSample;
  if (!sample) return null;
  return (
    <figure className="card overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sample.preview.src}
        alt={sample.preview.alt[lang]}
        width={sample.preview.width}
        height={sample.preview.height}
        loading="lazy"
        className="h-auto w-full"
      />
      <figcaption className="flex flex-wrap items-center justify-between gap-3 p-4 text-step--1">
        <span className="text-muted">{lang === "fi" ? "Esimerkkiraportti, tunnistetiedot poistettu" : "Sample report, identifying details removed"}</span>
        <a href={sample.href} className="link">
          {lang === "fi" ? "Avaa esimerkki" : "Open the sample"}
        </a>
      </figcaption>
    </figure>
  );
}
