'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PortalId } from '@/config/portals';
import { motion, useReducedMotion } from 'motion/react';
import { locales, type Locale } from '@/lib/i18n/routing';

export interface EduHeroProps {
  readonly portal?: PortalId;
  readonly index?: string;
  readonly title?: string;
  readonly standfirst?: string;
  readonly backLabel: string;
  readonly locale: Locale;
  readonly heroImagePath?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

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
    <header className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[50vh] md:min-h-[65vh] lg:min-h-[80vh] flex flex-col justify-start p-4 sm:p-6 lg:p-8 border-b border-sand-300 overflow-hidden bg-sand-100">
      {/* 1. FULL UNCLUTTERED HERO BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImagePath}
          alt="School Education — Minister Rajmohan Arumugam with students and Thiruvalluvar"
          className="w-full h-full object-cover object-center sm:object-top filter brightness-[1.0] contrast-[1.02] saturate-[1.05]"
        />
        {/* Soft edge gradient to gracefully integrate with the background palette */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sand-100/50 via-sand-100/15 to-transparent pointer-events-none" />
      </div>

      {/* 2. TOP BAR: BACK BUTTON + QUICK NAVIGATION + LANGUAGE SWITCHER */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back Link (blends with sand ground) */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <Link
            href="/"
            className={[
              'u-eyebrow inline-flex items-center gap-2 no-underline group',
              'transition-all duration-[160ms] hover:scale-[1.02] hover:border-maroon-700',
              'text-charcoal-900 bg-sand-50/70 hover:bg-sand-50/90 backdrop-blur-md px-3.5 py-1.5 border border-sand-300/70 shadow-sm',
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

        {/* Right: Quick Navigation & Language Switcher Unit (blended with background) */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
          className="flex flex-wrap items-center gap-2 sm:gap-3"
        >
          {/* Quick Navigation Links */}
          <nav
            aria-label="Section Quick Navigation"
            className="bg-sand-50/70 hover:bg-sand-50/90 backdrop-blur-md px-3.5 sm:px-4 py-1.5 border border-sand-300/70 shadow-sm flex flex-wrap items-center gap-x-3 sm:gap-x-3.5 gap-y-1 text-xs text-charcoal-800 font-sans"
          >
            <span className="font-bold uppercase tracking-wider text-maroon-700 text-[10px] sm:text-[11px]">
              {locale === 'ta' ? 'துரித அணுகல்:' : 'Quick Nav:'}
            </span>
            {quickNav.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="hover:text-maroon-700 font-medium transition-colors underline underline-offset-4 decoration-sand-300/60 hover:decoration-maroon-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Integrated Language Switcher */}
          <div
            aria-label="Language Switcher"
            className="bg-sand-50/70 hover:bg-sand-50/90 backdrop-blur-md px-3 py-1.5 border border-sand-300/70 shadow-sm flex items-center gap-2 text-xs font-mono"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-maroon-700">
              {locale === 'ta' ? 'மொழி:' : 'LANG:'}
            </span>
            <Link
              href={pathFor('en')}
              lang="en"
              hrefLang="en"
              aria-current={locale === 'en' ? 'true' : undefined}
              className={`px-1.5 py-0.5 rounded transition-colors no-underline text-xs ${
                locale === 'en'
                  ? 'font-bold text-maroon-700 bg-sand-200/80 border border-sand-300'
                  : 'text-charcoal-700 hover:text-maroon-700'
              }`}
            >
              English
            </Link>
            <span className="text-sand-300 text-xs" aria-hidden="true">|</span>
            <Link
              href={pathFor('ta')}
              lang="ta"
              hrefLang="ta"
              aria-current={locale === 'ta' ? 'true' : undefined}
              className={`px-1.5 py-0.5 rounded transition-colors no-underline text-xs font-tamil-sans ${
                locale === 'ta'
                  ? 'font-bold text-maroon-700 bg-sand-200/80 border border-sand-300'
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
