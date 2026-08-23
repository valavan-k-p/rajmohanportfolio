'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { TamilSection } from './TamilSection';
import type { Locale } from '@/lib/i18n/routing';

interface EcosystemNode {
  id: string;
  label: Record<string, string>;
}

export function EcosystemNetwork({ locale, data }: { locale: Locale; data: EcosystemNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered scroll reveal for nodes
      nodesRef.current.forEach((node) => {
        if (!node) return;
        
        gsap.fromTo(
          node,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const title = locale === 'ta' ? 'தமிழ் வளர்ச்சி எவ்வாறு இணைகிறது' : 'How Tamil Development Connects';

  return (
    <TamilSection
      id="ecosystem"
      chapterNumber="02"
      category="THE DEPARTMENT"
      title={title}
      bgVariant="paper"
    >
      <div ref={containerRef} className="relative mt-16 md:mt-24 pb-12 flex flex-col items-center">
        
        {/* Central Axis Line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-[var(--color-tamil-gold)] to-transparent -translate-x-1/2 opacity-30" />

        {/* Central Core */}
        <div 
          ref={el => { nodesRef.current[0] = el; }}
          className="relative z-10 mb-16 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-tamil-red)] text-white shadow-xl md:h-32 md:w-32"
        >
          <span className="font-tamil-display text-xl md:text-2xl font-bold">
            {locale === 'ta' ? 'தமிழ்' : 'TAMIL'}
          </span>
        </div>

        {/* Ecosystem Nodes */}
        <div className="relative z-10 flex w-full max-w-lg flex-col gap-8 md:gap-12">
          {data.map((node, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={node.id}
                ref={el => { nodesRef.current[i + 1] = el; }}
                className={`flex w-full items-center gap-6 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
                  <span className="font-tamil-sans text-lg md:text-xl font-medium text-[var(--color-tamil-ink)]">
                    {node.label[locale]}
                  </span>
                </div>
                
                {/* Node Point */}
                <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                  <div className="absolute h-full w-full rounded-full bg-[var(--color-tamil-gold)] opacity-40 animate-pulse" />
                  <div className="h-2 w-2 rounded-full bg-[var(--color-tamil-red)]" />
                </div>
                
                <div className="flex-1" />
              </div>
            );
          })}
        </div>

      </div>
    </TamilSection>
  );
}
