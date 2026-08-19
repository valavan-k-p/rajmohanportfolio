import type { MetadataRoute } from 'next';
import { PORTAL_IDS } from '@/config/portals';
import { locales } from '@/lib/i18n/routing';
import { env } from '@/config/env';

const BASE = env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/**
 * Public routes only.
 *
 * Citizen and admin routes are deliberately absent — they are personalised or
 * privileged, carry `robots: noindex`, and listing them would advertise the
 * authenticated surface to crawlers.
 *
 * Every portal entry declares both locales via `alternates.languages`, so
 * search engines treat /en and /ta as translations of one page rather than as
 * duplicate content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const root: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];

  const portals: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    PORTAL_IDS.map((portal) => ({
      url: `${BASE}/${locale}/${portal}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${BASE}/${alt}/${portal}`]),
        ),
      },
    })),
  );

  return [...root, ...portals];
}
