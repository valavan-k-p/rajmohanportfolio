'use client';

import Link from 'next/link';
import type { PortalId } from '@/config/portals';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { cormorant } from './MlaTypography';
import { useState, useEffect } from 'react';
import { MlaScrollProgress } from './MlaMotion';
import { MlaStickyNav } from './MlaStickyNav';

const EASE = [0.16, 1, 0.3, 1] as const;

export interface MlaHeroProps {
  readonly portal: PortalId; 
  readonly index: string;
  readonly title: string;
  readonly standfirst: string;
  readonly backLabel: string;
}

function MlaPreloader({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060a14] ${cormorant.variable}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE } }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[#d4af37] u-eyebrow mb-4"
      >
        04
      </motion.div>
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          className="font-display text-4xl text-[#fdfbf7] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          MLA · Egmore
        </motion.h1>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
        className="h-[1px] bg-[#d4af37]/50 mt-8 w-32"
        style={{ transformOrigin: 'center' }}
      />
    </motion.div>
  );
}

function FloatingNav({ backLabel }: { backLabel: string }) {
  const prefersReducedMotion = useReducedMotion();
  
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 md:gap-8 px-6 md:px-10 py-3 rounded-full bg-black/10 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.2, ease: EASE }}
    >
      <Link href="/" className="text-[#fdfbf7]/80 hover:text-[#d4af37] tracking-[0.15em] text-[9px] md:text-[10px] uppercase font-medium transition-colors">
        {backLabel}
      </Link>
      <span className="w-[1px] h-3 bg-white/30" />
      <a href="#mla-at-a-glance" onClick={(e) => smoothScroll(e, '#mla-at-a-glance')} className="text-[#fdfbf7]/90 hover:text-[#d4af37] tracking-[0.15em] text-[9px] md:text-[10px] uppercase font-medium transition-colors">
        Profile
      </a>
      <a href="#about-egmore" onClick={(e) => smoothScroll(e, '#about-egmore')} className="text-[#fdfbf7]/90 hover:text-[#d4af37] tracking-[0.15em] text-[9px] md:text-[10px] uppercase font-medium transition-colors hidden sm:block">
        Role
      </a>
      <a href="#neer-ezhil-palli" onClick={(e) => smoothScroll(e, '#neer-ezhil-palli')} className="text-[#fdfbf7]/90 hover:text-[#d4af37] tracking-[0.15em] text-[9px] md:text-[10px] uppercase font-medium transition-colors">
        Projects
      </a>
      <a href="#civic-work" onClick={(e) => smoothScroll(e, '#civic-work')} className="text-[#fdfbf7]/90 hover:text-[#d4af37] tracking-[0.15em] text-[9px] md:text-[10px] uppercase font-medium transition-colors hidden md:block">
        Civic Work
      </a>
    </motion.nav>
  )
}

export function MlaHero({ index, title, standfirst, backLabel }: MlaHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setShowPreloader(false), 2000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [showPreloader]);

  return (
    <>
      <MlaScrollProgress />
      <MlaStickyNav title={title} />
      <AnimatePresence>
        {showPreloader && <MlaPreloader onComplete={() => { document.body.style.overflow = ''; }} />}
      </AnimatePresence>

      <header 
        className={`relative min-h-[100dvh] w-full bg-[#fdfbf7] flex flex-col items-center justify-center ${cormorant.variable} overflow-hidden`}
      >
        <FloatingNav backLabel={backLabel} />

        {/* Background / Portrait Layer */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.0, delay: 1.8, ease: EASE }}
        >
          <div 
            className="absolute inset-0 bg-[url('/images/mla-egmore-portrait.jpg')] bg-cover bg-top" 
          />
          {/* Subtle cinematic treatment - no heavy dark gradients. Just enough for white text to pop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.35)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060a14]/80" />
        </motion.div>

        {/* Centered Content Layer */}
        <div className="relative z-20 w-full px-4 flex flex-col items-center justify-center h-full text-center mt-12 md:mt-24 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.4, ease: EASE }}
            className="mb-6 md:mb-8 bg-black/15 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20"
          >
            <span className="text-[#fdfbf7] tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-xs font-medium uppercase drop-shadow-md">
              MLA · EGMORE
            </span>
          </motion.div>

          <div className="flex flex-col items-center w-full">
            <div className="overflow-hidden pb-1 md:pb-2">
              <motion.h1 
                className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.8] text-[#fdfbf7] uppercase tracking-wide drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                style={{ fontFamily: 'var(--font-cormorant)' }}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, delay: 2.5, ease: EASE }}
              >
                RAJMOHAN
              </motion.h1>
            </div>
            <div className="overflow-hidden pb-2 md:pb-4">
              <motion.h1 
                className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.8] text-[#fdfbf7] uppercase tracking-wide drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                style={{ fontFamily: 'var(--font-cormorant)' }}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, delay: 2.6, ease: EASE }}
              >
                ARUMUGAM
              </motion.h1>
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8, ease: EASE }}
            className="text-lg md:text-2xl font-light text-[#fdfbf7] max-w-xl leading-relaxed mt-4 md:mt-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            Representing Egmore. Working for its people.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-10 md:mt-14 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.0, ease: EASE }}
          >
            <a 
              href="#about-egmore"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about-egmore')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 md:py-4 rounded-full bg-[#fdfbf7] text-[#060a14] font-semibold tracking-[0.15em] text-[10px] md:text-[11px] uppercase hover:bg-[#d4af37] hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              Explore Egmore
            </a>
            <a 
              href="#mla-at-a-glance"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#mla-at-a-glance')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 md:py-4 rounded-full bg-black/20 backdrop-blur-md border border-[#fdfbf7]/40 text-[#fdfbf7] font-semibold tracking-[0.15em] text-[10px] md:text-[11px] uppercase hover:bg-white/10 hover:border-[#fdfbf7] transition-all duration-300 hover:-translate-y-1"
            >
              View Profile
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 1, ease: EASE }}
        >
          <span className="text-[#fdfbf7]/80 tracking-[0.2em] text-[9px] uppercase font-medium drop-shadow-md">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#fdfbf7]/80 text-[10px] drop-shadow-md"
          >
            &darr;
          </motion.div>
        </motion.div>
      </header>
    </>
  );
}
