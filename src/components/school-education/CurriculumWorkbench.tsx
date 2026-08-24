'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import {
  EduReveal,
  EduTopLineBox,
  EduStaggerContainer,
  EduStaggerItem,
  EduHorizontalLine,
  CINEMATIC_EASE,
} from './EduMotion';

interface SubjectModule {
  id: string;
  code: string;
  name: { en: string; ta: string };
  booksCount: number;
  tag: { en: string; ta: string };
  focus: { en: string; ta: string };
  activities: { en: string[]; ta: string[] };
  pedagogyShift: {
    before: { en: string; ta: string };
    after: { en: string; ta: string };
  };
}

const SUBJECT_MODULES: SubjectModule[] = [
  {
    id: 'tamil',
    code: 'TAM-101',
    name: { en: 'Tamil Language & Literature', ta: 'தமிழ் மொழி & இலக்கியம்' },
    booksCount: 3,
    tag: { en: 'Primary Core', ta: 'முதன்மைப் பாடம்' },
    focus: {
      en: 'Phonetic mastery, rich vocabulary building, storytelling, and natural mother-tongue articulation.',
      ta: 'ஒலிப்பு முறை பயிற்சி, சொல்வளம், கதை சொல்லுதல் மற்றும் தாய்மொழிப் பேச்சாற்றல் வளர்த்தல்.',
    },
    activities: {
      en: [
        'Interactive syllable puzzles and word-building cards',
        'Traditional children’s stories and moral dialogues',
        'Rhythmic recitation for correct phonetic pronunciation',
        'Visual vocabulary flashboards with real-world objects',
      ],
      ta: [
        'எழுத்துப் புதிர் விளையாட்டுகள் மற்றும் சொல் உருவாக்க அட்டைகள்',
        'நீதிக் கதைகள் மற்றும் கலந்துரையாடல் பயிற்சிகள்',
        'சரியான உச்சரிப்பிற்கான சந்தப் பாடல்கள்',
        'படங்கள் வழியே புதிய சொற்களைக் கற்கும் முறை',
      ],
    },
    pedagogyShift: {
      before: {
        en: 'Mechanical copying and memorising long paragraph answers without conceptual understanding.',
        ta: 'பொருளுணராமல் பெரிய பத்திகளை மனப்பாடம் செய்து எழுதுதல்.',
      },
      after: {
        en: 'Activity-based pronunciation drills, conversational practice, and creative story formation.',
        ta: 'செயல்வழிக் கற்றல், பேச்சுப் பயிற்சி மற்றும் சொந்தமாக கதை உருவாக்கும் திறன்.',
      },
    },
  },
  {
    id: 'english',
    code: 'ENG-102',
    name: { en: 'English Communication & Phonics', ta: 'ஆங்கிலத் தொடர்பு & ஒலிப்பியல்' },
    booksCount: 3,
    tag: { en: 'Language Core', ta: 'மொழித் திறன்' },
    focus: {
      en: 'Foundational listening comprehension, phonics-based reading, and conversational confidence.',
      ta: 'கேட்டறிதல் திறன், ஒலிப்பியல் முறையிலான வாசிப்பு மற்றும் தன்னம்பிக்கையுடன் உரையாடுதல்.',
    },
    activities: {
      en: [
        'Phonetic sound matching and letter blend exercises',
        'Everyday conversational roleplay (greetings, classroom objects)',
        'Picture-word association worksheets',
        'Guided reading with illustrated mini-storybooks',
      ],
      ta: [
        'ஒலிப்பு முறை எழுத்து இணைத்தல் பயிற்சிகள்',
        'வகுப்பறை எளிய உரையாடல் மற்றும் நாடகப் பயிற்சிகள்',
        'படம் பார்த்து சொல் அறியும் பயிற்சிகள்',
        'வண்ணப் படக் கதைப் புத்தகங்கள் வாசித்தல்',
      ],
    },
    pedagogyShift: {
      before: {
        en: 'Rote spelling drills and grammar rules memorisation without spoken practice.',
        ta: 'பேச்சுப் பயிற்சியின்றி இலக்கண விதிகளையும் எழுத்துக்களையும் மனப்பாடம் செய்தல்.',
      },
      after: {
        en: 'Natural listening-speaking-reading workflow with joyful audio-visual aids.',
        ta: 'கேட்டல்-பேசுதல்-வாசித்தல் வழியிலான எளிய மற்றும் இனிமையான கற்றல் முறை.',
      },
    },
  },
  {
    id: 'maths',
    code: 'MTH-103',
    name: { en: 'Foundational Mathematics', ta: 'அடிப்படை கணிதம் & எண்கற்றல்' },
    booksCount: 3,
    tag: { en: 'Numeracy Core', ta: 'எண்ணறிவுத் திறன்' },
    focus: {
      en: 'Concrete number sense, basic arithmetic operations, spatial awareness, and problem solving.',
      ta: 'எண்ணறிவு, கூட்டல்-கழித்தல் அடிப்படைகள், வடிவங்கள் மற்றும் எளிய கணக்கீட்டுத் திறன்.',
    },
    activities: {
      en: [
        'Manipulative counting beads, abacus rods, and shapes',
        'Basic addition/subtraction games using daily objects',
        'Pattern recognition and size/weight comparison tasks',
        'Simple measurement activities with real classroom items',
      ],
      ta: [
        'எண்ணிக்கை மணிகள், மணிச்சட்டம் மற்றும் வடிவப் பொருட்கள்',
        'தினசரி பொருட்களைக் கொண்டு கூட்டல்-கழித்தல் விளையாட்டுகள்',
        'வடிவங்கள் மற்றும் அளவு ஒப்பீட்டுப் பயிற்சிகள்',
        'வகுப்பறைப் பொருட்களைக் கொண்டு அளவீடு செய்தல்',
      ],
    },
    pedagogyShift: {
      before: {
        en: 'Abstract formula memorisation and repetitive blackboard copy exercises.',
        ta: 'விளக்கமின்றி கரும்பலகையில் உள்ள கணக்குகளைப் பார்த்து எழுதுதல்.',
      },
      after: {
        en: 'Hands-on manipulative math kits and contextual daily-life problem solving.',
        ta: 'கணித உபகரணங்கள் மற்றும் அன்றாட வாழ்வியல் சூழல்களோடு இணைத்துக் கற்றல்.',
      },
    },
  },
];

