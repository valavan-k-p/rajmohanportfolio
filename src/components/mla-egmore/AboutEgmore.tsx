'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem, MlaImageReveal } from './MlaMotion';

export function AboutEgmore({ locale }: SectionProps) {
  const content = {
    en: {
      p1: 'Rajmohan Arumugam’s tenure as the Member of the Legislative Assembly (MLA) for Egmore (SC) began in May 2026, following his victory in the Tamil Nadu Assembly elections.',
      p2: 'Representing the Tamilaga Vettri Kazhagam (TVK), he assumed office amid public expectations for urban renewal, improved civic amenities, and stronger representation for a constituency that had long been a DMK stronghold.',
      p3: 'His role has involved a dual responsibility: addressing constituency-level development demands while also handling statewide responsibilities as a senior cabinet minister.',
      p4: 'From the beginning of his tenure, his constituency work has focused on long-standing civic concerns raised during the 2026 election campaign.',
      concernsHeading: 'Key concerns include:',
      concerns: [
        'Better housing tenements in Thattankulam',
        'Better housing facilities in Thideer Nagar',
        'Better housing facilities in Natesan Nagar',
        'Issuance of pattas for eligible families living on temple lands',
        'Modernisation of stormwater drains',
        'Improvement of sewer networks',
        'Relaying damaged roads in Choolai',
        'Relaying damaged roads in Periamet',
      ],
      p5: 'His MLA role involves coordination with municipal authorities and state departments to prioritise infrastructure upgrades.',
      presenceHeading: 'His constituency presence has included:',
      presence: [
        'Public meetings',
        'Ward-level interactions',
        'Civic inspections',
        'Follow-up on pending projects',
        'Engagement around accountability in civic works',
      ],
    },
    ta: {
      p1: 'Rajmohan Arumugam’s tenure as the Member of the Legislative Assembly (MLA) for Egmore (SC) began in May 2026, following his victory in the Tamil Nadu Assembly elections.',
      p2: 'Representing the Tamilaga Vettri Kazhagam (TVK), he assumed office amid public expectations for urban renewal, improved civic amenities, and stronger representation for a constituency that had long been a DMK stronghold.',
      p3: 'His role has involved a dual responsibility: addressing constituency-level development demands while also handling statewide responsibilities as a senior cabinet minister.',
      p4: 'From the beginning of his tenure, his constituency work has focused on long-standing civic concerns raised during the 2026 election campaign.',
      concernsHeading: 'Key concerns include:',
      concerns: [
        'Better housing tenements in Thattankulam',
        'Better housing facilities in Thideer Nagar',
        'Better housing facilities in Natesan Nagar',
        'Issuance of pattas for eligible families living on temple lands',
        'Modernisation of stormwater drains',
        'Improvement of sewer networks',
        'Relaying damaged roads in Choolai',
        'Relaying damaged roads in Periamet',
      ],
      p5: 'His MLA role involves coordination with municipal authorities and state departments to prioritise infrastructure upgrades.',
      presenceHeading: 'His constituency presence has included:',
      presence: [
        'Public meetings',
        'Ward-level interactions',
        'Civic inspections',
        'Follow-up on pending projects',
        'Engagement around accountability in civic works',
      ],
    },
  }[locale];

  const targetRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // We have 3 cards, each taking 100vw width. 
  // To see all 3, we slide by -66.66% (2/3 of the total width).
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%']);

  if (prefersReducedMotion) {
    return (
      <MlaStaggerContainer className="prose prose-lg text-charcoal-800 prose-headings:font-display prose-headings:font-normal prose-li:marker:text-red-600 space-y-6">
        <MlaStaggerItem><p>{content.p1}</p></MlaStaggerItem>
        <MlaStaggerItem><p>{content.p2}</p></MlaStaggerItem>
        <MlaStaggerItem><p>{content.p3}</p></MlaStaggerItem>
        <MlaStaggerItem><p>{content.p4}</p></MlaStaggerItem>
        <MlaStaggerItem><h3 className="text-xl mt-8 mb-4">{content.concernsHeading}</h3></MlaStaggerItem>
        <ul className="list-disc pl-6 space-y-2">
          {content.concerns.map((item, index) => (
            <MlaStaggerItem key={index} y={0} x={15}><li>{item}</li></MlaStaggerItem>
          ))}
        </ul>
        <MlaStaggerItem><p className="mt-8">{content.p5}</p></MlaStaggerItem>
        <MlaStaggerItem><h3 className="text-xl mt-8 mb-4">{content.presenceHeading}</h3></MlaStaggerItem>
        <ul className="list-disc pl-6 space-y-2">
          {content.presence.map((item, index) => (
            <MlaStaggerItem key={index} y={0} x={15}><li>{item}</li></MlaStaggerItem>
          ))}
        </ul>
      </MlaStaggerContainer>
    );
  }

  return (
    <div className="w-full relative mt-12 mb-12">
      <div ref={targetRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <motion.div style={{ x, width: '300%' }} className="flex h-full items-center shrink-0">
            
            {/* Card 1: Introduction */}
            <div className="w-1/3 shrink-0 flex items-center justify-center px-4">
              <div className="w-full max-w-[800px] bg-sand-100 p-10 md:p-16 flex flex-col justify-center border-t-4 border-red-600 shadow-2xl relative overflow-hidden text-charcoal-900">
                <MlaImageReveal className="absolute -right-20 -bottom-20 opacity-5 blur-sm pointer-events-none">
                  <div className="w-96 h-96 bg-red-600 rounded-full" />
                </MlaImageReveal>
                <h3 className="font-display text-4xl mb-8 text-maroon-800" style={{ fontFamily: 'var(--font-cormorant)' }}>01. The Mandate</h3>
                <p className="text-xl leading-relaxed text-charcoal-900 mb-6">{content.p1}</p>
                <p className="text-xl leading-relaxed text-charcoal-900">{content.p2}</p>
              </div>
            </div>

            {/* Card 2: Responsibilities & Concerns */}
            <div className="w-1/3 shrink-0 flex items-center justify-center px-4">
              <div className="w-full max-w-[800px] bg-white p-10 md:p-16 flex flex-col justify-center shadow-2xl border border-sand-200 text-charcoal-900">
                <h3 className="font-display text-4xl mb-8 text-maroon-800" style={{ fontFamily: 'var(--font-cormorant)' }}>02. Civic Priorities</h3>
                <p className="text-lg text-charcoal-700 mb-4">{content.p3}</p>
                <p className="text-lg text-charcoal-700 mb-8">{content.p4}</p>
                <div className="bg-sand-100 p-6 border-l-2 border-red-500">
                  <h4 className="text-sm uppercase tracking-widest text-red-600 mb-4 font-bold">{content.concernsHeading}</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-charcoal-800">
                    {content.concerns.map((item, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-red-500 mt-1 text-[0.6rem]">■</span>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3: Coordination */}
            <div className="w-1/3 shrink-0 flex items-center justify-center px-4">
              <div className="w-full max-w-[800px] bg-maroon-800 p-10 md:p-16 flex flex-col justify-center shadow-2xl text-sand-50 relative overflow-hidden">
                <h3 className="font-display text-4xl mb-8 text-sand-100" style={{ fontFamily: 'var(--font-cormorant)' }}>03. Active Presence</h3>
                <p className="text-xl leading-relaxed text-sand-200 mb-10">{content.p5}</p>
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-red-400 mb-6 font-bold">{content.presenceHeading}</h4>
                  <ul className="space-y-4 text-lg">
                    {content.presence.map((item, idx) => (
                      <li key={idx} className="flex gap-4 items-center border-b border-white/10 pb-4">
                        <span className="font-display text-2xl text-red-400/50">{(idx + 1).toString().padStart(2, '0')}</span>
                        <span className="text-sand-100 tracking-wide">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
