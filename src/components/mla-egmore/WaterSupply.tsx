'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { Droplet, CheckCircle2, FlaskConical, Wrench, ShieldCheck, Search } from 'lucide-react';

export function WaterSupply({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main text fade in
      gsap.fromTo('.water-text',
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

      // Intervention list stagger
      gsap.fromTo('.intervention-item',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.interventions-list',
            start: 'top 85%',
          }
        }
      );

      // Note card fade up
      gsap.fromTo('.water-note',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
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
    en: {
      p1: 'Water quality and supply remain significant everyday concerns for residents in various parts of Egmore. Addressing these issues requires continuous monitoring and incremental improvements rather than single, one-off projects.',
      p2: 'Following complaints regarding unclean drinking water, the constituency office has prioritised direct interventions to ensure water safety and reliability.',
      interventionsHeading: 'Priority Interventions',
      interventions: [
        { text: 'On-site checks with Metrowater officials', icon: Search },
        { text: 'Addressing tests that showed chlorine levels below prescribed limits', icon: FlaskConical },
        { text: 'Calls for better and more consistent chlorination', icon: ShieldCheck },
        { text: 'Pipeline repairs to prevent contamination', icon: Wrench },
        { text: 'Regular water-quality monitoring across affected areas', icon: CheckCircle2 },
      ],
      note: 'These efforts represent a response to everyday quality-of-life concerns, aiming to improve basic civic maintenance through sustained pressure on municipal bodies.',
    },
    ta: {
      p1: 'எழும்பூரின் பல்வேறு பகுதிகளில் வசிக்கும் மக்களுக்கு நீரின் தரம் மற்றும் வழங்கல் ஆகியவை அன்றாட முக்கிய கவலைகளாகத் தொடர்கின்றன. இந்தப் பிரச்சினைகளைத் தீர்ப்பதற்கு, ஒற்றை, ஒரு முறைத் திட்டங்களைக் காட்டிலும் தொடர்ச்சியான கண்காணிப்பு மற்றும் படிப்படியான மேம்பாடுகள் தேவைப்படுகின்றன.',
      p2: 'சுத்தமற்ற குடிநீர் தொடர்பான புகார்களைத் தொடர்ந்து, குடிநீர் பாதுகாப்பையும் நம்பகத்தன்மையையும் உறுதி செய்வதற்கான நேரடித் தலையீடுகளுக்குத் தொகுதி அலுவலகம் முன்னுரிமை அளித்துள்ளது.',
      interventionsHeading: 'படிப்படியான மேம்பாடுகள்',
      interventions: [
        { text: 'குடிநீர் வழங்கல் வாரிய அதிகாரிகளுடன் கள ஆய்வுகள்', icon: Search },
        { text: 'பரிந்துரைக்கப்பட்ட அளவை விடக் குறைவாக குளோரின் இருப்பதை காட்டிய சோதனைகள் மீது நடவடிக்கை', icon: FlaskConical },
        { text: 'சிறந்த மற்றும் சீரான குளோரினேஷனுக்கான அழைப்புகள்', icon: ShieldCheck },
        { text: 'மாசுபடுவதைத் தடுக்கக் குழாய் பழுதுபார்ப்பு', icon: Wrench },
        { text: 'பாதிக்கப்பட்ட பகுதிகளில் வழக்கமான நீர்த் தரக் கண்காணிப்பு', icon: CheckCircle2 },
      ],
      note: 'இந்த முயற்சிகள் அன்றாட வாழ்க்கைத் தரக் கவலைகளுக்கான பதிலைக் குறிக்கின்றன, இது நகராட்சி அமைப்புகள் மீதான தொடர்ச்சியான அழுத்தத்தின் மூலம் அடிப்படை குடிமைப் பராமரிப்பை மேம்படுத்துவதை நோக்கமாகக் கொண்டுள்ளது.',
    },
  }[locale];

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Context and Note */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="water-text">
            <div className="flex items-center gap-3 mb-6">
              <Droplet className="text-maroon-600" size={24} />
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-950">
                Water Quality & Safety
              </h3>
            </div>
            
            <p className="font-sans text-lg sm:text-xl text-charcoal-800 leading-relaxed font-light mb-6">
              {content.p1}
            </p>
            <p className="font-sans text-base sm:text-lg text-charcoal-700 leading-relaxed mb-10">
              {content.p2}
            </p>
          </div>

          <div className="water-note relative bg-sand-50/50 border border-sand-200 rounded-2xl p-6 sm:p-8 mt-auto">
            <div className="absolute top-0 left-0 w-1 h-full bg-maroon-700 rounded-l-2xl" />
            <p className="font-sans text-charcoal-700 leading-relaxed text-sm sm:text-base italic">
              &quot;{content.note}&quot;
            </p>
          </div>
        </div>

        {/* Right: Interventions List */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-sand-200">
            <h4 className="font-display text-xl font-bold text-charcoal-950 mb-8 border-b border-sand-200 pb-4">
              {content.interventionsHeading}
            </h4>
            
            <div className="interventions-list space-y-6">
              {content.interventions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="intervention-item flex items-start gap-4 group">
                    <div className="mt-1 w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center shrink-0 group-hover:bg-maroon-700 group-hover:text-white text-maroon-600 transition-colors duration-300">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-sans text-charcoal-800 leading-relaxed text-base">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
