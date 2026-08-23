'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect, EASING, DURATION } from '@/lib/motion';
import { gsap } from 'gsap';
import type { Locale } from '@/lib/i18n/routing';

export function HeroSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASING.expressive } });

      tl.fromTo(
        metadataRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.content, delay: 0.2 }
      )
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.story },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, filter: 'blur(4px)' },
        { opacity: 0.8, filter: 'blur(0px)', duration: DURATION.story },
        '-=0.6'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: DURATION.content },
        '+=0.5'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const content = {
    metadata: locale === 'ta' ? 'தமிழ் வளர்ச்சி · தமிழ்நாடு அரசு' : 'TAMIL DEVELOPMENT · GOVERNMENT OF TAMIL NADU',
    title: locale === 'ta' ? 'தமிழ் வளர்ச்சி' : 'Tamil Development',
    subtitle: locale === 'ta' ? 'பண்டைய பாரம்பரியத்திலிருந்து டிஜிட்டல் தமிழ் எதிர்காலம் வரை.' : 'From classical heritage to the digital Tamil future.'
  };

  return (
    <section 
      ref={containerRef}
      className="relative flex min-h-svh w-full flex-col items-center justify-center bg-[var(--color-tamil-ink)] text-[var(--color-tamil-paper)] px-6 text-center"
    >
      <div className="z-10 flex max-w-4xl flex-col items-center">
        <div 
          ref={metadataRef}
          className="u-eyebrow mb-6 text-[var(--color-tamil-gold)]"
        >
          {content.metadata}
        </div>
        
        <h1 
          ref={titleRef}
          className="font-tamil-display text-5xl md:text-7xl lg:text-[7rem] leading-none tracking-tight mb-8"
        >
          {content.title}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-tamil-sans text-xl md:text-3xl font-light text-balance max-w-2xl text-[var(--color-tamil-gold-soft)]"
        >
          {content.subtitle}
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="absolute bottom-12 flex flex-col items-center gap-4 opacity-0"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-[var(--color-tamil-gold)] to-transparent" />
      </div>
    </section>
  );
}
