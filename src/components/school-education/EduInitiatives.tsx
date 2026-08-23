'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduInitiatives({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Process Reform, Institutional Governance & Digital Literacy',
      standfirst:
        'Targeted administrative reforms to eliminate middlemen in school recognition, enforce parent fee protections, preserve campus safety, and modernise technical literacy.',
      initiatives: [
        {
          code: 'REF-01',
          badge: 'PROCESS REFORM · JULY 2026',
          title: 'Online NOC & Private School Recognition Portal',
          body: 'Transitioned private school recognition-renewal and No-Objection Certificate (NOC) applications to a fully digital platform from 1 July 2026. The system enforces timestamped tracking, reduces administrative discretion, and curtails bribery opportunities in approvals.',
          source: 'New Indian Express',
        },
        {
          code: 'REF-02',
          badge: 'PARENT PROTECTION · JUNE 2026',
          title: 'Enforcement of Statutory Fee-Determination Caps',
          body: 'Issued strict regulatory directives warning private institutions against levying unauthorised charges above rates set by the official fee-determination committee, protecting parents from arbitrary educational costs.',
          source: 'New Indian Express',
        },
        {
          code: 'REF-03',
          badge: 'CAMPUS NEUTRALITY · JULY 2026',
          title: 'School Campus Visitor & Safety Guidelines',
          body: 'Introduced clear regulations restricting outside visitors, political party representatives, and commercial organisations from entering government school campuses during instructional hours, preserving institutional neutrality.',
          source: 'New Indian Express',
        },
        {
          code: 'REF-04',
          badge: 'TECH ROADMAP · ~5,000 PILOT SCHOOLS',
          title: 'TN SPARK — Emerging Technology & AI Curriculum',
          body: 'Initiated the rollout of the TN SPARK curriculum to introduce AI and emerging technologies for Classes 6–8, with planned expansion to high-school coding modules for Classes 9–12 backed by computer lab access.',
          source: 'New Indian Express',
        },
      ],
    },
    ta: {
      headline: 'நிர்வாகச் சீர்திருத்தம், பள்ளி ஒழுங்குமுறை & டிஜிட்டல் கல்வி',
      standfirst:
        'அங்கீகார அனுமதிகளில் இடைத்தரகர்களை அகற்றி, பெற்றோர் கட்டணச் சுமையைத் தடுத்து, வளாகப் பாதுகாப்பை உறுதி செய்து, நவீன தொழில்நுட்பக் கல்வியை வழங்கும் செயல்பாடுகள்.',
      initiatives: [
        {
          code: 'REF-01',
          badge: 'நிர்வாகச் சீர்திருத்தம் · ஜூலை 2026',
          title: 'இணையவழி NOC & தனியார் பள்ளி அங்கீகார முறை',
          body: 'ஜூலை 1, 2026 முதல் தனியார் பள்ளிகள் அங்கீகார புதுப்பித்தல் மற்றும் தடையில்லா சான்றிதழ்களுக்கு (NOC) நேரடியாக விண்ணப்பிக்கும் இணையவழி முறை தொடங்கப்பட்டது. இது இடைத்தரகர்களைத் தவிர்த்து லஞ்சத்தை ஒழிக்கிறது.',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
        {
          code: 'REF-02',
          badge: 'பெற்றோர் பாதுகாப்பு · ஜூன் 2026',
          title: 'கட்டண நிர்ணயக் குழு வரம்புகள் கட்டாயமாக்கல்',
          body: 'அரசு நிர்ணயித்த கட்டண வரம்புகளை மீறி அதிக கட்டணம் வசூலிக்கும் தனியார் பள்ளிகள் மீது கடும் நடவடிக்கை எடுக்கப்படும் என எச்சரிக்கை விடுக்கப்பட்டு பெற்றோர்களின் நிதிச் சுமை பாதுகாக்கப்படுகிறது.',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
        {
          code: 'REF-03',
          badge: 'வளாகப் பாதுகாப்பு · ஜூலை 2026',
          title: 'பள்ளி வளாகப் பார்வையாளர்கள் ஒழுங்குமுறை நெறிமுறை',
          body: 'பள்ளி நேரங்களில் அரசியல் கட்சியினர், தனியார் அமைப்புகள் அல்லது அனுமதியற்ற நபர்கள் வளாகத்திற்குள் நுழைந்து மாணவர்களை ஈடுபடுத்துவதைத் தடை செய்து கற்றல் சூழல் பாதுகாக்கப்படுகிறது.',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
        {
          code: 'REF-04',
          badge: 'தொழில்நுட்ப வரைபடம் · 5,000 பள்ளிகள்',
          title: 'டி.என் ஸ்பார்க் — AI & நவீன தொழில்நுட்பத் திட்டம்',
          body: '5,000 பள்ளிகளில் முன்னோடியாகத் தொடங்கப்பட்ட டி.என் ஸ்பார்க் திட்டம் மூலம் 6 முதல் 8-ஆம் வகுப்பு மாணவர்களுக்கு செயற்கை நுண்ணறிவு மற்றும் மேல்நிலைக் கல்விக்கு கோடிங் பாடத்திட்டம் விரிவுபடுத்தப்படுகிறது.',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
      ],
    },
  }[locale];

  return (
    <div className="space-y-10">
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed mt-2">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* 2-Column Grid with Equal Heights and Clean Alignment */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {content.initiatives.map((item) => (
          <EduStaggerItem
            key={item.code}
            className="h-full p-6 sm:p-7 bg-sand-50 border border-sand-300 flex flex-col justify-between shadow-sm space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-sand-300 pb-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-maroon-700">
                  {item.badge}
                </span>
                <span className="text-xs font-mono text-charcoal-500 font-semibold">
                  {item.code}
                </span>
              </div>
              <h4 className="font-display text-xl text-charcoal-900 mb-3 leading-snug font-semibold">
                {item.title}
              </h4>
              <p className="text-charcoal-700 text-sm leading-relaxed">
                {item.body}
              </p>
            </div>

            <div className="pt-3 border-t border-sand-200 text-[11px] text-charcoal-500 font-mono flex items-center justify-between">
              <span>Source: {item.source}</span>
              <span className="text-emerald-700 font-semibold">● Active Directive</span>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>
    </div>
  );
}
