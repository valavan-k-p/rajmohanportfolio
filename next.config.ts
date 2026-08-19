import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Standalone output keeps the Docker image minimal (Phase 17).
  output: 'standalone',

  images: {
    // Spec §24 / PDF §16 — responsive AVIF + WebP at 400/800/1200/1920.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [400, 640, 800, 1080, 1200, 1920, 2560],
    imageSizes: [64, 128, 256, 384],
    // Required from Next 16 — any quality used by next/image must be declared.
    qualities: [70, 82, 90],
    // 30 days — navigation.jpg is a static, never-changing first-screen asset.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  eslint: {
    dirs: ['src', 'tests', 'scripts'],
  },

  // Security headers. Cloudflare adds WAF/DDoS on top (PDF §18); these are the
  // origin-level guarantees that survive a direct-to-origin request.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
