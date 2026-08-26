'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';

// Custom sleek SVGs
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeOpacity="0.4" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const InfraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
    <path d="M4 22V2M20 22V2" strokeOpacity="0.4" />
    <path d="M12 22v-8M8 10l4-4 4 4" />
  </svg>
);

const EducationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeOpacity="0.4" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const CivicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeOpacity="0.4" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeOpacity="0.4" />
  </svg>
);

export function ConstituencyPriorities({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bento-card',
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: [
      {
        id: 'housing',
        title: 'Housing & Tenements',
        subtitle: 'UPGRADE & REGULARISATION',
        icon: HomeIcon,
        colSpan: 'lg:col-span-7',
        items: ['Housing tenements', 'Settlement regularisation', 'Pattas for eligible families', 'Thattankulam', 'Thideer Nagar', 'Natesan Nagar'],
      },
      {
        id: 'infra',
        title: 'Urban Infrastructure',
        subtitle: 'RESILIENCE & CAPACITY',
        icon: InfraIcon,
        colSpan: 'lg:col-span-5',
        items: ['Stormwater drains', 'Sewer networks', 'Road restoration', 'Flood mitigation', 'Water supply'],
      },
      {
        id: 'education',
        title: 'Education',
        subtitle: 'SMART SCHOOLS INITIATIVE',
        icon: EducationIcon,
        colSpan: 'lg:col-span-5',
        items: ['Government school infrastructure', 'Technology-enabled classrooms', 'Teacher training', 'AI and coding initiatives', 'Water conservation in schools'],
      },
      {
        id: 'civic',
        title: 'Civic Responsiveness',
        subtitle: 'GRASSROOTS ACCOUNTABILITY',
        icon: CivicIcon,
        colSpan: 'lg:col-span-7',
        items: ['Ward-level inspections', 'Resident interaction', 'Grievance redressal', 'Coordination with civic authorities'],
      },
    ],
    ta: [
      {
        id: 'housing',
        title: 'வீட்டுவசதி',
        subtitle: 'மேம்பாடு & முறைப்படுத்தல்',
        icon: HomeIcon,
        colSpan: 'lg:col-span-7',
        items: ['வீட்டு வசதி வாரிய குடியிருப்புகள்', 'குடியிருப்பு முறைப்படுத்தல்', 'தகுதியான குடும்பங்களுக்கு பட்டா', 'தட்டான் குளம்', 'திடீர் நகர்', 'நடேசன் நகர்'],
      },
      {
        id: 'infra',
        title: 'நகர்ப்புற உள்கட்டமைப்பு',
        subtitle: 'தாங்கும் திறன் & கொள்ளளவு',
        icon: InfraIcon,
        colSpan: 'lg:col-span-5',
        items: ['மழைநீர் வடிகால்கள்', 'கழிவுநீர் வலைப்பின்னல்கள்', 'சாலை சீரமைப்பு', 'வெள்ளத் தடுப்பு', 'நீர் வழங்கல்'],
      },
      {
        id: 'education',
        title: 'கல்வி',
        subtitle: 'திறன்மிகு பள்ளிகள் திட்டம்',
        icon: EducationIcon,
        colSpan: 'lg:col-span-5',
        items: ['அரசுப் பள்ளி உள்கட்டமைப்பு', 'தொழில்நுட்ப வசதியுடன் கூடிய வகுப்பறைகள்', 'ஆசிரியர் பயிற்சி', 'செயற்கை நுண்ணறிவு மற்றும் குறியீட்டு முன்முயற்சிகள்', 'பள்ளிகளில் நீர் பாதுகாப்பு'],
      },
      {
        id: 'civic',
        title: 'குடிமைப் பொறுப்புணர்வு',
        subtitle: 'அடிமட்ட கண்காணிப்பு',
        icon: CivicIcon,
        colSpan: 'lg:col-span-7',
        items: ['வார்டு அளவிலான ஆய்வுகள்', 'குடியிருப்பாளர் தொடர்பு', 'குறை தீர்க்கும் நடவடிக்கை', 'குடிமை அதிகாரிகளுடனான ஒருங்கிணைப்பு'],
      },
    ],
  }[locale];

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {content.map((category, _idx) => {
          const Icon = category.icon;
          return (
            <div 
              key={category.id} 
              className={`bento-card relative p-8 md:p-10 rounded-3xl border border-sand-200 bg-sand-50/50 overflow-hidden group hover:border-maroon-300 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-md flex flex-col justify-between ${category.colSpan}`}
            >
              {/* Decorative Background Element */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-400/5 rounded-full blur-[40px] group-hover:bg-yellow-400/10 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex items-start justify-between mb-8">
                <div>
                  <span className="inline-block font-mono text-[10px] sm:text-xs font-bold text-maroon-700 uppercase tracking-[0.2em] mb-2 px-2 py-1 rounded border border-maroon-200/50 bg-maroon-50 group-hover:bg-maroon-100 transition-colors">
                    {category.subtitle}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal-950 tracking-tight group-hover:text-maroon-800 transition-colors">
                    {category.title}
                  </h3>
                </div>
                <div className="text-sand-300 group-hover:text-maroon-600 transition-colors duration-500">
                  <Icon />
                </div>
              </div>

              <ul className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-auto">
                {category.items.map((item, itemIdx) => (
                  <li 
                    key={itemIdx} 
                    className="flex items-start gap-3 text-charcoal-700 text-sm sm:text-base font-sans group-hover:translate-x-1 transition-transform duration-300"
                    style={{ transitionDelay: `${itemIdx * 30}ms` }}
                  >
                    <span className="shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-sand-300 group-hover:bg-maroon-600 transition-colors" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
