import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { search, type SearchHit } from '@/lib/search';
import { parseQuery } from '@/lib/content/query';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { EmptyState } from '@/components/ui/States';

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
    title: t.search.title,
    description: t.search.standfirst,
    // A search results page has nothing stable to index.
    robots: { index: false, follow: true },
    alternates: { canonical: href(locale, '/search') },
  };
}

/**
 * SEARCH
 *
 * A real index over the real collections — pages, news, documents and
 * photographs — not a decorative input. It runs on the server against the
 * content modules, so it needs no client bundle, no API route and no
 * third-party service, and it searches both languages at once: a reader on the
 * Tamil site who types an English acronym still finds the record.
 */
export default async function SearchPage({
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
  const query = parseQuery((await searchParams).q);
  const results = query ? search(query, typed) : [];

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[{ label: t.common.home, href: href(typed) }, { label: t.search.title }]}
        />
      </Container>

      <Container width="text" as="header" className="pb-xl">
        <h1 className="text-h1">{t.search.title}</h1>
        <p className="mt-md text-lead text-ink-muted">{t.search.standfirst}</p>

        <form method="get" action={href(typed, '/search')} className="mt-xl flex gap-sm" role="search">
          <label htmlFor="q" className="u-sr-only">
            {t.search.placeholder}
          </label>
          <input
            id="q"
            type="search"
            name="q"
            defaultValue={query}
            autoComplete="off"
            placeholder={t.search.placeholder}
            className="min-w-0 flex-1 rounded-sm border border-border-strong bg-surface px-md py-2.5 text-body"
          />
          <button
            type="submit"
            className="rounded-sm border border-ink bg-ink px-lg py-2.5 text-small font-medium text-ink-inverse transition-colors duration-fast hover:border-accent-hover hover:bg-accent-hover"
          >
            {t.search.submit}
          </button>
        </form>
      </Container>

      <Container width="text" className="pb-3xl">
        {!query ? (
          <p className="u-meta">{t.search.prompt}</p>
        ) : results.length === 0 ? (
          <EmptyState title={t.search.noResults} description={t.search.noResultsHint} />
        ) : (
          <>
            <p className="u-label mb-lg" aria-live="polite">
              {t.search.resultsFor} “{query}” — {results.length}
            </p>
            <ul className="divide-y divide-border border-y border-border">
              {results.map((hit) => (
                <li key={`${hit.kind}-${hit.id}`}>
                  <Result hit={hit} />
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </>
  );
}

function Result({ hit }: { hit: SearchHit }) {
  return (
    <article className="group relative py-lg">
      <p className="u-label">{hit.kindLabel}</p>
      <h2 className="mt-xs text-h3">
        <Link
          href={hit.url}
          className="u-stretch no-underline transition-colors duration-fast group-hover:text-accent"
        >
          {hit.title}
        </Link>
      </h2>
      {hit.summary ? (
        <p className="mt-xs text-small text-ink-muted">{hit.summary}</p>
      ) : null}
    </article>
  );
}
