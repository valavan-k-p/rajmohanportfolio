'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { MlaCounter } from './MlaMotion';
import { Droplets, BookOpen, GraduationCap, Laptop, Lightbulb } from 'lucide-react';

export function EducationInitiatives({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          }
        }
      );

      // Timeline items staggered entrance
      gsap.fromTo('.timeline-item',
        { opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
          }
        }
      );

      // Tech card animation
      gsap.fromTo('.tech-card',
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.tech-card-trigger',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: {
      p1: 'Rajmohan’s role as School Education Minister directly informs his constituency work in Egmore, creating a bridge between statewide policy and local implementation.',
      items: [
        {
          icon: Droplets,
          title: 'Neer Ezhil Palli',
          body: 'Inauguration of the flagship water conservation project at Presidency Girls HSS.',
          date: 'July 2026'
        },
        {
          icon: BookOpen,
          title: 'Infrastructure Upgrades',
          body: 'Distribution of new benches and desks under a CSR initiative.',
          date: 'August 2026'
        },
        {
          icon: Laptop,
          title: 'Smart Classrooms',
          body: 'Advocacy for technology-enabled classrooms in local government schools.',
          date: 'Ongoing'
        },
        {
          icon: GraduationCap,
          title: 'Educator Empowerment',
          body: 'Focus on comprehensive teacher training and pedagogical capacity building.',
          date: 'Ongoing'
        },
      ],
      pilotTitle: 'Technology & Future Skills',
      pilotSubtitle: 'STATEWIDE POLICY INITIATIVE',
      pilotBody: 'As part of a broader statewide policy, a pilot initiative has been announced to introduce AI, coding, and AR/VR modules in government schools. Within Egmore, this translates into advocacy for early adoption of these technology-enabled classrooms and enhanced teacher training to prepare students for future skills.',
    },
    ta: {
      p1: 'பள்ளிக் கல்வித் துறை அமைச்சராக ராஜ்மோகனின் பங்கு, எழும்பூரில் உள்ள அவரது தொகுதிப் பணிகளை நேரடியாக வழிநடத்துகிறது. இது மாநில அளவிலான கொள்கைக்கும் உள்ளூர்ச் செயலாக்கத்திற்கும் இடையே ஒரு பாலத்தை உருவாக்குகிறது.',
      items: [
        {
          icon: Droplets,
          title: 'நீர் எழில் பள்ளி',
          body: 'மாநில அரசு பெண்கள் மேல்நிலைப் பள்ளியில் நீர் பாதுகாப்பு திட்டத்தின் திறப்பு விழா.',
          date: 'ஜூலை 2026'
        },
        {
          icon: BookOpen,
          title: 'உள்கட்டமைப்பு மேம்பாடு',
          body: 'CSR திட்டத்தின் கீழ் புதிய பெஞ்சுகள் மற்றும் மேசைகள் விநியோகம்.',
          date: 'ஆகஸ்ட் 2026'
        },
        {
          icon: Laptop,
          title: 'திறன்மிகு வகுப்பறைகள்',
          body: 'உள்ளூர் அரசுப் பள்ளிகளில் தொழில்நுட்ப வசதியுடன் கூடிய வகுப்பறைகளுக்கான பரிந்துரை.',
          date: 'தொடர்ந்து'
        },
        {
          icon: GraduationCap,
          title: 'ஆசிரியர் திறன் மேம்பாடு',
          body: 'ஆசிரியர் பயிற்சி மற்றும் திறன் மேம்பாட்டில் சிறப்பு கவனம் செலுத்துதல்.',
          date: 'தொடர்ந்து'
        },
      ],
      pilotTitle: 'தொழில்நுட்பம் & எதிர்காலத் திறன்கள்',
      pilotSubtitle: 'மாநில அளவிலான கொள்கை',
      pilotBody: 'மாநில அளவிலான பரந்த கொள்கையின் ஒரு பகுதியாக, அரசுப் பள்ளிகளில் செயற்கை நுண்ணறிவு, குறியீட்டு முறை மற்றும் AR/VR தொகுதிகளை அறிமுகப்படுத்துவதற்கான ஒரு முன்னோடித் திட்டம் அறிவிக்கப்பட்டுள்ளது. எதிர்காலத் திறன்களுக்காக மாணவர்களைத் தயார்படுத்த இந்த திட்டங்களை எழும்பூரில் முன்கூட்டியே செயல்படுத்துவதற்கான முயற்சிகள் மேற்கொள்ளப்படுகின்றன.',
    },
  }[locale];

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto py-12 text-charcoal-900">
      
      {/* Intro Section */}
      <div className="max-w-3xl mx-auto text-center mb-20 px-4">
        <h4 className="text-2xl md:text-3xl font-display text-charcoal-900 leading-relaxed font-light italic">
          &ldquo;{content.p1}&rdquo;
        </h4>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
        
        {/* Left: Staggered Timeline */}
        <div className="lg:col-span-7 timeline-container relative px-4 sm:px-8">
          {/* Central Line */}
          <div className="absolute top-0 bottom-0 left-[2rem] sm:left-[3rem] w-[2px] bg-sand-200">
            <div className="timeline-line w-full h-full bg-maroon-700 origin-top" />
          </div>

          <div className="space-y-12">
            {content.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="timeline-item relative flex items-start gap-6 sm:gap-8 z-10 group">
                  
                  {/* Timeline Dot & Icon */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-maroon-700 flex items-center justify-center text-maroon-700 shadow-md group-hover:scale-110 group-hover:bg-maroon-700 group-hover:text-white transition-all duration-300">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 sm:pt-2 bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-sand-200/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-charcoal-950 group-hover:text-maroon-800 transition-colors">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[10px] sm:text-xs font-bold text-maroon-600 uppercase tracking-widest bg-maroon-50 px-2 py-0.5 rounded border border-maroon-100">
                        {item.date}
                      </span>
                    </div>
                    <p className="font-sans text-charcoal-700 text-sm sm:text-base leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Floating Tech Card */}
        <div className="lg:col-span-5 tech-card-trigger px-4 sm:px-0">
          <div className="tech-card sticky top-32 bg-charcoal-900 rounded-3xl p-8 sm:p-10 shadow-2xl border-t-4 border-yellow-400 overflow-hidden text-white relative">
            
            {/* Abstract Background for Tech Card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-maroon-700/20 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-400/10 rounded-lg text-yellow-400">
                  <Lightbulb size={24} />
                </div>
                <span className="font-mono text-[10px] sm:text-xs font-bold text-yellow-400 uppercase tracking-widest px-2 py-1 border border-yellow-400/30 rounded bg-yellow-400/5">
                  {content.pilotSubtitle}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-white tracking-tight">
                {content.pilotTitle}
              </h3>
              
              <p className="font-sans text-white/80 text-sm sm:text-base leading-relaxed mb-10">
                {content.pilotBody}
              </p>

              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-display text-5xl sm:text-6xl font-bold text-white tracking-tighter flex items-baseline">
                    <MlaCounter value={5000} />
                    <span className="text-yellow-400 ml-1">+</span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-white/50 uppercase tracking-widest mt-2">
                    Schools Statewide
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
