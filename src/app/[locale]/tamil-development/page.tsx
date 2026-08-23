import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/routing';
import { SiteFooter } from '@/components/common/SiteFooter';
import { CitizenQueryBlock } from '@/components/citizen/CitizenQueryBlock';
import { TAMIL_DEVELOPMENT_DATA } from '@/data/tamil-development';

// Specific layout components
import { HeroSection } from '@/components/tamil-development/HeroSection';
import { EcosystemNetwork } from '@/components/tamil-development/EcosystemNetwork';
import { LivingScriptLine } from '@/components/tamil-development/LivingScriptLine';
import { OfficialLanguageSection } from '@/components/tamil-development/OfficialLanguageSection';
import { TamilThaaiVaazhthuSection } from '@/components/tamil-development/TamilThaaiVaazhthuSection';
import { MinisterSection } from '@/components/tamil-development/MinisterSection';
import { TenureTimeline } from '@/components/tamil-development/TenureTimeline';
import { ActionsSection } from '@/components/tamil-development/ActionsSection';
import { SorkuvaiDataViz } from '@/components/tamil-development/SorkuvaiDataViz';
import { TechnicalTamilSection } from '@/components/tamil-development/TechnicalTamilSection';
import { LiteratureArchive } from '@/components/tamil-development/LiteratureArchive';
import { DreamHouseSection } from '@/components/tamil-development/DreamHouseSection';
import { StudentsYouthSection } from '@/components/tamil-development/StudentsYouthSection';
import { ResearchSection } from '@/components/tamil-development/ResearchSection';
import { GlobalTamilMap } from '@/components/tamil-development/GlobalTamilMap';
import { FutureVisionSection } from '@/components/tamil-development/FutureVisionSection';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};

  const title = locale === 'ta' ? 'தமிழ் வளர்ச்சி' : 'Tamil Development';
  const description = locale === 'ta' 
    ? 'மொழி, இலக்கியம், பாரம்பரியம் மற்றும் தமிழ் அறிவு.' 
    : 'Language, literature, heritage and the knowledge of Tamil.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/tamil-development`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/tamil-development`]),
      ),
    },
  };
}

export default async function TamilDevelopmentBespokePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  // This specific page overrides the generic portal system for Tamil Development.
  // It uses custom GSAP animations, editorial structure, and strict factual data models.

  return (
    <>
      <main id="main" className="relative w-full overflow-hidden bg-[var(--color-tamil-paper)] text-[var(--color-tamil-ink)]">
        {/* The continuous golden thread SVG motif spanning sections */}
        <LivingScriptLine />

        {/* 1. HERO - Documentary Title Sequence */}
        <HeroSection locale={locale as Locale} />

        {/* 2. THE DEPARTMENT - Ecosystem Network */}
        <EcosystemNetwork locale={locale as Locale} data={TAMIL_DEVELOPMENT_DATA.ecosystemNodes} />

        {/* 3. OFFICIAL LANGUAGE */}
        <OfficialLanguageSection locale={locale as Locale} />

        {/* 4. TAMIL THAAI VAAZHTHU */}
        <TamilThaaiVaazhthuSection locale={locale as Locale} />

        {/* 5. THE MINISTER */}
        <MinisterSection locale={locale as Locale} />
        
        {/* 6. TIMELINE & ACTIONS */}
        <TenureTimeline locale={locale as Locale} />
        <ActionsSection locale={locale as Locale} />

        {/* 7. DIGITAL TAMIL: SORKUVAI & TECHNICAL TAMIL */}
        <SorkuvaiDataViz locale={locale as Locale} />
        <TechnicalTamilSection locale={locale as Locale} />

        {/* 8. LITERATURE & RECOGNITION */}
        <LiteratureArchive locale={locale as Locale} />
        <DreamHouseSection locale={locale as Locale} />

        {/* 9. STUDENTS & YOUTH */}
        <StudentsYouthSection locale={locale as Locale} />

        {/* 10. RESEARCH INSTITUTIONS */}
        <ResearchSection locale={locale as Locale} />

        {/* 11. GLOBAL TAMIL */}
        <GlobalTamilMap locale={locale as Locale} />

        {/* 12. FUTURE VISION */}
        <FutureVisionSection locale={locale as Locale} />

        <div className="relative z-10 w-full bg-[var(--color-tamil-paper)]">
          <CitizenQueryBlock department="tamil-development" locale={locale as Locale} />
        </div>
      </main>

      <SiteFooter locale={locale as Locale} />
    </>
  );
}
