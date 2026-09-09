import { cn } from '@/lib/cn';
import { verifiedSocialLinks } from '@/config/site';
import type { SocialPlatform } from '@/lib/content/source';
import type { Locale } from '@/lib/i18n/routing';

const PLATFORM_NAME: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  x: 'X',
  youtube: 'YouTube',
  website: 'Website',
};

/**
 * OFFICIAL CHANNELS
 *
 * Renders only accounts marked `verified: true` in `config/site.ts`. An account
 * this office has not opened and confirmed does not appear at all — it is not
 * shown greyed out, and it is not shown with a caveat. Publishing an
 * unconfirmed handle as "official" is the failure mode this component exists
 * to prevent.
 *
 * These are DEPARTMENT accounts, not the minister's. The heading says so, and
 * each row names the department it belongs to.
 */
export function SocialLinks({
  locale,
  department,
  className,
}: {
  locale: Locale;
  /** Limit to one department. Omit for every verified account. */
  department?: string;
  className?: string;
}) {
  const links = verifiedSocialLinks(department);
  if (links.length === 0) return null;

  return (
    <ul className={cn('grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3', className)}>
      {links.map((link) => (
        <li key={link.id} className="bg-paper">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer external"
            className="flex h-full items-center justify-between gap-md px-lg py-md no-underline transition-colors duration-fast ease-standard hover:bg-surface-sunken"
          >
            <span className="min-w-0">
              <span className="block text-small text-ink">{link.label[locale]}</span>
              <span className="u-meta mt-0.5 block truncate">
                {PLATFORM_NAME[link.platform]}
                {link.platform === 'website' ? '' : ` · @${link.handle}`}
              </span>
            </span>
            <ExternalIcon />
            <span className="u-sr-only">
              {locale === 'ta' ? '(புதிய தாவலில் திறக்கும்)' : '(opens in a new tab)'}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      aria-hidden="true"
      className="shrink-0 text-ink-faint"
    >
      <path d="M4 1h6v6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 1 4.5 6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7.5V10H1V3h2.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
