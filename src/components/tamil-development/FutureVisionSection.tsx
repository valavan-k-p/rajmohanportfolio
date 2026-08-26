'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function FutureVisionSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Split transition effect
      gsap.fromTo(
        '.now-column',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
      
      gsap.fromTo(
        '.next-column',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
      
      // Divider line wipe
      gsap.fromTo(
        '.split-divider',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="future"
      chapterNumber="11"
      category={locale === 'ta' ? 'எதிர்காலம்' : 'FUTURE'}
      title={locale === 'ta' ? 'அடுத்தது என்ன?' : 'What comes next?'}
      bgVariant="paper"
    >
      <div className="mb-12 inline-block rounded border border-[var(--color-tamil-ink)]/20 px-3 py-1 text-[0.65rem] font-bold tracking-widest uppercase">
        {locale === 'ta' ? 'தலையங்க வழிகாட்டுதல்' : 'EDITORIAL ROADMAP'}
      </div>

      <div ref={containerRef} className="relative mt-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* NOW Area */}
          <div className="now-column flex-1 bg-white/40 p-8 md:p-12 rounded-[2rem] border border-[var(--color-tamil-gold)]/30 shadow-sm relative overflow-hidden backdrop-blur-md">
             {/* Decorative element */}
             <div className="absolute -right-16 -top-16 w-64 h-64 bg-[var(--color-tamil-gold)]/10 rounded-full blur-3xl pointer-events-none" />
             <h3 className="font-tamil-display text-3xl mb-8 flex items-center gap-4 text-[var(--color-tamil-ink)]/70">
               <span className="w-8 h-[2px] bg-[var(--color-tamil-ink)]/30"></span>
               {locale === 'ta' ? 'தற்போது' : 'NOW'}
             </h3>
             <div className="flex flex-wrap gap-3 relative z-10">
               {[
                 locale === 'ta' ? 'ஆட்சி மொழி அமலாக்கம்' : 'Language implementation',
                 locale === 'ta' ? 'இலக்கியம்' : 'Literature',
                 locale === 'ta' ? 'விருதுகள்' : 'Awards',
                 locale === 'ta' ? 'ஆராய்ச்சி நிறுவனங்கள்' : 'Institutions & Research',
                 locale === 'ta' ? 'சொற்குவை' : 'Sorkuvai'
               ].map((item, idx) => (
                 <span key={idx} className="px-5 py-2.5 rounded-full border border-[var(--color-tamil-ink)]/15 text-[var(--color-tamil-ink)]/80 text-sm md:text-base font-medium bg-white/60 hover:bg-white hover:border-[var(--color-tamil-gold)]/50 transition-all cursor-default">
                   {item}
                 </span>
               ))}
             </div>
          </div>

          {/* NEXT Area */}
          <div className="next-column flex-[1.5] bg-[var(--color-tamil-red-deep)] p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group">
            {/* Animated glow */}
            <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-[var(--color-tamil-red)]/40 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150 pointer-events-none" />
            
            <h3 className="font-tamil-display text-4xl mb-10 flex items-center gap-4 text-white">
              <span className="w-12 h-[2px] bg-[var(--color-tamil-gold)]"></span>
              {locale === 'ta' ? 'அடுத்து' : 'NEXT'}
            </h3>
            
            <div className="flex flex-col gap-3 md:gap-5 relative z-10">
              {[
                locale === 'ta' ? 'தமிழ் + AI நிர்வாகம்' : 'Tamil + AI governance',
                locale === 'ta' ? 'டிஜிட்டல் ஆவணகங்கள்' : 'Digital archives',
                locale === 'ta' ? 'உலகத் தமிழ் அறிவுத் தொடர்' : 'Global Tamil knowledge network',
                locale === 'ta' ? 'வளர்ந்து வரும் தொழில்நுட்ப கலைச்சொற்கள்' : 'Emerging technology terminology',
                locale === 'ta' ? 'மொபைல் முதல் தமிழ் பொது வளங்கள்' : 'Mobile-first Tamil public resources'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 group/item cursor-default p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                  <div className="w-12 h-12 shrink-0 rounded-full border border-[var(--color-tamil-gold)]/40 flex items-center justify-center text-[var(--color-tamil-gold)] group-hover/item:bg-[var(--color-tamil-gold)] group-hover/item:text-[var(--color-tamil-red-deep)] transition-all font-bold text-lg">
                    0{idx + 1}
                  </div>
                  <span className="font-tamil-sans text-xl md:text-2xl text-white/80 group-hover/item:text-white transition-colors font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TamilSection>
  );
}
