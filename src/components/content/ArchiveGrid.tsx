import Link from 'next/link';
import type { ArchiveLink } from '@/content/portals';
import { href } from '@/lib/i18n/href';
import type { Locale } from '@/lib/i18n/routing';

/**
 * The list of archives a portal exposes.
 *
 * Each row states how many records it holds — including when that number is
 * zero, which here is a true count rather than a missing figure, and so is
 * shown rather than dashed. An archive with nothing in it is still linked: the
 * page it leads to explains why it is empty and names the departmental site
 * that does hold the documents.
 */
export function ArchiveGrid({
  archives,
  counts,
  portalSlug,
  accent,
  locale,
}: {
  archives: readonly ArchiveLink[];
  counts: Readonly<Record<string, number>>;
  portalSlug: string;
  accent: string;
  locale: Locale;
}) {
  const emptyLabel = locale === 'ta' ? 'பதிவுகள் இல்லை' : 'No records yet';
  const recordsLabel = (n: number) =>
    locale === 'ta' ? `${n} பதிவு${n === 1 ? '' : 'கள்'}` : `${n} record${n === 1 ? '' : 's'}`;

  return (
    <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {archives.map((archive) => {
        const count = counts[archive.slug] ?? 0;
        return (
          <li key={archive.slug} className="bg-paper">
            <Link
              href={href(locale, `/${portalSlug}/${archive.slug}`)}
              className="group flex h-full flex-col border-t-2 border-transparent px-lg py-lg no-underline transition-colors duration-fast ease-standard hover:bg-surface-sunken"
              style={{ borderTopColor: accent }}
            >
              <span className="font-display text-h3 text-ink group-hover:text-accent">
                {archive.title[locale]}
              </span>
              <span className="u-meta mt-xs flex-1">{archive.description[locale]}</span>
              <span className="u-label mt-md">
                {count === 0 ? emptyLabel : recordsLabel(count)}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
