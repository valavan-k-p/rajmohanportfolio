'use client';

import type { Locale } from '@/lib/i18n/routing';
import {
  EduReveal,
  EduStaggerContainer,
  EduStaggerItem,
  EduHorizontalLine,
  EduTopLineBox,
} from './EduMotion';

export function EduTeachers({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Teacher Capacity, Pedagogy Training & Field Deployment',
      standfirst:
        'Equipping primary and secondary teachers with modern pedagogical tools, specialised activity-based training, and targeted out-of-school dropout tracking mandates.',
      initiatives: [
        {
          tag: 'PEDAGOGY CAPACITATION',
          title: 'Specialised Primary Teacher Training',
          desc: 'Intensive workshops preparing primary school educators to implement the 9 revised activity-based textbooks across Classes 1–3, shifting instructional culture toward interactive learning.',
        },
        {
          tag: 'DROPOUT MITIGATION MANDATE',
          title: 'Out-of-School Child Identification Protocol',
          desc: 'Mandatory field instructions directing headmasters and educators to conduct local door-to-door surveys to identify and re-enrol dropped-out children into formal schooling.',
        },
        {
          tag: 'ADMINISTRATIVE FOCUS & DIGNITY',
          title: 'Classroom Neutrality & Protection from Disruption',
          desc: 'Curtailing unverified external non-academic intrusions so educators can focus 100% of their operational time and intellectual energy on classroom instruction.',
        },
      ],
      sidebarHeader: 'Key Educator Frameworks',
      metrics: [
        { label: 'Target Textbooks Transitioned', val: 'Classes 1, 2 & 3' },
        { label: 'Field Verification Mandate', val: 'Door-to-Door Surveys' },
        { label: 'Primary Focus', val: 'Foundational Literacy & Numeracy' },
      ],
      source: 'Sources: The New Indian Express & Dinamalar (May & August 2026)',
    },
    ta: {
      headline: 'ஆசிரியர் திறன் மேம்பாடு & களப்பணி நெறிமுறைகள்',
      standfirst:
        'ஆசிரியர்களுக்கு நவீன செயல்வழிக் கற்பித்தல் சிறப்புப் பயிற்சிகள், இடைநிற்றல் குழந்தைகளைக் கண்டறியும் களப்பணி உத்தரவுகள் மற்றும் அமைதியான கற்பித்தல் சூழல்.',
      initiatives: [
        {
          tag: 'கற்பித்தல் திறன் மேம்பாடு',
          title: 'தொடக்கப் பள்ளி ஆசிரியர்களுக்கு சிறப்புப் பயிற்சிகள்',
          desc: '1 முதல் 3-ஆம் வகுப்புகளுக்கான 9 புதிய செயல்வழிப் பாடநூல்களைச் சிறந்த முறையில் மாணவர்களிடம் கொண்டு சேர்க்க ஆசிரியர்களுக்கு விசேஷ பயிற்சிப் பட்டறைகள்.',
        },
        {
          tag: 'இடைநிற்றல் தவிர்ப்பு உத்தரவு',
          title: 'பள்ளி செல்லாக் குழந்தைகளைக் கண்டறியும் களப்பணி',
          desc: 'பள்ளியிலிருந்து இடைநின்ற குழந்தைகளைக் கண்டறிந்து, அவர்களை மீண்டும் பள்ளியில் சேர்க்க தலைமை ஆசிரியர்கள் மற்றும் ஆசிரியர்கள் வீடு வீடாகக் கள ஆய்வு செய்ய உத்தரவு.',
        },
        {
          tag: 'ஆசிரியர் கண்ணியம் & பாதுகாப்பு',
          title: 'தலையீடுகளற்ற சுதந்திரமான கற்பித்தல் சூழல்',
          desc: 'தேவையற்ற நிர்வாகப் பணிகளைக் குறைத்து, ஆசிரியர்களின் முழு கவனமும் மாணவர்களின் கற்றலில் மட்டுமே இருக்கும் வகையில் தேவையற்ற வெளி நபர்களின் தலையீடுகளைக் கட்டுப்படுத்துதல்.',
        },
      ],
      sidebarHeader: 'ஆசிரியர் கட்டமைப்பு',
      metrics: [
        { label: 'புதிய முறையில் பயிற்றுவிக்கப்படும் வகுப்புகள்', val: 'வகுப்புகள் 1, 2 & 3' },
        { label: 'களப்பணி உத்தரவு', val: 'வீடு வீடாகக் கணக்கெடுப்பு' },
        { label: 'முதன்மை இலக்கு', val: 'அடிப்படை எழுத்தறிவு & எண்ணறிவு' },
      ],
      source: 'ஆதாரங்கள்: நியூ இந்தியன் எக்ஸ்பிரஸ் & தினமலர் (மே & ஆகஸ்ட் 2026)',
    },
  }[locale];

  return (
    <div className="space-y-10 max-w-[72rem] mx-auto">
      {/* Header with Mask Reveal */}
      <EduReveal direction="up" className="max-w-[48rem]">
        <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed mt-2">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* 2-Column Clean Layout: Left from Left, Right from Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left 7 Columns: Action Items with Progressive Stagger & Left-to-Right Lines */}
        <EduReveal direction="left" delay={0.05} className="lg:col-span-7 space-y-6">
          <EduStaggerContainer className="space-y-6" stagger={0.08}>
            {content.initiatives.map((item, idx) => (
              <EduStaggerItem
                key={idx}
                direction="left"
                showTopLine={true}
                topLineColor="bg-sand-300"
                className="pt-4 space-y-2"
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-maroon-700">
                  {item.tag}
                </span>
                <h4 className="font-display text-xl text-charcoal-900 leading-snug font-semibold">
                  {item.title}
                </h4>
                <p className="text-charcoal-700 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </EduStaggerItem>
            ))}
          </EduStaggerContainer>
        </EduReveal>

        {/* Right 5 Columns: Key Frameworks Flat Index */}
        <EduTopLineBox
          delay={0.12}
          direction="right"
          topLineColor="bg-maroon-700"
          className="lg:col-span-5 space-y-4 p-6 bg-white border border-sand-300 shadow-sm rounded-sm"
        >
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-900 border-b border-sand-300 pb-2">
            {content.sidebarHeader}
          </h4>

          <div className="space-y-4 divide-y divide-sand-200">
            {content.metrics.map((m, idx) => (
              <div key={idx} className="pt-3 first:pt-0 space-y-1">
                <div className="text-xs font-mono text-charcoal-500 uppercase">
                  {m.label}
                </div>
                <div className="text-base font-semibold text-charcoal-900">
                  {m.val}
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-charcoal-500 font-mono pt-3 border-t border-sand-200">
            {content.source}
          </div>
        </EduTopLineBox>
      </div>

      <EduHorizontalLine color="bg-sand-200" duration={0.65} />
    </div>
  );
}
