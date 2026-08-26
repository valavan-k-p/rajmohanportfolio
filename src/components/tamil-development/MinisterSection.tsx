'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function MinisterSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Cinematic slow scale for the portrait
      gsap.fromTo(
        '.minister-portrait',
        { scale: 1.05, opacity: 0, filter: 'grayscale(100%) blur(10px)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'grayscale(0%) blur(0px)',
          duration: 1.5,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 75%',
          }
        }
      );

      // 1. Existing fade-in motion for the text blocks (Not scrubbed)
      gsap.fromTo(
        '.evolution-step',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.3,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.evolution-container',
            start: 'top 80%',
          }
        }
      );

      // 2. New scroll-driven glowing connection animation (Scrubbed)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.evolution-container',
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: 1,
        }
      });

      // Line growth
      tl.to('.evolution-glow-line', {
        scaleY: 1,
        ease: 'none',
        duration: 1
      }, 0);

      // Sequential dot activation
      const evoDots = gsap.utils.toArray('.evolution-dot');
      if (evoDots.length >= 3) {
        tl.to(evoDots[0] as Element, {
          backgroundColor: 'var(--color-tamil-red)',
          borderColor: 'var(--color-tamil-red)',
          boxShadow: '0 0 15px rgba(158, 27, 17, 0.6)',
          duration: 0.1,
          ease: 'power2.out'
        }, 0);

        tl.to(evoDots[1] as Element, {
          backgroundColor: 'var(--color-tamil-red)',
          borderColor: 'var(--color-tamil-red)',
          boxShadow: '0 0 15px rgba(158, 27, 17, 0.6)',
          duration: 0.1,
          ease: 'power2.out'
        }, 0.5);

        tl.to(evoDots[2] as Element, {
          backgroundColor: 'var(--color-tamil-red)',
          borderColor: 'var(--color-tamil-red)',
          boxShadow: '0 0 15px rgba(158, 27, 17, 0.6)',
          duration: 0.1,
          ease: 'power2.out'
        }, 1.0);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="minister"
      chapterNumber="05"
      title={locale === 'ta' ? 'துறைக்குப் பின்னால் உள்ள அமைச்சர்' : 'The Minister Behind the Portfolio'}
      bgVariant="paper"
    >
      <div ref={containerRef} className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Restrained Portrait */}
        <div ref={visualRef} className="lg:col-span-5 relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-sm bg-neutral-200 group">
          <div className="minister-portrait absolute inset-0 bg-[url('/images/tamil-development/port.png')] bg-cover bg-[50%_15%] opacity-0 transition-transform duration-700 ease-out group-hover:scale-105" />
          
          {/* Enhanced gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 text-white font-sans z-10">
            <div className="text-xl md:text-2xl font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {locale === 'ta' ? 'ராஜ்மோகன் ஆறுமுகம்' : 'Rajmohan Arumugam'}
            </div>
            <div className="text-sm opacity-90 uppercase tracking-widest mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {locale === 'ta' ? 'தமிழ் வளர்ச்சித் துறை அமைச்சர்' : 'Minister for Tamil Development'}
            </div>
          </div>
        </div>

        {/* Narrative / Evolution */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="font-sans text-xl leading-relaxed opacity-90 mb-12 text-pretty">
            {locale === 'ta' 
              ? 'பாரம்பரிய தமிழ் மேடைப் பேச்சிலிருந்து டிஜிட்டல் முதல் பொதுத் தொடர்புக்கான மாற்றம். இளைஞர்கள், ஊடகம் மற்றும் பொதுச் சேவையில் பின்னணி கொண்டவர்.'
              : 'A background rooted in traditional Tamil oratory, transitioning toward digital-first public communication. Connecting classical language with youth, media, and technology.'}
          </p>

          <div className="evolution-container relative border-l border-[var(--color-tamil-gold)]/30 pl-8 space-y-12">
            
            {/* Animated Glow Line overlapping the border exactly */}
            <div className="evolution-glow-line absolute -left-[1.5px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-tamil-red)] via-[var(--color-tamil-gold)] to-[var(--color-tamil-red)] shadow-[0_0_15px_rgba(207,168,48,0.8)] origin-top z-0" style={{ transform: 'scaleY(0)' }} />
            
            <EvolutionStep 
              label={locale === 'ta' ? 'பாரம்பரியம்' : 'TRADITION'}
              title={locale === 'ta' ? 'தமிழ் மேடைப் பேச்சு' : 'Tamil Oratory'}
              desc={locale === 'ta' ? 'மேடைகளிலும் பொது வெளிகளிலும் தமிழ் மொழியின் வீச்சு.' : 'The reach of the Tamil language in public discourse.'}
            />
            
            <EvolutionStep 
              label={locale === 'ta' ? 'மாற்றம்' : 'TRANSITION'}
              title={locale === 'ta' ? 'டிஜிட்டல் ஊடகம்' : 'Digital Media'}
              desc={locale === 'ta' ? 'இளைஞர்களுடன் தொடர்புகொள்ள நவீன தொழில்நுட்பம்.' : 'Modern technology to communicate with youth.'}
            />
            
            <EvolutionStep 
              label={locale === 'ta' ? 'தற்போது' : 'NOW'}
              title={locale === 'ta' ? 'பொதுச் சேவை & மின் தமிழ்' : 'Public Service & Digital Tamil'}
              desc={locale === 'ta' ? 'அரசு நிர்வாகத்தில் தமிழை முன்னெடுத்தல்.' : 'Advancing Tamil in government administration.'}
            />

          </div>
        </div>

      </div>
    </TamilSection>
  );
}

function EvolutionStep({ label, title, desc }: { label: string; title: string; desc: string }) {
  return (
    <div className="evolution-step relative">
      {/* Restored exact original placement of the node */}
      <div className="evolution-dot absolute -left-[37px] top-1 h-2 w-2 rounded-full bg-[var(--color-tamil-red)]/30 z-10" />
      
      <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[var(--color-tamil-gold)] mb-1 relative z-20">
        {label}
      </div>
      <div className="font-display text-2xl font-bold mb-2 relative z-20">
        {title}
      </div>
      <div className="font-sans text-base opacity-75 relative z-20">
        {desc}
      </div>
    </div>
  );
}
