'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import { EduReveal } from './EduMotion';

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
      ta: 'ஒலிப்பு முறை, சொல்வளம், கதை சொல்லுதல் மற்றும் இயல்பான தாய்மொழிப் பேச்சுத் திறன்.',
    },
    activities: {
      en: [
        'Picture-word association cards and tactile letter-tracing',
        'Rhyme, rhythm, and oral storytelling circles',
        'Expressive dialogue and classroom roleplay',
      ],
      ta: [
        'படம்-சொல் தொடர்பு அட்டைகள் மற்றும் எழுத்து வரைதல்',
        'பாடல், தாளம் மற்றும் கதை சொல்லும் வட்டங்கள்',
        'இயல்பான உரையாடல் மற்றும் நாடகப் பயிற்சிகள்',
      ],
    },
    pedagogyShift: {
      before: {
        en: 'Repetitive alphabet memorisation and mechanical copy-work.',
        ta: 'எழுத்துகளை மீண்டும் மீண்டும் மனப்பாடம் செய்து எழுதுதல்.',
      },
      after: {
        en: 'Contextual phonetic recognition through illustrated songs and daily conversation.',
        ta: 'படப் பாடல்கள் மற்றும் உரையாடல்கள் வழியாக இயல்பாக எழுத்துகளை அடையாளம் காணுதல்.',
      },
    },
  },
  {
    id: 'english',
    code: 'ENG-102',
    name: { en: 'English Communication & Phonics', ta: 'ஆங்கிலத் தொடர்பு & ஒலிப்பியல்' },
    booksCount: 2,
    tag: { en: 'Language Core', ta: 'மொழிப் பாடம்' },
    focus: {
      en: 'Foundational listening comprehension, phonics, simple conversational patterns, and early vocabulary.',
      ta: 'கேட்டல் திறன், எளிய ஆங்கில உரையாடல்கள் மற்றும் அடிப்படை சொல்வளம்.',
    },
    activities: {
      en: [
        'Audio-guided phonics and interactive call-and-response',
        'Illustrated sight-word flashcards and everyday object hunts',
        'Basic conversational dialogue building speaking confidence',
      ],
      ta: [
        'ஒலி வழிகாட்டல் மற்றும் எளிய உரையாடல் பயிற்சிகள்',
        'பட அட்டைகள் மூலம் பார்வைச் சொற்கள் அறிதல்',
        'அன்றாடப் பேச்சு வழியிலான தன்னம்பிக்கை வளர்ப்பு',
      ],
    },
    pedagogyShift: {
      before: {
        en: 'Rote spelling drills without conversational context or auditory comprehension.',
        ta: 'உரையாடல் பயிற்சியின்றி வெறும் எழுத்துக் கூட்டல் மனப்பாடம்.',
      },
      after: {
        en: 'Audio-guided phonics and experiential dialogue building natural speaking confidence.',
        ta: 'ஒலி வழிகாட்டல் மற்றும் அன்றாடப் பேச்சு வழியிலான தன்னம்பிக்கை வளர்ப்பு.',
      },
    },
  },
  {
    id: 'maths',
    code: 'MAT-103',
    name: { en: 'Foundational Mathematics & Logic', ta: 'அடிப்படை கணிதம் & தர்க்கம்' },
    booksCount: 2,
    tag: { en: 'Numeracy & Logic', ta: 'எண்ணறிவு & தர்க்கம்' },
    focus: {
      en: 'Number sense, spatial awareness, basic measurement, pattern recognition, and tactile problem-solving.',
      ta: 'எண்ணறிவு, வடிவியல் புரிதல், வடிவமைப்பு அடையாளம் மற்றும் தொட்டுணரும் கணக்குப் பயிற்சிகள்.',
    },
    activities: {
      en: [
        'Abacus and counter-bead counting modules',
        'Shape sorting and symmetry exploration with classroom objects',
        'Visual addition and subtraction puzzle grids',
      ],
      ta: [
        'மணிச்சட்டங்கள் மூலம் எண்களைக் கூட்டுதல்',
        'வடிவங்களை வரிசைப்படுத்துதல் மற்றும் சமச்சீர் ஆய்வு',
        'காட்சி வழிக் கூட்டல்-கழித்தல் புதிர்கள்',
      ],
    },
    pedagogyShift: {
      before: {
        en: 'Abstract numerical memorisation without physical conceptual grounding.',
        ta: 'பொருட்களின் தொடர்பின்றி வெறும் எண்களை மனப்பாடம் செய்தல்.',
      },
      after: {
        en: 'Tactile manipulation of objects before transitioning to symbolic representation.',
        ta: 'பொருட்களைத் தொட்டு உணர்ந்து கணக்கிட்ட பின் எண்களுக்கு மாறும் முறை.',
      },
    },
  },
  {
    id: 'evs',
    code: 'EVS-104',
    name: { en: 'Environmental Science & Living World', ta: 'சூழ்நிலையியல் & இயற்கை உலகம்' },
    booksCount: 1,
    tag: { en: 'Sensory Science', ta: 'இயற்கை அறிவியல்' },
    focus: {
      en: 'Nature observation, personal hygiene, flora & fauna awareness, community roles, and water conservation.',
      ta: 'இயற்கை உற்றுநோக்கல், தனிநபர் சுகாதாரம், தாவர-விலங்கு அறிவு மற்றும் நீர் பாதுகாப்பு.',
    },
    activities: {
      en: [
        'Campus biodiversity walks and leaf-rubbing journals',
        'Structured cleanliness and handwashing practical routines',
        'Water cycle storyboards and conservation games',
      ],
      ta: [
        'பள்ளி வளாக இயற்கை உலா மற்றும் இலை வரைதல்',
        'சுத்தம் மற்றும் கை கழுவும் அன்றாடப் பழக்கங்கள்',
        'நீர் சுழற்சி மற்றும் நீர் சேமிப்பு விளையாட்டுகள்',
      ],
    },
    pedagogyShift: {
      before: {
        en: 'Textual descriptions memorised without outdoor interaction or practical habits.',
        ta: 'நேரடி அனுபவமின்றி புத்தகப் பத்திகளை மட்டும் மனனம் செய்தல்.',
      },
      after: {
        en: 'Outdoor sensory exploration and real-world environmental habits built daily.',
        ta: 'நேரடி இயற்கை அனுபவம் மற்றும் அன்றாட சுகாதாரப் பழக்கங்களை உருவாக்குதல்.',
      },
    },
  },
  {
    id: 'arts',
    code: 'ART-105',
    name: { en: 'Motor Skills & Creative Expression', ta: 'உடல் இயக்கம் & கலைத்திறன்' },
    booksCount: 1,
    tag: { en: 'Motor & Arts', ta: 'உடல் & கலை' },
    focus: {
      en: 'Fine motor coordination, color blending, clay modelling, rhythm, balance, and cooperative games.',
      ta: 'விரல் இயக்கம், வண்ணக் கலவை, களிமண் உருவங்கள், இசை தாளம் மற்றும் கூட்டு விளையாட்டுகள்.',
    },
    activities: {
      en: [
        'Clay sculpting, finger-painting, and paper-folding precision work',
        'Rhythm clapping and folk-song movement circles',
        'Collaborative large-format classroom drawing projects',
      ],
      ta: [
        'களிமண் சிற்பங்கள் மற்றும் கைவினைப் பணிகள்',
        'நாட்டுப்புறப் பாடல் தாள இயக்கங்கள்',
        'கூட்டு ஓவிய வரைபடப் பயிற்சிகள்',
      ],
    },
    pedagogyShift: {
      before: {
        en: 'Treated as unstructured leisure without motor skill tracking.',
        ta: 'திட்டமிடப்பட்ட வழிகாட்டலின்றி ஓய்வு நேரமாக மட்டுமே கழித்தல்.',
      },
      after: {
        en: 'Structured fine motor and socio-emotional milestones integrated into weekly timetable.',
        ta: 'குழந்தைகளின் உடல் இயக்கம் மற்றும் மனவெழுச்சிக்கு வாராந்திர வழிகாட்டுதல்.',
      },
    },
  },
];

