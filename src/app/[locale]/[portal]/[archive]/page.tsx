import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PORTALS, getPortalBySlug } from '@/config/portals';
import { PORTAL_PAGES } from '@/content/portals';
import { NEWS } from '@/content/news';
import { DOCUMENTS } from '@/content/documents';
import { byDateDesc, paginate, parsePage, publishable } from '@/lib/content/query';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Pagination } from '@/components/ui/Pagination';
import { AwaitingSource } from '@/components/ui/States';
import { NewsList } from '@/components/content/NewsList';
import { DocumentTable } from '@/components/content/DocumentTable';

const PAGE_SIZE = 20;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    PORTALS.flatMap((portal) =>
      PORTAL_PAGES[portal.id].archives.map((archive) => ({
        locale,
        portal: portal.slug,
        archive: archive.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; portal: string; archive: string }>;
}): Promise<Metadata> {
  const { locale, portal: portalSlug, archive: archiveSlug } = await params;
  const portal = getPortalBySlug(portalSlug);
  const archive = portal
    ? PORTAL_PAGES[portal.id].archives.find((a) => a.slug === archiveSlug)
    : undefined;
  if (!portal || !archive) return {};

  const path = `/${portal.slug}/${archive.slug}`;
  return {
    title: `${archive.title[locale]} · ${portal.title[locale]}`,
    description: archive.description[locale],
    alternates: {
      canonical: href(locale, path),
      languages: { en: href('en', path), ta: href('ta', path) },
    },
  };
}

/**
 * A PORTAL ARCHIVE
 *
 * One route serves every archive on every portal: news lists, government
 * orders, proceedings, press releases, press notes, budget papers,
 * announcements. Which records it draws is decided by the archive's
 * `documentTypes` in `content/portals.ts`, so adding an archive to a portal is
 * a data change, not a new page.
 *
 * When an archive holds nothing, this renders the honest empty state naming the
 * departmental site — never a "coming soon" and never a fabricated row.
 */
export default async function ArchivePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; portal: string; archive: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, portal: portalSlug, archive: archiveSlug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const portal = getPortalBySlug(portalSlug);
  if (!portal) notFound();

  const archive = PORTAL_PAGES[portal.id].archives.find((a) => a.slug === archiveSlug);
  if (!archive) notFound();

  setRequestLocale(locale);
  const typed = locale as Locale;
  const t = ui(typed);

  const query = await searchParams;
  const basePath = href(typed, `/${portal.slug}/${archive.slug}`);

  const isNews = archive.documentTypes.length === 0 && archive.slug === 'news';

  const news = isNews
    ? byDateDesc(publishable(NEWS)).filter((item) => item.department === portal.id)
    : [];

  const documents =
    archive.documentTypes.length > 0
      ? byDateDesc(publishable(DOCUMENTS)).filter(
          (doc) =>
            doc.department === portal.id && archive.documentTypes.includes(doc.documentType),
        )
      : [];

  // Paginated separately rather than over a union: the two lists render with
  // different components, and a union here would need a cast at every use.
  const pageNumber = parsePage(query.page);
  const newsPage = paginate(news, pageNumber, PAGE_SIZE);
  const docsPage = paginate(documents, pageNumber, PAGE_SIZE);
  const page = isNews ? newsPage : docsPage;

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[
            { label: t.common.home, href: href(typed) },
            { label: portal.title[typed], href: href(typed, `/${portal.slug}`) },
            { label: archive.title[typed] },
          ]}
        />
      </Container>

      {/* The accent rule identifies which of the four portals this archive
          belongs to, at a depth where the cover photograph is off screen. */}
      <Container width="page" as="header" className="pb-xl">
        <div className="border-t-2 pt-lg" style={{ borderTopColor: portal.accentVar }}>
          <p className="u-label" style={{ color: portal.accentVar }}>
            {portal.title[typed]}
          </p>
          <h1 className="mt-sm text-h1">{archive.title[typed]}</h1>
          <p className="mt-md max-w-text text-lead text-ink-muted">
            {archive.description[typed]}
          </p>
        </div>
      </Container>

      <Container width="page" className="pb-3xl">
        {page.total === 0 ? (
          <AwaitingSource
            locale={typed}
            officialSite={
              portal.officialSite
                ? { label: new URL(portal.officialSite).hostname, url: portal.officialSite }
                : undefined
            }
          />
        ) : isNews ? (
          <NewsList items={newsPage.items} locale={typed} />
        ) : (
          <DocumentTable
            documents={docsPage.items}
            locale={typed}
            caption={`${archive.title[typed]} — ${t.documents.caption}`}
          />
        )}

        <Pagination
          page={page.page}
          pageCount={page.pageCount}
          total={page.total}
          basePath={basePath}
          locale={typed}
          className="mt-xl"
        />
      </Container>
    </>
  );
}
