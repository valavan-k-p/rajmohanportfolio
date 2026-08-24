'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduTeachers({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Pedagogical Enablement & Grassroots Retention Outreach',
      standfirst:
        'Equipping primary educators with experiential teaching tools while mobilizing headteachers for direct, community-level student recovery.',
      initiatives: [
        {
          tag: 'PEDAGOGY ENABLEMENT',
          title: 'Specialised Preparation for Classes 1–3',
          desc: 'With the introduction of 9 activity-rich textbooks in May 2026, the department rolled out focused training modules. Primary educators are trained in interactive facilitation, child motor development, socio-emotional learning, and experiential classroom participation.',
        },
        {
          tag: 'COMMUNITY RETENTION',
          title: 'Door-to-Door Dropout Identification Surveys',
          desc: 'Headteachers and primary educators lead grassroots outreach in local habitations to identify out-of-school children, analyze root causes (economic stress, transport, or family migration), and facilitate immediate re-enrolment.',
        },
        {
          tag: 'INSTRUCTIONAL TIME',
          title: 'Preserving Core Teaching Hours',
          desc: 'Streamlining non-academic administrative burdens and restricting unauthorized campus interruptions so teachers can dedicate full attention to classroom instruction.',
        },
      ],
      sidebarHeader: 'Educator Capacity Matrix',
      metrics: [
        { label: 'Classes Transitioned to Activity Pedagogy', val: 'Classes 1, 2 & 3' },
        { label: 'Grassroots Outreach Method', val: 'Door-to-Door Surveys' },
        { label: 'Primary Learning Target', val: 'Foundational Literacy & Numeracy' },
      ],
      source: 'Sources: New Indian Express & Dinamalar (May & August 2026)',
    },
    ta: {
      headline: 'ஆசிரியர் திறன் மேம்பாடு & இடைநிற்றல் தடுப்புக் களப்பணி',
      standfirst:
        'ஆசிரியர்களுக்கு நவீன செயல்வழிக் கற்பித்தல் கருவிகளை வழங்குவதோடு, பள்ளிக்கு வராத குழந்தைகளை மீட்கும் களப்பணிகளும் தீவிரப்படுத்தப்பட்டுள்ளன.',
      initiatives: [
        {
          tag: 'கற்பித்தல் பயிற்சி',
          title: '1 முதல் 3-ஆம் வகுப்புகளுக்கான புதிய பயிற்சி முறைகள்',
          desc: '9 புதிய செயல்வழிப் பாடநூல்கள் அறிமுகப்படுத்தப்பட்டதைத் தொடர்ந்து, ஆசிரியர்களுக்கு செயல்வழிக் கற்றல், குழந்தைகளின் உடல் இயக்கம், சமூக-உணர்ச்சி மேம்பாடு மற்றும் வகுப்பறை ஈடுபாட்டிற்கான விரிவான பயிற்சிகள் வழங்கப்பட்டன.',
        },
        {
          tag: 'களக் கணக்கெடுப்பு',
          title: 'வீடு வீடாக இடைநிற்றல் கண்டறியும் பணிகள்',
          desc: 'வறுமை, இடம்பெயர்வு அல்லது பயணச் சிக்கல்களால் பள்ளிக்கு வராத குழந்தைகளைக் கண்டறிந்து அவர்களை மீண்டும் பள்ளியில் சேர்க்க தலைமை ஆசிரியர்களும் ஆசிரியர்களும் நேரடியாக வீடு வீடாகச் சென்று பணியாற்றுகின்றனர்.',
        },
        {
          tag: 'கற்பித்தல் நேரம்',
          title: 'முழுமையான கற்பித்தல் நேரப் பாதுகாப்பு',
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
      {/* Header */}
      <EduReveal className="max-w-[48rem]">
        <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-base leading-relaxed mt-2">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* 2-Column Clean Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left 7 Columns: Action Items with Dividers */}
        <EduStaggerContainer className="lg:col-span-7 space-y-6">
          {content.initiatives.map((item, idx) => (
            <EduStaggerItem
              key={idx}
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

        {/* Right 5 Columns: Capacity Matrix List */}
        <div className="lg:col-span-5 border-t border-sand-300 pt-4 space-y-5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-maroon-700">
            {content.sidebarHeader}
          </h4>

          <div className="space-y-4 divide-y divide-sand-200">
            {content.metrics.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0">
                <div className="text-xs text-charcoal-500 font-mono">
                  {item.label}
                </div>
                <div className="font-display text-lg text-charcoal-900 font-medium mt-0.5">
                  {item.val}
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-charcoal-500 font-mono pt-2 border-t border-sand-200">
            {content.source}
          </div>
        </div>
      </div>
    </div>
  );
}
