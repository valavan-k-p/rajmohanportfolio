'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import {
  EduReveal,
  EduCounter,
  EduTopLineBox,
  EduHorizontalLine,
  EduDataBar,
} from './EduMotion';

export function FiscalTransparencyBoard({ locale }: { locale: Locale }) {
  const [activeTab, setActiveTab] = useState<'comparison' | 'lineItems'>('comparison');

  const content = {
    en: {
      badge: 'FISCAL GOVERNANCE · BUDGET 2026–27',
      headline: 'State Budget Allocation & Real Spending Growth',
      standfirst:
        'A transparent comparative analysis of Tamil Nadu’s ₹44,527 Crore school education budget, demonstrating real funding growth over actual historical expenditure.',
      counter1Label: 'Total Education Budget',
      counter1Sub: 'State Allocation · 2026–27',
      counter2Label: 'Real Spend Increase (YoY)',
      counter2Sub: 'Compared to Prior Actuals (₹42,351 Cr)',
      counter3Label: 'Smart Board Deployments',
      counter3Sub: 'Chennai Reopening Phase',
      tabComparison: 'Real Spending Comparison',
      tabLineItems: 'Line-Item Breakdown',
      currAlloc: 'Current Allocation (2026–27)',
      priorActual: 'Prior Administration Actual Spend',
      deltaLabel: 'Real Net Growth: +₹2,176 Crore',
      tableHeaders: {
        category: 'Budgetary Priority Category',
        allocation: 'Allocation Estimate',
        purpose: 'Operational Purpose & Beneficiaries',
      },
      tableRows: [
        {
          cat: 'Classroom Infrastructure & School Upgrades',
          val: '₹12,400 Cr',
          purpose: 'New classrooms, smart boards, sanitation audits, drinking water & repair.',
        },
        {
          cat: 'Teacher Salaries, Capacity & Recruitment',
          val: '₹22,100 Cr',
          purpose: 'Educator compensation, primary activity-training, and specialised mentors.',
        },
        {
          cat: 'Student Welfare, Textbooks & Nutrition',
          val: '₹6,800 Cr',
          purpose: 'Free uniforms, 9 primary textbooks, mid-day meals, and student kits.',
        },
        {
          cat: 'Digital Labs, AI Tech & TN SPARK',
          val: '₹3,227 Cr',
          purpose: 'Hi-Tech computer labs, high-speed connectivity, and AI pilot modules.',
        },
      ],
      accountingNote:
        'Methodology Note: The administration emphasizes benchmarking current budget allocations against audited actual expenditures rather than preliminary budget estimates, establishing transparent and verifiable fiscal tracking.',
      citation: 'Source: Legislative Assembly Statement reported in Dinamalar Kalvimalar (August 2026)',
    },
    ta: {
      badge: 'நிதி மேலாண்மை · பட்ஜெட் 2026–27',
      headline: 'கல்வித்துறை நிதி ஒதுக்கீடு & உண்மையான செலவின வளர்ச்சி',
      standfirst:
        'தமிழ்நாடு பள்ளிக் கல்வித்துறைக்கான ₹44,527 கோடி பட்ஜெட் ஒதுக்கீடு மற்றும் முந்தைய செலவினங்களோடு ஒப்பிட்ட வெளிப்படையான பகுப்பாய்வு.',
      counter1Label: 'மொத்த கல்வி நிதி ஒதுக்கீடு',
      counter1Sub: 'மாநில பட்ஜெட் · 2026–27',
      counter2Label: 'உண்மையான செலவின அதிகரிப்பு',
      counter2Sub: 'முந்தைய செலவை விட (₹42,351 கோடி)',
      counter3Label: 'திறக்கப்பட்ட ஸ்மார்ட் போர்டுகள்',
      counter3Sub: 'சென்னை தொடக்கக் கட்டம்',
      tabComparison: 'செலவின ஒப்பீட்டு வரைபடம்',
      tabLineItems: 'துறைவாரி நிதிப் பகிர்வு',
      currAlloc: 'தற்போதைய ஒதுக்கீடு (2026–27)',
      priorActual: 'முந்தைய அரசின் உண்மையான செலவு',
      deltaLabel: 'உண்மையான கூடுதல் நிதி: +₹2,176 கோடி',
      tableHeaders: {
        category: 'முக்கிய நிதிப் பிரிவு',
        allocation: 'மதிப்பிடப்பட்ட நிதி',
        purpose: 'பயன்பாடு & திட்டப் பலன்கள்',
      },
      tableRows: [
        {
          cat: 'பள்ளி உள்கட்டமைப்பு & நவீனமயமாக்கல்',
          val: '₹12,400 கோடி',
          purpose: 'புதிய வகுப்பறைகள், ஸ்மார்ட் போர்டுகள், குடிநீர் & கழிப்பறை வசதிகள்.',
        },
        {
          cat: 'ஆசிரியர் ஊதியம் & திறன் பயிற்சிகள்',
          val: '₹22,100 கோடி',
          purpose: 'ஆசிரியர்கள் ஊதியம், செயல்வழிக் கற்பித்தல் பயிற்சிகள் & வழிகாட்டல்.',
        },
        {
          cat: 'மாணவர் நலம், பாடநூல்கள் & சத்துணவு',
          val: '₹6,800 கோடி',
          purpose: 'இலவச சீருடைகள், 9 புதிய பாடநூல்கள், சத்துணவு & கல்வி உபகரணங்கள்.',
        },
        {
          cat: 'டிஜிட்டல் ஆய்வகங்கள் & டி.என் ஸ்பார்க்',
          val: '₹3,227 கோடி',
          purpose: 'ஹை-டெக் ஆய்வகங்கள், இணைய வசதி மற்றும் AI முன்னோடித் திட்டம்.',
        },
      ],
      accountingNote:
        'கணக்கீட்டுக் குறிப்பு: ஆரம்ப பட்ஜெட் மதிப்பீடுகளை விட, முந்தைய அரசின் உண்மையான தணிக்கை செய்யப்பட்ட செலவினங்களோடு ஒப்பிட்டு நிதி வளர்ச்சி வெளிப்படையாக விளக்கப்பட்டுள்ளது.',
      citation: 'ஆதாரம்: அமைச்சர் ராஜ்மோகன் சட்டமன்ற விளக்கம், தினமலர் கல்விமலர் (ஆகஸ்ட் 2026)',
    },
  }[locale];

  return (
    <div className="space-y-8 text-white">
      {/* 1. Yellow Accent Line Drawing Across */}
      <EduHorizontalLine color="bg-yellow-400" thickness="h-[2px]" duration={0.85} />

      {/* 2. Lead Text */}
      <EduReveal direction="up" className="max-w-[50rem]">
        <div className="text-xs font-mono font-bold uppercase tracking-widest text-yellow-400 mb-2">
          {content.badge}
        </div>
        <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] text-white leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-white/80 text-lg leading-relaxed mt-2.5">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* 3. 3 Metric Cards with Replaying Live Counters & Yellow Top Lines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Metric 1 */}
        <EduTopLineBox
          delay={0.05}
          direction="up"
          topLineColor="bg-yellow-400"
          className="p-6.5 bg-charcoal-800 border border-charcoal-700 flex flex-col justify-between space-y-3.5"
        >
          <div>
            <div className="font-display text-5xl lg:text-6xl text-yellow-400 tabular-nums font-light">
              <EduCounter value={44527} prefix="₹" suffix={locale === 'ta' ? ' கோடி' : ' Cr'} duration={1.6} />
            </div>
            <div className="text-base font-semibold text-white uppercase tracking-wider mt-2 border-b border-charcoal-700 pb-2">
              {content.counter1Label}
            </div>
          </div>
          <div className="text-sm text-white/70">
            {content.counter1Sub}
          </div>
        </EduTopLineBox>

        {/* Metric 2 */}
        <EduTopLineBox
          delay={0.12}
          direction="left"
          topLineColor="bg-yellow-400"
          className="p-6.5 bg-charcoal-800 border border-charcoal-700 flex flex-col justify-between space-y-3.5"
        >
          <div>
            <div className="font-display text-5xl lg:text-6xl text-yellow-400 tabular-nums font-light">
              <EduCounter value={2176} prefix="+₹" suffix={locale === 'ta' ? ' கோடி' : ' Cr'} duration={1.4} />
            </div>
            <div className="text-base font-semibold text-white uppercase tracking-wider mt-2 border-b border-charcoal-700 pb-2">
              {content.counter2Label}
            </div>
          </div>
          <div className="text-sm text-white/70">
            {content.counter2Sub}
          </div>
        </EduTopLineBox>

        {/* Metric 3 */}
        <EduTopLineBox
          delay={0.18}
          direction="right"
          topLineColor="bg-yellow-400"
          className="p-6.5 bg-charcoal-800 border border-charcoal-700 flex flex-col justify-between space-y-3.5"
        >
          <div>
            <div className="font-display text-5xl lg:text-6xl text-yellow-400 tabular-nums font-light">
              <EduCounter value={21} duration={1.2} />
            </div>
            <div className="text-base font-semibold text-white uppercase tracking-wider mt-2 border-b border-charcoal-700 pb-2">
              {content.counter3Label}
            </div>
          </div>
          <div className="text-sm text-white/70">
            {content.counter3Sub}
          </div>
        </EduTopLineBox>
      </div>

      {/* Interactive Tabs */}
      <div className="flex gap-2.5 border-b border-charcoal-700 pb-3.5">
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4.5 py-2.5 text-sm sm:text-base font-medium transition-all border ${
            activeTab === 'comparison'
              ? 'bg-yellow-400 text-charcoal-900 border-yellow-400 font-bold'
              : 'bg-charcoal-800 text-white/80 border-charcoal-700 hover:text-white'
          }`}
        >
          {content.tabComparison}
        </button>
        <button
          onClick={() => setActiveTab('lineItems')}
          className={`px-4.5 py-2.5 text-sm sm:text-base font-medium transition-all border ${
            activeTab === 'lineItems'
              ? 'bg-yellow-400 text-charcoal-900 border-yellow-400 font-bold'
              : 'bg-charcoal-800 text-white/80 border-charcoal-700 hover:text-white'
          }`}
        >
          {content.tabLineItems}
        </button>
      </div>

      {/* Tab 1: Visual Spending Bar Chart with Replaying Animated Data Bars */}
      {activeTab === 'comparison' ? (
        <EduTopLineBox
          delay={0.05}
          topLineColor="bg-yellow-400"
          className="p-6 sm:p-8 bg-charcoal-800 border border-charcoal-700 space-y-6 rounded-sm"
        >
          <div className="space-y-5">
            {/* Bar 1: Current Allocation */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm sm:text-base font-mono">
                <span className="text-white font-semibold">{content.currAlloc}</span>
                <span className="text-yellow-400 font-bold">₹44,527 {locale === 'ta' ? 'கோடி' : 'Cr'}</span>
              </div>
              <EduDataBar percentage={100} color="bg-yellow-400" height="h-3.5" delay={0.1} />
            </div>

            {/* Bar 2: Prior Actual Spend */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm sm:text-base font-mono">
                <span className="text-white/80">{content.priorActual}</span>
                <span className="text-white/80">₹42,351 {locale === 'ta' ? 'கோடி' : 'Cr'}</span>
              </div>
              <EduDataBar percentage={95.1} color="bg-charcoal-500" height="h-3.5" delay={0.2} />
            </div>
          </div>

          <div className="pt-4 border-t border-charcoal-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-xs sm:text-sm font-mono text-yellow-400 font-bold uppercase tracking-wider">
              ● {content.deltaLabel}
            </span>
            <span className="text-xs sm:text-sm text-white/50 font-mono">
              {locale === 'ta' ? 'உண்மையான தணிக்கை செய்யப்பட்ட செலவினத்தின் அடிப்படையில்' : 'Indexed against actual audited outlays'}
            </span>
          </div>
        </EduTopLineBox>
      ) : (
        /* Tab 2: Line Item Breakdown Table */
        <div className="overflow-x-auto border border-charcoal-700">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-charcoal-800 font-mono text-white/80 border-b border-charcoal-700">
              <tr>
                <th className="p-3.5 sm:p-4">{content.tableHeaders.category}</th>
                <th className="p-3.5 sm:p-4 whitespace-nowrap">{content.tableHeaders.allocation}</th>
                <th className="p-3.5 sm:p-4">{content.tableHeaders.purpose}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-700 bg-charcoal-900/60">
              {content.tableRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-charcoal-800/50 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-white">{row.cat}</td>
                  <td className="p-3.5 sm:p-4 font-mono text-yellow-400 font-bold whitespace-nowrap">
                    {row.val}
                  </td>
                  <td className="p-3.5 sm:p-4 text-white/70">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Supporting Methodology & Sourcing Note */}
      <EduReveal direction="fade" delay={0.1} className="pt-2 space-y-2 text-sm text-white/60 leading-relaxed border-t border-charcoal-800">
        <p>{content.accountingNote}</p>
        <p className="font-mono text-yellow-400/80">{content.citation}</p>
      </EduReveal>
    </div>
  );
}
