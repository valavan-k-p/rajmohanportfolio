'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduNews({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Gazette Dispatches & Verified Media Coverage',
      standfirst:
        'Documented news coverage, ministerial announcements, and verified press reports concerning the Department of School Education.',
      articles: [
        {
          lead: true,
          date: '19 May 2026',
          category: 'CURRICULUM REFORM',
          title: '9 Revised Primary Textbooks Released; Two-Language Policy Reaffirmed',
          summary:
            'Minister Rajmohan Arumugam unveiled nine activity-rich textbooks for Classes 1–3 to reduce reliance on rote memorisation and nurture motor and cognitive growth. The Minister confirmed Tamil Nadu will strictly maintain its historic two-language formula of Tamil and English, opposing NEP and NEET.',
          outlet: 'The Hindu / New Indian Express',
        },
        {
          lead: false,
          date: '17 June 2026',
          category: 'DIGITAL GOVERNANCE',
          title: 'Online NOC and Private School Recognition Portal from July 1',
          summary:
            'Digital submission system announced to eliminate middlemen and ensure transparent processing for private school approvals.',
          outlet: 'New Indian Express',
        },
        {
          lead: false,
          date: 'August 2026',
          category: 'STUDENT WELFARE',
          title: 'Withdrawal of Cases Against Anti-NEET Student Protesters',
          summary:
            'State government formally withdrew criminal cases registered against students participating in anti-NEET demonstrations.',
          outlet: 'The Hindu',
        },
        {
          lead: false,
          date: 'August 2026',
          category: 'ACCESS & RETENTION',
          title: '10-Student Enrolment Reopening Rule for Closed Govt Schools',
          summary:
            'Legislative directive ensuring closed schools reopen when 10 students register, supported by door-to-door dropout recovery surveys.',
          outlet: 'Dinamalar Kalvimalar',
        },
        {
          lead: false,
          date: '22 July 2026',
          category: 'TECH CURRICULUM',
          title: 'TN SPARK AI & Emerging Technology Roadmap Announced',
          summary:
            'Phased technology curriculum scaling from 5,000 pilot schools to Classes 6–8 and high-school coding modules.',
          outlet: 'New Indian Express',
        },
      ],
    },
    ta: {
      headline: 'செய்திகள் & ஊடக ஆவணங்கள்',
      standfirst:
        'தமிழ்நாடு பள்ளிக் கல்வித்துறை தொடர்பான பத்திரிகை செய்திகள், அரசு அறிவிப்புகள் மற்றும் ஊடகக் குறிப்புகள்.',
      articles: [
        {
          lead: true,
          date: '19 மே 2026',
          category: 'பாடத்திட்ட சீர்திருத்தம்',
          title: '1–3 வகுப்புகளுக்கு 9 புதிய செயல்வழிப் பாடநூல்கள் வெளியீடு; இருமொழிக் கொள்கை உறுதி',
          summary:
            'மனப்பாடக் கல்வியைத் தவிர்த்து செயல்வழிக் கற்றலை ஊக்குவிக்கும் 9 புதிய வண்ணமயமான பாடநூல்களை அமைச்சர் ராஜ்மோகன் ஆறுமுகம் வெளியிட்டார். தமிழ்-ஆங்கிலம் இருமொழிக் கொள்கையில் அரசு உறுதியாக இருக்கும் என்றும், NEP மற்றும் நீட் திணிப்பை ஏற்க மாட்டோம் என்றும் தெரிவித்தார்.',
          outlet: 'தி இந்து / நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
        {
          lead: false,
          date: '17 ஜூன் 2026',
          category: 'டிஜிட்டல் நிர்வாகம்',
          title: 'தனியார் பள்ளிகளுக்கான இணையவழி NOC & அங்கீகார முறை',
          summary:
            'இடைத்தரகர்களைத் தவிர்த்து வெளிப்படையான அனுமதிகளை வழங்க ஜூலை 1 முதல் இணையவழி விண்ணப்ப முறை தொடக்கம்.',
          outlet: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
        {
          lead: false,
          date: 'ஆகஸ்ட் 2026',
          category: 'மாணவர் நலம்',
          title: 'நீட் எதிர்ப்புப் போராட்ட மாணவர்கள் மீதான வழக்குகள் ரத்து',
          summary:
            'நீட் தேர்வுக்கு எதிராகப் போராடிய மாணவர்கள் மீது பதியப்பட்ட வழக்குகளைத் திரும்பப் பெற அரசு உத்தரவு.',
          outlet: 'தி இந்து',
        },
        {
          lead: false,
          date: 'ஆகஸ்ட் 2026',
          category: 'கல்வி சமத்துவம்',
          title: '10 மாணவர்கள் சேர்ந்தால் மூடப்பட்ட அரசுப் பள்ளிகள் மறுதிறப்பு',
          summary:
            'கிராமப்புறக் கல்வி வாய்ப்பை உறுதி செய்ய சட்டமன்றத்தில் உத்தரவு; இடைநிற்றல் குழந்தைகளை மீட்க ஆசிரியர் கணக்கெடுப்பு.',
          outlet: 'தினமலர் கல்விமலர்',
        },
        {
          lead: false,
          date: '22 ஜூலை 2026',
          category: 'தொழில்நுட்பக் கல்வி',
          title: 'டி.என் ஸ்பார்க் AI & கோடிங் பாடத்திட்ட வரைபடம்',
          summary:
            '5,000 பள்ளிகளில் முன்னோடியாகத் தொடங்கப்பட்ட டி.என் ஸ்பார்க் திட்டம் உயர் வகுப்புகளுக்கு விரிவுபடுத்தப்படுகிறது.',
          outlet: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
        },
      ],
    },
  }[locale];

  return (
    <div className="space-y-8 max-w-[72rem] mx-auto">
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed mt-2">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* Clean Editorial Grid with Top Hairlines */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pt-2">
        {content.articles.map((item, idx) => (
          <EduStaggerItem
            key={idx}
            topLineColor="bg-maroon-700/60"
            className={`pt-5 flex flex-col justify-between space-y-4 ${
              item.lead ? 'md:col-span-2 lg:col-span-2' : ''
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-maroon-700 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-charcoal-500">{item.date}</span>
              </div>
              <h4
                className={`font-display text-charcoal-900 leading-snug font-semibold ${
                  item.lead ? 'text-2xl sm:text-3xl' : 'text-lg'
                }`}
              >
                {item.title}
              </h4>
              <p
                className={`text-charcoal-700 leading-relaxed ${
                  item.lead ? 'text-base' : 'text-sm'
                }`}
              >
                {item.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-sand-200 flex items-center justify-between text-xs text-charcoal-500 font-mono">
              <span>{item.outlet}</span>
              <span className="text-emerald-800 font-medium">● Verified Media</span>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>
    </div>
  );
}
