import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/routing';
import { SiteFooter } from '@/components/common/SiteFooter';
import { CitizenQueryBlock } from '@/components/citizen/CitizenQueryBlock';
import { EduHero } from '@/components/school-education/EduHero';
import { EduSectionShell } from '@/components/school-education/EduSectionShell';

// Interactive Bespoke Senior Developer Components
import { EduVision } from '@/components/school-education/EduVision';
import { EduPriorities } from '@/components/school-education/EduPriorities';
import { CurriculumWorkbench } from '@/components/school-education/CurriculumWorkbench';
import { TwoLanguageFramework } from '@/components/school-education/TwoLanguageFramework';
import { TNSparkTechLab } from '@/components/school-education/TNSparkTechLab';
import { CampusReadinessDashboard } from '@/components/school-education/CampusReadinessDashboard';
import { EduStudents } from '@/components/school-education/EduStudents';
import { EduTeachers } from '@/components/school-education/EduTeachers';
import { FiscalTransparencyBoard } from '@/components/school-education/FiscalTransparencyBoard';
import { GovernanceReformsGrid } from '@/components/school-education/GovernanceReformsGrid';
import { ChronologicalStream } from '@/components/school-education/ChronologicalStream';
import { EduNews } from '@/components/school-education/EduNews';
import { EduResources } from '@/components/school-education/EduResources';

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

  const title = locale === 'ta' ? 'பள்ளிக் கல்வி' : 'School Education';
  const description =
    locale === 'ta'
      ? 'அடிப்படை கற்றல், வகுப்பறை சமத்துவம், வெளிப்படையான நிர்வாகம் மற்றும் நவீன டிஜிட்டல் கல்வி.'
      : 'Foundational learning, classroom equity, process transparency, and modern digital literacy for Tamil Nadu schools.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/school-education`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/school-education`]),
      ),
    },
  };
}

