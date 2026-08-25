'use client';

import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';

// Custom Icons
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeOpacity="0.4" />
    <path d="M12 8v4" />
    <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LandmarkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M3 21h18M4 18v-9M20 18v-9M12 2v7" strokeOpacity="0.4" />
    <path d="M12 9l-7 4v5h14v-5l-7-4z" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" strokeOpacity="0.4" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeOpacity="0.4" />
    <circle cx="9" cy="7" r="4" strokeOpacity="0.4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export function AboutEgmore({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-intro',
          start: 'top 80%',
        }
      });

      tl.fromTo('.intro-badge',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo('.intro-text',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        "-=0.4"
      )
      .fromTo('.matrix-card',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      );

      // Tabs animation
      gsap.fromTo('.pipeline-tab',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.pipeline-container',
            start: 'top 85%',
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: {
      kicker: 'CONSTITUENCY PROFILE & MANDATE',
      lead: 'Rajmohan Arumugam assumed office as the Member of Legislative Assembly for Egmore (SC) in May 2026, spearheading grassroots urban renewal, public grievance resolution, and modern educational transformation while handling statewide cabinet portfolios.',
      matrixTitle: 'Dual Responsibility Matrix',
      matrixDesc: 'His role encompasses a strategic dual responsibility: directly addressing grassroots civic and infrastructure demands in Egmore while concurrently executing statewide responsibilities as a senior cabinet minister.',
      status: 'STATUS: ACTIVE MANDATE',
      term: '16TH TN ASSEMBLY',
      tabs: [
        { id: 'mandate', num: '01', title: 'The Mandate', subtitle: 'Electoral Victory & Vision', icon: LandmarkIcon },
        { id: 'priorities', num: '02', title: 'Civic Priorities', subtitle: 'Tenement Upgrades & Works', icon: MapPinIcon },
        { id: 'presence', num: '03', title: 'Active Presence', subtitle: 'Ground Audits & Redressal', icon: UsersIcon },
      ],
      details: [
        {
          heading: '01 · ELECTORAL MANDATE & POLITICAL CONTEXT',
          p1: 'Rajmohan Arumugam’s tenure as the Member of the Legislative Assembly (MLA) for Egmore (SC) began in May 2026, following his decisive victory in the Tamil Nadu Assembly elections.',
          p2: 'Representing the Tamilaga Vettri Kazhagam (TVK), he assumed office amid public expectations for urban renewal, improved civic amenities, and stronger representation for a constituency that had long been a DMK stronghold.',
        },
        {
          heading: '02 · TENEMENT UPGRADES & INFRASTRUCTURE PRIORITIES',
          p1: 'From the beginning of his tenure, constituency work has prioritised addressing long-standing civic concerns highlighted by residents during the 2026 election campaign.',
          p2: 'His MLA office coordinates on-ground inspections with Greater Chennai Corporation (GCC), Metrowater, and state nodal agencies to ensure time-bound execution of critical works across Thattankulam, Thideer Nagar, and Natesan Nagar.',
        },
        {
          heading: '03 · ACTIVE FIELD INSPECTIONS & PUBLIC ACCOUNTABILITY',
          p1: 'His MLA office operates on a principle of radical accessibility, moving beyond traditional petition-receiving to active, real-time grievance redressal on the streets of Egmore.',
          p2: 'This includes weekly public grievance meetings, unannounced civic & drainage audits, and a dedicated citizen WhatsApp desk to track service level agreements (SLAs) with municipal authorities.',
        }
      ]
    },
    ta: {
      kicker: 'தொகுதி விவரக்குறிப்பு & மக்கள் ஆணை',
      lead: 'மே 2026-ல் எழும்பூர் (தனி) தொகுதி சட்டமன்ற உறுப்பினராகப் பொறுப்பேற்ற ராஜ்மோகன் ஆறுமுகம், நகர்ப்புற மேம்பாடு, மக்கள் குறைதீர்ப்பு மற்றும் நவீன பள்ளிக் கல்வி மாற்றங்களை முன்னெடுத்து வருகிறார்.',
      matrixTitle: 'இரட்டைப் பொறுப்பு',
      matrixDesc: 'தொகுதி அளவிலான வளர்ச்சித் தேவைகளை நிவர்த்தி செய்வதோடு, மூத்த அமைச்சரவை அமைச்சராக மாநில அளவிலான முக்கியத் துறைகளைக் கையாளும் இரட்டைப் பொறுப்பை அவர் கொண்டுள்ளார்.',
      status: 'தற்போதைய நிலை',
      term: '16-வது சட்டமன்றம்',
      tabs: [
        { id: 'mandate', num: '01', title: 'மக்கள் ஆணை', subtitle: 'தேர்தல் வெற்றி & பார்வை', icon: LandmarkIcon },
        { id: 'priorities', num: '02', title: 'குடிமை முன்னுரிமைகள்', subtitle: 'குடியிருப்புகள் & உள்கட்டமைப்பு', icon: MapPinIcon },
        { id: 'presence', num: '03', title: 'களப்பணி & அணுகல்', subtitle: 'நேரடி ஆய்வுகள் & குறைதீர்ப்பு', icon: UsersIcon },
      ],
      details: [
        {
          heading: '01 · மக்கள் ஆணை & அரசியல் பின்னணி',
          p1: 'ராஜ்மோகன் ஆறுமுகம் மே 2026-ல் நடைபெற்ற தமிழ்நாடு சட்டமன்றத் தேர்தலில் வெற்றி பெற்று எழும்பூர் (தனி) தொகுதி சட்டமன்ற உறுப்பினராகத் தனது பணியைத் தொடங்கினார்.',
          p2: 'தமிழக வெற்றிக் கழகத்தை (TVK) பிரதிநிதித்துவப்படுத்தி, நீண்ட காலமாக திமுகவின் கோட்டையாக இருந்த தொகுதியில் நகர்ப்புற மறுமலர்ச்சி, மேம்பட்ட குடிமை வசதிகள் மற்றும் தீவிர மக்கள் பிரதிநிதித்துவத்தை முன்னெடுக்கப் பொறுப்பேற்றார்.',
        },
        {
          heading: '02 · குடியிருப்பு உள்கட்டமைப்பு & குடிமைப் பணிகள்',
          p1: 'தனது பதவிக்காலத்தின் தொடக்கத்திலிருந்தே, 2026 தேர்தல் பிரச்சாரத்தின் போது எழுப்பப்பட்ட நீண்டகாலக் குடிமைக் கவலைகளைத் தீர்ப்பதில் அவர் தீவிர கவனம் செலுத்தி வருகிறார்.',
          p2: 'சென்னை மாநகராட்சி மற்றும் குடிநீர் வழங்கல் வாரிய அதிகாரிகளுடன் நேரடியாகக் களத்தில் ஒருங்கிணைந்து உள்கட்டமைப்புப் பணிகளுக்கு முன்னுரிமை அளித்து வருகிறார்.',
        },
        {
          heading: '03 · நேரடிக் கள ஆய்வுகள் & மக்கள் தொடர்பு',
          p1: 'பாரம்பரியமான மனு வாங்கும் முறைகளைத் தாண்டி, நேரடியாகக் களத்தில் இறங்கி மக்களின் குறைகளைக் கேட்டறிந்து தீர்வு காணும் அணுகுமுறையை அவரது அலுவலகம் பின்பற்றுகிறது.',
          p2: 'வாராந்திர குறைதீர்க்கும் கூட்டங்கள், திடீர் ஆய்வுகள் மற்றும் வாட்ஸ்அப் உதவி எண் வழியாக உடனடித் தீர்வு காணும் கட்டமைப்பு ஆகியவை இதில் அடங்கும்.',
        }
      ]
    }
  }[locale];

  return (
    <div ref={containerRef} className="text-white">
      {/* Top Section: Intro & Matrix */}
      <div className="about-intro grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-24">
        
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="intro-badge inline-block rounded border border-yellow-400/30 bg-yellow-400/10 px-3 py-1.5 text-[0.65rem] font-bold tracking-widest uppercase text-yellow-400 mb-6 self-start">
            {content.kicker}
          </div>
          <p className="intro-text font-display text-3xl sm:text-4xl md:text-[2.5rem] leading-[1.2] text-white tracking-tight">
            {content.lead}
          </p>
        </div>

        <div className="lg:col-span-5 matrix-card relative">
          <div className="relative p-8 md:p-10 rounded-2xl border border-white/10 bg-gradient-to-b from-maroon-900/50 to-black/40 backdrop-blur-md shadow-2xl overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-yellow-400 mb-4">
                <ShieldIcon />
                <h4 className="font-mono text-sm font-bold uppercase tracking-wider">
                  {content.matrixTitle}
                </h4>
              </div>
              <p className="font-sans text-white/80 text-base leading-relaxed">
                {content.matrixDesc}
              </p>
            </div>
            
            <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] sm:text-xs">
              <span className="text-white/50">{content.status}</span>
              <span className="text-yellow-400 font-bold tracking-widest">{content.term}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Pipeline / Tabs */}
      <div className="pipeline-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {content.tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`pipeline-tab text-left p-6 border rounded-xl transition-all duration-500 relative overflow-hidden group ${
                  isActive 
                    ? 'bg-maroon-800/80 border-maroon-500/50 shadow-[0_0_30px_rgba(185,28,28,0.2)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className={`font-mono text-[10px] font-bold px-2 py-1 rounded border transition-colors ${
                    isActive ? 'bg-yellow-400 text-maroon-900 border-yellow-400' : 'text-white/50 border-white/20'
                  }`}>
                    SEC · {tab.num}
                  </span>
                  <div className={`transition-colors ${isActive ? 'text-yellow-400' : 'text-white/30 group-hover:text-white/60'}`}>
                    <Icon />
                  </div>
                </div>
                <div>
                  <h3 className={`font-display text-xl sm:text-2xl font-bold mb-1 transition-colors ${
                    isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                  }`}>
                    {tab.title}
                  </h3>
                  <p className={`font-sans text-xs sm:text-sm transition-colors ${
                    isActive ? 'text-white/80' : 'text-white/40 group-hover:text-white/60'
                  }`}>
                    {tab.subtitle}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Content Area */}
        <div className="relative p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-maroon-600" />
          
          <div className="mb-6 pb-4 border-b border-white/10">
            <h4 className="font-mono text-xs font-bold text-yellow-400 uppercase tracking-widest">
              {content.details?.[activeTab]?.heading}
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/80 font-sans text-base sm:text-lg leading-relaxed text-pretty">
            <p>{content.details?.[activeTab]?.p1}</p>
            <p>{content.details?.[activeTab]?.p2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

