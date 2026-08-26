'use client';

import { useRef, useEffect, useState } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

const LanguageIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="var(--color-tamil-gold)" strokeWidth="1.5">
    <path d="M3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10C17 11.59 16.47 13.056 15.576 14.25L18.5 18H13.6C12.56 18.667 11.33 19 10 19C6.134 19 3 15.866 3 12" strokeLinecap="round" />
    <text x="10" y="14" textAnchor="middle" className="font-tamil-display font-bold" fontSize="10" fill="var(--color-tamil-red)" stroke="none">அ</text>
    <path d="M21 10a4 4 0 0 0-4-4" strokeLinecap="round" strokeOpacity="0.5" />
    <path d="M19 14a4 4 0 0 0 2-4" strokeLinecap="round" strokeOpacity="0.5" />
  </svg>
);

const LiteratureIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10h16c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2z" stroke="var(--color-tamil-gold)" fill="var(--color-tamil-gold)" fillOpacity="0.1" />
    <path d="M4 6h16c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z" strokeOpacity="0.4" stroke="var(--color-tamil-red)" />
    <path d="M4 14h16c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2z" strokeOpacity="0.4" stroke="var(--color-tamil-red)" />
    <circle cx="12" cy="12" r="1.5" stroke="var(--color-tamil-red)" fill="var(--color-tamil-red)" />
    <path d="M12 10v4" stroke="var(--color-tamil-red)" />
    <path d="M6 12h4" stroke="var(--color-tamil-gold)" />
    <path d="M14 12h4" stroke="var(--color-tamil-gold)" />
  </svg>
);

const TranslationIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="8" height="8" rx="2" stroke="var(--color-tamil-red)" />
    <text x="7" y="9" textAnchor="middle" className="font-tamil-display font-bold" fontSize="6" fill="var(--color-tamil-red)" stroke="none">அ</text>
    <rect x="13" y="13" width="8" height="8" rx="2" stroke="var(--color-tamil-gold)" />
    <text x="17" y="19" textAnchor="middle" className="font-sans font-bold" fontSize="6" fill="var(--color-tamil-gold)" stroke="none">A</text>
    <path d="M11 7h4a2 2 0 0 1 2 2v2" stroke="var(--color-tamil-red)" strokeOpacity="0.6" />
    <path d="M15 9l2 2 2-2" stroke="var(--color-tamil-red)" strokeOpacity="0.6" />
    <path d="M13 17H9a2 2 0 0 1-2-2v-2" stroke="var(--color-tamil-gold)" strokeOpacity="0.6" />
    <path d="M5 15l2-2 2 2" stroke="var(--color-tamil-gold)" strokeOpacity="0.6" />
  </svg>
);

const LexicographyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="var(--color-tamil-gold)" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="var(--color-tamil-red)" />
    <path d="M20 6h2v3h-2" stroke="var(--color-tamil-gold)" />
    <path d="M20 11h2v3h-2" stroke="var(--color-tamil-gold)" />
    <text x="12" y="11" textAnchor="middle" className="font-tamil-display font-bold" fontSize="7" fill="var(--color-tamil-red)" stroke="none">அ</text>
    <path d="M9 14h6" stroke="var(--color-tamil-gold)" strokeOpacity="0.6" />
    <path d="M10 16h4" stroke="var(--color-tamil-gold)" strokeOpacity="0.6" />
  </svg>
);

const ResearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="var(--color-tamil-gold)" strokeOpacity="0.6" />
    <path d="M14 2v6h6" stroke="var(--color-tamil-gold)" strokeOpacity="0.6" />
    <circle cx="11" cy="12" r="4" stroke="var(--color-tamil-red)" fill="var(--color-tamil-paper)" />
    <line x1="13.83" y1="14.83" x2="18" y2="19" stroke="var(--color-tamil-red)" strokeWidth="2" />
    <text x="11" y="14" textAnchor="middle" className="font-tamil-display" fontSize="6" fill="var(--color-tamil-red)" stroke="none">ஆ</text>
  </svg>
);

const StudentsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4" stroke="var(--color-tamil-red)" />
    <path d="M5.5 21a8.38 8.38 0 0 1 13 0" stroke="var(--color-tamil-red)" />
    <path d="M12 13c-2 0-4 1-5 2v5c1-1 3-2 5-2s4 1 5 2v-5c-1-1-3-2-5-2z" stroke="var(--color-tamil-gold)" fill="var(--color-tamil-gold)" fillOpacity="0.1" />
  </svg>
);

const CultureIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L6 22h12L12 2z" stroke="var(--color-tamil-red)" />
    <path d="M8 15h8" stroke="var(--color-tamil-gold)" />
    <path d="M9.5 10h5" stroke="var(--color-tamil-gold)" />
    <path d="M11 5h2" stroke="var(--color-tamil-gold)" />
    <rect x="4" y="22" width="16" height="2" stroke="var(--color-tamil-red)" fill="var(--color-tamil-red)" />
    <path d="M10 22v-4a2 2 0 0 1 4 0v4" stroke="var(--color-tamil-gold)" fill="var(--color-tamil-paper)" />
  </svg>
);

const GlobalTamilIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" stroke="var(--color-tamil-red)" />
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="var(--color-tamil-gold)" strokeOpacity="0.7" />
    <path d="M3 12h18" stroke="var(--color-tamil-gold)" strokeOpacity="0.7" />
    <path d="M5.5 6.5h13" stroke="var(--color-tamil-gold)" strokeOpacity="0.4" />
    <path d="M5.5 17.5h13" stroke="var(--color-tamil-gold)" strokeOpacity="0.4" />
    <circle cx="12" cy="12" r="1.5" fill="var(--color-tamil-red)" stroke="none" />
    <circle cx="15" cy="8" r="1" fill="var(--color-tamil-red)" stroke="none" />
    <circle cx="8" cy="15" r="1" fill="var(--color-tamil-red)" stroke="none" />
    <circle cx="16" cy="16" r="1" fill="var(--color-tamil-red)" stroke="none" />
  </svg>
);

const DigitalTamilIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="5" width="14" height="14" rx="3" stroke="var(--color-tamil-red)" />
    <path d="M12 2v3" stroke="var(--color-tamil-gold)" />
    <path d="M12 19v3" stroke="var(--color-tamil-gold)" />
    <path d="M2 12h3" stroke="var(--color-tamil-gold)" />
    <path d="M19 12h3" stroke="var(--color-tamil-gold)" />
    <rect x="8" y="8" width="8" height="8" rx="1" stroke="var(--color-tamil-gold)" fill="var(--color-tamil-gold)" fillOpacity="0.1" />
    <text x="12" y="14" textAnchor="middle" className="font-tamil-display font-bold" fontSize="6" fill="var(--color-tamil-red)" stroke="none">அ</text>
  </svg>
);

const ECOSYSTEM_DOMAINS = [
  { id: 'language', label: 'Language', taLabel: 'மொழி', desc: 'Strengthening Tamil as an official and living language.', icon: <LanguageIcon /> },
  { id: 'literature', label: 'Literature', taLabel: 'இலக்கியம்', desc: 'Preserving and promoting Tamil literary heritage.', icon: <LiteratureIcon /> },
  { id: 'translation', label: 'Translation', taLabel: 'மொழிபெயர்ப்பு', desc: 'Connecting Tamil knowledge with the world.', icon: <TranslationIcon /> },
  { id: 'lexicography', label: 'Lexicography', taLabel: 'அகராதியியல்', desc: 'Building modern Tamil dictionaries and language resources.', icon: <LexicographyIcon /> },
  { id: 'research', label: 'Research', taLabel: 'ஆராய்ச்சி', desc: 'Encouraging academic and linguistic research.', icon: <ResearchIcon /> },
  { id: 'students', label: 'Students', taLabel: 'மாணவர்கள்', desc: 'Empowering the next generation through Tamil.', icon: <StudentsIcon /> },
  { id: 'culture', label: 'Culture', taLabel: 'பண்பாடு', desc: 'Celebrating Tamil identity, arts and traditions.', icon: <CultureIcon /> },
  { id: 'global-tamil', label: 'Global Tamil', taLabel: 'உலகத் தமிழ்', desc: 'Connecting Tamil communities across the world.', icon: <GlobalTamilIcon /> },
  { id: 'digital-tamil', label: 'Digital Tamil', taLabel: 'மின் தமிழ்', desc: 'Building Tamil for the digital future.', icon: <DigitalTamilIcon /> }
];

