import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PORTALS, PORTAL_IDS, type PortalId } from '@/config/portals';
import { GALLERY } from '@/content/gallery';
import { parseFilter, publishable } from '@/lib/content/query';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FilterBar } from '@/components/ui/FilterBar';
import { Section, SectionHeader } from '@/components/ui/Section';
import { EmptyState } from '@/components/ui/States';
import { GallerySection } from '@/components/content/GallerySection';

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
    title: t.media.title,
    description: t.media.standfirst,
    alternates: {
      canonical: href(locale, '/media'),
      languages: { en: href('en', '/media'), ta: href('ta', '/media') },
    },
  };
}

/**
 * MEDIA
 *
 * Photographs, grouped by portal and by album. No videos are listed, because no
 * official channel video has been confirmed for republication — the section
 * states that rather than embedding something unverified.
 */
export default async function MediaPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const typed = locale as Locale;
  const t = ui(typed);
  const query = await searchParams;

  const department = parseFilter<PortalId>(query.department, PORTAL_IDS);
  const all = publishable(GALLERY);
  const shown = department ? all.filter((image) => image.department === department) : all;

  // Grouped by portal so the page reads as four collections rather than as one
  // undifferentiated wall of photographs.
  const groups = PORTALS.filter((portal) => !department || portal.id === department).map(
    (portal) => ({
      portal,
      images: shown.filter((image) => image.department === portal.id),
    }),
  );

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[{ label: t.common.home, href: href(typed) }, { label: t.media.title }]}
        />
      </Container>

      <Container width="page" as="header" className="pb-xl">
        <h1 className="text-h1">{t.media.title}</h1>
        <p className="mt-md max-w-text text-lead text-ink-muted">{t.media.standfirst}</p>
      </Container>

      <Container width="wide" className="pb-xl">
        <FilterBar
          label={t.common.department}
          param="department"
          basePath={href(typed, '/media')}
          active={department}
          options={[
            { value: undefined, label: t.common.all },
            ...PORTALS.map((portal) => ({ value: portal.id, label: portal.title[typed] })),
          ]}
        />
      </Container>

      {groups.map(({ portal, images }) =>
        images.length > 0 ? (
          <Section key={portal.id} id={`media-${portal.id}`} width="wide">
            <SectionHeader
              eyebrow={portal.facets.map((f) => f[typed]).join(' · ')}
              accent={portal.accentVar}
              title={portal.title[typed]}
            />
            <GallerySection images={images} locale={typed} columns={4} />
          </Section>
        ) : null,
      )}

      <Section id="videos" width="page">
        <SectionHeader title={t.media.videosTitle} />
        <EmptyState
          title={t.media.videosEmpty}
          description={
            typed === 'ta'
              ? 'அலுவல்முறை சேனலில் உள்ள காணொலிகள் உறுதிசெய்யப்பட்டதும் இங்கு இணைக்கப்படும்.'
              : 'Videos will be linked here once an official channel has been confirmed for republication.'
          }
        />
      </Section>
    </>
  );
}
