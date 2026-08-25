'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import type { Locale } from '@/lib/i18n/routing';
import { CINEMATIC_EASE } from './InfoMotion';

export interface InfoHeroProps {
  readonly locale: Locale;
  readonly index?: string;
  readonly title?: string;
  readonly standfirst?: string;
  readonly backLabel?: string;
}

export function InfoHero({
  locale,
  backLabel = 'Back to Portals',
}: InfoHeroProps) {
  const isTa = locale === 'ta';
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgParallaxX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const bgParallaxY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'latest', label: isTa ? 'சமீபத்தியவை' : 'Latest' },
    { id: 'press-releases', label: isTa ? 'செய்திக் குறிப்புகள்' : 'Press Releases' },
    { id: 'statements', label: isTa ? 'அமைச்சர் அறிக்கைகள்' : 'Statements' },
    { id: 'communication', label: isTa ? 'தகவல் பிரிவு' : 'Gov Comm' },
    { id: 'media', label: isTa ? 'ஊடகங்கள்' : 'Media' },
    { id: 'photo-archive', label: isTa ? 'புகைப்படங்கள்' : 'Photos' },
    { id: 'video', label: isTa ? 'காணொளிகள்' : 'Videos' },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen h-[100dvh] max-h-[1440px] flex flex-col justify-between overflow-hidden bg-[#070504] text-[#fbf9f4] selection:bg-[#c5a059] selection:text-[#0a0705]"
    >
      {/* =========================================================================
          1. BACKGROUND ATMOSPHERE: Deep cinematic tones, photo layer & lighting
         ========================================================================= */}
      
      {/* Base Deep Obsidian / Dark Maroon Vignette Base */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0c0806] via-[#1a0705] to-[#060404]" />

      {/* Subtle Photographic Architecture Layer with Ken Burns slow motion */}
      <motion.div
        style={prefersReducedMotion ? {} : { x: bgParallaxX, y: bgParallaxY }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: CINEMATIC_EASE }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/images/publicity/publicity.webp"
          alt="Information & Publicity"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Golden Light Leaks & Radial Ambient Glows */}
      <div
        className="absolute -top-32 -right-32 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.16) 0%, rgba(138, 108, 59, 0.05) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(229, 199, 134, 0.07) 0%, rgba(56, 13, 9, 0.09) 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-2/3 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to top, rgba(7, 5, 4, 0.96) 0%, rgba(7, 5, 4, 0.7) 50%, transparent 100%)',
        }}
      />

      {/* Subtle Film Grain Noise Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft Cinematic Vignette Frame */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 160px rgba(0, 0, 0, 0.85), inset 0 0 80px rgba(10, 6, 5, 0.6)',
        }}
      />

      {/* =========================================================================
          2. HEADER / BRAND BAR: Back Navigation + Language Switcher
         ========================================================================= */}
      <header className="relative z-30 w-full pt-6">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Left: Back Link */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest text-[#fbf9f4]/90 bg-black/40 hover:bg-black/70 border border-[#c5a059]/40 hover:border-[#c5a059] backdrop-blur-md transition-all group shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#c5a059] group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-semibold">{backLabel}</span>
            </Link>
          </motion.div>

          {/* Right: Language Switch */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <Link
              href={isTa ? '/en/information-publicity' : '/ta/information-publicity'}
              className="inline-flex items-center px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest text-[#c5a059] bg-black/40 hover:bg-black/70 border border-[#c5a059]/40 hover:border-[#c5a059] backdrop-blur-md transition-colors"
            >
              {isTa ? 'English' : 'தமிழ்'}
            </Link>
          </motion.div>
        </div>
      </header>

      {/* =========================================================================
          3. MAIN HERO REGION
         ========================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col justify-end mx-auto max-w-[1920px] w-full px-4 sm:px-8 lg:px-12 pb-10 sm:pb-14 lg:pb-16" />

      {/* =========================================================================
          4. FOOTER REGION / QUICK NAVIGATION / SCROLL INDICATOR
         ========================================================================= */}
      <div className="relative z-20 w-full border-t border-[#c5a059]/15 bg-[#070504]/75 backdrop-blur-[6px]">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Bottom Left: Portfolio Identification & Status */}
          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#a89578]/90">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
              <span>TN DIPR ACTIVE</span>
            </span>
            <span className="hidden xl:inline text-[#c5a059]/40">|</span>
            <span className="hidden xl:inline">DIRECTORATE OF INFORMATION & PUBLIC RELATIONS</span>
          </div>

          {/* Bottom Center: Quick Nav Bar */}
          <motion.nav
            aria-label="Publicity quick navigation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: CINEMATIC_EASE }}
            className="flex items-center gap-1 bg-black/50 backdrop-blur-md border border-[#c5a059]/30 px-3 py-1 rounded-xs"
          >
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-2.5 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#e5c786]/80 hover:text-white hover:bg-[#c5a059]/20 rounded-2xs transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </motion.nav>

          {/* Bottom Right: Vertical SCROLL Action Indicator */}
          <motion.button
            onClick={() => scrollToSection('latest')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="group flex items-center gap-3 cursor-pointer select-none text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#e5c786] hover:text-white transition-colors"
            aria-label="Scroll to content section"
          >
            <span>{isTa ? 'கீழே செல்ல' : 'SCROLL'}</span>
            <div className="relative w-4 h-7 rounded-full border border-[#c5a059]/60 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1.5 rounded-full bg-[#c5a059]"
              />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
