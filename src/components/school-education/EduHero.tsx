'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PortalId } from '@/config/portals';
import { motion, useReducedMotion } from 'motion/react';
import { locales, type Locale } from '@/lib/i18n/routing';
import { CINEMATIC_EASE } from './EduMotion';

export interface EduHeroProps {
  readonly portal?: PortalId;
  readonly index?: string;
  readonly title?: string;
  readonly standfirst?: string;
  readonly backLabel: string;
  readonly locale: Locale;
  readonly heroImagePath?: string;
}

export function EduHero({
  backLabel,
  locale,
  heroImagePath = '/images/school-education-hero.jpg',
}: EduHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  const pathFor = (target: Locale) => {
    if (!pathname) return `/${target}/school-education`;
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = target;
      return segments.join('/');
    }
    return `/${target}/school-education`;
  };

  const quickNav = [
    { id: 'vision', label: locale === 'ta' ? 'கொள்கை பார்வை' : 'Vision' },
    { id: 'priorities', label: locale === 'ta' ? 'முன்னுரிமைகள்' : 'Priorities' },
    { id: 'curriculum', label: locale === 'ta' ? 'பாடத்திட்டம்' : 'Curriculum' },
    { id: 'two-language', label: locale === 'ta' ? 'இருமொழிக் கொள்கை' : 'Two-Language' },
    { id: 'tech-spark', label: locale === 'ta' ? 'டி.என் ஸ்பார்க்' : 'TN SPARK' },
    { id: 'schools', label: locale === 'ta' ? 'பள்ளிகள்' : 'Schools' },
    { id: 'infrastructure', label: locale === 'ta' ? 'நிதி & பட்ஜெட்' : 'Budget' },
    { id: 'timeline', label: locale === 'ta' ? 'காலவரிசை' : 'Timeline' },
  ];

  return (
    <header className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[52vh] md:min-h-[68vh] lg:min-h-[82vh] flex flex-col justify-start p-4 sm:p-6 lg:p-8 border-b border-sand-300 overflow-hidden bg-sand-100">
      {/* 1. CINEMATIC BACKGROUND IMAGE WITH PROGRESSIVE ZOOM & REVEAL */}
      <motion.div
        initial={{
          opacity: 0,
          scale: prefersReducedMotion ? 1 : 1.05,
          filter: prefersReducedMotion ? 'none' : 'blur(6px) brightness(0.9)',
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: 'blur(0px) brightness(1.0)',
        }}
        transition={{ duration: 0.95, ease: CINEMATIC_EASE }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImagePath}
          alt="School Education — Minister Rajmohan Arumugam with students and Thiruvalluvar"
          className="w-full h-full object-cover object-center sm:object-top filter contrast-[1.02] saturate-[1.05]"
        />
        {/* Soft edge gradient to gracefully integrate with the background palette */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sand-100/50 via-sand-100/15 to-transparent pointer-events-none" />
      </motion.div>

      {/* 2. TOP BAR: BACK BUTTON + QUICK NAVIGATION + LANGUAGE SWITCHER */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back Link (blends with sand ground with smooth hover pop) */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: CINEMATIC_EASE }}
        >
          <Link
            href="/"
            className={[
              'u-eyebrow inline-flex items-center gap-2 no-underline group',
              'transition-all duration-[200ms] hover:scale-[1.03] hover:shadow-md hover:border-maroon-700 active:scale-[0.98]',
              'text-charcoal-900 bg-sand-50/75 hover:bg-white backdrop-blur-md px-3.5 py-1.5 border border-sand-300/70 shadow-sm',
            ].join(' ')}
          >
            <motion.span
              aria-hidden="true"
              whileHover={prefersReducedMotion ? {} : { x: -3 }}
              transition={{ duration: 0.2 }}
              className="inline-block font-bold text-maroon-700"
            >
              &larr;
            </motion.span>
            <span className="font-bold tracking-wider text-xs sm:text-sm">{backLabel}</span>
          </Link>
        </motion.div>

        {/* Right: Quick Navigation & Language Switcher Unit */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.22, ease: CINEMATIC_EASE }}
          className="flex flex-wrap items-center gap-2 sm:gap-3"
        >
          {/* Quick Navigation Links */}
          <nav
            aria-label="Section Quick Navigation"
            className="bg-sand-50/75 hover:bg-sand-50/90 backdrop-blur-md px-4 sm:px-5 py-2 border border-sand-300/70 shadow-sm flex flex-wrap items-center gap-x-3.5 sm:gap-x-4 gap-y-1.5 text-sm text-charcoal-800 font-sans"
          >
            <span className="font-bold uppercase tracking-wider text-maroon-700 text-xs sm:text-[13px]">
              {locale === 'ta' ? 'துரித அணுகல்:' : 'Quick Nav:'}
            </span>
            {quickNav.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="hover:text-maroon-700 hover:underline transition-colors font-medium text-xs sm:text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Integrated Language Switcher */}
          <div
            aria-label="Language Switcher"
            className="bg-sand-50/75 hover:bg-sand-50/90 backdrop-blur-md px-3.5 py-2 border border-sand-300/70 shadow-sm flex items-center gap-2 text-sm font-mono"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-maroon-700">
              {locale === 'ta' ? 'மொழி:' : 'LANG:'}
            </span>
            <Link
              href={pathFor('en')}
              lang="en"
              hrefLang="en"
              aria-current={locale === 'en' ? 'true' : undefined}
              className={`px-2 py-0.5 rounded transition-all no-underline text-xs sm:text-sm hover:scale-105 active:scale-95 ${
                locale === 'en'
                  ? 'font-bold text-maroon-700 bg-sand-200/80 border border-sand-300 shadow-xs'
                  : 'text-charcoal-700 hover:text-maroon-700'
              }`}
            >
              English
            </Link>
            <span className="text-sand-300 text-xs sm:text-sm" aria-hidden="true">|</span>
            <Link
              href={pathFor('ta')}
              lang="ta"
              hrefLang="ta"
              aria-current={locale === 'ta' ? 'true' : undefined}
              className={`px-2 py-0.5 rounded transition-all no-underline text-xs sm:text-sm font-tamil-sans hover:scale-105 active:scale-95 ${
                locale === 'ta'
                  ? 'font-bold text-maroon-700 bg-sand-200/80 border border-sand-300 shadow-xs'
                  : 'text-charcoal-700 hover:text-maroon-700'
              }`}
            >
              தமிழ்
            </Link>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
