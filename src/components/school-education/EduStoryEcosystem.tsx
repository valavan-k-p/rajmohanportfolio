'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/routing';
import { motion, useReducedMotion } from 'motion/react';
import {
  CINEMATIC_EASE,
  VIEWPORT_CONFIG,
  EduHorizontalLine,
  EduReveal,
  EduTopLineBox,
} from './EduMotion';

interface StoryPillar {
  readonly id: string;
  readonly number: string;
  readonly anchor: string;
  readonly title: { en: string; ta: string };
  readonly subtitle: { en: string; ta: string };
  readonly tag: { en: string; ta: string };
  readonly tier: 'pedagogy' | 'people' | 'systems';
}

const STORY_PILLARS: readonly StoryPillar[] = [
  // Tier 1: Foundations & Pedagogy
  {
    id: 'curriculum',
    number: '01',
    anchor: '#curriculum',
    tier: 'pedagogy',
    title: { en: 'Curriculum & Pedagogy', ta: 'பாடத்திட்டம் & கற்றல்' },
    subtitle: {
      en: '9 activity textbooks for Classes 1–3 ending rote learning',
      ta: '1-3 வகுப்புகளுக்கான 9 புதிய செயல்வழிப் பாடநூல்கள்',
    },
    tag: { en: 'Pedagogy Reform', ta: 'கற்றல் மாற்றம்' },
  },
  {
    id: 'two-language',
    number: '02',
    anchor: '#two-language',
    tier: 'pedagogy',
    title: { en: 'Two-Language Policy', ta: 'இருமொழிக் கொள்கை' },
    subtitle: {
      en: 'Tamil foundational roots with global English fluency',
      ta: 'தாய்மொழி தமிழ் + உலகளாவிய ஆங்கிலத் திறன்',
    },
    tag: { en: 'State Sovereignty', ta: 'மாநில உரிமை' },
  },
  {
    id: 'tech-spark',
    number: '03',
    anchor: '#tech-spark',
    tier: 'pedagogy',
    title: { en: 'TN SPARK — AI & Tech', ta: 'டி.என் ஸ்பார்க் AI' },
    subtitle: {
      en: '~5,000 schools pilot for computational logic & robotics',
      ta: '5,000 பள்ளிகளில் செயற்கை நுண்ணறிவு முன்னோடி',
    },
    tag: { en: 'Digital Frontier', ta: 'தொழில்நுட்பம்' },
  },

  // Tier 2: People & Sanctuary (Teachers & Students)
  {
    id: 'teachers',
    number: '04',
    anchor: '#teachers',
    tier: 'people',
    title: { en: 'Teacher Enablement', ta: 'ஆசிரியர் மேம்பாடு' },
    subtitle: {
      en: 'Specialised training & out-of-school dropout tracking',
      ta: 'சிறப்புப் பயிற்சிகள் & இடைநிற்றல் தவிர்ப்புக் களப்பணி',
    },
    tag: { en: 'Instructional Force', ta: 'கற்பித்தல் திறன்' },
  },
  {
    id: 'students',
    number: '05',
    anchor: '#students',
    tier: 'people',
    title: { en: 'Student Welfare & Sanctuary', ta: 'மாணவர் நலம் & பாதுகாப்பு' },
    subtitle: {
      en: 'Noon meal nutrition & protected political neutrality',
      ta: 'சத்துணவு மேம்பாடு & அமைதியான கற்றல் வளாகம்',
    },
    tag: { en: 'Child Care', ta: 'மாணவர் பாதுகாப்பு' },
  },

  // Tier 3: Governance, Infrastructure & Fiscal Transparency
  {
    id: 'schools',
    number: '06',
    anchor: '#schools',
    tier: 'systems',
    title: { en: 'School Readiness & Audits', ta: 'பள்ளித் தயார்நிலை' },
    subtitle: {
      en: '21 smart boards & 10-student continuity guarantee',
      ta: '21 ஸ்மார்ட் போர்டுகள் & 10 மாணவர்கள் சேர்ந்தாலே இயங்கும்',
    },
    tag: { en: 'Campus Standards', ta: 'வளாகத் தரம்' },
  },
  {
    id: 'governance',
    number: '07',
    anchor: '#governance',
    tier: 'systems',
    title: { en: 'Digital Governance & NOC', ta: 'இணையவழி அனுமதிகள்' },
    subtitle: {
      en: 'Zero-middleman timestamped private school approvals',
      ta: 'இடைத்தரகர்களற்ற நேரடி ஆன்லைன் அனுமதி தளம்',
    },
    tag: { en: 'Process Reform', ta: 'நிர்வாகச் சீர்திருத்தம்' },
  },
  {
    id: 'infrastructure',
    number: '08',
    anchor: '#infrastructure',
    tier: 'systems',
    title: { en: '₹44,527 Cr Fiscal Tracking', ta: '₹44,527 கோடி நிதி ஒதுக்கீடு' },
    subtitle: {
      en: 'Transparent line-item spend benchmarked to actuals',
      ta: 'உண்மையான செலவினங்களோடு ஒப்பிட்ட வெளிப்படை நிதி',
    },
    tag: { en: 'Budget Transparency', ta: 'நிதி மேலாண்மை' },
  },
];

