'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { Locale } from '@/lib/i18n/routing';

export interface InfoHeroProps {
  readonly locale: Locale;
  readonly index?: string;
  readonly title?: string;
  readonly standfirst?: string;
  readonly backLabel?: string;
}

/**
 * Tamil Nadu State Seal / Emblem Vector (Gopuram & Lion Crest)
 * Precision SVG rendered in metallic antique gold styling
 */
function TamilNaduEmblem({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tnGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="35%" stopColor="#E5C786" />
          <stop offset="70%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8A6C3B" />
        </linearGradient>
        <linearGradient id="tnGoldRing" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C5A059" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8A6C3B" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Outer Decorative Ring */}
      <circle cx="50" cy="50" r="47" stroke="url(#tnGoldRing)" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="44" stroke="url(#tnGoldGrad)" strokeWidth="0.8" opacity="0.6" />

      {/* Inner Central Field */}
      <circle cx="50" cy="50" r="40" fill="#140806" fillOpacity="0.85" stroke="url(#tnGoldGrad)" strokeWidth="1" />

      {/* Gopuram (Temple Tower) Stylized Silhouette */}
      <path
        d="M 50 16 L 53 23 L 60 23 L 58 31 L 65 31 L 63 41 L 70 41 L 67 54 L 73 54 L 71 69 L 29 69 L 27 54 L 33 54 L 30 41 L 37 41 L 35 31 L 42 31 L 40 23 L 47 23 Z"
        fill="url(#tnGoldGrad)"
        opacity="0.95"
      />

      {/* Gopuram Intrinsic Lines */}
      <line x1="33" y1="54" x2="67" y2="54" stroke="#140806" strokeWidth="1.2" />
      <line x1="37" y1="41" x2="63" y2="41" stroke="#140806" strokeWidth="1" />
      <line x1="42" y1="31" x2="58" y2="31" stroke="#140806" strokeWidth="0.9" />
      <line x1="47" y1="23" x2="53" y2="23" stroke="#140806" strokeWidth="0.8" />

      {/* Central Sanctum Arch */}
      <path
        d="M 46 69 A 4 4 0 0 1 54 69 Z"
        fill="#140806"
      />

      {/* Base Pedestal */}
      <rect x="24" y="69" width="52" height="4" rx="0.5" fill="url(#tnGoldGrad)" />
      <rect x="22" y="74" width="56" height="3" rx="0.5" fill="url(#tnGoldGrad)" opacity="0.8" />

      {/* Star / Kalasam Finial */}
      <polygon points="50,11 51.5,14 54.5,15 52,17 53,20 50,18.5 47,20 48,17 45.5,15 48.5,14" fill="#FFF2D6" />

      {/* Bottom Laurel / Wheat Sprigs */}
      <path
        d="M 28 80 C 35 83, 45 84, 50 84 C 55 84, 65 83, 72 80"
        stroke="url(#tnGoldGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InfoHero({ locale }: InfoHeroProps) {
  const isTa = locale === 'ta';
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgParallaxX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const bgParallaxY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const portraitParallaxX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const portraitParallaxY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const textParallaxX = useTransform(smoothX, [-0.5, 0.5], [6, -6]);

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
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/images/publicity/publicity-hero-bg.webp"
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
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.14) 0%, rgba(138, 108, 59, 0.05) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(229, 199, 134, 0.06) 0%, rgba(56, 13, 9, 0.08) 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to top, rgba(7, 5, 4, 0.95) 0%, rgba(7, 5, 4, 0.6) 50%, transparent 100%)',
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
          2. HEADER / BRAND BAR: Clean emblem + Language Switcher
         ========================================================================= */}
      <header className="relative z-30 w-full pt-6">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-12 flex items-center justify-end">
          {/* Right: Language Switch */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <Link
              href={isTa ? '/en/information-publicity' : '/ta/information-publicity'}
              className="inline-flex items-center px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-[#c5a059] border border-[#c5a059]/40 hover:border-[#c5a059] hover:bg-[#c5a059]/10 transition-colors"
            >
              {isTa ? 'English' : 'தமிழ்'}
            </Link>
          </motion.div>
        </div>
      </header>

      {/* =========================================================================
          3. MAIN HERO REGION
         ========================================================================= */}
      <div className="relative z-10 flex-1 flex items-end justify-between mx-auto max-w-[1920px] w-full px-4 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-18">
      </div>

      {/* =========================================================================
          4. FOOTER REGION / SCROLL INDICATOR (Bottom-Right & Atmospheric Anchors)
         ========================================================================= */}
      <div className="relative z-20 w-full border-t border-[#c5a059]/10 bg-[#070504]/50 backdrop-blur-[4px]">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between">
          
          {/* Bottom Left: Portfolio Identification & Status */}
          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#a89578]/80">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
              <span>TN DIPR ACTIVE</span>
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">DIRECTORATE OF INFORMATION & PUBLIC RELATIONS</span>
          </div>

          {/* Bottom Right: Vertical SCROLL Action Indicator */}
          <motion.button
            onClick={() => scrollToSection('latest')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
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
