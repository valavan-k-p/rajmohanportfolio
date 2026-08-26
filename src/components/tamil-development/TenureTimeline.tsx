'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Locale } from '@/lib/i18n/routing';

const TIMELINE_EVENTS = [
  {
    id: 'sworn-in',
    dateEn: 'May 10, 2026',
    dateTa: 'மே 10, 2026',
    titleEn: 'Sworn in as Minister',
    titleTa: 'அமைச்சராக பதவியேற்பு',
    descEn: 'Rajmohan Arumugam takes oath as the Minister for Tamil Development, Information & Publicity.',
    descTa: 'ராஜ்மோகன் ஆறுமுகம் தமிழ் வளர்ச்சி மற்றும் செய்தித்துறை அமைச்சராக பதவியேற்றார்.',
    imageSrc: '/images/tamil-development/swearing.png'
  },
  {
    id: 'strategic-review',
    dateEn: 'May 15, 2026',
    dateTa: 'மே 15, 2026',
    titleEn: 'First Strategic Review',
    titleTa: 'முதல் ஆய்வுக்கூட்டம்',
    descEn: 'Initiated a comprehensive review of the Tamil Development Department\'s ongoing projects and pending awards.',
    descTa: 'தமிழ் வளர்ச்சித் துறையின் திட்டங்கள் மற்றும் நிலுவையில் உள்ள விருதுகள் குறித்த முழுமையான ஆய்வைத் தொடங்கினார்.',
    imageSrc: '/images/tamil-development/statergy.png'
  },
  {
    id: 'sorkuvai-pipeline',
    dateEn: 'June 2026',
    dateTa: 'ஜூன் 2026',
    titleEn: 'Accelerated Sorkuvai Pipeline',
    titleTa: 'சொற்குவை திட்டம் விரைவுபடுத்தல்',
    descEn: 'Directed the acceleration of the digital terminology pipeline to expand the Sorkuvai database.',
    descTa: 'சொற்குவை தரவுத்தளத்தை விரிவுபடுத்த டிஜிட்டல் கலைச்சொல் பணிகளை விரைவுபடுத்த உத்தரவிட்டார்.',
    imageSrc: '/images/tamil-development/sorkuvai.png'
  },
  {
    id: 'policy-note',
    dateEn: 'August 11, 2026',
    dateTa: 'ஆகஸ்ட் 11, 2026',
    titleEn: 'Policy Note Presentation',
    titleTa: 'கொள்கை விளக்கக் குறிப்பு',
    descEn: 'Presented the comprehensive Policy Note for Tamil Development in the Tamil Nadu Legislative Assembly.',
    descTa: 'தமிழ்நாடு சட்டமன்றத்தில் தமிழ் வளர்ச்சிக்கான கொள்கை விளக்கக் குறிப்பை சமர்ப்பித்தார்.',
    imageSrc: '/images/tamil-development/policy.png'
  }
];

