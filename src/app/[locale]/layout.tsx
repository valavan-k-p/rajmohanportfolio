import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { locales, type Locale } from '@/lib/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const typed = locale as Locale;

  /**
   * `lang` sits on this wrapper rather than on <html>.
   *
   * The root layout is shared with /admin and the / redirect, so it cannot know
   * the locale without going dynamic and losing static rendering for every
   * page. `lang` on a wrapping element is valid HTML and is honoured by
   * assistive technology and by the `:lang(ta)` rules in globals.css, which is
   * what the Tamil typography corrections depend on.
   *
   * `data-locale-root` marks THIS element as the one place the Tamil size and
   * leading are set. `:lang(ta)` would match every descendant, and a relative
   * font-size there compounds once per nesting level — see globals.css.
   */
  return (
    <div lang={typed} data-locale-root={typed} className="flex min-h-dvh flex-col">
      <NextIntlClientProvider messages={messages}>
        <SiteHeader locale={typed} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={typed} />
      </NextIntlClientProvider>
    </div>
  );
}
