'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem, EduHorizontalLine } from './EduMotion';
import { SCHOOL_EDUCATION_DATA } from '@/data/school-education';

export function EduPriorities({ locale }: { locale: Locale }) {
  const { strategicDirectives } = SCHOOL_EDUCATION_DATA;

  const content = {
    en: {
      subhead:
        'Immediate operational objectives governing the 2026–27 academic year, focusing on baseline child welfare, pedagogy reform, and infrastructure audits.',
    },
    ta: {
      subhead:
        '2026–27 கல்வியாண்டிற்கான உடனடி நிர்வாக முன்னுரிமைகள்: மாணவர் நலம், கற்றல் முறை மாற்றம் மற்றும் பள்ளி உள்கட்டமைப்பு தணிக்கைகள்.',
    },
  }[locale];

  const directions: ('up' | 'left' | 'right' | 'up')[] = ['up', 'left', 'right', 'up'];

  return (
    <div className="space-y-8 max-w-[72rem] mx-auto">
      {/* Subhead with Subtle Fade Up */}
      <EduReveal direction="up" delay={0}>
        <p className="text-charcoal-700 text-base sm:text-lg max-w-[48rem]">
          {content.subhead}
        </p>
      </EduReveal>

      {/* Editorial Index with Progressive Line Drawing and Sequential Item Reveals */}
      <EduStaggerContainer className="space-y-4" stagger={0.1}>
        {strategicDirectives.map((item, idx) => (
          <EduStaggerItem
            key={item.id}
            direction={directions[idx % directions.length]}
            showTopLine={true}
            topLineColor="bg-sand-300"
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

            {/* Status & Citation */}
            <div className="pt-1 md:col-start-2 lg:col-start-3 space-y-1.5 text-right lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-charcoal-900">
                <span className="w-2 h-2 rounded-full bg-maroon-700" />
                <span>{item.status}</span>
              </div>
              <p className="text-xs text-charcoal-500 font-mono">
                {item.source}
              </p>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>

      {/* Bottom Hairline */}
      <EduHorizontalLine color="bg-sand-300" duration={0.65} />
    </div>
  );
}
