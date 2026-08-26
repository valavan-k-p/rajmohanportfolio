'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

// ---------------------------------------------------------
// CUSTOM SVG ICONS FOR PIPELINE
// ---------------------------------------------------------
const GenerationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeOpacity="0.3"/>
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const HumanReviewIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeOpacity="0.4" />
    <circle cx="12" cy="7" r="4" />
    <path d="M12 11v3" strokeOpacity="0.4" />
  </svg>
);

const FactCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeOpacity="0.4" />
  </svg>
);

const TerminologyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" strokeOpacity="0.4" />
    <text x="12" y="14" textAnchor="middle" className="font-tamil-display font-bold" fontSize="8" fill="currentColor" stroke="none">அ</text>
  </svg>
);

const CultureIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 2L6 22h12L12 2z" strokeOpacity="0.4" />
    <path d="M10 22v-4a2 2 0 0 1 4 0v4" />
  </svg>
);

const PublicationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeOpacity="0.4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PIPELINE = [
  { ta: 'AI உருவாக்கம்', en: 'AI Generation', Icon: GenerationIcon },
  { ta: 'மனித ஆய்வு', en: 'Human Review', Icon: HumanReviewIcon },
  { ta: 'உண்மை சரிபார்ப்பு', en: 'Fact Check', Icon: FactCheckIcon },
  { ta: 'கலைச்சொல் சரிபார்ப்பு', en: 'Terminology Verification', Icon: TerminologyIcon },
  { ta: 'பண்பாட்டு ஆய்வு', en: 'Cultural Review', Icon: CultureIcon },
  { ta: 'வெளியீடு', en: 'Publication', Icon: PublicationIcon, isFinal: true }
];

export function TechnicalTamilSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.pipeline-container',
          start: 'top 75%',
        }
      });

      // Pipeline spine drawing
      tl.fromTo('.pipeline-spine',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: 'power2.inOut', transformOrigin: "top center" }
      );

      // Pipeline items reveal
      tl.fromTo('.pipeline-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 0.6, ease: 'power2.out' },
        "-=1.2"
      );

      // AI Callout reveal
      gsap.fromTo('.ai-callout',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.ai-callout',
            start: 'top 85%',
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="technical-tamil"
      bgVariant="maroon"
      className="pt-0" // Remove top padding to merge seamlessly with Sorkuvai
    >
      <div ref={containerRef} className="max-w-6xl mx-auto w-full pt-16 border-t border-[var(--color-tamil-gold)]/10">
        
        {/* Story Title */}
        <div className="text-center mb-16">
          <h2 className="font-tamil-display text-4xl md:text-5xl text-[var(--color-tamil-gold)] mb-6">
            {locale === 'ta' ? 'மாறும் உலகிற்கான தமிழ்' : 'Tamil for a Changing World'}
          </h2>
          <p className="font-tamil-sans text-xl opacity-80 max-w-2xl mx-auto leading-relaxed text-white">
            {locale === 'ta'
              ? 'செயற்கை நுண்ணறிவு (AI), இணையப் பாதுகாப்பு, உயிரித் தொழில்நுட்பம் மற்றும் விண்வெளி அறிவியல் ஆகியவற்றிற்கான கலைச்சொற்கள் மூலம் தமிழை அடுத்த தலைமுறைக்குக் கொண்டு செல்லுதல்.'
              : 'Supporting the next generation of knowledge through technical terminology for AI, cybersecurity, biotechnology, and space science.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Terminology Pipeline */}
          <div className="pipeline-container relative flex flex-col pt-4 ml-4 md:ml-12">
            <div className="pipeline-spine absolute left-6 top-0 bottom-8 w-[2px] bg-[var(--color-tamil-gold)]/20" />
            
            {PIPELINE.map((step, i) => (
              <div key={i} className="pipeline-item relative flex items-center gap-8 mb-10 group">
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 bg-[var(--color-tamil-ink)] transition-colors ${
                  step.isFinal 
                    ? 'border-[var(--color-tamil-red)] text-[var(--color-tamil-red)] shadow-[0_0_15px_rgba(185,28,28,0.3)]' 
                    : 'border-[var(--color-tamil-gold)] text-[var(--color-tamil-gold)] group-hover:bg-[var(--color-tamil-gold)]/10'
                }`}>
                  <step.Icon />
                </div>
                <div>
                  <h4 className={`font-tamil-sans text-xl md:text-2xl tracking-wide ${
                    step.isFinal ? 'text-[var(--color-tamil-red)] font-bold' : 'text-white/90 font-medium'
                  }`}>
                    {locale === 'ta' ? step.ta : step.en}
                  </h4>
                </div>
              </div>
            ))}

            <div className="mt-2 ml-20 inline-block rounded border border-white/20 bg-white/5 px-3 py-1.5 text-[0.65rem] font-bold tracking-widest uppercase text-white/50">
              {locale === 'ta' ? 'முன்மொழியப்பட்ட கட்டமைப்பு' : 'PROPOSED FRAMEWORK'}
            </div>
          </div>

          {/* AI Editorial Callout */}
          <div className="ai-callout flex flex-col justify-center h-full">
            <div className="relative p-8 md:p-12 rounded-2xl border border-[var(--color-tamil-gold)]/20 bg-gradient-to-b from-[var(--color-tamil-ink)] to-black/80 shadow-2xl overflow-hidden group">
              
              {/* Subtle background motif */}
              <div className="absolute top-0 right-0 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-1000">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <path d="M100 0L200 100L100 200L0 100L100 0Z" stroke="var(--color-tamil-gold)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="50" stroke="var(--color-tamil-gold)" strokeWidth="1" />
                  <text x="100" y="115" textAnchor="middle" className="font-tamil-display" fontSize="40" fill="var(--color-tamil-gold)">அ</text>
                </svg>
              </div>

              <div className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--color-tamil-gold)]/70 mb-4 border-b border-[var(--color-tamil-gold)]/20 pb-4">
                TRADITIONAL KNOWLEDGE + MODERN TECHNOLOGY
              </div>

              <h4 className="font-tamil-display text-3xl mb-6 text-[var(--color-tamil-red)]">
                {locale === 'ta' ? 'அரசு உள்ளடக்கத்தில் AI சிக்கல்கள்' : 'AI in Government Content'}
              </h4>
              
              <p className="font-tamil-sans text-white/80 text-base leading-loose mb-8 text-pretty">
                {locale === 'ta'
                  ? 'AI உருவாக்கும் தமிழ் உள்ளடக்கங்களில் உள்ள பிழைகள் மற்றும் பண்பாட்டுத் தவறுகளை ஆய்வு செய்து சீரமைக்கும் பணிகள் துறை அளவில் கவனிக்கப்படுகின்றன.'
                  : 'Addressing the governance concern of AI-generated content accuracy. Implementing scrutiny directions to ensure technical terminology and cultural precision are maintained in digital administrative outputs.'}
              </p>
              
              <div className="inline-block rounded bg-[var(--color-tamil-red)]/10 border border-[var(--color-tamil-red)]/30 px-3 py-1.5 text-[0.65rem] font-bold tracking-widest uppercase text-[var(--color-tamil-red)]">
                {locale === 'ta' ? 'அறிவிக்கப்பட்ட கொள்கை திசை' : 'RESPONSIBLE DIGITAL TAMIL DIRECTION'}
              </div>
            </div>
          </div>

        </div>
      </div>
    </TamilSection>
  );
}
