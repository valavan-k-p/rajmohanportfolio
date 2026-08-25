'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import type { SectionProps } from './SectionMapper';
import { MessageCircle, Users, PhoneForwarded } from 'lucide-react';

export function GrievanceRedressal({ locale }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro fade in
      gsap.fromTo('.grievance-intro',
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

      // Feature cards stagger
      gsap.fromTo('.grievance-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.grievance-grid',
            start: 'top 85%',
          }
        }
      );

      // WhatsApp CTA Card
      gsap.fromTo('.whatsapp-cta',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: '.whatsapp-cta',
            start: 'top 90%',
          }
        }
      );
      
      // Float animation for WhatsApp Icon
      gsap.to('.whatsapp-icon', {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const content = {
    en: {
      p1: 'Rajmohan’s office serves as a first point of contact for residents with civic complaints, aiming to bridge the gap between citizens and municipal authorities.',
      meetingsTitle: 'Ward-Level Meetings',
      meetingsBody: 'Inspections are frequently conducted following resident complaints and media reports. Immediate action is coordinated with Greater Chennai Corporation officials for civic issues.',
      digitalTitle: 'Digital Grievance Channel',
      digitalBody: 'A dedicated WhatsApp line tracks complaints concerning garbage, streetlights, drains, and roads, ensuring structured follow-up with respective departments.',
      whatsappLabel: '24/7 Citizen Helpdesk',
      whatsappNumber: '99409 40405',
      whatsappSub: 'WhatsApp only. Please include location details.',
    },
    ta: {
      p1: 'ராஜ்மோகனின் அலுவலகம், குடிமைப் புகார்களைக் கொண்ட குடியிருப்பாளர்களுக்கான முதல் தொடர்புப் புள்ளியாகச் செயல்படுகிறது. இது குடிமக்களுக்கும் நகராட்சி அதிகாரிகளுக்கும் இடையிலான இடைவெளியைக் குறைப்பதை நோக்கமாகக் கொண்டுள்ளது.',
      meetingsTitle: 'வார்டு அளவிலான கூட்டங்கள்',
      meetingsBody: 'குடியிருப்பாளர்களின் புகார்கள் மற்றும் ஊடக அறிக்கைகளைத் தொடர்ந்து அடிக்கடி ஆய்வுகள் நடத்தப்படுகின்றன. குடிமைப் பிரச்சினைகளுக்குப் பெருநகர சென்னை மாநகராட்சி அதிகாரிகளுடன் உடனடி நடவடிக்கை ஒருங்கிணைக்கப்படுகிறது.',
      digitalTitle: 'டிஜிட்டல் குறை தீர்க்கும் வழிமுறை',
      digitalBody: 'குப்பை, தெருவிளக்குகள், வடிகால்கள் மற்றும் சாலைகள் தொடர்பான புகார்களைப் பதிவு செய்ய, குடியிருப்பாளர்களுக்காக ஒரு பிரத்யேக வாட்ஸ்அப் எண் வழங்கப்பட்டுள்ளது. அலுவலகம் இந்தப் புகார்களைக் கண்காணித்து நடவடிக்கை எடுக்கிறது.',
      whatsappLabel: '24/7 குடிமக்கள் உதவி மையம்',
      whatsappNumber: '99409 40405',
      whatsappSub: 'வாட்ஸ்அப் மட்டும். இருப்பிட விவரங்களைச் சேர்க்கவும்.',
    },
  }[locale];

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto py-12">
      
      <div className="grievance-intro max-w-3xl mb-12">
        <h3 className="text-2xl md:text-3xl font-display text-charcoal-900 leading-relaxed font-light">
          {content.p1}
        </h3>
      </div>

      <div className="grievance-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* Left Column: Features */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="grievance-card bg-white rounded-3xl p-8 border border-sand-200 shadow-sm flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-sand-100 text-maroon-700 flex items-center justify-center shrink-0">
                <Users size={24} />
              </div>
              <h4 className="font-display text-2xl font-bold text-charcoal-950">
                {content.meetingsTitle}
              </h4>
            </div>
            <p className="font-sans text-charcoal-700 leading-relaxed pl-16">
              {content.meetingsBody}
            </p>
          </div>

          <div className="grievance-card bg-white rounded-3xl p-8 border border-sand-200 shadow-sm flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-sand-100 text-maroon-700 flex items-center justify-center shrink-0">
                <PhoneForwarded size={24} />
              </div>
              <h4 className="font-display text-2xl font-bold text-charcoal-950">
                {content.digitalTitle}
              </h4>
            </div>
            <p className="font-sans text-charcoal-700 leading-relaxed pl-16">
              {content.digitalBody}
            </p>
          </div>
        </div>

        {/* Right Column: WhatsApp CTA */}
        <div className="lg:col-span-5 flex">
          <div className="whatsapp-cta w-full bg-maroon-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col justify-center items-center text-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
            
            <div className="whatsapp-icon mb-6 relative z-10 bg-white/20 p-5 rounded-full backdrop-blur-md border border-white/30">
              <MessageCircle size={48} strokeWidth={1.5} className="text-white" />
            </div>
            
            <div className="relative z-10">
              <h4 className="font-mono text-sm uppercase tracking-widest text-sand-100 font-bold mb-3">
                {content.whatsappLabel}
              </h4>
              <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                {content.whatsappNumber}
              </div>
              <p className="font-sans text-sand-100/80 text-sm">
                {content.whatsappSub}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
