'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduStudents({ locale }: { locale: Locale }) {
  const content = {
    en: {
      leadQuote:
        '“Students thrive when nutrition is dignified, legal anxieties are removed, and the classroom remains an uninterrupted space for curiosity and growth.”',
      cards: [
        {
          tag: 'LEGAL RELIEF · OFFICIAL ORDER',
          title: 'Withdrawal of Cases Against Anti-NEET Student Protesters',
          detail:
            'Following directions from the Chief Minister, the Minister announced the formal withdrawal of all police cases registered against students who participated in democratic anti-NEET demonstrations, safeguarding their academic and career records.',
          source: 'The Hindu, August 2026',
        },
        {
          tag: 'POLICY PROPOSAL · UNDER REVIEW',
          title: 'Weekly Chicken Biryani in Noon Meals',
          detail:
            'A proposal to introduce chicken biryani once weekly in government-school noon meals is under ministerial review and final Chief Minister consideration to bolster child nutrition and attendance.',
          source: 'New Indian Express, August 2026',
        },
        {
          tag: 'CAMPUS NEUTRALITY · EXECUTIVE NORMS',
          title: 'Preserving Classrooms as Learning Sanctuaries',
          detail:
            'Implemented strict guidelines prohibiting political party events, commercial intrusions, and unauthorized outside visitors inside government school grounds to preserve safety and instructional focus.',
          source: 'New Indian Express, July 2026',
        },
      ],
    },
    ta: {
      leadQuote:
        '“சத்தான உணவு, சட்டரீதியான பாதுகாப்பும், அமைதியான கற்றல் சூழலும் இருக்கும்போதுதான் மாணவர்களின் எதிர்காலம் சிறக்கும்.”',
      cards: [
        {
          tag: 'சட்டப் பாதுகாப்பு · அரசு ஆணை',
          title: 'நீட் எதிர்ப்பு போராட்டத்தில் ஈடுபட்ட மாணவர்கள் மீதான வழக்குகள் வாபஸ்',
          detail:
            'நீட் தேர்வுக்கு எதிராக அமைதியான முறையில் போராடிய மாணவர்கள் மீது பதியப்பட்ட அனைத்து வழக்குகளையும் முதலமைச்சரின் வழிகாட்டுதலின்படி திரும்பப் பெற அமைச்சர் அறிவித்தார்.',
          source: 'தி இந்து, ஆகஸ்ட் 2026',
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

  return (
    <div className="space-y-12 max-w-[72rem] mx-auto">
      {/* Pull Quote */}
      <EduReveal className="max-w-[48rem]">
        <div className="pl-6 border-l-2 border-maroon-700 py-1">
          <p className="font-serif italic text-xl sm:text-2xl text-charcoal-900 leading-relaxed font-normal">
            {content.leadQuote}
          </p>
        </div>
      </EduReveal>

      {/* 3 Welfare Columns with Top Hairlines (No Heavy Cards) */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-2">
        {content.cards.map((card, idx) => (
          <EduStaggerItem
            key={idx}
            className="border-t border-sand-300 pt-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-maroon-700 block">
                {card.tag}
              </span>
              <h4 className="font-display text-xl text-charcoal-900 leading-snug font-semibold">
                {card.title}
              </h4>
              <p className="text-charcoal-700 text-sm leading-relaxed">
                {card.detail}
              </p>
            </div>

            <div className="text-xs font-mono text-charcoal-500 pt-2 border-t border-sand-200">
              Source: {card.source}
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>
    </div>
  );
}
