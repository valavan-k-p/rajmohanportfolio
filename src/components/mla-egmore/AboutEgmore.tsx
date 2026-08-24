'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem } from './MlaMotion';

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const slowEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// --- 3D Background Geometry ---
function CinematicBackground({ activeIndex, reducedMotion }: { activeIndex: number, reducedMotion: boolean | null }) {
  // We use Framer Motion 3D transforms to create rotating rings and intersecting planes
  
  // Environment styles per index
  const envStyles = [
    { color: 'rgba(212, 175, 55, 0.15)', rotateX: 60, rotateY: 45, rotateZ: 0, scale: 1 }, // 01 Mandate (Gold/Authority)
    { color: 'rgba(255, 255, 255, 0.1)', rotateX: 45, rotateY: -30, rotateZ: 30, scale: 1.1 }, // 02 Civic (Neutral/Structure)
    { color: 'rgba(220, 38, 38, 0.12)', rotateX: 75, rotateY: 15, rotateZ: -15, scale: 1.2 }  // 03 Presence (Red/Dynamic)
  ];

  const current = envStyles[activeIndex % 3];

  if (reducedMotion) return <div className="absolute inset-0 bg-[#030303]" />;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#030303] pointer-events-none" style={{ perspective: '1200px' }}>
      <motion.div 
        className="w-full h-full absolute inset-0 flex items-center justify-center"
        animate={{
          rotateX: current.rotateX,
          rotateY: current.rotateY,
          rotateZ: current.rotateZ,
          scale: current.scale
        }}
        transition={{ duration: 4, ease: slowEase }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Ring 1 */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full border-[1px]"
          style={{ borderColor: current.color, transform: 'translateZ(-100px)' }}
        />
        {/* Ring 2 */}
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute w-[90vw] h-[90vw] md:w-[70vw] md:h-[70vw] rounded-full border-[1px] opacity-60"
          style={{ borderColor: current.color, transform: 'translateZ(-200px) rotateX(20deg)' }}
        />
        {/* Ring 3 */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute w-[100vw] h-[100vw] md:w-[80vw] md:h-[80vw] rounded-full border-[2px] opacity-30"
          style={{ borderColor: current.color, transform: 'translateZ(-300px) rotateY(15deg)' }}
        />
        
        {/* Floating Particles/Dust */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[150vw] h-[150vw] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_50%)]"
          style={{ transform: 'translateZ(100px)' }}
        />
      </motion.div>

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030303_80%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
    </div>
  );
}

// --- Floating Navigation Item ---
function NavItem({ 
  number, 
  title, 
  isActive, 
  onClick 
}: { 
  number: string, 
  title: string, 
  isActive: boolean,
  onClick: () => void 
}) {
  return (
    <div 
      className="group flex flex-col gap-1 cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        animate={{ 
          opacity: isActive ? 1 : 0.3,
          x: isActive ? 20 : 0
        }}
        transition={{ duration: 0.8, ease: cinematicEase }}
        className="flex items-baseline gap-4 md:gap-6"
      >
        <span 
          className="font-mono text-xs md:text-sm tracking-widest transition-colors duration-300"
          style={{ color: isActive ? '#d4af37' : '#ffffff' }}
        >
          {number}
        </span>
        <h3 
          className="font-display text-3xl md:text-5xl lg:text-6xl tracking-[0.1em] uppercase transition-colors duration-300"
          style={{ 
            fontFamily: 'var(--font-cormorant)',
            color: isActive ? '#fdfbf7' : '#a0a0a0',
            textShadow: isActive ? '0 0 20px rgba(255,255,255,0.3)' : 'none'
          }}
        >
          {title}
        </h3>
      </motion.div>
      
      {/* Subtle indicator line */}
      <motion.div 
        className="h-[1px] bg-[#d4af37]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isActive ? 1 : 0, 
          opacity: isActive ? 1 : 0 
        }}
        transition={{ duration: 0.5, ease: cinematicEase }}
        style={{ transformOrigin: 'left', width: '40px', marginLeft: 'calc(1rem + 20px)' }}
      />
    </div>
  );
}

