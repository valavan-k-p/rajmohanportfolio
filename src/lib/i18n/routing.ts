import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ta'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/**
 * Locale metadata used for `lang`/`hreflang`, the language switcher, and font
 * selection. `nativeName` is what the switcher displays — a Tamil speaker looks
 * for "தமிழ்", not for "Tamil".
 */
export const localeMeta: Record<Locale, { nativeName: string; englishName: string; dir: 'ltr' }> = {
  en: { nativeName: 'English', englishName: 'English', dir: 'ltr' },
  ta: { nativeName: 'தமிழ்', englishName: 'Tamil', dir: 'ltr' },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Portals are always locale-prefixed (/en/..., /ta/...) per spec §9.
  // The master navigation at `/` is intentionally outside this scheme.
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
