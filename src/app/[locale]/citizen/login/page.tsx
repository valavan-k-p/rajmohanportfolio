import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/routing';
import { OtpLoginForm } from '@/components/citizen/OtpLoginForm';

export const metadata: Metadata = {
  title: 'Citizen sign in',
  // A sign-in page must never be indexed.
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function CitizenLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const ta = locale === 'ta';

  return (
    <main id="main" className="min-h-dvh bg-sand-100 px-gutter py-section">
      <div className="mx-auto flex max-w-[46rem] flex-col gap-10">
        <header className="flex flex-col gap-4">
          <span aria-hidden="true" className="u-eyebrow text-maroon-700">
            {ta ? 'குடிமக்கள் சேவை' : 'Citizen Service'}
          </span>
          <h1 className="font-display text-h1 text-charcoal-900">
            {ta ? 'உள்நுழைக' : 'Sign in'}
          </h1>
          <p className="u-measure text-lead text-charcoal-700">
            {ta
              ? 'கடவுச்சொல் தேவையில்லை. உங்கள் கைபேசி எண்ணுக்கு அனுப்பப்படும் குறியீட்டைப் பயன்படுத்தி உள்நுழையவும்.'
              : 'No password needed. Sign in with a code sent to your mobile number.'}
          </p>
        </header>

        <OtpLoginForm locale={ta ? 'ta' : 'en'} />
      </div>
    </main>
  );
}
