import type { Bilingual } from '@/lib/content/types';
import { locales, type Locale } from './routing';

/** Read a bilingual field in the active locale. */
export function t(value: Bilingual, locale: Locale): string {
  return value[locale];
}

/** The locale the switcher offers. Binary today; a lookup if a third is added. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ta' : 'en';
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * `lang` for a string rendered on a page of a different language.
 *
 * A Tamil book title inside an English sentence must be tagged `lang="ta"` or
 * a screen reader pronounces it with an English voice, and the Tamil companion
 * face is not selected. Returns `undefined` when no tag is needed, so it can
 * be spread onto an element without emitting a redundant attribute.
 */
export function langAttr(stringLocale: Locale, pageLocale: Locale): Locale | undefined {
  return stringLocale === pageLocale ? undefined : stringLocale;
}

/**
 * Format an ISO date for display.
 *
 * Tamil uses the same Gregorian calendar and Western digits in official
 * Tamil Nadu government usage, so the numerals are not localised — only the
 * month name is. Matching how tn.gov.in itself prints dates.
 */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === 'ta' ? 'ta-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Short form for dense rows: 12 Aug 2026. */
export function formatDateShort(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === 'ta' ? 'ta-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
