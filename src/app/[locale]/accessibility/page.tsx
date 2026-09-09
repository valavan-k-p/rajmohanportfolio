import type { Metadata } from 'next';
import { LegalPageView, legalMetadata } from '@/components/content/LegalPageView';
import { locales, type Locale } from '@/lib/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return legalMetadata('accessibility', params);
}

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <LegalPageView slug="accessibility" params={params} />;
}
