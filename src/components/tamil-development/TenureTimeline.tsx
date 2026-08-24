'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';
import { TAMIL_DEVELOPMENT_DATA, type TimelineEvent } from '@/data/tamil-development';

export function TenureTimeline({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the central spine
      gsap.fromTo('.timeline-spine-active',
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

      // Animate each entry when scrolled into view
      const entries = gsap.utils.toArray('.timeline-entry') as HTMLElement[];
      entries.forEach((entry, i) => {
        const node = entry.querySelector('.timeline-node');
        const nodeRing = entry.querySelector('.timeline-node-ring');
        const card = entry.querySelector('.timeline-card');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: 'top 75%',
          }
        });

        // 1. Activate Node (Always Red)
        tl.fromTo(node, 
          { scale: 0.8, backgroundColor: 'var(--color-tamil-red)', opacity: 0.8 }, 
          { scale: 1.2, backgroundColor: 'var(--color-tamil-red)', opacity: 1, duration: 0.3, ease: 'back.out(2)' }
        )
        // 2. Pulse Ring
        .fromTo(nodeRing,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
          "-=0.1"
        )
        // 3. Card enters
        .fromTo(card,
          { opacity: 0, x: entry.classList.contains('entry-left') ? -30 : 30 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
          "-=0.4"
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
      <div ref={containerRef} className="relative mt-12 md:mt-20 max-w-5xl mx-auto py-12">
        
        {/* Central Vertical Spine (Background) */}
        <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-black/5 origin-top -translate-x-[1px]" />
        
        {/* Central Vertical Spine (Active) */}
        <div className="timeline-spine-active absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-tamil-gold)] to-[var(--color-tamil-red)] origin-top -translate-x-[1px]" />

        <div className="flex flex-col gap-12 md:gap-24 relative z-10">
          {TAMIL_DEVELOPMENT_DATA.tenureTimeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <TimelineEntry 
                key={item.id}
                item={item}
                locale={locale}
                isLeft={isLeft}
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
  isLeft 
}: { 
  item: TimelineEvent; 
  locale: Locale; 
  isLeft: boolean;
}) {
  return (
    <div className={`timeline-entry relative flex flex-col md:flex-row w-full pl-16 md:pl-0 ${isLeft ? 'entry-left md:justify-start' : 'entry-right md:justify-end'}`}>
      
      {/* Central Red Node (Always Red as requested) */}
      <div className="absolute left-[24px] md:left-1/2 top-6 w-4 h-4 rounded-full bg-[var(--color-tamil-red)] -translate-x-1/2 timeline-node z-20 flex items-center justify-center shadow-md">
         <div className="absolute inset-[-6px] rounded-full border border-[var(--color-tamil-gold)]/80 timeline-node-ring" />
      </div>

      {/* Editorial Card */}
      <div className={`w-full md:w-[45%] flex flex-col timeline-card ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
        <div className={`bg-white border border-[var(--color-tamil-gold)]/20 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-[var(--color-tamil-gold)]/40 transition-all duration-300 relative ${isLeft ? 'md:rounded-tr-sm' : 'md:rounded-tl-sm'}`}>
          
          <div className={`flex flex-col md:flex-row gap-2 md:gap-4 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'} items-start md:items-center`}>
            <span className="font-tamil-sans text-sm font-bold text-[var(--color-tamil-red)] tracking-widest uppercase">
              {item.date}
            </span>
            {item.status && (
              <span className={`inline-block px-2 py-0.5 text-[0.65rem] font-bold tracking-wider uppercase rounded-full ${
                item.status === 'VERIFIED' 
                  ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
                  : item.status.includes('REPORTED')
                  ? 'border border-blue-200 bg-blue-50 text-blue-800'
                  : 'border border-[var(--color-tamil-border)] bg-neutral-50 text-neutral-600'
              }`}>
                {item.status === 'VERIFIED' && locale === 'ta' ? 'சரிபார்க்கப்பட்டது' :
                 item.status === 'REPORTED' && locale === 'ta' ? 'அறிவிக்கப்பட்டது' :
                 item.status}
              </span>
            )}
          </div>
          
          <h4 className="font-tamil-display text-2xl md:text-3xl font-bold text-[var(--color-tamil-ink)] leading-tight mb-2 text-balance">
            {item.title[locale]}
          </h4>
          
          {item.description && (
            <p className="font-tamil-sans text-sm md:text-base text-[var(--color-tamil-ink)]/70 leading-relaxed text-pretty mt-4">
              {item.description[locale]}
            </p>
          )}
          
        </div>
      </div>

    </div>
  );
}
