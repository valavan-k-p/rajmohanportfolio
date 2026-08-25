'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { AlertCircle } from 'lucide-react';

export function CivicWork({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Text
      gsap.fromTo('.civic-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Concerns List
      gsap.fromTo('.concern-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.concerns-grid',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: {
      p1: 'Egmore’s dense population, mixed residential-commercial areas, and ageing infrastructure create ongoing urban governance challenges. As one of Chennai’s oldest and most historically significant areas, balancing modern infrastructure needs with existing constraints requires constant civic attention.',
      p2: 'The constituency office has identified several key areas that require sustained intervention and coordination with various government departments.',
      concernsHeading: 'Priority Intervention Areas',
      concerns: [
        'Water supply infrastructure',
        'Solid waste management',
        'Commercial traffic congestion',
        'Underground drainage systems',
        'Road relaying & restoration',
        'Monsoon flood mitigation',
        'Tenement housing upgrades',
        'Land & settlement regularisation',
      ],
    },
    ta: {
      p1: 'எழும்பூரின் அடர்த்தியான மக்கள் தொகை, கலவையான குடியிருப்பு-வணிகப் பகுதிகள் மற்றும் பழமையான உள்கட்டமைப்பு ஆகியவை தொடர்ச்சியான நகர்ப்புற ஆளுகை சவால்களை உருவாக்குகின்றன. சென்னையின் பழமையான மற்றும் வரலாற்று முக்கியத்துவம் வாய்ந்த பகுதிகளில் ஒன்றாக இருப்பதால், நவீன உள்கட்டமைப்பு தேவைகளை இருக்கும் கட்டுப்பாடுகளுடன் சமநிலைப்படுத்துவதற்கு தொடர்ச்சியான குடிமை கவனம் தேவைப்படுகிறது.',
      p2: 'பல்வேறு அரசுத் துறைகளுடன் தொடர்ச்சியான தலையீடு மற்றும் ஒருங்கிணைப்பு தேவைப்படும் பல முக்கிய பகுதிகளைத் தொகுதி அலுவலகம் அடையாளம் கண்டுள்ளது.',
      concernsHeading: 'முன்னுரிமைப் பகுதிகள்',
      concerns: [
        'நீர் வழங்கல் உள்கட்டமைப்பு',
        'திடக்கழிவு மேலாண்மை',
        'வணிகப் போக்குவரத்து நெரிசல்',
        'பாதாள சாக்கடை அமைப்புகள்',
        'சாலை சீரமைப்பு',
        'பருவமழை வெள்ளத் தடுப்பு',
        'குடியிருப்பு மேம்பாடு',
        'நிலம் & குடியிருப்பு முறைப்படுத்தல்',
      ],
    },
  }[locale];

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left: Editorial Text */}
        <div className="lg:col-span-7 civic-text">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-maroon-700" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-maroon-700">
              URBAN CONTEXT
            </span>
          </div>
          <p className="font-display text-2xl sm:text-3xl text-charcoal-950 leading-relaxed font-light mb-8">
            {content.p1}
          </p>
          <p className="font-sans text-base sm:text-lg text-charcoal-700 leading-relaxed max-w-2xl">
            {content.p2}
          </p>
        </div>

        {/* Right: Intervention Areas List */}
        <div className="lg:col-span-5 relative">
          <div className="bg-sand-50/50 rounded-2xl border border-sand-300 p-8 sm:p-10 relative overflow-hidden">
            {/* Abstract Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-maroon-700/5 rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <AlertCircle className="text-maroon-700" size={20} strokeWidth={2} />
              <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal-950 tracking-tight">
                {content.concernsHeading}
              </h3>
            </div>

            <ul className="concerns-grid space-y-3 relative z-10">
              {content.concerns.map((item, index) => (
                <li 
                  key={index} 
                  className="concern-item group relative overflow-hidden border border-sand-200 rounded-lg bg-white p-4 flex items-center transition-all duration-300 hover:border-maroon-700 hover:shadow-md cursor-default"
                >
                  <div className="absolute inset-0 bg-maroon-700 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                  
                  <div className="relative z-10 w-1.5 h-1.5 bg-maroon-700 rounded-full mr-4 group-hover:bg-yellow-400 transition-colors duration-300" />
                  
                  <span className="relative z-10 font-sans text-sm sm:text-base text-charcoal-800 font-medium group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

