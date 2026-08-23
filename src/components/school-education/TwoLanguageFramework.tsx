'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import { EduReveal } from './EduMotion';

export function TwoLanguageFramework({ locale }: { locale: Locale }) {
  const [activeTab, setActiveTab] = useState<'tamil' | 'english' | 'autonomy'>('tamil');

  const content = {
    en: {
      headline: 'The Tamil Nadu Two-Language Policy',
      standfirst:
        'A historic, scientifically grounded framework ensuring deep cultural rootedness in the Tamil mother tongue alongside global English fluency, while rejecting 3-language imposition.',
      tabTamil: 'Tamil (Mother Tongue)',
      tabEnglish: 'English (Global Window)',
      tabAutonomy: 'State Autonomy (NEP/NEET)',
      tamilContent: {
        title: 'Tamil: Classical Heritage & Identity Anchor',
        summary:
          'Ensuring every student achieves rich spoken fluency, literary appreciation, and grammatical command of Tamil from primary school onwards.',
        points: [
          'Compulsory foundational literacy in Tamil across government & aided schools',
          'Rich literary exposure from Sangam classics to modern rationalist prose',
          'Mother-tongue primacy in early cognitive development and social expression',
          'Digital Tamil vocabulary and technical terminologies integrated into coursework',
        ],
        mandate: 'Preserves 2,000+ years of cultural heritage without linguistic dilution.',
      },
      englishContent: {
        title: 'English: Global STEM & Professional Literacy',
        summary:
          'Providing world-class English language instruction to level the playing field for government school students entering global technology, science, and commerce.',
        points: [
          'Activity-based phonics and conversational practice from Class 1 onwards',
          'Vocabulary focused on international scientific and mathematical applications',
          'Eliminating rural-urban divide in higher education and competitive careers',
          'Equal emphasis alongside Tamil in standard bilingual textbooks',
        ],
        mandate: 'Empowers first-generation learners to compete globally on merit.',
      },
      autonomyContent: {
        title: 'State Autonomy: Rejection of NEP 3-Language & NEET',
        summary:
          'Tamil Nadu holds an unequivocal statutory position against the three-language formula of the National Education Policy (NEP) and centralised NEET exams.',
        points: [
          'The state school curriculum is comprehensive, rigorous, and culturally attuned',
          'Three-language imposition places an unfair cognitive burden on primary learners',
          'Legislative opposition to NEET: protecting state-funded rural medical aspirants',
          'Complete withdrawal of criminal cases against student anti-NEET demonstrators',
        ],
        mandate: 'Protects state federalism and equitable access to higher education.',
      },
      quote:
        '“We will remain uncompromisingly committed to Tamil Nadu’s historic two-language policy in our schools.”',
      quoteAuthor: 'Minister Rajmohan Arumugam · Press Briefing (May 2026)',
      source: 'The Hindu, New Indian Express & Economic Times Education',
    },
    ta: {
      headline: 'தமிழ்நாட்டின் வரலாற்றுச் சிறப்புமிக்க இருமொழிக் கொள்கை',
      standfirst:
        'தமிழ் தாய்மொழிப் பற்றையும், உலகளாவிய அறிவியல் வாய்ப்புகளுக்கான ஆங்கிலப் புலமையையும் சமமாக வளர்க்கும் உறுதியான கொள்கை.',
      tabTamil: 'தமிழ் (தாய்மொழி)',
      tabEnglish: 'ஆங்கிலம் (உலக வாய்ப்பு)',
      tabAutonomy: 'மாநில சுயாட்சி (NEP/நீட்)',
      tamilContent: {
        title: 'தமிழ்: பண்பாட்டு அடையாளம் & ஆழமான இலக்கிய அறிவு',
        summary:
          'அனைத்து அரசுப் பள்ளி மாணவர்களுக்கும் தொடக்கக் கல்வி முதல் சிறந்த தமிழ் மொழிப் புலமை, இலக்கிய அறிவு மற்றும் இலக்கணத் திறனை உறுதி செய்தல்.',
        points: [
          'அரசு மற்றும் அரசு உதவிபெறும் பள்ளிகளில் தமிழ் மொழி வழிக் கல்விக்கு முதன்மை',
          'சங்க இலக்கியம் முதல் நவீன தமிழ் உரைநடை வரையிலான அறிமுகம்',
          'குழந்தைகளின் இயல்பான சிந்தனை வளர்ச்சிக்கு தாய்மொழியே முதன்மை அடித்தளம்',
          'அறிவியல் மற்றும் தொழில்நுட்பத் தமிழ்ச் சொற்கள் பாடநூல்களில் ஒருங்கிணைப்பு',
        ],
        mandate: 'ஆயிரக்கணக்கான ஆண்டுகால தமிழ்ப் பண்பாட்டையும் அடையாளத்தையும் பாதுகாக்கிறது.',
      },
      englishContent: {
        title: 'ஆங்கிலம்: உலகளாவிய அறிவியல் & தொழில்நுட்பத் திறன்',
        summary:
          'அரசுப் பள்ளி மாணவர்கள் சர்வதேச அளவில் தொழில்நுட்பம், மருத்துவம், பொறியியல் மற்றும் வணிகத் துறைகளில் சிறந்து விளங்க உலகத்தரம் வாய்ந்த ஆங்கிலப் பயிற்சி.',
        points: [
          '1-ஆம் வகுப்பு முதலே செயல்வழி ஆங்கிலப் பேச்சு மற்றும் ஒலிப்பியல் பயிற்சிகள்',
          'அறிவியல் மற்றும் கணிதக் கருத்துகளுக்கான சர்வதேச ஆங்கிலச் சொல்வளம்',
          'கிராமப்புற மற்றும் நகர்ப்புற மாணவர்களுக்கிடையேயான மொழி இடைவெளியை நீக்குதல்',
          'தமிழ் மற்றும் ஆங்கிலம் ஆகிய இரு மொழிகளுக்கும் பாடநூல்களில் சம முக்கியத்துவம்',
        ],
        mandate: 'முதல் தலைமுறை பட்டதாரி மாணவர்களுக்கும் உலகளாவிய வாய்ப்புகளை உருவாக்குகிறது.',
      },
      autonomyContent: {
        title: 'மாநில சுயாட்சி: மும்மொழிக் கொள்கை & நீட் தேர்வு நிராகரிப்பு',
        summary:
          'தேசிய கல்விக் கொள்கையின் (NEP) மும்மொழிக் கொள்கையையும், நீட் தேர்வையும் தமிழ்நாடு அரசு திட்டவட்டமாக நிராகரிக்கிறது.',
        points: [
          'தமிழ்நாட்டின் மாநிலக் கல்வித் திட்டம் தன்னாட்சியும் போதுமான வலிமையும் கொண்டது',
          'மும்மொழிக் கொள்கை தொடக்கப் பள்ளி குழந்தைகள் மீது கூடுதல் சுமையை ஏற்றும்',
          'நீட் தேர்வுக்கு எதிரான அரசின் சட்டப் போராட்டம்: ஏழை எளிய மாணவர்களின் மருத்துவக் கனவு பாதுகாப்பு',
          'நீட் எதிர்ப்புப் போராட்டத்தில் ஈடுபட்ட மாணவர்கள் மீதான வழக்குகள் ரத்து',
        ],
        mandate: 'மாநில உரிமைகளையும், சமூக நீதியையும் உறுதியாக நிலைநிறுத்துகிறது.',
      },
      quote:
        '“பள்ளிகளில் தமிழ்நாட்டின் இருமொழிக் கொள்கையில் அரசு உறுதியாக இருக்கும்; மும்மொழிக் கொள்கையை ஒருபோதும் ஏற்க மாட்டோம்.”',
      quoteAuthor: 'அமைச்சர் ராஜ்மோகன் ஆறுமுகம் · பத்திரிகையாளர் சந்திப்பு (மே 2026)',
      source: 'தி இந்து, நியூ இந்தியன் எக்ஸ்பிரஸ் & எகனாமிக் டைம்ஸ் (மே–ஜூன் 2026)',
    },
  }[locale];

  const getTabContent = () => {
    switch (activeTab) {
      case 'tamil':
        return content.tamilContent;
      case 'english':
        return content.englishContent;
      case 'autonomy':
        return content.autonomyContent;
    }
  };

  const activeData = getTabContent();

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

      {/* Minimal Tabs */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-sand-300 pb-3 text-sm">
        {(['tamil', 'english', 'autonomy'] as const).map((tabKey) => {
          const isActive = activeTab === tabKey;
          const label =
            tabKey === 'tamil'
              ? content.tabTamil
              : tabKey === 'english'
              ? content.tabEnglish
              : content.tabAutonomy;

          return (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`pb-2 transition-colors relative font-medium ${
                isActive
                  ? 'text-maroon-700 font-semibold'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <span>{label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeLangLine"
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-maroon-700"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="pt-2 space-y-6"
        >
          <div className="border-b border-sand-200 pb-4">
            <h4 className="font-display text-2xl text-charcoal-900 font-semibold">
              {activeData.title}
            </h4>
            <p className="text-charcoal-700 text-base leading-relaxed mt-2 max-w-[46rem]">
              {activeData.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
            {activeData.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-charcoal-800 py-2 border-b border-sand-200">
                <span className="text-maroon-700 font-bold leading-none mt-1">●</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>

          <div className="text-xs font-mono text-charcoal-600 pt-1">
            {activeData.mandate}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Editorial Quote Line */}
      <div className="pt-6 border-t border-sand-300 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <p className="font-serif italic text-base sm:text-lg text-charcoal-900">
          {content.quote}
        </p>
        <span className="text-xs text-charcoal-500 font-mono whitespace-nowrap">
          {content.source}
        </span>
      </div>
    </div>
  );
}
