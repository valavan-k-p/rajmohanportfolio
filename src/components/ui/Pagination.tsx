import Link from 'next/link';
import { cn } from '@/lib/cn';
import { withParams } from '@/lib/i18n/href';
import type { Locale } from '@/lib/i18n/routing';

/**
 * Previous / next plus a compact window of numbers.
 *
 * Links, so pagination is crawlable and survives JavaScript being off. The
 * ellipsis is `aria-hidden`; the count sentence below carries the real position
 * for a screen reader, because "…" announces as nothing useful.
 */
export function Pagination({
  page,
  pageCount,
  total,
  basePath,
  params,
  locale,
  className,
}: {
  page: number;
  pageCount: number;
  total: number;
  basePath: string;
  params?: Record<string, string | undefined>;
  locale: Locale;
  className?: string;
}) {
  if (pageCount <= 1) return null;

  const windowed = pageWindow(page, pageCount);
  const to = (n: number) => withParams(basePath, { ...params, page: n === 1 ? undefined : String(n) });

  return (
    <nav
      aria-label={locale === 'ta' ? 'பக்கம் தேர்வு' : 'Pagination'}
      className={cn('flex flex-col items-center gap-md border-t border-border pt-lg', className)}
    >
      <ul className="flex items-center gap-1">
        <li>
          {page > 1 ? (
            <Link href={to(page - 1)} rel="prev" className={navItem}>
              {locale === 'ta' ? 'முந்தையது' : 'Previous'}
            </Link>
          ) : (
            <span className={cn(navItem, 'cursor-default text-ink-faint/50')} aria-hidden="true">
              {locale === 'ta' ? 'முந்தையது' : 'Previous'}
            </span>
          )}
        </li>

        {windowed.map((entry, index) =>
          entry === null ? (
            <li key={`gap-${index}`} aria-hidden="true" className="px-1 text-ink-faint">
              …
            </li>
          ) : (
            <li key={entry}>
              <Link
                href={to(entry)}
                aria-current={entry === page ? 'page' : undefined}
                className={cn(
                  navItem,
                  'tabular-nums',
                  entry === page && 'border-ink bg-ink text-ink-inverse',
                )}
              >
                {entry}
              </Link>
            </li>
          ),
        )}

        <li>
          {page < pageCount ? (
            <Link href={to(page + 1)} rel="next" className={navItem}>
              {locale === 'ta' ? 'அடுத்தது' : 'Next'}
            </Link>
          ) : (
            <span className={cn(navItem, 'cursor-default text-ink-faint/50')} aria-hidden="true">
              {locale === 'ta' ? 'அடுத்தது' : 'Next'}
            </span>
          )}
        </li>
      </ul>

      <p className="u-meta" aria-live="polite">
        {locale === 'ta'
          ? `${total} பதிவுகளில் ${page} / ${pageCount} பக்கம்`
          : `Page ${page} of ${pageCount} · ${total} records`}
      </p>
    </nav>
  );
}

const navItem =
  'u-tap-box inline-flex min-w-11 items-center justify-center rounded-sm border border-border px-sm ' +
  'text-caption text-ink no-underline transition-colors duration-fast ease-standard ' +
  'hover:border-ink';

/** 1 … 4 5 6 … 20 — always shows first, last, current and its neighbours. */
function pageWindow(page: number, pageCount: number): (number | null)[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);

  const pages = new Set([1, pageCount, page, page - 1, page + 1]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);

  const result: (number | null)[] = [];
  let previous = 0;
  for (const n of sorted) {
    if (previous && n - previous > 1) result.push(null);
    result.push(n);
    previous = n;
  }
  return result;
}
