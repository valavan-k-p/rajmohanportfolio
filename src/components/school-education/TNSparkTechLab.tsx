'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import {
  EduReveal,
  EduCounter,
  EduTopLineBox,
  EduStaggerContainer,
  EduStaggerItem,
  CINEMATIC_EASE,
} from './EduMotion';

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
        'பிளாக் முறையிலான நிரலாக்கம் மற்றும் எளிய விளையாட்டு உருவாக்கம்',
        'செயற்கை நுண்ணறிவு முறைகள் மற்றும் தரவு அறிதல்',
        'டிஜிட்டல் பாதுகாப்பு, ஒழுக்கம் மற்றும் இணைய நன்னெறி',
        'அடிப்படை ரோபோடிக்ஸ் மற்றும் சென்சார்கள் இயக்கம்',
      ],
    },
    infrastructure: {
      en: 'Hi-Tech Computer Labs in middle schools, state high-speed broadband intranet connectivity.',
      ta: 'நடுநிலைப் பள்ளிகளில் ஹை-டெக் கணினி ஆய்வகங்கள் மற்றும் அதிவேக இணைய வசதி.',
    },
  },
  {
    id: 'tier-2',
    stage: { en: 'Phase 2: Applied Skills', ta: 'கட்டம் 2: நடைமுறைப் பயன்பாடு' },
    targetGrades: { en: 'Classes 9–10 (Secondary)', ta: '9 மற்றும் 10-ஆம் வகுப்புகள்' },
    statusTag: { en: 'Curriculum Framework Finalised', ta: 'பாடத்திட்டக் கட்டமைப்பு தயார்' },
    headline: {
      en: 'Applied Machine Learning & Python Foundations',
      ta: 'மெஷின் லேர்னிங் & பைதான் அடிப்படைப் பயிற்சி',
    },
    description: {
      en: 'Introduction to text-based coding in Python, structured data manipulation, and building simple ML predictive models for real-world scenarios.',
      ta: 'பைதான் நிரலாக்க மொழி, தரவு மேலாண்மை மற்றும் நிஜ வாழ்வியல் சிக்கல்களுக்கு ML தீர்வுகள் காணும் முறைகள்.',
    },
    modules: {
      en: [
        'Python syntax, loops, functions and arrays',
        'Data analysis with simple spreadsheets and charts',
        'Building basic image classifiers using open-source tools',
        'Responsible AI usage and societal impact analysis',
      ],
      ta: [
        'பைதான் குறியீட்டு முறை, மடக்குகள் (Loops) மற்றும் செயல்பாடுகள்',
        'தரவுப் பகுப்பாய்வு மற்றும் வரைபட விளக்கங்கள்',
        'ஓபன் சோர்ஸ் கருவிகள் மூலம் படங்களை அடையாளம் காணுதல்',
        'பொறுப்பான AI பயன்பாடு மற்றும் சமூகத் தாக்கம்',
      ],
    },
    infrastructure: {
      en: 'Upgraded computer terminals, student cloud workspaces, regional IT mentor support.',
      ta: 'மேம்படுத்தப்பட்ட கணினிகள், கிளவுட் சேமிப்பக வசதி மற்றும் மண்டல தொழில்நுட்ப வழிகாட்டிகள்.',
    },
  },
  {
    id: 'tier-3',
    stage: { en: 'Phase 3: Career Pathways', ta: 'கட்டம் 3: தொழில் வழிகாட்டல்' },
    targetGrades: { en: 'Classes 11–12 (Higher Secondary)', ta: '11 மற்றும் 12-ஆம் வகுப்புகள்' },
    statusTag: { en: 'Industry Linkages Planned', ta: 'தொழில்துறை கூட்டாண்மை' },
    headline: {
      en: 'Specialised Tech Electives & Industry Certifications',
      ta: 'சிறப்புத் தொழில்நுட்பத் தேர்வுகள் & சான்றிதழ்கள்',
    },
    description: {
      en: 'Advanced electives in data science, generative AI tools, web development, and direct linkages with Tamil Nadu tech industry internship tracks.',
      ta: 'டேட்டா சயின்ஸ், ஜெனரேட்டிவ் AI, இணையதள உருவாக்கம் மற்றும் தகவல் தொழில்நுட்ப நிறுவனங்களுடன் பயிற்சி வாய்ப்புகள்.',
    },
    modules: {
      en: [
        'Web technologies, APIs, and modern app building',
        'Applied Data Science & statistical visualisations',
        'Prompt engineering and GenAI productivity tools',
        'Capstone social-impact technology project',
      ],
      ta: [
        'இணைய தொழில்நுட்பங்கள் மற்றும் நவீன பயன்பாடுகள் (Apps)',
        'புள்ளிவிவரத் தரவு அறிவியல் மற்றும் திட்டங்கள்',
        'ஜெனரேட்டிவ் AI கருவிகள் மற்றும் உற்பத்தித் திறன்',
        'சமூக நலனுக்கான இறுதி ஆண்டு தொழில்நுட்பத் திட்டம்',
      ],
    },
    infrastructure: {
      en: 'State Data Centre virtual labs, industry-partnered mentorship, innovation hackathons.',
      ta: 'மாநில தரவு மைய மெய்நிகர் ஆய்வகங்கள், வழிகாட்டல் மற்றும் கண்டுபிடிப்புப் போட்டிகள்.',
    },
  },
];

