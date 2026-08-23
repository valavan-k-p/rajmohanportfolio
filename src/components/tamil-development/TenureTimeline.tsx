'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';
import { TAMIL_DEVELOPMENT_DATA, type TimelineEvent } from '@/data/tamil-development';

export function TenureTimeline({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the central line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: 1,
          }
        }
      );

      // Reveal timeline items
      itemsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: el.classList.contains('timeline-left') ? -20 : 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="timeline"
      title={locale === 'ta' ? '2026 பதவிக்கால காலவரிசை' : '2026 Tenure Timeline'}
      bgVariant="cream"
    >
      <div ref={containerRef} className="relative mt-16 max-w-4xl mx-auto py-8">
        
        {/* Central Vertical Line (Desktop) / Left Line (Mobile) */}
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-neutral-200 origin-top" />
        <div ref={lineRef} className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--color-tamil-gold)] origin-top -translate-x-[0.5px]" />

        <div className="flex flex-col gap-12 md:gap-8">
          {TAMIL_DEVELOPMENT_DATA.tenureTimeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <TimelineEntry 
                key={item.id}
                item={item}
                locale={locale}
                isLeft={isLeft}
                refEl={(el) => { itemsRef.current[index] = el; }}
              />
            );
          })}
        </div>

      </div>
    </TamilSection>
  );
}

function TimelineEntry({ 
  item, 
  locale, 
  isLeft,
  refEl 
}: { 
  item: TimelineEvent; 
  locale: Locale; 
  isLeft: boolean;
  refEl: (el: HTMLDivElement | null) => void;
}) {
  const isPrimary = item.importance === 'primary';
  
  return (
    <div 
      ref={refEl}
      className={`timeline-entry relative flex flex-col md:flex-row w-full pl-12 md:pl-0 ${
        isLeft ? 'timeline-left md:justify-start' : 'timeline-right md:justify-end'
      }`}
    >
      {/* Node Marker */}
      <div className={`absolute left-[-2px] md:left-1/2 top-2 h-4 w-4 rounded-full border-2 border-white bg-[var(--color-tamil-red)] -translate-x-[7px] z-10 ${
        isPrimary ? 'scale-125' : 'scale-100 bg-white border-[var(--color-tamil-red)]'
      }`} />

      {/* Content Box */}
      <div className={`md:w-[45%] flex flex-col ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
        <div className="font-tamil-sans text-sm font-bold text-[var(--color-tamil-red)] mb-1">
          {item.date}
        </div>
        
        <h4 className={`font-tamil-display mb-2 ${isPrimary ? 'text-2xl font-bold' : 'text-xl'}`}>
          {item.title[locale]}
        </h4>
        
        {item.status && (
          <div className={`mt-2 inline-block self-start rounded border px-2 py-1 text-[0.6rem] font-bold tracking-wider uppercase ${
            isLeft ? 'md:self-end' : 'md:self-start'
          } ${
            item.status === 'VERIFIED' 
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : item.status.includes('REPORTED')
              ? 'border-blue-200 bg-blue-50 text-blue-800'
              : 'border-[var(--color-tamil-border)] bg-neutral-50 text-neutral-600'
          }`}>
            {item.status === 'VERIFIED' && locale === 'ta' ? 'சரிபார்க்கப்பட்டது' :
             item.status === 'REPORTED' && locale === 'ta' ? 'அறிவிக்கப்பட்டது' :
             item.status}
          </div>
        )}
      </div>
    </div>
  );
}
