'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect, EASING, DURATION } from '@/lib/motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function LiteratureArchive({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Books emerging from shelves
      gsap.fromTo(
        '.library-book',
        { opacity: 0, rotationY: -90, x: -50, transformPerspective: 1000 },
        {
          opacity: 1,
          rotationY: 0,
          x: 0,
          stagger: 0.1,
          duration: DURATION.story,
          ease: EASING.cinematic,
          scrollTrigger: {
            trigger: booksRef.current,
            start: 'top 80%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generate 24 decorative fragments for the animation
  const fragments = Array.from({ length: 24 });

  return (
    <section 
      id="books-literature" 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 overflow-hidden bg-[var(--color-tamil-paper)] text-[var(--color-tamil-ink)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <div className="text-[var(--color-tamil-gold)] font-bold tracking-[0.2em] uppercase text-sm mb-4">
            {locale === 'ta' ? 'இலக்கிய மரபு' : 'Literary Memory'}
          </div>
          <h2 className="font-tamil-display text-4xl md:text-5xl lg:text-6xl text-[var(--color-tamil-red-deep)] mb-6 leading-tight">
            {locale === 'ta' ? 'புத்தகங்கள் & படைப்பாளர்கள்' : 'Books, Writers & Literary Memory'}
          </h2>
        </div>

        {/* --- PART 1: NATIONALISATION OF BOOKS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          <div>
            <h3 className="font-tamil-display text-3xl mb-6 border-b border-[var(--color-tamil-ink)]/10 pb-4">
              {locale === 'ta' ? 'நூல்கள் நாட்டுடைமையாக்கம்' : 'Nationalisation of Books'}
            </h3>
            
            <p className="font-tamil-sans text-lg opacity-80 leading-relaxed mb-8">
              {locale === 'ta' 
                ? 'மாநிலத்தின் கொள்கை விளக்கக் குறிப்பு அடிப்படையில், சிறந்த தமிழ் அறிஞர்களின் படைப்புகளை அரசு நாட்டுடைமையாக்குகிறது.'
                : 'Based on the state policy note baseline, the government nationalises the works of distinguished Tamil scholars to preserve them for the public domain.'}
            </p>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="border-l-2 border-[var(--color-tamil-red)] pl-4">
                <div className="font-tamil-display text-5xl font-bold mb-1">189</div>
                <div className="text-xs uppercase tracking-widest opacity-50 mb-2">
                  {locale === 'ta' ? 'வரலாற்று அறிஞர்கள்' : 'Historical Scholars'}
                </div>
                <div className="text-[0.65rem] opacity-40">
                  {locale === 'ta' ? '(கொள்கை விளக்கக் குறிப்பு வரை)' : '(up to policy note baseline)'}
                </div>
              </div>
              <div className="border-l-2 border-[var(--color-tamil-gold)] pl-4">
                <div className="font-tamil-display text-5xl font-bold mb-1">9</div>
                <div className="text-xs uppercase tracking-widest opacity-50 mb-2">
                  {locale === 'ta' ? 'அறிஞர்கள்' : 'Scholars'}
                </div>
                <div className="text-[0.65rem] opacity-40">
                  {locale === 'ta' ? '(2024-25 நிதியாண்டில்)' : '(during 2024-25)'}
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[var(--color-tamil-white)] border border-[var(--color-tamil-ink)]/10 rounded-sm">
              <div className="font-tamil-display text-3xl font-bold text-[var(--color-tamil-red)] mb-1">₹91.35 <span className="text-xl text-[var(--color-tamil-ink)]">{locale === 'ta' ? 'லட்சம்' : 'Lakh'}</span></div>
              <div className="text-xs uppercase tracking-widest opacity-60">
                {locale === 'ta' ? 'வழங்கப்பட்ட ராயல்டி' : 'Royalty Disbursed'}
              </div>
              <div className="text-[0.65rem] opacity-40 mt-1">
                {locale === 'ta' ? '(2024-25 நிதியாண்டில் வரலாற்று அறிஞர்களின் வாரிசுகளுக்கு)' : '(during 2024-25 to heirs of historical figures)'}
              </div>
            </div>
          </div>

          {/* Abstract Library Visual */}
          <div ref={booksRef} className="relative flex items-center justify-center min-h-[400px] perspective-1000">
            <div className="grid grid-cols-3 gap-4 w-full">
              {[
                'kannan_paattu_webpage.png',
                'kuyil.png',
                'manimegalai_nadagam_webpage.png',
                'panchali.png',
                'ponniyin selvan.png',
                'silappathikaram_webpage.png'
              ].map((book, i) => (
                <div key={i} className="library-book aspect-[2/3] bg-gradient-to-br from-[#e0d6c3] to-[#d1c5ae] shadow-lg border-l-4 border-[var(--color-tamil-red-deep)] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />
                  <img 
                    src={`/images/tamil-development/books/${book}`} 
                    alt="Tamil Book Cover" 
                    className="absolute inset-0 w-full h-full object-cover object-center" 
                  />
                  <div className="w-[1px] h-3/4 bg-black/10 absolute left-2 z-10" />
                </div>
              ))}
            </div>
          </div>
        </div>



      </div>
    </section>
  );
}
