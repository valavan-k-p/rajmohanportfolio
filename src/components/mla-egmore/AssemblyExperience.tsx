'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { Quote } from 'lucide-react';

export function AssemblyExperience({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Text Reveal
      gsap.fromTo('.assembly-p1',
        { opacity: 0, y: 30, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.assembly-p2',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Decorative Element
      gsap.fromTo('.quote-icon',
        { opacity: 0, scale: 0.5, rotate: -20 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: {
      p1: 'Rajmohan’s legislative experience in 2026 has been defined by his dual responsibilities as both School Education Minister and Minister for Information and Publicity.',
      p2: 'His role in the Assembly has frequently placed him at the centre of major legislative debates concerning democratic transparency, education funding, women’s safety, law and order, cabinet accountability, and federal autonomy.',
    },
    ta: {
      p1: '2026 ஆம் ஆண்டில் ராஜ்மோகனின் சட்டமன்ற அனுபவம், பள்ளிக் கல்வித் துறை அமைச்சர் மற்றும் தகவல் மற்றும் விளம்பரத் துறை அமைச்சர் ஆகிய இரு பொறுப்புகளாலும் வரையறுக்கப்பட்டுள்ளது.',
      p2: 'சட்டமன்றத்தில் அவரது பங்கு ஜனநாயக வெளிப்படைத்தன்மை, கல்வி நிதி, பெண்கள் பாதுகாப்பு, சட்டம் ஒழுங்கு, அமைச்சரவை பொறுப்புக்கூறல் மற்றும் கூட்டாட்சி சுயாட்சி தொடர்பான முக்கிய சட்டமன்ற விவாதங்களின் மையத்தில் அவரை அடிக்கடி நிலைநிறுத்தியுள்ளது.',
    },
  }[locale];

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto py-16 text-center relative px-4">
      
      {/* Decorative Quote Mark */}
      <div className="quote-icon absolute -top-8 left-1/2 -translate-x-1/2 text-sand-300 opacity-20 pointer-events-none">
        <Quote size={120} strokeWidth={1} fill="currentColor" />
      </div>

      <div className="relative z-10 space-y-10">
        <p className="assembly-p1 text-3xl md:text-4xl lg:text-5xl font-display text-charcoal-950 leading-tight md:leading-tight font-medium tracking-tight">
          {content.p1}
        </p>
        
        <div className="assembly-p2 relative">
          <div className="w-16 h-[2px] bg-maroon-700 mx-auto mb-8" />
          <p className="text-lg md:text-xl font-sans text-charcoal-700 max-w-3xl mx-auto leading-relaxed font-light">
            {content.p2}
          </p>
        </div>
      </div>
    </div>
  );
}
