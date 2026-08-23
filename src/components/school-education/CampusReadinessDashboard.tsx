'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduCounter } from './EduMotion';

interface AuditItem {
  id: string;
  title: { en: string; ta: string };
  desc: { en: string; ta: string };
  standard: { en: string; ta: string };
}

const AUDIT_ITEMS: AuditItem[] = [
  {
    id: 'water',
    title: { en: 'Safe Drinking Water & Purification', ta: 'சுத்தமான குடிநீர் & சுத்திகரிப்பு' },
    desc: {
      en: 'Mandatory testing of overhead tanks, piped supply, and water purification units prior to campus reopening.',
      ta: 'பள்ளிகள் திறப்பதற்கு முன் குடிநீர்த் தொட்டிகள் மற்றும் சுத்திகரிப்பு அமைப்புகளை ஆய்வு செய்தல்.',
    },
    standard: { en: '100% Tested Compliance', ta: '100% பரிசோதனை உறுதி' },
  },
  {
    id: 'sanitation',
    title: { en: 'Functional Restrooms & Hygiene', ta: 'பயன்பாட்டு கழிப்பறைகள் & சுகாதாரம்' },
    desc: {
      en: 'Verifying uninterrupted running water, separate gender-segregated facilities, and daily sanitisation schedules.',
      ta: 'தடையற்ற தண்ணீர் வசதி, மாணவர்-மாணவியருக்கான தனித்தனி கழிப்பறைகள் மற்றும் தினசரி பராமரிப்பு.',
    },
    standard: { en: 'Daily Maintained Protocol', ta: 'தினசரி பராமரிப்பு நெறிமுறை' },
  },
  {
    id: 'kitchen',
    title: { en: 'Noon-Meal Kitchen & Ration Audits', ta: 'மதிய உணவு சமையலறை & உணவுப் பொருட்கள்' },
    desc: {
      en: 'Inspection of food grain storage, clean cooking fuel, and nutritious preparation under hygienic protocols.',
      ta: 'உணவுப் பொருட்கள் சேமிப்பு, தூய்மையான சமையல் எரிவாயு மற்றும் சத்தான உணவுத் தயாரிப்பு ஆய்வு.',
    },
    standard: { en: 'State Food Safety Verified', ta: 'உணவுப் பாதுகாப்பு உறுதி' },
  },
  {
    id: 'labs',
    title: { en: 'Hi-Tech Labs & Smart Board Electrical Safety', ta: 'ஹை-டெக் ஆய்வகம் & மின் பாதுகாப்பு' },
    desc: {
      en: 'Pre-session verification of computer hardware, smart board display readiness, and classroom electrical wiring.',
      ta: 'கணினிகள், ஸ்மார்ட் போர்டுகள் மற்றும் வகுப்பறை மின் இணைப்புகளின் பாதுகாப்புப் பரிசோதனை.',
    },
    standard: { en: 'Hardware Operational', ta: 'ஆய்வகங்கள் தயார்நிலை' },
  },
];

