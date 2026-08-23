'use client';

import type { Locale } from '@/lib/i18n/routing';
import { EduStaggerContainer, EduStaggerItem, EduReveal, EduCounter } from './EduMotion';

export function EduSchools({ locale }: { locale: Locale }) {
  const content = {
    en: {
      headline: 'Classroom Readiness, Heatwave Adaptation & Rural Access',
      standfirst:
        'Ensuring functioning sanitation, clean drinking water, and operational digital labs before students return, alongside an explicit mandate to protect small rural schools from closure.',
      actions: [
        {
          tag: 'OPERATIONAL READINESS',
          title: 'Pre-Reopening Facility Audits & Heatwave Shift',
          desc: 'Following extreme summer heat in May 2026, school reopening was moved to 4 June to protect student health. District teams conducted mandatory pre-reopening inspections covering drinking water purity, functional sanitation, noon-meal kitchen hygiene, and lab safety.',
        },
        {
          tag: 'DIGITAL INFRASTRUCTURE',
          title: 'Smart Board Deployment & Lab Verification',
          desc: 'Inaugurated 21 interactive smart boards across Chennai government schools on reopening day, paired with free learning kits and operational verification of Hi-Tech computer labs.',
        },
        {
          tag: 'RURAL CONTINUITY',
          title: '“10 Students Threshold” Reopening Directive',
          desc: 'Mandated in the Legislative Assembly that government schools previously closed due to low enrolment will be reopened if at least 10 students register, backed by door-to-door teacher surveys to bring dropouts back to classrooms.',
        },
      ],
      auditTitle: 'Mandatory Reopening Checklist',
      checklist: [
        'Safe drinking water and verified functional sanitation',
        'Mid-day meal kitchen hygiene and ration logistics',
        'Hi-Tech computer lab and smart board electrical audits',
        'Complete textbook and uniform distribution on Day 1',
      ],
      metricLabel: 'Smart Boards Inaugurated',
      metricSub: 'Chennai Reopening Phase · June 2026',
      citation: 'Sources: Careers360, The News Mill, Dinamalar (June–August 2026)',
    },
    ta: {
      headline: 'வகுப்பறை தயார்நிலை, வெப்ப அலை மேலாண்மை & கிராமப்புறக் கல்வி',
      standfirst:
        'சுத்தமான குடிநீர், சுகாதார கழிப்பறைகள் மற்றும் நவீன ஆய்வகங்களை உறுதி செய்வதோடு, கிராமப்புற அரசுப் பள்ளிகளைப் பாதுகாக்கும் நடவடிக்கைகள்.',
      actions: [
        {
          tag: 'வளாகத் தயார்நிலை',
          title: 'கோடை வெப்பத்திற்கேற்ப பள்ளி திறப்பு மாற்றம் & ஆய்வுகள்',
          desc: 'மே 2026-ல் நிலவிய கடும் கோடை வெப்பம் காரணமாக பள்ளிகள் திறப்பு ஜூன் 4-க்கு மாற்றப்பட்டது. குடிநீர், கழிப்பறை, மதிய உணவு சமையலறை மற்றும் ஆய்வக வசதிகள் முன்கூட்டியே ஆய்வு செய்யப்பட்டன.',
        },
        {
          tag: 'டிஜிட்டல் கட்டமைப்பு',
          title: '21 ஸ்மார்ட் போர்டுகள் & ஆய்வகச் செயல்பாடு',
          desc: 'பள்ளிகள் திறப்பு நாளில் சென்னையில் 21 ஸ்மார்ட் போர்டுகள் பயன்பாட்டிற்கு கொண்டுவரப்பட்டு, மாணவர்களுக்குக் கற்றல் உபகரணங்கள் வழங்கப்பட்டன.',
        },
        {
          tag: 'கிராமப்புறப் பள்ளிப் பாதுகாப்பு',
          title: '“10 மாணவர்கள் போதும்” — மறுதிறப்பு ஆணை',
          desc: '10 மாணவர்கள் சேர்ந்தாலே குறைந்த சேர்க்கையால் மூடப்பட்ட அரசுப் பள்ளிகளை மீண்டும் திறக்க சட்டமன்றத்தில் உத்தரவிடப்பட்டது; இது ஏழை எளிய மாணவர்களின் கல்வி உரிமையை உறுதி செய்கிறது.',
        },
      ],
      auditTitle: 'முக்கிய தயார்நிலை விதிமுறைகள்',
      checklist: [
        'சுத்தமான குடிநீர் மற்றும் முறையான கழிப்பறை வசதி',
        'மதிய உணவு சமையலறை மற்றும் சுகாதாரப் பரிசோதனை',
        'ஹை-டெக் கணினி ஆய்வகம் & ஸ்மார்ட் போர்டு ஆய்வு',
        'முதல் நாளிலேயே பாடநூல்கள் மற்றும் சீருடை வழங்கல்',
      ],
      metricLabel: 'திறக்கப்பட்ட ஸ்மார்ட் போர்டுகள்',
      metricSub: 'சென்னை தொடக்கக் கட்டம் · ஜூன் 2026',
      citation: 'ஆதாரங்கள்: கேரியர்ஸ்360, தி நியூஸ் மில், தினமலர் (ஜூன்–ஆகஸ்ட் 2026)',
    },
  }[locale];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* 7 Columns: Core Policy Actions */}
      <div className="lg:col-span-7 space-y-6">
        <EduReveal>
          <h3 className="font-display text-2xl sm:text-3xl text-charcoal-900 leading-tight font-normal">
            {content.headline}
          </h3>
          <p className="text-charcoal-700 text-base leading-relaxed mt-3 max-w-[42rem]">
            {content.standfirst}
          </p>
        </EduReveal>

        <EduStaggerContainer className="space-y-4 pt-2">
          {content.actions.map((act, idx) => (
            <EduStaggerItem
              key={idx}
              className="p-5 sm:p-6 bg-sand-50 border-l-4 border-maroon-700 border-y border-r border-sand-300 space-y-2"
            >
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-maroon-700">
                {act.tag}
              </span>
              <h4 className="font-display text-xl text-charcoal-900 leading-snug font-medium">
                {act.title}
              </h4>
              <p className="text-charcoal-700 text-sm leading-relaxed">
                {act.desc}
              </p>
            </EduStaggerItem>
          ))}
        </EduStaggerContainer>
      </div>

      {/* 5 Columns: Inspection Checklist & Live Metric Card */}
      <div className="lg:col-span-5 space-y-6">
        <EduReveal delay={0.1} className="bg-sand-100 p-6 sm:p-7 border border-sand-300 space-y-6 shadow-sm">
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-maroon-700 mb-2">
              {locale === 'ta' ? 'வளாக ஆய்வு நெறிமுறை' : 'QUALITY BENCHMARK'}
            </div>
            <h4 className="font-display text-xl text-charcoal-900 font-semibold">
              {content.auditTitle}
            </h4>
          </div>

          <ul className="space-y-3">
            {content.checklist.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-800"
              >
                <span className="text-maroon-700 font-bold text-base leading-none mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-5 border-t border-sand-300">
            <div className="font-display text-4xl text-charcoal-900 tabular-nums font-light">
              <EduCounter value={21} duration={1.4} />{' '}
              <span className="text-base font-sans text-charcoal-600 font-normal">
                {content.metricLabel}
              </span>
            </div>
            <div className="text-xs text-charcoal-500 mt-1 font-sans">
              {content.metricSub}
            </div>
            <div className="text-[11px] text-charcoal-500 mt-3 pt-3 border-t border-sand-200 font-mono">
              {content.citation}
            </div>
          </div>
        </EduReveal>
      </div>
    </div>
  );
}
