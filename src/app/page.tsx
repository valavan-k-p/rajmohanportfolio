import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n/routing';

/**
 * `/` has no content of its own.
 *
 * The previous site made `/` a separate, unlocalised entry screen — a
 * photograph with the four portals floated over it. That left the homepage
 * outside the language system entirely, so a Tamil reader arriving at the root
 * met an English page with no way back into Tamil except the portal links.
 *
 * The homepage now lives at `/en` and `/ta` like every other page, and the root
 * only forwards. The middleware handles locale negotiation for requests that
 * carry an Accept-Language preference; this is the fallback.
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
