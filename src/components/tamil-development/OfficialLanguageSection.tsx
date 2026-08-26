'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function OfficialLanguageSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate underline for the title
      gsap.to('.official-underline', {
        scaleX: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.official-title',
          start: 'top 80%',
        }
      });

      // Animate InfoBlocks from right to left
      gsap.fromTo('.info-block',
        { x: 100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.info-blocks-container',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <TamilSection
        id="official-language"
        chapterNumber="03"
        category={locale === 'ta' ? 'அரசு நிர்வாகம்' : 'ADMINISTRATION'}
        title={
          <span className="relative inline-block official-title pb-2">
            {locale === 'ta' ? 'ஆட்சி மொழியாக தமிழ்' : 'Tamil as an Official Language'}
            <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[var(--color-tamil-gold)] origin-left scale-x-0 official-underline"></span>
          </span>
        }
        description={
          locale === 'ta' 
            ? 'தமிழ்நாடு ஆட்சி மொழி சட்டம், 1956 அடிப்படையில் நிர்வாகத்தில் தமிழ். அரசு அலுவலக ஆய்வுகள், ஊழியர் விழிப்புணர்வு, மற்றும் நிர்வாக கலைச்சொற்கள்.' 
            : 'Rooted in the Tamil Nadu Official Language Act, 1956. Driving implementation through government office inspections, employee training, and administrative terminology.'
        }
        bgVariant="cream"
      >
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image block with hover zoom */}
          <div className="relative aspect-[3/4] md:aspect-[4/5] w-4/5 md:w-3/4 lg:w-2/3 mx-auto overflow-hidden rounded-sm bg-neutral-100 shadow-2xl">
            <img 
              src="/images/tamil-development/kalvettu.png" 
              alt="Official Language Inscription"
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out hover:scale-105"
            />
          </div>

          {/* Content Details */}
          <div className="flex flex-col gap-8 info-blocks-container overflow-hidden p-4 -m-4">
            <InfoBlock 
              title={locale === 'ta' ? 'ஆய்வுகள்' : 'Inspections'}
              text={locale === 'ta' ? 'அரசு அலுவலகங்களில் தமிழ் பயன்பாட்டை உறுதி செய்தல்.' : 'Ensuring the use of Tamil in government offices and boards.'}
            />
            <InfoBlock 
              title={locale === 'ta' ? 'பயிற்சி' : 'Training & Awareness'}
              text={locale === 'ta' ? 'அரசு ஊழியர்களுக்கு ஆட்சி மொழி சட்டப் பயிற்சி.' : 'Equipping employees with administrative terminology and Official Language Act awareness.'}
            />
            <InfoBlock 
              title={locale === 'ta' ? 'மொழிபெயர்ப்பு' : 'Translation'}
              text={locale === 'ta' ? 'சட்டங்கள், விதிகள் மற்றும் அரசு ஆணைகளை மொழிபெயர்த்தல்.' : 'Translating central acts, state rules, and ordinances into accessible Tamil.'}
            />
          </div>
        </div>
      </TamilSection>
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="info-block border-l-2 border-[var(--color-tamil-red)] pl-6">
      <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
      <p className="opacity-75">{text}</p>
    </div>
  );
}
