'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function DreamHouseSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });

      // 1. Title fade in
      tl.fromTo('.story-title',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      // 2. Draw the traditional architecture
      tl.fromTo('.arch-draw',
        { strokeDasharray: 800, strokeDashoffset: 800 },
        { strokeDashoffset: 0, duration: 2.5, ease: 'power2.inOut', stagger: 0.1 },
        "-=0.4"
      );
      
      // 3. Fade in architectural/literary details
      tl.fromTo('.arch-details',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        "-=1.0"
      );

      // 4. Reveal "Dream House Scheme" content
      tl.fromTo('.scheme-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="dream-house"
      bgVariant="cream"
      className="text-center overflow-hidden"
    >
      <div ref={containerRef} className="max-w-4xl mx-auto pt-12 flex flex-col items-center">
        
        {/* Story Intro */}
        <h2 className="story-title font-display text-3xl md:text-5xl font-bold mb-4 text-[var(--color-tamil-red)] leading-tight text-balance">
          {locale === 'ta' ? 'தமிழை வளர்த்தவர்களை அங்கீகரித்தல்' : 'Recognising the People Who Built Tamil'}
        </h2>
        
        <div className="story-title mb-16 opacity-60 font-bold uppercase tracking-widest text-xs">
          {locale === 'ta' ? 'அங்கீகாரம் → ஆதரவு → பாதுகாத்தல்' : 'RECOGNITION → SUPPORT → PRESERVATION'}
        </div>
        
        {/* Visual Metaphor: Traditional Tamil Architecture + Literature */}
        <div className="relative w-full max-w-2xl aspect-[4/3] md:aspect-[16/9] mb-12 flex items-center justify-center">
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 400 300" fill="none" strokeLinecap="round" strokeLinejoin="round">
            
            {/* The Roof Silhouette */}
            <path className="arch-draw stroke-[var(--color-tamil-red)]" d="M40 140L200 40L360 140" strokeWidth="3" />
            <path className="arch-draw stroke-[var(--color-tamil-gold)]" d="M60 140L200 55L340 140" strokeWidth="1.5" />
            <path className="arch-draw stroke-[var(--color-tamil-gold)]" d="M80 140L200 70L320 140" strokeWidth="1.5" />
            
            {/* Inner Roof Decor */}
            <path className="arch-draw stroke-[var(--color-tamil-red)]/30" d="M200 40V70" strokeWidth="2" />
            
            {/* The Pillars (Thinnai) */}
            <path className="arch-draw stroke-[var(--color-tamil-gold)]" d="M90 140V260M310 140V260" strokeWidth="4" />
            <path className="arch-draw stroke-[var(--color-tamil-gold)]" d="M140 140V240M260 140V240" strokeWidth="2" />
            
            {/* Pillar Capitals */}
            <path className="arch-draw stroke-[var(--color-tamil-red)]" d="M80 140H100M300 140H320M135 140H145M255 140H265" strokeWidth="3" />
            
            {/* Base / Foundation */}
            <path className="arch-draw stroke-[var(--color-tamil-red)]" d="M20 260H380" strokeWidth="4" />
            <path className="arch-draw stroke-[var(--color-tamil-red)]/50" d="M40 270H360" strokeWidth="2" />
            <path className="arch-draw stroke-[var(--color-tamil-gold)]" d="M90 240H140M260 240H310" strokeWidth="1.5" />
            
            {/* Central Doorway / Shrine */}
            <path className="arch-draw stroke-[var(--color-tamil-gold)]" d="M170 260V180C170 160 230 160 230 180V260" strokeWidth="2" />
            <path className="arch-draw stroke-[var(--color-tamil-gold)]" d="M185 260V190C185 180 215 180 215 190V260" strokeWidth="1" />
            
            {/* Abstract Kolam / Floor details */}
            <path className="arch-draw stroke-[var(--color-tamil-red)]" d="M190 275C190 280 195 285 200 285C205 285 210 280 210 275" strokeWidth="1.5" />
            <circle className="arch-draw fill-[var(--color-tamil-red)]" cx="200" cy="280" r="2" />
            <path className="arch-draw stroke-[var(--color-tamil-gold)]" d="M160 275C160 295 240 295 240 275" strokeWidth="1.5" strokeDasharray="4,6" />
            
            {/* Literary Motif - Palm Leaves and Book */}
            <g className="arch-details" stroke="var(--color-tamil-red)">
              {/* Thinnai Left Manuscript */}
              <path d="M100 210H130M105 200H125M95 220H135" strokeWidth="2.5" strokeLinecap="square" />
              <circle cx="115" cy="210" r="1.5" fill="var(--color-tamil-paper)" stroke="none" />
              
              {/* Thinnai Right Books */}
              <path d="M270 220H300M275 210H295" strokeWidth="3" strokeLinecap="square" />
              <path d="M285 195V220" strokeWidth="1" strokeDasharray="2,2" />
            </g>

            {/* Tamil Letter form hovering as knowledge */}
            <text x="200" y="230" textAnchor="middle" className="arch-details font-display opacity-10" fontSize="40" fill="var(--color-tamil-red)" stroke="none">அ</text>
            
          </svg>
        </div>

        {/* Content details */}
        <div className="scheme-content mb-8">
          <h3 className="font-display text-2xl md:text-4xl font-bold mb-4 text-[var(--color-tamil-ink)]">
            {locale === 'ta' ? 'கனவு இல்லம்' : 'Dream House Scheme'}
          </h3>
          <div className="w-16 h-1 bg-[var(--color-tamil-gold)] mx-auto mb-6" />
        </div>
        
        <p className="scheme-content text-lg md:text-xl font-medium opacity-80 text-balance leading-relaxed max-w-2xl text-[var(--color-tamil-ink)]">
          {locale === 'ta'
            ? 'தகுதியான சிறந்த தமிழ் எழுத்தாளர்கள் மற்றும் மொழிபெயர்ப்பாளர்களுக்கு நலத்திட்ட உதவியாக குடியிருப்பு அங்கீகாரம் வழங்குதல்.'
            : 'Providing welfare-oriented residential support for eligible distinguished Tamil writers and extending recognition to translators.'}
        </p>

        <div className="scheme-content mt-12 flex flex-wrap justify-center items-center gap-4 text-[0.65rem] font-bold uppercase tracking-widest text-[var(--color-tamil-red)]">
          <span className="px-3 py-1 border border-[var(--color-tamil-red)]/20 rounded-full bg-[var(--color-tamil-red)]/5">
            {locale === 'ta' ? 'இலக்கிய பங்களிப்பு' : 'Literary Contribution'}
          </span>
          <span className="w-8 h-[1px] bg-[var(--color-tamil-gold)]" />
          <span className="px-3 py-1 border border-[var(--color-tamil-red)]/20 rounded-full bg-[var(--color-tamil-red)]/5">
            {locale === 'ta' ? 'அங்கீகாரம்' : 'Recognition'}
          </span>
          <span className="w-8 h-[1px] bg-[var(--color-tamil-gold)]" />
          <span className="px-3 py-1 border border-[var(--color-tamil-red)]/20 rounded-full bg-[var(--color-tamil-red)]/5">
            {locale === 'ta' ? 'கண்ணியம்' : 'Dignity'}
          </span>
        </div>
      </div>
    </TamilSection>
  );
}
