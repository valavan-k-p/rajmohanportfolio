'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduInitiatives({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Process Reform, Institutional Governance & Technology',
      standfirst:
        'Systemic governance reforms targeting transparency, fee exploitation, school safety, and 21st-century technological literacy.',
      initiatives: [
        {
          num: '01',
          title: 'Online NOC & Private School Recognition Portal',
          body: 'Announced to commence from 1 July 2026, this digital approvals mechanism enables private schools to submit recognition-renewal and No-Objection Certificate applications online. The system eliminates discretionary middlemen, enforces timestamped tracking, and curtails bribery opportunities in school administration.',
          badge: 'Process Reform · July 2026',
          source: 'New Indian Express',
        },
        {
          num: '02',
          title: 'Enforcement of Statutory Fee-Determination Caps',
          body: 'Issued strict public warnings to private institutions demanding adherence to fees established by the official state fee-determination committee. The administration warned of punitive departmental action against institutions levying unauthorised capitation or inflated fees on parents.',
          badge: 'Parent Protection · June 2026',
          source: 'New Indian Express',
        },
        {
          num: '03',
          title: 'Campus Visitor Regulation & Learning Sanctuary',
          body: 'Announced stringent guidelines restricting outside visitors, political party representatives, and commercial organisations from entering government school campuses or directly engaging students during school hours, preserving school safety and institutional neutrality.',
          badge: 'Campus Safety · July 2026',
          source: 'New Indian Express',
        },
        {
          num: '04',
          title: 'TN SPARK — AI & Emerging Technologies Roadmap',
          body: 'Piloted across ~5,000 schools, the TN SPARK initiative prepares government-school students for modern careers by introducing artificial intelligence, coding concepts, and emerging technology modules for Classes 6–8, expanding progressively to higher secondary grades.',
          badge: 'Digital Literacy · Piloting in ~5,000 Schools',
          source: 'New Indian Express',
        },
      ],
    },
    ta: {
      headline: 'நிர்வாகச் சீர்திருத்தம், பள்ளி ஒழுங்குமுறை & தொழில்நுட்பம்',
      standfirst:
        'வெளிப்படைத்தன்மை, கட்டணச் சுரண்டல் தடுப்பு, வளாகப் பாதுகாப்பு மற்றும் 21-ஆம் நூற்றாண்டு தொழில்நுட்பக் கல்வியை நோக்கிய மாற்றங்கள்.',
      initiatives: [
        {
          num: '01',
          title: 'இணையவழி தடையில்லாச் சான்றிதழ் (NOC) & அங்கீகார முறை',
          body: 'ஜூலை 1, 2026 முதல் தொடங்கப்பட்ட இந்த இணையவழி முறை மூலம், தனியார் பள்ளிகள் அங்கீகார புதுப்பித்தல் மற்றும் தடையில்லா சான்றிதழ்களுக்கு நேரடியாக விண்ணப்பிக்கலாம். இது இடைத்தரகர்களை அகற்றி, காலதாமதத்தைத் தவிர்த்து, லஞ்சத்தை ஒழிக்க வழிவகை செய்கிறது.',
          badge: 'நிர்வாகச் சீர்திருத்தம் · ஜூலை 2026',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
        {
          num: '02',
          title: 'கட்டண நிர்ணயக் குழு வரம்புகளைக் கட்டாயமாக்குதல்',
          body: 'அரசு அமைத்துள்ள கட்டண நிர்ணயக் குழு நிர்ணயித்த கட்டணத்தை விடக் கூடுதலாக வசூலிக்கும் தனியார் பள்ளிகள் மீது கடும் நடவடிக்கை எடுக்கப்படும் என எச்சரிக்கை விடுக்கப்பட்டது. பெற்றோர்களின் நிதிச் சுமையைக் குறைப்பதே இதன் நோக்கம்.',
          badge: 'பெற்றோர் பாதுகாப்பு · ஜூன் 2026',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
        {
          num: '03',
          title: 'பள்ளி வளாகப் பார்வையாளர்கள் ஒழுங்குமுறை நெறிமுறை',
          body: 'பள்ளி நேரங்களில் அரசியல் கட்சியினர், தனியார் அமைப்புகள் அல்லது அனுமதியற்ற நபர்கள் வளாகத்திற்குள் நுழைந்து மாணவர்களை ஈடுபடுத்துவதைத் தடை செய்யும் வழிகாட்டுதல்கள். பள்ளிகள் அமைதியான கற்றல் தளங்களாக இயங்குவதை இது உறுதி செய்கிறது.',
          badge: 'வளாகப் பாதுகாப்பு · ஜூலை 2026',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
        {
          num: '04',
          title: 'டி.என் ஸ்பார்க் — செயற்கை நுண்ணறிவு & நவீன தொழில்நுட்பத் திட்டம்',
          body: 'ஏறத்தாழ 5,000 பள்ளிகளில் முன்னோடியாகத் தொடங்கப்பட்ட டி.என் ஸ்பார்க் திட்டம், 6 முதல் 8-ஆம் வகுப்பு மாணவர்களுக்கு செயற்கை நுண்ணறிவு, கோடிங் மற்றும் தொழில்நுட்ப அறிவை வழங்கி, மேல்நிலைக் கல்வி வரை படிப்படியாக விரிவுபடுத்த திட்டமிடப்பட்டுள்ளது.',
          badge: 'டிஜிட்டல் அறிவு · 5,000 பள்ளிகளில் முன்னோடி',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
      ],
    },
  }[locale];

  return (
    <div className="space-y-12">
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-3xl text-charcoal-900 leading-tight mb-2">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* Staggered 2-Column Grid */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {content.initiatives.map((item, idx) => (
          <EduStaggerItem
            key={idx}
            className={`p-8 bg-sand-50 border border-sand-300 flex flex-col justify-between ${
              idx % 2 === 1 ? 'md:translate-y-8' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl text-maroon-700 font-light">
                  {item.num}
                </span>
                <span className="text-xs uppercase tracking-wider bg-white px-3 py-1 border border-sand-300 text-charcoal-700 font-medium">
                  {item.badge}
                </span>
              </div>
              <h4 className="font-display text-2xl text-charcoal-900 mb-3 leading-snug">
                {item.title}
              </h4>
              <p className="text-charcoal-700 text-sm leading-relaxed mb-6">
                {item.body}
              </p>
            </div>

            <div className="pt-4 border-t border-sand-200 text-xs text-charcoal-500 font-mono">
              Source: {item.source}
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>
    </div>
  );
}
