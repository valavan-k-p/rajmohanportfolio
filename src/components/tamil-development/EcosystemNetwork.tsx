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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      });

      // 1. Heading is handled by TamilSection normally, we animate the core
      tl.fromTo('.eco-core',
        { scale: 0, opacity: 0, rotate: -45 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: 'back.out(1.5)' }
      );

      // 2. Animate nodes sequentially
      ECOSYSTEM_DOMAINS.forEach((_, i) => {
        // Line draws out
        tl.fromTo(`.eco-line-${i}`,
          { strokeDasharray: 300, strokeDashoffset: 300 },
          { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' },
          "-=0.1"
        );
        // Node pops in
        tl.fromTo(`.eco-node-${i}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          "-=0.2"
        );
        // Icon subtle scale/fade
        tl.fromTo(`.eco-icon-${i}`,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' },
          "-=0.4"
        );
      });

      // 3. Final connection pulse
      tl.to('.eco-core-ring',
        { scale: 1.2, opacity: 0, duration: 2, repeat: -1, ease: 'power2.out' },
        "-=0.5"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const title = locale === 'ta' ? 'தமிழ் வளர்ச்சி எவ்வாறு இணைகிறது' : 'How Tamil Development Connects';

  // Manually adjusted positions to prevent box overlapping (x, y percentage offsets from center)
  const NODE_POSITIONS = [
    { x: 0, y: -44 },     // 0: Language (Top Center)
    { x: 32, y: -30 },    // 1: Literature (Top Right)
    { x: 45, y: -3 },     // 2: Translation (Right)
    { x: 40, y: 24 },     // 3: Lexicography (Bottom Right)
    { x: 15, y: 46 },     // 4: Research (Bottom Center-Right)
    { x: -15, y: 46 },    // 5: Students (Bottom Center-Left)
    { x: -40, y: 24 },    // 6: Culture (Bottom Left)
    { x: -45, y: -3 },    // 7: Global Tamil (Left)
    { x: -32, y: -30 },   // 8: Digital Tamil (Top Left)
  ];

  return (
    <TamilSection
      id="ecosystem"
      chapterNumber="02"
      category="THE DEPARTMENT"
      title={title}
      bgVariant="paper"
    >
      <div ref={containerRef} className="relative mt-8 md:mt-16 pb-12 w-full flex justify-center overflow-visible">
        
        {/* Desktop Radial Layout */}
        <div className="hidden md:flex relative w-full justify-center items-center h-[600px] lg:h-[750px] overflow-visible">
          <div className="relative w-[1400px] h-[1000px] shrink-0 scale-[0.6] lg:scale-[0.75] origin-center">
            {/* SVG Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {ECOSYSTEM_DOMAINS.map((_, i) => {
              const pos = NODE_POSITIONS[i]!;
              return (
                <line 
                  key={`line-${i}`}
                  className={`eco-line-${i}`}
                  x1="50%" y1="50%" x2={`${50 + pos.x}%`} y2={`${50 + pos.y}%`}
                  stroke="var(--color-tamil-gold)"
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
              );
            })}
          </svg>

          {/* Central Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 eco-core">
            <div className="relative flex h-36 w-36 md:h-40 md:w-40 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-tamil-red-deep)] to-[var(--color-tamil-red)] text-white shadow-2xl border-4 border-white">
              <div className="absolute inset-0 rounded-full border-2 border-[var(--color-tamil-gold)] eco-core-ring" />
              <div className="text-center flex flex-col items-center">
                <span className="font-tamil-display text-2xl font-bold tracking-wider leading-tight">
                  {locale === 'ta' ? 'தமிழ்' : 'TAMIL'}
                </span>
                <span className="font-tamil-sans text-xs tracking-widest opacity-80 uppercase mt-1">
                  {locale === 'ta' ? 'வளர்ச்சி' : 'Development'}
                </span>
              </div>
            </div>
          </div>

          {/* Radial Nodes */}
          {ECOSYSTEM_DOMAINS.map((domain, i) => {
            const pos = NODE_POSITIONS[i]!;
            return (
              <div 
                key={domain.id}
                className={`absolute z-10 w-56 lg:w-64 -translate-x-1/2 -translate-y-1/2 eco-node-${i}`}
                style={{ left: `${50 + pos.x}%`, top: `${50 + pos.y}%` }}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-[var(--color-tamil-gold)]/20 hover:border-[var(--color-tamil-red)]/40 hover:shadow-xl transition-all group flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full bg-[var(--color-tamil-paper)] flex items-center justify-center text-xl mb-3 border border-[var(--color-tamil-gold)]/30 group-hover:bg-[var(--color-tamil-gold)]/10 transition-colors eco-icon-${i}`}>
                    {domain.icon}
                  </div>
                  <h4 className="font-tamil-display text-lg font-bold text-[var(--color-tamil-red)] mb-2">
                    {locale === 'ta' ? domain.taLabel : domain.label}
                  </h4>
                  <p className="font-tamil-sans text-xs text-[var(--color-tamil-ink)]/70 leading-relaxed">
                    {domain.desc}
                  </p>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Mobile Vertical Flow Layout */}
        <div className="md:hidden relative w-full px-4 flex flex-col items-center gap-12 pt-8">
          {/* Central Core (Top) */}
          <div className="relative z-20 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-tamil-red-deep)] to-[var(--color-tamil-red)] text-white shadow-xl eco-core border-4 border-white mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--color-tamil-gold)] eco-core-ring" />
            <div className="text-center flex flex-col items-center">
              <span className="font-tamil-display text-xl font-bold tracking-wider leading-tight">
                {locale === 'ta' ? 'தமிழ்' : 'TAMIL'}
              </span>
              <span className="font-tamil-sans text-[10px] tracking-widest opacity-80 uppercase mt-1">
                {locale === 'ta' ? 'வளர்ச்சி' : 'Development'}
              </span>
            </div>
          </div>

          {/* SVG Spine for Mobile */}
          <svg className="absolute left-1/2 top-40 bottom-0 w-[2px] h-[calc(100%-160px)] -translate-x-1/2 pointer-events-none" preserveAspectRatio="none">
             <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--color-tamil-gold)" strokeWidth="2" strokeOpacity="0.4" strokeDasharray="6,6" />
          </svg>

          {/* Mobile Nodes */}
          {ECOSYSTEM_DOMAINS.map((domain, i) => (
            <div key={domain.id} className={`relative z-10 w-full max-w-sm eco-node-${i}`}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--color-tamil-gold)] border-4 border-white z-0" />
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-sm border border-[var(--color-tamil-gold)]/20 relative z-10">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 shrink-0 rounded-full bg-[var(--color-tamil-paper)] flex items-center justify-center text-lg border border-[var(--color-tamil-gold)]/30 eco-icon-${i}`}>
                    {domain.icon}
                  </div>
                  <div>
                    <h4 className="font-tamil-display text-md font-bold text-[var(--color-tamil-red)] mb-1">
                      {locale === 'ta' ? domain.taLabel : domain.label}
                    </h4>
                    <p className="font-tamil-sans text-xs text-[var(--color-tamil-ink)]/70 leading-relaxed">
                      {domain.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </TamilSection>
  );
}
