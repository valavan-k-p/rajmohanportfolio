'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduTimeline({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Chronological Milestones & Governance Trajectory',
      subhead:
        'A transparent record of actions, legislative statements, and policy decisions since May 2026.',
      events: [
        {
          date: 'May 2026',
          title: 'Cabinet Charge & Primary Curriculum Reform',
          desc: 'Assumed charge as School Education Minister. Released 9 revised activity-rich textbooks for Classes 1–3 designed to eliminate rote learning. Formally reaffirmed Tamil Nadu’s historic Two-Language Policy.',
          tag: 'Curriculum & Policy',
        },
        {
          date: 'June 2026',
          title: 'Heatwave Reopening & Private Fee Warnings',
          desc: 'Rescheduled school reopening to June 4 to protect children from extreme heat. Inaugurated 21 smart boards in Chennai. Issued public warnings against private school fee overcharging.',
          tag: 'Readiness & Oversight',
        },
        {
          date: 'July 2026',
          title: 'Digital Approvals Portal & Campus Security',
          desc: 'Announced online NOC and recognition portal for private schools from July 1 to eliminate middlemen and bribery. Introduced campus visitor regulation to keep schools neutral and safe.',
          tag: 'Process Reform',
        },
        {
          date: 'August 2026',
          title: 'Student Legal Relief, Low-Enrolment Reopening & Budget Defense',
          desc: 'Announced withdrawal of police cases against anti-NEET student protesters. Mandated that schools closed for low enrolment can reopen if 10 students enrol. Defended the ₹44,527 Cr school education budget.',
          tag: 'Legislative Action',
        },
        {
          date: 'Future Roadmap',
          title: 'TN SPARK Expansion & Nutrition Proposals',
          desc: 'Scaling emerging technologies and coding curriculum to Classes 6–8 and Classes 9–12. Departmental review of the weekly chicken biryani noon meal proposal under Chief Minister consideration.',
          tag: 'Strategic Direction',
        },
      ],
      sourcing: 'Verified against reporting in The Hindu, New Indian Express, Dinamalar, Careers360, and tn.gov.in.',
    },
    ta: {
      headline: 'காலவரிசை நிகழ்வுகள் & நிர்வாகப் பயணம்',
      subhead:
        'மே 2026 முதல் மேற்கொள்ளப்பட்ட முடிவுகள், அறிவிப்புகள் மற்றும் சட்டமன்றச் செயல்பாடுகளின் காலவரிசை.',
      events: [
        {
          date: 'மே 2026',
          title: 'அமைச்சரவைப் பொறுப்பு & புதிய தொடக்கப் பாடத்திட்டம்',
          desc: 'பள்ளிக் கல்வித்துறை அமைச்சராகப் பொறுப்பேற்பு. 1, 2, 3-ஆம் வகுப்புகளுக்கு 9 புதிய செயல்வழிப் பாடநூல்கள் வெளியீடு. தமிழ்நாட்டின் இருமொழிக் கொள்கையில் உறுதியான நிலைப்பாடு மீண்டும் உறுதிப்படுத்தப்பட்டது.',
          tag: 'பாடத்திட்டம் & கொள்கை',
        },
        {
          date: 'ஜூன் 2026',
          title: 'பள்ளிகள் திறப்பு & கட்டணக் கட்டுப்பாடு எச்சரிக்கை',
          desc: 'வெப்ப அலை காரணமாக ஜூன் 4-க்கு பள்ளிகள் திறப்பு மாற்றம். சென்னையில் 21 ஸ்மார்ட் போர்டுகள் தொடக்கம். கூடுதல் கட்டணம் வசூலிக்கும் தனியார் பள்ளிகளுக்கு எச்சரிக்கை.',
          tag: 'தயார்நிலை & ஆய்வு',
        },
        {
          date: 'ஜூலை 2026',
          title: 'இணையதள சான்றிதழ் முறை & வளாகப் பாதுகாப்பு நெறிமுறைகள்',
          desc: 'தனியார் பள்ளிகளுக்கான இணையவழி NOC மற்றும் அங்கீகார முறை ஜூலை 1 முதல் அறிவிப்பு. பள்ளி வளாகங்களுக்குள் அனுமதியற்ற நபர்கள் நுழைவதைத் தடுக்கும் வழிகாட்டுதல்.',
          tag: 'நிர்வாகச் சீர்திருத்தம்',
        },
        {
          date: 'ஆகஸ்ட் 2026',
          title: 'மாணவர் வழக்குகள் வாபஸ், பள்ளிகள் மறுதிறப்பு & நிதி விளக்கம்',
          desc: 'நீட் எதிர்ப்பு போராட்டத்தில் ஈடுபட்ட மாணவர்கள் மீதான வழக்குகள் வாபஸ். 10 மாணவர்கள் சேர்ந்தாலே அரசுப் பள்ளிகள் மறுதிறப்பு உத்தரவு. ₹44,527 கோடி கல்வி நிதி ஒதுக்கீடு விளக்கம்.',
          tag: 'சட்டமன்ற நடவடிக்கை',
        },
        {
          date: 'எதிர்காலத் திட்டம்',
          title: 'டி.என் ஸ்பார்க் விரிவாக்கம் & மதிய உணவு முன்மொழிவு',
          desc: '6 முதல் 8-ஆம் வகுப்புகளுக்கு டி.என் ஸ்பார்க் மற்றும் மேல்நிலைக் கல்விக்கு கோடிங் பாடத்திட்டம் விரிவுபடுத்துதல். வாரம் ஒரு முறை சிக்கன் பிரியாணி வழங்கும் முன்மொழிவு முதலமைச்சரின் பரிசீலனையில்.',
          tag: 'எதிர்காலப் பார்வை',
        },
      ],
      sourcing: 'ஆதாரம்: தி இந்து, நியூ இந்தியன் எக்ஸ்பிரஸ், தினமலர், கேரியர்ஸ்360 மற்றும் tn.gov.in செய்திகள்.',
    },
  }[locale];

  return (
    <div className="space-y-12">
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-3xl text-charcoal-900 leading-tight mb-2">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed">
          {content.subhead}
        </p>
      </EduReveal>

      {/* Timeline Sequence */}
      <EduStaggerContainer className="relative pl-6 md:pl-10 border-l-2 border-sand-300 space-y-10">
        {content.events.map((evt, idx) => (
          <EduStaggerItem key={idx} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-maroon-700 shadow-sm" />

            <div className="bg-white p-6 border border-sand-300 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-display text-xl text-maroon-700 font-semibold">
                  {evt.date}
                </span>
                <span className="text-xs uppercase tracking-wider bg-sand-100 px-2.5 py-1 text-charcoal-700 border border-sand-300 font-medium">
                  {evt.tag}
                </span>
              </div>
              <h4 className="font-display text-2xl text-charcoal-900 leading-snug">
                {evt.title}
              </h4>
              <p className="text-charcoal-700 text-sm leading-relaxed">
                {evt.desc}
              </p>
            </div>
          </EduStaggerItem>
        ))}
      </EduStaggerContainer>

      <EduReveal delay={0.2} className="pt-4 text-xs text-charcoal-500 font-sans">
        {content.sourcing}
      </EduReveal>
    </div>
  );
}
