'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import { EduReveal, EduCounter, EduTopLineBox, EduStaggerContainer, EduStaggerItem } from './EduMotion';

interface RoadmapTier {
  id: string;
  stage: { en: string; ta: string };
  targetGrades: { en: string; ta: string };
  statusTag: { en: string; ta: string };
  headline: { en: string; ta: string };
  description: { en: string; ta: string };
  modules: { en: string[]; ta: string[] };
  infrastructure: { en: string; ta: string };
}

const ROADMAP_TIERS: RoadmapTier[] = [
  {
    id: 'tier-1',
    stage: { en: 'Phase 1: Pilot Deployment', ta: 'கட்டம் 1: முன்னோடித் திட்டம்' },
    targetGrades: { en: 'Classes 6–8 (Middle School)', ta: '6 முதல் 8-ஆம் வகுப்புகள்' },
    statusTag: { en: '~5,000 Schools Active Pilot', ta: '~5,000 பள்ளிகளில் முன்னோடி' },
    headline: {
      en: 'Foundational AI Literacy & Computational Logic',
      ta: 'அடிப்படை AI அறிவு & கணக்கீட்டுத் தர்க்கம்',
    },
    description: {
      en: 'Piloting beginner-friendly artificial intelligence concepts, algorithmic problem solving, and digital citizenship across ~5,000 government schools.',
      ta: '5,000 அரசுப் பள்ளிகளில் செயற்கை நுண்ணறிவு, நெறிமுறை தர்க்கம் மற்றும் டிஜிட்டல் குடியுரிமை பற்றிய அடிப்படைப் பாடங்கள்.',
    },
    modules: {
      en: [
        'Visual block-based logic and game design',
        'How AI models recognise patterns, text & images',
        'Digital safety, ethics, and cyber-hygiene',
        'Introductory robotics and sensory input basics',
      ],
      ta: [
        'பிளாக் அடிப்படையிலான எளிய கோடிங் & விளையாட்டு வடிவமைப்பு',
        'படங்களையும் சொற்களையும் AI எவ்வாறு உணர்கிறது',
        'டிஜிட்டல் பாதுகாப்பு & இணைய ஒழுங்குமுறைகள்',
        'அடிப்படை ரோபோடிக்ஸ் & சென்சார் உணர்விகள்',
      ],
    },
    infrastructure: {
      en: 'Utilising existing school Hi-Tech computer labs & interactive smart boards.',
      ta: 'அரசுப் பள்ளி ஹை-டெக் கணினி ஆய்வகங்கள் & ஸ்மார்ட் போர்டுகள் பயன்பாடு.',
    },
  },
  {
    id: 'tier-2',
    stage: { en: 'Phase 2: High School Scaling', ta: 'கட்டம் 2: உயர்நிலைப் பள்ளி விரிவாக்கம்' },
    targetGrades: { en: 'Classes 9 & 10 (Secondary)', ta: '9 மற்றும் 10-ஆம் வகுப்புகள்' },
    statusTag: { en: 'Curriculum Finalised', ta: 'வரைபடம் தயார்' },
    headline: {
      en: 'Applied Programming, Web Logic & Data Structures',
      ta: 'செயல்முறை நிரலாக்கம், இணையம் & தரவுக் கட்டமைப்பு',
    },
    description: {
      en: 'Progressing from visual blocks to text-based code (Python & Web technologies), teaching data manipulation and scientific problem solving.',
      ta: 'பைதான் (Python) மற்றும் இணைய நிரலாக்கம் மூலம் தரவு கையாளுதல் மற்றும் அறிவியல் கணக்கீட்டுப் பயிற்சிகள்.',
    },
    modules: {
      en: [
        'Python programming syntax and logic structures',
        'Data analysis with simple tabular datasets',
        'Responsive web page structuring (HTML/CSS)',
        'Prompt engineering and ethical AI collaboration',
      ],
      ta: [
        'பைதான் நிரலாக்க தொடரியல் & நிபந்தனை தர்க்கங்கள்',
        'எளிய தரவுப் பகுப்பாய்வு மற்றும் வரைபடங்கள்',
        'இணையப் பக்க வடிவமைப்பு அடிப்படைகள் (HTML/CSS)',
        'AI வழிநடத்துதல் & செயற்கை நுண்ணறிவு நெறிமுறைகள்',
      ],
    },
    infrastructure: {
      en: 'High-speed broadband connectivity upgrades & dedicated teacher mentors.',
      ta: 'அதிவேக இணைய இணைப்பு மற்றும் சிறப்பு ஆசிரியர் வழிகாட்டிகள்.',
    },
  },
  {
    id: 'tier-3',
    stage: { en: 'Phase 3: Career Specialisation', ta: 'கட்டம் 3: தொழில்முறை சிறப்புத் தகுதி' },
    targetGrades: { en: 'Classes 11 & 12 (Higher Secondary)', ta: '11 மற்றும் 12-ஆம் வகுப்புகள்' },
    statusTag: { en: 'Roadmap Target', ta: 'எதிர்காலத் திட்டம்' },
    headline: {
      en: 'Machine Learning, Automation & Industry Prep',
      ta: 'மெஷின் லேர்னிங், ஆட்டோமேஷன் & தொழில் தயார்நிலை',
    },
    description: {
      en: 'Equipping senior students with applied computer science projects, machine learning models, and career-ready digital credentials.',
      ta: 'மேல்நிலை மாணவர்களுக்கு செயற்கை நுண்ணறிவு மாதிரி திட்டங்கள் மற்றும் வேலைவாய்ப்புக்கான டிஜிட்டல் சான்றிதழ்கள்.',
    },
    modules: {
      en: [
        'Machine learning algorithms & predictive models',
        'Database management & SQL data querying',
        'Capstone open-source civic technology projects',
        'Higher-education STEM entrance alignment',
      ],
      ta: [
        'மெஷின் லேர்னிங் அல்காரிதம்கள் & கணிப்பு மாதிரிகள்',
        'தரவுத்தள மேலாண்மை & SQL வினவல் பயிற்சிகள்',
        'சமூகப் பயன்பாட்டு டிஜிட்டல் திட்டங்கள் (Capstone Projects)',
        'உயர்கல்வி STEM நுழைவுத்தேர்வுக்கான தயார்நிலை',
      ],
    },
    infrastructure: {
      en: 'Advanced GPU cloud lab access and industry mentorships.',
      ta: 'கிளவுட் ஆய்வக அணுகல் மற்றும் தொழில்முறை வழிகாட்டல்.',
    },
  },
];

