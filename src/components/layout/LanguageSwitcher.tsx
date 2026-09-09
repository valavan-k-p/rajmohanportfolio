'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { localeMeta, type Locale } from '@/lib/i18n/routing';
import { otherLocale } from '@/lib/i18n/bilingual';
import { swapLocale } from '@/lib/i18n/href';

/**
 * Switches language WITHOUT losing the reader's place.
 *
 * `/ta/school-education/go?year=2026` becomes `/en/school-education/go?year=2026`.
 * The route tree is identical in both languages, so only the first segment
 * changes and no page ever bounces the reader back to a home page.
 *
 * The target language is always written in its own script — a Tamil reader
 * looks for "தமிழ்", never for "Tamil".
 */
export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  const next = otherLocale(locale);
  const meta = localeMeta[next];

  return (
    <Link
      href={swapLocale(pathname, next)}
      hrefLang={next}
      lang={next}
      // The label states the destination language, so a screen reader in
      // either language announces something meaningful.
      aria-label={
        locale === 'ta' ? `Switch to ${meta.englishName}` : `${meta.nativeName} — switch language`
      }
      className={cn(
        'u-tap-box inline-flex items-center justify-center rounded-sm border border-border px-md text-caption',
        'no-underline transition-colors duration-fast ease-standard hover:border-ink hover:bg-surface',
        className,
      )}
    >
      {meta.nativeName}
    </Link>
  );
}
