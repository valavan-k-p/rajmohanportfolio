'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { MlaCounter } from './MlaMotion';
import { Waves, Banknote, MapPin, Target, Activity } from 'lucide-react';

export function StormwaterDrains({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Text
      gsap.fromTo('.drain-intro',
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

      // Bento Cards Stagger
      gsap.fromTo('.bento-card',
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.drain-bento',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: {
      p1: 'Egmore’s historical vulnerability to waterlogging and flooding has made the modernisation of stormwater drains a major infrastructure priority.',
      statsTitle: 'PROJECT METRICS',
      stat1Value: 1.91,
      stat1Label: 'Kilometers of New Drains',
      stat2Value: 2.06,
      stat2Label: 'Crore (INR) Investment',
      locationsTitle: 'Key Interventions',
      locations: [
        'Police Commissioner Office Rd',
        'Tamil Road',
        'Velayutham Street',
        'Koyathoppu',
        'Gandhi-Irwin Road',
        'St Andrew’s Church',
      ],
      contextTitle: 'Singara Chennai 2.0',
      contextBody: 'These interventions are part of a broader city-wide infrastructure programme where the GCC is racing to complete approximately 1,126 km of drains to enhance structural flood resilience.',
      actionsTitle: 'Action & Coordination',
      actions: [
        'Monitoring project progress',
        'Coordination with GCC & WRD',
        'Focusing on structural flood mitigation',
      ],
    },
    ta: {
      p1: 'தண்ணீர் தேங்குதல் மற்றும் வெள்ளப்பெருக்கினால் எழும்பூரின் வரலாற்று ரீதியான பாதிப்புகள், மழைநீர் வடிகால்களை நவீனமயமாக்குவதை ஒரு முக்கிய உள்கட்டமைப்பு முன்னுரிமையாக மாற்றியுள்ளது.',
      statsTitle: 'திட்ட அளவீடுகள்',
      stat1Value: 1.91,
      stat1Label: 'கிலோமீட்டர் புதிய வடிகால்கள்',
      stat2Value: 2.06,
      stat2Label: 'கோடி (INR) முதலீடு',
      locationsTitle: 'முக்கிய இடங்கள்',
      locations: [
        'காவல் ஆணையர் அலுவலக சாலை',
        'தமிழ் சாலை',
        'வேலாயுதம் தெரு',
        'கோயத்தோப்பு',
        'காந்தி-இர்வின் சாலை',
        'செயின்ட் ஆண்ட்ரூஸ் தேவாலயம்',
      ],
      contextTitle: 'சிங்காரச் சென்னை 2.0',
      contextBody: 'இந்த தலையீடுகள் சிங்காரச் சென்னை 2.0 இன் கீழ் ஒரு பரந்த நகரம் தழுவிய திட்டத்தின் பகுதியாகும், அங்கு GCC சுமார் 1,126 கி.மீ வடிகால்களை முடிக்க விரைந்து செயல்படுகிறது.',
      actionsTitle: 'செயல்பாடு & ஒருங்கிணைப்பு',
      actions: [
        'திட்ட முன்னேற்றத்தைக் கண்காணித்தல்',
        'GCC மற்றும் WRD உடன் ஒருங்கிணைப்பு',
        'வெள்ளத் தடுப்பில் கவனம் செலுத்துதல்',
      ],
    },
  }[locale];

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto py-12">
      
      {/* Intro */}
      <div className="max-w-3xl mb-12 drain-intro">
        <h4 className="text-2xl md:text-3xl font-display text-charcoal-900 leading-relaxed font-light">
          {content.p1}
        </h4>
      </div>

      {/* Bento Grid */}
      <div className="drain-bento grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Stats Card (Spans 8 cols on desktop) */}
        <div className="bento-card md:col-span-8 bg-charcoal-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-3 mb-10">
            <Activity className="text-yellow-400" size={24} />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-yellow-400">
              {content.statsTitle}
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <Waves size={28} className="text-white/50" />
                <div className="text-5xl sm:text-6xl font-display font-bold tracking-tighter">
                  <MlaCounter value={content.stat1Value} format="decimal" />
                  <span className="text-2xl sm:text-3xl text-yellow-400 ml-1">km</span>
                </div>
              </div>
              <p className="font-sans text-white/70">{content.stat1Label}</p>
            </div>
            
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <Banknote size={28} className="text-white/50" />
                <div className="text-5xl sm:text-6xl font-display font-bold tracking-tighter">
                  <span className="text-2xl sm:text-3xl text-yellow-400 mr-1">₹</span>
                  <MlaCounter value={content.stat2Value} format="decimal" />
                  <span className="text-2xl sm:text-3xl text-yellow-400 ml-1">Cr</span>
                </div>
              </div>
              <p className="font-sans text-white/70">{content.stat2Label}</p>
            </div>
          </div>
        </div>

        {/* Locations Card (Spans 4 cols on desktop) */}
        <div className="bento-card md:col-span-4 bg-sand-100 rounded-3xl p-8 border border-sand-300 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white rounded-lg shadow-sm text-charcoal-700 group-hover:text-maroon-700 transition-colors">
              <MapPin size={20} />
            </div>
            <h3 className="font-display text-xl font-bold text-charcoal-950">
              {content.locationsTitle}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {content.locations.map((loc, idx) => (
              <span key={idx} className="inline-block px-3 py-1.5 bg-white border border-sand-200 text-charcoal-800 text-xs font-mono font-medium rounded-md shadow-sm hover:border-maroon-300 hover:text-maroon-700 transition-colors cursor-default">
                {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Context Card (Spans 6 cols on desktop) */}
        <div className="bento-card md:col-span-6 bg-white rounded-3xl p-8 border border-sand-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-maroon-700 shrink-0">
              <Waves size={20} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-charcoal-950 mb-3">
                {content.contextTitle}
              </h3>
              <p className="font-sans text-charcoal-700 leading-relaxed">
                {content.contextBody}
              </p>
            </div>
          </div>
        </div>

        {/* Actions Card (Spans 6 cols on desktop) */}
        <div className="bento-card md:col-span-6 bg-white rounded-3xl p-8 border border-sand-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-maroon-700 shrink-0">
              <Target size={20} />
            </div>
            <h3 className="font-display text-2xl font-bold text-charcoal-950">
              {content.actionsTitle}
            </h3>
          </div>
          <ul className="space-y-4">
            {content.actions.map((action, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sand-1000" />
                <span className="font-sans text-charcoal-700">{action}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
