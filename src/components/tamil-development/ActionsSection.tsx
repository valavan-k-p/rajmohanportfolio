'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';
import { TAMIL_DEVELOPMENT_DATA, type BaseContent } from '@/data/tamil-development';

export function ActionsSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.action-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="actions"
      bgVariant="paper"
    >
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 pt-8">
        
        {/* Inherited Column */}
        <div className="flex flex-col">
          <div className="border-b-2 border-[var(--color-tamil-gold)] pb-4 mb-8">
            <h3 className="font-tamil-display text-2xl font-bold opacity-60">
              {locale === 'ta' ? 'துறையின் தொடர்ச்சியான பணிகள்' : 'Departmental Continuity'}
            </h3>
            <p className="text-sm mt-2 opacity-50 uppercase tracking-widest">
              {locale === 'ta' ? 'நடைமுறையிலுள்ள திட்டங்கள்' : 'Existing Programmes'}
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            {TAMIL_DEVELOPMENT_DATA.departmentalContinuity.map((item, i) => (
              <ActionCard key={i} item={item} locale={locale} />
            ))}
          </div>
        </div>

        {/* Tenure Column */}
        <div className="flex flex-col">
          <div className="border-b-2 border-[var(--color-tamil-red)] pb-4 mb-8">
            <h3 className="font-tamil-display text-2xl font-bold">
              {locale === 'ta' ? 'அமைச்சரின் பணிக்காலத்தில்' : 'Rajmohan Tenure Actions'}
            </h3>
            <p className="text-sm mt-2 opacity-50 uppercase tracking-widest text-[var(--color-tamil-red)]">
              {locale === 'ta' ? 'மே 2026 முதல்' : 'Since May 2026'}
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            {TAMIL_DEVELOPMENT_DATA.rajmohanTenureActions.map((item, i) => (
              <ActionCard key={i} item={item} locale={locale} />
            ))}
          </div>
        </div>

      </div>
    </TamilSection>
  );
}

function ActionCard({ item, locale }: { item: Partial<BaseContent>; locale: Locale }) {
  const isTenure = item.status === 'UNDER HIS TENURE' || item.status === 'REPORTED';
  
  const statusTranslations: Record<string, { en: string; ta: string }> = {
    'INHERITED DEPARTMENTAL PROGRAMME': { en: 'INHERITED DEPARTMENTAL PROGRAMME', ta: 'துறையின் மரபுவழித் திட்டம்' },
    'UNDER HIS TENURE': { en: 'UNDER HIS TENURE', ta: 'அவரது பணிக்காலத்தில்' },
    'REPORTED': { en: 'REPORTED', ta: 'அறிவிக்கப்பட்டது' }
  };
  
  const displayStatus = item.status ? (statusTranslations[item.status]?.[locale] || item.status) : '';

  return (
    <div className={`action-card p-5 rounded border ${
      isTenure 
        ? 'bg-white border-[var(--color-tamil-red)]/20 shadow-sm' 
        : 'bg-transparent border-[var(--color-tamil-border)]'
    }`}>
      <h4 className={`font-tamil-sans font-medium text-lg ${isTenure ? 'text-[var(--color-tamil-ink)]' : 'opacity-75'}`}>
        {item.title?.[locale]}
      </h4>
      <div className={`mt-3 inline-block rounded px-2 py-1 text-[0.6rem] font-bold tracking-wider uppercase ${
        isTenure 
          ? 'bg-[var(--color-tamil-red)]/10 text-[var(--color-tamil-red)]'
          : 'bg-black/5 text-black/50'
      }`}>
        {displayStatus}
      </div>
    </div>
  );
}
