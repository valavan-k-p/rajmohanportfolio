'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduStaggerContainer, EduStaggerItem, EduHairline } from './EduMotion';

export function EduPriorities({ locale }: { locale: Locale }) {
  const content = {
    en: {
      subtitle:
        'Current administrative priorities moving policy announcements into verified classroom implementation.',
      items: [
        {
          num: '01',
          title: 'Foundational Learning & Teacher Preparedness',
          detail:
            'Ensuring effective classroom rollout of the 9 revised activity-rich textbooks for Classes 1–3, coupled with specialised teacher training to transition from rote memorisation to activity-based teaching.',
          status: 'Underway · Classes 1–3 Rollout',
          source: 'The Hindu & New Indian Express, May 2026',
        },
        {
          num: '02',
          title: 'Private School Regulation & Digital Approvals',
          detail:
            'Enforcing statutory fee-determination panel caps to protect parents from arbitrary costs, and launching a transparent online portal for recognition renewal and No-Objection Certificates (NOC) to curb middlemen and bribery.',
          status: 'Announced · Portal Launch from July 2026',
          source: 'New Indian Express, June 2026',
        },
        {
          num: '03',
          title: 'Student Retention & School Reopening Policy',
          detail:
            'Commitment to reopen schools closed for low enrolment whenever 10 or more students enrol, supported by proactive door-to-door teacher surveys identifying out-of-school children and supporting their return.',
          status: 'Legislative Directive · August 2026',
          source: 'Dinamalar Kalvimalar, August 2026',
        },
        {
          num: '04',
          title: 'Technology-Enabled Education (TN SPARK)',
          detail:
            'Phased roadmap for the TN SPARK curriculum: piloting across ~5,000 schools, expanding emerging technologies to Classes 6–8, and progressively introducing coding and AI literacy in Classes 9–12 with dedicated lab access.',
          status: 'Roadmap & Pilot in ~5,000 Schools',
          source: 'New Indian Express, July 2026',
        },
      ],
    },
    ta: {
      subtitle:
        'அறிவிக்கப்பட்ட கொள்கைகளை வகுப்பறை செயல்பாடுகளாக மாற்றும் தற்போதைய முக்கிய முன்னுரிமைகள்.',
      items: [
        {
          num: '01',
          title: 'அடிப்படை கற்றல் & ஆசிரியர் தயார்நிலை',
          detail:
            '1 முதல் 3-ஆம் வகுப்புகளுக்கான 9 புதிய வண்ணமயமான செயல்வழிக் கற்றல் பாடநூல்களை நடைமுறைப்படுத்துதல்; மனப்பாடக் கல்வியிலிருந்து செயல்வழிக் கற்றலுக்கு மாற ஆசிரியர்களுக்குத் தொடர் பயிற்சி வழங்குதல்.',
          status: 'செயல்பாட்டில் உள்ளது · வகுப்புகள் 1–3',
          source: 'தி இந்து & நியூ இந்தியன் எக்ஸ்பிரஸ், மே 2026',
        },
        {
          num: '02',
          title: 'தனியார் பள்ளி ஒழுங்குமுறை & இணையதள அங்கீகாரம்',
          detail:
            'கட்டண நிர்ணயக் குழுவின் வரம்புகளை மீறும் தனியார் பள்ளிகள் மீது நடவடிக்கை; இடைத்தரகர்களைத் தவிர்த்து லஞ்சத்தை ஒழிக்க தடையில்லா சான்றிதழ் (NOC) மற்றும் அங்கீகாரத்திற்கான புதிய இணையதள முறைமை.',
          status: 'அறிவிக்கப்பட்டது · ஜூலை 2026 முதல்',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ், ஜூன் 2026',
        },
        {
          num: '03',
          title: 'மாணவர் தக்கவைப்பு & பள்ளிகள் மறுதிறப்பு',
          detail:
            '10 மாணவர்கள் சேர்ந்தாலே குறைந்த சேர்க்கையால் மூடப்பட்ட அரசுப் பள்ளிகளை மீண்டும் திறக்கும் உத்தரவு; இடைநிற்றல் மாணவர்களைக் கண்டறிந்து பள்ளிகளில் சேர்க்க வீடு வீடாக ஆசிரியர் கணக்கெடுப்பு.',
          status: 'சட்டமன்ற அறிவிப்பு · ஆகஸ்ட் 2026',
          source: 'தினமலர் கல்விமலர், ஆகஸ்ட் 2026',
        },
        {
          num: '04',
          title: 'தொழில்நுட்பக் கல்வி (டி.என் ஸ்பார்க் திட்டம்)',
          detail:
            '5,000 பள்ளிகளில் முன்னோடித் திட்டமாகத் தொடங்கப்பட்ட டி.என் ஸ்பார்க் திட்டத்தை 6 முதல் 8-ஆம் வகுப்புகளுக்கு விரிவுபடுத்துதல்; 9 முதல் 12-ஆம் வகுப்புகளுக்கு கோடிங் மற்றும் செயற்கை நுண்ணறிவுப் பாடத்திட்டத்தை அறிமுகப்படுத்துதல்.',
          status: 'முன்னோடித் திட்டம் · ~5,000 பள்ளிகள்',
          source: 'நியூ இந்தியன் எக்ஸ்பிரஸ், ஜூலை 2026',
        },
      ],
    },
  }[locale];

  return (
    <div className="space-y-6">
      <p className="text-charcoal-700 text-base md:text-lg mb-8 max-w-[48rem]">
        {content.subtitle}
      </p>

      <EduStaggerContainer className="divide-y divide-sand-300">
        {content.items.map((item, idx) => (
          <EduStaggerItem
            key={idx}
            className="py-8 grid grid-cols-1 md:grid-cols-[6rem_1fr_16rem] gap-6 items-start"
          >
            {/* Number */}
            <div className="font-display text-4xl text-maroon-700 font-light">
              {item.num}
            </div>

            {/* Title & Detail */}
            <div className="space-y-3">
              <h3 className="font-display text-2xl text-charcoal-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-charcoal-700 text-base leading-relaxed">
                {item.detail}
              </p>
            </div>

            {/* Status & Sourcing badge */}
            <div className="bg-sand-50 p-4 border border-sand-300 space-y-2">
              <div className="text-xs uppercase tracking-wider text-maroon-700 font-semibold">
                {item.status}
              </div>
              <div className="text-xs text-charcoal-500">
                {item.source}
              </div>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>

      <EduHairline className="mt-8" />
    </div>
  );
}
