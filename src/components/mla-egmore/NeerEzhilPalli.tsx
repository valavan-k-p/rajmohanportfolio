'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { Droplets, Sprout, Home, Recycle, CloudRain, LineChart, BookOpen, MapPin } from 'lucide-react';

export function NeerEzhilPalli({ locale, inverted }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animations
      gsap.fromTo('.neer-intro',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.neer-header',
            start: 'top 80%',
          }
        }
      );

      // Pipeline Nodes Animation
      gsap.fromTo('.pipeline-node',
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.pipeline-container',
            start: 'top 75%',
          }
        }
      );

      // Pipeline Connector Lines
      gsap.fromTo('.pipeline-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.inOut',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: '.pipeline-container',
            start: 'top 75%',
          }
        }
      );

      // Detail Cards Animation
      gsap.fromTo('.detail-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.details-grid',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: {
      tag: 'FLAGSHIP INITIATIVE',
      title: 'Neer Ezhil Palli',
      subheading: 'A water-conservation pilot at Presidency Government Girls Higher Secondary School, Egmore',
      intro: 'Launched in July 2026, the Presidency Government Girls Higher Secondary School in Egmore was selected as a pilot site for this initiative. Rajmohan inaugurated the project on 22–23 July 2026.',
      capacityLabel: 'TREATMENT CAPACITY',
      capacityValue: '25,000',
      capacityUnit: 'Liters / Day',
      pipeline: [
        { id: 'waste', title: 'Wastewater', icon: Home, desc: 'Greywater & Sewage', bg: 'bg-charcoal-900', text: 'text-sand-300', border: 'border-charcoal-800' },
        { id: 'treat', title: 'Treatment', icon: Recycle, desc: 'Wetland Bio-filters', bg: 'bg-sand-100', text: 'text-maroon-800', border: 'border-sand-200' },
        { id: 'store', title: 'Storage & Reuse', icon: Droplets, desc: 'Treated Water Tank', bg: 'bg-yellow-400', text: 'text-charcoal-900', border: 'border-yellow-500' },
        { id: 'garden', title: 'Nurseries', icon: Sprout, desc: 'School Greenery', bg: 'bg-white', text: 'text-maroon-700', border: 'border-sand-200' },
        { id: 'recharge', title: 'Recharge', icon: CloudRain, desc: 'Groundwater Aquifer', bg: 'bg-charcoal-800', text: 'text-yellow-400', border: 'border-charcoal-700' },
      ],
      details: [
        {
          icon: LineChart,
          title: 'Core Objectives',
          body: 'Transform government schools into model water-stewardship campuses. Scientifically treat wastewater using eco-friendly, nature-based solutions to reduce freshwater demand and city drain pollution.',
          bg: 'bg-sand-50', text: 'text-charcoal-900', iconBg: 'bg-sand-200', iconColor: 'text-maroon-700'
        },
        {
          icon: Droplets,
          title: 'Nature-Based Technology',
          body: 'The project uses wetland-based decentralised wastewater treatment systems inside school compounds. These low-energy systems use plants, soil, and microbial action to treat sewage.',
          bg: 'bg-charcoal-900', text: 'text-sand-50', iconBg: 'bg-charcoal-800', iconColor: 'text-yellow-400'
        },
        {
          icon: BookOpen,
          title: 'Living Laboratory',
          body: 'Functions as a learning module for environmental science. Students actively monitor water quality, maintain wetland plants, and record water savings and recharge data.',
          bg: 'bg-yellow-400', text: 'text-charcoal-900', iconBg: 'bg-yellow-300', iconColor: 'text-maroon-800'
        },
        {
          icon: MapPin,
          title: 'Scalability & Impact',
          body: 'Following the Egmore pilot, the model is planned for expansion to hundreds of government schools across Tamil Nadu with high water stress and available space.',
          bg: 'bg-white', text: 'text-charcoal-900', iconBg: 'bg-sand-100', iconColor: 'text-maroon-700'
        },
      ]
    },
    ta: {
      tag: 'முன்னோடித் திட்டம்',
      title: 'நீர் எழில் பள்ளி',
      subheading: 'சென்னை எழும்பூர் மாநில அரசு பெண்கள் மேல்நிலைப் பள்ளியில் ஒரு நீர்-பாதுகாப்பு முன்னோடித் திட்டம்',
      intro: 'ஜூலை 2026 இல் தொடங்கப்பட்ட இந்த திட்டத்திற்காக எழும்பூர் மாநில அரசு பெண்கள் மேல்நிலைப் பள்ளி தேர்ந்தெடுக்கப்பட்டது. ராஜ்மோகன் ஜூலை 22-23, 2026 அன்று இத்திட்டத்தை தொடங்கி வைத்தார்.',
      capacityLabel: 'சுத்திகரிப்புத் திறன்',
      capacityValue: '25,000',
      capacityUnit: 'லிட்டர் / நாள்',
      pipeline: [
        { id: 'waste', title: 'கழிவுநீர்', icon: Home, desc: 'பள்ளி வளாகம்', bg: 'bg-charcoal-900', text: 'text-sand-300', border: 'border-charcoal-800' },
        { id: 'treat', title: 'சுத்திகரிப்பு', icon: Recycle, desc: 'சதுப்புநில அமைப்பு', bg: 'bg-sand-100', text: 'text-maroon-800', border: 'border-sand-200' },
        { id: 'store', title: 'சேமிப்பு', icon: Droplets, desc: 'மறுபயன்பாடு', bg: 'bg-yellow-400', text: 'text-charcoal-900', border: 'border-yellow-500' },
        { id: 'garden', title: 'நாற்றங்கால்', icon: Sprout, desc: 'தோட்டக்கலை', bg: 'bg-white', text: 'text-maroon-700', border: 'border-sand-200' },
        { id: 'recharge', title: 'செறிவூட்டல்', icon: CloudRain, desc: 'நிலத்தடி நீர்', bg: 'bg-charcoal-800', text: 'text-yellow-400', border: 'border-charcoal-700' },
      ],
      details: [
        {
          icon: LineChart,
          title: 'முக்கிய நோக்கங்கள்',
          body: 'அரசுப் பள்ளிகளை மாதிரி நீர் மேலாண்மை வளாகங்களாக மாற்றுதல். இயற்கையை அடிப்படையாகக் கொண்ட தீர்வுகளைப் பயன்படுத்தி கழிவுநீரைச் சுத்திகரித்து நன்னீர் தேவையைக் குறைத்தல்.',
          bg: 'bg-sand-50', text: 'text-charcoal-900', iconBg: 'bg-sand-200', iconColor: 'text-maroon-700'
        },
        {
          icon: Droplets,
          title: 'இயற்கை தொழில்நுட்பம்',
          body: 'பள்ளி வளாகங்களுக்குள் சதுப்புநில அடிப்படையிலான சுத்திகரிப்பு அமைப்புகள். தாவரங்கள், மண் மற்றும் நுண்ணுயிரிகளைப் பயன்படுத்தும் குறைந்த ஆற்றல் கொண்ட அமைப்புகள்.',
          bg: 'bg-charcoal-900', text: 'text-sand-50', iconBg: 'bg-charcoal-800', iconColor: 'text-yellow-400'
        },
        {
          icon: BookOpen,
          title: 'வாழும் ஆய்வகம்',
          body: 'சுற்றுச்சூழல் அறிவியலுக்கான கற்றல் தொகுதியாகச் செயல்படுகிறது. நீரின் தரத்தைக் கண்காணித்தல் மற்றும் தரவுகளைப் பதிவு செய்வதில் மாணவர்கள் ஈடுபடுத்தப்படுகிறார்கள்.',
          bg: 'bg-yellow-400', text: 'text-charcoal-900', iconBg: 'bg-yellow-300', iconColor: 'text-maroon-800'
        },
        {
          icon: MapPin,
          title: 'விரிவாக்கம் & தாக்கம்',
          body: 'எழும்பூர் முன்னோடித் திட்டத்தைத் தொடர்ந்து, தமிழ்நாடு முழுவதும் அதிக நீர் அழுத்தம் உள்ள நூற்றுக்கணக்கான அரசுப் பள்ளிகளுக்கு இத்திட்டத்தை விரிவுபடுத்தத் திட்டமிடப்பட்டுள்ளது.',
          bg: 'bg-white', text: 'text-charcoal-900', iconBg: 'bg-sand-100', iconColor: 'text-maroon-700'
        },
      ]
    },
  }[locale];

  return (
    <div ref={containerRef} className={`relative max-w-6xl mx-auto py-12 ${inverted ? 'text-white' : 'text-charcoal-950'}`}>
      
      {/* Header Section */}
      <div className="neer-header text-center max-w-3xl mx-auto mb-16 lg:mb-24">
        <div className="neer-intro">
          <span className={`inline-block font-mono text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded border mb-6 ${
            inverted ? 'bg-charcoal-800 border-charcoal-700 text-yellow-400' : 'bg-maroon-50 border-maroon-200 text-maroon-700'
          }`}>
            {content.tag}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal mb-6 tracking-normal">
            {content.title}
          </h2>
          <p className={`font-sans text-xl sm:text-2xl font-light leading-relaxed mb-6 ${
            inverted ? 'text-white/80' : 'text-charcoal-700'
          }`}>
            {content.subheading}
          </p>
          <p className={`font-sans text-base sm:text-lg leading-relaxed ${
            inverted ? 'text-white/60' : 'text-charcoal-600'
          }`}>
            {content.intro}
          </p>
        </div>
      </div>

      {/* Ecosystem Pipeline Diagram */}
      <div className="pipeline-container relative mb-24">
        <div className={`absolute -inset-10 bg-gradient-to-b ${
          inverted ? 'from-white/5 to-transparent' : 'from-charcoal-900/5 to-transparent'
        } rounded-3xl -z-10`} />

        {/* Capacity Highlight Card - Placed absolutely or above */}
        <div className="flex justify-center mb-12">
          <div className={`inline-flex items-center gap-6 px-8 py-4 rounded-full border shadow-lg ${
            inverted ? 'bg-charcoal-800 border-charcoal-700 backdrop-blur-md' : 'bg-white border-maroon-100'
          }`}>
            <div>
              <div className={`font-mono text-[10px] sm:text-xs font-bold tracking-widest mb-1 ${
                inverted ? 'text-sand-300' : 'text-maroon-700'
              }`}>{content.capacityLabel}</div>
              <div className="font-display text-3xl sm:text-4xl font-normal">
                {content.capacityValue} <span className={`text-lg font-sans font-normal ${
                  inverted ? 'text-white/60' : 'text-charcoal-500'
                }`}>{content.capacityUnit}</span>
              </div>
            </div>
            <Droplets className={inverted ? 'text-yellow-400' : 'text-maroon-700'} size={40} strokeWidth={1.5} />
          </div>
        </div>

        {/* The Pipeline (Desktop horizontal, Mobile vertical) */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 px-4 md:px-0">
          
          {content.pipeline.map((node, idx) => {
            const Icon = node.icon;
            const isLast = idx === content.pipeline.length - 1;
            
            return (
              <div key={node.id} className="relative flex flex-col items-center w-full md:w-1/5 group">
                
                {/* Connector Line (Desktop) */}
                {!isLast && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-[2px] z-0">
                    <div className="pipeline-line w-full h-full bg-gradient-to-r from-yellow-400/30 via-maroon-500/50 to-yellow-400/30" />
                  </div>
                )}
                
                {/* Connector Line (Mobile) */}
                {!isLast && (
                  <div className="md:hidden absolute top-24 left-1/2 w-[2px] h-12 -ml-[1px] z-0">
                    <div className="pipeline-line w-full h-full bg-gradient-to-b from-yellow-400/30 to-yellow-400/30 origin-top" />
                  </div>
                )}

                {/* Node */}
                <div className="pipeline-node relative z-10 flex flex-col items-center">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-lg ${inverted ? `${node.bg} ${node.text} border ${node.border}` : 'bg-white border-2 border-charcoal-100 text-charcoal-900'}`}>
                    {/* Glowing effect under icon on hover */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-maroon-500/20 to-yellow-500/20 blur-md -z-10" />
                    <Icon size={32} strokeWidth={1.25} className={inverted ? node.text : 'text-maroon-700'} />
                  </div>
                  <h4 className="font-display text-lg sm:text-xl font-normal mb-1 text-center">
                    {node.title}
                  </h4>
                  <p className={`font-mono text-xs uppercase tracking-wider text-center ${
                    inverted ? 'text-white/50' : 'text-charcoal-500'
                  }`}>
                    {node.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Details Grid */}
      <div className="details-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {content.details.map((detail, idx) => {
          const Icon = detail.icon;
          return (
            <div 
              key={idx}
              className={`detail-card p-8 rounded-2xl border transition-colors duration-300 ${inverted ? `${detail.bg} ${detail.text} border-transparent shadow-lg` : 'bg-white border-charcoal-200 hover:border-charcoal-300 shadow-sm'}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${inverted ? `${detail.iconBg} ${detail.iconColor}` : 'bg-sand-100 text-maroon-700'}`}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-normal pt-1">
                  {detail.title}
                </h3>
              </div>
              <p className={`font-sans text-base leading-relaxed ${inverted ? (detail.text === 'text-charcoal-900' ? 'text-charcoal-700' : 'text-sand-200') : 'text-charcoal-700'}`}>
                {detail.body}
              </p>
            </div>
          )
        })}
      </div>

    </div>
  );
}
