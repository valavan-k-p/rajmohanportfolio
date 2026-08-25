'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem, EduCounter } from './EduMotion';
import { SCHOOL_EDUCATION_DATA } from '@/data/school-education';

export function EduInfrastructure({ locale }: { locale: Locale }) {
  const { fiscalMetrics } = SCHOOL_EDUCATION_DATA;

  const content = {
    en: {
      headline: 'Fiscal Allocation & Modern Infrastructure Benchmarks',
      subhead:
        'Transparent budget accountability paired with targeted digital infrastructure upgrades across Tamil Nadu government schools.',
      footnote:
        'Accounting Note: Sourced from Minister Rajmohan’s Assembly statement reported in Dinamalar Kalvimalar (August 2026). The administration emphasizes comparing current allocations against historical actual expenditure rather than preliminary estimates.',
      tableHeaders: {
        metric: 'Fiscal Line Item',
        stat: 'Allocated Value',
        benchmark: 'Benchmarked Against',
      },
      tableRows: [
        {
          item: 'Annual School Education Allocation',
          val: '₹44,527 Crore',
          benchmark: 'State Education Budget 2026–27',
        },
        {
          item: 'Real Expenditure Growth (YoY)',
          val: '+₹2,176 Crore',
          benchmark: 'Prior Actuals (₹42,351 Cr)',
        },
        {
          item: 'Chennai Digital Classrooms',
          val: '21 Smart Boards',
          benchmark: 'Reopening Inauguration Phase',
        },
      ],
    },
    ta: {
      headline: 'நிதி ஒதுக்கீடு & உள்கட்டமைப்பு நவீனமயமாக்கல்',
      subhead:
        'பள்ளிக் கல்வித்துறைக்கான நிதி ஒதுக்கீட்டின் வெளிப்படைத்தன்மையும், அரசுப் பள்ளிகளில் நவீன டிஜிட்டல் வசதிகளை ஏற்படுத்துவதும்.',
      footnote:
        'கணக்குக் குறிப்பு: அமைச்சர் ராஜ்மோகனின் சட்டமன்ற விளக்கம், தினமலர் கல்விமலர் (ஆகஸ்ட் 2026). ஆரம்ப மதிப்பீடுகளுடன் ஒப்பிடுவதை விட, முந்தைய உண்மையான செலவினத்தோடு ஒப்பிட்டு நிதி அதிகரிப்பு விளக்கப்பட்டது.',
      tableHeaders: {
        metric: 'நிதி விவரம்',
        stat: 'ஒதுக்கீடு',
        benchmark: 'ஒப்பீடு வரம்பு',
      },
      tableRows: [
        {
          item: 'வருடாந்திர பள்ளிக் கல்வி நிதி',
          val: '₹44,527 கோடி',
          benchmark: 'மாநிலக் கல்வி நிதி 2026–27',
        },
        {
          item: 'நிகர செலவின அதிகரிப்பு',
          val: '+₹2,176 கோடி',
          benchmark: 'முந்தைய செலவு (₹42,351 கோடி)',
        },
        {
          item: 'சென்னை டிஜிட்டல் வகுப்பறைகள்',
          val: '21 ஸ்மார்ட் போர்டுகள்',
          benchmark: 'பள்ளி திறப்பு தொடக்கக் கட்டம்',
        },
      ],
    },
  }[locale];

  return (
    <div className="space-y-12 text-white">
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-3 font-normal">
          {content.headline}
        </h3>
        <p className="text-white/80 text-base leading-relaxed">
          {content.subhead}
        </p>
      </EduReveal>

      {/* 3 Metric Cards with Animated Counters */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {fiscalMetrics.map((stat) => (
          <EduStaggerItem
            key={stat.id}
            className="h-full p-6 bg-charcoal-800 border border-charcoal-700 space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="font-display text-4xl lg:text-5xl text-yellow-400 font-light tracking-tight tabular-nums">
                <EduCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={locale === 'ta' ? stat.suffixTa : stat.suffix}
                  duration={1.6}
                />
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-white border-b border-charcoal-700 pb-2 mt-2">
                {stat.label[locale]}
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              {stat.context[locale]}
            </p>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>

      {/* Structured Fiscal Overview Table */}
      <EduReveal delay={0.12} className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-charcoal-700 text-xs sm:text-sm">
          <thead>
            <tr className="bg-charcoal-800 border-b border-charcoal-700 text-yellow-400 font-mono uppercase">
              <th className="p-3.5 border-r border-charcoal-700">{content.tableHeaders.metric}</th>
              <th className="p-3.5 border-r border-charcoal-700">{content.tableHeaders.stat}</th>
              <th className="p-3.5">{content.tableHeaders.benchmark}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-700 text-white/90">
            {content.tableRows.map((row, i) => (
              <tr key={i} className="hover:bg-charcoal-800/50 transition-colors">
                <td className="p-3.5 border-r border-charcoal-700 font-medium">{row.item}</td>
                <td className="p-3.5 border-r border-charcoal-700 font-mono text-yellow-400">{row.val}</td>
                <td className="p-3.5 text-white/70 font-mono">{row.benchmark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </EduReveal>

      {/* Accounting Footnote */}
      <EduReveal delay={0.16} className="pt-2">
        <p className="text-xs text-white/60 font-mono leading-relaxed">
          {content.footnote}
        </p>
      </EduReveal>
    </div>
  );
}
