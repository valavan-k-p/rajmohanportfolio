'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import {
  EduReveal,
  EduStaggerContainer,
  EduStaggerItem,
  EduHorizontalLine,
  CINEMATIC_EASE,
} from './EduMotion';

export function GovernanceReformsGrid({ locale }: { locale: Locale }) {
  const [nocMode, setNocMode] = useState<'after' | 'before'>('after');

  const content = {
    en: {
      headline: 'Digital Approvals & Private School Governance',
      standfirst:
        'Eliminating administrative opacity and middleman interference in school recognition, while actively enforcing parent fee protections and campus instructional sanctity.',
      nocTitle: 'Digital NOC & Recognition Portal (Launched 1 July 2026)',
      nocDesc:
        'Private schools requiring No-Objection Certificates (NOC) and recognition renewals now submit all documents through an online, timestamped verification workflow, curtailing discretionary delays and bribery opportunities.',
      toggleBefore: 'Legacy Manual System',
      toggleAfter: 'Current Digital Portal',
      nocBefore: [
        'Physical paper file movement prone to administrative delays and loss',
        'Direct contact with field intermediaries enabling corruption',
        'Lack of transparent status tracking for applying institutions',
        'Discretionary timelines without statutory accountability',
      ],
      nocAfter: [
        '100% digital document submission with automated timestamping',
        'Direct online scrutiny eliminating all third-party middlemen',
        'Real-time public status dashboard for school administrators',
        'Enforced SLA-backed statutory processing windows',
      ],
      feeTitle: 'Enforcement of Statutory Fee-Determination Caps',
      feeDesc:
        'Strict statutory warnings issued to private school managements against charging fees exceeding limits established by the state fee-determination committee, protecting parents from arbitrary inflation.',
      visitorTitle: 'School Campus Visitor & Neutrality Regulations',
      visitorDesc:
        'Formal guidelines restricting political party events, commercial promotional campaigns, and unauthorized outside visitors inside school grounds during instructional hours.',
      source: 'Source: New Indian Express (June & July 2026)',
    },
    ta: {
      headline: 'இணையவழி அனுமதிகள் & தனியார் பள்ளி ஒழுங்குமுறை',
      standfirst:
        'அங்கீகார அனுமதிகளில் இடைத்தரகர்களை அகற்றி, தனியார் பள்ளிகளின் கட்டணச் சுமையைத் தடுத்து, வளாகப் பாதுகாப்பை உறுதி செய்யும் சீர்திருத்தங்கள்.',
      nocTitle: 'இணையவழி NOC & அங்கீகார முறை (ஜூலை 1, 2026 முதல்)',
      nocDesc:
        'தனியார் பள்ளிகளுக்கான தடையில்லா சான்றிதழ் (NOC) மற்றும் அங்கீகார புதுப்பித்தலுக்கு முழுமையான இணையவழி விண்ணப்ப முறை தொடங்கப்பட்டுள்ளது; இது இடைத்தரகர்களையும் லஞ்சத்தையும் முற்றிலும் தடுக்கிறது.',
      toggleBefore: 'பழைய கையேடு முறை',
      toggleAfter: 'புதிய இணையவழி முறை',
      nocBefore: [
        'கோப்புகள் நகர்வில் தேவையற்ற காலதாமதம் மற்றும் கோப்புகள் காணாமல் போதல்',
        'நேரடி இடைத்தரகர்களின் தலையீடு மற்றும் லஞ்ச வாய்ப்புகள்',
        'விண்ணப்பத்தின் நிலையை அறிய முடியாத வெளிப்படையற்ற சூழல்',
        'குறிப்பிட்ட காலக்கெடுவின்றி முடிவுகள் தாமதமாதல்',
      ],
      nocAfter: [
        'முழுமையான டிஜிட்டல் ஆவணப் பதிவேற்றம் & கணினி வழிக் கண்காணிப்பு',
        'இடைத்தரகர்களின் தலையீடற்ற நேரடி அரசுப் பரிசீலனை',
        'விண்ணப்பத்தின் நிலையை உடனுக்குடன் அறியும் ஆன்லைன் டேஷ்போர்டு',
        'குறிப்பிட்ட காலக்கெடுவுக்குள் வெளிப்படையான அனுமதி வழங்கல்',
      ],
      feeTitle: 'கட்டண நிர்ணயக் குழு வரம்புகள் கட்டாயம்',
      feeDesc:
        'அரசு நிர்ணயித்த கட்டணத்தை விட கூடுதலாக வசூலிக்கும் தனியார் பள்ளிகள் மீது கடுமையான ஒழுங்கு நடவடிக்கை எடுக்கப்படும் என அதிகாரப்பூர்வ எச்சரிக்கை விடுக்கப்பட்டுள்ளது.',
      visitorTitle: 'பள்ளி வளாகப் பார்வையாளர்கள் ஒழுங்குமுறை நெறிமுறை',
      visitorDesc:
        'பள்ளி நேரங்களில் அரசியல் கட்சிகள், தனியார் அமைப்புகள் அல்லது அனுமதியற்ற நபர்கள் வளாகத்திற்குள் நுழைவதைத் தடை செய்து மாணவர்களின் அமைதியான கற்றல் சூழல் உறுதி செய்யப்பட்டுள்ளது.',
      source: 'ஆதாரம்: நியூ இந்தியன் எக்ஸ்பிரஸ் (ஜூன் & ஜூலை 2026)',
    },
  }[locale];

  return (
    <div className="space-y-10 max-w-[72rem] mx-auto">
      {/* Header with Mask Reveal */}
      <EduReveal direction="up" className="max-w-[50rem]">
        <h3 className="font-display text-3xl sm:text-4xl text-charcoal-900 leading-tight font-normal">
          {content.headline}
        </h3>
        <p className="text-charcoal-700 text-lg leading-relaxed mt-2.5">
          {content.standfirst}
        </p>
      </EduReveal>

      {/* NOC Portal Digital Transformation Section */}
      <div className="space-y-6">
        <EduHorizontalLine color="bg-sand-300" duration={0.7} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-mono text-maroon-700 font-bold uppercase tracking-wider">
              {locale === 'ta' ? '● நேரலை டிஜிட்டல் தளம் · ஜூலை 2026' : '● Live Digital System · July 2026'}
            </div>
            <h4 className="font-display text-3xl sm:text-[2rem] text-charcoal-900 font-semibold mt-1">
              {content.nocTitle}
            </h4>
          </div>

          {/* Segmented Switcher */}
          <div className="bg-sand-200/90 p-1 border border-sand-300 shadow-sm flex items-center self-start lg:self-center">
            <button
              onClick={() => setNocMode('after')}
              className={`px-4.5 py-2 text-sm sm:text-base font-semibold transition-all ${
                nocMode === 'after'
                  ? 'bg-maroon-700 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-charcoal-950'
              }`}
            >
              {content.toggleAfter}
            </button>
            <button
              onClick={() => setNocMode('before')}
              className={`px-4.5 py-2 text-sm sm:text-base font-semibold transition-all ${
                nocMode === 'before'
                  ? 'bg-maroon-700 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-charcoal-950'
              }`}
            >
              {content.toggleBefore}
            </button>
          </div>
        </div>

        <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed max-w-[50rem]">
          {content.nocDesc}
        </p>

        {/* Feature List: Sequential 01 -> 02 -> 03 -> 04 Reveals */}
        <AnimatePresence mode="wait">
          <EduStaggerContainer
            key={nocMode}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5 pt-2"
            stagger={0.06}
          >
            {(nocMode === 'after' ? content.nocAfter : content.nocBefore).map((item, i) => (
              <EduStaggerItem
                key={i}
                direction={i % 2 === 0 ? 'left' : 'right'}
                showTopLine={true}
                topLineColor="bg-sand-200"
                className="py-3 flex items-start gap-3 text-base text-charcoal-900"
              >
                <span
                  className={`font-mono text-xs sm:text-sm font-bold w-6 h-6 flex items-center justify-center rounded shrink-0 mt-0.5 ${
                    nocMode === 'after'
                      ? 'bg-sand-200/80 text-maroon-700'
                      : 'bg-sand-200/40 text-charcoal-500'
                  }`}
                >
                  0{i + 1}
                </span>
                <span className="leading-snug">{item}</span>
              </EduStaggerItem>
            ))}
          </EduStaggerContainer>
        </AnimatePresence>
      </div>

      {/* 2 Supporting Policy Columns with Split Reveal (Left & Right) */}
      <div className="space-y-6">
        <EduHorizontalLine color="bg-sand-300" duration={0.7} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <EduReveal direction="left" delay={0.05} className="space-y-2.5">
            <span className="text-sm font-mono font-bold uppercase tracking-wider text-maroon-700">
              {locale === 'ta' ? 'பெற்றோர் கட்டணப் பாதுகாப்பு' : 'Parent Fee Protection'}
            </span>
            <h4 className="font-display text-2xl text-charcoal-900 font-semibold">
              {content.feeTitle}
            </h4>
            <p className="text-base text-charcoal-700 leading-relaxed">
              {content.feeDesc}
            </p>
          </EduReveal>

          <EduReveal direction="right" delay={0.1} className="space-y-2.5">
            <span className="text-sm font-mono font-bold uppercase tracking-wider text-maroon-700">
              {locale === 'ta' ? 'பள்ளி வளாகப் பாதுகாப்பு' : 'Campus Neutrality & Safety'}
            </span>
            <h4 className="font-display text-2xl text-charcoal-900 font-semibold">
              {content.visitorTitle}
            </h4>
            <p className="text-base text-charcoal-700 leading-relaxed">
              {content.visitorDesc}
            </p>
          </EduReveal>
        </div>
      </div>

      <div className="text-sm text-charcoal-500 font-mono pt-2 border-t border-sand-200">
        {content.source}
      </div>
    </div>
  );
}
