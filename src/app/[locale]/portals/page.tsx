import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PORTALS } from '@/config/portals';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Section } from '@/components/ui/Section';
import { PortalCard } from '@/components/content/PortalCard';

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
    title: t.home.portalsTitle,
    description: t.home.portalsStandfirst,
    alternates: {
      canonical: href(locale, '/portals'),
      languages: { en: href('en', '/portals'), ta: href('ta', '/portals') },
    },
  };
}

/** The destination of the header's Portals disclosure and the hero's CTA. */
export default async function PortalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const typed = locale as Locale;
  const t = ui(typed);

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[{ label: t.common.home, href: href(typed) }, { label: t.home.portalsTitle }]}
        />
      </Container>

      <Container width="page" as="header" className="pb-xl">
        <h1 className="text-h1">{t.home.portalsTitle}</h1>
        <p className="mt-md max-w-text text-lead text-ink-muted">{t.home.portalsStandfirst}</p>
      </Container>

      <Section id="portals" divider={false}>
        <div className="flex flex-col gap-2xl">
          {PORTALS.map((portal, index) => (
            <PortalCard
              key={portal.id}
              portal={portal}
              locale={typed}
              priority={index === 0}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
