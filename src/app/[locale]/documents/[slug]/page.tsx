import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getPortal } from '@/config/portals';
import { DOCUMENTS } from '@/content/documents';
import { DOCUMENT_TYPE_LABEL } from '@/lib/content/schema';
import { byDateDesc, publishable } from '@/lib/content/query';
import { formatDate } from '@/lib/i18n/bilingual';
import { href } from '@/lib/i18n/href';
import { locales, localeMeta, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeader } from '@/components/ui/Section';
import { DocumentTable } from '@/components/content/DocumentTable';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    publishable(DOCUMENTS).map((doc) => ({ locale, slug: doc.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = publishable(DOCUMENTS).find((d) => d.slug === slug);
  if (!doc) return {};

  const path = `/documents/${doc.slug}`;
  return {
    title: doc.title[locale],
    description: doc.summary[locale],
    alternates: {
      canonical: href(locale, path),
      languages: { en: href('en', path), ta: href('ta', path) },
    },
  };
}

/**
 * A DOCUMENT
 *
 * The metadata block is the page. Where the office holds the file, View and
 * Download appear; where it does not, the page says so in a sentence instead of
 * offering a control that leads nowhere. That is the difference between an
 * archive and a facade.
 */
export default async function DocumentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const doc = publishable(DOCUMENTS).find((d) => d.slug === slug);
  if (!doc) notFound();

  setRequestLocale(locale);
  const typed = locale as Locale;
  const t = ui(typed);
  const portal = getPortal(doc.department);

  const related = byDateDesc(publishable(DOCUMENTS))
    .filter((d) => d.department === doc.department && d.id !== doc.id)
    .slice(0, 5);

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[
            { label: t.common.home, href: href(typed) },
            { label: t.documents.title, href: href(typed, '/documents') },
            { label: doc.title[typed] },
          ]}
        />
      </Container>

      <article>
        <Container width="text" as="header" className="pb-lg">
          <p className="u-label" style={{ color: portal.accentVar }}>
            {DOCUMENT_TYPE_LABEL[doc.documentType][typed]}
          </p>
          <h1 className="mt-sm text-h1">{doc.title[typed]}</h1>
          <p className="mt-lg text-lead text-ink-muted">{doc.summary[typed]}</p>
        </Container>

        <Container width="text" className="pb-xl">
          <dl className="grid gap-px border-y border-border bg-border sm:grid-cols-2">
            <Field label={t.common.date}>
              <time dateTime={doc.date}>{formatDate(doc.date, typed)}</time>
            </Field>
            <Field label={t.common.department}>{portal.title[typed]}</Field>
            {doc.documentNumber ? (
              <Field label={t.documents.documentNumber}>{doc.documentNumber}</Field>
            ) : null}
            <Field label={t.documents.languages}>
              {doc.languages.map((code) => localeMeta[code].nativeName).join(' · ')}
            </Field>
            {doc.pageCount ? (
              <Field label={typed === 'ta' ? 'பக்கங்கள்' : 'Pages'}>{doc.pageCount}</Field>
            ) : null}
          </dl>

          {doc.documentUrl ? (
            <div className="mt-lg flex flex-wrap gap-md" data-print="hide">
              <ButtonLink href={doc.documentUrl} external>
                {t.documents.view}
              </ButtonLink>
              <ButtonLink href={doc.documentUrl} external variant="secondary" download>
                {t.documents.download}
              </ButtonLink>
            </div>
          ) : (
            <p className="mt-lg border-l-2 border-border-strong pl-md text-small text-ink-muted">
              {t.documents.noFile}
            </p>
          )}

          <SourceBadge source={doc.source} locale={typed} variant="block" className="mt-xl" />
        </Container>
      </article>

      {related.length > 0 ? (
        <Section id="related" width="page">
          <SectionHeader
            title={typed === 'ta' ? 'தொடர்புடைய ஆவணங்கள்' : 'Related documents'}
          />
          <DocumentTable documents={related} locale={typed} caption={t.documents.caption} />
        </Section>
      ) : null}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-paper px-lg py-md">
      <dt className="u-label">{label}</dt>
      <dd className="mt-1 text-small text-ink">{children}</dd>
    </div>
  );
}
