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

      <div ref={containerRef} className="relative grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Desktop Divider */}
        <div className="split-divider hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--color-tamil-ink)]/10 origin-top -translate-x-1/2" />

        {/* NOW */}
        <div className="now-column flex flex-col">
          <h3 className="font-tamil-display text-4xl mb-8 opacity-40">{locale === 'ta' ? 'தற்போது' : 'NOW'}</h3>
          <ul className="space-y-6">
            <ListItem text={locale === 'ta' ? 'ஆட்சி மொழி அமலாக்கம்' : 'Language implementation'} />
            <ListItem text={locale === 'ta' ? 'இலக்கியம்' : 'Literature'} />
            <ListItem text={locale === 'ta' ? 'விருதுகள்' : 'Awards'} />
            <ListItem text={locale === 'ta' ? 'ஆராய்ச்சி நிறுவனங்கள்' : 'Institutions & Research'} />
            <ListItem text={locale === 'ta' ? 'சொற்குவை' : 'Sorkuvai'} />
          </ul>
        </div>

        {/* NEXT */}
        <div className="next-column flex flex-col">
          <h3 className="font-tamil-display text-4xl mb-8 text-[var(--color-tamil-red)]">{locale === 'ta' ? 'அடுத்து' : 'NEXT'}</h3>
          <ul className="space-y-6">
            <ListItem text={locale === 'ta' ? 'தமிழ் + AI நிர்வாகம்' : 'Tamil + AI governance'} isHighlight />
            <ListItem text={locale === 'ta' ? 'டிஜிட்டல் ஆவணகங்கள்' : 'Digital archives'} isHighlight />
            <ListItem text={locale === 'ta' ? 'உலகத் தமிழ் அறிவுத் தொடர்' : 'Global Tamil knowledge network'} isHighlight />
            <ListItem text={locale === 'ta' ? 'வளர்ந்து வரும் தொழில்நுட்ப கலைச்சொற்கள்' : 'Emerging technology terminology'} isHighlight />
            <ListItem text={locale === 'ta' ? 'மொபைல் முதல் தமிழ் பொது வளங்கள்' : 'Mobile-first Tamil public resources'} isHighlight />
          </ul>
        </div>

      </div>
    </TamilSection>
  );
}

function ListItem({ text, isHighlight }: { text: string; isHighlight?: boolean }) {
  return (
    <li className={`font-tamil-sans text-xl md:text-2xl font-light ${isHighlight ? 'text-[var(--color-tamil-ink)] font-normal' : 'opacity-60'}`}>
      {text}
    </li>
  );
}
