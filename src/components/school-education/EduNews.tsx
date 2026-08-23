'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduNews({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'News & Official Announcements',
      standfirst:
        'Archived press releases, ministerial statements, and verified media reporting on Tamil Nadu’s school education governance.',
      articles: [
        {
          lead: true,
          date: 'May 19, 2026',
          title: 'Minister Releases 9 Activity-Rich Textbooks for Classes 1–3; Reaffirms Two-Language Policy',
          summary:
            'Tamil Nadu School Education Minister Rajmohan Arumugam released 9 new textbooks for primary grades, aiming to eliminate rote memorisation through colourful, experiential learning. He reiterated that the State will remain committed to its historic Two-Language Policy of Tamil and English, firmly rejecting NEP and NEET imposition.',
          outlet: 'The Hindu / New Indian Express',
          category: 'Curriculum & Policy',
        },
        {
          lead: false,
          date: 'June 17, 2026',
          title: 'Online NOC and Recognition Portal for Private Schools from July 1',
          summary:
            'A digital mechanism announced to curb bribery and middlemen in private-school renewal orders and No-Objection Certificates.',
          outlet: 'New Indian Express',
          category: 'Governance Reform',
        },
        {
          lead: false,
          date: 'August 2026',
          title: 'Government Withdraws Cases Against Anti-NEET Student Protesters',
          summary:
            'Following directions from Chief Minister C. Joseph Vijay, Rajmohan announced the withdrawal of cases against student protesters.',
          outlet: 'The Hindu',
          category: 'Student Welfare',
        },
        {
          lead: false,
          date: 'August 2026',
          title: 'Schools Closed for Low Enrolment to Reopen if 10 Students Join',
          summary:
            'Assembly assurance on rural education access, backed by door-to-door teacher outreach to bring dropouts back to classrooms.',
          outlet: 'Dinamalar Kalvimalar',
          category: 'Access & Retention',
        },
        {
          lead: false,
          date: 'July 22, 2026',
          title: 'Tamil Nadu Charts AI and Emerging Tech Roadmap for Govt Schools',
          summary:
            'TN SPARK curriculum expansion progressing from 5,000 pilot schools to Classes 6–8 and coding modules for higher secondary.',
          outlet: 'New Indian Express',
          category: 'Digital Innovation',
        },
      ],
    },
    ta: {
      headline: 'செய்திகள் & அதிகாரப்பூர்வ அறிவிப்புகள்',
      standfirst:
        'தமிழ்நாடு பள்ளிக் கல்வித்துறை தொடர்பான பத்திரிகை செய்திகள், அமைச்சர் அறிக்கைகள் மற்றும் ஊடக ஆவணங்கள்.',
      articles: [
        {
          lead: true,
          date: 'மே 19, 2026',
          title: '1, 2, 3-ஆம் வகுப்புகளுக்கு 9 புதிய செயல்வழிப் பாடநூல்கள் வெளியீடு; இருமொழிக் கொள்கை மீண்டும் உறுதி',
          summary:
            'மனப்பாடக் கல்வியைத் தவிர்த்து செயல்வழிக் கற்றலை ஊக்குவிக்கும் 9 புதிய வண்ணமயமான பாடநூல்களை அமைச்சர் ராஜ்மோகன் ஆறுமுகம் வெளியிட்டார். தமிழ்நாட்டின் வரலாற்றுச் சிறப்புமிக்க இருமொழிக் கொள்கையில் அரசு உறுதியாக இருக்கும் என்றும், NEP மற்றும் நீட் திணிப்பை ஏற்க மாட்டோம் என்றும் தெரிவித்தார்.',
          outlet: 'தி இந்து / நியூ இந்தியன் எக்ஸ்பிரஸ்',
          category: 'பாடத்திட்டம் & கொள்கை',
        },
        {
          lead: false,
          date: 'ஜூன் 17, 2026',
          title: 'தனியார் பள்ளிகளுக்கான இணையவழி NOC மற்றும் அங்கீகார முறை ஜூலை 1 முதல்',
          summary:
            'இடைத்தரகர்களையும் லஞ்சத்தையும் ஒழிக்கும் வகையில் தனியார் பள்ளிகள் அங்கீகாரத்திற்கு நேரடியாக ஆன்லைனில் விண்ணப்பிக்கும் புதிய முறைமை.',
          outlet: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
          category: 'நிர்வாகச் சீர்திருத்தம்',
        },
        {
          lead: false,
          date: 'ஆகஸ்ட் 2026',
          title: 'நீட் எதிர்ப்பு போராட்டத்தில் ஈடுபட்ட மாணவர்கள் மீதான வழக்குகள் வாபஸ்',
          summary:
            'முதலமைச்சரின் வழிகாட்டுதலின்படி நீட் எதிர்ப்புப் போராட்டத்தில் பங்கேற்ற மாணவர்கள் மீதான வழக்குகளைத் திரும்பப் பெற அமைச்சர் அறிவிப்பு.',
          outlet: 'தி இந்து',
          category: 'மாணவர் நலம்',
        },
        {
          lead: false,
          date: 'ஆகஸ்ட் 2026',
          title: '10 மாணவர்கள் சேர்ந்தாலே மூடப்பட்ட அரசுப் பள்ளிகளைத் திறக்க உத்தரவு',
          summary:
            'கிராமப்புறக் கல்வி வாய்ப்பை உறுதி செய்ய சட்டமன்றத்தில் உறுதிமொழி; இடைநிற்றல் குழந்தைகளை மீட்க வீடு வீடாக ஆசிரியர் கணக்கெடுப்பு.',
          outlet: 'தினமலர் கல்விமலர்',
          category: 'சேர்க்கை & தக்கவைப்பு',
        },
        {
          lead: false,
          date: 'ஜூலை 22, 2026',
          title: 'அரசுப் பள்ளி மாணவர்களுக்கான AI மற்றும் தொழில்நுட்பக் கல்வித் திட்டம்',
          summary:
            '5,000 பள்ளிகளில் முன்னோடியாகத் தொடங்கப்பட்ட டி.என் ஸ்பார்க் திட்டத்தை 6 முதல் 8-ஆம் வகுப்புகளுக்கு விரிவுபடுத்தும் வரைபடம்.',
          outlet: 'நியூ இந்தியன் எக்ஸ்பிரஸ்',
          category: 'டிஜிட்டல் கல்வி',
        },
      ],
    },
  }[locale];

  return (
    <div className="space-y-10">
      <EduReveal className="max-w-[48rem]">
        <p className="text-charcoal-700 text-base leading-relaxed">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* 3-Column Editorial Index with Double-Width Lead Article */}
      <EduStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.articles.map((item, idx) => (
          <EduStaggerItem
            key={idx}
            className={`bg-sand-50 p-8 border border-sand-300 flex flex-col justify-between ${
              item.lead ? 'md:col-span-2 lg:col-span-2 bg-sand-100' : ''
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-maroon-700 font-bold">
                  {item.category}
                </span>
                <span className="text-xs text-charcoal-500 font-mono">
                  {item.date}
                </span>
              </div>
              <h3
                className={`font-display text-charcoal-900 leading-snug ${
                  item.lead ? 'text-2xl md:text-3xl' : 'text-xl'
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-charcoal-700 leading-relaxed ${
                  item.lead ? 'text-base' : 'text-sm'
                }`}
              >
                {item.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-sand-300 flex items-center justify-between text-xs text-charcoal-500 font-sans">
              <span>{item.outlet}</span>
              <span className="text-maroon-700 font-semibold">Verified Archive</span>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>
    </div>
  );
}
