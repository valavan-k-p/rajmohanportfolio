import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PORTALS, getPortalBySlug } from '@/config/portals';
import { PORTAL_PAGES } from '@/content/portals';
import { NEWS } from '@/content/news';
import { DOCUMENTS } from '@/content/documents';
import { galleryFor } from '@/content/gallery';
import {
  EGMORE_RESULT_METRICS,
  EGMORE_WARD_METRICS,
  SCHOOL_EDUCATION_METRICS,
  TAMIL_DEVELOPMENT_METRICS,
} from '@/content/metrics';
import type { Metric } from '@/lib/content/schema';
import type { PortalId } from '@/config/portals';
import { byDateDesc, publishable } from '@/lib/content/query';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MetricStrip } from '@/components/ui/MetricStrip';
import { ButtonLink } from '@/components/ui/Button';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { PortalHero } from '@/components/content/PortalHero';
import { ArchiveGrid } from '@/components/content/ArchiveGrid';
import { NewsList } from '@/components/content/NewsList';
import { GallerySection } from '@/components/content/GallerySection';
import { EmptyState } from '@/components/ui/States';
import { WardDirectory } from '@/components/content/WardDirectory';
import { EGMORE_WARDS } from '@/content/wards';

const METRICS: Readonly<Record<PortalId, readonly Metric[]>> = {
  'school-education': SCHOOL_EDUCATION_METRICS,
  'tamil-development': TAMIL_DEVELOPMENT_METRICS,
  // No verified departmental figure has been supplied, so this portal shows
  // no figures at all. An empty strip beats a plausible one.
  'information-publicity': [],
  'mla-egmore': [...EGMORE_RESULT_METRICS, ...EGMORE_WARD_METRICS],
};

