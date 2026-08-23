'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

export function GlobalTamilMap({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Golden lines radiating from Tamil Nadu
      gsap.fromTo(
        '.connection-line',
        { strokeDasharray: 200, strokeDashoffset: 200 },
        {
          strokeDashoffset: 0,
          stagger: 0.1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 70%',
          }
        }
      );
      
      gsap.fromTo(
        '.node-dot',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          delay: 1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <TamilSection
      id="global"
      chapterNumber="10"
      category={locale === 'ta' ? 'உலகத் தமிழ்' : 'GLOBAL TAMIL'}
      title={locale === 'ta' ? 'தமிழுக்கு எல்லைகள் இல்லை' : 'Tamil Has No Borders'}
      bgVariant="dark"
      className="text-center"
    >
      <div ref={containerRef} className="mt-8 flex flex-col items-center">
        
        {/* Conceptual Map Visualization */}
        <div className="relative w-full max-w-4xl aspect-[2/1] md:aspect-[3/1] my-12 border-y border-[var(--color-tamil-gold)]/20 py-8 flex items-center justify-center overflow-hidden">
          <svg ref={mapRef} className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
            <g stroke="var(--color-tamil-gold)" strokeWidth="1" fill="none" opacity="0.4">
              {/* Radiating lines from TN (approx center-bottom) */}
              <path className="connection-line" d="M500,350 Q600,200 800,100" />
              <path className="connection-line" d="M500,350 Q550,250 700,250" />
              <path className="connection-line" d="M500,350 Q400,150 200,100" />
              <path className="connection-line" d="M500,350 Q300,250 100,200" />
              <path className="connection-line" d="M500,350 Q600,50 900,150" />
              <path className="connection-line" d="M500,350 Q500,100 500,50" />
            </g>
            
            <g fill="var(--color-tamil-gold)">
              {/* TN Origin */}
              <circle cx="500" cy="350" r="6" fill="var(--color-tamil-red)" />
              <circle cx="500" cy="350" r="12" fill="var(--color-tamil-red)" opacity="0.4" className="animate-ping" />
              
              {/* Nodes */}
              <circle className="node-dot" cx="800" cy="100" r="4" />
              <circle className="node-dot" cx="700" cy="250" r="4" />
              <circle className="node-dot" cx="200" cy="100" r="4" />
              <circle className="node-dot" cx="100" cy="200" r="4" />
              <circle className="node-dot" cx="900" cy="150" r="4" />
              <circle className="node-dot" cx="500" cy="50" r="4" />
            </g>
          </svg>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-tamil-red-deep)] to-transparent pointer-events-none" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-4">
          <Stat text={locale === 'ta' ? 'உலகத் தமிழ்ச் சங்கம்' : 'World Tamil Sangam'} />
          <Stat text={locale === 'ta' ? 'புலம்பெயர் அறிஞர்கள்' : 'Diaspora Scholars'} />
          <Stat text={locale === 'ta' ? 'மாநாடுகள்' : 'Conferences'} />
          <div className="flex flex-col items-center">
            <span className="font-tamil-sans font-medium text-white text-lg">{locale === 'ta' ? 'உலகத் தமிழ் மாநாடு' : 'World Tamil Conference'}</span>
            <span className="text-[0.6rem] bg-white/10 px-2 py-0.5 rounded mt-1 font-bold tracking-widest text-[var(--color-tamil-gold)]">{locale === 'ta' ? 'முன்மொழியப்பட்டது / அறிக்கப்பட்டது' : 'PROPOSED / REPORTED'}</span>
          </div>
        </div>
      </div>
    </TamilSection>
  );
}

function Stat({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <span className="font-tamil-sans font-medium text-white text-lg">{text}</span>
    </div>
  );
}
