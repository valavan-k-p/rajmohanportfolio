'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import {
  EduReveal,
  EduCounter,
  EduHorizontalLine,
  EduTopLineBox,
} from './EduMotion';

interface AuditItem {
  id: string;
  title: { en: string; ta: string };
  standard: { en: string; ta: string };
  desc: { en: string; ta: string };
}

const AUDIT_ITEMS: AuditItem[] = [
  {
    id: 'structural',
    title: { en: 'Structural Stability & Classrooms', ta: 'வகுப்பறை & கட்டட உறுதித்தன்மை' },
    standard: { en: 'Mandatory District Collectorate Clearance', ta: 'மாவட்ட ஆட்சியர் உத்தரவு தணிக்கை' },
    desc: {
      en: 'Every government and aided school must possess valid structural safety certificates before the commencement of the academic session.',
      ta: 'கல்வியாண்டு தொடங்குவதற்கு முன்பாக அனைத்து அரசு மற்றும் உதவிபெறும் பள்ளிகளும் முறையான கட்டடப் பாதுகாப்புச் சான்றிதழ் பெற வேண்டும்.',
    },
  },
  {
    id: 'sanitation',
    title: { en: 'Sanitation & Drinking Water', ta: 'குடிநீர் & கழிப்பறை வசதிகள்' },
    standard: { en: 'Functional Running Water & Clean Restrooms', ta: 'தொடர் குடிநீர் & சுத்தமான கழிப்பறை' },
    desc: {
      en: 'Immediate repair and daily maintenance protocols for handwash stations, student toilets, and pure drinking water access.',
      ta: 'மாணவர்களுக்கான சுத்திகரிக்கப்பட்ட குடிநீர், கைகழுவும் வசதிகள் மற்றும் சுகாதாரமான கழிப்பறைகள் தினசரி பராமரிப்பு நெறிமுறை.',
    },
  },
  {
    id: 'heatwave',
    title: { en: 'Heatwave & Ventilation Measures', ta: 'கோடை வெப்பத் தணிப்பு & காற்றோட்டம்' },
    standard: { en: 'Working Ceiling Fans & Shaded Assembly Areas', ta: 'மின்விசிறிகள் & நிழல் வசதிகள்' },
    desc: {
      en: 'Classrooms inspected for proper cross-ventilation, functional ceiling fans, and shaded school grounds during extreme summer months.',
      ta: 'கோடைகாலத்தில் வகுப்பறைகளில் நல்ல காற்றோட்டம், மின்விசிறிகள் மற்றும் மாணவர்கள் கூடும் இடங்களில் நிழல் பந்தல் வசதிகள்.',
    },
  },
  {
    id: 'digital',
    title: { en: 'Digital Smart Boards Deployment', ta: 'டிஜிட்டல் ஸ்மார்ட் போர்டு பயன்பாடு' },
    standard: { en: '21 Smart Boards in Chennai Schools Reopening', ta: 'சென்னையில் 21 ஸ்மார்ட் போர்டுகள் பயன்பாடு' },
    desc: {
      en: '21 high-resolution interactive smart boards inaugurated in Chennai government schools to deliver visual lessons from Day 1 of reopening.',
      ta: 'பள்ளி திறக்கப்பட்ட முதல் நாளிலேயே மாணவர்களுக்கு காட்சி வழிக் கல்வியை வழங்க சென்னையில் 21 ஸ்மார்ட் போர்டுகள் பயன்பாட்டுக்குத் திறப்பு.',
    },
  },
];

