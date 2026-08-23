'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function DreamHouseSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the house silhouette
      gsap.fromTo(
        '.house-path',
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 70%',
          }
        }
      );
      
      // Fade in the text/pages
      gsap.fromTo(
        '.house-pages',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="dream-house"
      title={locale === 'ta' ? 'தமிழை வளர்த்தவர்களை அங்கீகரித்தல்' : 'Recognising the People Who Built Tamil'}
      bgVariant="cream"
      className="text-center"
    >
      <div ref={containerRef} className="max-w-3xl mx-auto pt-8 flex flex-col items-center">
        
        {/* Visual Metaphor: House + Manuscript */}
        <div ref={visualRef} className="relative w-64 h-64 md:w-80 md:h-80 mb-12 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" stroke="var(--color-tamil-gold)" strokeWidth="1.5">
            <path className="house-path" d="M10,55 L50,20 L90,55 M20,46 L20,90 L80,90 L80,46" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          <div className="house-pages absolute inset-0 flex flex-col items-center justify-center pt-8 opacity-0">
            <div className="w-24 h-[2px] bg-[var(--color-tamil-ink)]/20 mb-3" />
            <div className="w-20 h-[2px] bg-[var(--color-tamil-ink)]/20 mb-3" />
            <div className="w-28 h-[2px] bg-[var(--color-tamil-ink)]/20 mb-3" />
            <div className="w-16 h-[2px] bg-[var(--color-tamil-red)]/40" />
          </div>
        </div>

        <h3 className="font-tamil-display text-3xl font-bold mb-6">
          {locale === 'ta' ? 'கனவு இல்லம்' : 'Dream House Scheme'}
        </h3>
        
        <p className="font-tamil-sans text-lg md:text-xl font-light opacity-80 text-balance leading-relaxed">
          {locale === 'ta'
            ? 'தகுதியான சிறந்த தமிழ் எழுத்தாளர்கள் மற்றும் மொழிபெயர்ப்பாளர்களுக்கு நலத்திட்ட உதவியாக குடியிருப்பு அங்கீகாரம் வழங்குதல்.'
            : 'Providing welfare-oriented residential support for eligible distinguished Tamil writers and extending recognition to translators.'}
        </p>

        <div className="mt-8 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[var(--color-tamil-ink)]/40">
          <span>{locale === 'ta' ? 'இலக்கிய பங்களிப்பு' : 'Literary Contribution'}</span>
          <span className="w-8 h-[1px] bg-[var(--color-tamil-ink)]/20" />
          <span>{locale === 'ta' ? 'அங்கீகாரம்' : 'Recognition'}</span>
          <span className="w-8 h-[1px] bg-[var(--color-tamil-ink)]/20" />
          <span>{locale === 'ta' ? 'கண்ணியம்' : 'Dignity'}</span>
        </div>
      </div>
    </TamilSection>
  );
}
