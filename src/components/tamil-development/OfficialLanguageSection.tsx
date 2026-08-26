'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect, EASING } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function OfficialLanguageSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate archival document to digital interface transition
      gsap.fromTo(
        '.archival-layer',
        { opacity: 1, filter: 'sepia(0.8) blur(0px)' },
        {
          opacity: 0,
          filter: 'sepia(0) blur(4px)',
          ease: 'none',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(
        '.digital-layer',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: EASING.expressive,
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'center 70%',
            end: 'bottom 40%',
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="official-language"
      chapterNumber="03"
      category={locale === 'ta' ? 'அரசு நிர்வாகம்' : 'ADMINISTRATION'}
      title={locale === 'ta' ? 'ஆட்சி மொழியாக தமிழ்' : 'Tamil as an Official Language'}
      description={
        locale === 'ta' 
          ? 'தமிழ்நாடு ஆட்சி மொழி சட்டம், 1956 அடிப்படையில் நிர்வாகத்தில் தமிழ். அரசு அலுவலக ஆய்வுகள், ஊழியர் விழிப்புணர்வு, மற்றும் நிர்வாக கலைச்சொற்கள்.' 
          : 'Rooted in the Tamil Nadu Official Language Act, 1956. Driving implementation through government office inspections, employee training, and administrative terminology.'
      }
      bgVariant="cream"
    >
      <div ref={containerRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Visual Storytelling block */}
        <div 
          ref={visualRef} 
          className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-2xl"
        >
          {/* Past: Archival layer */}
          <div className="archival-layer absolute inset-0 flex flex-col p-8 bg-[#Ece5d3] text-neutral-800 font-serif border-[12px] border-white/40">
            <div className="w-16 h-16 rounded-full border-2 border-neutral-800/20 mb-8 self-center" />
            <div className="space-y-4 opacity-50">
              <div className="h-4 w-3/4 bg-neutral-800/30 rounded" />
              <div className="h-4 w-full bg-neutral-800/20 rounded" />
              <div className="h-4 w-5/6 bg-neutral-800/20 rounded" />
              <div className="h-4 w-2/3 bg-neutral-800/20 rounded" />
            </div>
            <div className="mt-auto pt-8 border-t border-neutral-800/20 font-bold tracking-widest text-sm text-center">1956</div>
          </div>

          {/* Present/Future: Digital layer */}
          <div className="digital-layer absolute inset-0 flex flex-col p-6 bg-white text-slate-900 shadow-inner">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4 mb-6">
              <div className="w-10 h-10 rounded bg-[var(--color-tamil-red)]" />
              <div className="h-4 w-32 bg-slate-200 rounded" />
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 items-center p-3 rounded bg-slate-50">
                <div className="w-8 h-8 rounded-full bg-sand-200" />
                <div className="h-3 w-48 bg-slate-300 rounded" />
              </div>
              <div className="flex gap-4 items-center p-3 rounded bg-slate-50">
                <div className="w-8 h-8 rounded-full bg-sand-200" />
                <div className="h-3 w-40 bg-slate-300 rounded" />
              </div>
            </div>
            <div className="mt-auto font-mono text-xs text-slate-400 bg-slate-50 p-2 rounded">
              {locale === 'ta' ? 'நிலை: செயல்படுத்தல் சரிபார்க்கப்பட்டது' : 'Status: Implementation Verified'}
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="flex flex-col gap-8">
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
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-l-2 border-[var(--color-tamil-red)] pl-6">
      <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
      <p className="opacity-75">{text}</p>
    </div>
  );
}
