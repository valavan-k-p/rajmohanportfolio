'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduStudents({ locale }: { locale: Locale }) {
  const content = {
    en: {
      leadQuote:
        '“Students deserve nutrition, freedom from unnecessary legal intimidation, and an environment dedicated entirely to curiosity and learning.”',
      initiatives: [
        {
          tag: 'Student Nutrition Proposal',
          title: 'Weekly Chicken Biryani in School Meals',
          detail:
            'A proposal to introduce chicken biryani once a week in government-school noon meal programmes is under serious consideration by the government, aimed at enhancing child nutrition, student welfare, and attendance.',
          statusNote: 'Proposal under ministerial review & final Chief Minister consideration.',
          source: 'New Indian Express, August 2026',
        },
        {
          tag: 'Student Rights & Legal Relief',
          title: 'Withdrawal of Cases Against Anti-NEET Student Protesters',
          detail:
            'In August 2026, the School Education Minister announced the government’s decision—under Chief Minister direction—to formally withdraw all criminal cases registered against students who participated in democratic anti-NEET protests.',
          statusNote: 'Executive policy action to protect student futures and career prospects.',
          source: 'The Hindu, August 2026',
        },
        {
          tag: 'Campus Safety & Mental Space',
          title: 'Sanctuary Classrooms & Visitor Restrictions',
          detail:
            'Regulating entry into government school grounds to prevent political-party representatives, commercial entities, or unauthorized visitors from engaging students during instructional hours.',
          statusNote: 'Policy directive to maintain institutional neutrality and pupil safety.',
          source: 'New Indian Express, July 2026',
        },
      ],
    },
    ta: {
      leadQuote:
        '“மாணவர்களுக்குச் சத்தான உணவு, தேவையின்றி பதியப்பட்ட வழக்குகளிலிருந்து விடுதலை மற்றும் கற்றலுக்கேற்ற அமைதியான சூழல் ஆகியவை அவசியமானவை.”',
      initiatives: [
        {
          tag: 'ஊட்டச்சத்து முன்மொழிவு',
          title: 'வாரம் ஒரு முறை சிக்கன் பிரியாணி திட்டம்',
          detail:
            'அரசுப் பள்ளி மதிய உணவுத் திட்டத்தில் வாரம் ஒரு முறை சிக்கன் பிரியாணி வழங்கும் முன்மொழிவு அரசின் தீவிரப் பரிசீலனையில் உள்ளது; இது மாணவர்களின் ஊட்டச்சத்து மற்றும் வருகையை அதிகரிக்க உதவும் எனத் தெரிவிக்கப்பட்டுள்ளது.',
          statusNote: 'அமைச்சகப் பரிசீலனை மற்றும் முதலமைச்சரின் இறுதி முடிவுக்கான முன்மொழிவு.',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ், ஆகஸ்ட் 2026',
        },
        {
          tag: 'மாணவர் உரிமை & சட்டப் பாதுகாப்பு',
          title: 'நீட் எதிர்ப்பு போராட்டத்தில் ஈடுபட்ட மாணவர்கள் மீதான வழக்குகள் வாபஸ்',
          detail:
            'நீட் தேர்வுக்கு எதிராக ஜனநாயக வழியில் போராடிய மாணவர்கள் மீது பதியப்பட்ட வழக்குகளைத் திரும்பப் பெற முதலமைச்சரின் வழிகாட்டுதலின்படி பள்ளிக் கல்வித்துறை அமைச்சர் ராஜ்மோகன் அறிவித்தார்.',
          statusNote: 'மாணவர்களின் எதிர்காலம் மற்றும் கல்வி நலனைக் காக்கும் கொள்கை முடிவு.',
          source: 'தி இந்து, ஆகஸ்ட் 2026',
        },
        {
          tag: 'வளாகப் பாதுகாப்பு & கற்றல் சூழல்',
          title: 'அரசியல் தலையீடற்ற பாதுகாப்பான வகுப்பறைகள்',
          detail:
            'பள்ளி வளாகங்களுக்குள் அரசியல் கட்சியினர், தனியார் அமைப்புகள் அல்லது அனுமதியற்ற நபர்கள் நுழைந்து மாணவர்களை ஈடுபடுத்துவதைத் தடை செய்து கற்றல் நேரத்தைப் பாதுகாத்தல்.',
          statusNote: 'பள்ளி அமைதியைப் பேண வெளியிடப்பட்ட வழிகாட்டு நெறிமுறை.',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ், ஜூலை 2026',
        },
      ],
    },
  }[locale];

  return (
    <div className="space-y-12">
      {/* Pull Quote Header */}
      <EduReveal className="max-w-[48rem] mx-auto text-center">
        <p className="font-serif italic text-2xl md:text-3xl text-charcoal-900 leading-snug">
          {content.leadQuote}
        </p>
      </EduReveal>

      {/* 3 Welfare & Protection Cards */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.initiatives.map((item, idx) => (
          <EduStaggerItem
            key={idx}
            className="bg-white p-8 border border-sand-300 flex flex-col justify-between shadow-sm"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-sand-100 text-xs font-semibold uppercase tracking-wider text-maroon-700 mb-4 border border-sand-300">
                {item.tag}
              </span>
              <h3 className="font-display text-2xl text-charcoal-900 mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-charcoal-700 text-sm leading-relaxed mb-6">
                {item.detail}
              </p>
            </div>

            <div className="pt-4 border-t border-sand-200">
              <p className="text-xs text-charcoal-600 italic mb-1">
                {item.statusNote}
              </p>
              <p className="text-xs text-charcoal-500 font-mono">
                {item.source}
              </p>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>
    </div>
  );
}