export function CampusReadinessDashboard({ locale }: { locale: Locale }) {
  const [selectedAudit, setSelectedAudit] = useState<AuditItem>(AUDIT_ITEMS[0]!);

  const content = {
    en: {
      headline: 'Classroom Readiness, Heatwave Adaptation & Rural Access',
      standfirst:
        'Ensuring functioning sanitation, clean drinking water, and operational digital labs before students return, alongside an explicit mandate to protect small rural schools from closure.',
      heatwaveTitle: 'Heatwave Adaptation (June 4 Reopening)',
      heatwaveDesc:
        'Following extreme summer temperatures in May 2026, the state rescheduled school reopening to 4 June to safeguard student health, using the additional window for facility audits.',
      smartBoardLabel: 'Smart Boards Inaugurated',
      smartBoardSub: 'Chennai Reopening Phase · June 2026',
      reopeningRuleTitle: 'The “10 Students Threshold” Reopening Rule',
      reopeningRuleDesc:
        'Legislatively established rule ensuring that government schools previously closed due to low enrolment will immediately reopen once 10 students register, backed by door-to-door teacher surveys.',
      source: 'Sources: Careers360, The News Mill, Dinamalar (June–August 2026)',
    },
    ta: {
      headline: 'வகுப்பறை தயார்நிலை, வெப்ப அலை மேலாண்மை & கிராமப்புறக் கல்வி',
      standfirst:
        'சுத்தமான குடிநீர், சுகாதார கழிப்பறைகள் மற்றும் நவீன ஆய்வகங்களை உறுதி செய்வதோடு, கிராமப்புற அரசுப் பள்ளிகளைப் பாதுகாக்கும் நடவடிக்கைகள்.',
      heatwaveTitle: 'கோடை வெப்பத்திற்கேற்ப பள்ளி திறப்பு மாற்றம் (ஜூன் 4)',
      heatwaveDesc:
        'மே 2026-ல் நிலவிய கடும் கோடை வெப்பம் காரணமாக மாணவர் நலன் கருதி பள்ளிகள் திறப்பு ஜூன் 4-க்கு மாற்றப்பட்டது; இக்கால அவகாசம் வளாகத் தயார்நிலை ஆய்வுகளுக்குப் பயன்படுத்தப்பட்டது.',
      smartBoardLabel: 'திறக்கப்பட்ட ஸ்மார்ட் போர்டுகள்',
      smartBoardSub: 'சென்னை தொடக்கக் கட்டம் · ஜூன் 2026',
      reopeningRuleTitle: '“10 மாணவர்கள் போதும்” — மறுதிறப்பு ஆணை',
      reopeningRuleDesc:
        '10 மாணவர்கள் சேர்ந்தாலே குறைந்த சேர்க்கையால் மூடப்பட்ட அரசுப் பள்ளிகளை உடனடியாக மீண்டும் திறக்க சட்டமன்றத்தில் உத்தரவிடப்பட்டது; இது ஏழை எளிய மாணவர்களின் கல்வி உரிமையை உறுதி செய்கிறது.',
      source: 'ஆதாரங்கள்: கேரியர்ஸ்360, தி நியூஸ் மில், தினமலர் (ஜூன்–ஆகஸ்ட் 2026)',
    },
  }[locale];

  return (
    <div className="space-y-10 max-w-[72rem] mx-auto">
      {/* Header */}
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed mt-2">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* 2-Column Split: Actions & Standards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left 7 Columns: Heatwave and 4-Point Audits */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-t border-sand-300 pt-4 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-maroon-700">
              {content.heatwaveTitle}
            </span>
            <p className="text-sm text-charcoal-800 leading-relaxed">
              {content.heatwaveDesc}
            </p>
          </div>

          <div className="border-t border-sand-300 pt-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-maroon-700">
              {locale === 'ta' ? 'வளாகத் தணிக்கை நெறிமுறைகள்' : 'Mandatory Facility Audits'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AUDIT_ITEMS.map((item) => {
                const isSelected = selectedAudit.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedAudit(item)}
                    className={`p-3 text-left border-b transition-colors ${
                      isSelected
                        ? 'border-maroon-700 text-charcoal-900'
                        : 'border-sand-300 text-charcoal-600 hover:text-charcoal-900'
                    }`}
                  >
                    <div className="text-sm font-semibold">{item.title[locale]}</div>
                    <div className="text-xs font-mono text-emerald-800 mt-1">● {item.standard[locale]}</div>
                  </button>
                );
              })}
            </div>

            <p className="text-xs sm:text-sm text-charcoal-700 pt-1">
              {selectedAudit.desc[locale]}
            </p>
          </div>
        </div>

        {/* Right 5 Columns: Smart Board Counter & 10-Student Directive */}
        <div className="lg:col-span-5 space-y-6 border-t border-sand-300 pt-4">
          <div>
            <div className="font-display text-4xl text-charcoal-900 tabular-nums font-light">
              <EduCounter value={21} duration={1.4} />{' '}
              <span className="text-lg font-sans text-maroon-700 font-semibold uppercase">
                {content.smartBoardLabel}
              </span>
            </div>
            <p className="text-xs text-charcoal-500 font-mono mt-1">
              {content.smartBoardSub}
            </p>
          </div>

          <div className="border-t border-sand-200 pt-4 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-maroon-700">
              {content.reopeningRuleTitle}
            </span>
            <p className="text-sm text-charcoal-800 leading-relaxed">
              {content.reopeningRuleDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs text-charcoal-500 font-mono pt-2 border-t border-sand-200">
        {content.source}
      </div>
    </div>
  );
}