export function CurriculumWorkbench({ locale }: { locale: Locale }) {
  const [activeSubject, setActiveSubject] = useState<SubjectModule>(SUBJECT_MODULES[0]!);

  const content = {
    en: {
      headline: 'The 9 Revised Primary Textbooks (Classes 1–3)',
      standfirst:
        'Released in May 2026, the updated primary curriculum replaces rote memorisation with experiential and activity-based learning modules.',
      activitiesLabel: 'Core Learning Activities',
      previousMethod: 'Previous Memorisation Approach',
      newStandard: '2026 Activity-Based Standard',
    },
    ta: {
      headline: '1–3 வகுப்புகளுக்கான 9 புதிய தொடக்கப் பாடநூல்கள்',
      standfirst:
        'மே 2026-ல் வெளியிடப்பட்ட புதிய பாடத்திட்டம் மனப்பாட முறையை நீக்கி, செயல்வழிக் கற்றலுக்கு வழிகோலுகிறது.',
      activitiesLabel: 'கற்றல் செயல்பாடுகள்',
      previousMethod: 'முந்தைய மனப்பாட முறை',
      newStandard: '2026 செயல்வழிப் புதிய தரம்',
    },
  }[locale];

  return (
    <div className="space-y-8 max-w-[72rem] mx-auto">
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed mt-2">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* Minimal Subject Selector Tabs (Clean Underline / Clean Font) */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-sand-300 pb-3 text-sm">
        {SUBJECT_MODULES.map((sub) => {
          const isActive = activeSubject.id === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubject(sub)}
              className={`pb-2 transition-colors relative font-medium ${
                isActive
                  ? 'text-maroon-700 font-semibold'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <span>{sub.name[locale]}</span>
              {isActive && (
                <motion.div
                  layoutId="activeSubjectLine"
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-maroon-700"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Subject Content - Clean 2-Column Editorial Grid (No Heavy Nested Boxes) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubject.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
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

          {/* 2-Column Editorial Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 6 Cols: Activities List */}
            <div className="lg:col-span-6 space-y-4">
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-maroon-700">
                {content.activitiesLabel}
              </h5>
              <ul className="space-y-3 divide-y divide-sand-200">
                {activeSubject.activities[locale].map((act, i) => (
                  <li
                    key={i}
                    className="pt-3 first:pt-0 text-sm text-charcoal-800 flex items-start gap-2.5"
                  >
                    <span className="text-maroon-700 font-bold leading-none mt-1">›</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right 6 Cols: Clean Minimal Side-by-Side Comparison */}
            <div className="lg:col-span-6 space-y-4">
              <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-maroon-700">
                {locale === 'ta' ? 'கற்பித்தல் முறை ஒப்பீடு' : 'Pedagogy Shift'}
              </h5>

              <div className="space-y-3">
                <div className="p-4 bg-sand-100/60 border-l-2 border-charcoal-400 space-y-1">
                  <div className="text-xs font-mono text-charcoal-600 font-semibold uppercase">
                    {content.previousMethod}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    {activeSubject.pedagogyShift.before[locale]}
                  </p>
                </div>

                <div className="p-4 bg-sand-50 border-l-2 border-maroon-700 space-y-1">
                  <div className="text-xs font-mono text-maroon-700 font-bold uppercase">
                    {content.newStandard}
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-900 font-medium leading-relaxed">
                    {activeSubject.pedagogyShift.after[locale]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