export function TNSparkTechLab({ locale }: { locale: Locale }) {
  const [activeTierId, setActiveTierId] = useState<string>('tier-1');

  const content = {
    en: {
      badge: 'STATE AI ROADMAP · 2026–2030',
      headline: 'TN SPARK: Artificial Intelligence & Tech Lab Architecture',
      standfirst:
        'A comprehensive three-phase roadmap preparing over 5,000 government school students for the AI economy through hands-on computational thinking and digital literacy.',
      counterLabel: 'Target Government Schools',
      counterSub: 'Phase 1 Active Pilot Across Tamil Nadu',
      tabLabel: 'Implementation Roadmap',
    },
    ta: {
      badge: 'மாநில AI திட்ட வரைபடம் · 2026–2030',
      headline: 'டி.என் ஸ்பார்க்: செயற்கை நுண்ணறிவு & தொழில்நுட்ப ஆய்வகம்',
      standfirst:
        '5,000-க்கும் மேற்பட்ட அரசுப் பள்ளி மாணவர்களை எதிர்கால AI மற்றும் நவீன தொழில்நுட்ப உலகிற்கு தயார்படுத்தும் முக்கட்ட தொலைநோக்குத் திட்டம்.',
      counterLabel: 'முன்னோடி அரசுப் பள்ளிகள்',
      counterSub: 'கட்டம் 1 தமிழ்நாடு முழுவதும் செயல்பாட்டில்',
      tabLabel: 'திட்டப் படிநிலைகள்',
    },
  }[locale];

  const activeTier =
    ROADMAP_TIERS.find((t) => t.id === activeTierId) ?? ROADMAP_TIERS[0]!;

  return (
    <div className="space-y-8 max-w-[72rem] mx-auto">
      {/* Lead Text & Live Stat Counter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-sand-300 pb-8">
        <EduReveal direction="up" className="lg:col-span-8 space-y-2">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-maroon-700">
            {content.badge}
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
            {content.headline}
          </h3>
          <p className="text-charcoal-700 text-base leading-relaxed">
            {content.standfirst}
          </p>
        </EduReveal>

        <EduTopLineBox
          delay={0.1}
          direction="scale"
          topLineColor="bg-maroon-700"
          className="lg:col-span-4 p-5 bg-sand-100/80 border border-sand-300 rounded-sm"
        >
          <div className="font-display text-4xl text-maroon-700 tabular-nums font-light">
            ~<EduCounter value={5000} duration={1.6} />+
          </div>
          <div className="text-xs font-semibold text-charcoal-900 uppercase tracking-wider mt-1">
            {content.counterLabel}
          </div>
          <div className="text-xs text-charcoal-600 font-mono mt-0.5">
            {content.counterSub}
          </div>
        </EduTopLineBox>
      </div>

      {/* 3-Tier Roadmap Selector */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-sand-300 pb-3 text-sm">
        {ROADMAP_TIERS.map((tier) => {
          const isActive = tier.id === activeTierId;
          return (
            <button
              key={tier.id}
              onClick={() => setActiveTierId(tier.id)}
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
                  transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-maroon-700"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tier Details with Staggered Modules */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTier.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: CINEMATIC_EASE }}
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
              <EduStaggerContainer className="space-y-2" stagger={0.06}>
                {activeTier.modules[locale].map((mod, i) => (
                  <EduStaggerItem
                    key={i}
                    direction="left"
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
              direction="right"
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
