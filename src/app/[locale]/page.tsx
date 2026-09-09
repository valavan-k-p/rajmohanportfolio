import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { PORTALS } from '@/config/portals';
import { IDENTITY } from '@/config/site';
import { NEWS } from '@/content/news';
import { HOME_METRICS } from '@/content/metrics';
import { galleryFor } from '@/content/gallery';
import { byDateDesc, publishable } from '@/lib/content/query';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Section, SectionHeader } from '@/components/ui/Section';
import { MetricStrip } from '@/components/ui/MetricStrip';
import { ButtonLink } from '@/components/ui/Button';
import { SourceBadge } from '@/components/ui/SourceBadge';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { HomeHero } from '@/components/content/HomeHero';
import { PortalCard } from '@/components/content/PortalCard';
import { NewsList } from '@/components/content/NewsList';

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
    // Absolute, so the root template does not render the name twice.
    title: { absolute: `${IDENTITY.name[locale]} · ${IDENTITY.designation[locale]}` },
    description: IDENTITY.positioning[locale],
    alternates: {
      canonical: href(locale),
      languages: { en: href('en'), ta: href('ta') },
    },
  };
}

/**
 * THE HOMEPAGE
 *
 * Seven blocks, in the order the brief sets: identity, the four portals, the
 * latest updates, key figures, one feature, photographs, official channels.
 *
 * The discipline here is subtraction. Every archive, every filter and every
 * document lives one click away inside its portal; the homepage's job is to
 * say who this is, what the four areas are, and what happened recently.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = ui(locale);
  const news = byDateDesc(publishable(NEWS));
  const latest = news.slice(0, 4);
  const feature = news.find((item) => item.featured) ?? news[0];

  // One photograph from each portal, so the strip reads as the whole office
  // rather than as whichever portal happens to have the most pictures.
  const featuredImages = PORTALS.flatMap((portal) => galleryFor(portal.id).slice(0, 2));

  return (
    <>
      <HomeHero locale={locale} />

      {/* ---------------------------------------------------------------- *
       * FOUR PORTALS — vertical, unnumbered (client note 1.3)
       * ---------------------------------------------------------------- */}
      <Section id="portals" divider={false}>
        <SectionHeader title={t.home.portalsTitle} standfirst={t.home.portalsStandfirst} />
        <div className="flex flex-col gap-2xl">
          {PORTALS.map((portal, index) => (
            <PortalCard
              key={portal.id}
              portal={portal}
              locale={locale}
              priority={index === 0}
            />
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- *
       * LATEST UPDATES
       * ---------------------------------------------------------------- */}
      {latest.length > 0 ? (
        <Section id="latest">
          <SectionHeader
            title={t.home.latestTitle}
            standfirst={t.home.latestStandfirst}
            action={
              <ButtonLink href={href(locale, '/news')} variant="secondary" size="sm">
                {t.common.viewAll}
              </ButtonLink>
            }
          />
          <NewsList items={latest} locale={locale} />
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- *
       * KEY FIGURES — see MetricStrip for why none of these can be a zero
       * ---------------------------------------------------------------- */}
      <Section id="figures">
        <SectionHeader title={t.home.figuresTitle} standfirst={t.home.figuresStandfirst} />
        <MetricStrip metrics={HOME_METRICS} locale={locale} />
      </Section>

      {/* ---------------------------------------------------------------- *
       * IN FOCUS
       *
       * The brief asks for a "Featured Project" in problem / intervention /
       * impact form. No project record with those three fields verified has
       * been supplied, so rather than invent a case study this runs the
       * leading reported item as an editorial feature — which is the same
       * layout, filled with something true.
       * ---------------------------------------------------------------- */}
      {feature ? (
        <Section id="feature" ground="sunken">
          <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:gap-2xl">
            {feature.image ? (
              <div className="relative aspect-3/2 overflow-hidden bg-border">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt[locale]}
                  fill
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  placeholder="blur"
                  blurDataURL={feature.image.blurDataURL}
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="self-center">
              <p className="u-label">{locale === 'ta' ? 'கவனத்தில்' : 'In focus'}</p>
              <h2 className="mt-sm text-h1">{feature.title[locale]}</h2>
              <p className="mt-lg max-w-text text-lead text-ink-muted">
                {feature.summary[locale]}
              </p>
              <div className="mt-xl flex flex-wrap items-center gap-lg">
                <ButtonLink href={href(locale, `/news/${feature.slug}`)} variant="secondary">
                  {t.common.readMore}
                </ButtonLink>
                <SourceBadge source={feature.source} locale={locale} />
              </div>
            </div>
          </div>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- *
       * PHOTOGRAPHS
       * ---------------------------------------------------------------- */}
      <Section id="media">
        <SectionHeader
          title={t.media.title}
          standfirst={t.media.standfirst}
          action={
            <ButtonLink href={href(locale, '/media')} variant="secondary" size="sm">
              {t.common.viewAll}
            </ButtonLink>
          }
        />
        <ul className="grid grid-cols-2 gap-md lg:grid-cols-4">
          {featuredImages.map((item) => (
            <li key={item.id}>
              <Link href={href(locale, '/media')} className="group block no-underline">
                <span className="relative block aspect-3/2 overflow-hidden bg-surface-sunken">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt[locale]}
                    fill
                    sizes="(min-width: 1024px) 23vw, 45vw"
                    placeholder="blur"
                    blurDataURL={item.image.blurDataURL}
                    className="object-cover transition-opacity duration-base ease-standard group-hover:opacity-90"
                  />
                </span>
                <span className="u-meta mt-xs block group-hover:text-ink">
                  {item.title[locale]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------- *
       * OFFICIAL CHANNELS — verified accounts only
       * ---------------------------------------------------------------- */}
      <Section id="channels">
        <SectionHeader title={t.home.channelsTitle} standfirst={t.home.channelsStandfirst} />
        <SocialLinks locale={locale} />
      </Section>
    </>
  );
}
