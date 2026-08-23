'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

const DATA = {
  wordsUploaded: { value: 1533669, formatted: '15,33,669' },
  technicalWords: { value: 51622, formatted: '51,622' },
  students: { value: 200, formatted: '200' },
};

export function SorkuvaiDataViz({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create a dummy object to tween its property
      const counter = { val: 0 };
      
      gsap.to(counter, {
        val: DATA.wordsUploaded.value,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true, // Only count up once
        },
        onUpdate: () => {
          if (countRef.current) {
            // Format to Indian numbering system roughly matching the string format
            countRef.current.innerText = Math.ceil(counter.val).toLocaleString('en-IN');
          }
        },
      });

      // Words scattering effect
      gsap.fromTo(
        '.floating-word',
        { opacity: 0, scale: 0.5, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'back.out(1.5)',
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
      id="sorkuvai"
      chapterNumber="04"
      category={locale === 'ta' ? 'மின் தமிழ்' : 'DIGITAL TAMIL'}
      title={locale === 'ta' ? 'சொற்குவை' : 'Sorkuvai'}
      bgVariant="charcoal"
      className="relative"
    >
      <div ref={containerRef} className="mt-12 flex flex-col items-center">
        
        {/* Massive counting number */}
        <div className="mb-4 text-center">
          <div className="font-tamil-display text-6xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter text-[var(--color-tamil-gold)] leading-none">
            <span ref={countRef}>0</span>
          </div>
          <div className="mt-4 flex flex-col items-center gap-1">
            <span className="font-tamil-sans text-xl md:text-2xl opacity-90">
              {locale === 'ta' ? 'பதியப்பட்ட தமிழ்ச் சொற்கள்' : 'Tamil words uploaded'}
            </span>
            <span className="text-xs uppercase tracking-widest opacity-50 border-b border-white/10 pb-1">
              {locale === 'ta' ? 'மார்ச் 2025 வரை' : 'up to March 2025'}
            </span>
          </div>
        </div>

        {/* Abstract word network visualization */}
        <div className="relative w-full max-w-4xl h-[300px] my-12 flex items-center justify-center overflow-hidden border border-white/5 rounded-3xl bg-black/20">
          <FloatingWord text={locale === 'ta' ? 'மருத்துவம்' : 'Medicine'} className="top-[20%] left-[20%]" delay="0" />
          <FloatingWord text={locale === 'ta' ? 'பொறியியல்' : 'Engineering'} className="top-[60%] left-[15%]" delay="1" />
          <FloatingWord text={locale === 'ta' ? 'சட்டம்' : 'Law'} className="top-[30%] right-[25%]" delay="2" />
          <FloatingWord text={locale === 'ta' ? 'அறிவியல்' : 'Science'} className="top-[70%] right-[20%]" delay="3" />
          <FloatingWord text={locale === 'ta' ? 'செயற்கை நுண்ணறிவு' : 'AI'} className="top-[45%] left-[45%] text-[var(--color-tamil-red)] border-[var(--color-tamil-red)]/30 scale-110" delay="4" />
          <FloatingWord text={locale === 'ta' ? 'தொழில்நுட்பம்' : 'Technology'} className="top-[15%] left-[55%]" delay="5" />
          <FloatingWord text={locale === 'ta' ? 'நிர்வாகம்' : 'Administration'} className="top-[80%] left-[40%]" delay="6" />
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-tamil-ink)_80%)] pointer-events-none" />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full max-w-3xl mt-8 border-t border-white/10 pt-12">
          <div className="text-center md:text-left">
            <div className="font-tamil-display text-4xl md:text-5xl font-bold mb-2 text-white">
              {DATA.technicalWords.formatted}
            </div>
            <div className="font-tamil-sans text-lg opacity-80">
              {locale === 'ta' ? 'உருவாக்கப்பட்ட கலைச்சொற்கள்' : 'technical words coined'}
            </div>
            <div className="text-xs uppercase tracking-wider opacity-40 mt-1">
              {locale === 'ta' ? '178 வல்லுநர் கூட்டங்கள் மூலம்' : 'through 178 expert meetings'}
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <div className="font-tamil-display text-4xl md:text-5xl font-bold mb-2 text-white">
              {DATA.students.formatted}
            </div>
            <div className="font-tamil-sans text-lg opacity-80">
              {locale === 'ta' ? 'ஆண்டுதோறும் தேர்ந்தெடுக்கப்படும் மாணவர்கள்' : 'students selected annually'}
            </div>
            <div className="text-xs uppercase tracking-wider opacity-40 mt-1">
              {locale === 'ta' ? 'இளைய அகராதியாளர் திட்டம்' : 'Young Lexicographer programme'}
            </div>
          </div>
        </div>

      </div>
    </TamilSection>
  );
}

function FloatingWord({ text, className, delay }: { text: string; className: string; delay: string }) {
  return (
    <div 
      className={`floating-word absolute border border-white/20 rounded-full px-4 py-2 text-sm font-medium bg-white/5 backdrop-blur-sm ${className}`}
      style={{ '--delay': delay } as React.CSSProperties}
    >
      {text}
    </div>
  );
}