export function CurriculumWorkbench({ locale }: { locale: Locale }) {
  const [activeSubjectId, setActiveSubjectId] = useState<string>('tamil');

  const content = {
    en: {
      headline: 'Foundational Pedagogy & Revised Textbooks',
      standfirst:
        'Nine completely overhauled activity-based textbooks for Classes 1 to 3, moving away from rote memorisation to nurture motor skills, cognitive curiosity, and foundational literacy.',
      subjectsTab: 'Core Subject Areas',
      activitiesLabel: 'Prescribed Activity Modules',
      pedagogyLabel: 'Pedagogical Transformation',
      previousMethod: 'Prior Rote Approach',
      newStandard: '2026 Activity-Based Standard',
      booksSummary: 'Total: 9 Revised Activity Textbooks for Classes 1–3',
    },
    ta: {
      headline: 'தொடக்கக் கல்வி & புதிய செயல்வழிப் பாடநூல்கள்',
      standfirst:
        '1 முதல் 3-ஆம் வகுப்புகளுக்கான 9 புதிய செயல்வழிப் பாடநூல்கள் — மனப்பாட முறையை நீக்கி, குழந்தைகளின் சிந்தனை, செயல் மற்றும் மொழித் திறனை வளர்க்கும் நவீன அணுகுமுறை.',
      subjectsTab: 'பாடப்பிரிவுகள்',
      activitiesLabel: 'செயல்வழிக் கற்றல் பயிற்சிகள்',
      pedagogyLabel: 'கற்பித்தல் முறை மாற்றம்',
      previousMethod: 'பழைய மனப்பாட முறை',
      newStandard: '2026 செயல்வழிக் கற்றல் தரம்',
      booksSummary: 'மொத்தம்: 1-3 வகுப்புகளுக்கான 9 புதிய பாடநூல்கள்',
    },
  }[locale];

  const activeSubject =
    SUBJECT_MODULES.find((s) => s.id === activeSubjectId) ?? SUBJECT_MODULES[0]!;

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

      {/* Minimal Subject Tabs */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-sand-300 pb-3 text-sm">
        {SUBJECT_MODULES.map((subject) => {
          const isActive = subject.id === activeSubjectId;
          return (
            <button
              key={subject.id}
              onClick={() => setActiveSubjectId(subject.id)}
              className={`pb-2 transition-colors relative font-medium ${
                isActive
                  ? 'text-maroon-700 font-semibold'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <span>{subject.name[locale]}</span>
              {isActive && (
                <motion.div
                  layoutId="activeSubjectLine"
                  transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-maroon-700"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Subject Content - Split 2-Column Reveal (Left from Left, Right from Right) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubject.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: CINEMATIC_EASE }}
          className="pt-2 space-y-8"
        >
          {/* Header & Focus */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-sand-200 pb-4">
            <div>
              <div className="text-xs font-mono text-charcoal-500 uppercase">
                {activeSubject.code} · {activeSubject.booksCount} {locale === 'ta' ? 'பாடநூல்கள்' : 'Volume(s)'}
              </div>
              <h4 className="font-display text-2xl text-charcoal-900 font-semibold mt-1">
                {activeSubject.name[locale]}
              </h4>
            </div>
            <p className="text-sm text-charcoal-700 max-w-[32rem]">
              {activeSubject.focus[locale]}
            </p>
          </div>

          {/* 2-Column Editorial Grid: Left Split from Left, Right Split from Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 6 Cols: Progressive Activity List Typesetting */}
            <EduReveal direction="left" delay={0.05} className="lg:col-span-6 space-y-4">
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-maroon-700">
                {content.activitiesLabel}
              </h5>
              <EduHorizontalLine color="bg-sand-200" duration={0.5} />
              <EduStaggerContainer className="space-y-2" stagger={0.06}>
                {activeSubject.activities[locale].map((act, i) => (
                  <EduStaggerItem
                    key={i}
                    direction="left"
                    showTopLine={true}
                    topLineColor="bg-sand-200"
                    className="pt-2.5 text-sm text-charcoal-800 flex items-start gap-2.5"
                  >
                    <span className="text-maroon-700 font-bold leading-none mt-1">›</span>
                    <span>{act}</span>
                  </EduStaggerItem>
                ))}
              </EduStaggerContainer>
            </EduReveal>

            {/* Right 6 Cols: Side-by-Side Comparison with Top-Line Accent Boxes */}
            <EduReveal direction="right" delay={0.1} className="lg:col-span-6 space-y-4">
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-maroon-700">
                {locale === 'ta' ? 'கற்பித்தல் முறை ஒப்பீடு' : 'Pedagogy Shift'}
              </h5>
              <EduHorizontalLine color="bg-sand-200" duration={0.5} />

              <div className="space-y-3">
                <EduTopLineBox
                  delay={0.06}
                  direction="right"
                  topLineColor="bg-charcoal-400"
                  className="p-4 bg-sand-100/60 border border-sand-200 space-y-1 rounded-xs"
                >
                  <div className="text-xs font-mono text-charcoal-600 font-semibold uppercase">
                    {content.previousMethod}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    {activeSubject.pedagogyShift.before[locale]}
                  </p>
                </EduTopLineBox>

                <EduTopLineBox
                  delay={0.14}
                  direction="right"
                  topLineColor="bg-maroon-700"
                  className="p-4 bg-white border border-sand-300 shadow-sm space-y-1 rounded-xs"
                >
                  <div className="text-xs font-mono text-maroon-700 font-bold uppercase">
                    {content.newStandard}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-900 font-medium leading-relaxed">
                    {activeSubject.pedagogyShift.after[locale]}
                  </p>
                </EduTopLineBox>
              </div>
            </EduReveal>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
