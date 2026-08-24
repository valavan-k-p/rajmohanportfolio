'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import {
  EduReveal,
  EduStaggerContainer,
  EduStaggerItem,
  EduHorizontalLine,
  EduQuoteBlock,
  CINEMATIC_EASE,
} from './EduMotion';

export function TwoLanguageFramework({ locale }: { locale: Locale }) {
  const [activeTab, setActiveTab] = useState<'tamil' | 'english' | 'autonomy'>('tamil');

  const content = {
    en: {
      headline: 'The Tamil Nadu Two-Language Policy',
      standfirst:
        'A historic, scientifically grounded framework ensuring deep cultural rootedness in the Tamil mother tongue alongside global English fluency, while rejecting 3-language imposition.',
      tabTamil: '1. Tamil as Foundation',
      tabEnglish: '2. English for Global Access',
      tabAutonomy: '3. State Educational Autonomy',
      tamilContent: {
        title: 'Mother-Tongue Pedagogy & Cultural Identity',
        summary:
          'Tamil is the primary medium of identity, cognitive grounding, and early literacy across state schools, ensuring children build deep comprehension without language alienation.',
        points: [
          'Compulsory Tamil instruction across primary and secondary curricula.',
          'Digitisation of classical literature into interactive school learning modules.',
          'Comprehensive training for Tamil-medium educators in modern activity pedagogy.',
          'Specialised foundation readers for first-generation school learners.',
        ],
        mandate: 'Legislative Standing: Policy reaffirmed unanimously by Tamil Nadu Legislative Assembly (2026)',
      },
      englishContent: {
        title: 'Fluency for Global Science, Tech & Commerce',
        summary:
          'English is taught as an empowering second language with modern phonetics, digital labs, and conversational immersion to guarantee equal competitive opportunity for government school students.',
        points: [
          'Phonics-based listening and speaking modules introduced in Class 1.',
          'Interactive English digital labs deployed in high schools.',
          'Standardised communication benchmarks for higher secondary graduates.',
          'Teacher capacity programmes in contemporary communicative English.',
        ],
        mandate: 'Implementation: Standardized curriculum benchmarks across all 38 districts.',
      },
      autonomyContent: {
        title: 'Rejection of Three-Language NEP & Central Imposition',
        summary:
          'The state administration upholds Tamil Nadu’s historical 1968 two-language consensus, rejecting the National Education Policy (NEP) three-language formula and preserving state control over school curricula.',
        points: [
          'Explicit rejection of mandatory Hindi or third-language imposition.',
          'Safeguarding linguistic harmony and reducing unnecessary cognitive burden on children.',
          'Preservation of state federal autonomy in designing state school syllabi.',
          'Opposition to centralised standardised tests (NEET/CUET) that disadvantage rural students.',
        ],
        mandate: 'Constitutional Position: Education listed in Concurrent List; State retains primary operational sovereignty.',
      },
      quote: '“Our two-language policy is not merely linguistic—it is a social justice doctrine ensuring cultural pride and global competitiveness.”',
      source: 'Minister Rajmohan Arumugam · Assembly Debate, July 2026',
    },
    ta: {
      headline: 'தமிழ்நாட்டின் இருமொழிக் கொள்கை & மாநில தன்னாட்சி',
      standfirst:
        'தாய்மொழியாம் தமிழ் வழிக் கல்வியும், உலகளாவிய வாய்ப்புகளுக்கான ஆங்கிலமும் மட்டுமே தமிழ்நாட்டின் இருமொழிக் கொள்கையின் உறுதியான அடித்தளம்; மும்மொழிக் கொள்கைக்கு இங்கு இடமில்லை.',
      tabTamil: '1. தமிழ்: அடிப்படை உரிமை',
      tabEnglish: '2. ஆங்கிலம்: உலகளாவிய வாய்ப்பு',
      tabAutonomy: '3. மாநில கல்வித் தன்னாட்சி',
      tamilContent: {
        title: 'தாய்மொழி வழிக் கல்வி & கலாச்சார அடையாளம்',
        summary:
          'அரசுப் பள்ளிகளில் தாய்மொழி வழிக் கற்றல் மூலமே குழந்தைகளின் முழுமையான சிந்தனைத் திறனும் ஆளுமையும் வளர்க்கப்படுகிறது.',
        points: [
          'தொடக்க மற்றும் மேல்நிலைக் கல்வியில் தமிழ் மொழிப் பாடம் கட்டாயம்.',
          'பண்டைய இலக்கியங்கள் மற்றும் வரலாற்றை டிஜிட்டல் முறையில் கற்கும் வசதி.',
          'தமிழ் ஆசிரியர்களுக்கு நவீன செயல்வழிக் கற்பித்தல் சிறப்புப் பயிற்சிகள்.',
          'முதல் தலைமுறை மாணவர்களுக்கு சிறப்பு வழிகாட்டுதல் நூல்கள்.',
        ],
        mandate: 'சட்டமன்ற நிலைப்பாடு: தமிழ்நாடு சட்டமன்றத்தால் ஒருமனதாக உறுதி செய்யப்பட்ட கொள்கை (2026)',
      },
      englishContent: {
        title: 'அறிவியல், தொழில்நுட்பம் & வேலைவாய்ப்பிற்கான ஆங்கிலம்',
        summary:
          'அரசுப் பள்ளி மாணவர்கள் உலக அளவில் போட்டியிடும் வகையில் நவீன ஒலிப்பியல் முறையிலும், டிஜிட்டல் ஆய்வகங்கள் மூலமும் ஆங்கிலத் திறன் மேம்படுத்தப்படுகிறது.',
        points: [
          '1-ஆம் வகுப்பு முதல் எளிய ஒலிப்பியல் முறை ஆங்கிலக் கல்வி.',
          'உயர்நிலைப் பள்ளிகளில் ஸ்மார்ட் ஆங்கில மொழி ஆய்வகங்கள்.',
          'மாணவர்களின் பேச்சுத்திறனை வளர்க்கும் தொடர் பயிற்சிகள்.',
          'ஆங்கில ஆசிரியர்களுக்கான சர்வதேச தரத்திலான திறன் பயிற்சிகள்.',
        ],
        mandate: 'செயல்பாட்டுத் தரம்: 38 மாவட்டங்களிலும் சீரான கற்றல் அளவுகோல் அமல்.',
      },
      autonomyContent: {
        title: 'மும்மொழிக் கொள்கை & தேசிய கல்விக் கொள்கை (NEP) எதிர்ப்பு',
        summary:
          '1968-ஆம் ஆண்டு பேரறிஞர் அண்ணாவால் உருவாக்கப்பட்ட வரலாற்றுச் சிறப்புமிக்க இருமொழிக் கொள்கையே தொடரும்; இந்தி அல்லது மூன்றாவது மொழி திணிப்பு முற்றாக நிராகரிக்கப்படுகிறது.',
        points: [
          'மும்மொழிக் கொள்கை மற்றும் இந்தித் திணிப்பிற்கு எதிரான உறுதியான நிலைப்பாடு.',
          'மாணவர்கள் மீது தேவையற்ற மொழிச் சுமையைத் தவிர்த்து கற்றல் தரத்தை உயர்த்துதல்.',
          'பாடத்திட்டத்தை வடிவமைப்பதில் மாநில அரசின் கூட்டாட்சி உரிமையைப் பாதுகாத்தல்.',
          'கிராமப்புற மாணவர்களைப் பாதிக்கும் நீட் போன்ற பொது நுழைவுத் தேர்வுகளுக்கு எதிர்ப்பு.',
        ],
        mandate: 'அரசியலமைப்பு நிலைப்பாடு: கல்வி பொதுப் பட்டியலில் உள்ளதால் மாநில உரிமைகள் பாதுகாக்கப்பட வேண்டும்.',
      },
      quote: '“இருமொழிக் கொள்கை என்பது வெறும் மொழிப் பிரச்சனை அல்ல; அது தமிழ்நாட்டின் சமூக நீதி மற்றும் தன்னாட்சி உரிமை.”',
      source: 'அமைச்சர் ராஜ்மோகன் ஆறுமுகம் · சட்டமன்ற உரை, ஜூலை 2026',
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
      {/* Header with Mask Reveal */}
      <EduReveal direction="up" className="max-w-[48rem]">
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
                  transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: CINEMATIC_EASE }}
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

          {/* Staggered Policy Points with Left-to-Right Lines */}
          <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3" stagger={0.06}>
            {activeData.points.map((pt, i) => (
              <EduStaggerItem
                key={i}
                direction={i % 2 === 0 ? 'left' : 'right'}
                showTopLine={true}
                topLineColor="bg-sand-200"
                className="flex items-start gap-2.5 text-sm text-charcoal-800 py-2.5"
              >
                <span className="text-maroon-700 font-bold leading-none mt-1">●</span>
                <span>{pt}</span>
              </EduStaggerItem>
            ))}
          </EduStaggerContainer>

          <div className="text-xs font-mono text-charcoal-600 pt-1">
            {activeData.mandate}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Editorial Quote Block with Vertical Line Drawing */}
      <div className="pt-4 border-t border-sand-300">
        <EduQuoteBlock quote={content.quote} attribution={content.source} />
      </div>
    </div>
  );
}