export function EcosystemNetwork({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Horizontal Scroll Journey
      mm.add("(min-width: 768px)", () => {
        // Calculate the total width to scroll
        const trackWidth = trackRef.current ? trackRef.current.scrollWidth : 0;
        const scrollAmount = trackWidth - window.innerWidth + window.innerWidth * 0.2; // Add padding

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '#ecosystem',
            start: 'top top',
            end: () => `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        tl.to('.horizontal-track', {
          x: () => -scrollAmount,
          ease: 'none'
        });
      });

      // Mobile: Vertical Storytelling Cascade
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray('.mobile-story-card').forEach((card: any) => {
          gsap.fromTo(card,
            { opacity: 0, x: -30, scale: 0.95 },
            { 
              opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%'
              }
            }
          );
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const title = locale === 'ta' ? 'தமிழ் வளர்ச்சி எவ்வாறு இணைகிறது' : 'How Tamil Development Connects';

  return (
    <div ref={containerRef}>
      <TamilSection
        id="ecosystem"
        chapterNumber="02"
        category="THE DEPARTMENT"
        title={title}
        bgVariant="paper"
        className="bg-[url('/images/tamil-development/bg.png')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-[var(--color-tamil-paper)] before:opacity-85 before:z-0 overflow-hidden"
      >
        {/* Desktop Horizontal Track */}
        <div className="hidden md:flex relative h-[500px] lg:h-[600px] items-center mt-4 mb-8">
          <div ref={trackRef} className="horizontal-track flex flex-row items-center gap-20 px-[10vw] min-w-max w-max">
            
            {/* The Connecting Line (Thread) */}
            <div className="absolute left-[10vw] top-1/2 -translate-y-1/2 h-[3px] bg-[var(--color-tamil-gold)] w-[calc(100%-20vw)] -z-10 opacity-40" />

            {/* Title Card / Core */}
            <div className="w-96 flex flex-col items-center justify-center story-card shrink-0 z-10 relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--color-tamil-paper)] rounded-full blur-3xl opacity-80 -z-10" />
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-tamil-red-deep)] to-[var(--color-tamil-red)] text-white shadow-2xl border-4 border-[var(--color-tamil-gold)] mb-8">
                <div className="text-center flex flex-col items-center">
                  <span className="font-tamil-display text-4xl font-bold tracking-wider leading-tight">
                    {locale === 'ta' ? 'தமிழ்' : 'TAMIL'}
                  </span>
                  <span className="font-tamil-sans text-sm tracking-widest opacity-80 uppercase mt-2">
                    {locale === 'ta' ? 'வளர்ச்சி' : 'Development'}
                  </span>
                </div>
              </div>
              <p className="text-center text-[var(--color-tamil-ink)] font-tamil-sans max-w-sm text-lg leading-relaxed">
                A connected ecosystem driving the future of the Tamil language across all domains.
              </p>
            </div>

            {/* Story Cards */}
            {ECOSYSTEM_DOMAINS.map((domain, i) => (
              <div key={domain.id} className="story-card relative flex flex-col w-80 shrink-0 group z-10 mt-12">
                <div className="absolute top-1/2 left-0 -translate-x-10 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--color-tamil-gold)] border-4 border-white z-0 shadow-sm" />
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-[var(--color-tamil-gold)]/20 hover:border-[var(--color-tamil-red)] transition-all duration-500 hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-2xl bg-[var(--color-tamil-paper)] flex items-center justify-center text-3xl mb-6 border border-[var(--color-tamil-gold)]/30 group-hover:bg-[var(--color-tamil-gold)]/20 transition-colors text-[var(--color-tamil-red)] shadow-sm`}>
                    {domain.icon}
                  </div>
                  <h4 className="font-tamil-display text-2xl font-bold text-[var(--color-tamil-red)] mb-4">
                    {locale === 'ta' ? domain.taLabel : domain.label}
                  </h4>
                  <p className="font-tamil-sans text-[var(--color-tamil-ink)]/80 leading-relaxed">
                    {domain.desc}
                  </p>
                </div>
              </div>
            ))}
            
            {/* End padding block to ensure smooth scroll out */}
            <div className="w-[15vw] shrink-0" />
          </div>
        </div>

        {/* Mobile Vertical Cascade */}
        <div className="md:hidden relative w-full px-4 flex flex-col items-start gap-12 pt-12 pb-16">
          {/* Vertical Thread */}
          <div className="w-[3px] h-[calc(100%-100px)] absolute left-[2.2rem] top-40 bg-[var(--color-tamil-gold)] opacity-40 z-0" />
          
          <div className="relative z-20 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-tamil-red-deep)] to-[var(--color-tamil-red)] text-white shadow-xl border-4 border-[var(--color-tamil-gold)] mb-4 self-center">
            <div className="text-center flex flex-col items-center">
              <span className="font-tamil-display text-2xl font-bold tracking-wider leading-tight">
                {locale === 'ta' ? 'தமிழ்' : 'TAMIL'}
              </span>
              <span className="font-tamil-sans text-xs tracking-widest opacity-80 uppercase mt-1">
                {locale === 'ta' ? 'வளர்ச்சி' : 'Development'}
              </span>
            </div>
          </div>

          {ECOSYSTEM_DOMAINS.map((domain, i) => (
            <div key={domain.id} className="mobile-story-card relative w-full flex items-center gap-6 pl-2 z-10">
              <div className="w-5 h-5 shrink-0 rounded-full bg-[var(--color-tamil-gold)] border-[4px] border-[var(--color-tamil-paper)] shadow-md z-10" />
              <div className="bg-white/95 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-[var(--color-tamil-gold)]/20 w-full hover:border-[var(--color-tamil-red)]/50 transition-colors">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[var(--color-tamil-paper)] flex items-center justify-center text-xl border border-[var(--color-tamil-gold)]/30 text-[var(--color-tamil-red)]">
                    {domain.icon}
                  </div>
                  <h4 className="font-tamil-display text-lg font-bold text-[var(--color-tamil-red)]">
                    {locale === 'ta' ? domain.taLabel : domain.label}
                  </h4>
                </div>
                <p className="font-tamil-sans text-sm text-[var(--color-tamil-ink)]/80 leading-relaxed">
                  {domain.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </TamilSection>
    </div>
  );
}
