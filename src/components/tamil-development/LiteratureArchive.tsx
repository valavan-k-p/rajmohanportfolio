'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function LiteratureArchive({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.book-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.book-grid',
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="literature"
      chapterNumber="07"
      category={locale === 'ta' ? 'இலக்கியம்' : 'LITERATURE'}
      title={locale === 'ta' ? 'படைப்புகளைப் பாதுகாத்தல்' : 'Preserving the Works'}
      bgVariant="paper"
    >
      <div ref={containerRef} className="mt-8">
        
        {/* Abstract Book/Archive Grid */}
        <div className="book-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 my-16">
          <BookItem name={locale === 'ta' ? 'அறிஞர் பெயர்' : 'Scholar Name'} year="2024-25" status={locale === 'ta' ? 'நாட்டுடைமை' : 'Nationalised'} index={0} />
          <BookItem name={locale === 'ta' ? 'அறிஞர் பெயர்' : 'Scholar Name'} year="2024-25" status={locale === 'ta' ? 'நாட்டுடைமை' : 'Nationalised'} index={1} />
          <BookItem name={locale === 'ta' ? 'அறிஞர் பெயர்' : 'Scholar Name'} year="2024-25" status={locale === 'ta' ? 'நாட்டுடைமை' : 'Nationalised'} index={2} />
          <div className="book-item relative aspect-[3/4] bg-[var(--color-tamil-gold-soft)]/20 border-2 border-dashed border-[var(--color-tamil-gold)]/40 flex items-center justify-center p-4 text-center">
            <span className="text-sm font-medium opacity-60">
              {locale === 'ta' ? '+6 அறிஞர்கள் 2024-25 இல்' : '+6 scholars in 2024-25'}
            </span>
          </div>
        </div>

        {/* Info Strip */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center border-y border-[var(--color-tamil-ink)]/10 py-8">
          <div className="text-center md:text-left">
            <div className="font-display text-4xl font-bold mb-1">189</div>
            <div className="text-sm uppercase tracking-widest opacity-60">
              {locale === 'ta' ? 'நாட்டுடைமையாக்கப்பட்ட அறிஞர்கள்' : 'Scholars Nationalised'}
            </div>
            <div className="text-[0.6rem] uppercase tracking-wider opacity-40 mt-1">
              {locale === 'ta' ? '(கொள்கை விளக்கக் குறிப்பு வரை)' : '(up to policy note baseline)'}
            </div>
          </div>
          
          <div className="w-[1px] h-12 bg-[var(--color-tamil-ink)]/10 hidden md:block" />
          
          <div className="text-center md:text-left">
            <div className="font-display text-4xl font-bold mb-1 text-[var(--color-tamil-red)]">₹91.35 <span className="text-2xl">{locale === 'ta' ? 'லட்சம்' : 'Lakh'}</span></div>
            <div className="text-sm uppercase tracking-widest opacity-60">
              {locale === 'ta' ? 'வழங்கப்பட்ட ராயல்டி' : 'Royalty Disbursed'}
            </div>
            <div className="text-[0.6rem] uppercase tracking-wider opacity-40 mt-1">
              {locale === 'ta' ? '(2024-25 நிதியாண்டில்)' : '(during 2024-25)'}
            </div>
          </div>
        </div>

      </div>
    </TamilSection>
  );
}

function BookItem({ name, year, status, index }: { name: string; year: string; status: string; index: number }) {
  // Varying heights and offsets for an organic archival look
  const mt = index % 2 !== 0 ? 'md:mt-8' : '';
  const height = index === 1 ? 'aspect-[3/4.5]' : 'aspect-[3/4]';
  
  return (
    <div className={`book-item relative ${height} ${mt} bg-[var(--color-tamil-white)] shadow-md border-l-8 border-[var(--color-tamil-red)] p-4 flex flex-col justify-end transition-transform hover:-translate-y-2`}>
      <div className="absolute top-4 right-4 opacity-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5C5.12 2 4 3.12 4 4.5v15ZM6.5 19C6.22 19 6 18.78 6 18.5S6.22 18 6.5 18H20v1H6.5Z"/>
        </svg>
      </div>
      <div className="text-[0.65rem] uppercase tracking-widest opacity-50 mb-1">{year}</div>
      <div className="font-display font-bold leading-tight mb-2 opacity-80">{name}</div>
      <div className="inline-block bg-black/5 rounded px-2 py-0.5 text-[0.6rem] uppercase tracking-widest w-max opacity-60">
        {status}
      </div>
    </div>
  );
}
