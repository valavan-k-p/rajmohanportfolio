'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import { EduReveal } from './EduMotion';

interface TimelineNode {
  id: string;
  date: string;
  category: 'curriculum' | 'governance' | 'welfare';
  status: string;
  title: { en: string; ta: string };
  desc: { en: string; ta: string };
  source: string;
}

const TIMELINE_NODES: TimelineNode[] = [
  {
    id: 'may-textbooks',
    date: '19 May 2026',
    category: 'curriculum',
    status: 'VERIFIED',
    title: {
      en: '9 Revised Primary Textbooks & Two-Language Guarantee',
      ta: '1-3 வகுப்புகளுக்கான 9 புதிய பாடநூல்கள் வெளியீடு & இருமொழிக் கொள்கை',
    },
    desc: {
      en: 'Minister Rajmohan released nine activity-rich textbooks for Classes 1–3 to reduce rote memorisation and nurture motor development, while reaffirming Tamil Nadu’s historic two-language policy.',
      ta: 'மனப்பாடக் கல்வியைக் குறைத்து செயல்வழிக் கற்றலை ஊக்குவிக்கும் 9 புதிய பாடநூல்கள் வெளியீடு; இருமொழிக் கொள்கையில் உறுதியான நிலைப்பாடு அறிவிப்பு.',
    },
    source: 'The Hindu & New Indian Express',
  },
  {
    id: 'june-reopen',
    date: '04 June 2026',
    category: 'governance',
    status: 'VERIFIED',
    title: {
      en: 'Heatwave-Adjusted School Reopening & 21 Smart Boards',
      ta: 'கோடை வெப்பத்திற்கேற்ப பள்ளி திறப்பு மாற்றம் & 21 ஸ்மார்ட் போர்டுகள்',
    },
    desc: {
      en: 'Following intense summer heat, schools reopened with verified drinking water and sanitation audits. Inaugurated 21 smart boards in Chennai.',
      ta: 'குடிநீர், கழிப்பறை ஆய்வுகளுடன் பள்ளிகள் திறப்பு; சென்னையில் 21 ஸ்மார்ட் போர்டுகள் பயன்பாட்டிற்கு வந்தன.',
    },
    source: 'Careers360 & The News Mill',
  },
  {
    id: 'june-noc',
    date: '17 June 2026',
    category: 'governance',
    status: 'OFFICIAL ORDER',
    title: {
      en: 'Online NOC and Private School Recognition Portal',
      ta: 'தனியார் பள்ளிகளுக்கான இணையவழி NOC & அங்கீகார முறை',
    },
    desc: {
      en: 'Transitioned private school recognition-renewal and NOC applications to a fully digital platform from July 1, 2026, eliminating intermediaries.',
      ta: 'இடைத்தரகர்களையும் லஞ்சத்தையும் தவிர்க்க ஜூலை 1 முதல் இணையவழி அனுமதி முறை அறிவிக்கப்பட்டது.',
    },
    source: 'New Indian Express',
  },
  {
    id: 'july-visitors',
    date: '10 July 2026',
    category: 'welfare',
    status: 'OFFICIAL ORDER',
    title: {
      en: 'School Campus Visitor & Neutrality Guidelines',
      ta: 'பள்ளி வளாகப் பார்வையாளர்கள் ஒழுங்குமுறை நெறிமுறை',
    },
    desc: {
      en: 'Restricted political party events and unauthorized visitor access to maintain instructional sanctuary and student safety.',
      ta: 'அரசியல் தலையீடுகளற்ற அமைதியான கற்றல் சூழலை உறுதி செய்ய பார்வையாளர்கள் கட்டுப்பாடு.',
    },
    source: 'New Indian Express',
  },
  {
    id: 'july-spark',
    date: '22 July 2026',
    category: 'curriculum',
    status: 'PILOT DEPLOYMENT',
    title: {
      en: 'TN SPARK AI & Emerging Technologies Roadmap',
      ta: 'டி.என் ஸ்பார்க் AI & தொழில்நுட்பக் கல்வி வரைபடம்',
    },
    desc: {
      en: 'Published multi-tier roadmap scaling AI and coding curriculum from 5,000 pilot schools to high-school coding labs.',
      ta: '5,000 பள்ளிகளில் முன்னோடித் திட்டம்; உயர் வகுப்புகளுக்கு கோடிங் கல்வி விரிவு வரைபடம் வெளியீடு.',
    },
    source: 'New Indian Express',
  },
  {
    id: 'aug-neet-cases',
    date: 'August 2026',
    category: 'welfare',
    status: 'LEGISLATIVE ASSURANCE',
    title: {
      en: 'Withdrawal of NEET Cases & 10-Student Reopening Rule',
      ta: 'நீட் வழக்குகள் வாபஸ் & 10 மாணவர்கள் சேர்ந்தால் பள்ளிகள் திறப்பு',
    },
    desc: {
      en: 'Withdrew criminal cases against student protesters and established legislative rule to reopen closed schools with 10 students.',
      ta: 'மாணவர்கள் மீதான வழக்குகள் வாபஸ் மற்றும் குறைந்த சேர்க்கை அரசுப் பள்ளிகள் மறுதிறப்பு உத்தரவு.',
    },
    source: 'The Hindu & Dinamalar Kalvimalar',
  },
];

