'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function ResearchSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.institution-card',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="research"
      chapterNumber="09"
      category={locale === 'ta' ? 'ஆராய்ச்சி நிறுவனங்கள்' : 'RESEARCH INSTITUTIONS'}
      title={locale === 'ta' ? 'ஆய்வின் அடித்தளம்' : 'The Foundation of Study'}
      bgVariant="cream"
    >
      <div ref={containerRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <InstitutionCard 
          title={locale === 'ta' ? 'உலகத் தமிழாராய்ச்சி நிறுவனம்' : 'International Institute of Tamil Studies'}
          tags={locale === 'ta' ? ['சுவடிகள்', 'ஆராய்ச்சி', 'திருக்குறள்', 'நூலகம்'] : ['Manuscripts', 'Research', 'Thirukkural', 'Library']}
          imageColor="bg-[#D9C4A9]"
          locale={locale}
        />

        <InstitutionCard 
          title={locale === 'ta' ? 'தமிழ்ப் பல்கலைக்கழகம், தஞ்சாவூர்' : 'Tamil University, Thanjavur'}
          tags={locale === 'ta' ? ['கல்வெட்டுகள்', 'ஒப்பிலக்கணம்', 'நாட்டுப்புறவியல்', 'கவின் கலைகள்'] : ['Inscriptions', 'Comparative Study', 'Folklore', 'Fine Arts']}
          imageColor="bg-[#A68F74]"
          locale={locale}
        />

      </div>
    </TamilSection>
  );
}

function InstitutionCard({ title, tags, imageColor, locale }: { title: string; tags: string[]; imageColor: string; locale: Locale }) {
  return (
    <div className="institution-card flex flex-col bg-white border border-[var(--color-tamil-ink)]/10 shadow-lg rounded-sm overflow-hidden group">
      <div className={`w-full aspect-[16/9] ${imageColor} relative overflow-hidden flex items-center justify-center p-6`}>
        {/* Subtle decorative motif replacing an image */}
        <div className="w-full h-full border border-[var(--color-tamil-ink)]/10 flex items-center justify-center transition-transform duration-1000 group-hover:scale-105">
          <div className="font-tamil-display text-4xl opacity-20 text-[var(--color-tamil-ink)] font-bold tracking-widest uppercase">
            {locale === 'ta' ? 'ஆவணகம்' : 'ARCHIVE'}
          </div>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h4 className="font-tamil-display text-2xl font-bold mb-6">{title}</h4>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-bold uppercase tracking-widest text-[var(--color-tamil-ink)]/60 bg-[var(--color-tamil-ink)]/5 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
