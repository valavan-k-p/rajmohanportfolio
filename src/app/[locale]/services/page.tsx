import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PORTAL_IDS, type PortalId, getPortal } from '@/config/portals';
import { locales, type Locale } from '@/lib/i18n/routing';
import { href } from '@/lib/i18n/href';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { QuerySubmissionForm } from '@/components/citizen/QuerySubmissionForm';
import { QueryTracker } from '@/components/citizen/QueryTracker';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = ui(locale);
  return {
    title: t.services.title,
    description: t.services.standfirst,
    alternates: {
      canonical: href(locale, '/services'),
      languages: { en: href('en', '/services'), ta: href('ta', '/services') },
    },
  };
}

/**
 * CITIZEN SERVICES
 *
 * This is the one part of the site with a real backend behind it: the
 * submission form writes to Supabase, the tracker reads a real reference
 * number, and rate limiting and Turnstile are already wired. It was worth
 * keeping, so it was kept and re-dressed rather than rebuilt.
 *
 * The `?department=` hint decides which portal the request is filed against.
 * It defaults to the constituency, because a citizen arriving at /services
 * without a hint is almost always writing to their MLA rather than to a
 * department.
 */
export default async function ServicesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ department?: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const typed = locale as Locale;
  const t = ui(typed);

  const { department: requested } = await searchParams;
  const department: PortalId = PORTAL_IDS.includes(requested as PortalId)
    ? (requested as PortalId)
    : 'mla-egmore';

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[
            { label: t.common.home, href: href(typed) },
            { label: t.services.title },
          ]}
        />
      </Container>

      <Container width="page" as="header" className="pb-xl">
        <p className="u-label">{getPortal(department).title[typed]}</p>
        <h1 className="mt-sm text-h1">{t.services.title}</h1>
        <p className="mt-md max-w-text text-lead text-ink-muted">{t.services.standfirst}</p>
      </Container>

      <Section id="submit" width="text">
        <SectionHeader
          title={typed === 'ta' ? 'புதிய கோரிக்கை' : 'New request'}
          standfirst={
            typed === 'ta'
              ? 'சமர்ப்பித்ததும் தனிப்பட்ட குறிப்பு எண் ஒன்று வழங்கப்படும். அதைக் கொண்டு எப்போது வேண்டுமானாலும் நிலையைக் காணலாம்.'
              : 'On submission you receive a unique reference number. Use it to check progress at any time.'
          }
        />
        <QuerySubmissionForm department={department} locale={typed} />
      </Section>

      <Section id="track" width="text" ground="sunken">
        <SectionHeader
          title={typed === 'ta' ? 'கோரிக்கையின் நிலையைக் காண' : 'Track a request'}
          standfirst={
            typed === 'ta'
              ? 'குறிப்பு எண்ணை உள்ளிடவும். உள்நுழைவு தேவையில்லை.'
              : 'Enter your reference number. No sign-in required.'
          }
        />
        <QueryTracker locale={typed} />
      </Section>
    </>
  );
}
