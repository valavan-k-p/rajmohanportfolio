import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PORTALS, PORTAL_IDS, type PortalId } from '@/config/portals';
import { DOCUMENTS } from '@/content/documents';
import { DOCUMENT_TYPE_LABEL, type DocumentType } from '@/lib/content/schema';
import {
  byDateDesc,
  paginate,
  parseFilter,
  parsePage,
  parseQuery,
  publishable,
  yearsIn,
} from '@/lib/content/query';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FilterBar, SelectFilter } from '@/components/ui/FilterBar';
import { Pagination } from '@/components/ui/Pagination';
import { AwaitingSource, EmptyState } from '@/components/ui/States';
import { DocumentTable } from '@/components/content/DocumentTable';

const PAGE_SIZE = 25;

const DOCUMENT_TYPES: readonly DocumentType[] = [
  'government-order',
  'proceeding',
  'press-release',
  'press-note',
  'announcement',
  'budget',
  'publication',
  'policy-note',
];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = ui(locale);
  return {
    title: t.documents.title,
    description: t.documents.standfirst,
    alternates: {
      canonical: href(locale, '/documents'),
      languages: { en: href('en', '/documents'), ta: href('ta', '/documents') },
    },
  };
}

/**
 * THE DOCUMENT CENTRE
 *
 * Every official paper the office holds, across all four portals, in one
 * searchable archive. Department is a link rail; type and year are a native
 * GET form, so the whole page works with JavaScript disabled and each
 * combination has its own URL.
 */
export default async function DocumentsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const typed = locale as Locale;
  const t = ui(typed);
  const query = await searchParams;

  const department = parseFilter<PortalId>(query.department, PORTAL_IDS);
  const type = parseFilter<DocumentType>(query.type, DOCUMENT_TYPES);
  const search = parseQuery(query.q);

  const all = byDateDesc(publishable(DOCUMENTS));
  const years = yearsIn(all);
  const year = parseFilter(query.year, years);

  const filtered = all.filter((doc) => {
    if (department && doc.department !== department) return false;
    if (type && doc.documentType !== type) return false;
    if (year && !doc.date.startsWith(year)) return false;
    if (search) {
      const haystack = [
        doc.title.en,
        doc.title.ta,
        doc.summary.en,
        doc.summary.ta,
        doc.documentNumber ?? '',
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  const page = paginate(filtered, parsePage(query.page), PAGE_SIZE);
  const basePath = href(typed, '/documents');
  const carried = { department, type, year, q: search || undefined };

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[{ label: t.common.home, href: href(typed) }, { label: t.documents.title }]}
        />
      </Container>

      <Container width="page" as="header" className="pb-xl">
        <h1 className="text-h1">{t.documents.title}</h1>
        <p className="mt-md max-w-text text-lead text-ink-muted">{t.documents.standfirst}</p>
      </Container>

      <Container width="page" className="pb-3xl">
        <FilterBar
          label={t.common.department}
          param="department"
          basePath={basePath}
          active={department}
          preserve={{ type, year, q: search || undefined }}
          className="mb-lg"
          options={[
            { value: undefined, label: t.common.all },
            ...PORTALS.map((portal) => ({ value: portal.id, label: portal.title[typed] })),
          ]}
        />

        <form
          method="get"
          action={basePath}
          className="mb-xl flex w-full flex-wrap items-end gap-lg border-b border-border pb-lg"
        >
          {department ? <input type="hidden" name="department" value={department} /> : null}

          <div className="flex min-w-0 flex-1 basis-56 flex-col gap-1">
            <label htmlFor="documents-q" className="u-label">
              {t.common.search}
            </label>
            <input
              id="documents-q"
              type="search"
              name="q"
              defaultValue={search}
              placeholder={t.search.placeholder}
              className="rounded-sm border border-border-strong bg-surface px-sm py-2 text-small"
            />
          </div>

          <SelectFilter
            name="type"
            label={t.documents.typeFilter}
            active={type}
            locale={typed}
            options={[
              { value: undefined, label: t.common.all },
              ...DOCUMENT_TYPES.map((value) => ({
                value,
                label: DOCUMENT_TYPE_LABEL[value][typed],
              })),
            ]}
          />

          {years.length > 1 ? (
            <SelectFilter
              name="year"
              label={t.common.year}
              active={year}
              locale={typed}
              options={[
                { value: undefined, label: t.common.all },
                ...years.map((value) => ({ value, label: value })),
              ]}
            />
          ) : null}
        </form>

        {all.length === 0 ? (
          <AwaitingSource locale={typed} />
        ) : page.total === 0 ? (
          <EmptyState title={t.search.noResults} description={t.search.noResultsHint} />
        ) : (
          <DocumentTable
            documents={page.items}
            locale={typed}
            caption={t.documents.caption}
          />
        )}

        <Pagination
          page={page.page}
          pageCount={page.pageCount}
          total={page.total}
          basePath={basePath}
          params={carried}
          locale={typed}
          className="mt-xl"
        />
      </Container>
    </>
  );
}
