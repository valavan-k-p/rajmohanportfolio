'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduInfrastructure({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Fiscal Allocation & Infrastructure Modernisation',
      subhead:
        'Transparent budget accountability paired with targeted digital infrastructure upgrades across Tamil Nadu government schools.',
      stats: [
        {
          num: '₹44,527 Cr',
          label: 'Total Department Allocation',
          desc: 'Current annual budgetary allocation dedicated to school infrastructure, teacher salaries, learning materials, and student welfare.',
        },
        {
          num: '+₹2,176 Cr',
          label: 'Net Increase in Expenditure',
          desc: 'Higher than the prior administration’s reported actual expenditure of ₹42,351 crore, defending the allocation against political criticism.',
        },
        {
          num: '21',
          label: 'Smart Boards Inaugurated',
          desc: 'Launched in Chennai on school reopening day alongside digital learning material distributions and classroom readiness verification.',
        },
      ],
      footnote:
        'Note on Budget Analysis: Sourced from Minister Rajmohan’s Assembly statement reported in Dinamalar Kalvimalar (August 2026). The administration emphasizes comparing current allocations against historical actual spending rather than preliminary estimates alone.',
    },
    ta: {
      headline: 'நிதி ஒதுக்கீடு & உள்கட்டமைப்பு நவீனமயமாக்கல்',
      subhead:
        'பள்ளிக் கல்வித்துறைக்கான நிதி ஒதுக்கீட்டின் வெளிப்படைத்தன்மையும், அரசுப் பள்ளிகளில் நவீன டிஜிட்டல் வசதிகளை ஏற்படுத்துவதும்.',
      stats: [
        {
          num: '₹44,527 கோடி',
          label: 'மொத்த கல்வித்துறை நிதி ஒதுக்கீடு',
          desc: 'பள்ளி உள்கட்டமைப்பு, ஆசிரியர் ஊதியம், பாடநூல்கள் மற்றும் மாணவர் நலத்திட்டங்களுக்காக ஒதுக்கப்பட்ட நிதி.',
        },
        {
          num: '+₹2,176 கோடி',
          label: 'நிகர செலவின அதிகரிப்பு',
          desc: 'முந்தைய நிர்வாகத்தின் உண்மையான செலவான ₹42,351 கோடியை விட ₹2,176 கோடி அதிகம் என நிதி ஒதுக்கீடு மீதான விமர்சனத்திற்கு விளக்கம் அளிக்கப்பட்டது.',
        },
        {
          num: '21',
          label: 'திறக்கப்பட்ட ஸ்மார்ட் போர்டுகள்',
          desc: 'பள்ளிகள் திறப்பு நாளில் சென்னையில் 21 ஸ்மார்ட் போர்டுகள் பயன்பாட்டிற்கு கொண்டுவரப்பட்டு டிஜிட்டல் வகுப்பறைகள் அமைக்கப்பட்டன.',
        },
      ],
      footnote:
        'நிதி மதிப்பீட்டுக் குறிப்பு: அமைச்சர் ராஜ்மோகனின் சட்டமன்ற விளக்கம், தினமலர் கல்விமலர் (ஆகஸ்ட் 2026). ஆரம்ப மதிப்பீடுகளுடன் ஒப்பிடுவதை விட, முந்தைய உண்மையான செலவினத்தோடு ஒப்பிட்டு நிதி அதிகரிப்பு விளக்கப்பட்டது.',
    },
  }[locale];

  return (
    <div className="space-y-12 text-white">
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-3xl md:text-4xl text-white leading-tight mb-3">
          {content.headline}
        </h3>
        <p className="text-white/80 text-base leading-relaxed">
          {content.subhead}
        </p>
      </EduReveal>

      {/* 3 Tabular Data Figures */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {content.stats.map((stat, idx) => (
          <EduStaggerItem
            key={idx}
            className="p-6 bg-charcoal-800 border border-charcoal-700 space-y-3"
          >
            <div className="font-display text-4xl lg:text-5xl text-yellow-400 font-light tracking-tight">
              {stat.num}
            </div>
            <div className="text-sm font-semibold uppercase tracking-wider text-white border-b border-charcoal-700 pb-2">
              {stat.label}
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              {stat.desc}
            </p>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>

      {/* Footnote */}
      <EduReveal delay={0.15} className="pt-4 border-t border-charcoal-700">
        <p className="text-xs text-white/60 font-mono leading-relaxed">
          {content.footnote}
        </p>
      </EduReveal>
    </div>
  );
}
