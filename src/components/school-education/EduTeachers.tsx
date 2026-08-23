'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduReveal, EduStaggerContainer, EduStaggerItem } from './EduMotion';

export function EduTeachers({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Empowering Educators for Foundational Transformation',
      standfirst:
        'Curriculum reform succeeds only when teachers are equipped with the pedagogical freedom and methods to implement it. Professional training and active field roles form the cornerstone of teacher support.',
      features: [
        {
          title: 'Pedagogical Training for Classes 1–3',
          desc: 'With the release of 9 revised activity-rich textbooks, the department initiated targeted teacher preparation programmes. Educators are trained in interactive facilitation, child motor development, socio-emotional learning, and classroom participation techniques.',
        },
        {
          title: 'Door-to-Door Dropout Recovery Surveys',
          desc: 'Headteachers and primary teachers are leading grassroots outreach across communities to identify children who have dropped out due to economic stress, migration, or transit hurdles, creating personalised pathways back into school.',
        },
        {
          title: 'Classroom Autonomy & Administrative Respect',
          desc: 'Efforts to streamline bureaucratic paperwork and protect teachers’ core instructional hours by eliminating non-academic distractions and unauthorised campus events.',
        },
      ],
      sidebarTitle: 'Teacher Action Matrix',
      sidebarMetrics: [
        { label: 'Classes Covered in New Pedagogy', value: 'Classes 1, 2 & 3' },
        { label: 'Outreach Mandate', value: 'Door-to-Door Surveys' },
        { label: 'Instructional Focus', value: 'Activity-Based Learning' },
      ],
      sourcing: 'Sources: New Indian Express & Dinamalar (May & August 2026)',
    },
    ta: {
      headline: 'அடிப்படை மாற்றத்திற்கான ஆசிரியர் திறன் மேம்பாடு',
      standfirst:
        'புதிய பாடத்திட்டத்தின் வெற்றி ஆசிரியர்களின் கைகளில்தான் உள்ளது. செயல்வழிக் கற்பித்தல் முறைகள் மற்றும் களப்பணிகளுக்கான பயிற்சிகள் மூலம் ஆசிரியர்கள் தொடர்ந்து வலுப்படுத்தப்படுகிறார்கள்.',
      features: [
        {
          title: 'வகுப்புகள் 1–3-க்கான புதிய கற்பித்தல் பயிற்சி',
          desc: '9 புதிய பாடநூல்கள் அறிமுகப்படுத்தப்பட்டதைத் தொடர்ந்து, ஆசிரியர்களுக்குச் செயல்வழிக் கற்றல், குழந்தைகளின் உடல் இயக்கம், சமூக-உணர்ச்சி மேம்பாடு மற்றும் வகுப்பறை ஈடுபாட்டிற்கான விரிவான பயிற்சிகள் வழங்கப்பட்டன.',
        },
        {
          title: 'வீடு வீடாக இடைநிற்றல் கணக்கெடுப்பு',
          desc: 'வறுமை, இடம்பெயர்வு அல்லது பயணச் சிக்கல்களால் பள்ளிக்கு வராத குழந்தைகளைக் கண்டறிந்து அவர்களை மீண்டும் பள்ளியில் சேர்க்க தலைமை ஆசிரியர்களும் ஆசிரியர்களும் நேரடியாக வீடு வீடாகச் சென்று பணியாற்றுகின்றனர்.',
        },
        {
          title: 'கற்பித்தல் நேரப் பாதுகாப்பு & நிர்வாக ஆதரவு',
          desc: 'தேவையற்ற நிர்வாகப் பணிகளைக் குறைத்து, ஆசிரியர்களின் முழு கவனமும் கற்பித்தலில் மட்டுமே இருக்கும் வகையில் தேவையற்ற வெளி நபர்களின் தலையீடுகளைக் கட்டுப்படுத்துதல்.',
        },
      ],
      sidebarTitle: 'ஆசிரியர் செயல்பாட்டு மேட்ரிக்ஸ்',
      sidebarMetrics: [
        { label: 'புதிய முறையில் பயிற்றுவிக்கப்படும் வகுப்புகள்', value: 'வகுப்புகள் 1, 2 & 3' },
        { label: 'களப்பணி உத்தரவு', value: 'வீடு வீடாகக் கணக்கெடுப்பு' },
        { label: 'முக்கியக் கவனம்', value: 'செயல்வழிக் கற்றல் முறை' },
      ],
      sourcing: 'ஆதாரங்கள்: நியூ இந்தியன் எக்ஸ்பிரஸ் & தினமலர் (மே & ஆகஸ்ட் 2026)',
    },
  }[locale];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* 5 Columns: Sidebar Matrix */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
        <EduReveal className="bg-sand-100 p-8 border border-sand-300">
          <div className="u-eyebrow text-maroon-700 mb-3">
            {locale === 'ta' ? 'கற்பித்தல் கட்டமைப்பு' : 'PEDAGOGY FOCUS'}
          </div>
          <h4 className="font-display text-2xl text-charcoal-900 mb-6">
            {content.sidebarTitle}
          </h4>

          <div className="space-y-6">
            {content.sidebarMetrics.map((item, idx) => (
              <div key={idx} className="border-b border-sand-300 pb-4 last:border-b-0">
                <div className="text-xs uppercase text-charcoal-600 font-medium">
                  {item.label}
                </div>
                <div className="font-display text-xl text-charcoal-900 mt-1">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-charcoal-500 mt-6 pt-4 border-t border-sand-300 font-sans">
            {content.sourcing}
          </p>
        </EduReveal>
      </div>

      {/* 7 Columns: Main Narrative & Features */}
      <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
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

        <EduStaggerContainer className="space-y-6">
          {content.features.map((feat, idx) => (
            <EduStaggerItem
              key={idx}
              className="p-6 bg-sand-50 border-l-4 border-maroon-700 border border-sand-300"
            >
              <h4 className="font-display text-xl text-charcoal-900 mb-2">
                {feat.title}
              </h4>
              <p className="text-charcoal-700 text-sm leading-relaxed">
                {feat.desc}
              </p>
            </EduStaggerItem>
          ))}
        </EduStaggerContainer>
      </div>
    </div>
  );
}
