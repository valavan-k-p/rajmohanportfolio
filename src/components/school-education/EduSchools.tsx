'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduStaggerContainer, EduStaggerItem, EduReveal } from './EduMotion';

export function EduSchools({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Campus Readiness, Modern Classrooms & Reopening Access',
      standfirst:
        'A strong school system begins with safe, clean, and technologically equipped physical environments. Departmental oversight has focused on summer reopening preparedness and lowering barriers to rural school continuity.',
      points: [
        {
          title: 'Heatwave-Adjusted Reopening & Readiness Checks',
          desc: 'School reopening for 2026 was moved to 4 June to protect students from extreme summer heat. All government schools underwent pre-reopening audits for drinking water, sanitation, kitchen hygiene, and electrical safety.',
        },
        {
          title: 'Smart Boards & Digital Classrooms',
          desc: 'Rajmohan inaugurated 21 smart boards in Chennai on reopening day, distributed learning kits, and monitored the operational state of Hi-Tech labs to support interactive digital pedagogy.',
        },
        {
          title: '“10 Students Are Enough” — Reopening Policy',
          desc: 'Addressing school closures, the minister directed in the Assembly that closed government schools will be reopened wherever at least 10 children enrol, eliminating travel distance barriers for vulnerable communities.',
        },
      ],
      calloutTitle: 'Readiness Checklist Mandate',
      calloutItems: [
        'Potable drinking water & functional sanitation',
        'Mid-day meal kitchen readiness & food hygiene',
        'Hi-Tech labs & smart board electrical audit',
        'Timely textbook & learning material delivery',
      ],
      citation: 'Sources: news.careers360.com, thenewsmill.com, dinamalar.com (June–August 2026)',
    },
    ta: {
      headline: 'பள்ளி வளாகத் தயார்நிலை, நவீன வகுப்பறைகள் & மறுதிறப்பு',
      standfirst:
        'பாதுகாப்பான, சுத்தமான மற்றும் தொழில்நுட்ப வசதிகளுடன் கூடிய வகுப்பறைகளே தரமான கல்வியின் அடித்தளம். கோடை விடுமுறைக்குப் பின் பள்ளிகள் திறக்கப்படுவதை மேற்பார்வையிட்டு, குறைந்த சேர்க்கை கொண்ட உள்ளூர் பள்ளிகளைப் பாதுகாக்கும் நடவடிக்கைகள் மேற்கொள்ளப்பட்டன.',
      points: [
        {
          title: 'வெப்ப அலைக்கேற்ப திறப்பு & தயார்நிலை ஆய்வு',
          desc: 'கடும் கோடை வெப்பம் காரணமாக பள்ளிகள் திறப்பு ஜூன் 4-க்கு மாற்றப்பட்டது. அனைத்து அரசுப் பள்ளிகளிலும் குடிநீர், கழிப்பறை, சமையலறை மற்றும் மின்சார வசதிகள் முன்கூட்டியே ஆய்வு செய்யப்பட்டன.',
        },
        {
          title: '21 ஸ்மார்ட் போர்டுகள் & நவீன ஆய்வகங்கள்',
          desc: 'பள்ளிகள் திறப்பு நாளில் சென்னையில் 21 ஸ்மார்ட் போர்டுகளை அமைச்சர் ராஜ்மோகன் தொடங்கி வைத்து, கற்றல் உபகரணங்களை வழங்கினார். ஹை-டெக் ஆய்வகங்களின் செயல்பாடும் உறுதி செய்யப்பட்டது.',
        },
        {
          title: '‘10 மாணவர்கள் போதும்’ — பள்ளிகள் மறுதிறப்பு உத்தரவு',
          desc: 'குறைந்த சேர்க்கை காரணமாக மூடப்பட்ட அரசுப் பள்ளிகளில் 10 மாணவர்கள் சேர்ந்தாலே அப்பள்ளிகளை மீண்டும் திறக்க சட்டமன்றத்தில் உத்தரவிடப்பட்டது; இது ஏழை எளிய மாணவர்களின் கல்வி உரிமையை உறுதி செய்கிறது.',
        },
      ],
      calloutTitle: 'முக்கிய தயார்நிலை கட்டளைகள்',
      calloutItems: [
        'சுத்தமான குடிநீர் மற்றும் முறையான கழிப்பறை வசதி',
        'மதிய உணவு சமையலறை மற்றும் சுகாதார உறுதிப்பாடு',
        'ஹை-டெக் லேப் மற்றும் ஸ்மார்ட் போர்டு பரிசோதனை',
        'பாடநூல்கள் மற்றும் கற்றல் கருவிகள் தடையின்றி வழங்கல்',
      ],
      citation: 'ஆதாரங்கள்: நியூஸ் கேரியர்ஸ்360, தி நியூஸ் மில், தினமலர் (ஜூன்–ஆகஸ்ட் 2026)',
    },
  }[locale];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* 7 Columns: Main Narrative & Points */}
      <div className="lg:col-span-7 space-y-8">
        <EduReveal>
          <h3 className="font-display text-3xl text-charcoal-900 leading-tight">
            {content.headline}
          </h3>
        </EduReveal>

        <EduReveal delay={0.08}>
          <p className="text-charcoal-700 text-lg leading-relaxed">
            {content.standfirst}
          </p>
        </EduReveal>

        <EduStaggerContainer className="space-y-6 pt-2">
          {content.points.map((pt, idx) => (
            <EduStaggerItem
              key={idx}
              className="p-6 bg-sand-50 border-l-4 border-maroon-700 border-y border-r border-sand-300"
            >
              <h4 className="font-display text-xl text-charcoal-900 mb-2">
                {pt.title}
              </h4>
              <p className="text-charcoal-700 text-sm leading-relaxed">
                {pt.desc}
              </p>
            </EduStaggerItem>
          ))}
        </EduStaggerContainer>
      </div>

      {/* 5 Columns: Inspection Callout & Metric Card */}
      <div className="lg:col-span-5 space-y-6">
        <EduReveal delay={0.12} className="bg-sand-100 p-8 border border-sand-300">
          <div className="u-eyebrow text-maroon-700 mb-3">
            {locale === 'ta' ? 'அடிப்படை உள்கட்டமைப்பு' : 'CAMPUS AUDIT'}
          </div>
          <h4 className="font-display text-2xl text-charcoal-900 mb-4">
            {content.calloutTitle}
          </h4>
          <ul className="space-y-3">
            {content.calloutItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-charcoal-800"
              >
                <span className="text-maroon-700 font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-sand-300">
            <div className="font-display text-4xl text-charcoal-900">
              21 <span className="text-base font-sans text-charcoal-600 font-normal">Smart Boards Inaugurated</span>
            </div>
            <div className="text-xs text-charcoal-500 mt-2 font-sans">
              {content.citation}
            </div>
          </div>
        </EduReveal>
      </div>
    </div>
  );
}