export function EduStoryEcosystem({ locale }: { locale: Locale }) {
  const prefersReducedMotion = useReducedMotion();

  const content = {
    en: {
      badge: 'GOVERNANCE ARCHITECTURE · THE UNIFIED ECOSYSTEM',
      mainTitle: 'School Education',
      tagline:
        'A comprehensive public-education ecosystem where foundational pedagogy, teacher dignity, child welfare, modern technology, and fiscal integrity form one indivisible mission.',
      tier1Title: 'FOUNDATIONS & ACADEMIC REFORMS',
      tier2Title: 'HUMAN CAPITAL & CHILD WELFARE',
      tier3Title: 'INSTITUTIONAL GOVERNANCE & INFRASTRUCTURE',
      centerMandate: 'CENTRAL MANDATE',
      centerTagline: '8 Interconnected Pillars of State Governance',
      explorePrompt: 'Explore each pillar in detail',
    },
    ta: {
      badge: 'கல்வித்துறை நிர்வாக கட்டமைப்பு · ஒருங்கிணைந்த வரைபடம்',
      mainTitle: 'பள்ளிக் கல்வி',
      tagline:
        'தொடக்கக் கற்றல், ஆசிரியர் கண்ணியம், மாணவர் நலம், நவீன தொழில்நுட்பம் மற்றும் வெளிப்படையான நிதி மேலாண்மை ஆகியவை இணைந்த ஒருமித்த மக்கள் கல்வி இயக்கம்.',
      tier1Title: 'அடிப்படை கற்றல் & பாடத்திட்ட சீர்திருத்தம்',
      tier2Title: 'ஆசிரியர் மேம்பாடு & மாணவர் நலம்',
      tier3Title: 'நிர்வாக ஒழுங்குமுறை & உள்கட்டமைப்பு',
      centerMandate: 'முதன்மை நோக்கம்',
      centerTagline: 'ஒருங்கிணைந்த 8 முக்கிய கொள்கைத் தூண்கள்',
      explorePrompt: 'ஒவ்வொரு பிரிவையும் விரிவாகக் காண்க',
    },
  }[locale];

  const tier1 = STORY_PILLARS.filter((p) => p.tier === 'pedagogy');
  const tier2 = STORY_PILLARS.filter((p) => p.tier === 'people');
  const tier3 = STORY_PILLARS.filter((p) => p.tier === 'systems');

  return (
    <section
      id="story-ecosystem"
      aria-label="School Education Storytelling Ecosystem"
      className="relative w-full py-16 sm:py-24 bg-sand-50/90 border-b border-sand-300 overflow-hidden"
    >
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute inset-0 bg-[radial-gradient(#b5a989_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative max-w-[76rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* ==================================================================== */}
        {/* 1. CINEMATIC OPENING TYPOGRAPHY                                      */}
        {/* ==================================================================== */}
        <div className="text-center max-w-[50rem] mx-auto space-y-4">
          <EduReveal direction="up" delay={0}>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-maroon-700 bg-sand-200/80 px-3.5 py-1 border border-sand-300 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-maroon-700 animate-pulse" />
              <span>{content.badge}</span>
            </div>
          </EduReveal>

          {/* Dominant Editorial Heading */}
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{
                opacity: prefersReducedMotion ? 1 : 0,
                y: prefersReducedMotion ? 0 : 28,
                letterSpacing: prefersReducedMotion ? 'normal' : '0.08em',
                filter: prefersReducedMotion ? 'none' : 'blur(6px)',
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                letterSpacing: '0.01em',
                filter: 'blur(0px)',
              }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
              className="font-display text-4xl sm:text-6xl md:text-7xl text-charcoal-900 font-normal leading-tight tracking-tight uppercase"
            >
              {content.mainTitle}
            </motion.h2>
          </div>

          {/* Center Drawing Accent Rule */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.75, delay: 0.1, ease: CINEMATIC_EASE }}
            style={{ transformOrigin: 'center' }}
            className="h-[2px] w-24 sm:w-32 bg-maroon-700 mx-auto"
          />

          {/* Subtitle Statement */}
          <EduReveal direction="up" delay={0.15}>
            <p className="text-charcoal-700 font-serif italic text-base sm:text-lg md:text-xl leading-relaxed max-w-[42rem] mx-auto">
              {content.tagline}
            </p>
          </EduReveal>
        </div>

        {/* ==================================================================== */}
        {/* 2. CENTRAL MANDATE HERO NEXUS (SYMMETRICAL & PRESTIGIOUS)             */}
        {/* ==================================================================== */}
        <div className="max-w-[40rem] mx-auto">
          <EduTopLineBox
            delay={0.1}
            direction="scale"
            topLineColor="bg-maroon-700"
            className="p-6 sm:p-8 bg-sand-100/95 border border-sand-300 shadow-sm text-center space-y-2 rounded-xs"
          >
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-maroon-700 block">
              {content.centerMandate}
            </span>
            <div className="font-display text-2xl sm:text-3xl text-charcoal-900 font-semibold">
              {content.mainTitle}
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600 font-sans">
              {content.centerTagline}
            </p>
          </EduTopLineBox>
        </div>

        {/* ==================================================================== */}
        {/* 3. SYMMETRICAL 3-TIER ARCHITECTURAL ECOSYSTEM GRID                   */}
        {/* ==================================================================== */}
        <div className="space-y-10">
          {/* ------------------------------------------------------------------ */}
          {/* TIER 1: Foundations & Academic Reforms (3 Symmetrical Columns)     */}
          {/* ------------------------------------------------------------------ */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-charcoal-500 whitespace-nowrap">
                {content.tier1Title}
              </span>
              <div className="h-[1px] w-full bg-sand-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {tier1.map((item, idx) => (
                <EduTopLineBox
                  key={item.id}
                  delay={0.08 * (idx + 1)}
                  direction={idx === 0 ? 'left' : idx === 1 ? 'up' : 'right'}
                  topLineColor="bg-maroon-700"
                  className="bg-white border border-sand-300 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-maroon-700/60 transition-all rounded-xs flex flex-col justify-between space-y-4 group"
                >
                  <Link href={item.anchor} className="block space-y-3 no-underline">
                    <div className="flex items-center justify-between text-[11px] font-mono border-b border-sand-200 pb-2">
                      <span className="font-bold text-maroon-700 uppercase tracking-wider">
                        {item.tag[locale]}
                      </span>
                      <span className="text-charcoal-400 group-hover:text-maroon-700 font-bold transition-colors">
                        {item.number} ↗
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-semibold text-charcoal-900 group-hover:text-maroon-700 transition-colors leading-snug">
                      {item.title[locale]}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
                      {item.subtitle[locale]}
                    </p>
                  </Link>

                  <div className="text-[10px] font-mono text-charcoal-400 pt-2 border-t border-sand-100 flex items-center justify-between">
                    <span>Active Pillar</span>
                    <span className="text-maroon-700 group-hover:translate-x-0.5 transition-transform font-bold">
                      View Section →
                    </span>
                  </div>
                </EduTopLineBox>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* TIER 2: Human Capital & Welfare (2 Symmetrically Balanced Columns) */}
          {/* ------------------------------------------------------------------ */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-charcoal-500 whitespace-nowrap">
                {content.tier2Title}
              </span>
              <div className="h-[1px] w-full bg-sand-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {tier2.map((item, idx) => (
                <EduTopLineBox
                  key={item.id}
                  delay={0.12 * (idx + 1)}
                  direction={idx === 0 ? 'left' : 'right'}
                  topLineColor="bg-maroon-700"
                  className="bg-white border border-sand-300 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-maroon-700/60 transition-all rounded-xs flex flex-col justify-between space-y-4 group"
                >
                  <Link href={item.anchor} className="block space-y-3 no-underline">
                    <div className="flex items-center justify-between text-[11px] font-mono border-b border-sand-200 pb-2">
                      <span className="font-bold text-maroon-700 uppercase tracking-wider">
                        {item.tag[locale]}
                      </span>
                      <span className="text-charcoal-400 group-hover:text-maroon-700 font-bold transition-colors">
                        {item.number} ↗
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-semibold text-charcoal-900 group-hover:text-maroon-700 transition-colors leading-snug">
                      {item.title[locale]}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
                      {item.subtitle[locale]}
                    </p>
                  </Link>

                  <div className="text-[10px] font-mono text-charcoal-400 pt-2 border-t border-sand-100 flex items-center justify-between">
                    <span>Active Pillar</span>
                    <span className="text-maroon-700 group-hover:translate-x-0.5 transition-transform font-bold">
                      View Section →
                    </span>
                  </div>
                </EduTopLineBox>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* TIER 3: Institutional Governance & Infrastructure (3 Symmetrical)  */}
          {/* ------------------------------------------------------------------ */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-charcoal-500 whitespace-nowrap">
                {content.tier3Title}
              </span>
              <div className="h-[1px] w-full bg-sand-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {tier3.map((item, idx) => (
                <EduTopLineBox
                  key={item.id}
                  delay={0.08 * (idx + 1)}
                  direction={idx === 0 ? 'left' : idx === 1 ? 'up' : 'right'}
                  topLineColor="bg-maroon-700"
                  className="bg-white border border-sand-300 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-maroon-700/60 transition-all rounded-xs flex flex-col justify-between space-y-4 group"
                >
                  <Link href={item.anchor} className="block space-y-3 no-underline">
                    <div className="flex items-center justify-between text-[11px] font-mono border-b border-sand-200 pb-2">
                      <span className="font-bold text-maroon-700 uppercase tracking-wider">
                        {item.tag[locale]}
                      </span>
                      <span className="text-charcoal-400 group-hover:text-maroon-700 font-bold transition-colors">
                        {item.number} ↗
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-semibold text-charcoal-900 group-hover:text-maroon-700 transition-colors leading-snug">
                      {item.title[locale]}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
                      {item.subtitle[locale]}
                    </p>
                  </Link>

                  <div className="text-[10px] font-mono text-charcoal-400 pt-2 border-t border-sand-100 flex items-center justify-between">
                    <span>Active Pillar</span>
                    <span className="text-maroon-700 group-hover:translate-x-0.5 transition-transform font-bold">
                      View Section →
                    </span>
                  </div>
                </EduTopLineBox>
              ))}
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 4. SEAMLESS TRANSITION PROMPT INTO PRIORITIES                        */}
        {/* ==================================================================== */}
        <div className="text-center pt-8 space-y-3">
          <EduHorizontalLine color="bg-sand-300" duration={0.8} />

          <EduReveal direction="up" delay={0.1} className="pt-2">
            <Link
              href="#priorities"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-charcoal-700 hover:text-maroon-700 transition-colors group no-underline"
            >
              <span>{content.explorePrompt}</span>
              <motion.span
                animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="text-maroon-700 text-sm"
              >
                ↓
              </motion.span>
            </Link>
          </EduReveal>
        </div>
      </div>
    </section>
  );
}
