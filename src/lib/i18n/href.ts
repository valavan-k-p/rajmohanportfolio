import type { Locale } from './routing';

/**
 * Build a locale-prefixed path.
 *
 * Every internal link on the site goes through this. Hand-written
 * `/en/...` strings are what let a Tamil page link into the English site
 * without anyone noticing, so they are not used anywhere.
 *
 *   href('ta', '/school-education/go')  ->  '/ta/school-education/go'
 *   href('en', '')                      ->  '/en'
 */
export function href(locale: Locale, path = ''): string {
  if (!path || path === '/') return `/${locale}`;
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Swap the locale on the current pathname, keeping the reader where they are.
 * Returns the plain locale root when the path has no segments to preserve.
 */
export function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return `/${next}`;
  segments[0] = next;
  return `/${segments.join('/')}`;
}

/** Append search params, dropping empty values so URLs stay clean. */
export function withParams(path: string, params: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const query = search.toString();
  return query ? `${path}?${query}` : path;
}
