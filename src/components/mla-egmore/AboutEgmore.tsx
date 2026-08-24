'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { SectionProps } from './SectionMapper';
import { MlaStaggerContainer, MlaStaggerItem, MlaImageReveal } from './MlaMotion';

const cinematicEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const textVariants = {
  inactive: (customZ: number) => ({
    opacity: 0.8,
    z: customZ * 0.2,
    transition: { duration: 2.5, ease: cinematicEase }
  }),
  active: (customZ: number) => ({
    opacity: 1,
    z: customZ,
    transition: { duration: 2.5, ease: cinematicEase }
  })
};

function Cinematic3DCard({
  index,
  activeIndex,
  radius,
  className,
  children
}: {
  index: number;
  activeIndex: number;
  radius: number;
  className: string;
  children: (parallax: { x: any, y: any }, isActive: boolean) => React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const safeMod = (n: number, m: number) => ((n % m) + m) % m;
  const isActive = safeMod(activeIndex, 3) === index;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { damping: 40, stiffness: 150, mass: 0.5 };
  const textX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const textY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

  return (
    <div 
      className="absolute flex items-center justify-center w-[90%] max-w-[800px]"
      style={{ 
        transform: `rotateY(${index * 120}deg) translateZ(${radius}px)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={false}
        animate={{
          scale: isActive ? 1 : 0.85,
          opacity: isActive ? 1 : 0.25,
          filter: isActive ? 'blur(0px)' : 'blur(4px)',
        }}
        transition={{ duration: 2.5, ease: cinematicEase }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`w-full ${className}`}
      >
        <motion.div
          animate={{ scale: isActive ? [1, 1.015, 1] : 1 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transformStyle: 'preserve-3d' }}
        >
          {children({ x: textX, y: textY }, isActive)}
        </motion.div>
      </motion.div>
    </div>
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

  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(800);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 768 ? 500 : 800);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveIndex((prev) => prev + 1);
      if (e.key === 'ArrowLeft') setActiveIndex((prev) => prev - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 6000); // 2.5s animation + 3.5s pause
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => setActiveIndex((p) => p + 1);
  const handlePrev = () => setActiveIndex((p) => p - 1);

  if (prefersReducedMotion) {
    return (
      <MlaStaggerContainer className="prose prose-lg text-charcoal-800 prose-headings:font-display prose-headings:font-normal prose-li:marker:text-red-600 space-y-6 mt-12 mb-12 px-6 max-w-4xl mx-auto">
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
    <div className="w-full relative h-screen bg-sand-50 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-6 z-50">
        <button 
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-12 h-12 rounded-full border border-charcoal-300 text-charcoal-600 flex items-center justify-center hover:bg-charcoal-900 hover:text-sand-50 transition-colors backdrop-blur-sm bg-sand-50/50 shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={handleNext}
          aria-label="Next slide"
          className="w-12 h-12 rounded-full border border-charcoal-300 text-charcoal-600 flex items-center justify-center hover:bg-charcoal-900 hover:text-sand-50 transition-colors backdrop-blur-sm bg-sand-50/50 shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* 3D Scene */}
      <motion.div
        onPanEnd={(e, info) => {
          if (info.offset.x < -50) handleNext();
          if (info.offset.x > 50) handlePrev();
        }}
        className="w-full h-full flex items-center justify-center relative z-10 cursor-grab active:cursor-grabbing"
        style={{ perspective: '1600px' }}
      >
        <motion.div
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ z: -radius, rotateY: activeIndex * -120 }}
          transition={{ duration: 2.5, ease: cinematicEase }}
          className="relative flex items-center justify-center w-full h-full"
        >
          {/* Card 1: Introduction */}
          <Cinematic3DCard index={0} activeIndex={activeIndex} radius={radius} className="bg-sand-100 p-10 md:p-16 border-t-4 border-red-600 shadow-2xl relative overflow-hidden text-charcoal-900">
            {(parallax, isActive) => (
              <>
                <MlaImageReveal className="absolute -right-20 -bottom-20 opacity-5 blur-sm pointer-events-none">
                  <div className="w-96 h-96 bg-red-600 rounded-full" />
                </MlaImageReveal>
                <motion.h3 custom={40} variants={textVariants} initial={false} animate={isActive ? "active" : "inactive"} style={{ x: parallax.x, y: parallax.y, fontFamily: 'var(--font-cormorant)' }} className="font-display text-4xl mb-8 text-maroon-800">
                  01. The Mandate
                </motion.h3>
                <motion.p custom={20} variants={textVariants} initial={false} animate={isActive ? "active" : "inactive"} style={{ x: parallax.x, y: parallax.y }} className="text-xl leading-relaxed text-charcoal-900 mb-6">
                  {content.p1}
                </motion.p>
                <motion.p custom={15} variants={textVariants} initial={false} animate={isActive ? "active" : "inactive"} style={{ x: parallax.x, y: parallax.y }} className="text-xl leading-relaxed text-charcoal-900">
                  {content.p2}
                </motion.p>
              </>
            )}
          </Cinematic3DCard>

          {/* Card 2: Responsibilities & Concerns */}
          <Cinematic3DCard index={1} activeIndex={activeIndex} radius={radius} className="bg-white p-10 md:p-16 shadow-2xl border border-sand-200 text-charcoal-900 relative">
            {(parallax, isActive) => (
              <>
                <motion.h3 custom={40} variants={textVariants} initial={false} animate={isActive ? "active" : "inactive"} style={{ x: parallax.x, y: parallax.y, fontFamily: 'var(--font-cormorant)' }} className="font-display text-4xl mb-8 text-maroon-800">
                  02. Civic Priorities
                </motion.h3>
                <motion.p custom={20} variants={textVariants} initial={false} animate={isActive ? "active" : "inactive"} style={{ x: parallax.x, y: parallax.y }} className="text-lg text-charcoal-700 mb-4">
                  {content.p3}
                </motion.p>
                <motion.p custom={15} variants={textVariants} initial={false} animate={isActive ? "active" : "inactive"} style={{ x: parallax.x, y: parallax.y }} className="text-lg text-charcoal-700 mb-8">
                  {content.p4}
                </motion.p>
                <motion.div custom={10} variants={textVariants} initial={false} animate={isActive ? "active" : "inactive"} style={{ x: parallax.x, y: parallax.y }} className="bg-sand-100 p-6 border-l-2 border-red-500">
                  <h4 className="text-sm uppercase tracking-widest text-red-600 mb-4 font-bold">{content.concernsHeading}</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-charcoal-800">
                    {content.concerns.map((item, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-red-500 mt-1 text-[0.6rem]">■</span>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            )}
          </Cinematic3DCard>

          {/* Card 3: Coordination */}
          <Cinematic3DCard index={2} activeIndex={activeIndex} radius={radius} className="bg-maroon-800 p-10 md:p-16 shadow-2xl text-sand-50 relative overflow-hidden">
            {(parallax, isActive) => (
              <>
                <motion.h3 custom={40} variants={textVariants} initial={false} animate={isActive ? "active" : "inactive"} style={{ x: parallax.x, y: parallax.y, fontFamily: 'var(--font-cormorant)' }} className="font-display text-4xl mb-8 text-sand-100">
                  03. Active Presence
                </motion.h3>
                <motion.p custom={20} variants={textVariants} initial={false} animate={isActive ? "active" : "inactive"} style={{ x: parallax.x, y: parallax.y }} className="text-xl leading-relaxed text-sand-200 mb-10">
                  {content.p5}
                </motion.p>
                <motion.div custom={10} variants={textVariants} initial={false} animate={isActive ? "active" : "inactive"} style={{ x: parallax.x, y: parallax.y }}>
                  <h4 className="text-sm uppercase tracking-widest text-red-400 mb-6 font-bold">{content.presenceHeading}</h4>
                  <ul className="space-y-4 text-lg">
                    {content.presence.map((item, idx) => (
                      <li key={idx} className="flex gap-4 items-center border-b border-white/10 pb-4">
                        <span className="font-display text-2xl text-red-400/50">{(idx + 1).toString().padStart(2, '0')}</span>
                        <span className="text-sand-100 tracking-wide">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            )}
          </Cinematic3DCard>
          
        </motion.div>
      </motion.div>
    </div>
  );
}

