'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function TamilThaaiVaazhthuSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            }
          }
        );
      });
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
        <p className="text-lg md:text-xl font-light opacity-90 mb-16 text-balance">
          {locale === 'ta'
            ? 'அரசு விழாக்கள், கல்வி நிலையங்கள் மற்றும் பொதுத்துறை நிறுவனங்களில் தமிழ்த்தாய் வாழ்த்து பாடுதல் கட்டாயமாக்கப்பட்டுள்ளது.'
            : 'The state invocation song, honored at the commencement of official events, educational institutions, and public sector functions.'}
        </p>

        {/* Timeline */}
        <div className="relative flex flex-col gap-12 border-l border-white/20 pl-8 text-left md:items-center md:border-l-0 md:pl-0 md:flex-row md:justify-between md:gap-4 md:border-t md:pt-8">
          
          <TimelineItem 
            refEl={(el) => { itemsRef.current[0] = el; }}
            year="1970"
            text={locale === 'ta' ? 'மாநில பாடலாக அறிவிக்கப்பட்டது' : 'Adopted as State Song'}
            isLast={false}
          />
          
          <TimelineItem 
            refEl={(el) => { itemsRef.current[1] = el; }}
            year="2021"
            text={locale === 'ta' ? 'மாநில கீதமாக தரம் உயர்த்தப்பட்டது' : 'Elevated to State Anthem'}
            isLast={false}
          />
          
          <TimelineItem 
            refEl={(el) => { itemsRef.current[2] = el; }}
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
  refEl
}: { 
  year: string; 
  text: string; 
  statusLabel?: string; 
  isLast: boolean;
  refEl: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={refEl} className="relative md:flex-1 md:text-center">
      {/* Node */}
      <div className="absolute -left-[37px] top-1 h-3 w-3 rounded-full bg-[var(--color-tamil-gold)] md:static md:mx-auto md:mb-4 md:-mt-[38px] md:h-4 md:w-4" />
      
      <div className="font-display text-2xl md:text-3xl font-bold mb-2">
        {year}
      </div>
      <div className="text-sm md:text-base opacity-90 max-w-[200px] md:mx-auto">
        {text}
      </div>
      
      {statusLabel && (
        <div className="mt-3 inline-block rounded border border-white/30 bg-white/10 px-2 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
          {statusLabel}
        </div>
      )}
    </div>
  );
}
