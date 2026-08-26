'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { gsap } from 'gsap';
import { locales, type Locale } from '@/lib/i18n/routing';

export function HeroSection({ locale }: { locale: Locale }) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isTa = locale === 'ta';

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const pathFor = (target: Locale) => {
    if (!pathname) return `/${target}/tamil-development`;
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = target;
      return segments.join('/');
    }
    return `/${target}/tamil-development`;
  };

  const navLinks = [
    { id: 'ecosystem', label: isTa ? 'துறை கட்டமைப்பு' : 'Ecosystem' },
    { id: 'official-language', label: isTa ? 'ஆட்சிமொழி' : 'Official Language' },
    { id: 'minister', label: isTa ? 'அமைச்சர்' : 'Leadership' },
    { id: 'tenure-2026', label: isTa ? 'காலவரிசை' : 'Timeline' },
    { id: 'sorkuvai', label: isTa ? 'சொற்குவை' : 'Sorkuvai' },
    { id: 'books-literature', label: isTa ? 'இலக்கியம்' : 'Literature' },
    { id: 'research', label: isTa ? 'ஆராய்ச்சி' : 'Research' },
    { id: 'global', label: isTa ? 'உலகத் தமிழ்' : 'Global Tamil' },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full aspect-[1600/725] min-h-[45vh] md:min-h-[65vh] lg:min-h-screen xl:min-h-screen flex items-center justify-center bg-[var(--color-tamil-ink)] overflow-hidden"
    >
      {/* 1. HERO BANNER IMAGE (Unmodified, Full Quality, Preserved Aspect) */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/tamil-cultural-banner-1600x725.webp"
          alt="Tamil Cultural Heritage — Tamil Development"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 2. HERO-INTEGRATED INSTITUTIONAL NAVIGATION BAR (Absolute to Hero, Scrolls naturally with Hero) */}
      <nav
        aria-label="Tamil Development Portal Navigation"
        className="absolute top-0 inset-x-0 z-20 pt-4 sm:pt-5 lg:pt-6 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Portal Identity & Back to Home Link */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}`}
              className="group inline-flex items-center gap-2 text-xs sm:text-sm text-[var(--color-tamil-paper)] hover:text-[var(--color-tamil-gold)] transition-colors no-underline"
              aria-label={isTa ? 'முகப்புக்குத் திரும்பு' : 'Back to Home'}
            >
              <span 
                className="inline-block font-bold text-[var(--color-tamil-gold)] transition-transform duration-200 group-hover:-translate-x-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] text-sm sm:text-base"
                aria-hidden="true"
              >
                ←
              </span>
              <span className="font-display tracking-wider text-xs sm:text-sm hidden xs:inline drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {isTa ? 'முகப்பு' : 'Home'}
              </span>
            </Link>

            <span className="text-[var(--color-tamil-gold)]/40 text-xs hidden sm:inline" aria-hidden="true">
              |
            </span>

            {/* Department Title */}
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-semibold text-[var(--color-tamil-white)] leading-tight tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {isTa ? 'தமிழ் வளர்ச்சித் துறை' : 'Tamil Development'}
              </span>
              <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-widest text-[var(--color-tamil-gold-soft)]/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {isTa ? 'தமிழ்நாடு அரசு' : 'Government of Tamil Nadu'}
              </span>
            </div>
          </div>

          {/* Center: Primary Section Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-stretch justify-center gap-2 xl:gap-3 flex-1 mx-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="relative px-3 py-2 text-[13px] xl:text-[15px] font-display font-medium tracking-wide text-[var(--color-tamil-paper)] hover:text-white transition-all duration-300 group border border-[var(--color-tamil-gold)]/40 rounded bg-black/40 hover:bg-[var(--color-tamil-gold)]/20 hover:border-[var(--color-tamil-gold)]/80 text-center flex-1 flex justify-center items-center backdrop-blur-sm shadow-md"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Right: Language Switcher & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cultural Language Switcher Pill */}
            <div 
              aria-label="Language Selector"
              className="flex items-center gap-1 text-xs font-mono bg-black/35 backdrop-blur-xs px-2.5 sm:px-3 py-1 rounded-xs border border-[var(--color-tamil-gold)]/30 shadow-xs"
            >
              <span className="text-[10px] text-[var(--color-tamil-gold)] font-bold uppercase tracking-wider hidden sm:inline mr-0.5">
                {isTa ? 'மொழி' : 'LANG'}:
              </span>
              <Link
                href={pathFor('en')}
                lang="en"
                hrefLang="en"
                aria-current={locale === 'en' ? 'true' : undefined}
                className={`px-1.5 py-0.5 rounded-2xs transition-colors no-underline text-xs ${
                  locale === 'en'
                    ? 'font-bold text-[var(--color-tamil-gold)] border-b border-[var(--color-tamil-gold)]'
                    : 'text-[var(--color-tamil-paper)]/75 hover:text-white'
                }`}
              >
                EN
              </Link>
              <span className="text-[var(--color-tamil-gold)]/30 text-xs" aria-hidden="true">|</span>
              <Link
                href={pathFor('ta')}
                lang="ta"
                hrefLang="ta"
                aria-current={locale === 'ta' ? 'true' : undefined}
                className={`px-1.5 py-0.5 rounded-2xs font-display transition-colors no-underline text-xs ${
                  locale === 'ta'
                    ? 'font-bold text-[var(--color-tamil-gold)] border-b border-[var(--color-tamil-gold)]'
                    : 'text-[var(--color-tamil-paper)]/75 hover:text-white'
                }`}
              >
                தமிழ்
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={isTa ? 'பட்டியலைத் திற/மூடு' : 'Toggle navigation menu'}
              className="lg:hidden p-1.5 text-[var(--color-tamil-paper)] hover:text-[var(--color-tamil-gold)] transition-colors border border-[var(--color-tamil-gold)]/30 bg-black/40 rounded-xs flex items-center justify-center"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Understated cultural drawer) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 pt-3 pb-5 px-6 bg-[#1c1a17]/96 backdrop-blur-lg border-t border-b border-[#cfa830]/30 shadow-2xl animate-fadeIn">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-sm font-display text-[var(--color-tamil-paper)] hover:text-[var(--color-tamil-gold)] transition-colors flex items-center gap-1.5 border-b border-[#cfa830]/10"
                >
                  <span className="text-[var(--color-tamil-gold)] text-xs font-bold leading-none">›</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </section>
  );
}