export function TenureTimeline({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Central line draws downwards
      gsap.fromTo(timelineLineRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );

      // Node activations
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        
        ScrollTrigger.create({
          trigger: node,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => activateNode(i),
          onEnterBack: () => activateNode(i),
          onLeave: () => deactivateNode(i),
          onLeaveBack: () => deactivateNode(i),
        });
      });

      function activateNode(index: number) {
        const node = nodesRef.current[index];
        if (!node) return;
        gsap.to(node, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.4 });
        const dot = node.querySelector('.timeline-dot');
        if (dot) {
          gsap.to(dot, { 
            backgroundColor: 'var(--color-tamil-gold)',
            boxShadow: '0 0 20px rgba(207,168,48,0.8)',
            scale: 1.5,
            xPercent: -50,
            yPercent: -50,
            duration: 0.4 
          });
        }
      }

      function deactivateNode(index: number) {
        const node = nodesRef.current[index];
        if (!node) return;
        gsap.to(node, { opacity: 0.4, scale: 0.95, filter: 'blur(2px)', duration: 0.4 });
        const dot = node.querySelector('.timeline-dot');
        if (dot) {
          gsap.to(dot, { 
            backgroundColor: '#333',
            boxShadow: 'none',
            scale: 1,
            xPercent: -50,
            yPercent: -50,
            duration: 0.4 
          });
        }
      }

      // Initial state: first node active, others deactivated
      nodesRef.current.forEach((node, i) => {
        if (i > 0) deactivateNode(i);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="tenure-2026" 
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-[#0d0a07] text-[#f0e8d5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="text-center mb-24">
          <div className="text-[var(--color-tamil-gold)] font-bold tracking-[0.2em] uppercase text-sm mb-4">
            {locale === 'ta' ? '2026 பதவிக்காலம்' : '2026 Tenure'}
          </div>
          <h2 className="font-tamil-display text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md">
            {locale === 'ta' ? 'நிர்வாகப் பயணம்' : 'Administrative Actions'}
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          
          {/* The Central Line Background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />
          
          {/* The Animated Active Line */}
          <div 
            ref={timelineLineRef} 
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[var(--color-tamil-red)] via-[var(--color-tamil-gold)] to-transparent -translate-x-1/2 origin-top" 
          />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-24 relative z-10">
            {TIMELINE_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;
              const imageId = `image${index + 1}`;
              
              return (
                <div 
                  key={event.id}
                  ref={el => { if(el) nodesRef.current[index] = el; }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center w-full transition-all duration-500`}
                >
                  
                  {/* Left Column (Desktop) */}
                  <div className="hidden md:block w-1/2 order-1 pr-16 text-right">
                    {isEven ? (
                      // Text
                      <>
                        <div className="font-tamil-display text-2xl md:text-3xl text-[var(--color-tamil-gold)] mb-2">{locale === 'ta' ? event.dateTa : event.dateEn}</div>
                        <h3 className="font-tamil-sans font-bold text-xl text-white mb-3">{locale === 'ta' ? event.titleTa : event.titleEn}</h3>
                        <p className="text-white/60 leading-relaxed">{locale === 'ta' ? event.descTa : event.descEn}</p>
                      </>
                    ) : (
                      // Image Frame
                      <TimelineImageFrame id={imageId} align="right" src={event.imageSrc} />
                    )}
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#333] border-2 border-[#0d0a07] md:order-2 timeline-dot transition-all duration-300 z-20" />

                  {/* Right Column (Desktop) */}
                  <div className="hidden md:block w-1/2 order-3 pl-16 text-left">
                    {!isEven ? (
                      // Text
                      <>
                        <div className="font-tamil-display text-2xl md:text-3xl text-[var(--color-tamil-gold)] mb-2">{locale === 'ta' ? event.dateTa : event.dateEn}</div>
                        <h3 className="font-tamil-sans font-bold text-xl text-white mb-3">{locale === 'ta' ? event.titleTa : event.titleEn}</h3>
                        <p className="text-white/60 leading-relaxed">{locale === 'ta' ? event.descTa : event.descEn}</p>
                      </>
                    ) : (
                      // Image Frame
                      <TimelineImageFrame id={imageId} align="left" src={event.imageSrc} />
                    )}
                  </div>

                  {/* Mobile Content (Text + Image) */}
                  <div className="w-full md:hidden pl-12 order-4 mt-2">
                    <div className="font-tamil-display text-xl text-[var(--color-tamil-gold)] mb-1">{locale === 'ta' ? event.dateTa : event.dateEn}</div>
                    <h3 className="font-tamil-sans font-bold text-lg text-white mb-2">{locale === 'ta' ? event.titleTa : event.titleEn}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-8">{locale === 'ta' ? event.descTa : event.descEn}</p>
                    <TimelineImageFrame id={imageId} align="left" src={event.imageSrc} />
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

function TimelineImageFrame({ id, align, src }: { id: string, align: 'left' | 'right', src?: string }) {
  const imgSrc = src || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  
  return (
    <div 
      className={`relative w-full max-w-[280px] lg:max-w-[320px] aspect-square border border-[#8a7342]/30 bg-[#0a0705]/80 shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden flex items-center justify-center ${align === 'right' ? 'ml-auto' : 'mr-auto'}`}
    >
      {/* Subtle inner highlight */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none z-20" />
      
      {/* Reusable image container */}
      <img 
        src={imgSrc} 
        alt="" 
        className={`${id} absolute inset-0 w-full h-full object-cover z-10`} 
      />
    </div>
  );
}
