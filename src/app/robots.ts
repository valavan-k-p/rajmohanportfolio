import type { MetadataRoute } from 'next';
import { env } from '@/config/env';

const BASE = env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Citizen and admin surfaces are personalised or privileged. These
        // also carry meta noindex — robots.txt alone does not prevent
        // indexing of a URL someone links to.
        disallow: ['/admin', '/api/', '/en/citizen/', '/ta/citizen/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
