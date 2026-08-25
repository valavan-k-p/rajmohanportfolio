'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';

// Custom Minimal SVGs
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeOpacity="0.4" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeOpacity="0.4" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" strokeOpacity="0.4" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeOpacity="0.4" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" strokeOpacity="0.4" />
  </svg>
);

const FlagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" strokeOpacity="0.4" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" strokeOpacity="0.4" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01" />
  </svg>
);

export function MlaAtAGlance({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.glance-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
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
      items: [
        { id: 'name', label: 'Name', value: 'Rajmohan Arumugam', icon: UserIcon },
        { id: 'constituency', label: 'Constituency', value: 'Egmore (SC)', icon: LocationIcon },
        { id: 'role', label: 'Role', value: 'Member of the Legislative Assembly', icon: BriefcaseIcon },
        { id: 'tenure', label: 'Tenure', value: 'Beginning May 2026', icon: CalendarIcon },
        { id: 'party', label: 'Political Party', value: 'Tamilaga Vettri Kazhagam', icon: FlagIcon },
        { id: 'ministries', label: 'Additional Portfolios', value: 'School Education & Info', icon: BuildingIcon },
      ]
    },
    ta: {
      items: [
        { id: 'name', label: 'பெயர்', value: 'ராஜ்மோகன் ஆறுமுகம்', icon: UserIcon },
        { id: 'constituency', label: 'தொகுதி', value: 'எழும்பூர் (தனி)', icon: LocationIcon },
        { id: 'role', label: 'பதவி', value: 'சட்டமன்ற உறுப்பினர்', icon: BriefcaseIcon },
        { id: 'tenure', label: 'பதவிக்காலம்', value: 'மே 2026 முதல்', icon: CalendarIcon },
        { id: 'party', label: 'அரசியல் கட்சி', value: 'தமிழக வெற்றி கழகம்', icon: FlagIcon },
        { id: 'ministries', label: 'கூடுதல் பொறுப்புகள்', value: 'பள்ளிக் கல்வி & விளம்பரம்', icon: BuildingIcon },
      ]
    },
  }[locale];

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.items.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className="glance-card relative p-6 md:p-8 bg-white border border-sand-300 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-10px_rgba(185,28,28,0.15)] hover:border-maroon-700/30 transition-all duration-300 group overflow-hidden"
            >
              {/* Subtle accent line on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-maroon-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-maroon-700 group-hover:bg-maroon-700 group-hover:text-white transition-colors duration-300">
                  <Icon />
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-charcoal-500 font-bold group-hover:text-maroon-700 transition-colors">
                  {item.label}
                </div>
              </div>
              
              <div className="font-display text-2xl md:text-3xl font-medium text-charcoal-900 tracking-tight leading-tight">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
