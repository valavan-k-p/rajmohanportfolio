import Link from 'next/link';
import { PORTALS } from '@/config/portals';
import { PORTAL_CONTENT } from '@/data/portals';
import { LocaleSwitcher } from './LocaleSwitcher';
import type { Locale } from '@/lib/i18n/routing';

/** Shared across all four portals. */
export function SiteFooter({ locale }: { readonly locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 px-gutter py-section text-white">
      <div className="mx-auto max-w-[76rem]">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
          <nav aria-label={locale === 'ta' ? 'வாயில்கள்' : 'Portals'}>
            <h2 className="u-eyebrow mb-6 text-yellow-400">
              {locale === 'ta' ? 'வாயில்கள்' : 'Portals'}
            </h2>
            <ul className="flex flex-col gap-3">
              {PORTALS.map((portal) => (
                <li key={portal.id}>
                  <Link
                    href={`/${locale}/${portal.slug}`}
                    className="font-display text-h3 text-white no-underline transition-opacity duration-[160ms] hover:opacity-70"
                  >
                    {PORTAL_CONTENT[portal.id].title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-6">
            <LocaleSwitcher locale={locale} />
            <Link
              href="/"
              className="text-meta text-white/70 no-underline transition-opacity duration-[160ms] hover:opacity-100"
            >
              {locale === 'ta' ? '← வாயில்களுக்குத் திரும்பு' : '← Back to portals'}
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-white/20 pt-8">
          <p className="text-meta text-white/60">
            &copy; {year} {locale === 'ta' ? 'ராஜ்மோகன் ஆறுமுகம்' : 'Rajmohan Arumugam'}
          </p>
        </div>
      </div>
    </footer>
  );
}
