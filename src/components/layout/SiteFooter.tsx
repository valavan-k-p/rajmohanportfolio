import Link from 'next/link';
import { PORTALS } from '@/config/portals';
import { IDENTITY, OFFICIAL_LINKS, PRIMARY_NAV, UTILITY_NAV } from '@/config/site';
import { href } from '@/lib/i18n/href';
import type { Locale } from '@/lib/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * The footer carries the two things the brief treats as non-negotiable:
 * the utility links (including the Disclaimer the client asked for in
 * handwritten note 1.4), and the statement of what this site is and is not.
 *
 * That statement is not fine print. It is the last thing on every page,
 * at readable size, because the whole credibility argument of the site
 * depends on a reader never mistaking it for tn.gov.in.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const columns = [
    {
      heading: locale === 'ta' ? 'துறைகள்' : 'Portals',
      links: PORTALS.map((portal) => ({
        href: href(locale, `/${portal.slug}`),
        label: portal.title[locale],
      })),
    },
    {
      heading: locale === 'ta' ? 'தளம்' : 'This site',
      links: PRIMARY_NAV.filter((item) => item.href !== '' && item.href !== '/portals').map(
        (item) => ({ href: href(locale, item.href), label: item.label[locale] }),
      ),
    },
  ];

  return (
    <footer className="mt-section border-t border-border bg-surface-sunken">
      <div className="mx-auto w-full max-w-page px-gutter py-2xl">
        <div className="grid gap-xl lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Identity */}
          <div>
            <p className="font-display text-h3 font-semibold leading-tight">
              {IDENTITY.name[locale]}
            </p>
            <p className="mt-xs font-display text-small leading-snug text-ink-muted">
              {IDENTITY.designation[locale]}
            </p>
            <p className="u-meta mt-xs">{IDENTITY.constituency[locale]}</p>

            <div className="mt-lg">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="u-label mb-md">{column.heading}</h2>
              <ul className="u-tap-list space-y-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-small text-ink-muted no-underline transition-colors duration-fast hover:text-accent hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Official departmental sites — clearly marked as leaving this site */}
          <nav aria-label={locale === 'ta' ? 'அரசு இணையதளங்கள்' : 'Government websites'}>
            <h2 className="u-label mb-md">
              {locale === 'ta' ? 'அரசு இணையதளங்கள்' : 'Government websites'}
            </h2>
            <ul className="u-tap-list space-y-1">
              {OFFICIAL_LINKS.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="text-small text-ink-muted no-underline transition-colors duration-fast hover:text-accent hover:underline"
                  >
                    {link.label[locale]}
                    <span className="u-sr-only">
                      {locale === 'ta' ? ' (புதிய தாவலில் திறக்கும்)' : ' (opens in a new tab)'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ------------------------------------------------------------- *
         * THE STATEMENT. See the component doc comment.
         * ------------------------------------------------------------- */}
        <div className="mt-2xl border-t border-border-strong pt-lg">
          <h2 className="u-label mb-sm">{locale === 'ta' ? 'விவர மறுப்பு' : 'Disclaimer'}</h2>
          <p className="max-w-text text-small leading-relaxed text-ink-muted">
            {locale === 'ta'
              ? 'இது அமைச்சர் ராஜ்மோகன் ஆறுமுகம் அவர்களின் அலுவலகத்தால் பராமரிக்கப்படும் பொதுத் தகவல் இணையதளம். இது தமிழ்நாடு அரசின் அலுவல்முறை இணையதளம் அல்ல. அரசு ஆணைகள், செயல்முறை ஆணைகள் மற்றும் துறைத் தகவல்களுக்கு, மேலே இணைக்கப்பட்டுள்ள அலுவல்முறைத் துறை இணையதளங்களே இறுதி ஆதாரம்.'
              : 'This is a public information site maintained by the office of Rajmohan Arumugam. It is not an official Government of Tamil Nadu website. For government orders, proceedings and departmental information, the official departmental sites linked above are the authoritative source.'}
          </p>
        </div>

        <div className="mt-lg flex flex-col gap-md border-t border-border pt-lg sm:flex-row sm:items-center sm:justify-between">
          <ul className="u-tap-list flex flex-wrap gap-x-lg gap-y-0">
            {UTILITY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={href(locale, item.href)}
                  className="text-caption text-ink-faint no-underline transition-colors duration-fast hover:text-ink hover:underline"
                >
                  {item.label[locale]}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={href(locale, '/services')}
                className="text-caption text-ink-faint no-underline transition-colors duration-fast hover:text-ink hover:underline"
              >
                {locale === 'ta' ? 'தொடர்பு' : 'Contact'}
              </Link>
            </li>
          </ul>

          <p className="u-meta">
            © {new Date().getUTCFullYear()} {IDENTITY.name[locale]}
          </p>
        </div>
      </div>
    </footer>
  );
}
