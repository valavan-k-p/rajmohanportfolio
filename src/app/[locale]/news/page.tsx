import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PORTALS, PORTAL_IDS, type PortalId } from '@/config/portals';
import { NEWS } from '@/content/news';
import { byDateDesc, paginate, parseFilter, parsePage, publishable } from '@/lib/content/query';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FilterBar } from '@/components/ui/FilterBar';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/States';
import { NewsList } from '@/components/content/NewsList';

const PAGE_SIZE = 12;

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
    title: t.news.title,
    description: t.news.standfirst,
    alternates: {
      canonical: href(locale, '/news'),
      languages: { en: href('en', '/news'), ta: href('ta', '/news') },
    },
  };
}

/**
 * THE UNIFIED FEED
 *
 * One list across all four portals, filtered by link rather than by client
 * state — so /en/news?department=school-education is a real, shareable,
 * indexable URL and the page ships no JavaScript of its own.
 */
export default async function NewsIndexPage({
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
  const all = byDateDesc(publishable(NEWS));
  const filtered = department ? all.filter((item) => item.department === department) : all;
  const page = paginate(filtered, parsePage(query.page), PAGE_SIZE);

  const basePath = href(typed, '/news');

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[{ label: t.common.home, href: href(typed) }, { label: t.news.title }]}
        />
      </Container>

      <Container width="page" as="header" className="pb-xl">
        <h1 className="text-h1">{t.news.title}</h1>
        <p className="mt-md max-w-text text-lead text-ink-muted">{t.news.standfirst}</p>
      </Container>

      <Container width="page" className="pb-3xl">
        <FilterBar
          label={t.news.filterLabel}
          param="department"
          basePath={basePath}
          active={department}
          className="mb-xl"
          options={[
            { value: undefined, label: t.common.all },
            ...PORTALS.map((portal) => ({
              value: portal.id,
              label: portal.title[typed],
            })),
          ]}
        />

        {page.total === 0 ? (
          <EmptyState title={t.news.empty} />
        ) : (
          <NewsList items={page.items} locale={typed} />
        )}

        <Pagination
          page={page.page}
          pageCount={page.pageCount}
          total={page.total}
          basePath={basePath}
          params={{ department }}
          locale={typed}
          className="mt-xl"
        />
      </Container>
    </>
  );
}
