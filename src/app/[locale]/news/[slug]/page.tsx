import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getPortal } from '@/config/portals';
import { NEWS } from '@/content/news';
import type { ProseBlock } from '@/lib/content/schema';
import { byDateDesc, publishable } from '@/lib/content/query';
import { formatDate } from '@/lib/i18n/bilingual';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { Section, SectionHeader } from '@/components/ui/Section';
import { NewsList } from '@/components/content/NewsList';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    publishable(NEWS).map((item) => ({ locale, slug: item.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = publishable(NEWS).find((n) => n.slug === slug);
  if (!item) return {};

  const path = `/news/${item.slug}`;
  return {
    title: item.title[locale],
    description: item.summary[locale],
    alternates: {
      canonical: href(locale, path),
      languages: { en: href('en', path), ta: href('ta', path) },
    },
    openGraph: {
      type: 'article',
      publishedTime: item.date,
      images: item.image ? [{ url: item.image.src }] : undefined,
    },
  };
}

/**
 * AN ARTICLE
 *
 * A single reading column at the prose measure, and the source in its own
 * metadata block at the end rather than as a badge beside the headline —
 * because on an article the attribution is part of the record, not a label.
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const item = publishable(NEWS).find((n) => n.slug === slug);
  if (!item) notFound();

  setRequestLocale(locale);
  const typed = locale as Locale;
  const t = ui(typed);
  const portal = getPortal(item.department);

  const related = byDateDesc(publishable(NEWS))
    .filter((n) => n.department === item.department && n.id !== item.id)
    .slice(0, 3);

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[
            { label: t.common.home, href: href(typed) },
            { label: t.news.title, href: href(typed, '/news') },
            { label: item.title[typed] },
          ]}
        />
      </Container>

      <article>
        <Container width="text" as="header" className="pb-xl">
          <p className="u-label" style={{ color: portal.accentVar }}>
            {portal.title[typed]}
          </p>

          <h1 className="mt-sm text-h1">{item.title[typed]}</h1>

          <p className="u-meta mt-md">
            <time dateTime={item.date}>{formatDate(item.date, typed)}</time>
          </p>

          <p className="mt-lg text-lead text-ink-muted">{item.summary[typed]}</p>
        </Container>

        {item.image ? (
          <Container width="text" className="pb-xl">
            <figure>
              <div className="relative aspect-3/2 overflow-hidden bg-surface-sunken">
                <Image
                  src={item.image.src}
                  alt={item.image.alt[typed]}
                  fill
                  priority
                  sizes="(min-width: 832px) 52rem, 100vw"
                  placeholder="blur"
                  blurDataURL={item.image.blurDataURL}
                  className="object-cover"
                />
              </div>
              <figcaption className="u-meta mt-sm">{item.image.alt[typed]}</figcaption>
            </figure>
          </Container>
        ) : null}

        {item.body && item.body.length > 0 ? (
          <Container width="prose" className="pb-xl">
            <div className="u-prose">
              {item.body.map((block, index) => (
                <Block key={index} block={block} locale={typed} />
              ))}
            </div>
          </Container>
        ) : null}

        <Container width="prose" className="pb-3xl">
          <SourceBadge source={item.source} locale={typed} variant="block" />
        </Container>
      </article>

      {related.length > 0 ? (
        <Section id="related" width="page">
          <SectionHeader title={t.news.related} level={2} />
          <NewsList items={related} locale={typed} showImages={false} />
        </Section>
      ) : null}
    </>
  );
}

function Block({ block, locale }: { block: ProseBlock; locale: Locale }) {
  switch (block.kind) {
    case 'paragraph':
      return <p>{block.text[locale]}</p>;
    case 'heading':
      return <h2>{block.text[locale]}</h2>;
    case 'list':
      return (
        <ul>
          {block.items.map((entry, index) => (
            <li key={index}>{entry[locale]}</li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote>
          <p>{block.text[locale]}</p>
          <footer className="u-meta mt-sm not-italic">— {block.attribution[locale]}</footer>
        </blockquote>
      );
    case 'image':
      return (
        <figure>
          <div className="relative aspect-3/2 overflow-hidden bg-surface-sunken">
            <Image
              src={block.image.src}
              alt={block.image.alt[locale]}
              fill
              sizes="(min-width: 624px) 39rem, 100vw"
              placeholder="blur"
              blurDataURL={block.image.blurDataURL}
              className="object-cover"
            />
          </div>
          <figcaption className="u-meta mt-sm">{block.image.alt[locale]}</figcaption>
        </figure>
      );
  }
}
