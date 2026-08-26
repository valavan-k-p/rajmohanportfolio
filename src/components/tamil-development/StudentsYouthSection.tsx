'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function StudentsYouthSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Metaphor: Handwritten letter to digital
      gsap.fromTo(
        '.student-text',
        { filter: 'blur(8px)', scale: 0.95, opacity: 0 },
        {
          filter: 'blur(0px)',
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.student-notebook',
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="youth"
      chapterNumber="08"
      category={locale === 'ta' ? 'இளையோர்' : 'YOUTH'}
      title={locale === 'ta' ? 'அடுத்த தலைமுறை' : 'The Next Generation'}
      bgVariant="red"
    >
      <div ref={containerRef} className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Notebook metaphor */}
        <div className="student-notebook relative aspect-square md:aspect-[4/3] bg-[var(--color-tamil-paper)] text-[var(--color-tamil-ink)] rounded-sm p-8 md:p-12 shadow-2xl flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjIwcHgiPjxsaW5lIHgxPSIwIiB5MT0iMTkiIHgyPSIxMDAlIiB5Mj0iMTkiIHN0cm9rZT0iIzE3MTQxMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] bg-repeat-y" />
          
          <div className="student-text relative z-10 font-tamil-display text-4xl md:text-5xl leading-relaxed font-bold opacity-80">
            {locale === 'ta' 
              ? 'எங்கள் குரல்'
              : 'Our Voice'}
          </div>
          <div className="student-text relative z-10 mt-6 font-tamil-sans text-xl opacity-60">
            {locale === 'ta' ? 'வருங்காலத் தமிழ்' : 'Tamil of tomorrow'}
          </div>
        </div>

        {/* Activities List */}
        <div className="flex flex-col justify-center gap-8">
          <p className="font-tamil-sans text-xl opacity-90 leading-relaxed text-balance">
            {locale === 'ta'
              ? 'பள்ளி மற்றும் கல்லூரி மாணவர்களிடையே தமிழை ஊக்கப்படுத்த பேச்சுப் போட்டிகள், கட்டுரைப் போட்டிகள் மற்றும் இலக்கியப் பட்டறைகள்.'
              : 'Encouraging Tamil among school and college students through speech competitions, essay writing, and literary workshops.'}
          </p>
          
          <ul className="space-y-4">
            <ActivityItem text={locale === 'ta' ? 'இளைய அகராதியாளர் திட்டம்' : 'Young Lexicographer Programme'} />
            <ActivityItem text={locale === 'ta' ? 'படைப்பிலக்கிய பயிற்சி' : 'Creative Writing Workshops'} />
            <ActivityItem text={locale === 'ta' ? 'திருக்குறள் முற்றோதல்' : 'Thirukkural Activities'} />
            <ActivityItem text={locale === 'ta' ? 'மாணவர் இலக்கிய மன்றங்கள்' : 'Student Forums'} />
          </ul>
        </div>

      </div>
    </TamilSection>
  );
}

function ActivityItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-4 border-b border-white/20 pb-4">
      <div className="h-2 w-2 rounded-full bg-[var(--color-tamil-gold)]" />
      <span className="font-tamil-sans text-lg">{text}</span>
    </li>
  );
}
