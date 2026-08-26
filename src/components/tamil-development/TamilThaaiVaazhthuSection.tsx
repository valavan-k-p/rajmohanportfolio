'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function TamilThaaiVaazhthuSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    // Make sure ScrollTrigger is registered if not already (it usually is by motion.ts, but safe to have)
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Create a master timeline tied to the scroll position of the timeline container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: 1, // Smooth interpolation based on scroll
        }
      });

      // Animate the line growth (desktop and mobile)
      tl.to('.glow-line-desktop', {
        scaleX: 1,
        ease: 'none',
        duration: 1
      }, 0);

      tl.to('.glow-line-mobile', {
        scaleY: 1,
        ease: 'none',
        duration: 1
      }, 0);

      // Animate dots sequentially (0%, 50%, 100% of the line's journey)
      const dots = gsap.utils.toArray('.timeline-dot');
      
      if (dots.length >= 3) {
        // Dot 1 (1970) activates at start (0)
        tl.to(dots[0] as Element, {
          backgroundColor: 'var(--color-tamil-gold)',
          borderColor: 'var(--color-tamil-gold)',
          boxShadow: '0 0 20px rgba(207, 168, 48, 0.6)',
          duration: 0.1,
          ease: 'power2.out'
        }, 0);

        // Dot 2 (2021) activates halfway (0.5)
        tl.to(dots[1] as Element, {
          backgroundColor: 'var(--color-tamil-gold)',
          borderColor: 'var(--color-tamil-gold)',
          boxShadow: '0 0 20px rgba(207, 168, 48, 0.6)',
          duration: 0.1,
          ease: 'power2.out'
        }, 0.5);

        // Dot 3 (2026) activates at end (1.0)
        tl.to(dots[2] as Element, {
          backgroundColor: 'var(--color-tamil-gold)',
          borderColor: 'var(--color-tamil-gold)',
          boxShadow: '0 0 20px rgba(207, 168, 48, 0.6)',
          duration: 0.1,
          ease: 'power2.out'
        }, 1.0);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="tamil-thaai-vaazhthu"
      title={locale === 'ta' ? 'தமிழ்த்தாய் வாழ்த்து' : 'Tamil Thaai Vaazhthu'}
      bgVariant="red"
      className="text-center"
    >
      <div ref={containerRef} className="mx-auto max-w-3xl pt-8">
        <p className="font-sans text-lg md:text-xl font-light opacity-90 mb-16 text-balance">
          {locale === 'ta'
            ? 'அரசு விழாக்கள், கல்வி நிலையங்கள் மற்றும் பொதுத்துறை நிறுவனங்களில் தமிழ்த்தாய் வாழ்த்து பாடுதல் கட்டாயமாக்கப்பட்டுள்ளது.'
            : 'The state invocation song, honored at the commencement of official events, educational institutions, and public sector functions.'}
        </p>

        {/* Timeline */}
        <div className="timeline-container relative flex flex-col gap-12 pl-8 md:pl-0 md:flex-row md:justify-between md:gap-4 mt-12 md:mt-16">
          
          {/* Base lines (Subtle track) */}
          <div className="absolute left-0 top-[28px] bottom-[28px] w-[1px] bg-white/20 md:hidden" />
          <div className="hidden md:block absolute left-[16.66%] right-[16.66%] top-0 h-[1px] bg-white/20" />
          
          {/* Animated Glow Line */}
          {/* Desktop: left-to-right glow */}
          <div className="glow-line-desktop hidden md:block absolute left-[16.66%] right-[16.66%] top-[0px] h-[2px] bg-gradient-to-r from-[var(--color-tamil-gold)] via-[#ffeba3] to-[var(--color-tamil-gold)] shadow-[0_0_15px_rgba(207,168,48,0.8)] origin-left scale-x-0 -translate-y-[0.5px] z-0" />
          
          {/* Mobile: top-to-bottom glow */}
          <div className="glow-line-mobile block md:hidden absolute left-0 top-[28px] bottom-[28px] w-[2px] bg-gradient-to-b from-[var(--color-tamil-gold)] via-[#ffeba3] to-[var(--color-tamil-gold)] shadow-[0_0_15px_rgba(207,168,48,0.8)] origin-top scale-y-0 -translate-x-[0.5px] z-0" />
          
          <TimelineItem 
            year="1970"
            text={locale === 'ta' ? 'மாநில பாடலாக அறிவிக்கப்பட்டது' : 'Adopted as State Song'}
            isLast={false}
          />
          
          <TimelineItem 
            year="2021"
            text={locale === 'ta' ? 'மாநில கீதமாக தரம் உயர்த்தப்பட்டது' : 'Elevated to State Anthem'}
            isLast={false}
          />
          
          <TimelineItem 
            year="2026"
            text={locale === 'ta' ? 'சட்டமன்ற தீர்மானம் (ஆகஸ்ட்)' : 'Assembly Resolution (August)'}
            isLast={true}
            statusLabel={locale === 'ta' ? 'அரசு / சட்டமன்ற நடவடிக்கை' : 'GOVERNMENT / ASSEMBLY ACTION'}
          />

        </div>
      </div>
    </TamilSection>
  );
}

function TimelineItem({ 
  year, 
  text, 
  statusLabel, 
  isLast: _isLast,
}: { 
  year: string; 
  text: string; 
  statusLabel?: string; 
  isLast: boolean;
}) {
  return (
    <div className="relative md:flex-1 md:text-center timeline-node-container pt-1 md:pt-10">
      
      {/* Node (Desktop) */}
      <div className="timeline-dot hidden md:block absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 z-10" />

      {/* Node (Mobile) */}
      <div className="timeline-dot block md:hidden absolute left-0 top-7 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 z-10" />
      
      <div className="font-display text-2xl md:text-3xl font-bold mb-2 relative z-20">
        {year}
      </div>
      <div className="font-sans text-sm md:text-base opacity-90 max-w-[200px] md:mx-auto relative z-20">
        {text}
      </div>
      
      {statusLabel && (
        <div className="mt-3 inline-block rounded border border-white/30 bg-white/10 px-2 py-1 text-[0.65rem] font-bold tracking-wider uppercase relative z-20">
          {statusLabel}
        </div>
      )}
    </div>
  );
}
