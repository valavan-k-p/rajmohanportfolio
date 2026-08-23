import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PORTALS, PORTAL_IDS, type PortalId } from '@/config/portals';
import { PORTAL_CONTENT } from '@/data/portals';
import { isPublishable } from '@/lib/content/types';
import { locales, type Locale } from '@/lib/i18n/routing';
import { PortalHero } from '@/components/portal/PortalHero';
import { SectionShell } from '@/components/portal/SectionShell';
import { PendingContent } from '@/components/content/PendingContent';
import { SectionMapper } from '@/components/mla-egmore/SectionMapper';
import { CitizenQueryBlock } from '@/components/citizen/CitizenQueryBlock';
import { SiteFooter } from '@/components/common/SiteFooter';
import { MlaHero } from '@/components/mla-egmore/MlaHero';
import { MlaSectionShell } from '@/components/mla-egmore/MlaSectionShell';
import { EduHero } from '@/components/school-education/EduHero';
import { EduSectionShell } from '@/components/school-education/EduSectionShell';
import { EduSectionMapper } from '@/components/school-education/EduSectionMapper';
import { InfoSectionShell } from '@/components/information-publicity/InfoSectionShell';
import { InfoSectionMapper } from '@/components/information-publicity/InfoSectionMapper';

/**
 * All four public portals.
 *
 * One route, not four page files: the portals share structure and differ in
 * *treatment*, which is resolved per-portal inside PortalHero and SectionShell.
 * Duplicating this file four times would violate the no-duplicate-components
 * rule and would guarantee the four drift apart under maintenance.
 */

type Params = { locale: string; portal: string };

export function generateStaticParams() {
  return locales.flatMap((locale) => PORTAL_IDS.map((portal) => ({ locale, portal })));
}

function resolve(params: Params) {
  const { locale, portal } = params;
  if (!locales.includes(locale as Locale)) return null;
  if (!PORTAL_IDS.includes(portal as PortalId)) return null;
  return { locale: locale as Locale, portal: portal as PortalId };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolved = resolve(await params);
  if (!resolved) return {};

  const content = PORTAL_CONTENT[resolved.portal];
  const title = content.title[resolved.locale];
  const description = content.standfirst[resolved.locale];
  const path = `/${resolved.locale}/${resolved.portal}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/${resolved.portal}`]),
      ),
    },
    openGraph: { title, description, type: 'website', locale: resolved.locale },
  };
}

export default async function PortalPage({ params }: { params: Promise<Params> }) {
  const resolved = resolve(await params);
  if (!resolved) notFound();

  const { locale, portal } = resolved;
  setRequestLocale(locale);

  const content = PORTAL_CONTENT[portal];
  const definition = PORTALS.find((p) => p.id === portal)!;
  const t = await getTranslations('common');

  // Content governance: `unverified` sections are withheld in production and
  // render behind a visible marker everywhere else. src/lib/content/types.ts
  const sections = content.sections.filter((section) => isPublishable(section));

  const inverted = portal === 'information-publicity';

  return (
    <>
      <main id="main">
        {portal === 'mla-egmore' ? (
          <MlaHero
            portal={portal}
            index={String(PORTALS.indexOf(definition) + 1).padStart(2, '0')}
            title={content.title[locale]}
            standfirst={content.standfirst[locale]}
            backLabel={t('backToNavigation')}
          />
        ) : portal === 'school-education' ? (
          <EduHero
            portal={portal}
            index={String(PORTALS.indexOf(definition) + 1).padStart(2, '0')}
            title={content.title[locale]}
            standfirst={content.standfirst[locale]}
            backLabel={t('backToNavigation')}
            locale={locale}
          />
        ) : (
          <PortalHero
            portal={portal}
            index={String(PORTALS.indexOf(definition) + 1).padStart(2, '0')}
            title={content.title[locale]}
            standfirst={content.standfirst[locale]}
            backLabel={t('backToNavigation')}
          />
        )}

        {sections.map((section, i) => {
          if (portal === 'mla-egmore') {
            return (
              <MlaSectionShell
                key={section.id}
                id={section.id}
                title={section.title[locale]}
                layout={section.layout}
                index={i + 1}
              >
                <SectionMapper
                  id={section.id}
                  locale={locale}
                  inverted={section.layout === 'data-band' || section.layout === 'full-bleed' || inverted}
                />
              </MlaSectionShell>
            );
          }

          if (portal === 'school-education') {
            return (
              <EduSectionShell
                key={section.id}
                id={section.id}
                title={section.title[locale]}
                layout={section.layout}
                index={i + 1}
              >
                <EduSectionMapper
                  sectionId={section.id}
                  locale={locale}
                />
              </EduSectionShell>
            );
          }

          if (portal === 'information-publicity') {
            return (
              <InfoSectionShell
                key={section.id}
                id={section.id}
                title={section.title[locale]}
                layout={section.layout}
                index={i + 1}
              >
                <InfoSectionMapper
                  id={section.id}
                  locale={locale}
                  inverted={section.layout === 'data-band' || section.layout === 'full-bleed' || inverted}
                />
              </InfoSectionShell>
            );
          }

          return (
            <SectionShell
              key={section.id}
              id={section.id}
              title={section.title[locale]}
              layout={section.layout}
              index={i + 1}
            >
              <PendingContent
                inverted={
                  section.layout === 'data-band' || section.layout === 'full-bleed' || inverted
                }
              />
            </SectionShell>
          );
        })}

        <CitizenQueryBlock department={portal} locale={locale} />
      </main>

      <SiteFooter locale={locale} />
    </>
  );
}