export function ChronologicalStream({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<'all' | 'curriculum' | 'governance' | 'welfare'>('all');

  const filteredNodes =
    filter === 'all'
      ? TIMELINE_NODES
      : TIMELINE_NODES.filter((n) => n.category === filter);

  const content = {
    en: {
      headline: 'Chronological Milestones & Governance Record',
      standfirst:
        'A documented record of official actions, legislative statements, and policy implementations since assuming office in May 2026.',
      allTab: 'All Milestones',
      curriculumTab: 'Curriculum & Tech',
      governanceTab: 'Governance & Infrastructure',
      welfareTab: 'Student Welfare & Legal',
      sourceSummary: 'Verified against The Hindu, New Indian Express, Careers360, and Dinamalar.',
    },
    ta: {
      headline: 'காலவரிசை நிகழ்வுகள் & நிர்வாகப் பதிவு',
      standfirst:
        'மே 2026 முதல் மேற்கொள்ளப்பட்ட அரசு முடிவுகள், அறிவிப்புகள் மற்றும் சட்டமன்றச் செயல்பாடுகளின் அதிகாரப்பூர்வ பதிவு.',
      allTab: 'அனைத்து நிகழ்வுகள்',
      curriculumTab: 'பாடத்திட்டம் & தொழில்நுட்பம்',
      governanceTab: 'நிர்வாகம் & உள்கட்டமைப்பு',
      welfareTab: 'மாணவர் நலம் & சட்டம்',
      sourceSummary: 'தி இந்து, நியூ இந்தியன் எக்ஸ்பிரஸ், தினமலர் மற்றும் கேரியர்ஸ்360 செய்திகளின் அடிப்படையில் சரிபார்க்கப்பட்டது.',
    },
  }[locale];

  return (
    <div className="space-y-8 max-w-[72rem] mx-auto">
      {/* Header */}
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed mt-2">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-sand-300 pb-3 text-sm font-mono">
        <button
          onClick={() => setFilter('all')}
          className={`pb-1.5 transition-colors relative font-semibold ${
            filter === 'all'
              ? 'text-maroon-700'
              : 'text-charcoal-500 hover:text-charcoal-900'
          }`}
        >
          <span>{content.allTab} ({TIMELINE_NODES.length})</span>
          {filter === 'all' && (
            <motion.div
              layoutId="activeTimelineLine"
              className="absolute bottom-0 inset-x-0 h-[2px] bg-maroon-700"
            />
          )}
        </button>
        <button
          onClick={() => setFilter('curriculum')}
          className={`pb-1.5 transition-colors relative font-semibold ${
            filter === 'curriculum'
              ? 'text-maroon-700'
              : 'text-charcoal-500 hover:text-charcoal-900'
          }`}
        >
          <span>{content.curriculumTab}</span>
          {filter === 'curriculum' && (
            <motion.div
              layoutId="activeTimelineLine"
              className="absolute bottom-0 inset-x-0 h-[2px] bg-maroon-700"
            />
          )}
        </button>
        <button
          onClick={() => setFilter('governance')}
          className={`pb-1.5 transition-colors relative font-semibold ${
            filter === 'governance'
              ? 'text-maroon-700'
              : 'text-charcoal-500 hover:text-charcoal-900'
          }`}
        >
          <span>{content.governanceTab}</span>
          {filter === 'governance' && (
            <motion.div
              layoutId="activeTimelineLine"
              className="absolute bottom-0 inset-x-0 h-[2px] bg-maroon-700"
            />
          )}
        </button>
        <button
          onClick={() => setFilter('welfare')}
          className={`pb-1.5 transition-colors relative font-semibold ${
            filter === 'welfare'
              ? 'text-maroon-700'
              : 'text-charcoal-500 hover:text-charcoal-900'
          }`}
        >
          <span>{content.welfareTab}</span>
          {filter === 'welfare' && (
            <motion.div
              layoutId="activeTimelineLine"
              className="absolute bottom-0 inset-x-0 h-[2px] bg-maroon-700"
            />
          )}
        </button>
      </div>

      {/* Minimalist Timeline Stream with Clean Hairlines */}
      <div className="space-y-6 divide-y divide-sand-200">
        <AnimatePresence>
          {filteredNodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="pt-6 first:pt-0 grid grid-cols-1 md:grid-cols-[8rem_1fr] lg:grid-cols-[10rem_1fr_12rem] gap-4 lg:gap-8 items-baseline"
            >
              {/* Date */}
              <div className="font-mono text-sm text-maroon-700 font-bold">
                {node.date}
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h4 className="font-display text-xl text-charcoal-900 font-semibold leading-snug">
                  {node.title[locale]}
                </h4>
                <p className="text-charcoal-700 text-sm leading-relaxed max-w-[46rem]">
                  {node.desc[locale]}
                </p>
                <div className="text-xs text-charcoal-500 font-mono">
                  Source: {node.source}
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right lg:text-right">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-800">
                  ● {node.status}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="text-xs text-charcoal-500 font-mono pt-4 border-t border-sand-200">
        {content.sourceSummary}
      </div>
    </div>
  );
}
