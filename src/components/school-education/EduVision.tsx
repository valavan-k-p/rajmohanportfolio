'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduVision({ locale }: { locale: Locale }) {
  const content = {
    en: {
      lead: 'Since assuming charge as Tamil Nadu’s School Education Minister in May 2026, Rajmohan Arumugam has focused on foundational learning, government-school readiness, student welfare, fair private-school practices, and technology-enabled education.',
      quote: '“Education must be foundational, inclusive, and protected. We are strengthening classroom readiness, modernising learning with TN SPARK, and safeguarding schools as neutral sanctuaries of growth.”',
      pillars: [
        {
          title: 'Foundational Learning',
          desc: 'Revamping early-grade education with activity-based learning materials to reduce rote memorisation and nurture motor and socio-emotional growth.',
        },
        {
          title: 'School Readiness & Access',
          desc: 'Ensuring safe facilities, drinking water, functioning labs, and reopening low-enrolment schools where at least 10 children return.',
        },
        {
          title: 'Policy Autonomy & Fairness',
          desc: 'Upholding Tamil Nadu’s historic Two-Language Policy (Tamil & English) and curbing private school overcharging through digital oversight.',
        },
      ],
      sourcingNote: 'Source: Official Department Profile (tn.gov.in) & Ministerial Statements (The Hindu, May 2026).',
    },
    ta: {
      lead: 'மே 2026-ல் தமிழ்நாட்டின் பள்ளிக் கல்வித்துறை அமைச்சராகப் பொறுப்பேற்றதிலிருந்து, ராஜ்மோகன் ஆறுமுகம் அடிப்படை கற்றல், அரசுப் பள்ளிகளின் தயார்நிலை, மாணவர் நலம், தனியார் பள்ளிகளின் நேர்மையான செயல்பாடுகள் மற்றும் தொழில்நுட்பம் சார்ந்த கல்வியில் தீவிர கவனம் செலுத்தி வருகிறார்.',
      quote: '“கல்வி என்பது அடித்தளமிக்கதாகவும், அனைவரையும் உள்ளடக்கியதாகவும், பாதுகாப்பானதாகவும் இருக்க வேண்டும். வகுப்பறை தயார்நிலையை வலுப்படுத்தி, டி.என் ஸ்பார்க் மூலம் கற்றலை நவீனமயமாக்கி, பள்ளிகளை கற்றலுக்கான தளங்களாகப் பாதுகாப்பதே எங்கள் நோக்கம்.”',
      pillars: [
        {
          title: 'அடிப்படை கற்றல் வளர்ச்சி',
          desc: 'மனப்பாடக் கல்வி முறையைக் குறைத்து, செயல்வழிக் கற்றல், உடல் இயக்கம் மற்றும் சமூக-உணர்ச்சி வளர்ச்சியை வளர்க்கும் புதிய பாடநூல்கள் அறிமுகம்.',
        },
        {
          title: 'பள்ளி தயார்நிலை & சம உரிமை',
          desc: 'குடிநீர், சுகாதார வசதிகள் மற்றும் ஸ்மார்ட் ஆய்வகங்களை உறுதி செய்தல்; 10 மாணவர்கள் சேர்ந்தால் மூடப்பட்ட பள்ளிகளையும் மீண்டும் திறக்கும் அணுகுமுறை.',
        },
        {
          title: 'கொள்கை சுயாட்சி & வெளிப்படைத்தன்மை',
          desc: 'தமிழ்நாட்டின் வரலாற்றுச் சிறப்புமிக்க இருமொழிக் கொள்கையை (தமிழ் & ஆங்கிலம்) நிலைநிறுத்துதல் மற்றும் தனியார் பள்ளி கட்டணங்களை ஒழுங்குபடுத்துதல்.',
        },
      ],
      sourcingNote: 'ஆதாரம்: அரசுத் துறை குறிப்பு (tn.gov.in) & அமைச்சர் அறிக்கைகள் (தி இந்து, மே 2026).',
    },
  }[locale];

  return (
    <div className="space-y-12">
      {/* Lead Narrative */}
      <EduReveal className="max-w-[48rem] mx-auto text-center">
        <p className="font-display text-2xl md:text-3xl text-charcoal-900 leading-snug">
          {content.lead}
        </p>
      </EduReveal>

      {/* Editorial Blockquote */}
      <EduReveal delay={0.1} className="max-w-[44rem] mx-auto">
        <div className="bg-sand-50 p-8 border-l-4 border-maroon-700 shadow-sm">
          <p className="font-serif italic text-lg md:text-xl text-charcoal-800 leading-relaxed">
            {content.quote}
          </p>
        </div>
      </EduReveal>

      {/* 3 Core Pillars */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {content.pillars.map((pillar, idx) => (
          <EduStaggerItem
            key={idx}
            className="bg-white p-6 border border-sand-300 flex flex-col justify-between"
          >
            <div>
              <div className="u-eyebrow text-maroon-700 mb-2">0{idx + 1}</div>
              <h3 className="font-display text-xl text-charcoal-900 mb-3">
                {pillar.title}
              </h3>
              <p className="text-charcoal-700 text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>

      {/* Sourcing Footnote */}
      <EduReveal delay={0.2} className="text-center pt-2">
        <p className="text-xs text-charcoal-500 font-sans tracking-wide">
          {content.sourcingNote}
        </p>
      </EduReveal>
    </div>
  );
}
