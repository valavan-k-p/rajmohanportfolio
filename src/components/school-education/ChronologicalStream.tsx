'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import {
  EduReveal,
  EduStaggerContainer,
  EduStaggerItem,
  EduHorizontalLine,
  CINEMATIC_EASE,
} from './EduMotion';

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
      ta: 'கோடை வெப்பத்திற்கேற்ப பள்ளி திறப்பு & 21 ஸ்மார்ட் போர்டுகள் பயன்பாடு',
    },
    desc: {
      en: 'Schools reopened with comprehensive water, ceiling fan, and structural stability audits. 21 new interactive smart boards were inaugurated across Chennai schools.',
      ta: 'கோடை வெப்பத் தணிப்பு ஆய்வுகளுக்குப் பின் பள்ளிகள் திறப்பு; சென்னையில் 21 புதிய ஸ்மார்ட் போர்டுகள் பயன்பாட்டுக்குத் திறக்கப்பட்டன.',
    },
    source: 'Careers360 & The News Mill',
  },
  {
    id: 'july-noc',
    date: '01 July 2026',
    category: 'governance',
    status: 'VERIFIED',
    title: {
      en: 'Launch of Online Portal for Private School NOCs',
      ta: 'தனியார் பள்ளிகளுக்கான இணையவழி NOC அனுமதி தளம் தொடக்கம்',
    },
    desc: {
      en: 'Transitioned all private school recognition, upgrades, and NOC approvals to a 100% digital transparent submission workflow to eradicate middlemen.',
      ta: 'இடைத்தரகர்களை முற்றிலும் அகற்றும் வகையில் தனியார் பள்ளிகளுக்கான அனைத்து அனுமதிகளும் இணையவழியாக்கப்பட்டன.',
    },
    source: 'New Indian Express (July 2026)',
  },
  {
    id: 'july-ai',
    date: '22 July 2026',
    category: 'curriculum',
    status: 'ACTIVE PILOT',
    title: {
      en: 'TN SPARK: Artificial Intelligence Roadmap for 5,000 Schools',
      ta: 'டி.என் ஸ்பார்க்: 5,000 பள்ளிகளில் AI கல்வி முன்னோடித் திட்டம்',
    },
    desc: {
      en: 'Minister Rajmohan charted the state AI roadmap, establishing foundational computational logic and ethics modules across 5,000 government schools.',
      ta: '5,000 அரசுப் பள்ளிகளில் செயற்கை நுண்ணறிவு மற்றும் நெறிமுறை தர்க்கம் கற்பிக்கும் முன்னோடித் திட்டம் அறிவிக்கப்பட்டது.',
    },
    source: 'New Indian Express (July 22, 2026)',
  },
  {
    id: 'aug-enrolment',
    date: '02 August 2026',
    category: 'welfare',
    status: 'ACTIVE POLICY',
    title: {
      en: '10-Student Reopening Guarantee & ₹44,527 Cr Budget Defence',
      ta: '10 மாணவர்கள் சேர்ந்தாலே பள்ளி இயங்கும் உத்தரவு & பட்ஜெட் விளக்கம்',
    },
    desc: {
      en: 'Guaranteed that low-enrolment rural schools will remain open with at least 10 students; delivered detailed Assembly accounting of the ₹44,527 Cr budget.',
      ta: '10 மாணவர்கள் சேர்ந்தாலே கிராமப்புறப் பள்ளிகள் தொடர்ந்து இயங்கும் என்ற உத்தரவு; சட்டமன்றத்தில் ₹44,527 கோடி கல்வி பட்ஜெட் விரிவான விளக்கம்.',
    },
    source: 'Dinamalar Kalvimalar & Legislative Assembly',
  },
  {
    id: 'aug-biryani',
    date: '10 August 2026',
    category: 'welfare',
    status: 'PROPOSAL / IN REVIEW',
    title: {
      en: 'Weekly Chicken Biryani in Mid-Day Meals Proposal',
      ta: 'மதிய உணவுத் திட்டத்தில் வாரம் ஒரு முறை சிக்கன் பிரியாணி முன்மொழிவு',
    },
    desc: {
      en: 'Minister Rajmohan placed an ambitious nutritional proposal under government consideration to introduce chicken biryani once weekly in school lunches.',
      ta: 'அரசுப் பள்ளி மாணவர்களின் ஊட்டச்சத்தை அதிகரிக்க வாரம் ஒரு முறை மதிய உணவில் சிக்கன் பிரியாணி வழங்கும் முன்மொழிவு அரசின் தீவிரப் பரிசீலனைக்கு வைக்கப்பட்டது.',
    },
    source: 'New Indian Express (August 10, 2026)',
  },
];

