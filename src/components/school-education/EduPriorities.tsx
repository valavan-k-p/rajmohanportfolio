'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduStaggerContainer, EduStaggerItem, EduHairline } from './EduMotion';
import { SCHOOL_EDUCATION_DATA } from '@/data/school-education';

export function EduPriorities({ locale }: { locale: Locale }) {
  const { strategicDirectives } = SCHOOL_EDUCATION_DATA;

  const content = {
    en: {
      subhead:
        'Active operational directives translating cabinet commitments into classroom and administrative execution.',
    },
    ta: {
      subhead:
        'அமைச்சரவைக் கொள்கைகளை வகுப்பறைச் செயல்பாடுகளாக மாற்றும் தற்போதைய முக்கிய முன்னுரிமைகள்.',
    },
  }[locale];

  return (
    <div className="space-y-8 max-w-[72rem] mx-auto">
      <p className="text-charcoal-700 text-base sm:text-lg max-w-[48rem]">
        {content.subhead}
      </p>

      {/* Clean Editorial Index with Spacious Whitespace and Subtle Dividers */}
      <EduStaggerContainer className="divide-y divide-sand-300">
        {strategicDirectives.map((item, idx) => (
          <EduStaggerItem
            key={item.id}
            className="py-8 grid grid-cols-1 md:grid-cols-[3.5rem_1fr] lg:grid-cols-[4rem_1fr_16rem] gap-6 lg:gap-10 items-start"
          >
            {/* Number Index */}
            <div className="font-mono text-2xl font-light text-maroon-700 pt-0.5">
              0{idx + 1}
            </div>

            {/* Title, Description & Impact */}
            <div className="space-y-3">
              <h3 className="font-display text-2xl text-charcoal-900 leading-snug font-normal">
                {item.title[locale]}
              </h3>
              <p className="text-charcoal-700 text-base leading-relaxed max-w-[46rem]">
                {item.desc[locale]}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-charcoal-600 pt-0.5">
                <span className="font-semibold text-maroon-700">
                  {locale === 'ta' ? 'தாக்கம்:' : 'Scope:'}
                </span>
                <span>{item.impact[locale]}</span>
              </div>
            </div>

            {/* Status & Citation: Clean Inline Layout (No Box-in-a-Box) */}
            <div className="pt-1 md:col-start-2 lg:col-start-3 space-y-1.5 text-right lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-charcoal-900">
                <span className="w-2 h-2 rounded-full bg-maroon-700" />
                <span>{item.status}</span>
              </div>
              <p className="text-xs text-charcoal-500 font-sans">
                {item.source}
              </p>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>

      <EduHairline className="mt-4" />
    </div>
  );
}
