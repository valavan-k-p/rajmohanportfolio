'use client';

import Link from 'next/link';
import type { PortalId } from '@/config/portals';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { cormorant } from './MlaTypography';
import { useState, useEffect } from 'react';
import { MlaScrollProgress } from './MlaMotion';

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
          MLA &middot; EGMORE
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: backLabel, href: '/', type: 'link' },
    { label: 'Profile', href: '#mla-at-a-glance', type: 'scroll' },
    { label: 'Role', href: '#about-egmore', type: 'scroll', hideOnMobile: true },
    { label: 'Projects', href: '#neer-ezhil-palli', type: 'scroll' },
    { label: 'Civic Work', href: '#civic-work', type: 'scroll', hideOnTablet: true },
  ];

  return (
    <div className="absolute bottom-6 md:bottom-10 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <motion.nav 
        className="pointer-events-auto flex items-center gap-1 md:gap-2 px-2 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl max-w-[95vw]"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2, ease: EASE }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {navItems.map((item, i) => (
          <div
            key={item.label}
            className={`relative px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 ${item.hideOnMobile ? 'hidden sm:block' : ''} ${item.hideOnTablet ? 'hidden md:block' : ''}`}
            onMouseEnter={() => setHoveredIndex(i)}
          >
            {hoveredIndex === i && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {item.type === 'link' ? (
              <Link href={item.href} className="text-[#fdfbf7] tracking-[0.15em] text-[9px] md:text-[10px] uppercase font-bold drop-shadow-md relative z-10 block">
                {item.label}
              </Link>
            ) : (
              <a href={item.href} onClick={(e) => smoothScroll(e, item.href)} className="text-[#fdfbf7] tracking-[0.15em] text-[9px] md:text-[10px] uppercase font-bold drop-shadow-md relative z-10 block">
                {item.label}
              </a>
            )}
          </div>
        ))}
        
        {/* Language Switcher */}
        <div className="w-[1px] h-4 bg-white/30 hidden md:block mx-2" />
        <div 
          className="relative group hidden md:flex items-center px-4 py-2 cursor-pointer rounded-full transition-colors duration-300"
          onMouseEnter={() => setHoveredIndex(99)}
        >
          {hoveredIndex === 99 && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-white/10 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="text-[#fdfbf7]/80 group-hover:text-white tracking-[0.15em] text-[9px] uppercase font-bold drop-shadow-md relative z-10">Language</span>
          <div className="absolute bottom-[130%] right-0 mb-1 flex flex-col gap-2 bg-black/80 backdrop-blur-md rounded-md p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-white/10 shadow-xl z-50">
            <Link href="/en/mla-egmore" className="text-[#d4af37] hover:text-[#fdfbf7] tracking-[0.15em] text-[9px] uppercase font-bold drop-shadow-md whitespace-nowrap transition-colors">English</Link>
            <div className="w-full h-[1px] bg-white/20"></div>
            <Link href="/ta/mla-egmore" className="text-[#fdfbf7] hover:text-[#d4af37] tracking-[0.15em] text-[9px] uppercase font-bold drop-shadow-md transition-colors whitespace-nowrap">Tamil</Link>
          </div>
        </div>
      </motion.nav>
    </div>
  );
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
      <AnimatePresence>
        {showPreloader && <MlaPreloader onComplete={() => { document.body.style.overflow = ''; }} />}
      </AnimatePresence>

      <header 
        className={`relative min-h-[100dvh] w-full bg-[#fdfbf7] flex flex-col items-center justify-center ${cormorant.variable} overflow-hidden`}
      >
        <FloatingNav backLabel={backLabel} />

        {/* Background / Group Photo Layer */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.0, delay: 1.8, ease: EASE }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center contrast-110 saturate-110 brightness-105" 
            style={{ backgroundImage: "url('/images/optimized/ChatGPT%20Image%20Aug%2024,%202026,%2007_05_35%20PM%20(1).webp')" }}
          />
          {/* Subtle cinematic treatment */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.35)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060a14]/80" />
        </motion.div>

      </header>
    </>
  );
}




