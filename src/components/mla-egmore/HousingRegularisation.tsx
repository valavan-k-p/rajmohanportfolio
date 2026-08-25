'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { Home, FileSignature, MapPin, Map, FileText, CheckCircle2 } from 'lucide-react';

export function HousingRegularisation({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Text
      gsap.fromTo('.housing-text',
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

      // List Stagger
      gsap.fromTo('.policy-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.policy-list',
            start: 'top 85%',
          }
        }
      );

      // Locations Stagger
      gsap.fromTo('.location-badge',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.locations-container',
            start: 'top 90%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: {
      p1: 'Housing remains a central civic demand in Egmore. The constituency profile details ongoing policy-level commitments aimed at addressing settlement issues rather than completed large-scale projects at this stage.',
      listHeading: 'Key Policy Commitments',
      list: [
        { text: 'Regularisation of settlements where feasible', icon: FileSignature },
        { text: 'Allotment of tenements within or near the constituency to avoid relocating residents to distant suburbs', icon: Home },
        { text: 'Enumeration of eligible families', icon: FileText },
        { text: 'Issuance of pattas where possible', icon: CheckCircle2 },
        { text: 'Advocacy for additional housing board and slum clearance tenements', icon: Map },
      ],
      locationsHeading: 'Focus Areas',
      locations: [
        'Thattankulam',
        'Thideer Nagar',
        'Natesan Nagar',
      ],
      note: 'Note: The source explicitly describes these interventions primarily as policy-level commitments and ongoing processes rather than completed infrastructure projects.',
    },
    ta: {
      p1: 'வீட்டுவசதி என்பது எழும்பூரில் ஒரு முக்கிய குடிமைத் தேவையாகத் தொடர்கிறது. நிறைவடைந்த பெரிய அளவிலான திட்டங்களைக் காட்டிலும், தற்போதைய நிலையில் குடியிருப்புகள் தொடர்பான பிரச்சினைகளைத் தீர்ப்பதை நோக்கமாகக் கொண்ட கொள்கை அளவிலான அர்ப்பணிப்புகளைத் தொகுதி விவரக்குறிப்பு விவரிக்கிறது.',
      listHeading: 'முக்கிய கொள்கை அர்ப்பணிப்புகள்',
      list: [
        { text: 'சாத்தியமான இடங்களில் குடியிருப்புகளை முறைப்படுத்துதல்', icon: FileSignature },
        { text: 'குடியிருப்பாளர்களைத் தொலைதூரப் புறநகர்ப் பகுதிகளுக்கு மாற்றுவதைத் தவிர்க்க, தொகுதிக்கு உள்ளேயோ அல்லது அருகிலோ குடியிருப்புகளை ஒதுக்குதல்', icon: Home },
        { text: 'தகுதியான குடும்பங்களைக் கணக்கெடுத்தல்', icon: FileText },
        { text: 'சாத்தியமான இடங்களில் பட்டா வழங்குதல்', icon: CheckCircle2 },
        { text: 'கூடுதல் வீட்டு வசதி வாரியம் மற்றும் குடிசை மாற்று வாரிய குடியிருப்புகளுக்கான பரிந்துரை', icon: Map },
      ],
      locationsHeading: 'கவனம் செலுத்தும் பகுதிகள்',
      locations: [
        'தட்டான் குளம்',
        'திடீர் நகர்',
        'நடேசன் நகர்',
      ],
      note: 'குறிப்பு: ஆதாரமானது இந்தத் தலையீடுகளை நிறைவடைந்த உள்கட்டமைப்புத் திட்டங்களை விட, முதன்மையாகக் கொள்கை அளவிலான அர்ப்பணிப்புகள் மற்றும் தொடர்ச்சியான செயல்முறைகளாக வெளிப்படையாக விவரிக்கிறது.',
    },
  }[locale];

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: Text and Locations */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="housing-text mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-maroon-700" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-maroon-700">
                Civic Demand
              </span>
            </div>
            
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-950 mb-6 tracking-tight">
              Housing & Settlements
            </h3>
            
            <p className="font-sans text-base sm:text-lg text-charcoal-700 leading-relaxed">
              {content.p1}
            </p>
          </div>

          <div className="locations-container mt-auto">
            <h4 className="font-mono text-xs uppercase tracking-widest text-charcoal-500 font-bold mb-4">
              {content.locationsHeading}
            </h4>
            <div className="flex flex-wrap gap-3">
              {content.locations.map((loc, idx) => (
                <div key={idx} className="location-badge flex items-center gap-2 px-4 py-2 bg-sand-100/50 border border-sand-300 rounded-full text-charcoal-800 text-sm font-medium hover:border-maroon-700 hover:text-maroon-700 transition-colors cursor-default">
                  <MapPin size={14} />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Policy Commitments Card */}
        <div className="lg:col-span-7">
          <div className="bg-charcoal-900 rounded-3xl p-8 sm:p-10 shadow-xl border-t-4 border-yellow-400 relative overflow-hidden">
            {/* Abstract Accent */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-400/10 rounded-full blur-[60px] pointer-events-none" />
            
            <h4 className="font-display text-2xl font-bold text-white mb-8 relative z-10">
              {content.listHeading}
            </h4>
            
            <div className="policy-list space-y-6 relative z-10">
              {content.list.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="policy-item flex items-start gap-4 group">
                    <div className="mt-1 p-2 rounded-lg bg-white/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-charcoal-900 transition-colors duration-300 shrink-0">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-sans text-white/90 leading-relaxed text-base">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 relative z-10">
              <p className="font-sans text-sm text-white/50 italic leading-relaxed">
                {content.note}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
