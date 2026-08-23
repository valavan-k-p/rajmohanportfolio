'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';
import { SCHOOL_EDUCATION_DATA } from '@/data/school-education';

export function EduTimeline({ locale }: { locale: Locale }) {
  const { timelineEvents } = SCHOOL_EDUCATION_DATA;

  const content = {
    en: {
      headline: 'Chronological Milestones & Governance Record',
      subhead:
        'A documented record of official actions, legislative statements, and policy implementations since assuming office in May 2026.',
      verifiedFooter:
        'Verified against official government department records and press coverage across The Hindu, New Indian Express, Careers360, and Dinamalar.',
    },
    ta: {
      headline: 'காலவரிசை நிகழ்வுகள் & நிர்வாகப் பதிவு',
      subhead:
        'மே 2026-ல் பொறுப்பேற்றது முதல் மேற்கொள்ளப்பட்ட அரசு முடிவுகள், அறிவிப்புகள் மற்றும் சட்டமன்றச் செயல்பாடுகளின் அதிகாரப்பூர்வ பதிவு.',
      verifiedFooter:
        'அரசு செய்திக்குறிப்புகள், தி இந்து, நியூ இந்தியன் எக்ஸ்பிரஸ், தினமலர் மற்றும் கேரியர்ஸ்360 செய்திகளின் அடிப்படையில் சரிபார்க்கப்பட்டது.',
    },
  }[locale];

  return (
    <div className="space-y-10">
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed mt-2">
          {content.subhead}
        </p>
      </EduReveal>

      {/* Structured Minimalist Timeline Stream */}
      <EduStaggerContainer className="relative pl-6 sm:pl-10 border-l-2 border-sand-300 space-y-8">
        {timelineEvents.map((evt, idx) => (
          <EduStaggerItem key={idx} className="relative">
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-5 w-3.5 h-3.5 rounded-full bg-white border-[3px] border-maroon-700 shadow-sm" />

            <div className="bg-white p-6 border border-sand-300 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-200 pb-2.5">
                <span className="font-mono text-sm text-maroon-700 font-bold tracking-wide">
                  {evt.date}
                </span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-sand-100 px-2.5 py-0.5 text-charcoal-800 border border-sand-300">
                  {evt.status}
                </span>
              </div>
              <h4 className="font-display text-xl text-charcoal-900 leading-snug font-semibold">
                {evt.title[locale]}
              </h4>
              <p className="text-charcoal-700 text-sm leading-relaxed">
                {evt.desc[locale]}
              </p>
              <div className="text-[11px] text-charcoal-500 font-mono pt-1">
                Source: {evt.source}
              </div>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>

      {/* Sourcing Summary */}
      <EduReveal delay={0.15} className="pt-2">
        <p className="text-xs text-charcoal-500 font-mono">
          {content.verifiedFooter}
        </p>
      </EduReveal>
    </div>
  );
}