export function CampusReadinessDashboard({ locale }: { locale: Locale }) {
  const [selectedAudit, setSelectedAudit] = useState<AuditItem>(AUDIT_ITEMS[0] ?? {
    id: 'structural',
    title: { en: 'Structural Stability', ta: 'கட்டட உறுதித்தன்மை' },
    standard: { en: 'Collectorate Clearance', ta: 'ஆட்சியர் உத்தரவு' },
    desc: { en: '', ta: '' },
  });

  const content = {
    en: {
      headline: 'Campus Readiness & Infrastructure Standardisation',
      standfirst:
        'Comprehensive state readiness measures prior to school reopening, combining heatwave adjustments, 4-point facility audits, and smart classroom rollouts.',
      heatwaveTitle: 'Academic Year Schedule Adjustments',
      heatwaveDesc:
        'School reopening dates adjusted systematically in response to regional heatwave advisories, prioritising student physical safety and hydration.',
      smartBoardLabel: 'Smart Boards Inaugurated',
      smartBoardSub: 'Chennai Government Schools Reopening Phase',
      reopeningRuleTitle: 'School Continuity Directive',
      reopeningRuleDesc:
        'Clear administrative guarantee that government schools will remain operational and reopened even if enrolment is as few as 10 students, protecting rural access.',
      source: 'Source: Official State Inspections & Press Statements (June–August 2026)',
    },
    ta: {
      headline: 'பள்ளித் தயார்நிலை & உள்கட்டமைப்பு தணிக்கை',
      standfirst:
        'பள்ளிகள் திறப்பிற்கு முன் மேற்கொள்ளப்பட்ட கோடை வெப்பத் தணிப்பு நடவடிக்கைகள், 4-முக்கிய வளாகத் தணிக்கைகள் மற்றும் ஸ்மார்ட் வகுப்பறைகள் தொடக்கம்.',
      heatwaveTitle: 'கோடை வெப்பம் சார்ந்த கால அட்டவணை',
      heatwaveDesc:
        'மாணவர்களின் உடல்நலம் மற்றும் பாதுகாப்பைக் கருத்தில் கொண்டு, கோடை வெப்பத்தின் தாக்கத்திற்கேற்ப பள்ளி திறக்கும் தேதிகள் முறையாக திட்டமிடப்பட்டன.',
      smartBoardLabel: 'ஸ்மார்ட் போர்டுகள் பயன்பாட்டிற்குத் திறப்பு',
      smartBoardSub: 'சென்னை அரசுப் பள்ளிகள் மறுதிறப்புக் கட்டம்',
      reopeningRuleTitle: 'பள்ளி தொடர்ச்சி உத்தரவு',
      reopeningRuleDesc:
        'கிராமப்புற மாணவர்களின் கல்வி தடைபடாமல் இருக்க, 10 மாணவர்கள் சேர்ந்தாலே அரசுப் பள்ளிகள் தொடர்ந்து இயங்கும் என்ற வரலாற்று உத்தரவு.',
      source: 'ஆதாரம்: அரசுத் துறை கள ஆய்வுகள் & பத்திரிகைச் செய்திகள் (ஜூன்-ஆகஸ்ட் 2026)',
    },
  }[locale];

  return (
    <div className="space-y-8 max-w-[72rem] mx-auto">
      {/* Header with Mask Reveal */}
      <EduReveal direction="up" className="max-w-[50rem]">
        <h3 className="font-display text-3xl sm:text-4xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-lg leading-relaxed mt-2.5">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* 2-Column Split: Left Side from Left, Right Side from Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left 7 Columns: Heatwave and 4-Point Audits */}
        <EduReveal direction="left" delay={0.05} className="lg:col-span-7 space-y-6">
          <div className="pt-4 space-y-2.5">
            <span className="text-sm font-mono font-semibold uppercase tracking-wider text-maroon-700">
              {content.heatwaveTitle}
            </span>
            <p className="text-base text-charcoal-800 leading-relaxed">
              {content.heatwaveDesc}
            </p>
          </div>

          <EduHorizontalLine color="bg-sand-200" duration={0.6} />

          <div className="space-y-4">
            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-maroon-700">
              {locale === 'ta' ? 'வளாகத் தணிக்கை நெறிமுறைகள்' : 'Mandatory Facility Audits'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {AUDIT_ITEMS.map((item) => {
                const isSelected = selectedAudit.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedAudit(item)}
                    className={`p-4 text-left border-b transition-all ${
                      isSelected
                        ? 'border-maroon-700 bg-sand-100/70 text-charcoal-900 shadow-xs'
                        : 'border-sand-300 text-charcoal-600 hover:text-charcoal-900 hover:bg-sand-50/50'
                    }`}
                  >
                    <div className="text-base font-semibold">{item.title[locale]}</div>
                    <div className="text-xs sm:text-sm font-mono text-maroon-800 mt-1">● {item.standard[locale]}</div>
                  </button>
                );
              })}
            </div>

            <p className="text-sm sm:text-base text-charcoal-700 pt-1 leading-relaxed">
              {selectedAudit.desc[locale]}
            </p>
          </div>
        </EduReveal>

        {/* Right 5 Columns: Smart Board Counter & 10-Student Directive */}
        <EduTopLineBox
          delay={0.1}
          direction="right"
          topLineColor="bg-maroon-700"
          className="lg:col-span-5 space-y-6 p-6.5 bg-white border border-sand-300 shadow-sm rounded-sm"
        >
          <div>
            <div className="font-display text-5xl text-charcoal-900 tabular-nums font-light">
              <EduCounter value={21} duration={1.4} />{' '}
              <span className="text-xl font-sans text-maroon-700 font-semibold uppercase">
                {content.smartBoardLabel}
              </span>
            </div>
            <p className="text-sm text-charcoal-500 font-mono mt-1">
              {content.smartBoardSub}
            </p>
          </div>

          <div className="border-t border-sand-200 pt-4 space-y-2.5">
            <span className="text-sm font-mono font-semibold uppercase tracking-wider text-maroon-700">
              {content.reopeningRuleTitle}
            </span>
            <p className="text-base text-charcoal-800 leading-relaxed">
              {content.reopeningRuleDesc}
            </p>
          </div>
        </EduTopLineBox>
      </div>

      <div className="text-sm text-charcoal-500 font-mono pt-2 border-t border-sand-200">
        {content.source}
      </div>
    </div>
  );
}
