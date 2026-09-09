import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PORTALS } from '@/config/portals';
import { IDENTITY } from '@/config/site';
import { ABOUT_SECTIONS } from '@/content/about';
import { HOME_METRICS } from '@/content/metrics';
import { media } from '@/content/media/generated';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Section, SectionHeader } from '@/components/ui/Section';
import { MetricStrip } from '@/components/ui/MetricStrip';
import { SourceBadge } from '@/components/ui/SourceBadge';
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
  return {
    title: locale === 'ta' ? 'அறிமுகம்' : 'About',
    description: IDENTITY.positioning[locale],
    alternates: {
      canonical: href(locale, '/about'),
      languages: { en: href('en', '/about'), ta: href('ta', '/about') },
    },
  };
}

/**
 * ABOUT
 *
 * A biography page on a public office's site is where promotional language
 * usually creeps in. The copy here is deliberately flat — it states offices,
 * dates and results, and makes no assessment of them. See content/about.ts.
 */
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const typed = locale as Locale;
  const t = ui(typed);
  const portrait = media('about-desk');

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[
            { label: t.common.home, href: href(typed) },
            { label: typed === 'ta' ? 'அறிமுகம்' : 'About' },
          ]}
        />
      </Container>

      <Container width="page" as="header" className="pb-xl">
        <h1 className="text-h1">{IDENTITY.name[typed]}</h1>
        {/* Same family as the name — client handwritten note 1.2. */}
        <p className="mt-md max-w-text font-display text-lead leading-snug text-ink-muted">
          {IDENTITY.designation[typed]}
        </p>
        <p className="u-label mt-lg border-t border-border pt-md">
          {IDENTITY.constituency[typed]}
        </p>
      </Container>

      <Container width="page" className="pb-xl">
        <figure>
          <div className="relative aspect-3/2 overflow-hidden bg-surface-sunken">
            <Image
              src={portrait.src}
              alt={portrait.alt[typed]}
              fill
              priority
              sizes="(min-width: 1248px) 78rem, 100vw"
              placeholder="blur"
              blurDataURL={portrait.blurDataURL}
              className="object-cover"
            />
          </div>
          <figcaption className="u-meta mt-sm">{portrait.alt[typed]}</figcaption>
        </figure>
      </Container>

      <Section id="figures" divider={false}>
        <MetricStrip metrics={HOME_METRICS} locale={typed} />
      </Section>

      {ABOUT_SECTIONS.map((section) => (
        <Section key={section.id} id={section.id} width="text">
          <h2 className="text-h2">{section.heading[typed]}</h2>
          <div className="u-prose mt-lg">
            {section.body.map((paragraph, index) => (
              <p key={index}>{paragraph[typed]}</p>
            ))}
          </div>
          <SourceBadge source={section.source} locale={typed} variant="block" className="mt-xl" />
        </Section>
      ))}

      <Section id="portals">
        <SectionHeader title={t.home.portalsTitle} standfirst={t.home.portalsStandfirst} />
        <div className="flex flex-col gap-2xl">
          {PORTALS.map((portal) => (
            <PortalCard key={portal.id} portal={portal} locale={typed} />
          ))}
        </div>
      </Section>
    </>
  );
}
