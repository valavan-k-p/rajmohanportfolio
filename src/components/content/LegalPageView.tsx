import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getLegalPage } from '@/content/legal';
import { href } from '@/lib/i18n/href';
import { locales, type Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

/**
 * One renderer for the three standing pages — disclaimer, accessibility and
 * privacy — so their typography and structure cannot drift apart. The routes
 * themselves are separate static folders because `[portal]` sits at the same
 * level and would otherwise swallow them.
 */
export async function LegalPageView({
  slug,
  params,
}: {
  slug: 'disclaimer' | 'accessibility' | 'privacy';
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const page = getLegalPage(slug);
  if (!page) notFound();

  setRequestLocale(locale);
  const typed = locale as Locale;
  const t = ui(typed);

  return (
    <>
      <Container width="page">
        <Breadcrumb
          locale={typed}
          crumbs={[{ label: t.common.home, href: href(typed) }, { label: page.title[typed] }]}
        />
      </Container>

      <Container width="text" as="header" className="pb-xl">
        <h1 className="text-h1">{page.title[typed]}</h1>
        <p className="mt-md text-lead text-ink-muted">{page.standfirst[typed]}</p>
      </Container>

      <Container width="text" className="pb-3xl">
        <div className="divide-y divide-border border-t border-border">
          {page.sections.map((section) => (
            <section key={section.heading.en} className="py-xl">
              <h2 className="text-h3">{section.heading[typed]}</h2>
              <div className="u-prose mt-md">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph[typed]}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}

/** Shared metadata builder for the three routes. */
export async function legalMetadata(
  slug: 'disclaimer' | 'accessibility' | 'privacy',
  params: Promise<{ locale: Locale }>,
) {
  const { locale } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};

  return {
    title: page.title[locale],
    description: page.standfirst[locale],
    alternates: {
      canonical: href(locale, `/${slug}`),
      languages: { en: href('en', `/${slug}`), ta: href('ta', `/${slug}`) },
    },
  };
}
