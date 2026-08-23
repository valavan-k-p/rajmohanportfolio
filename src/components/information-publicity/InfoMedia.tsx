'use client';

import type { InfoSectionProps } from './InfoTypes';
import { Newspaper, ExternalLink, Radio, Tv, Camera } from 'lucide-react';

interface MediaOutlet {
  name: string;
  type: string;
  coverageEn: string;
  coverageTa: string;
  linkText: string;
}

const OUTLETS: MediaOutlet[] = [
  {
    name: 'The Hindu',
    type: 'National English Daily',
    coverageEn: 'Comprehensive policy analysis, Assembly resolutions, and ministerial interview features.',
    coverageTa: 'கொள்கை பகுப்பாய்வு, சட்டமன்ற தீர்மானங்கள் மற்றும் அமைச்சரின் பிரத்யேக பேட்டி பதிவுகள்.',
    linkText: 'thehindu.com',
  },
  {
    name: 'Dinamani (தினமணி)',
    type: 'Tamil Vernacular Daily',
    coverageEn: 'Tamil development announcements, state educational schemes, and cultural preservation reporting.',
    coverageTa: 'தமிழ் வளர்ச்சி அறிவிப்புகள், கல்வி திட்டங்கள் மற்றும் பண்பாட்டு நிகழ்வுகள் குறித்த செய்திகள்.',
    linkText: 'dinamani.com',
  },
  {
    name: 'The New Indian Express',
    type: 'National English Daily',
    coverageEn: 'Coverage on Information Integrity Desk restructuring, government SLAs, and urban development.',
    coverageTa: 'தகவல் ஒருமைப்பாடு பிரிவு மறுசீரமைப்பு மற்றும் அரசின் உடனடி தீர்வு நடவடிக்கைகள் குறித்த செய்தி.',
    linkText: 'newindianexpress.com',
  },
  {
    name: 'DT Next',
    type: 'Regional English Daily',
    coverageEn: 'Chennai civic upgrades, youth awareness drives, and de-addiction campaign spotlights.',
    coverageTa: 'சென்னை குடிமைப் பணிகள், இளைஞர் விழிப்புணர்வு மற்றும் போதை எதிர்ப்பு பிரச்சார சிறப்புக் குறிப்புகள்.',
    linkText: 'dtnext.in',
  },
];

export function InfoMedia({ locale }: InfoSectionProps) {
  const isTa = locale === 'ta';

  return (
    <div className="space-y-10">
      {/* Media Coordination Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-sand-300 rounded-sm space-y-3">
          <div className="flex items-center gap-2.5 text-maroon-700">
            <Tv className="w-5 h-5" />
            <h4 className="font-display text-lg text-charcoal-900 font-medium">
              {isTa ? 'செய்தியாளர் சந்திப்புகள் & அறிவிப்புகள்' : 'Press Conferences & Briefings'}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
            {isTa
              ? 'முக்கிய அமைச்சரவை முடிவுகள் மற்றும் அரசு கொள்கைகள் குறித்து தலைமைச் செயலகத்தில் வழக்கமான செய்தியாளர் சந்திப்புகளை DIPR ஒருங்கிணைக்கிறது.'
              : 'DIPR conducts regular accredited press briefings and media coordination sessions at the Secretariat for major cabinet policy releases.'}
          </p>
        </div>

        <div className="bg-white p-6 border border-sand-300 rounded-sm space-y-3">
          <div className="flex items-center gap-2.5 text-maroon-700">
            <Radio className="w-5 h-5" />
            <h4 className="font-display text-lg text-charcoal-900 font-medium">
              {isTa ? 'அச்சு & தொலைக்காட்சிக்கு செய்திக் குறிப்புகள்' : 'Broadcast & Print Press Notes'}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
            {isTa
              ? 'அனைத்து முன்னணி தமிழ் மற்றும் ஆங்கில நாளிதழ்கள், தொலைக்காட்சி சேனல்கள் மற்றும் வானொலி நிலையங்களுக்கு உடனடி செய்திக் குறிப்புகள் விநியோகம்.'
              : 'Direct real-time dispatch of bilingual press notes, high-resolution photographs, and transcripts to newsrooms statewide.'}
          </p>
        </div>

        <div className="bg-white p-6 border border-sand-300 rounded-sm space-y-3">
          <div className="flex items-center gap-2.5 text-maroon-700">
            <Camera className="w-5 h-5" />
            <h4 className="font-display text-lg text-charcoal-900 font-medium">
              {isTa ? 'பண்பாட்டு & வரலாற்று ஊடக ஆவணங்கள்' : 'Heritage & Media Documentation'}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
            {isTa
              ? '"மெட்ராஸ் ஆன் ஸ்டேஜ்" போன்ற புகைப்பட கண்காட்சிகள் மூலம் சென்னையின் ஊடக மற்றும் பண்பாட்டு வரலாற்றை அமைச்சர் ராஜமோகன் முன்னிலையில் கொண்டாடுதல்.'
              : 'Spotlighting regional media heritage through cultural events like "Madras on Stage", honoring journalistic institutions including The Hindu.'}
          </p>
        </div>
      </div>

      {/* Major Media Coverage Index */}
      <div className="bg-sand-100/70 p-6 sm:p-8 border border-sand-300 rounded-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-sand-300">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-maroon-700" />
            <h3 className="font-display text-xl text-charcoal-900 font-medium">
              {isTa ? 'ஊடக வெளியீடுகள் மற்றும் செய்தித் தளங்கள்' : 'Major News Coverage & Press Outlets'}
            </h3>
          </div>
          <span className="text-xs font-mono text-charcoal-500 uppercase">
            {isTa ? 'அரசு அறிக்கைகளின் ஊடகப் பதிவுகள்' : 'Verified Media Archives'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OUTLETS.map((outlet) => (
            <div
              key={outlet.name}
              className="bg-white p-5 border border-sand-300 rounded-xs flex flex-col justify-between hover:border-maroon-700 transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-lg text-charcoal-950 font-bold">{outlet.name}</h4>
                  <span className="font-mono text-xs text-charcoal-500 bg-sand-100 px-2 py-0.5 border border-sand-200">
                    {outlet.type}
                  </span>
                </div>
                <p className="text-xs text-charcoal-600 font-sans">
                  {isTa ? outlet.coverageTa : outlet.coverageEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between text-xs">
                <span className="font-mono text-charcoal-400 font-semibold">{outlet.linkText}</span>
                <span className="text-maroon-700 font-mono text-xs font-bold inline-flex items-center gap-1">
                  {isTa ? 'செய்திப் பதிவுகள்' : 'Press Archive'} <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
