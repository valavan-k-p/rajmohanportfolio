import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // The master navigation at `/` is deliberately excluded: it is the single
  // shared entry experience and is not locale-prefixed (spec §3, PDF §2).
  matcher: ['/(en|ta)/:path*'],
};