export function generateStaticParams() {
  return locales.flatMap((locale) => PORTALS.map((portal) => ({ locale, portal: portal.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; portal: string }>;
}): Promise<Metadata> {
  const { locale, portal: slug } = await params;
  const portal = getPortalBySlug(slug);
  if (!portal) return {};

  return {
    title: portal.title[locale],
    description: portal.standfirst[locale],
    alternates: {
      canonical: href(locale, `/${portal.slug}`),
      languages: {
        en: href('en', `/${portal.slug}`),
        ta: href('ta', `/${portal.slug}`),
      },
    },
  };
}

/**
 * A PORTAL
 *
 * One template for all four. What differs is the accent, the cover, the
 * overview text, the archives it exposes and the editorial features particular
 * to it — all of which come from `content/portals.ts`, so a portal cannot
 * quietly grow its own hero, its own section shell and its own typography
 * constants the way the previous four did.
 */
export default async function PortalPage({
  params,
}: {
  params: Promise<{ locale: string; portal: string }>;
}) {
  const { locale, portal: slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const portal = getPortalBySlug(slug);
  if (!portal) notFound();

  setRequestLocale(locale);
  const typed = locale as Locale;
  const t = ui(typed);
  const page = PORTAL_PAGES[portal.id];

  const news = byDateDesc(publishable(NEWS)).filter((item) => item.department === portal.id);
  const documents = publishable(DOCUMENTS).filter((doc) => doc.department === portal.id);
  const images = galleryFor(portal.id);
  const metrics = METRICS[portal.id];

  // Record counts per archive, so an empty archive says so on the card rather
  // than only after the reader has clicked into it.
  const counts: Record<string, number> = {};
  for (const archive of page.archives) {
    counts[archive.slug] =
      archive.documentTypes.length === 0
        ? archive.slug === 'news'
          ? news.length
          : 0
        : documents.filter((doc) => archive.documentTypes.includes(doc.documentType)).length;
  }

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[
            { label: t.common.home, href: href(typed) },
            { label: portal.title[typed] },
          ]}
        />
      </Container>

      <PortalHero portal={portal} locale={typed} />

      {/* Overview */}
      <Section id="overview" divider={false} width="page">
        <div className="grid gap-xl lg:grid-cols-2 lg:gap-2xl">
          {page.overview.map((block) => (
            <div key={block.heading.en}>
              <h2 className="text-h3">{block.heading[typed]}</h2>
              <p className="mt-sm text-ink-muted">{block.body[typed]}</p>
              <SourceBadge source={block.source} locale={typed} className="mt-sm" />
            </div>
          ))}
        </div>
      </Section>

      {/* Key figures */}
      {metrics.length > 0 ? (
        <Section id="figures">
          <SectionHeader
            eyebrow={portal.title[typed]}
            accent={portal.accentVar}
            title={t.portal.figures}
          />
          <MetricStrip metrics={metrics} locale={typed} />
        </Section>
      ) : null}

      {/* Portal-specific editorial sections */}
      {page.features.length > 0 ? (
        <Section id="features" ground="sunken">
          <div className="flex flex-col gap-2xl">
            {page.features.map((feature) => (
              <article key={feature.heading.en} className="max-w-text">
                <h2 className="text-h2">{feature.heading[typed]}</h2>
                <p className="mt-md text-lead text-ink-muted">{feature.body[typed]}</p>
                <SourceBadge source={feature.source} locale={typed} className="mt-md" />
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Wards — a constituency-only section, requested by the client
          (handwritten note 3: "Total count / Ward"). It is special-cased rather
          than generalised because Egmore is the only portal that represents a
          place with wards in it. */}
      {portal.id === 'mla-egmore' ? (
        <Section id="wards">
          <SectionHeader
            eyebrow={portal.title[typed]}
            accent={portal.accentVar}
            title={typed === 'ta' ? 'வார்டுகளும் உறுப்பினர்களும்' : 'Wards and councillors'}
            standfirst={
              typed === 'ta'
                ? 'தொகுதிக்குள் வரும் மாநகராட்சி வார்டுகளும், அவற்றைப் பிரதிநிதித்துவப்படுத்தும் உறுப்பினர்களும்.'
                : 'The corporation wards that fall within the constituency, and the councillors who represent them.'
            }
          />
          <WardDirectory wards={EGMORE_WARDS} locale={typed} />
        </Section>
      ) : null}

      {/* Archives */}
      <Section id="archives">
        <SectionHeader title={t.portal.archives} standfirst={t.portal.archivesStandfirst} />
        <ArchiveGrid
          archives={page.archives}
          counts={counts}
          portalSlug={portal.slug}
          accent={portal.accentVar}
          locale={typed}
        />
      </Section>

      {/* News */}
      <Section id="news">
        <SectionHeader
          title={t.portal.latestNews}
          action={
            news.length > 0 ? (
              <ButtonLink
                href={href(typed, `/${portal.slug}/news`)}
                variant="secondary"
                size="sm"
              >
                {t.common.viewAll}
              </ButtonLink>
            ) : null
          }
        />
        {news.length > 0 ? (
          <NewsList items={news.slice(0, 4)} locale={typed} />
        ) : (
          <EmptyState
            title={
              typed === 'ta' ? 'இப்பகுதிக்குச் செய்திகள் இல்லை' : 'No news for this portal yet'
            }
            description={
              typed === 'ta'
                ? 'இத்துறை தொடர்பான செய்திகள் ஆதாரத்துடன் கிடைத்ததும் இங்கு இடம்பெறும்.'
                : 'Items appear here as reports about this department are recorded with their source.'
            }
          />
        )}
      </Section>

      {/* Gallery — requested by the client for every portal */}
      <Section id="gallery">
        <SectionHeader
          title={t.portal.gallery}
          action={
            <ButtonLink href={href(typed, '/media')} variant="secondary" size="sm">
              {t.common.viewAll}
            </ButtonLink>
          }
        />
        <GallerySection images={images.slice(0, 6)} locale={typed} />
      </Section>

      {/* Official channels for this department */}
      <Section id="official">
        <SectionHeader title={t.portal.officialLinks} />
        <SocialLinks locale={typed} department={portal.id} />
      </Section>
    </>
  );
}
