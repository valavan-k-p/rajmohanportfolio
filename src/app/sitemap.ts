import type { MetadataRoute } from 'next';
import { PORTALS } from '@/config/portals';
import { PORTAL_PAGES } from '@/content/portals';
import { NEWS } from '@/content/news';
import { DOCUMENTS } from '@/content/documents';
import { publishable } from '@/lib/content/query';
import { locales } from '@/lib/i18n/routing';
import { env } from '@/config/env';

const BASE = env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/**
 * Public routes only.
 *
 * Citizen and admin routes are deliberately absent — they are personalised or
 * privileged, carry `robots: noindex`, and listing them would advertise the
 * authenticated surface to crawlers. `/search` is absent for the same reason a
 * results page carries noindex: it has nothing stable to index.
 *
 * Every entry declares both locales via `alternates.languages`, so search
 * engines treat /en and /ta as translations of one page rather than as
 * duplicate content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly',
    lastModified: Date = now,
  ): MetadataRoute.Sitemap =>
    locales.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${BASE}/${alt}${path}`]),
        ),
      },
    }));

  const parsed = (iso: string) => {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? now : date;
  };

  return [
    { url: BASE, lastModified: now, changeFrequency: 'monthly', priority: 1 },

    ...entry('', 1, 'weekly'),
    ...entry('/about', 0.8, 'monthly'),
    ...entry('/portals', 0.7, 'monthly'),
    ...entry('/news', 0.9, 'daily'),
    ...entry('/documents', 0.9, 'weekly'),
    ...entry('/media', 0.7, 'weekly'),
    ...entry('/services', 0.7, 'monthly'),
    ...entry('/disclaimer', 0.3, 'yearly'),
    ...entry('/accessibility', 0.3, 'yearly'),
    ...entry('/privacy', 0.3, 'yearly'),

    // Portals and every archive they expose.
    ...PORTALS.flatMap((portal) => [
      ...entry(`/${portal.slug}`, 0.9, 'weekly'),
      ...PORTAL_PAGES[portal.id].archives.flatMap((archive) =>
        entry(`/${portal.slug}/${archive.slug}`, 0.6, 'weekly'),
      ),
    ]),

    // Individual records, dated by their own publication date rather than by
    // the build — a crawler should not see every article change nightly.
    ...publishable(NEWS).flatMap((item) =>
      entry(`/news/${item.slug}`, 0.7, 'monthly', parsed(item.date)),
    ),
    ...publishable(DOCUMENTS).flatMap((doc) =>
      entry(`/documents/${doc.slug}`, 0.7, 'yearly', parsed(doc.date)),
    ),
  ];
}