export function TNSparkTechLab({ locale }: { locale: Locale }) {
  const [activeTier, setActiveTier] = useState<RoadmapTier>(ROADMAP_TIERS[0]!);

  const content = {
    en: {
      headline: 'TN SPARK — AI & Emerging Technologies Roadmap',
      standfirst:
        'A multi-tier curriculum roadmap democratising artificial intelligence, coding, and computational thinking across Tamil Nadu government schools.',
      pilotMetric: '5,000 Schools',
      pilotSub: 'Active Pilot Deployment',
    },
    ta: {
      headline: 'டி.என் ஸ்பார்க் — AI & நவீன தொழில்நுட்பக் கல்வி',
      standfirst:
        'அரசுப் பள்ளி மாணவர்களுக்கு செயற்கை நுண்ணறிவு, நிரலாக்கம் (Coding) மற்றும் தொழில்நுட்ப அறிவை வழங்கும் பல கட்டத் திட்டம்.',
      pilotMetric: '5,000 பள்ளிகள்',
      pilotSub: 'முன்னோடித் திட்டச் செயல்பாடு',
    },
  }[locale];

  return (
    <div className="space-y-8 max-w-[72rem] mx-auto">
      {/* Header & Metric */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-sand-300 pb-4">
        <EduReveal className="max-w-[44rem]">
          <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
            {content.headline}
          </h3>
          <p className="text-charcoal-700 text-base leading-relaxed mt-1.5">
            {content.standfirst}
          </p>
        </EduReveal>

        <div className="text-right">
          <div className="font-display text-3xl text-charcoal-900 tabular-nums font-light">
            <EduCounter value={5000} duration={1.4} />{' '}
            <span className="text-sm font-sans text-maroon-700 font-semibold uppercase">
              {locale === 'ta' ? 'பள்ளிகள்' : 'Schools'}
            </span>
          </div>
          <div className="text-xs text-charcoal-500 font-mono">
            {content.pilotSub}
          </div>
        </div>
      </div>

      {/* Minimal Tier Selector Tabs */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-sand-300 pb-3 text-sm">
        {ROADMAP_TIERS.map((tier) => {
          const isActive = activeTier.id === tier.id;
          return (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier)}
              className={`pb-2 transition-colors relative font-medium ${
                isActive
                  ? 'text-maroon-700 font-semibold'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <span>{tier.stage[locale]}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTierLine"
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-maroon-700"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tier Content Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTier.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="pt-2 space-y-6"
        >
          <div className="border-b border-sand-200 pb-4">
            <div className="text-xs font-mono text-charcoal-500 uppercase">
              {activeTier.targetGrades[locale]} · {activeTier.statusTag[locale]}
            </div>
            <h4 className="font-display text-2xl text-charcoal-900 font-semibold mt-1">
              {activeTier.headline[locale]}
            </h4>
            <p className="text-charcoal-700 text-base leading-relaxed mt-2 max-w-[46rem]">
              {activeTier.description[locale]}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Modules with Staggered Pop In */}
            <div className="lg:col-span-7 space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-maroon-700">
                {locale === 'ta' ? 'பாடத்திட்ட முக்கியத் தொகுதிகள்' : 'Core Curriculum Modules'}
              </h5>
              <EduStaggerContainer className="space-y-2">
                {activeTier.modules[locale].map((mod, i) => (
                  <EduStaggerItem
                    key={i}
                    showTopLine={true}
                    topLineColor="bg-sand-200"
                    className="pt-2 text-sm text-charcoal-800 flex items-start gap-2.5"
                  >
                    <span className="text-maroon-700 font-bold leading-none mt-1">›</span>
                    <span>{mod}</span>
                  </EduStaggerItem>
                ))}
              </EduStaggerContainer>
            </div>

            {/* Right 5 Cols: Infrastructure Box with Top Line */}
            <EduTopLineBox
              delay={0.1}
              topLineColor="bg-maroon-700"
              className="lg:col-span-5 space-y-3 p-5 bg-white border border-sand-300 shadow-sm rounded-xs"
            >
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-maroon-700">
                {locale === 'ta' ? 'உள்கட்டமைப்பு & ஆய்வகத் தயார்நிலை' : 'Infrastructure Prerequisite'}
              </h5>
              <p className="text-sm text-charcoal-800 leading-relaxed">
                {activeTier.infrastructure[locale]}
              </p>
              <div className="text-xs font-mono text-emerald-800 font-medium pt-2 border-t border-sand-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>State Hi-Tech Computer Lab Connectivity</span>
              </div>
            </EduTopLineBox>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
