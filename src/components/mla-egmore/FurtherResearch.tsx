'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { FileSearch, Search } from 'lucide-react';

export function FurtherResearch({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro fade in
      gsap.fromTo('.research-intro',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );

      // Card Stagger
      gsap.fromTo('.research-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.research-list',
            start: 'top 90%',
          }
        }
      );

      // Pulse animation for the pending badge
      gsap.to('.pending-badge', {
        boxShadow: '0 0 0 0 rgba(234, 179, 8, 0.4)',
        keyframes: [
          { boxShadow: '0 0 0 10px rgba(234, 179, 8, 0)' },
          { boxShadow: '0 0 0 0 rgba(234, 179, 8, 0)' }
        ],
        duration: 1.5,
        repeat: -1,
        ease: 'none'
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: {
      p1: 'The source material identifies specific areas requiring further documentation to present a complete constituency profile:',
      item1: 'Infrastructure projects Rajmohan has announced for Egmore.',
      item2: 'How Egmore residents have reacted to his education initiatives.',
      note: 'Further documentation required. Research pending.',
    },
    ta: {
      p1: 'முழுமையான தொகுதி விவரக்குறிப்பை வழங்குவதற்கு, மேலும் ஆவணப்படுத்தல் தேவைப்படும் குறிப்பிட்ட பகுதிகளை ஆதாரப் பொருள் அடையாளம் காட்டுகிறது:',
      item1: 'எழும்பூருக்காக ராஜ்மோகன் அறிவித்துள்ள உள்கட்டமைப்புத் திட்டங்கள்.',
      item2: 'அவரது கல்வி முன்முயற்சிகளுக்கு எழும்பூர் குடியிருப்பாளர்கள் எவ்வாறு பதிலளித்துள்ளனர்.',
      note: 'மேலும் ஆவணப்படுத்தல் தேவை. ஆராய்ச்சி நிலுவையில் உள்ளது.',
    },
  }[locale];

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto py-12">
      
      <div className="research-intro text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-50 text-yellow-600 mb-6 border border-yellow-100">
          <FileSearch size={32} strokeWidth={1.5} />
        </div>
        <p className="text-xl text-charcoal-800 leading-relaxed font-sans font-light max-w-2xl mx-auto">
          {content.p1}
        </p>
      </div>
      
      <div className="research-list space-y-4 mb-12">
        <div className="research-item flex gap-4 items-start bg-white p-6 rounded-2xl border border-sand-200 shadow-sm hover:border-yellow-300 transition-colors">
          <div className="shrink-0 w-8 h-8 rounded-full bg-sand-100 text-charcoal-500 flex items-center justify-center font-mono text-sm font-bold mt-1">
            01
          </div>
          <p className="text-lg text-charcoal-800 font-sans leading-relaxed">
            {content.item1}
          </p>
        </div>

        <div className="research-item flex gap-4 items-start bg-white p-6 rounded-2xl border border-sand-200 shadow-sm hover:border-yellow-300 transition-colors">
          <div className="shrink-0 w-8 h-8 rounded-full bg-sand-100 text-charcoal-500 flex items-center justify-center font-mono text-sm font-bold mt-1">
            02
          </div>
          <p className="text-lg text-charcoal-800 font-sans leading-relaxed">
            {content.item2}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="pending-badge inline-flex items-center gap-2 px-6 py-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
          <Search size={14} className="animate-pulse" />
          {content.note}
        </div>
      </div>
    </div>
  );
}
