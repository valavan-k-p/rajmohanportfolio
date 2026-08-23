'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
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

/**
 * Circular Rotating Badge in Upper Right (Media / Information / TN Govt)
 */
function CircularInfoBadge({ isTa }: { isTa: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 select-none group">
      {/* Outer Rotating Dashed Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        className="absolute inset-0 rounded-full border border-dashed border-[#c5a059]/40 group-hover:border-[#c5a059]/80 transition-colors"
      />

      {/* Inner Concentric Ring */}
      <div className="absolute inset-2 rounded-full border border-[#c5a059]/25 group-hover:border-[#c5a059]/50 transition-colors" />

      {/* Background Soft Glow */}
      <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#2a0c09]/90 to-[#120a08]/95 backdrop-blur-md shadow-2xl" />

      {/* Badge Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-1.5 pointer-events-none">
        <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
          {isTa ? 'மக்கள் தகவல்' : 'PUBLIC INFO'}
        </span>
        <span className="my-0.5 text-[9px] sm:text-[10px] font-serif font-bold tracking-widest text-[#fbf9f4]">
          {isTa ? 'ஊடகம்' : 'MEDIA'}
        </span>
        <div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent my-0.5 opacity-70" />
        <span className="text-[6.5px] sm:text-[7.5px] uppercase tracking-[0.25em] text-[#e5c786]/90 font-medium">
          {isTa ? 'தமிழ்நாடு அரசு' : 'TN GOVT'}
        </span>
      </div>
    </div>
  );
}

export function InfoHero({ locale }: InfoHeroProps) {
  const isTa = locale === 'ta';
  const prefersReducedMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Nav Items
  const navItems = [
    { label: isTa ? 'பற்றி' : 'ABOUT', id: 'communication' },
    { label: isTa ? 'துறை' : 'DEPARTMENT', id: 'latest' },
    { label: isTa ? 'செய்தி' : 'PRESS', id: 'press-releases' },
    { label: isTa ? 'ஊடகம்' : 'MEDIA', id: 'media' },
    { label: isTa ? 'முன்முயற்சிகள்' : 'INITIATIVES', id: 'announcements' },
    { label: isTa ? 'அறிக்கைகள்' : 'STATEMENTS', id: 'statements' },
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
        animate={{ opacity: 0.28, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/images/info-hero-bg.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center mix-blend-luminosity filter blur-[0.4px]"
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
          2. HEADER / NAVIGATION: Transparent, uppercase, gold outlined portal button
         ========================================================================= */}
      <header className="relative z-30 w-full border-b border-[#c5a059]/15 backdrop-blur-[6px] bg-[#070504]/40">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
          {/* Left: Tamil Nadu Emblem + Title */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3.5 sm:gap-4"
          >
            <Link
              href={`/${locale}/information-publicity`}
              className="group flex items-center gap-3.5 sm:gap-4 no-underline"
            >
              <TamilNaduEmblem className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 transition-transform duration-500 group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="font-serif text-sm sm:text-base font-bold tracking-[0.22em] uppercase text-[#fbf9f4] group-hover:text-[#e5c786] transition-colors">
                  {isTa ? 'செய்தி மற்றும் மக்கள் தொடர்பு' : 'INFORMATION & PUBLICITY'}
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.26em] uppercase text-[#c5a059]/80 font-medium">
                  {isTa ? 'தமிழ்நாடு அரசு' : 'GOVERNMENT OF TAMIL NADU'}
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Main Navigation">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative text-xs uppercase tracking-[0.22em] text-[#d6cdbd] hover:text-[#fff6d9] transition-colors py-2"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#c5a059] to-[#e5c786] transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </nav>

          {/* Right: Outlined "OFFICIAL PORTAL" Button + Mobile Toggle */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 sm:gap-4"
          >
            {/* Language Switch */}
            <Link
              href={isTa ? '/en/information-publicity' : '/ta/information-publicity'}
              className="hidden sm:inline-flex items-center px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest text-[#c5a059] border border-[#c5a059]/30 rounded-none hover:border-[#c5a059] hover:bg-[#c5a059]/10 transition-colors"
            >
              {isTa ? 'English' : 'தமிழ்'}
            </Link>

            {/* Outlined "OFFICIAL PORTAL" Button */}
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-sans font-medium uppercase tracking-[0.24em] text-[#fbf9f4] border border-[#c5a059]/50 hover:border-[#e5c786] bg-[#140806]/60 hover:bg-[#c5a059]/15 shadow-lg shadow-black/40 transition-all duration-300"
            >
              <span>{isTa ? 'முதன்மை தளம்' : 'OFFICIAL PORTAL'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a059] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#e5c786] hover:text-white transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Slide-Out Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden w-full bg-[#0d0908]/98 border-b border-[#c5a059]/30 px-6 py-8 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-sm uppercase tracking-[0.2em] text-[#e5c786] hover:text-white py-2 border-b border-[#c5a059]/10"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={isTa ? '/en/information-publicity' : '/ta/information-publicity'}
                  className="text-xs uppercase tracking-widest text-[#c5a059] underline"
                >
                  {isTa ? 'Switch to English' : 'தமிழுக்கு மாறவும்'}
                </Link>
                <Link
                  href="/"
                  className="text-xs uppercase tracking-widest text-white border border-[#c5a059] px-4 py-2"
                >
                  {isTa ? 'முதன்மை தளம்' : 'HOME PORTAL'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          3. MAIN HERO REGION: 16:9 Balanced Composition
             - LEFT: Official Portrait of Raj Mohan (0–30% edge, naturally integrated)
             - UPPER-RIGHT: Circular Rotating Information Badge
             - CENTER-RIGHT: Dominant Editorial "RAJ MOHAN" Typography
         ========================================================================= */}
      <div className="relative z-10 flex-1 flex items-end justify-between mx-auto max-w-[1920px] w-full px-4 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-18">
        
        {/* UPPER RIGHT: Floating Circular Badge & Subtle Coordinate Marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-6 sm:top-10 right-4 sm:right-8 lg:right-16 z-20 flex flex-col items-end gap-3"
        >
          <CircularInfoBadge isTa={isTa} />
          <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-[0.25em] text-[#8a6c3b]/80">
            DIPR · CHENNAI · TN
          </span>
        </motion.div>

        {/* -----------------------------------------------------------------------
            LEFT REGISTER (0–32%): Official Portrait of Raj Mohan
            - High-res asset integrated with alpha feathering & dark cinematic blend
           ----------------------------------------------------------------------- */}
        <motion.div
          style={prefersReducedMotion ? {} : { x: portraitParallaxX, y: portraitParallaxY }}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 sm:left-4 lg:left-8 bottom-0 z-10 pointer-events-none w-[72vw] sm:w-[48vw] md:w-[42vw] lg:w-[35vw] xl:w-[32vw] max-w-[620px] h-[68vh] sm:h-[78vh] md:h-[84vh] lg:h-[88vh] max-h-[920px]"
        >
          {/* Portrait Image Container with Feathered Gradient Masks */}
          <div
            className="relative w-full h-full"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 58%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 12%, rgba(0,0,0,1) 28%)',
              WebkitMaskComposite: 'destination-in',
              maskImage:
                'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 58%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 12%, rgba(0,0,0,1) 28%)',
              maskComposite: 'intersect',
            }}
          >
            <Image
              src="/images/navigation.jpeg"
              alt="Raj Mohan - Department of Information & Publicity, Government of Tamil Nadu"
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 75vw, (max-width: 1200px) 45vw, 35vw"
              className="object-cover object-[50%_18%] filter contrast-[1.04] brightness-[0.98] drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
            />
            {/* Cinematic subtle warm light tone overlay on the portrait */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070504] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#070504]/70" />
          </div>
        </motion.div>

        {/* -----------------------------------------------------------------------
            CENTER & RIGHT REGISTER: Majestic Editorial Typography & Details
           ----------------------------------------------------------------------- */}
        <motion.div
          style={prefersReducedMotion ? {} : { x: textParallaxX }}
          className="relative z-20 w-full flex flex-col items-end text-right lg:max-w-[65vw] xl:max-w-[60vw] ml-auto pr-0 sm:pr-4 lg:pr-8"
        >
          {/* Eyebrow Stamped Label */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
          >
            <span className="w-1.5 h-1.5 rotate-45 bg-[#c5a059]" />
            <span className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-[#e5c786] font-semibold">
              {isTa
                ? 'தமிழ்நாடு அரசு · செய்தி மற்றும் மக்கள் தொடர்புத்துறை'
                : 'GOVERNMENT OF TAMIL NADU · INFORMATION & PUBLICITY'}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#c5a059]" />
          </motion.div>

          {/* Main Dominant Heading: "RAJ MOHAN" */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end leading-[0.82] select-none"
          >
            <h1 className="flex flex-col items-end tracking-[-0.03em] font-serif font-light text-right">
              {/* Line 1: RAJ */}
              <span
                className="block text-[clamp(4.25rem,10.5vw,11.5rem)] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF8] via-[#F4EBDB] to-[#C5A059] filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
                style={{
                  fontFamily: 'var(--font-cormorant), var(--font-instrument-serif), Georgia, serif',
                }}
              >
                {isTa ? 'ராஜ்' : 'RAJ'}
              </span>

              {/* Line 2: MOHAN */}
              <span
                className="block text-[clamp(4.25rem,10.5vw,11.5rem)] text-transparent bg-clip-text bg-gradient-to-b from-[#F4EBDB] via-[#E2CEAA] to-[#A88344] -mt-1 sm:-mt-3 md:-mt-5 filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
                style={{
                  fontFamily: 'var(--font-cormorant), var(--font-instrument-serif), Georgia, serif',
                }}
              >
                {isTa ? 'மோகன்' : 'MOHAN'}
              </span>
            </h1>
          </motion.div>

          {/* Subheading: "INFORMATION & PUBLICITY" */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-6"
          >
            <p
              className="text-base sm:text-xl md:text-2xl lg:text-3xl font-serif tracking-[0.24em] uppercase text-[#e5c786] font-normal"
              style={{
                fontFamily: 'var(--font-cormorant), var(--font-instrument-serif), Georgia, serif',
              }}
            >
              {isTa ? 'செய்தி மற்றும் மக்கள் தொடர்பு' : 'INFORMATION & PUBLICITY'}
            </p>
          </motion.div>

          {/* Thin Gold Gradient Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 1 }}
            className="w-full max-w-lg sm:max-w-xl h-[1px] bg-gradient-to-l from-[#c5a059] via-[#8a6c3b]/60 to-transparent my-3.5 sm:my-4.5"
          />

          {/* Supporting Statement Line */}
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm md:text-base font-sans font-light tracking-wide text-[#ddd3c1]/90 max-w-xl"
          >
            {isTa
              ? 'அரசு தகவல் தொடர்பு · மக்கள் தகவல் · ஊடகத் தொடர்பு'
              : 'Government Communication · Public Information · Media Relations'}
          </motion.p>

          {/* Government of Tamil Nadu Authority Seal Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#a89578]"
          >
            {isTa ? 'தமிழ்நாடு அரசு' : 'Government of Tamil Nadu'}
          </motion.div>
        </motion.div>
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
