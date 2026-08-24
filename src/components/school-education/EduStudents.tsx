'use client';

import type { Locale } from '@/lib/i18n/routing';
import {
  EduQuoteBlock,
  EduStaggerContainer,
  EduStaggerItem,
  EduHorizontalLine,
} from './EduMotion';

export function EduStudents({ locale }: { locale: Locale }) {
  const content = {
    en: {
      leadQuote:
        '“Every government school must be a protected sanctuary—free from political distractions, rich in wholesome nutrition, and dedicated exclusively to student development.”',
      cards: [
        {
          tag: 'PEDAGOGY TRANSFORMATION',
          title: 'Activity-Based Textbooks for Classes 1–3',
          detail:
            '9 revised textbooks reducing rote memorisation, introducing joyful hands-on activities, fine motor coordination, and foundational phonetic literacy.',
          source: 'The Hindu & Dinamalar (May 2026)',
        },
        {
          tag: 'NUTRITION & WELFARE PROPOSAL',
          title: 'Weekly Chicken Biryani in Noon Meals',
          detail:
            'A groundbreaking welfare proposal under active state consideration to serve nutritious chicken biryani once a week in state-run school meal programmes.',
          source: 'The New Indian Express (August 2026)',
        },
        {
          tag: 'CAMPUS SANCTUARY & EQUITY',
          title: 'Strict Ban on Outside Political Disruption',
          detail:
            'Directives prohibiting external political parties, unverified organisations, or commercial disruptions inside campus boundaries to preserve quiet study hours.',
          source: 'The New Indian Express (July 2026)',
        },
      ],
    },
    ta: {
      leadQuote:
        '“அரசுப் பள்ளிகள் என்பது அரசியல் தலையீடுகளற்ற, சத்தான உணவும் சமத்துவக் கல்வியும் வழங்கும் மாணவர்களுக்கான அமைதியான சரணாலயம்.”',
      cards: [
        {
          tag: 'கற்றல் முறை மாற்றம் · புதிய பாடத்திட்டம்',
          title: '1-3 வகுப்புகளுக்கான 9 புதிய செயல்வழிப் பாடநூல்கள்',
          detail:
            'மனப்பாடக் கல்விக்கு முற்றுப்புள்ளி வைத்து, எளிய செயல்பாடுகள், வண்ணப் படங்கள் மற்றும் கதை வழியே கற்கும் 9 புதிய பாடநூல்கள் வெளியீடு.',
          source: 'தி இந்து & தினமலர் (மே 2026)',
        },
        {
          tag: 'முன்மொழிவு · அரசின் பரிசீலனையில்',
          title: 'வாரம் ஒரு முறை சிக்கன் பிரியாணி திட்டம்',
          detail:
            'அரசுப் பள்ளி மதிய உணவுத் திட்டத்தில் வாரம் ஒரு முறை சிக்கன் பிரியாணி வழங்கும் முன்மொழிவு ஊட்டச்சத்து மற்றும் வருகையை அதிகரிக்க அரசின் தீவிரப் பரிசீலனையில் உள்ளது.',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ், ஆகஸ்ட் 2026',
        },
        {
          tag: 'வளாகப் பாதுகாப்பு · நிர்வாக நெறிமுறை',
          title: 'அரசியல் தலையீடற்ற அமைதியான வகுப்பறைகள்',
          detail:
            'பள்ளி வளாகங்களுக்குள் அரசியல் கட்சிகள், தனியார் அமைப்புகள் அல்லது அனுமதியற்ற நபர்கள் நுழைவதைத் தடை செய்து கற்றல் நேரமும் மாணவர் பாதுகாப்பும் உறுதி செய்யப்பட்டுள்ளது.',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ், ஜூலை 2026',
        },
      ],
    },
  }[locale];

  const colDirections: ('up' | 'left' | 'right')[] = ['up', 'left', 'right'];

  return (
    <div className="space-y-12 max-w-[72rem] mx-auto">
      {/* Editorial Pull Quote with Vertical Drawing Line */}
      <div className="max-w-[50rem]">
        <EduQuoteBlock quote={content.leadQuote} />
      </div>

      {/* 3 Welfare Columns with 3-Column Directional Variation & Top Hairline Draws */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-2" stagger={0.09}>
        {content.cards.map((card, idx) => (
          <EduStaggerItem
            key={idx}
            direction={colDirections[idx]}
            showTopLine={true}
            topLineColor="bg-maroon-700/60"
            className="pt-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <span className="text-sm font-mono font-bold uppercase tracking-wider text-maroon-700 block">
                {card.tag}
              </span>
              <h3 className="font-display text-2xl text-charcoal-900 leading-snug font-semibold">
                {card.title}
              </h3>
              <p className="text-charcoal-700 text-base leading-relaxed">
                {card.detail}
              </p>
            </div>

            <div className="text-sm text-charcoal-500 font-mono pt-3 border-t border-sand-200">
              {card.source}
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>

      <EduHorizontalLine color="bg-sand-200" duration={0.65} />
    </div>
  );
}
