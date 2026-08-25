'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { Locale } from '@/lib/i18n/routing';

export function HeroSection({ locale: _locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.02 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full aspect-[1600/725] min-h-[45vh] md:min-h-[65vh] lg:min-h-[85vh] xl:min-h-[92vh] flex items-center justify-center bg-[var(--color-tamil-ink)] overflow-hidden"
    >
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/tamil-cultural-banner-1600x725.webp"
          alt="Tamil Cultural Heritage — Tamil Development"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}
