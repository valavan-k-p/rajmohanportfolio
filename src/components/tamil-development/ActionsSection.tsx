'use client';

import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';
import { TAMIL_DEVELOPMENT_DATA } from '@/data/tamil-development';

// ---------------------------------------------------------
// CUSTOM SVG ICONS FOR PROGRAMS
// ---------------------------------------------------------
const OfficialLanguageIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" stroke="var(--color-tamil-gold)" />
    <path d="M6 2v20" stroke="var(--color-tamil-red)" />
    <text x="12" y="14" textAnchor="middle" className="font-display font-bold" fontSize="10" fill="currentColor" stroke="none">அ</text>
  </svg>
);

const AwardsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" stroke="var(--color-tamil-gold)" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" stroke="var(--color-tamil-red)" />
  </svg>
);

const BooksIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" stroke="var(--color-tamil-red)" />
    <path d="M9 10h6" stroke="var(--color-tamil-gold)" />
    <path d="M9 14h6" stroke="var(--color-tamil-gold)" />
  </svg>
);

const DreamHouseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="var(--color-tamil-red)" />
    <polyline points="9 22 9 12 15 12 15 22" stroke="var(--color-tamil-gold)" />
  </svg>
);

const SorkuvaiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" stroke="var(--color-tamil-red)" />
    <line x1="2" y1="12" x2="22" y2="12" stroke="var(--color-tamil-gold)" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="var(--color-tamil-gold)" />
    <text x="11" y="13" textAnchor="middle" className="font-display" fontSize="6" fill="currentColor" stroke="none">ஆ</text>
  </svg>
);

const ResearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="11" cy="11" r="6" strokeOpacity="0.4" />
    <path d="M15.5 15.5L21 21" />
    <text x="11" y="13" textAnchor="middle" className="font-display" fontSize="6" fill="currentColor" stroke="none">ஆ</text>
  </svg>
);

const StudentsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeOpacity="0.4" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const ACTION_ICONS = [
  <OfficialLanguageIcon key="0" />,
  <AwardsIcon key="1" />,
  <BooksIcon key="2" />,
  <DreamHouseIcon key="3" />,
  <SorkuvaiIcon key="4" />,
  <ResearchIcon key="5" />,
  <StudentsIcon key="6" />
];

export function ActionsSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });

      // 1. Title animations
      tl.fromTo('.action-header', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' }
      );

      // 2. Central Path drawing
      tl.fromTo('.story-path',
        { strokeDasharray: 800, strokeDashoffset: 800 },
        { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' },
        "-=0.4"
      );

      // 3. Foundation cards reveal
      tl.fromTo('.foundation-card',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out' },
        "-=1.2"
      );

      // 4. Action cards reveal
      tl.fromTo('.action-card',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out' },
        "-=1.0"
      );

      // 5. Connection lines pop in
      tl.fromTo('.connection-line',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, stagger: 0.15, duration: 0.4, transformOrigin: "left center", ease: 'power2.out' },
        "-=0.8"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <TamilSection id="actions" bgVariant="paper" className="overflow-visible relative">
      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto pt-8">
        
        {/* Headers */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 mb-16 relative z-10">
          <div className="action-header text-center md:text-right">
            <h3 className="font-display text-2xl font-bold text-[var(--color-tamil-ink)]/70">
              {locale === 'ta' ? 'துறையின் தொடர்ச்சியான பணிகள்' : 'Departmental Continuity'}
            </h3>
            <p className="text-xs mt-2 opacity-50 uppercase tracking-widest font-bold">
              {locale === 'ta' ? 'நடைமுறையிலுள்ள திட்டங்கள்' : 'Existing Foundation'}
            </p>
          </div>
          
          <div className="hidden md:flex action-header items-center justify-center text-[var(--color-tamil-gold)] font-bold opacity-50">
            →
          </div>

          <div className="action-header text-center md:text-left">
            <h3 className="font-display text-2xl font-bold text-[var(--color-tamil-red)]">
              {locale === 'ta' ? 'அமைச்சரின் பணிக்காலத்தில்' : 'Rajmohan Tenure Actions'}
            </h3>
            <p className="text-xs mt-2 opacity-70 uppercase tracking-widest text-[var(--color-tamil-red)] font-bold">
              {locale === 'ta' ? 'மே 2026 முதல்' : 'Forward Momentum'}
            </p>
          </div>
        </div>

        {/* Storytelling Canvas */}
        <div className="relative">
          {/* Central Vertical Timeline/Path (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[var(--color-tamil-gold)]/20">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="var(--color-tamil-gold)" strokeWidth="2" className="story-path" />
            </svg>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-12 md:gap-x-24 relative z-10">
            
            {TAMIL_DEVELOPMENT_DATA.departmentalContinuity.map((item, i) => (
              <React.Fragment key={`row-${i}`}>
                {/* Left Column (Foundation) */}
                <div className="foundation-card flex justify-end">
                  <div className="w-full md:w-5/6 bg-white/60 backdrop-blur-sm border border-[var(--color-tamil-gold)]/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-[var(--color-tamil-paper)] flex items-center justify-center text-[var(--color-tamil-gold)] border border-[var(--color-tamil-gold)]/30">
                        {ACTION_ICONS[i]}
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-lg text-[var(--color-tamil-ink)]/80">
                          {item.title?.[locale]}
                        </h4>
                        <div className="mt-1 text-[0.65rem] font-bold tracking-widest uppercase text-[var(--color-tamil-ink)]/40">
                          {locale === 'ta' ? 'மரபுவழித் திட்டம்' : 'Inherited Programme'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (Tenure Action) */}
                <div className="action-card flex justify-start relative">
                  {/* Connection Line (Desktop) */}
                  <div className="hidden md:block absolute top-1/2 -left-24 w-24 h-px bg-[var(--color-tamil-red)]/30 connection-line">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-tamil-red)]" />
                  </div>
                  
                  <div className="w-full md:w-5/6 bg-white border border-[var(--color-tamil-red)]/20 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[var(--color-tamil-red)]/40 transition-shadow">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-display font-medium text-lg text-[var(--color-tamil-red)]">
                          {TAMIL_DEVELOPMENT_DATA.rajmohanTenureActions[i]?.title?.[locale]}
                        </h4>
                        <div className="mt-1 inline-block rounded bg-[var(--color-tamil-red)]/10 px-2 py-0.5 text-[0.65rem] font-bold tracking-widest uppercase text-[var(--color-tamil-red)]">
                          {locale === 'ta' ? 'அவரது பணிக்காலத்தில்' : 'Under His Tenure'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}

          </div>
        </div>

      </div>
    </TamilSection>
  );
}
