import Link from 'next/link';
import { PORTALS } from '@/config/portals';
import { IDENTITY, PRIMARY_NAV } from '@/config/site';
import { href } from '@/lib/i18n/href';
import type { Locale } from '@/lib/i18n/routing';
import { Lockup } from './Lockup';
import { LanguageSwitcher } from './LanguageSwitcher';
import { HeaderNav, type NavLink, type PortalLink } from './HeaderNav';

/**
 * The site header.
 *
 * One row. The lockup on the left is the home link; the nav, search and
 * language sit on the right. The four portals live behind a disclosure rather
 * than in the row itself — see HeaderNav for why.
 *
 * `sticky` and not `fixed`: a fixed header would need a spacer element and
 * would cover anchored headings. `scroll-padding-top` in globals.css handles
 * the sticky case instead.
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const links: NavLink[] = PRIMARY_NAV.filter((item) => item.href !== '').map((item) => ({
    href: href(locale, item.href),
    label: item.label[locale],
  }));

  const portals: PortalLink[] = PORTALS.map((portal) => ({
    href: href(locale, `/${portal.slug}`),
    title: portal.title[locale],
    facets: portal.facets.map((facet) => facet[locale]).join(' · '),
    accent: portal.accentVar,
  }));

  const strings = {
    menu: locale === 'ta' ? 'பட்டி' : 'Menu',
    home: locale === 'ta' ? 'முகப்பு' : 'Home',
    close: locale === 'ta' ? 'மூடு' : 'Close',
    portals: locale === 'ta' ? 'துறைகள்' : 'Portals',
    primaryNav: locale === 'ta' ? 'முதன்மை வழிசெலுத்தல்' : 'Primary navigation',
    search: locale === 'ta' ? 'தேடு' : 'Search',
    portalsHint:
      locale === 'ta' ? 'நான்கு பொதுத் தகவல் துறைகள்' : 'Four public information portals',
  };

  return (
    <header className="relative z-30 border-b border-border bg-paper">
      <a
        href="#main"
        className="u-sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-gutter focus-visible:top-2 focus-visible:z-50 focus-visible:rounded-sm focus-visible:border focus-visible:border-ink focus-visible:bg-paper focus-visible:px-md focus-visible:py-2 focus-visible:text-small"
      >
        {locale === 'ta' ? 'முதன்மை உள்ளடக்கத்திற்குச் செல்' : 'Skip to main content'}
      </a>

      <div className="mx-auto flex w-full max-w-page items-center justify-between gap-sm px-gutter py-md sm:gap-lg">
        {/* The lockup is the home link. Its accessible name is the person's
            name plus "Home", because "Rajmohan Arumugam" alone does not tell a
            screen-reader user where the link goes. */}
        <Link
          href={href(locale)}
          className="no-underline"
          aria-label={`${IDENTITY.name[locale]} — ${strings.home}`}
        >
          {/* The designation is dropped below `sm` — at that width it wraps to
              three lines and pushes the menu button off the row. */}
          <span className="hidden sm:block">
            <Lockup locale={locale} size="md" showDesignation={false} />
          </span>
          <span className="sm:hidden">
            <Lockup locale={locale} size="sm" showDesignation={false} />
          </span>
        </Link>

        <div className="flex items-center gap-xs sm:gap-sm">
          <HeaderNav locale={locale} links={links} portals={portals} strings={strings} />

          <Link
            href={href(locale, '/search')}
            aria-label={strings.search}
            className="u-tap-box inline-flex items-center justify-center gap-2 rounded-sm border border-border px-sm text-caption text-ink no-underline transition-colors duration-fast ease-standard hover:border-ink"
          >
            {/* Icon only at every width — the desktop nav now appears at
                `xl`, and adding the word back there would re-crowd the row in
                Tamil. `aria-label` names the control. */}
            <SearchIcon />
          </Link>

          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="6" cy="6" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9.5 9.5 13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
