import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  /**
   * `/` is included so a first-time visitor is sent to the language their
   * browser asks for rather than always to English. `src/app/page.tsx` is the
   * fallback for requests that reach it anyway.
   *
   * Everything else is excluded by pattern rather than by listing routes: API
   * handlers, the admin surface, Next's own assets and any path with a file
   * extension must not be rewritten to a locale prefix.
   */
  matcher: ['/', '/(en|ta)/:path*', '/((?!api|admin|_next|_vercel|offline|.*\\..*).*)'],
};