// --- Content Presentation ---
function ActiveContent({ content, activeIndex }: { content: any, activeIndex: number }) {
  const sections = [
    // 01 The Mandate
    (
      <div className="flex flex-col gap-6 text-[#d0d0d0] text-lg md:text-xl font-light leading-relaxed max-w-2xl">
        <p>{content.p1}</p>
        <p>{content.p2}</p>
      </div>
    ),
    // 02 Civic Priorities
    (
      <div className="flex flex-col gap-6 text-[#d0d0d0] text-lg md:text-xl font-light leading-relaxed max-w-2xl">
        <p>{content.p3}</p>
        <p>{content.p4}</p>
        <div className="mt-4 border-l border-[#d4af37]/30 pl-6 py-2">
          <h4 className="text-sm uppercase tracking-[0.2em] text-[#d4af37] mb-6 font-semibold">{content.concernsHeading}</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#a0a0a0]">
            {content.concerns.map((item: string, idx: number) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="text-[#d4af37] mt-1 text-[0.5rem] opacity-70">◆</span>
                <span className="leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    // 03 Active Presence
    (
      <div className="flex flex-col gap-6 text-[#d0d0d0] text-lg md:text-xl font-light leading-relaxed max-w-2xl">
        <p>{content.p5}</p>
        <div className="mt-4">
          <h4 className="text-sm uppercase tracking-[0.2em] text-red-500 mb-8 font-semibold">{content.presenceHeading}</h4>
          <ul className="flex flex-col gap-5 text-base">
            {content.presence.map((item: string, idx: number) => (
              <li key={idx} className="flex items-center gap-6 border-b border-white/5 pb-4">
                <span className="font-display text-2xl text-red-500/40">{(idx + 1).toString().padStart(2, '0')}</span>
                <span className="text-[#fdfbf7] tracking-wide font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: cinematicEase } }}
      exit={{ opacity: 0, y: -15, filter: 'blur(5px)', transition: { duration: 0.2, ease: 'easeOut' } }}
      className="w-full"
    >
      {sections[activeIndex % 3]}
    </motion.div>
  );
}

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
        'Issuance of pattas for eligible families',
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
        'Issuance of pattas for eligible families',
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

  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // latest goes from 0 to 1 over the course of the 400vh scroll
    // 0 to 0.33 -> index 0
    // 0.33 to 0.66 -> index 1
    // 0.66 to 1.0 -> index 2
    if (latest < 0.33) {
      setActiveIndex(0);
    } else if (latest >= 0.33 && latest < 0.66) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  if (prefersReducedMotion) {
    return (
      <MlaStaggerContainer className="prose prose-lg text-[#d0d0d0] bg-[#030303] py-24 px-6 max-w-4xl mx-auto">
        <MlaStaggerItem><h2 className="text-4xl text-white font-display mb-8">01. The Mandate</h2></MlaStaggerItem>
        <MlaStaggerItem><p>{content.p1}</p></MlaStaggerItem>
        <MlaStaggerItem><p>{content.p2}</p></MlaStaggerItem>
        <MlaStaggerItem><h2 className="text-4xl text-white font-display mt-16 mb-8">02. Civic Priorities</h2></MlaStaggerItem>
        <MlaStaggerItem><p>{content.p3}</p></MlaStaggerItem>
        <MlaStaggerItem><p>{content.p4}</p></MlaStaggerItem>
        <MlaStaggerItem><h3 className="text-xl text-[#d4af37] mt-8 mb-4">{content.concernsHeading}</h3></MlaStaggerItem>
        <ul className="list-disc pl-6 space-y-2">
          {content.concerns.map((item, index) => (
            <MlaStaggerItem key={index} y={0} x={15}><li>{item}</li></MlaStaggerItem>
          ))}
        </ul>
        <MlaStaggerItem><h2 className="text-4xl text-white font-display mt-16 mb-8">03. Active Presence</h2></MlaStaggerItem>
        <MlaStaggerItem><p className="mt-8">{content.p5}</p></MlaStaggerItem>
        <MlaStaggerItem><h3 className="text-xl text-red-500 mt-8 mb-4">{content.presenceHeading}</h3></MlaStaggerItem>
        <ul className="list-disc pl-6 space-y-2">
          {content.presence.map((item, index) => (
            <MlaStaggerItem key={index} y={0} x={15}><li>{item}</li></MlaStaggerItem>
          ))}
        </ul>
      </MlaStaggerContainer>
    );
  }

  const normIndex = activeIndex % 3;

  return (
    <section 
      id="about-egmore"
      ref={containerRef}
      className="relative w-full h-[200vh] bg-[#030303]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <CinematicBackground activeIndex={activeIndex} reducedMotion={prefersReducedMotion} />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center h-full">
          
          {/* Typographic Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-10 md:gap-14">
            <NavItem 
              number="01" 
              title="THE MANDATE" 
              isActive={normIndex === 0} 
              onClick={() => {}} 
            />
            <NavItem 
              number="02" 
              title="CIVIC PRIORITIES" 
              isActive={normIndex === 1} 
              onClick={() => {}} 
            />
            <NavItem 
              number="03" 
              title="ACTIVE PRESENCE" 
              isActive={normIndex === 2} 
              onClick={() => {}} 
            />
          </div>

          {/* Content Display */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[400px] lg:pl-12">
            <AnimatePresence mode="wait">
              <ActiveContent key={normIndex} index={normIndex} content={content} activeIndex={normIndex} />
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

