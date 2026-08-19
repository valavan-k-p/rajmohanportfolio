'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { localeMeta, locales, type Locale } from '@/lib/i18n/routing';

/**
 * A real switcher, not a decorative one (spec §23 forbids a fake one).
 *
 * It rewrites the CURRENT path's locale segment, so the reader stays on the
 * page they were reading instead of being dropped at a language home page.
 * Each option carries `hrefLang` and its own `lang`, so the native name renders
 * in its own script and assistive tech announces the switch correctly.
 */
export function LocaleSwitcher({ locale }: { readonly locale: Locale }) {
  const pathname = usePathname();

  const pathFor = (target: Locale) => {
    const segments = pathname.split('/');
    // segments[0] is '' (leading slash); segments[1] is the locale.
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = target;
      return segments.join('/');
    }
    return `/${target}`;
  };

  return (
    <div>
      <h2 className="u-eyebrow mb-3 text-yellow-400">
        {locale === 'ta' ? 'மொழி' : 'Language'}
      </h2>
      <ul className="flex gap-4">
        {locales.map((option) => {
          const isCurrent = option === locale;
          return (
            <li key={option}>
              <Link
                href={pathFor(option)}
                lang={option}
                hrefLang={option}
                aria-current={isCurrent ? 'true' : undefined}
                className={[
                  'inline-flex min-h-[44px] items-center text-meta no-underline',
                  'transition-opacity duration-[160ms]',
                  isCurrent
                    ? 'text-white underline underline-offset-4'
                    : 'text-white/60 hover:text-white',
                ].join(' ')}
              >
                {localeMeta[option].nativeName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
