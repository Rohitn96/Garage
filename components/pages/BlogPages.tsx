import Link from "@/components/Link";
import type { Lang } from "@/site.config";
import { BLOG_POSTS, pathOf, type BlogPostId } from "@/lib/routes";
import { blogPostingSchema } from "@/lib/schema";
import { BLOG } from "@/content/blog";
import { UI } from "@/content/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CtaPanel } from "@/components/blocks/Cta";
import { Section } from "@/components/blocks/Section";
import { Prose } from "@/components/blocks/Prose";
import { RelatedLinks } from "@/components/blocks/Related";

function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "fi" ? "fi-FI" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`),
  );
}

export function BlogIndexPage({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <>
      <Breadcrumbs id="blog" lang={lang} />
      <section className="glow border-b border-rule">
        <div className="wrap py-10 md:py-14">
          <p className="label">{t.sections.blogTitle}</p>
          <h1 className="h1 mt-6">{t.sections.blogTitle}</h1>
          <p className="lead mt-6 max-w-[56ch]">{t.sections.blogLead}</p>
        </div>
      </section>
      <Section>
        <ul className="grid gap-px overflow-hidden rounded border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => {
            const c = BLOG[lang][post.id];
            return (
              <li key={post.id} className="bg-ground">
                <Link href={pathOf(post.id, lang)} className="group flex h-full flex-col gap-4 p-6 transition-colors duration-2 hover:bg-surface">
                  <span className="flex items-center justify-between font-mono text-step--2 uppercase tracking-label text-muted">
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      {c.readMinutes} {t.minutes}
                    </span>
                  </span>
                  <h2 className="text-step-2 font-bold group-hover:text-accent">{c.title}</h2>
                  <p className="text-step--1 text-muted">{c.dek}</p>
                  <time dateTime={c.published} className="mt-auto font-mono text-step--2 text-muted">
                    {formatDate(c.published, lang)}
                  </time>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}

export function BlogPostPage({ id, lang }: { id: BlogPostId; lang: Lang }) {
  const c = BLOG[lang][id];
  const t = UI[lang];
  return (
    <>
      <Breadcrumbs id={id} lang={lang} />
      <article>
        <header className="glow border-b border-rule">
          <div className="wrap py-10 md:py-14">
            <p className="label">
              {t.published} <time dateTime={c.published}>{formatDate(c.published, lang)}</time> · {c.readMinutes} {t.minutes}
            </p>
            <h1 className="h2 mt-6 max-w-[24ch]">{c.title}</h1>
            <p className="lead mt-6 max-w-[60ch]">{c.dek}</p>
          </div>
        </header>
        <div className="wrap section grid gap-12 lg:grid-cols-12">
          <Prose blocks={c.body} lang={lang} className="lg:col-span-8" />
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <RelatedLinks ids={c.related} lang={lang} />
            </div>
          </aside>
        </div>
      </article>
      <CtaPanel lang={lang} title={lang === "fi" ? "Kysyttävää autostasi?" : "A question about your car?"} body={t.cta.estimateLine} />
      <JsonLd data={blogPostingSchema(id, lang, { title: c.title, description: c.seo.description, published: c.published })} />
    </>
  );
}
