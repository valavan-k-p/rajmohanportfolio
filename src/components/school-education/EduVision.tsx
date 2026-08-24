'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduTopLineBox } from './EduMotion';
import { SCHOOL_EDUCATION_DATA } from '@/data/school-education';

export function EduVision({ locale }: { locale: Locale }) {
  const { keyPillars } = SCHOOL_EDUCATION_DATA;

  const content = {
    en: {
      lead: 'Tamil Nadu’s school education governance operates on three foundational principles: transforming early-childhood pedagogy from rote memorisation to activity-based learning, safeguarding student welfare and campus neutrality, and expanding modern digital infrastructure.',
      quote: '“Schools must remain safe, intellectually vibrant sanctuaries where every child—regardless of economic background—receives quality foundational learning, modern technology exposure, and dignified care.”',
      attribution: 'Minister Rajmohan Arumugam · Legislative Policy Address, 2026',
      sourceDoc: 'Official Department Briefings & Legislative Assembly Records (May–August 2026)',
    },
    ta: {
      lead: 'தமிழ்நாடு பள்ளிக் கல்வி நிர்வாகம் மூன்று முக்கிய அடித்தளங்களில் இயங்குகிறது: தொடக்கக் கல்வியை மனப்பாட முறையிலிருந்து செயல்வழிக் கற்றலாக மாற்றுதல், மாணவர் நலன் மற்றும் பள்ளி அமைதியைப் பாதுகாத்தல், அரசுப் பள்ளிகளில் நவீன டிஜிட்டல் வசதிகளை ஏற்படுத்துதல்.',
      quote: '“அரசுப் பள்ளிகள் என்பது அனைத்துக் குழந்தைகளுக்கும் சமமான, தரமான, நவீன தொழில்நுட்ப அறிவை வழங்கும் பாதுகாப்பான கற்றல் தளங்களாக விளங்க வேண்டும்.”',
      attribution: 'அமைச்சர் ராஜ்மோகன் ஆறுமுகம் · சட்டமன்றக் கொள்கை உரை, 2026',
      sourceDoc: 'அரசுத் துறை விவரக் குறிப்பு & சட்டமன்ற ஆவணங்கள் (மே–ஆகஸ்ட் 2026)',
    },
  }[locale];

  return (
    <div className="space-y-12 max-w-[72rem] mx-auto">
      {/* Executive Lead Statement */}
      <EduReveal className="max-w-[50rem]">
        <p className="font-display text-2xl sm:text-3xl lg:text-[2rem] text-charcoal-900 leading-[1.25] font-normal">
          {content.lead}
        </p>
      </EduReveal>

      {/* Editorial Quotation - Minimal Accent Line */}
      <EduReveal delay={0.06} className="max-w-[48rem]">
        <div className="pl-6 border-l-2 border-maroon-700 py-1">
          <p className="font-serif italic text-lg sm:text-xl text-charcoal-800 leading-relaxed">
            {content.quote}
          </p>
          <p className="text-xs font-mono text-charcoal-500 uppercase tracking-wider mt-2.5">
            — {content.attribution}
          </p>
        </div>
      </EduReveal>

      {/* 3 Distinct Separation Boxes with Pop Animation and Left-to-Right Top Line */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2">
        {keyPillars.slice(0, 3).map((pillar, idx) => (
          <EduTopLineBox
            key={pillar.id}
            delay={idx * 0.1}
            topLineColor="bg-maroon-700"
            className="bg-white border border-sand-300 shadow-sm p-6 sm:p-7 flex flex-col justify-between space-y-5 rounded-sm hover:shadow-md hover:border-sand-400 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-maroon-700 uppercase tracking-wider">
                  {pillar.tag[locale]}
                </span>
                <span className="font-semibold text-charcoal-400">0{idx + 1}</span>
              </div>
              <h3 className="font-display text-xl text-charcoal-900 leading-snug font-semibold">
                {pillar.title[locale]}
              </h3>
              <p className="text-charcoal-700 text-sm leading-relaxed">
                {pillar.detail[locale]}
              </p>
            </div>

            <div className="text-[11px] font-mono text-emerald-800 font-medium pt-3 border-t border-sand-100 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{locale === 'ta' ? 'செயல்பாட்டில்' : 'Active Deployment'}</span>
            </div>
          </EduTopLineBox>
        ))}
      </div>

      {/* Minimal Sourcing Note */}
      <div className="pt-4 text-xs text-charcoal-500 font-mono border-t border-sand-200">
        {content.sourceDoc}
      </div>
    </div>
  );
}