export default async function SchoolEducationBespokePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  const heroContent = {
    en: {
      title: 'School Education',
      standfirst:
        'Foundational learning, classroom equity, process transparency, and modern digital literacy for Tamil Nadu schools.',
      backLabel: 'PORTALS',
    },
    ta: {
      title: 'பள்ளிக் கல்வி',
      standfirst:
        'அடிப்படை கற்றல், வகுப்பறை சமத்துவம், வெளிப்படையான நிர்வாகம் மற்றும் நவீன டிஜிட்டல் கல்வி.',
      backLabel: 'தளங்கள்',
    },
  }[locale as Locale];

  return (
    <>
      <main id="main" className="relative w-full overflow-hidden bg-white text-charcoal-900">
        {/* 1. Executive Briefing Hero */}
        <EduHero
          portal="school-education"
          index="01"
          title={heroContent.title}
          standfirst={heroContent.standfirst}
          backLabel={heroContent.backLabel}
          locale={locale as Locale}
        />

        {/* 2. Strategic Policy Vision */}
        <EduSectionShell
          id="vision"
          title={locale === 'ta' ? 'கொள்கைப் பார்வை' : 'Strategic Directive'}
          layout="statement"
          index={1}
        >
          <EduVision locale={locale as Locale} />
        </EduSectionShell>

        {/* 3. Core Policy Priorities */}
        <EduSectionShell
          id="priorities"
          title={locale === 'ta' ? 'தற்போதைய முன்னுரிமைகள்' : 'Current Priorities'}
          layout="numbered-list"
          index={2}
        >
          <EduPriorities locale={locale as Locale} />
        </EduSectionShell>

        {/* 4. Interactive Primary Curriculum Workbench (Classes 1–3) */}
        <EduSectionShell
          id="curriculum"
          title={locale === 'ta' ? 'பாடத்திட்டம் & 9 புதிய பாடநூல்கள்' : 'Curriculum & 9-Book Workbench'}
          layout="prose-columns"
          index={3}
        >
          <CurriculumWorkbench locale={locale as Locale} />
        </EduSectionShell>

        {/* 5. Two-Language Policy & State Autonomy */}
        <EduSectionShell
          id="two-language"
          title={locale === 'ta' ? 'இருமொழிக் கொள்கை & கல்வி சுயாட்சி' : 'Two-Language Policy & State Autonomy'}
          layout="statement"
          index={4}
        >
          <TwoLanguageFramework locale={locale as Locale} />
        </EduSectionShell>

        {/* 6. TN SPARK Tech & AI Lab */}
        <EduSectionShell
          id="tech-spark"
          title={locale === 'ta' ? 'டி.என் ஸ்பார்க் — AI & தொழில்நுட்பக் கல்வி' : 'TN SPARK — AI & Tech Architecture'}
          layout="staggered"
          index={5}
        >
          <TNSparkTechLab locale={locale as Locale} />
        </EduSectionShell>

        {/* 7. Campus Readiness & Heatwave Operations */}
        <EduSectionShell
          id="schools"
          title={locale === 'ta' ? 'பள்ளிகள் & வளாகத் தயார்நிலை' : 'School Readiness & Campus Audits'}
          layout="asymmetric-left"
          index={6}
        >
          <CampusReadinessDashboard locale={locale as Locale} />
        </EduSectionShell>

        {/* 8. Student Welfare & Legal Protections */}
        <EduSectionShell
          id="students"
          title={locale === 'ta' ? 'மாணவர் நலம் & சட்டப் பாதுகாப்பு' : 'Student Welfare & Sanctuary'}
          layout="full-bleed"
          index={7}
        >
          <EduStudents locale={locale as Locale} />
        </EduSectionShell>

        {/* 9. Teacher Enablement & Capacity Matrix */}
        <EduSectionShell
          id="teachers"
          title={locale === 'ta' ? 'ஆசிரியர்கள் & திறன் மேம்பாடு' : 'Teacher Enablement & Capacity'}
          layout="asymmetric-right"
          index={8}
        >
          <EduTeachers locale={locale as Locale} />
        </EduSectionShell>

        {/* 10. Fiscal Transparency & Budget Data Viz */}
        <EduSectionShell
          id="infrastructure"
          title={locale === 'ta' ? 'உள்கட்டமைப்பு & நிதி ஒதுக்கீடு' : 'Infrastructure & Fiscal Allocation'}
          layout="data-band"
          index={9}
        >
          <FiscalTransparencyBoard locale={locale as Locale} />
        </EduSectionShell>

        {/* 11. Digital Governance & Process Reforms */}
        <EduSectionShell
          id="governance"
          title={locale === 'ta' ? 'நிர்வாகச் சீர்திருத்தம் & இணையவழி NOC' : 'Digital Governance & Process Reforms'}
          layout="staggered"
          index={10}
        >
          <GovernanceReformsGrid locale={locale as Locale} />
        </EduSectionShell>

        {/* 12. Chronological Governance Stream */}
        <EduSectionShell
          id="timeline"
          title={locale === 'ta' ? 'கல்வி காலவரிசை' : 'Chronological Milestones'}
          layout="timeline"
          index={11}
        >
          <ChronologicalStream locale={locale as Locale} />
        </EduSectionShell>

        {/* 13. News & Media Coverage */}
        <EduSectionShell
          id="news"
          title={locale === 'ta' ? 'செய்திகள் & ஊடக ஆவணங்கள்' : 'News & Gazette Dispatches'}
          layout="editorial-index"
          index={12}
        >
          <EduNews locale={locale as Locale} />
        </EduSectionShell>

        {/* 14. Bibliography & Verified Sources */}
        <EduSectionShell
          id="resources"
          title={locale === 'ta' ? 'ஆதாரங்கள் & ஆவணங்கள்' : 'Verified Public Sources'}
          layout="link-list"
          index={13}
        >
          <EduResources locale={locale as Locale} />
        </EduSectionShell>

        {/* Citizen Query Block */}
        <div className="relative z-10 w-full bg-sand-100 border-t border-sand-300">
          <CitizenQueryBlock department="school-education" locale={locale as Locale} />
        </div>
      </main>

      <SiteFooter locale={locale as Locale} />
    </>
  );
}
