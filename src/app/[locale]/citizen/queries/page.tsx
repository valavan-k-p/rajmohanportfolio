import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/routing';
import { PORTAL_IDS, type PortalId } from '@/config/portals';
import { PORTAL_CONTENT } from '@/data/portals';
import { QuerySubmissionForm } from '@/components/citizen/QuerySubmissionForm';
import { QueryTracker } from '@/components/citizen/QueryTracker';

export const metadata: Metadata = {
  title: 'Raise or track a query',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * The shared Citizen Service Engine surface. All four portals link here with a
 * `?department=` hint; the engine, validation and backend are identical
 * regardless of which portal the citizen arrived from (spec §11).
 */
export default async function CitizenQueriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ department?: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const { department: requested } = await searchParams;
  const department: PortalId = PORTAL_IDS.includes(requested as PortalId)
    ? (requested as PortalId)
    : 'mla-egmore';

  const ta = locale === 'ta';
  const loc = ta ? 'ta' : 'en';

  return (
    <main id="main" className="min-h-dvh bg-sand-100 px-gutter py-section">
      <div className="mx-auto flex max-w-[62rem] flex-col gap-16">
        <header className="flex flex-col gap-4">
          <span aria-hidden="true" className="u-eyebrow text-maroon-700">
            {PORTAL_CONTENT[department].title[loc]}
          </span>
          <h1 className="font-display text-h1 text-charcoal-900">
            {ta ? 'கோரிக்கையைத் தெரிவிக்கவும்' : 'Raise a query'}
          </h1>
          <p className="u-measure text-lead text-charcoal-700">
            {ta
              ? 'உங்கள் கோரிக்கை ஒரு தனிப்பட்ட குறிப்பு எண்ணைப் பெறும். அதைக் கொண்டு நிலையைக் கண்காணிக்கலாம்.'
              : 'Your query receives a unique reference number. Use it to track progress at any time.'}
          </p>
        </header>

        <section aria-labelledby="submit-heading">
          <h2 id="submit-heading" className="u-eyebrow mb-8 text-maroon-700">
            {ta ? 'புதிய கோரிக்கை' : 'New query'}
          </h2>
          <QuerySubmissionForm department={department} locale={loc} />
        </section>

        <section aria-labelledby="track-heading" className="border-t border-sand-300 pt-16">
          <h2 id="track-heading" className="u-eyebrow mb-4 text-maroon-700">
            {ta ? 'ஏற்கனவே உள்ள கோரிக்கையைக் கண்காணிக்கவும்' : 'Track an existing query'}
          </h2>
          <p className="u-measure mb-8 text-body text-charcoal-700">
            {ta
              ? 'உள்நுழையாமலேயே கண்காணிக்கலாம்.'
              : 'No sign-in required.'}
          </p>
          <QueryTracker locale={loc} />
        </section>
      </div>
    </main>
  );
}
