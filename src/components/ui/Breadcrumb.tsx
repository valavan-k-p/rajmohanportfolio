import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { Locale } from '@/lib/i18n/routing';

export interface Crumb {
  readonly label: string;
  /** Absent on the final crumb — the current page is not a link to itself. */
  readonly href?: string;
}

export function Breadcrumb({
  crumbs,
  locale,
  className,
}: {
  crumbs: readonly Crumb[];
  locale: Locale;
  className?: string;
}) {
  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label={locale === 'ta' ? 'தட நெறி' : 'Breadcrumb'}
      className={cn('u-scroll-x', className)}
    >
      <ol className="flex items-center gap-2 whitespace-nowrap py-md text-caption text-ink-faint">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="u-tap underline decoration-border underline-offset-4 hover:text-ink hover:decoration-current"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-ink-muted' : undefined} aria-current={isLast ? 'page' : undefined}>
                  {crumb.label}
                </span>
              )}
              {!isLast ? (
                <span aria-hidden="true" className="text-border-strong">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
