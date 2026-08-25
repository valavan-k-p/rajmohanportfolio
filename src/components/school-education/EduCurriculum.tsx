'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduCounter } from './EduMotion';
import { SCHOOL_EDUCATION_DATA } from '@/data/school-education';

export function EduCurriculum({ locale }: { locale: Locale }) {
  const { curriculumDetails } = SCHOOL_EDUCATION_DATA;

  const content = {
    en: {
      col1Title: 'Primary Textbook Redesign (Classes 1–3)',
      col1P1:
        'In May 2026, Minister Rajmohan Arumugam released nine revised, activity-rich textbooks specifically engineered for primary school children across Classes 1, 2, and 3. Designed under the State’s updated curriculum framework, these volumes systematically replace rote memorisation with tactile, visual, and experiential learning modules.',
      col1P2:
        'The revised material links core literacy and numeracy with fine motor coordination, socio-emotional development, life skills, and active classroom dialogue, ensuring young learners build lasting cognitive confidence from their earliest years.',
      col2Title: 'Two-Language Policy & Curriculum Autonomy',
      col2P1:
        'The Minister has reaffirmed Tamil Nadu’s historic Two-Language Policy of Tamil and English, confirming that the State will not adopt the three-language formula. The administration maintains that Tamil Nadu’s existing state curriculum is comprehensive and sufficient, formally registering opposition to the National Education Policy (NEP) and NEET.',
      col2P2:
        'This policy position guarantees deep linguistic rootedness in Tamil alongside globally competitive English literacy, preserving state jurisdiction over educational standards.',
      summaryLabel: 'Revised Primary Textbooks Released',
      summarySub: 'Classes 1, 2 & 3 · Deployed Statewide in May 2026',
      source: 'Sources: The Hindu, New Indian Express & Economic Times (May–June 2026)',
    },
    ta: {
      col1Title: 'தொடக்கப் பாடநூல் மறுவடிவமைப்பு (வகுப்புகள் 1–3)',
      col1P1:
        'மே 2026-ல் பொறுப்பேற்றதும் அமைச்சர் ராஜ்மோகன் ஆறுமுகம் 1, 2 மற்றும் 3-ஆம் வகுப்புகளுக்காக பிரத்யேகமாக மறுவடிவமைப்பு செய்யப்பட்ட 9 புதிய செயல்வழிப் பாடநூல்களை வெளியிட்டார். வெறும் மனப்பாட முறையை நீக்கி, செயல்வழிக் கற்றல் மற்றும் விளையாட்டு அடிப்படையிலான கல்விக்கு இவை வழிகோலுகின்றன.',
      col1P2:
        'அடிப்படை எழுத்தறிவு மற்றும் எண்ணறிவோடு சேர்த்து, குழந்தைகளின் உடல் இயக்கம், சமூக-உணர்ச்சி வளர்ச்சி, நற்பண்புகள் மற்றும் வாழ்க்கைத் திறன்களை வளர்ப்பதை நோக்கமாகக் கொண்டு இந்த நூல்கள் உருவாக்கப்பட்டுள்ளன.',
      col2Title: 'இருமொழிக் கொள்கை & கல்வி சுயாட்சி',
      col2P1:
        'தமிழ்-ஆங்கிலம் என்ற தமிழ்நாட்டின் இருமொழிக் கொள்கையில் அரசு உறுதியாக உள்ளது என்றும், மும்மொழிக் கொள்கையை ஒருபோதும் ஏற்க மாட்டோம் என்றும் அமைச்சர் திட்டவட்டமாகத் தெரிவித்தார். மாநிலக் கல்வித் திட்டம் தன்னாட்சியும் போதுமான வலிமையும் கொண்டது எனக் கூறி, தேசிய கல்விக் கொள்கை (NEP) மற்றும் நீட் தேர்வை அரசு தொடர்ந்து எதிர்க்கிறது.',
      col2P2:
        'இக்கொள்கை தமிழ் மொழிப் பண்பாட்டைப் பாதுகாப்பதுடன், அறிவியல் மற்றும் தொழில் துறை வளர்ச்சிக்குத் தேவையான ஆங்கிலப் புலமையையும் உறுதி செய்கிறது.',
      summaryLabel: 'புதிய தொடக்கப் பாடநூல்கள் வெளியீடு',
      summarySub: '1, 2, 3-ஆம் வகுப்புகளுக்கு · மே 2026 முதல் பயன்பாட்டில்',
      source: 'ஆதாரங்கள்: தி இந்து, நியூ இந்தியன் எக்ஸ்பிரஸ் & எகனாமிக் டைம்ஸ் (மே–ஜூன் 2026)',
    },
  }[locale];

  return (
    <div className="space-y-10">
      {/* 2-Column Prose with Lead Drop Cap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {/* Column 1: Primary Textbooks */}
        <EduReveal className="space-y-4">
          <h3 className="font-display text-2xl text-charcoal-900 border-b border-sand-300 pb-3 font-normal">
            {content.col1Title}
          </h3>
          <p className="text-charcoal-800 text-base leading-relaxed first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-serif first-letter:text-maroon-700 first-letter:leading-none">
            {content.col1P1}
          </p>
          <p className="text-charcoal-700 text-base leading-relaxed">
            {content.col1P2}
          </p>
        </EduReveal>

        {/* Column 2: Two-Language Policy */}
        <EduReveal delay={0.08} className="space-y-4">
          <h3 className="font-display text-2xl text-charcoal-900 border-b border-sand-300 pb-3 font-normal">
            {content.col2Title}
          </h3>
          <p className="text-charcoal-800 text-base leading-relaxed">
            {content.col2P1}
          </p>
          <p className="text-charcoal-700 text-base leading-relaxed">
            {content.col2P2}
          </p>
        </EduReveal>
      </div>

      {/* 4 Curriculum Pillars Grid */}
      <EduReveal delay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {curriculumDetails.keyFacets.map((facet, idx) => (
          <div
            key={idx}
            className="p-5 bg-sand-50 border border-sand-300 space-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="text-[11px] font-mono text-maroon-700 font-bold uppercase tracking-wider mb-1">
                FACET · 0{idx + 1}
              </div>
              <h4 className="font-display text-base text-charcoal-900 font-semibold">
                {facet.title[locale]}
              </h4>
              <p className="text-xs text-charcoal-700 leading-relaxed mt-1">
                {facet.desc[locale]}
              </p>
            </div>
          </div>
        ))}
      </EduReveal>

      {/* Summary Band with Counter */}
      <EduReveal delay={0.16} className="bg-white p-6 border border-sand-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="font-display text-3xl text-charcoal-900 tabular-nums font-light">
            <EduCounter value={curriculumDetails.booksCount} duration={1.2} />{' '}
            <span className="text-2xl font-serif text-charcoal-900 font-normal">
              {content.summaryLabel}
            </span>
          </div>
          <div className="text-xs text-charcoal-600 mt-0.5">
            {content.summarySub}
          </div>
        </div>
        <div className="text-[11px] text-charcoal-500 font-mono text-left md:text-right">
          {content.source}
        </div>
      </EduReveal>
    </div>
  );
}