export function ChronologicalStream({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<'all' | 'curriculum' | 'governance' | 'welfare'>('all');

  const content = {
    en: {
      headline: 'Chronological Milestones & Executive Record (2026)',
      standfirst:
        'A comprehensive record of policy rollouts, curriculum releases, legislative briefings, and welfare reforms enacted under Minister Rajmohan Arumugam.',
      allTab: 'All Milestones (6)',
      curriculumTab: 'Curriculum & Pedagogy',
      governanceTab: 'Governance & NOC',
      welfareTab: 'Student Welfare',
      sourceSummary: 'Directly sourced from press releases, Assembly Hansard, and news reports.',
    },
    ta: {
      headline: 'கல்வித்துறை முக்கிய மைல்கற்கள் & காலவரிசை (2026)',
      standfirst:
        'அமைச்சர் ராஜ்மோகன் ஆறுமுகம் தலைமையில் செயல்படுத்தப்பட்ட புதிய பாடத்திட்டங்கள், அரசு கொள்கை முடிவுகள் மற்றும் நலத்திட்டங்களின் காலவரிசை ஆவணம்.',
      allTab: 'அனைத்து நிகழ்வுகள் (6)',
      curriculumTab: 'பாடத்திட்டம் & கல்வி',
      governanceTab: 'நிர்வாகம் & NOC',
      welfareTab: 'மாணவர் நலம்',
      sourceSummary: 'அரசு செய்திக் குறிப்புகள் மற்றும் சட்டமன்ற ஆவணங்களின் அடிப்படையில் தொகுக்கப்பட்டது.',
    },
  }[locale];

  const filteredNodes =
    filter === 'all'
      ? TIMELINE_NODES
      : TIMELINE_NODES.filter((node) => node.category === filter);

  return (
    <div className="space-y-8 max-w-[72rem] mx-auto">
      {/* Header with Mask Reveal */}
      <EduReveal direction="up" className="max-w-[48rem]">
        <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed mt-2">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-sand-300 pb-3 text-sm">
        <button
          onClick={() => setFilter('all')}
          className={`pb-1.5 transition-colors relative font-semibold ${
            filter === 'all'
              ? 'text-maroon-700'
              : 'text-charcoal-500 hover:text-charcoal-900'
          }`}
        >
          <span>{content.allTab}</span>
          {filter === 'all' && (
            <motion.div
              layoutId="activeTimelineLine"
              transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
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
              transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
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
              transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
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
              transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
              className="absolute bottom-0 inset-x-0 h-[2px] bg-maroon-700"
            />
          )}
        </button>
      </div>

      {/* Archival Timeline Stream with Progressive Left-to-Right Drawing Lines */}
      <EduStaggerContainer className="space-y-2" stagger={0.08}>
        <AnimatePresence mode="popLayout">
          {filteredNodes.map((node, idx) => (
            <EduStaggerItem
              key={node.id}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              showTopLine={true}
              topLineColor="bg-sand-300"
              className="pt-6 pb-2 grid grid-cols-1 md:grid-cols-[8rem_1fr] lg:grid-cols-[10rem_1fr_12rem] gap-4 lg:gap-8 items-baseline"
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
            </EduStaggerItem>
          ))}
        </AnimatePresence>
      </EduStaggerContainer>

      <div className="text-xs text-charcoal-500 font-mono pt-4 border-t border-sand-200">
        {content.sourceSummary}
      </div>
    </div>
  );
}
