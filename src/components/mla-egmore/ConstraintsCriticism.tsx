'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { AlertCircle, FileWarning, EyeOff } from 'lucide-react';

export function ConstraintsCriticism({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.criticism-card',
        { opacity: 0, y: 30, rotationX: -10 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.2)',
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
    en: [
      {
        title: 'Ward Fund Delays',
        icon: FileWarning,
        body: 'In July 2026, GCC councillors, including those from the ruling side, accused the state government of withholding ward development funds amounting to ₹60 lakh per councillor per year. The Mayor reportedly acknowledged these delays, stating that a request for release had been sent to the Municipal Administration Department.',
      },
      {
        title: 'Perceived Centralisation',
        icon: EyeOff,
        body: 'Opposition councillors have alleged that civic officials were sidelining elected ward representatives in order to favour Rajmohan’s visibility as both MLA and minister.',
      },
      {
        title: 'Hygiene Gaps',
        icon: AlertCircle,
        body: 'A July 2026 report concerning the Government Ambedkar Higher Secondary School in Egmore highlighted severe hygiene issues, noting that the school premises had reportedly become a dumping ground for garbage. This raised questions regarding basic civic maintenance consistency.',
      },
    ],
    ta: [
      {
        title: 'வார்டு நிதி தாமதங்கள்',
        icon: FileWarning,
        body: 'ஜூலை 2026 இல், ஆளும் தரப்பு உட்பட GCC கவுன்சிலர்கள், கவுன்சிலர் ஒருவருக்கு ஆண்டுக்கு ₹60 லட்சம் என்ற அளவில் வார்டு மேம்பாட்டு நிதியை மாநில அரசு நிறுத்தி வைத்துள்ளதாகக் குற்றம் சாட்டினர். இந்த தாமதங்களை மேயர் ஒப்புக்கொண்டதாகவும், நிதியை விடுவிப்பதற்கான கோரிக்கை நகராட்சி நிர்வாகத் துறைக்கு அனுப்பப்பட்டுள்ளதாகக் கூறியதாகவும் கூறப்படுகிறது.',
      },
      {
        title: 'மையப்படுத்தல் என்ற குற்றச்சாட்டு',
        icon: EyeOff,
        body: 'எம்.எல்.ஏ மற்றும் அமைச்சர் என இரு நிலைகளிலும் ராஜ்மோகனின் முக்கியத்துவத்திற்குச் சாதகமாக, தேர்ந்தெடுக்கப்பட்ட வார்டு பிரதிநிதிகளைக் குடிமை அதிகாரிகள் ஓரங்கட்டுவதாக எதிர்க்கட்சி கவுன்சிலர்கள் குற்றம் சாட்டியுள்ளனர்.',
      },
      {
        title: 'சுகாதார இடைவெளிகள்',
        icon: AlertCircle,
        body: 'எழும்பூரில் உள்ள அரசு அம்பேத்கர் மேல்நிலைப் பள்ளி தொடர்பான ஜூலை 2026 அறிக்கை கடுமையான சுகாதாரப் பிரச்சினைகளை எடுத்துரைத்தது. பள்ளி வளாகம் குப்பைகள் கொட்டும் இடமாக மாறிவிட்டதாக அந்த அறிக்கை குறிப்பிட்டது. இது அடிப்படை குடிமைப் பராமரிப்பின் நிலைத்தன்மை குறித்த கேள்விகளை எழுப்பியது.',
      },
    ],
  }[locale];

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto py-8">
      <div className="space-y-6">
        {content.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="criticism-card relative bg-white p-8 border border-red-200/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-start group overflow-hidden">
              {/* Subtle danger gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600 relative z-10 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <Icon size={24} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-bold text-red-600/60 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-md">
                    Issue 0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl font-bold text-charcoal-950">
                    {item.title}
                  </h3>
                </div>
                <p className="text-base text-charcoal-700 font-sans leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
