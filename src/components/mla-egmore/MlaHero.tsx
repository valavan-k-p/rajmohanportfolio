'use client';

import Link from 'next/link';
import type { PortalId } from '@/config/portals';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cormorant } from './MlaTypography';
import { MlaScrollProgress } from './MlaMotion';

const EASE = [0.16, 1, 0.3, 1] as const;

export interface MlaHeroProps {
  readonly portal: PortalId; 
  readonly index: string;
  readonly title: string;
  readonly standfirst: string;
  readonly backLabel: string;
  readonly locale: string;
}


function FloatingNav({ backLabel, locale }: { backLabel: string, locale: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = locale === 'ta' ? [
    { label: backLabel, href: '/', type: 'link' },
    { label: 'சுயவிவரம்', href: '#mla-at-a-glance', type: 'scroll' },
    { label: 'பங்கு', href: '#about-egmore', type: 'scroll', hideOnMobile: true },
    { label: 'திட்டங்கள்', href: '#neer-ezhil-palli', type: 'scroll' },
    { label: 'பணிகள்', href: '#civic-work', type: 'scroll', hideOnTablet: true },
  ] : [
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
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
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
          <span className="text-[#fdfbf7]/80 group-hover:text-white tracking-[0.15em] text-[9px] uppercase font-bold drop-shadow-md relative z-10">{locale === 'ta' ? 'மொழி' : 'Language'}</span>
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

export function MlaHero({ backLabel, locale }: MlaHeroProps) {
  return (
    <>
      <MlaScrollProgress />

      <header 
        className={`relative min-h-[100dvh] w-full bg-[#fdfbf7] flex flex-col items-center justify-center ${cormorant.variable} overflow-hidden`}
      >
        <FloatingNav backLabel={backLabel} locale={locale} />

        {/* Background / Group Photo Layer */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.0, delay: 0, ease: EASE }}
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




